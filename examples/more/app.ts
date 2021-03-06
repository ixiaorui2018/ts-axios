import axios from '../../src/index'
import NProgress from 'nprogress'
import { AxiosError } from '../../src/tools/error'
import qs from 'qs'

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
// const instance = axios.create({
//   xsrfCookieName: 'XSRF-TOKEN-D',
//   xsrfHeaderName: 'X-XSRF-TOKEN-D'
// })

// instance.get('/more/get', { withCredentials: true }).then(res => {
//   console.log(res)
// })

// 测试 http 授权
// tslint:disable-next-line: no-floating-promises
// axios
//   .post(
//     '/more/post',
//     {
//       a: 1
//     },
//     {
//       auth: {
//         username: 'ixiaorui2018',
//         password: '123456'
//       }
//     }
//   )
//   .then(res => {
//     console.log(res)
//   })

// 测试进度监控功能
const instance = axios.create()

function calculatePercentage(loaded: number, total: number) {
  return Math.floor(loaded * 1.0) / total
}

function loadProgressBar() {
  const setupStartProgress = () => {
    instance.interceptors.request.use(config => {
      NProgress.start()
      return config
    })
  }

  const setupUpdateProgress = () => {
    const update = (e: ProgressEvent) => {
      console.log(e)
      NProgress.set(calculatePercentage(e.loaded, e.total))
    }
    instance.defaults.onDownloadProgress = update
    instance.defaults.onUploadProgress = update
  }

  const setupStopProgress = () => {
    instance.interceptors.response.use(
      response => {
        NProgress.done()
        return response
      },
      error => {
        NProgress.done()
        return Promise.reject(error)
      }
    )
  }

  setupStartProgress()
  setupUpdateProgress()
  setupStopProgress()
}

loadProgressBar()

const downloadEl = document.getElementById('download')

downloadEl!.addEventListener('click', e => {
  instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
})

const uploadEl = document.getElementById('upload')

uploadEl!.addEventListener('click', e => {
  const data = new FormData()
  const fileEl = document.getElementById('file') as HTMLInputElement
  if (fileEl.files) {
    data.append('file', fileEl.files[0])

    instance.post('/more/upload', data)
  }
})

// 测试自定义合法状态码功能
// tslint:disable-next-line: no-floating-promises
// axios
//   .get('/more/304')
//   .then(res => {
//     console.log(res)
//   })
//   .catch((e: AxiosError) => {
//     console.log(e.message)
//   })

// tslint:disable-next-line: no-floating-promises
// axios
//   .get('/more/304', {
//     validateStatus(status) {
//       return status >= 200 && status < 400
//     }
//   })
//   .then(res => {
//     console.log(res)
//   })
//   .catch((e: AxiosError) => {
//     console.log(e.message)
//   })

// 测试自定义参数序列化
// tslint:disable-next-line: no-floating-promises
// axios
//   .get('/more/get', {
//     params: new URLSearchParams('a=b&c=d')
//   })
//   .then(res => {
//     console.log(res)
//   })

// tslint:disable-next-line: no-floating-promises
// axios
//   .get('/more/get', {
//     params: {
//       a: 1,
//       b: 2,
//       c: ['a', 'b', 'c']
//     }
//   })
//   .then(res => {
//     console.log(res)
//   })

// const instanceP = axios.create({
//   paramsSerializer(params) {
//     return qs.stringify(params, { arrayFormat: 'brackets' })
//   }
// })

// tslint:disable-next-line: no-floating-promises
// instanceP
//   .get('/more/get', {
//     params: {
//       a: 1,
//       b: 2,
//       c: ['a', 'b', 'c']
//     }
//   })
//   .then(res => {
//     console.log(res)
//   })

const instanceB = axios.create({
  baseURL: 'http://localhost:8080/more',
  withCredentials: true
})
// tslint:disable-next-line: no-floating-promises
instanceB.get('/get').then(res => {
  console.log(res)
})

// 静态方法测试
function getA() {
  return axios.get('/more/A')
}

function getB() {
  return axios.get('/more/B')
}

// tslint:disable-next-line: no-floating-promises
axios.all([getA(), getB()]).then(
  axios.spread(function(resA, resB) {
    console.log(resA.data)
    console.log(resB.data)
  })
)

// tslint:disable-next-line: no-floating-promises
axios.all([getA(), getB()]).then(([resA, resB]) => {
  console.log(resA.data)
  console.log(resB.data)
})

const fakeConfig = {
  baseURL: 'https://www.baidu.com/',
  url: '/user/12345',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'thisIsATest'
  }
}
console.log(axios.getUri(fakeConfig))
