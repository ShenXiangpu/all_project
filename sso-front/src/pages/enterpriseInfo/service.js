import request from '../../utils/request';

//获取企业信息
export function getEnterpriseInfo() {
    return request({
        url: '/service/sso-service/sso/enterprise/getBaseInfo',
        method: 'GET',
    });
}

// 获取审核信息
export function getAuditInfo() {
    return request({
        url: '/service/sso-service/sso/enterprise/getCheckedResult',
        method: 'GET',
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

// 修改企业信息
export function update(values) {
    return request({
        url: '/service/sso-service/sso/enterprise/update ',
        method: 'PUT',
        data: values
    });
}
