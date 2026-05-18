/**
 * 工具操作
 */

import request from "@/utils/request";

/**
 * 添加liscense
 * @param {*} data
 * @returns
 */
export function check(data) {
  return request({
    url: `edu/sso-service/file/multi/upload/check?md5=${data && data.md5}`,
    method: "get",
  });
}

/**
 * 获取上传地址
 * @param {*} data
 * @returns
 */
export function uploadFileUrls(data) {
  return request({
    url: `edu/sso-service/file/multi/upload?biz=${data && data.biz}&fileName=${
      data && data.fileName
    }&md5=${data && data.md5}&fileSize=${data && data.fileSize}&chunkSize=${
      data && data.chunkSize
    }&contentType=${data && data.contentType}`,
    method: "post",
  });
}

/**
 * 上传完成合并上传
 * @param {*} data
 * @returns
 */
export function mergeChunk(data) {
    return request({
      url: `edu/sso-service/file/multi/upload/merge?biz=${data && data.biz}&fileName=${
        data && data.fileName
      }&md5=${data && data.md5}&uploadId=${data && data.uploadId}`,
      method: "post",
    });
  }

