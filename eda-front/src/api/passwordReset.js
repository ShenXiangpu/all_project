import request from '@/utils/request'
import { context1 } from '@/api/context'
export function getResetSmsCode(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url:`${context1}/sso-service/sso/mail/sendResetValidationEmail?email=${data.email}`,
    method: 'post',
  })
}

/**
 * 重置密码
 * @param {newPassword,phone} data 
 */
export function modifyPassword(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url:`${context1}/sso-service/sso/v2/reset/modifyPassword`,
    method: 'put',
    data
  })
}

/**
 * 邮箱验证码
 * @param {*} data 
 */
export function checkSmsCode(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url:`${context1}/sso-service/sso/mail/check?email=${data.email}&code=${data.code}`,
    method: 'get',
  })
}


// 

/**
 * 验证登录名
 * @param {*} data 
 */
export function checkUser(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url:`${context1}/sso-service/sso/v2/reset/checkUser?loginName=${data.loginName}`,
    method: 'get',
  })
}
