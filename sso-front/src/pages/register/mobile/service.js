import request from '../../../utils/request';

//发送手机验证码
export function sendValidate(values) {
    return request({
        url: '/service/sso-service/sso/register/send',
        method: 'GET',
        data: values
    });
}

//校验图片验证码
export function checkVerify(values) {
    return request({
        url: '/service/sso-service/sso/captcha/checkVerify',
        method: 'GET',
        data: values
    });
}

//校验手机验证码，同时判断用户是否已存在
export function checkMobileCode(values) {
    return request({
        url: '/service/sso-service/sso/register/codeCheck',
        method: 'GET',
        data: values
    });
}

//创建账号
export function createAccount(values) {
    return request({
        url: '/service/sso-service/sso/register/user',
        method: 'POST',
        data: values
    });
}
