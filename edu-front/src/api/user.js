import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: 'edu/sso-service/sso/v2/login',
    method: 'post',
    data
  })
}

/**
 * 有效期
 * @returns 
 */

export function isLicenseEnabled() {
  return request({
    url: 'edu/zkxy-vm-web/edulicense/isLicenseEnabled',
    method: 'get',
  })
}





export function getInfo() {
  return request({
    url: 'edu/sso-service/sso/user/v2/getMe',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: 'edu/sso-service/sso/logout',
    method: 'post'
  })
}
// 获取路由
export function listRoutes() {
  return request({
    url: `edu/sso-service/sso/menu/v2/listRoutes`,
    method: 'get'
  })
}

// -------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>子账户列表api

/**
 * 获取用户列表
 * @param {*} param 
 * @returns 
 */
export function getUserList(param) {
  const { page, limit, keyWord,companyId } = param;
  let data = {
    keyWord
  };
  return request({
    url: `iot/zkxy-sensor-auth/auth/user/getList?pageNum=${page}&pageSize=${limit}&companyId=${companyId}`,
    method: 'post',
    data
  })
}

/**
 * 查询用户列表-供前端使用
 * @param {*} param 
 * @returns 
 */
export function getListForFont(param) {
  const { page, limit, keyWord } = param;
  let data = {
    keyWord
  };
  return request({
    url: `iot/zkxy-sensor-auth/auth/user/getListForFont?pageNum=${page}&pageSize=${limit}`,
    method: 'post',
    data
  })
}

/**
 * 新增子账户
 * @param {*} data 
 * @returns 
 */
export function createUser(data) {
  return request({
    url: `iot/zkxy-sensor-auth/auth/user/createUser`,
    method: 'post',
    data
  })
}
/**
 * 修改子账户
 * @param {*} data 
 * @returns 
 */
export function editUser(data) {
  return request({
    url: `iot/zkxy-sensor-auth/auth/user/editUser`,
    method: 'put',
    data
  })
}

/**
 * 删除账户
 * @param {*} id 
 * @returns 
 */
export function deleteUser(id) {
  return request({
    url: `iot/zkxy-sensor-auth/auth/user/deleteUser?userId=${id}`,
    method: 'delete'
  })
}
/**
 * 根据用户id查询用户详细信息
 * @param {*} id 
 * @returns 
 */
export function getInfoById(id) {
  return request({
    url: `iot/zkxy-sensor-auth/auth/user/getInfoById?userId=${id}`,
    method: 'get'
  })
}

export function getManagedList(userId) {
  let params = '';
  if(userId != 0){
    params += `?userId=${userId}`
  }
  return request({
    url: `iot/zkxy-sensor-auth/auth/role/getManagedList${params}`,
    method: 'get'
  })
}
