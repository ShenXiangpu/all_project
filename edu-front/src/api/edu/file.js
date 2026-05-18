import request from '@/utils/request'



export function mergeChunkFile(data) {
	return request({
		url: `edu/zkxy-vm-web/file/merge`,
		method: 'post',
		data
	})
}

/**
 * 下载文件
 */

export function downloadFile(data) {
	console.log(data);
	let param = ''
	if(data && data.userId && data.userId != 0) {
		param = `&userId=${data.userId}`
	}

	return request({
		url: `edu/zkxy-vm-web/file/downloadFile?vmId=${data && data.vmId}&currentDir=${data && encodeURIComponent(data.currentDir)}&fileName=${data && encodeURIComponent(data.fileName)}${param}`,
		method: 'get',
		// responseType: 'blob'
	})
}
/**
 * 初始化分片上传任务(仅华为云使用)
 */

export function uploadSmallFile(data) {
	console.log(data);
	let param = "";
  
	if (data && data.remark) {
	  param = `&remark=${data.remark}`;
	}
  
	if (data && data.courseId) {
	  param = `&courseId=${data.courseId}`;
	}
  
	return request({
	  url: `edu/zkxy-vm-web/file/uploadSmallFile?fileRename=${
		data && data.fileRename
	  }&fileSource=${data && data.fileSource || 'commonFile'}${param}`,
	  method: "post",
	  data: data.file,
	});
  }
  
  