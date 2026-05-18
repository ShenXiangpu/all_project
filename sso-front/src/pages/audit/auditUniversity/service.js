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

export function getStudentList(value) {
  return request({
    url: '/service/sso-service/sso/identity/getStudentList',
    method: 'POST',
    data: value
  });
}

export function getTeacherList(value) {
  return request({
    url: '/service/sso-service/sso/identity/getTeacherList',
    method: 'POST',
    data: value
  });
}

export function audit(value) {
  return request({
    url: '/service/sso-service/sso/identity/verify',
    method: 'POST',
    data: value
  });
}

export function getAuditInfo(value) {
  return request({
    url: '/service/sso-service/sso/identity/getVerifyResult',
    method: 'GET',
    data: value
  });
}
