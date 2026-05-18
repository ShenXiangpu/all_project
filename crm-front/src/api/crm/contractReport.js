import { context1 } from "@/api/crm/context";
import request from "@/utils/request";

/**
 *
 * @param {*} data
 * @param {*} op add,update,query
 * @returns
 */
export function query(op = "deptContractStatus", data,type = "dept") {
  return request({
    url: `${context1}/report/${type}/${op}?startMonth=${
      data && data.startMonth
    }&endMonth=${data && data.endMonth}`,
    method: "get",
    data,
  });
}


export function followUpOneClueList(data) {
  return request({
    url: `${context1}/customerFollowUp/list?consumerId=${
      data && data.customerId
    }`,
    method: "get",
  });
}

/**
 *
 * @param {*} data
 * @param {*} op add,update,query
 * @returns
 */
export function queryCooperation(op = "cooperationType", data) {
  return request({
    url: `${context1}/report/cooperation/${op}?startTime=${
      data && data.startTime
    }&endTime=${data && data.endTime}`,
    method: "post",
    data,
  });
}




/**
 * 基础合同数据
 * @param {*} data
 * @param {*} op add,update,query
 * @returns
 */

export function queryBasis(data) {
  return request({
    url: `${context1}/report/basis`,
    method: "post",
    data,
  });
}

/**
 * 付款状态和合同状态
 */
export function queryStatus(data) {
  return request({
    url: `${context1}/report/status`,
    method: "post",
    data,
  });
}

/**
 * 合作方向数据
 * @param {*} data
 * @returns
 */
export function queryCooperationData(data) {
  return request({
    url: `${context1}/report/cooperation`,
    method: "post",
    data,
  });
}


/**
 * 所属部门数据
 * @param {*} data
 * @returns
 */
export function queryDept(data) {
  return request({
    url: `${context1}/report/dept`,
    method: "post",
    data,
  });
}

