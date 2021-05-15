import { AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | number | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | number | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)

    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

// 使用工厂函数让外部可以创建 AxiosError 类对象
export function createAxiosError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | number | null,
  request?: any,
  response?: AxiosResponse
): AxiosError {
  const error = new AxiosError(message, config, code, request, response)

  return error
}
