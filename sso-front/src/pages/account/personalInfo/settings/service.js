import request from 'utils/request';

// 校验手机号
export function verifyPhone(value) {
  return request({
    url: '/service/sso-service/sso/user/verifyPhone',
    method: 'GET',
    data: value
  });
}

// 修改手机号
export function modifyPhone(values) {
  return request({
    url: '/service/sso-service/sso/user/modifyPhone',
    method: 'PUT',
    data: values
  });
}

// 解绑手机号，发送短信验证码给当前手机号
export function send(value) {
  return request({
    url: '/service/sso-service/sso/modifyPhone/send',
    method: 'GET',
    data: value
  })
}

// 绑定新的手机号，发送短信验证码给新的手机号
export function sendToNewPhone(value) {
  return request({
    url: '/service/sso-service/sso/modifyNewPhone/send',
    method: 'GET',
    data: value
  })
}

// 密码重置
export function resetPassword(values) {
  return request({
    url: '/service/sso-service/sso/user/resetPwdByPhone',
    method: 'PUT',
    data: values
  });
}

// 重置密码，发送短信验证码
export function resetPwdSend(value) {
  return request({
    url: '/service/sso-service/sso/resetPwdAfterLogin/send',
    method: 'GET',
    data: value
  })
}

// 绑定手机号，发送验证码
export function bindPhoneSend(value) {
  return request({
    url: '/service/sso-service/sso/bindPhone/send',
    method: 'GET',
    data: value
  })
}
