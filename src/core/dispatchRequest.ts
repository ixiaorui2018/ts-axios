import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types/index'
import { buildURL } from '../tools/url'
import { transformRequestData, transformResponseData } from '../tools/data'
import { processHeaders } from '../tools/headers'
import xhr from './xhr'

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

function transformRequest(config: AxiosRequestConfig): any {
  return transformRequestData(config.data)
}

function transformResponse(result: AxiosResponse): AxiosResponse {
  result.data = transformResponseData(result.data)
  return result
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequest(config)
}

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => transformResponse(res))
}
