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
export function disclosureClueUserRelList(paramObj) {
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
    url: `${context1}/clue/disclosureClueUserRel/page/myList?pageSize=${
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
    url: `${context1}/clue/disclosureClueUserRel/addOneClue`,
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
    url: `${context1}/clue/disclosureClueUserRel/editOneClue`,
    method: "put",
    data,
  });
}

/**
 * 删除一条线索
 * @param {*} data
 * @returns
 */
export function delClueList(data) {
  return request({
    url: `${context1}/clue/disclosureClueUserRel/deleteMoreClue`,
    method: "delete",
    data,
  });
}

/**
 * 删除一条线索
 * @param {*} data
 * @returns
 */
export function followUpOneClue(data) {
  return request({
    url: `${context1}/clue/disclosureClueUserRel/followUpOneClue`,
    method: "post",
    data,
  });
}

/**
 * 查询跟进记录列表
 */

export function followUpOneClueList(data) {
  return request({
    url: `${context1}/clue/disclosureClueUserRel/followUpOneClueList?clueId=${
      data && data.clueId
    }`,
    method: "get",
  });
}


//我的资源：释放一组线索
export function releaseMoreClue(data) {
  return request({
    url: `${context1}/clue/disclosureClueUserRel/releaseMoreClue`,
    method: "put",
    data,
  });
}

//step2.1：从我的线索中转为客户
export function addOneFromClue(data) {
  return request({
    url: `${context1}/customer/customerInfo/addOneFromClue`,
    method: "post",
    data,
  });
}

/**
 * 新增/修改一个线索规则
 */
export function oneClueRule(data, op = "add") {
  return request({
    url: `${context1}/clue/disclosureRule/${op}One`,
    method: op == "add" ? "post" : "PUT",
    data,
  });
}
/**
 * 删除一个线索规则
 */

export function delOneClueRule(data) {
  const { ids } = data;
  return request({
    url: `${context1}/clue/disclosureRule/clueRuleList?ids=${ids}`,
    method: "delete",
    data,
  });
}

/**
 * 分页获取规则列表
 * */
export function ruleList(data) {
  const { page, limit, params } = data;
  let url = `${context1}/clue/disclosureRule/page/list?pageNum=${page}&pageSize=${limit}`;

  if (params) {
    const keys = Object.keys(params);
    keys.forEach((key) => {
      if (params[key] !== undefined && params[key] !== "") {
        url += `&${key}=${params[key]}`;
      }
    });
  }

  return request({
    url: url,
    method: "get",
  });
}
