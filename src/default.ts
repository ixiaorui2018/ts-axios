import { transformRequestData, transformResponseData } from './tools/data'
import { processHeaders } from './tools/headers'
import { AxiosRequestConfig } from './types'

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 0,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  validateStatus(status: number): boolean {
    return status >= 200 && status < 300
  },

  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(data, headers)
      return transformRequestData(data)
    }
  ],

  transformResponse: [
    function(data: any): any {
      return transformResponseData(data)
    }
  ]
}

const methodsWithoutData = ['delete', 'get', 'head', 'options']

methodsWithoutData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
