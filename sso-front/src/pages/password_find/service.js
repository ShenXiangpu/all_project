import request from '../../utils/request';

//校验账号信息，发送手机号/邮箱，校验是否存在
export function checkAccount(values) {
    return request({
        url: '/service/sso-service/sso/login/checkUser',
        method: 'GET',
        data: values
    });
}

//发送手机验证码
export function sendMobileCode(values) {
    return request({
        url: '/service/sso-service/sso/modifyPwd/send',
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
        url: '/service/sso-service/sso/sms/check',
        method: 'GET',
        data: values
    });
}

export function resetPassword(values) {
    return request({
        url: '/service/sso-service/sso/login/modifyPassword',
        method: 'PUT',
        data: values
    });
}
