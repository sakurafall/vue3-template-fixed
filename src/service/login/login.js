import request from '../index'
// import { localCache } from '@/utils/cache'
// import { LOGIN_TOKEN } from '@/global/constant'

export function accountLoginRequest(acccont) {
  return request.post({
    url: '/login',
    data: acccont
  })
}

export function getUserInfoById(id) {
  return request.get({
    url: `/users/${id}`
    // headers: {
    //   Authorization: `Basic ${localCache.getCache(LOGIN_TOKEN)}`
    // }
  })
}

export function getUserMenusByRoleId(id) {
  return request.get({
    url: `/role/${id}/menu`
  })
}
