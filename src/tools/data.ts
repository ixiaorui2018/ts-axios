import { isPlainObject } from './utils'

// 处理请求 body 数据
export function transformRequestData(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

// 尝试将返回的字符串类型数据翻译为 JSON 格式 方便后续转化
export function transformResponseData(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
