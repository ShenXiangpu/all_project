import request from '../../../utils/request';

export function loginUserByAccount(values) {
  return request({
    url: '/service/sso-service/sso/login',
    method: 'POST',
    data: values
  });
}

export function loginUserByPhone(values) {
  return request({
    url: '/service/sso-service/sso/mobileLogin',
    method: 'POST',
    data: values
  });
}

// 发送短信验证码
export function send(values) {
  return request({
    url: '/service/sso-service/sso/login/send',
    method: 'GET',
    data: values
  });
}
