import request from '@/utils/request'
import { context1 } from '@/api/context'
export function login(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: `${context1}/sso-service/sso/login`,
    method: 'post',
    data
  })
}

/**
 * 有效期
 * @returns 
 */

export function isLicenseEnabled() {
  return request({
    url: `${context1}/zkxy-vmware-api/edulicense/isLicenseEnabled`,
    method: 'get',
  })
}





export function getInfo() {
  return request({
    url: `${context1}/sso-service/sso/user/getMe`,
    method: 'get',
  })
}

export function logout() {
  return request({
    url: `${context1}/sso-service/sso/logout`,
    method: 'post'
  })
}
// 获取路由
export function listRoutes() {
  return request({
    url: `${context1}/sso-service/sso/menu/listRoutes`,
    method: 'get'
  })
}

// -------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>子账户列表api
