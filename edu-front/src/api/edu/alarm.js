import request from "@/utils/request";

/**
 * 学生端-向老师发起请求
 */
export function getAlarmConfigsBySchool(data) {
  return request({
    url: `edu/zkxy-vm-web/alarm/getAlarmConfigsBySchool`,
    method: "get",
  });
}
/**
 * 查询实操云警报事件
 * @param {*} data
 * @returns
 */

export function queryAlarmEvent(data) {
  return request({
    url: `edu/zkxy-vm-web/alarm/queryAlarmEvent?pageNum=${
      (data && data.page) || 1
    }&pageSize=${(data && data.limit) || 10}`,
    method: "post",
    data: data && data.params,
  });
}


/**
 * 根据实操云id和告警配置id删除告警配置信息
 * @param {*} data
 * @returns
 */

export function deleteAlarmEvent(data) {
  return request({
    url: `edu/zkxy-vm-web/alarm/deleteAlarmEvent?id=${data && data.id}`,
    method: "post",
  });
}

