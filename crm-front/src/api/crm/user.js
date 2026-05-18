import request from "@/utils/request";
import { context1 } from "@/api/crm/context";
export function login(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: `${context1}/system/auth/login`,
    method: "post",
    data,
  });
}

/**
 * 有效期
 * @returns
 */

export function isLicenseEnabled() {
  return request({
    url: `${context1}/zkxy-vm-web/edulicense/isLicenseEnabled`,
    method: "get",
  });
}

export function getInfo() {
  return request({
    url: `${context1}/system/user/getMe`,
    method: "get",
  });
}

export function logout() {
  return request({
    url: `${context1}/crm/logout`,
    method: "post",
  });
}
// 获取路由
export function listRoutes() {
  return request({
    url: `${context1}/system/menu/listRoutes`,
    method: "get",
  });
}

//职位下拉列表
export function getPostList(data) {
  return request({
    url: `${context1}/system/post/getPostList?deptId=${data && data.id}`,
    method: "get",
  });
}

/**
 * 所有用户
 * @param {*} data
 * @returns
 */
export function getAllUserSelect(data = {}) {
  let url = "";
  if (data && data.userName) {
    url = `${context1}/system/user/getAllUserSelect?userName=${
      data && data.userName
    }`;
  } else {
    url = `${context1}/system/user/getAllUserSelect`;
  }
  return request({
    url,
    method: "get",
  });
}

/**
 * 用户状态停用-启用 status 0停用 1启用
 */
export function editUserStatus(data) {
  return request({
    url: `${context1}/system/user/editUserStatus?userId=${
      data && data.userId
    }&status=${data && data.status}`,
    method: "put",
  });
}
