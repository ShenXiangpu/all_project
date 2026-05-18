/**
 * 工具操作
 */
import request from "@/utils/request";

/**
 * 添加学校
 * @param {*} data
 * @returns
 */
export function addOrEditSchool(data) {
  return request({
    url: `edu/sso-service/university/save`,
    method: "PUT",
    data,
  });
}

/**
 * 删除
 * @param {*} data
 * @returns
 */
export function delSchool(data) {
  return request({
    url: `edu/sso-service/university/del?id=${data.id}`,
    method: "delete",
  });
}
/**
 * 获取列表
 * @param {*} data
 * @returns
 */
export function getSchoolList(data) {
  console.log("getSchoolList data", data);
  let status = data?.status
  if (data?.status == undefined) {
    status = '';
  } else if (data?.status == "0") {
    status = "0";
  }
  return request({
    url: `edu/sso-service/university/getList?universityName=${
      data?.universityName || ""
    }&type=${data?.type || ""}&status=${status}`,
    method: "get",
  });
}

/**
 * 获取高校数据列表
 * @param {*} data
 * @returns
 */
export function getUniversityData(data) {
  let params = "";
  Object.keys(data || {}).forEach((key) => {
    if (data[key] !== "" && data[key] !== null && data[key] !== undefined) {
      params += `&${key}=${data[key]}`;
    }
  });
  return request({
    url: `edu/sso-service/university/getUniversityData?t=t${params}`,
    method: "get",
  });
}

/** * 获取高校详情
 * @param {*} data
 * @returns
 */
export function universityUserList(data) {
  return request({
    url: `edu/sso-service/sso/user/v2/universityUserList?pageNum=${
      (data && data.page) || 1
    }&pageSize=${(data && data.limit) || 30}&universityId=${
      data && data.universityId
    }`,
    method: "get",
  });
}

/**
 *
统计高校时间段内的vnc登录次数的Echarts图表
 * @param {*} data
 * @returns
 */
export function getUniVncLoginEcharts(data) {
  return request({
    url: `edu/zkxy-vm-web/getUniVncLoginEcharts?universityId=${
      data && data.universityId
    }&interval=${(data && data.interval) || 7}`,
    method: "get",
  });
}

//sso-service/university/getUniLoginEcharts?universityName=12&interval=12

/**
 * 获取高校时间段内的登录次数的Echarts图表
 * @param {*} data
 * @returns
 */
export function getUniLoginEcharts(data) {
  return request({
    url: `edu/sso-service/university/getUniLoginEcharts?universityName=${
      data && data.universityName
    }&interval=${(data && data.interval) || 7}`,
    method: "get",
  });
}

/**
 * 获取高校时间段内的登录次数
 * @param {*} data
 * @returns
 */

// sso-service/sso/behaviorLog/getUserOperateLog?pageNum=1&pageSize=12&universityName=121312
export function getUserOperateLog(data) {
  console.log("getUserOperateLog data", data);
  let params = "";
  let paramData = data.params || {};
  Object.keys(paramData || {}).forEach((key) => {
    if (
      paramData[key] !== "" &&
      paramData[key] !== null &&
      paramData[key] !== undefined
    ) {
      params += `&${key}=${paramData[key]}`;
    }
  });

  return request({
    url: `edu/sso-service/sso/behaviorLog/getUserOperateLog?pageNum=${
      (data && data.page) || 1
    }&pageSize=${(data && data.limit) || 10}&universityName=${
      data && data.universityName
    }${params}`,
    method: "get",
  });
}

//sso-service/sso/behaviorLog/getUserOperateType
export function getUserOperateType() {
  return request({
    url: `edu/sso-service/sso/behaviorLog/getUserOperateType`,
    method: "get",
  });
}

//sso-service/mini-io/lab/labListOfDistributionBySu?fileName=12&universityId=12&universityName=12
export function labListOfDistributionBySu(data) {
  return request({
    url: `edu/sso-service/mini-io/lab/labListOfDistributionBySu`,
    method: "get",
  });
}

///sso-service/trial/page/pagesOfDistributionBySu?trialName=12&createByName=12&createBy=12&pageSize=10&pageNum=1
export function trialPagesOfDistributionBySu(data) {
  let params = "";
  let paramData = data.params || {};
  Object.keys(paramData || {}).forEach((key) => {
    if (
      paramData[key] !== "" &&
      paramData[key] !== null &&
      paramData[key] !== undefined &&
      key !== "page" &&
      key !== "limit"
    ) {
      params += `&${key}=${paramData[key]}`;
    }
  });
  return request({
    url: `edu/sso-service/trial/page/pagesOfDistributionBySu?&pageSize=${
      (data && data.limit) || 10
    }&pageNum=${(data && data.page) || 1}${params}`,
    method: "get",
  });
}

export function ipOrPdkListOfDistributionBySu(op = "ip") {
  return request({
    url: `edu/sso-service/file/${op}/listOfDistributionBySu`,
    method: "get",
  });
}

/**
 * 获取问题库分发详情
 * @param {*} data
 * @returns
 */
export function questionBankGetListDistributionBySu(data) {
  let params = "";
  Object.keys(data || {}).forEach((key) => {
    if (data[key] !== "" && data[key] !== null && data[key] !== undefined) {
      params += `&${key}=${data[key]}`;
    }
  });
  return request({
    url: `edu/sso-service/questionBank/getListDistributionBySu?s=1${params}`,
    method: "get",
  });
}

//zkxy-vm-web/tool/edaToolsNoVersion
export function edaToolsNoVersion() {
  return request({
    url: `edu/zkxy-vm-web/tool/edaToolsNoVersion`,
    method: "get",
  });
}

//sso-service/university/getUniDisDetail?id=12

/**
 * 获取高校分发详情
 * @param {*} data
 * @returns
 */
export function getUniDisDetail(data) {
  return request({
    url: `edu/sso-service/university/getUniDisDetail?id=${data.id}`,
    method: "get",
  });
}

//sso-service/university/distributeResource

/**
 * 分发资源
 * @param {*} data
 * @returns
 */
export function distributeResource(data) {
  return request({
    url: `edu/sso-service/university/distributeResource`,
    method: "post",
    data,
  });
}
