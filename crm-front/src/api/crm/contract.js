import { context1 } from "@/api/crm/context";
import request from "@/utils/request";

/**
 *
 * @param {*} data
 * @param {*} op add,update,query
 * @returns
 */
export function opDict(data, op) {
  return request({
    url: `${context1}/dict/${op}`,
    method: "post",
    data,
  });
}

/**
 *
 * @param {*} data
 * @param {*} op add,update,query
 * @returns
 */
export function queryContractList(paramObj) {
  return request({
    url: `${context1}/contract/query?pageSize=${
      (paramObj && paramObj.limit) || 10
    }&pageNum=${(paramObj && paramObj.page) || 1}`,
    method: "post",
    data: paramObj.params || {},
  });
}

/**
 *
 * @param {*} data
 * @param {*} op add,update,query
 * @returns
 */
export function deleteContract(data) {
  return request({
    url: `${context1}/contract/delete`,
    method: "post",
    data,
  });
}

/**
 * 根据客户ID查询合同列表
 * @param {*} data
 * @returns
 */
export function queryByCustomerId(data) {
  return request({
    url: `${context1}/contract/queryByCustomerId?customerId=${data && data.id}`,
    method: "post",
  });
}

/**
 * 根据客户ID查询合同列表
 * @param {*} data
 * @returns
 */
export function queryLogoInfo(data) {
  return request({
    url: `${context1}/customer/infoLog/query?customerId=${data && data.id}`,
    method: "get",
  });
}

/**
 * 根据客户ID查询合同列表
 * @param {*} data
 * @returns
 */
export function oneDetail(data) {
  return request({
    url: `${context1}/customer/customerInfo/oneDetail?customerId=${
      data && data.id
    }`,
    method: "get",
  });
}

/**
 * 新增一个客户联系人
 * @param {*} data
 * @returns
 */
export function addOne(data) {
  return request({
    url: `${context1}/customer/customerInfo/liaison/addOne`,
    method: "post",
    data,
  });
}

/**
 * 修改一个客户联系人
 * @param {*} data
 * @returns
 */
export function editOne(data) {
  return request({
    url: `${context1}/customer/customerInfo/liaison/updateOne`,
    method: "put",
    data
  });
}



/**
 * 删除一个客户联系人
 * @param {*} data
 * @returns
 */
export function deleteOne(data) {
  return request({
    url: `${context1}/customer/customerInfo/liaison/delOne?customerLiaisonId=${
      data && data.id
    }`,
    method: "delete",
  });
}


/**
 * 下载设备导入模板
 */
export function downUserTemplate() {
  return request({
    url: `${context1}/contract/downContractTemplate`,
    method: "get",
    responseType: "blob",
  });
}


/**
 * 批量导入用户
 * @param {*} data
 * @returns
 */
export function insertUserBatch(data) {
  return request({
    url: `${context1}/contract/batchImport`,
    method: "post",
    data,
    // responseType: 'blob'
  });
}

