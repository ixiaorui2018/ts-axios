import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './tools/utils'

// 工厂函数出现了
function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
