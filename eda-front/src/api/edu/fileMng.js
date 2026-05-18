/**
 * 作业和批改作业
 */

import request from '@/utils/request'
import { context1 } from '@/api/context'
/**
 * (edu)根据当前登录用户和路径展示用户所在设计云下的文件列表
 * @param {*} data 
 * @returns 
 */
export function listFile(data) {
	// let params = ''
	// if (data && data.path) {
	// 	params = ``
	// }
	return request({
		url: `${context1}/zkxy-vmware-api/vm/listFile?vmId=${data.id}&path=${data.path || ""}`,
		method: 'post'
	})
}


/**
 * 文件上传到虚拟机
 */



export function uploadFileToVM(data) {
    let param = ''
    if (data && data.userId && data.userId != 0) {
        param += `&userId=${data.userId}`
    }
    return request({
        url: `${context1}/zkxy-vmware-api/file/uploadFileToVM?vmId=${data && data.vmId}&uploadPath=${data && data.uploadPath}${param}`,
        method: 'post',
        data: data && data.md5
    })
}


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

