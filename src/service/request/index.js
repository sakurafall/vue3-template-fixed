import axios from 'axios'

// 拦截器：蒙版Loading/token/修改配置

/**
 * 两个难点
 * 1. 拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 * 2. 响应结果的类型处理(泛型)
 */

class Request {
  // request实例 => axios的实例
  constructor(config) {
    this.instance = axios.create(config)

    // 每个instance实例都添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // loading/token
        console.log('全局请求成功的拦截')
        return config
      },
      (err) => {
        console.log('全局请求失败的拦截')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log('全局响应成功的拦截')
        return res.data
      },
      (err) => {
        console.log('全局响应失败的拦截')
        return err
      }
    )

    // 针对特定的Request实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  // 网络请求泛型； 因为promise的成功的回调 返回的类型 是创建实例时确定的
  // RequestConfig<T> ： RequestConfig 响应成功的返回数据类型需要和 promise一致
  request(config) {
    // 单次请求的成功拦截处理
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    // 返回Promise
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          // 单次相应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get(config) {
    return this.request({ ...config, method: 'GET' })
  }
  post(config) {
    return this.request({ ...config, method: 'POST' })
  }
  delete(config) {
    return this.request({ ...config, method: 'DELETE' })
  }
  put(config) {
    return this.request({ ...config, method: 'PUT' })
  }
  patch(config) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default Request
