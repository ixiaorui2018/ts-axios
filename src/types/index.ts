export type MethodType =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'patch'
  | 'PATCH'
  | 'put'
  | 'PUT'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'

export interface AxiosRequestConfig {
  url: string
  method?: MethodType
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string | number
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}
