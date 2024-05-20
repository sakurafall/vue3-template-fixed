import { defineStore } from 'pinia'
import router from '@/router'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN, USER_INFO, USER_MENUS } from '@/global/constant'
import { mapMenusToPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import { menus } from '@/mock/base/menus'
import userInfos from '@/mock/base/userInfo'
import loginInfo from '@/mock/base/loginInfo'
// import useMainStore from '@/stores/main/main'
// import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'

const useLoginStore = defineStore('login', {
  state: () => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account) {
      // 1. 账号登录，获取token等信息
      // const loginResult = await accountLoginRequest(account)
      // console.log(loginResult)
      // TODO: 现在是假数据，等待接口（token、id）
      const loginResult = {
        data: loginInfo.data
      }

      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 2. 获取登录用户的详细信息(role信息)
      // const userInfoResult = await getUserInfoById(id)
      // TODO: 现在是假数据，等待接口（userInfo）
      const userInfoResult = {
        data: userInfos.data
      }
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 3. 根据角色请求用户的权限(菜单menus)
      // const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      // TODO: 现在是假数据，等待接口 (menus)
      const userMenusResult = {
        data: menus
      }
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 4. 进行本地缓存
      localCache.setCache(USER_INFO, userInfo)
      localCache.setCache(USER_MENUS, userMenus)

      // 5. 请求所有roles/departments数据
      // const mainStore = useMainStore()
      // mainStore.fetchAllDataAction()

      // 6. 获取登录用户的所有按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      this.permissions = permissions

      // 重要: 动态的添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      // 页面跳转(main页面)
      router.push('/main')
    },

    loadLocalCacheAction() {
      // 1. 用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache(USER_INFO)
      const userMenus = localCache.getCache(USER_MENUS)
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 1. 请求所有roles/departments/menus数据
        // const mainStore = useMainStore()
        // mainStore.fetchAllDataAction()

        // 2. 获取登录用户的所有按钮的权限
        const permissions = mapMenusToPermissions(userMenus)
        this.permissions = permissions

        // 3. 动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
