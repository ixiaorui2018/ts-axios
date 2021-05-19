import axios from '../../src/index'

document.cookie = 'a=b'

// tslint:disable-next-line: no-floating-promises
// 对比项
// axios.get('/more/get').then(res => {
//   console.log(res)
// })

// tslint:disable-next-line: no-floating-promises
// 测试该请求应该执行 npm run devWithCredentials 先开另一个服务
// axios
//   .post(
//     'http://127.0.0.1:8089/more/serverWthCredentials',
//     {},
//     {
//       withCredentials: true
//     }
//   )
//   .then(res => {
//     console.log(res)
//   })

// 测试防御 xsrf
const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

instance.get('/more/get', { withCredentials: true }).then(res => {
  console.log(res)
})
