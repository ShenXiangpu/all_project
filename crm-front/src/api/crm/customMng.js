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
//consumerSourceId=2&cooperationAreaId=3&followUpStatusId=4&status=1

export function customAllList(data) {
  let paramsData = "";
  if (data && data.customerName) {
    paramsData += `&customerName=${data.customerName}`;
  }
  return request({
    url: `${context1}/customer/customerInfo/page/pageAllList?pageSize=${100}&pageNum=${1}${paramsData}`,
    method: "get",
  });
}

/**
 *
 * @param {*} data
 * @param {*} op add,update,query
 * @returns
 */
export function customList(paramObj) {
  let paramsData = "";
  if (paramObj && paramObj.params) {
    let data = paramObj.params;
    if (data.customerName) {
      paramsData += `&customerName=${data.customerName}`;
    }
    if (data.linkPhone) {
      paramsData += `&linkPhone=${data.linkPhone}`;
    }
    if (data.companyTypeId) {
      paramsData += `&companyTypeId=${data.companyTypeId}`;
    }
    if (data.followUpStatusId) {
      paramsData += `&followUpStatusId=${data.followUpStatusId}`;
    }
    if (data.status) {
      paramsData += `&status=${data.status}`;
    }
    if (data.consumerIntentionId) {
      paramsData += `&consumerIntentionId=${data.consumerIntentionId}`;
    }
    if (data.consumerSourceId) {
      paramsData += `&consumerSourceId=${data.consumerSourceId}`;
    }
    if (data.cooperationAreaId) {
      paramsData += `&cooperationAreaId=${data.cooperationAreaId}`;
    }
    if (data.consumerLevelId) {
      paramsData += `&consumerLevelId=${data.consumerLevelId}`;
    }
    if (data.searchDateStart) {
      paramsData += `&searchDateStart=${data.searchDateStart}`;
    }
    if (data.searchDateEnd) {
      paramsData += `&searchDateEnd=${data.searchDateEnd}`;
    }
    if (data.deptId) {
      paramsData += `&deptId=${data.deptId}`;
    }
  }
  return request({
    url: `${context1}/customer/customerInfo/page/list?pageSize=${
      (paramObj && paramObj.limit) || 10
    }&pageNum=${(paramObj && paramObj.page) || 1}${paramsData}`,
    method: "get",
  });
}

/**
 * 新增一条线索
 * @param {*} data
 * @returns
 */
export function addOne(data) {
  return request({
    url: `${context1}/customer/customerInfo/addOne`,
    method: "post",
    data,
  });
}

/**
 * 修改一条线索
 * @param {*} data
 * @returns
 */
export function editOne(data) {
  return request({
    url: `${context1}/customer/customerInfo/editOne`,
    method: "put",
    data,
  });
}

/**
 * 新增一条线索
 * @param {*} data
 * @returns
 */
export function delCustomList(data) {
  return request({
    url: `${context1}/customer/customerInfo/customerList?ids=${
      data && data.id
    }`,
    method: "delete",
  });
}

/**
 * 分页获取合作记录列表
 * @param {*} paramObj
 * @returns
 */
export function contractRecordsList(paramObj) {
  let paramsData = "";
  if (paramObj && paramObj.params) {
    let data = paramObj.params;
    if (data.customerName) {
      paramsData += `&customerName=${data.customerName}`;
    }

    if (data.companyTypeId) {
      paramsData += `&companyTypeId=${data.companyTypeId}`;
    }

    if (data.consumerSourceId) {
      paramsData += `&consumerSourceId=${data.consumerSourceId}`;
    }
    if (data.cooperationAreaId) {
      paramsData += `&cooperationAreaId=${data.cooperationAreaId}`;
    }
    if (data.paymentStatus) {
      paramsData += `&paymentStatus=${data.paymentStatus}`;
    }
    if (data.contactDeptId) {
      paramsData += `&contactDeptId=${data.contactDeptId}`;
    }
    if (data.searchDateStart) {
      paramsData += `&searchDateStart=${data.searchDateStart}`;
    }
    if (data.searchDateEnd) {
      paramsData += `&searchDateEnd=${data.searchDateEnd}`;
    }
  }
  return request({
    url: `${context1}/customer/customerCooperation/page/list?pageSize=${
      (paramObj && paramObj.limit) || 10
    }&pageNum=${(paramObj && paramObj.page) || 1}${paramsData}`,
    method: "get",
  });
}


//跟进一个客户/供应商
export function addCustomerFollowUp(data) {
  return request({
    url: `${context1}/customerFollowUp/addOne`,
    method: "post",
    data,
  });
}
