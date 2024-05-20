import { createRouter, createWebHashHistory } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constant'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // 映射关系：path => component
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      name: 'home',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/Main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

// 导航守卫
router.beforeEach((to) => {
  // 只有登录成功(有token)，才能进入Main页面，否则进入登录页
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }

  // 如果是进入到main
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
