import request from '@/utils/request'
import { context1 } from "@/api/crm/context";
/**
 * 流程审批列表-（待审批+已审批的记录）
 */

export function getLogs(data) {
  const { page, limit, params } = data;
  let url = `${context1}/system/oplog/getLogs?pageNum=${page}&pageSize=${limit}`;

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


export function getOperateType() {
  return request({
    // url: '/vue-element-admin/user/login',
    url:  `${context1}/system/oplog/getOperateType`,
    method: 'get'
  })
}
