import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types/index'
import { buildURL, combineURL, isAbsoluteURL } from '../tools/url'
import { flattenHeaders } from '../tools/headers'
import xhr from './xhr'
import transform from './transform'

// 预处理请求 URL 按需将 params 拼接到 URL 后面以及处理 hash 值的内容
export function transformURL(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(url!, params, paramsSerializer)
}

// 处理请求头的数据类型
// function transformHeaders(config: AxiosRequestConfig): any {
//   const { headers = {}, data } = config
//   return processHeaders(headers, data)
// }

// 处理请求的数据格式 将其包装为 JSON 字符串格式
// function transformRequest(config: AxiosRequestConfig): any {
//   return transformRequestData(config.data)
// }

// 处理返回的数据格式 尝试将其包装为 JSON 字符串格式
function transformResponse(result: AxiosResponse): AxiosResponse {
  result.data = transform(result.data, result.headers, result.config.transformResponse)
  return result
}

// 发起请求的配置
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  // 将 transformRequestData 和 processHeaders 统一在 transform 中调用
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

// 取消请求相关配置
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => transformResponse(res))
}
