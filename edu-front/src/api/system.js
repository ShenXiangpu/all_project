import request from '@/utils/request'

/**
 *  菜单详情
 */
export function getMenuDetailById(id) {

  return request({
    url: `edu/sso-service/sso/menu/v2/getMenuDetailById?id=${id}`,
    method: 'get',
  })
}


/**
 *  创建菜单
 */
export function createMenu(data) {
  return request({
    url: `edu/sso-service/sso/menu/v2/saveMenu`,
    method: 'post',
    data
  })
}

/**
 *  删除菜单
 */
export function deleteMenu(id) {
  return request({
    url: `edu/sso-service/sso/menu/v2/delMenus?menuIds=${id}`,
    method: 'delete',
  })
}

/**
 *  更新菜单
 */
export function editMenu(data) {
  return request({
    url: `edu/sso-service/sso/menu/v2/updMenu`,
    method: 'post',
    data
  })
}

/**
 *  菜单列表
 */
export function getMenuList(data) {
  return request({
    url: `edu/sso-service/sso/menu/v2/listMenus?keyword=${data.keyWord || ''}`,
    method: 'get',
  })
}

/**
 *  权限列表
 */
export function getListForFont(data) {
  return request({
    url: `edu/sso-service/sso/menu/v2/listResources`,
    method: 'get',
    data
  })
}

//角色管理


/**
 *  角色详情
 */
export function getRoleDetailById(id) {
  return request({
    url: `iot/zkxy-sensor-auth/auth/role/${id}`,
    method: 'get',
    data
  })
}


/**
 *  新增角色
 */
export function createRole(data) {
  return request({
    url: `edu/sso-service/sso/role/v2/create`,
    method: 'post',
    data
  })
}

/**
 *  删除角色
 */
export function deleteRole(id) {
  let data = { id }
  return request({
    url: `edu/sso-service/sso/role/v2/delete`,
    method: 'delete',
    data
  })
}
/**
 * 更新角色
 * @param {*} data ：{
  "cnName": "string",
  "id": 0,
  "name": "string",
  "type": 0
}
 * @returns
 */
export function editRole(data) {
  return request({
    url: `edu/sso-service/sso/role/v2/edit`,
    method: 'put',
    data
  })
}

/**
 * 查询角色列表
 * @param {*} param
 * @returns
 */
export function getRoleList(param) {
  const { keyWord, roleType } = param;
  const data = {  keyWord, roleType };

  return request({
    url: `edu/sso-service/sso/role/v2/getList?pageNum=${param && param.page || 1}&pageSize=${param && param.limit || 10}`,
    method: 'post',
    data
  })
}

/**
 * 获取用户已授权的菜单
 */
export function getRoleMenuList(id) {
  return request({
    url: `edu/sso-service/sso/role/v2/getRoleMenus?roleId=${id}`,
    method: 'get',
  })
}

/**
 * 授权菜单
 */
export function distributeRoleMenu(data) {
  return request({
    url: `edu/sso-service/sso/role/v2/distributeMenu`,
    method: 'post',
    data
  })
}

// 用户管理

/**
 * 批量删除用户
 * @param {*} data ：{
 * userIds 字符串 1,2,3,4
}
 * @returns
 */
export function delUser(data) {
  return request({
    url: `edu/sso-service/sso/user/v2/delUser?userIds=${data.id}`,
    method: 'delete',
    data
  })
}



/**
 * 查询当前登录人信息
 * @param {*} data ：{
}
 * @returns
 */
export function getMe() {
  return request({
    url: `edu/sso-service/sso/user/v2/getMe`,
    method: 'get',
  })
}



/**
 * 根据id查询用户详情
 * @param {*} data ：{
}
 * @returns
 */
export function getUserDetailById(data) {
  return request({
    url: `edu/sso-service/sso/user/v2/getUserDetailById?id=${data.id}`,
    method: 'get',
  })
}


/**
 * 分页查询用户
 * @param {*} data ：{
}
 * @returns
 */
export function listUsers(data) {
  let params = '';
  if (data) {
    if (data.keyWord) {
      params += `&keyWord=${data.keyWord}`
    }
    if (data.roleId) {
      params += `&roleId=${data.roleId}`
    }
    if (data.grade) {
      params += `&grade=${data.grade}`
    }
    if (data.className) {
      params += `&className=${data.className}`
    }
    if (data.studentNum) {
      params += `&studentNum=${data.studentNum}`
    }
    if (data.universityName) {
      params += `&universityName=${data.universityName}`
    }
  }

  return request({
    url: `edu/sso-service/sso/user/v2/listUsers?pageNum=${data.page || 1}&pageSize=${data.limit || 10}${params}`,
    method: 'get',
  })
}



/**
 * 新增用户
 * @param {*} data ：{
  }
 * @returns
 */
export function saveUser(data) {
  return request({
    url: `edu/sso-service/sso/user/v2/saveUser`,
    method: 'post',
    data
  })
}


/**
 * 新增用户
 * @param {*} data ：{
  }
 * @returns
 */
export function updUser(data) {
  return request({
    url: `edu/sso-service/sso/user/v2/updUser`,
    method: 'post',
    data
  })
}



/**
 * 下载设备导入模板
 */
export function downEduUserTemplate() {
  return request({
    url: `edu/sso-service/sso/user/v2/downEduUserTemplate`,
    method: 'get',
    responseType: 'blob'
  })
}


/**
 * 批量导入用户
 * @param {*} data
 * @returns
 */
export function insertUserBatch(data) {
  return request({
      url: 'edu/sso-service/sso/user/v2/insertUserBatch',
      method: 'post',
      data,
      // responseType: 'blob'
  })
}

/**
 * 批量导入用户
 * @param {*} data
 * @returns
 */
export function exportUserExcel(data) {
  return request({
      url: 'edu/sso-service/sso/user/v2/exportUserExcel',
      method: 'post',
      data,
      responseType: 'blob'
  })
}

