/**
 * 作业和批改作业
 */

import request from '@/utils/request'
import { NULL } from 'sass'
import { context1 } from '@/api/context'

/**
 * 新增作业
 * @param {*} data 
 * @returns 
 */
export function addHomework(data) {
	return request({
		url: `${context1}/sso-service/sso/homework/v2/addHomework`,
		method: 'post',
		data
	})
}

/**
 * 修改作业
 * @param {*} data 
 * @returns 
 */
export function editHomework(data) {
	return request({
		url: `${context1}/sso-service/sso/homework/v2/editHomework`,
		method: 'post',
		data
	})
}
/**
 * 删除作业
 * @param {*} data 
 * @returns 
 */
export function deleteHomework(data) {
	return request({
		url: `${context1}/sso-service/sso/homework/v2/deleteHomework?id=${data}`,
		method: 'get'
	})
}

/**
 * 根据作业id获取提交情况
 * @param {*} data 
 * @returns 
 */
export function getHomeworkList(data) {
	return request({
		url: `${context1}/sso-service/sso/homework/v2/getHomeworkList?homeworkId=${data.homeworkId}`,
		method: 'get'
	})
}

/**
 * 根据课程id获取作业数
 * @param {*} data 
 * @returns 
 */
export function getHomeworks(data) {
	return request({
		url: `${context1}/sso-service/sso/homework/v2/getHomeworks?courseId=${data.courseId}`,
		method: 'get'
	})
}

/**
 * 根据课程id获取所有状态作业数
 * @param {*} data 
 * @returns 
 */
export function getAllHomeworks(data) {
	return request({
		url: `${context1}/sso-service/sso/homework/v2/getAllHomeworks?courseId=${data.courseId}`,
		method: 'get'
	})
}

/**
 * 根据课程id获取作业数
 * @param {*} data 
 * @returns 
 */
export function getHomeworksList(data) {
	let params = ''
	if (data && data.schoolYear) {
		params = `&schoolYear=${data.schoolYear}`
	}
	return request({
		url: `${context1}/sso-service/sso/homework/v2/getHomeworksList?courseId=${data.courseId}${params}`,
		method: 'get'
	})
}

/**
 * 根据课程id获取最新作业
 * @param {*} data 
 * @returns 
 */
export function getHomework(courseId) {
	return request({
		url: `${context1}/sso-service/sso/homework/v2/getHomework?courseId=${courseId}`,
		method: 'get'
	})
}

/**
 * 批改作业接口
 * @param {*} param 
 * @returns 
 */
export function mark(data) {
	return request({
		url: `${context1}/sso-service/sso/homework/v2/mark`,
		method: 'put',
		data
	})
}

/**
 * 批改作业接口
 * @param {*} data 
 * @returns 
 */
export function submitHomework(data) {
	return request({
		url: `${context1}/sso-service/sso/homework/v2/submitHomework?homeworkId=${data.homeworkId}`,
		method: 'post',
		data: data && data.answers
	})
}


/**
 * 批改作业接口
 * @param {*} data 
 * @returns 
 */
export function getHomeworkStatistics(data) {
	let params = ''
	if (data && data.className) {
		params = `&className=${data.className}`
	}
	return request({
		url: `${context1}/sso-service/sso/homework/v2/getHomeworkStatistics?courseId=${data.courseId}&homeworkId=${data.homeworkId}${params}`,
		method: 'get'
	})
}
/**
 * 导出作业接口
 * @param {*} data 
 * @returns 
 */
export function exportHomeworkList(data) {
	let params = ''
	if (data) {
		if (data.keyword) {
			//只查询设备，屏蔽其它条件
			params += `&keyword=${data.keyword}`;
		}
		if (data.score) {
			params += `&score=${data.score}`;
		}
		if (data.className) {
			params += `&className=${data.className}`;
		}

		if (data.status) {
			params += `&status=${data.status}`;
		}
	}

	return request({
		url: `${context1}/sso-service/sso/homework/export?homeworkId=${data.homeworkId}${params}`,
		method: 'get',
		responseType: 'blob'
	})
}


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
 * (edu)根据当前登录用户、VmId和文件列表,删除指定设计云下的文件列表
 * @param {*} data 
 * @returns 
 */
export function deleteFiles(param) {
	let data = param.filePathList;
	return request({
		url: `${context1}/zkxy-vmware-api/vm/deleteFiles?vmId=${param.vmId}&filePathList=${param.filePathList}`,
		method: 'post'
	})
}

//
/**
 * (edu)根据课程id获取学生个人作业数据
 * @param {*} data 
 * @returns 
 */
export function getHomeworkByCourseId(data) {
	let params = ''

	if (data && data.homeworkName) {
		params += `&homeworkName=${data.homeworkName}`
	}
	if (data && data.score) {
		let score = encodeURIComponent(data.score);
		params += `&score=${score}`
	}
	if (data && data.status || data.status == 0) {
		params += `&status=${data.status}`
	}
	return request({
		url: `${context1}/sso-service/sso/homework/v2/getHomeworkByCourseId?courseId=${data.courseId}${params}`,
		method: 'get'
	})
}


/**
 * 根据作业批改表id获取学生提交作业文件
 * @param {*} data 
 * @returns 
 */
export function getHomeworkContent(homeworkMarkId) {
	return request({
		url: `${context1}/sso-service/sso/homework/v2/getHomeworkPathByid?homeworkMarkId=${homeworkMarkId}`,
		method: 'get'
	})
}



