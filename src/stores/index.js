import { createPinia } from 'pinia'
import useLoginStore from './login/login'

const pinia = createPinia()

function registerStore(app) {
  // 1. use的pinia
  app.use(pinia)

  // 2. 加载本地数据
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore
