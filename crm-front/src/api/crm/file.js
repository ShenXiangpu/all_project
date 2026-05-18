import request from "@/utils/request";
import { context1 } from "@/api/crm/context";
export function initUpload(data) {
  return request({
    url: `edu/zkxy-vm-web/file/initUpload?fileName=${
      data && data.fileName
    }&md5=${data && data.md5}&fileSource=${data && data.fileSource}`,
    method: "get",
  });
}

export function mergeChunkFile(data) {
  return request({
    url: `${context1}/file/merge`,
    method: "post",
    data,
  });
}

/**
 * 下载文件
 */

export function downloadFile(data) {
  console.log(data);
  let param = "";
  if (data && data.userId && data.userId != 0) {
    param = `&userId=${data.userId}`;
  }
  if (data && data.userName) {
    param = `&userName=${data.userName}`;
  }

  return request({
    url: `edu/zkxy-vm-web/file/downloadFile?vmId=${
      data && data.vmId
    }&currentDir=${data && encodeURIComponent(data.currentDir)}&fileName=${
      data && encodeURIComponent(data.fileName)
    }${param}`,
    method: "get",
    // responseType: 'blob'
  });
}

/**
 * 初始化分片上传任务(仅华为云使用)
 */

export function uploadSmallFile(data) {


  return request({
    url: `${context1}/file/file/smallSingeFileUpload`,
    method: "post",
    data: data.file,
  });
}

//

export function getDownloadUrl(data) {
  return request({
    url: `edu/zkxy-vm-web/file/getDownloadUrl?url=${data && data.url}`,
    method: "post",
  });
}
