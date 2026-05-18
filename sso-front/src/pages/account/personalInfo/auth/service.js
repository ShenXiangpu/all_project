import request from 'utils/request';

export function getProvince() {
  return request({
    url: '/service/sso-service/sso/university/getProvince',
    method: 'GET',
  });
}

export function getAllUniversityList() {
  return request({
    url: '/service/sso-service/sso/university/getList',
    method: 'GET',
  });
}

// 根据省份查询学校列表
export function getListByProvince(value) {
  return request({
    url: '/service/sso-service/sso/university/getListByProvince',
    method: 'GET',
    data: value
  });
}

// 获取当前用户认证信息
export function getIdentityInfo() {
  return request({
    url: '/service/sso-service/sso/identity/getIdentityInfo',
    method: 'GET',
  });
}

// 学生提交认证信息
export function studentAuth(values) {
  return request({
    url: '/service/sso-service/sso/identity/student',
    method: 'POST',
    data: values
  });
}

// 认证失败后，学生重新提交认证信息
export function updateStudentAuth(values) {
  return request({
    url: '/service/sso-service/sso/identity/updStudent',
    method: 'PUT',
    data: values
  });
}

// 教师提交认证信息
export function teacherAuth(values) {
  return request({
    url: '/service/sso-service/sso/identity/teacher',
    method: 'POST',
    data: values
  });
}

// 认证失败后，教师重新提交认证信息
export function updateTeacherAuth(values) {
  return request({
    url: '/service/sso-service/sso/identity/updTeacher',
    method: 'PUT',
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

// 企业提交认证信息
export function companyAuth(values) {
  return request({
    url: '/service/sso-service/sso/identity/company',
    method: 'POST',
    data: values
  });
}

// 认证失败后，企业重新提交认证信息
export function updateCompanyAuth(values) {
  return request({
    url: '/service/sso-service/sso/identity/updCompany',
    method: 'PUT',
    data: values
  });
}

