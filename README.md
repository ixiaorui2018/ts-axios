# ts-axios
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)
[![Stars](https://img.shields.io/github/stars/ixiaorui2018/ts-axios)](https://img.shields.io/github/stars/ixiaorui2018/ts-axios)
[![Forks](https://img.shields.io/github/forks/ixiaorui2018/ts-axios)](https://img.shields.io/github/forks/ixiaorui2018/ts-axios)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

[![Stargazers over time](https://starchart.cc/ixiaorui2018/ts-axios.svg)](https://starchart.cc/ixiaorui2018/ts-axios)

学习 TypeScript 的笔记，实现一个 axios 库，后续将进行封装！！

##### 实现记录：

- 使用开源库 [typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter) 进行项目初始化✅
- 完成基础功能并做相对应的测试通过✅
- 添加错误信息处理模块并做对应的测试通过✅
- 实现接口扩展并做对应的测试通过✅
- 实现函数重载支持并做对应的测试通过✅
- 实现响应数据支持泛型并做对应的测试通过✅
- 实现拦截器且支持链式调用功能模块并做对应的测试通过✅
- 实现默认配置化并做对应的测试通过✅
- 实现取消功能并做对应的测试通过✅
- 支持 withCredentials 配置实现跨域请求并做对应的测试通过✅
- 支持防御 xsrf 配置并做对应的测试通过✅
- 添加上传和下载的进度监控配置并做对应的测试通过✅
- 添加 http 授权并做对应的测试通过✅
- 支持自定义合法状态码并做对应的测试通过✅
- 支持自定义 baseURL 并做对应的测试通过✅
- 添加静态方法 axios.all、axios.spread 并做对应的测试通过✅

##### 使用说明：

```shell
// 项目初始化
npm install

// 使用 TSLint 工具检查 src 和 test 目录下 TypeScript 代码的可读性、可维护性和功能性错误
npm run lint

// 观察者模式运行 rollup 工具打包代码
npm start

// 运行 jest 工具跑单元测试
npm test

// 运行 commitizen 工具提交格式化的 git commit 注释
npm run commit

// 运行 rollup 编译打包 TypeScript 代码，并运行 typedoc 工具生成文档
npm run build

// 运行 server 并进行测试
npm install -g nodemon
npm run dev
```

