import request from 'utils/request';

export function queryEnterpriseList(values) {
  const pageNum = values.pageNum || 1;
  const pageSize = values.pageSize || 10;
  return request({
    url: `/service/sso-service/sso/enterprise/getList?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'POST',
    data: values
  });
}

export function audit(values) {
  return request({
    url: '/service/sso-service/sso/enterprise/verify',
    method: 'POST',
    data: values,
  });
}

export function getAuditInfo(values) {
  return request({
    url: '/service/sso-service/sso/enterprise/getResultById',
    method: 'GET',
    data: values,
  });
}
