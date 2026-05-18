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
    if (data.clueName) {
      paramsData += `&clueName=${data.clueName}`;
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
    url: `${context1}/contract/add`,
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
    url: `${context1}/contract/update`,
    method: "post",
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
    url: `${context1}/customer/customerInfo/customerList?ids=${data && data.id}`,
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
  //

  export function downContractFileById(data) {
    return request({
      url: `${context1}/contract/downloadFile?contractAttachmentId=${data && data.id}`,
      method: "get",
      responseType: "blob",
    });
  }

  //获取一个合同的跟进记录列表 contractId contractFollowUp/list?contractId=12
  export function contractFollowUpList(data) {
    return request({
      url: `${context1}/contractFollowUp/list?contractId=${data && data.id}`,
      method: "get",
    });
  }
 // 新增合同跟进记录 contractFollowUp/addOne
  export function contractFollowUpAddOne(data) {
    return request({
      url: `${context1}/contractFollowUp/addOne`,
      method: "post",
      data,
    });
  }
  // 修改合同跟进记录 contractFollowUp/editOne
  export function contractFollowUpEditOne(data) {
    return request({
      url: `${context1}/contractFollowUp/editOne`,
      method: "put",
      data,
    });
  }

