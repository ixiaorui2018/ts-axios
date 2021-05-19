import { isDate, isPlainObject, isURLSearchParams } from './utils'

// 将 url 进行编码并保留特殊字符
function encode(url: string): string {
  return encodeURIComponent(url)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(
  url: string,
  params?: any,
  paramsSerializer?: (params: any) => string
): string {
  // 将参数拼接到 url 中
  // 没有参数即直接返回 url
  if (!params) {
    return url
  }

  let serializedParams

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else if (isURLSearchParams(params)) {
    serializedParams = params.toString()
  } else {
    // 有参数即需要处理 url
    const parts: string[] = []
    Object.keys(params).forEach(key => {
      const value = params[key]

      if (value === null || typeof value === 'undefined') {
        return
      }

      let values = []
      if (Array.isArray(value)) {
        values = value
        key = key + '[]'
      } else {
        values = [value]
      }

      values.forEach(value => {
        if (isDate(value)) {
          value = value.toISOString()
        } else if (isPlainObject(value)) {
          value = JSON.stringify(value)
        }
        parts.push(`${encode(key)}=${encode(value)}`)
      })
    })

    serializedParams = parts.join('&')
    if (serializedParams) {
      // 忽略 hash 后面的内容
      const markIndex = url.indexOf('#')
      if (markIndex !== -1) {
        url = url.slice(0, markIndex)
      }
      // 判断 url 是否已带上一些函数
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }
  }

  return url
}

// 判断是否为同域请求
interface URLOrigin {
  protocol: string
  host: string
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode

  return {
    protocol,
    host
  }
}

export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL)
  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  )
}

export function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

export function combineURL(baseURL: string, relativeURL?: string): string {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL
}
