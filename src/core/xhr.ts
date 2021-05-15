import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types/index'
import { parseHeaders } from '../tools/headers'
import { createAxiosError } from '../tools/error'

function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    const { data = null, url, method = 'GET', headers, responseType, timeout } = config

    // 自定义返回数据格式
    if (responseType) {
      request.responseType = responseType
    }

    // 设置基本请求格式
    request.open(method.toUpperCase(), url!, true)

    // 自定义超时时间
    if (timeout) {
      request.timeout = timeout
    }

    // 处理请求头
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    // 发起请求
    request.send(data)

    // 处理返回数据
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }

      // 解析返回头
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    // 处理错误情况
    request.onerror = function handleError() {
      reject(createAxiosError('Network Error', config, null, request))
    }

    // 处理超时情况
    request.ontimeout = function handleTimeout() {
      reject(
        createAxiosError(
          `Timeout of ${config.timeout} ms exceeded`,
          config,
          'ECONNABORTED',
          request
        )
      )
    }

    // 处理状态码各种情况
    function handleResponse(response: AxiosResponse) {
      if ((response.status >= 200 && response.status < 300) || response.status === 304) {
        resolve(response)
      } else {
        reject(
          createAxiosError(
            `Request failed with status code ${response.status}`,
            config,
            response.status,
            request,
            response
          )
        )
      }
    }
  })
}

export default xhr
