import request from '@/utils/request'
import { context1 } from '@/api/context'


/**
 * 图片校验码
 * @param {*} data 
 * @returns 
 */

export function getVerify(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: `${context1}/sso-service/sso/captcha/getVerify`,
    method: 'get',
  })
}

/**
 * 验证图片校验码
 * @param {*} data 
 * @returns 
 */

export function checkVerify(value) {
  return request({
    url: `${context1}/sso-service/sso/captcha/checkVerify?verifyInput=${value}`,
    method: 'get', 
  })
}
