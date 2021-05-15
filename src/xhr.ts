import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types/index'
import { parseHeaders } from './tools/headers'

function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const request = new XMLHttpRequest()
    const { data = null, url, method = 'GET', headers, responseType } = config

    // 自定义返回数据格式
    if (responseType) {
      request.responseType = responseType
    }

    // 设置基本请求格式
    request.open(method.toUpperCase(), url, true)

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
      resolve(response)
    }
  })
}

export default xhr
