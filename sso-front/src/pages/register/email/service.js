import request from '../../../utils/request';

//校验图片验证码
export function checkVerify(values) {
    return request({
        url: '/service/sso-service/sso/captcha/checkVerify',
        method: 'GET',
        data: values
    });
}

//校验邮箱，判断邮箱是否已被注册
export function checkEmail(values) {
    return request({
        url: '/service/sso-service/sso/register/validateEmail',
        method: 'POST',
        data: values
    });
}

//发送邮件
export function sendEmail(values) {
    return request({
        url: '/service/sso-service/sso/register/sendEmail',
        method: 'POST',
        data: values
    });
}

//解密邮箱链接地址
export function decodeParams(values) {
    return request({
        url: '/service/sso-service/sso/register/decode',
        method: 'GET',
        data: values
    });
}

//校验手机号
export function checkMobile(values) {
    return request({
        url: '/service/sso-service/sso/register/validatePhone',
        method: 'GET',
        data: values
    });
}

//获取企业类型
export function getCompanyTypes() {
    return request({
        url: '/service/sso-service/sso/register/getRoles',
        method: 'GET',
    });
}

//校验企业名称
export function checkCompanyName(values) {
    return request({
        url: '/service/sso-service/sso/register/validateCompanyName',
        method: 'GET',
        data: values
    });
}

//校验企业统一社会信用代码
export function checkCertificateCode(values) {
    return request({
        url: '/service/sso-service/sso/register/validateCertificateCode',
        method: 'GET',
        data: values
    });
}

//创建账号
export function createAccount(values) {
    return request({
        url: '/service/sso-service/sso/register/company',
        method: 'POST',
        data: values
    });
}
