import { context1 } from "@/api/crm/context";
import request from "@/utils/request";
import { param } from "jquery";

/**
 * 获取部门下用户
 * @param {*} data
 * @param {*}
 * @returns
 */
export function getUserSelect(userName) {
  let param = "";
  if (userName !== "" && userName !== undefined) {
    param = `?userName=${userName}`;
  }

  return request({
    url: `${context1}/bpm/proc/getUserSelect${param}`,
    method: "get",
  });
}

/**
 * 获取部门下用户
 * @param {*} data
 * @param {*}
 * @returns
 */
export function getDetailById(data) {
  return request({
    url: `${context1}/bpm/proc/getDetailById?id=${data && data.id}`,
    method: "get",
  });
}

/**
 * 新增规则
 * @param {*} data
 * @param {*}
 * @returns
 */
export function add(data) {
  return request({
    url: `${context1}/bpm/proc/add`,
    method: "POST",
    data,
  });
}

/**
 * 规则修改
 * @param {*} data
 * @param {*}
 * @returns
 */
export function edit(data) {
  return request({
    url: `${context1}/bpm/proc/edit`,
    method: "put",
    data,
  });
}

/**
 * 删除规则
 * @param {*} data
 * @param {*}
 * @returns
 */
export function del(data) {
  return request({
    url: `${context1}/bpm/proc/del?id=${data && data.id}`,
    method: "DELETE",
  });
}

/**
 * 规则 停用/启用
 * @param {*} data
 * @param {*}
 * @returns
 */
export function editStatus(data) {
  return request({
    url: `${context1}/bpm/proc/editStatus?id=${data && data.id}&status=${
      data && data.status
    }`,
    method: "put",
  });
}

/**
 * 获取条件列表
 * @param {*} data
 * @param {*}
 * @returns
 */
export function getConditionList() {
  return request({
    url: `${context1}/bpm/condition/getList`,
    method: "get",
  });
}

/**
 * 获取条件列表
 * @param {*} data
 * @param {*}
 * @returns
 */
export function getProcList(data) {
  return request({
    url: `${context1}/bpm/proc/getList?pageNum=${
      (data && data.pageNum) || 1
    }&pageSize=${(data && data.pageSize) || 10}`,
    method: "get",
  });
}

/**
 * 计算审批节点、确定审批流程
 * @param {*} data
 * @returns
 */
export function calculateNode(data) {
  return request({
    url: `${context1}/bpm/inst/calculateNode`,
    method: "post",
    data,
  });
}

/**
 * 实例添加/修改
 */
export function opApproval(data, op) {
  return request({
    url: `${context1}/bpm/inst/${op}`,
    method: "post",
    data,
  });
}

// 新增 myApproveList 方法
export function myApproveList(data) {
  const { page, limit, params } = data;
  let url = `${context1}/bpm/inst/myApproveList?pageNum=${page}&pageSize=${limit}`;

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

/**
 * 获取流程实例详情
 * @param {*} data
 * @returns
 */
export function getInstDetailById(data) {
  return request({
    url: `${context1}/bpm/inst/getDetailById?id=${data && data.id}`,
    method: "get",
  });
}

/**
 * 获取删除实例详情
 * @param {*} data 包含 id 的参数对象
 * @returns
 */
export function removeListById(data, op) {
  return request({
    url: `${context1}/bpm/inst/${op}RemoveList?id=${data && data.id}`,
    method: "get",
  });
}

/**
 * 撤销审批实例
 * @param {*} procInstId - 审批实例ID
 * @returns
 */
export function revoke(data) {
  const { id } = data;
  return request({
    url: `${context1}/bpm/approval/revoke?procInstId=${id}`,
    method: "post",
  });
}

/**
 * 撤销审批实例
 * @param {*} procInstId - 审批实例ID
 * @returns
 */
export function reSubmit(data) {
  const { id } = data;
  return request({
    url: `${context1}/bpm/approval/reSubmit?procInstId=${id}`,
    method: "post",
  });
}

/**
 * 流程审批列表-（待审批+已审批的记录）
 */

export function pendingApproveList(data) {
  const { page, limit, params } = data;
  let url = `${context1}/bpm/inst/pendingApproveList?pageNum=${page}&pageSize=${limit}`;

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

/**
 * 审批实例
 * @param {*} procInstId - 审批实例ID
 * @returns
 */
export function approve(data) {
  return request({
    url: `${context1}/bpm/approval/approve`,
    method: "post",
    data,
  });
}

/**
 * 实例删除
 * @param {*} data
 * @param {*}
 * @returns
 */
export function delMyApproval(data) {
  return request({
    url: `${context1}/bpm/inst/del?id=${data && data.id}`,
    method: "DELETE",
  });
}

/**
 * 接口请求获取流程配置初始化
 */

export function getWorkFlowData() {
  return {
    code: "200",
    msg: "success",
    data: {
      tableId: 1,
      flowPermission: [],
      nodeConfig: {
        nodeName: "发起人",
        type: 0,
        priorityLevel: "",
        settype: "",
        selectMode: "",
        selectRange: "",
        directorLevel: "",
        examineMode: "",
        noHanderAction: "",
        examineEndDirectorLevel: "",
        ccSelfSelectFlag: "",
        conditionList: [],
        nodeUserList: [],
        childNode: {
          
        },
        conditionNodes: [],
      },
    },
  };
}
