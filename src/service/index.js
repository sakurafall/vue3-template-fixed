import Request from './request'
import { BASE_URL, TIME_OUT } from './config'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constant'

const duRequest = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn(config) {
      const token = localCache.getCache(LOGIN_TOKEN)
      // 类型缩小
      if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }
  }
})

export const duRequest2 = new Request({
  baseURL: 'url',
  timeout: 8000,

  interceptors: {
    requestSuccessFn(config) {
      console.log('单次的请求成功拦截')
      return config
    },
    requestFailureFn(err) {
      console.log('单次的请求失败拦截')
      return err
    },
    responseSuccessFn(config) {
      console.log('单次的响应成功拦截')
      return config
    },
    responseFailureFn(err) {
      console.log('单次的响应失败拦截')
      return err
    }
  }
})

export default duRequest
