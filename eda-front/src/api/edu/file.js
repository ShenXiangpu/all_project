import request from '@/utils/request'

import { context1 } from '@/api/context'

export function mergeChunkFile(data) {
	return request({
		url: `${context1}/zkxy-vmware-api/file/merge`,
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
		url: `${context1}/zkxy-vmware-api/file/downloadFile?vmId=${data && data.vmId}&currentDir=${data && encodeURIComponent(data.currentDir)}&fileName=${data && encodeURIComponent(data.fileName)}${param}`,
		method: 'get',
		// responseType: 'blob'
	})
}
