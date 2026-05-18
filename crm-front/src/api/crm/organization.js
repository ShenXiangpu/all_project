import { context1 } from "@/api/crm/context";
import request from "@/utils/request";

/**
 * 新增部门
 * @param {*} data
 * @param {*} op add,update,query
 * @returns
 */
export function saveDept(data) {
  return request({
    url: `${context1}/system/dept/saveDept`,
    method: "post",
    data,
  });
}

/**
 * 修改部门
 * @param {*} data
 * @param {*} op add,update,query
 * @returns
 */
export function updDept(data) {
  return request({
    url: `${context1}/system/dept/updDept`,
    method: "post",
    data,
  });
}
/**
 *删除部门
 * @param {*} data
 * @param {*} op add,update,query
 * @returns
 */
export function delDept(data) {
  return request({
    url: `${context1}/system/dept/delDept?id=${data && data.id}`,
    method: "delete",
  });
}

/**
 *
 * @param {*} data
 * @param {*} op add,update,query
 * @returns
 */
export function subordinateList(paramObj) {
  return request({
    url: `${context1}//system/dept/getDeptPageList?pageSize=${
      (paramObj && paramObj.limit) || 10
    }&pageNum=${(paramObj && paramObj.page) || 1}`,
    method: "get",
  });
}

/**
 * 新增职位
 * @param {*} data
 * @returns
 */
export function savePost(data) {
  return request({
    url: `${context1}/system/post/savePost`,
    method: "POST",
    data,
 
  })
}

/**
 * 修改职位
 * @param {*} data
 * @returns
 */
export function updPost(data) {
  return request({
    url: `${context1}/system/post/updPost`,
    method: "PUT",
    data,
  });
}

/**
 *删除职位
 * @param {*} data
 * @param {*} op add,update,query
 * @returns
 */
export function delPost(data) {
  return request({
    url: `${context1}/system/post/delPost?id=${data && data.id}`,
    method: "delete",
  });
}

/**
 *组织架构列表（分配数据权限时使用）
 * @param {*} data
 * @param {*} op add,update,query
 * @returns
 */

export function getDeptList() {
  return request({
    url: `${context1}/system/dept/getDeptList`,
    method: "get",
  });
}

/**
 * 获取所有职位
 * @param {*} data
 * @param {*} op add,update,query
 * @returns
 */

 export function getAllPostList() {
  return request({
    url: `${context1}/system/post/getAllPostList`,
    method: "get",
  });
}

/**
 * 分配数据权限
 * @param {*} data 
 * @returns 
 */
export function distributeDataScope(data) {
  return request({
    url: `${context1}/system/post/distributeDataScope`,
    method: "put",
    data
  });
}


/**
 * 职位拥有的菜单权限id集合（分配菜单权限时使用）
 * @param {*} data 
 * @returns 
 */

export function getPostMenus(data) {
  return request({
    url: `${context1}/system/post/getPostMenus?postId=${data && data.id}`,
    method: "get",
  });
}
/**
 * 
 * @returns 菜单资源列表
 */

export function listResources() {
  return request({
    url: `${context1}/system/menu/listResources`,
    method: "get",
  });
}

/**
 * 职位分配菜单权限
 * @param {*} data 
 * @returns 
 */
export function distributeMenu(data) {
  return request({
    url: `${context1}/system/post/distributeMenu`,
    method: "post",
    data
  });
}


/**
 * 职位分配菜单权限
 * @param {*} data 
 * @returns 
 */
export function getPostDetailById(data) {
  return request({
    url: `${context1}/system/post/getPostDetailById?id=${data && data.id}`,
    method: "get",
  });
}