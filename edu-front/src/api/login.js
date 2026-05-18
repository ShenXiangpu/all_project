import request from '@/utils/request'

export function getSmsCode(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: `iot/zkxy-sensor-auth/auth/sms/login?phone=${data.phone}`,
    method: 'get',
  })
}


/**
 * 图片校验码
 * @param {*} data 
 * @returns 
 */

export function getVerify(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: `edu/sso-service/sso/captcha/getVerify`,
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
    url: `edu/sso-service/sso/captcha/checkVerify?verifyInput=${value}`,
    method: 'get', 
  })
}
