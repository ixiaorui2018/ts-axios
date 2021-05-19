const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const atob = require('atob')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false
    }
  })
)

app.use(webpackHotMiddleware(compiler))

// 测试防御 xsrf 时开启
app.use(
  express.static(__dirname, {
    setHeaders(res) {
      res.cookie('XSRF-TOKEN-D', 'test-data')
    }
  })
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 8080

module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

app.use(cookieParser())

// 路由相关编码
const router = express.Router()

// 简单 get 请求测试
registerSimpleRouter()
// 基础功能实现后测试
registerBasicRouter()
// 请求出错情况测试
registerErrorRouter()
// 工厂模式封装后测试
registerExtendRouter()
// 添加拦截器后测试
registerInterceptorRouter()
// 添加默认配置后测试
registerConfigRouter()
// 添加取消功能后测试
registerCancelRouter()
// 测试扩展功能
registerMoreRouter()

function registerSimpleRouter() {
  router.get('/simple/get', function(req, res) {
    res.json({
      msg: `hello world`
    })
  })
}

function registerBasicRouter() {
  router.get('/basic/get', function(req, res) {
    res.json(req.query)
  })

  router.post('/basic/post', function(req, res) {
    res.json(req.body)
  })

  router.post('/basic/buffer', function(req, res) {
    let msg = []
    req.on('data', chunk => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
}

function registerErrorRouter() {
  router.get('/error/get', function(req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: `hello world`
      })
    } else {
      res.status(500)
      res.end()
    }
  })

  router.get('/error/timeout', function(req, res) {
    setTimeout(() => {
      res.json({
        msg: `hello world`
      })
    }, 3000)
  })
}

function registerExtendRouter() {
  router.get('/extend/get', function(req, res) {
    res.json({
      msg: 'hello world'
    })
  })

  router.options('/extend/options', function(req, res) {
    res.end()
  })

  router.delete('/extend/delete', function(req, res) {
    res.end()
  })

  router.head('/extend/head', function(req, res) {
    res.end()
  })

  router.post('/extend/post', function(req, res) {
    res.json(req.body)
  })

  router.put('/extend/put', function(req, res) {
    res.json(req.body)
  })

  router.patch('/extend/patch', function(req, res) {
    res.json(req.body)
  })

  router.get('/extend/user', function(req, res) {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'jack',
        age: 18
      }
    })
  })
}

function registerInterceptorRouter() {
  router.get('/interceptor/get', function(req, res) {
    res.end('hello')
  })
}

function registerConfigRouter() {
  router.post('/config/post', function(req, res) {
    res.json(req.body)
  })
}

function registerCancelRouter() {
  router.get('/cancel/get', function(req, res) {
    setTimeout(() => {
      res.json('hello')
    }, 1000)
  })

  router.post('/cancel/post', function(req, res) {
    setTimeout(() => {
      res.json(req.body)
    }, 1000)
  })
}

function registerMoreRouter() {
  router.get('/more/get', function(req, res) {
    res.json(req.cookies)
  })

  router.post('/more/upload', function(req, res) {
    console.log(req.body, req.files)
    res.end('upload success!')
  })

  router.post('/more/post', function(req, res) {
    const auth = req.headers.authorization
    const [type, credentials] = auth.split(' ')
    console.log(atob(credentials))
    const [username, password] = atob(credentials).split(':')
    if (type === 'Basic' && username === 'ixiaorui2018' && password === '123456') {
      res.json(req.body)
    } else {
      res.status(401)
      res.end('UnAuthorization')
    }
  })

  router.get('/more/304', function(req, res) {
    res.status(304)
    res.end()
  })

  router.get('/more/A', function(req, res) {
    res.end('A')
  })

  router.get('/more/B', function(req, res) {
    res.end('B')
  })
}

app.use(router)
