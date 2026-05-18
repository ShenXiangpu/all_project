import request from "@/utils/request";

/**
 * 根据过滤条件精准查询消息
 * @returns
 */
export function saveOperationManual(data) {
  return request({
    url: `edu/sso-service/operationManual/save`,
    method: "put",
    data,
  });
}
//

/**
 * 查询手册模块list
 * @returns
 */
export function listOperation(data) {
  return request({
    url: `edu/sso-service/operationManual/listOperation?roleType=${
      data && data.roleType
    }`,
    method: "get",
  });
}

/**
 * 根据id查看详情
 * @returns
 */
export function getDetailById(data) {
  return request({
    url: `edu/sso-service/operationManual/getDetailById?id=${data && data.id}`,
    method: "get",
  });
}

//

/**
 * 删除模块及子模块
 * @returns
 */
export function delById(data) {
  return request({
    url: `edu/sso-service/operationManual/del?id=${data && data.id}`,
    method: "DELETE",
  });
}
