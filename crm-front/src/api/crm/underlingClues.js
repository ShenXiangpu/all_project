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
export function subordinateList(paramObj) {
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
    url: `${context1}/clue/subordinate/page/list?pageSize=${
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
export function addOneClue(data) {
  return request({
    url: `${context1}/clue/disclosureClue/addOneClue`,
    method: "post",
    data,
  });
}

/**
 * 修改一条线索
 * @param {*} data
 * @returns
 */
export function editOneClue(data) {
  return request({
    url: `${context1}/clue/disclosureClue/editOneClue`,
    method: "put",
    data,
  });
}

/**
 * 新增一条线索
 * @param {*} data
 * @returns
 */
export function delClueList(data) {
  return request({
    url: `${context1}/clue/disclosureClue/clueList?ids=${data && data.id}`,
    method: "delete",
    data,
  });
}

/**
 * 下属线索 -》 删除一组线索
 * @param {*} data
 * @returns
 */
export function deleteMoreClue(data) {
  return request({
    url: `${context1}/clue/subordinate/deleteMoreClue`,
    method: "delete",
    data,
  });
}


//我的资源：释放一组线索
export function releaseMoreClue(data) {
  return request({
    url: `${context1}/clue/subordinate/releaseMoreClue`,
    method: "put",
    data,
  });
}


