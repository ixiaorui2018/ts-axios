import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types/index'
import { parseHeaders } from '../tools/headers'
import { createAxiosError } from '../tools/error'
import { isURLSameOrigin } from '../tools/url'
import { isFormData } from '../tools/utils'
import cookie from '../tools/cookie'

function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    const {
      data = null,
      url,
      method = 'GET',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config

    function configureRequest(): void {
      // 自定义返回数据格式
      if (responseType) {
        request.responseType = responseType
      }

      // 自定义超时时间
      if (timeout) {
        request.timeout = timeout
      }

      // 支持跨域携带 cookie
      if (withCredentials) {
        request.withCredentials = true
      }
      return
    }

    function processHeaders(): void {
      // 防御 xsrf 攻击做校验
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue) {
          headers[xsrfHeaderName!] = xsrfValue
        }
      }

      // 处理请求头
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      if (auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }

      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    // 处理状态码各种情况
    function handleResponse(response: AxiosResponse) {
      if (!validateStatus || validateStatus(response.status)) {
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

    function addEvents(): void {
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

      // 进度监控配置
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processCancel(): void {
      // 取消请求
      if (cancelToken) {
        // tslint:disable-next-line: no-floating-promises
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }

    // 设置基本请求格式
    request.open(method.toUpperCase(), url!, true)

    configureRequest()

    addEvents()

    processHeaders()

    processCancel()

    // 发起请求
    request.send(data)
  })
}

export default xhr
