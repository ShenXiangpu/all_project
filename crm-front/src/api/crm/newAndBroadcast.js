/**
 * 作业和批改作业
 */

import request from "@/utils/request";
import { context1 } from "./context";
/**
 * 增加广播消息
 * @param {*} data
 * @returns
 */
export function addFanout(data) {
  return request({
    url: `${context1}/message/broadcastNotification/addOne`,
    method: "post",
    data,
  });
}

/**
 * 推送消息
 * @param {*} data
 * @returns
 */
export function publishFanout(data) {
  return request({
    url: `${context1}/message/broadcastNotification/wantToPush`,
    method: "post",
    data,
  });
}

/**
 * 修改Ipversion
 * @param {*} data
 * @returns
 */
export function editFanout(data) {
  return request({
    url: `${context1}/message/broadcastNotification/updateOne`,
    method: "put",
    data,
  });
}
/**
 * 删除广播消息
 * @param {*} data
 * @returns
 */
export function deleteFanout(data) {
  return request({
    url: `${context1}/message/broadcastNotification/delOne?id=${
      data && data.id
    }`,
    method: "delete",
  });
}

/**
 *
 * @param {*} data
 * @returns
 */
export function queryByPage(data) {
  let params = data && data.params;
  let paramData = "";
  if (params && params.msgTitle) {
    paramData += `&title=${params.msgTitle}`;
  }

  return request({
    url: `${context1}/message/broadcastNotification/page/list?pageSize=${
      (data && data.limit) || 10
    }&pageNum=${(data && data.page) || 1}${paramData}`,
    method: "get",
  });
}

/**
 * 停止广播
 * @param {*} data
 * @returns
 */
export function revertFanout(data) {
  return request({
    url: `${context1}/message/broadcastNotification/stopToPush?id=${
      data && data.id
    }`,
    method: "post",
  });
}
