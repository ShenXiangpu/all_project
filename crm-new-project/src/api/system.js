import request from '@/utils/request'

// Dict
export function getDictList() {
  return request({ url: '/api/system/dict/list', method: 'get' })
}
export function getDictData(dictType) {
  return request({ url: '/api/system/dict/data', method: 'get', params: { dictType } })
}

// Menu
export function getMenuList(params) {
  return request({ url: '/api/system/menu/list', method: 'get', params })
}
export function getMenuDetail(id) {
  return request({ url: '/api/system/menu/detail', method: 'get', params: { id } })
}
export function saveMenu(data) {
  return request({ url: '/api/system/menu/save', method: 'post', data })
}
export function updateMenu(data) {
  return request({ url: '/api/system/menu/update', method: 'post', data })
}
export function deleteMenu(id) {
  return request({ url: '/api/system/menu/delete', method: 'delete', params: { id } })
}

// Org
export function getOrgList() {
  return request({ url: '/api/system/org/list', method: 'get' })
}
export function saveDept(data) {
  return request({ url: '/api/system/dept/save', method: 'post', data })
}
export function updateDept(data) {
  return request({ url: '/api/system/dept/update', method: 'post', data })
}
export function deleteDept(id) {
  return request({ url: '/api/system/dept/delete', method: 'delete', params: { id } })
}
export function savePost(data) {
  return request({ url: '/api/system/post/save', method: 'post', data })
}
export function updatePost(data) {
  return request({ url: '/api/system/post/update', method: 'post', data })
}
export function deletePost(id) {
  return request({ url: '/api/system/post/delete', method: 'delete', params: { id } })
}

// Role
export function getRoleList(params) {
  return request({ url: '/api/system/role/list', method: 'get', params })
}
export function saveRole(data) {
  return request({ url: '/api/system/role/save', method: 'post', data })
}
export function updateRole(data) {
  return request({ url: '/api/system/role/update', method: 'post', data })
}
export function deleteRole(id) {
  return request({ url: '/api/system/role/delete', method: 'delete', params: { id } })
}

// User
export function getUserList(params) {
  return request({ url: '/api/system/user/list', method: 'get', params })
}
export function saveUser(data) {
  return request({ url: '/api/system/user/save', method: 'post', data })
}
export function updateUser(data) {
  return request({ url: '/api/system/user/update', method: 'post', data })
}
export function deleteUser(id) {
  return request({ url: '/api/system/user/delete', method: 'delete', params: { id } })
}

// Permission
export function getResources() {
  return request({ url: '/api/system/resources', method: 'get' })
}
export function getRoleMenus(roleId) {
  return request({ url: '/api/system/role/menus', method: 'get', params: { roleId } })
}
export function distributeMenu(data) {
  return request({ url: '/api/system/role/distributeMenu', method: 'post', data })
}
