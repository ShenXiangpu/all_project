import request from '../../utils/request';

//企业内部角色列表
export function getRoles(values) {
  return request({
    url: '/service/sso-service/sso/user/getRoles',
    method: 'GET',
    data: values,
  });
}

//获取企业内部部门列表
export function queryGroupList() {
  return request({
    url: '/service/sso-service/sso/dept/getList',
    method: 'GET',
  });
}

//平台管理员根据类型查询用户（平台、企业、个人）
export function queryUserList(values) {
  const pageNum = values.pageNum || 1;
  const pageSize = values.pageSize || 10;
  const type = values.type;
  delete values.type
  return request({
    url: `/service/sso-service/sso/user/getUserList?pageNum=${pageNum}&pageSize=${pageSize}&type=${type}`,
    method: 'POST',
    data: values
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

//企业项目经理查询部门内所有用户
export function queryGroupUserList(values) {
  const pageNum = values.pageNum || 1;
  const pageSize = values.pageSize || 10;
  return request({
    url: '/service/sso-service/sso/user/getPagedDeptUser',
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

export function getRoleList(values) {
  return request({
    url: '/service/sso-service/sso/role/getList',
    method: 'POST',
    data: values,
  });
}

export function updateUserRole(values) {
  return request({
    url: '/service/sso-service/sso/user/editUserInfo',
    method: 'POST',
    data: values,
  });
}
