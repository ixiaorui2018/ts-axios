import axios from '../../src/index'
import qs from 'qs'
import { AxiosTransformer } from '../../src/types'

axios.defaults.headers.common['test2'] = 123

// 合并配置的设计与实现后测试
// tslint:disable-next-line: no-floating-promises
axios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test: '321'
  }
}).then(res => {
  console.log(res.data)
})

// 请求和响应配置化后测试
// tslint:disable-next-line: no-floating-promises
axios({
  transformRequest: [
    function(data) {
      return qs.stringify(data)
    },
    ...(axios.defaults.transformRequest as AxiosTransformer[])
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]),
    function(data) {
      if (typeof data === 'object') {
        data.b = 2
      }
      return data
    }
  ],
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then(res => {
  console.log(res.data)
})

// 扩展 axios.create 静态接口后测试
const instance = axios.create({
  transformRequest: [
    function(data) {
      return qs.stringify(data)
    },
    ...(axios.defaults.transformRequest as AxiosTransformer[])
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]),
    function(data) {
      if (typeof data === 'object') {
        data.b = 2
      }
      return data
    }
  ]
})

// tslint:disable-next-line: no-floating-promises
instance({
  url: '/config/post',
  method: 'post',
  data: {
    a: 1
  }
}).then(res => {
  console.log(res.data)
})
