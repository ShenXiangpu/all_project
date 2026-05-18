import request from '../../utils/request';

//获取企业内部门列表
export function queryDeptList() {
  return request({
    url: '/service/sso-service/sso/dept/getList',
    method: 'GET',
  });
}

export function create(values) {
  return request({
    url: '/service/sso-service/sso/dept/create',
    method: 'POST',
    data: values,
  });
}

export function update(values) {
  return request({
    url: '/service/sso-service/sso/dept/update',
    method: 'PUT',
    data: values,
  });
}

export function remove(values) {
  return request({
    url: `/service/sso-service/sso/dept/del`,
    method: 'DELETE',
    data: values,
  });
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>部门内部用户<<<<<<<<<<<<<<<<<<<<<<<<<<<

//企业内部角色列表
export function getRoles(values) {
  return request({
    url: '/service/sso-service/sso/user/getRoles',
    method: 'GET',
    data: values,
  });
}

//企业管理员查询企业内所有用户
export function queryEnterpriseUserList(values) {
  const pageNum = values.pageNum || 1;
  const pageSize = values.pageSize || 10;
  return request({
    url: `/service/sso-service/sso/user/getInternalUser?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'POST',
    data: values
  });
}

//企业项目经理查询组内所有用户
export function queryGroupUserList(values) {
  const pageNum = values.pageNum || 1;
  const pageSize = values.pageSize || 10;
  return request({
    url: '/service/sso-service/sso/user/getPagedGroupUser',
    method: 'GET',
    data: {
      pageNum,
      pageSize,
      ...values
    }
  });
}

export function createUser(values) {
  return request({
    url: '/service/sso-service/sso/user/create',
    method: 'POST',
    data: values,
  });
}

export function updateUser(values) {
  return request({
    url: '/service/sso-service/sso/user/updUserInfo',
    method: 'PUT',
    data: values,
  });
}

export function removeUser(values) {
  return request({
    url: `/service/sso-service/sso/user/delete`,
    method: 'DELETE',
    data: values,
  });
}

export function removeUserList(values) {
  return request({
    url: '/service/sso-service/sso/user/delMulti',
    method: 'DELETE',
    data: values,
  });
}

export function resetPassword(values) {
  return request({
    url: `/service/sso-service/sso/user/resetUserPwd?userId=${values.userId}`,
    method: 'PUT',
    // data: values,
  });
}
