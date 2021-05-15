import axios from '../../src/index'

// 基础功能测试样例

// axios({
//   method: 'get',
//   url: '/basic/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })

// axios({
//   method: 'get',
//   url: '/basic/get',
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })

// const date = new Date()

// axios({
//   method: 'get',
//   url: '/basic/get',
//   params: {
//     date
//   }
// })

// axios({
//   method: 'get',
//   url: '/basic/get',
//   params: {
//     foo: '@:$, '
//   }
// })

// axios({
//   method: 'get',
//   url: '/basic/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })

// axios({
//   method: 'get',
//   url: '/basic/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })

// axios({
//   method: 'get',
//   url: '/basic/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })

// axios({
//   method: 'post',
//   url: '/basic/post',
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// const arr = new Int32Array([21, 31])

// axios({
//   method: 'post',
//   url: '/basic/buffer',
//   data: arr
// })

// tslint:disable-next-line: no-floating-promises
axios({
  method: 'post',
  url: '/basic/post',
  headers: {
    'content-type': 'application/json;charset=utf-8'
  },
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(res)
})

const paramsString = 'q=URLUtils.searchParams&topic=api'
const searchParams = new URLSearchParams(paramsString)

// tslint:disable-next-line: no-floating-promises
axios({
  method: 'post',
  url: '/basic/post',
  data: searchParams
}).then(res => {
  console.log(res)
})
