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
export function higeList(paramObj) {
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
    url: `${context1}/clue/disclosureClue/page/list?pageSize=${
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
 * 领取，分配线索
 */

export function addMoreRel(data) {
  return request({
    url: `${context1}/clue/disclosureClueUserRel/addMoreRel`,
    method: "post",
    data,
  });
}
