/**
 * 作业和批改作业
 */

import request from '@/utils/request'


/**
 * 新增IP
 * @param {*} data
 * @returns
 */
export function addIP(data) {
	return request({
		url: `edu/sso-service/file/ip/add`,
		method: 'post',
		data
	})
}

/**
 * 新增IP
 * @param {*} data
 * @returns
 */
export function addVersion(data) {
	return request({
		url: `edu/sso-service/file/ip/item/add`,
		method: 'post',
		data
	})
}

/**
 * 修改Ipversion
 * @param {*} data
 * @returns
 */
export function editIPVersion(data) {
	return request({
		url: `edu/sso-service/file/ip/item/modify`,
		method: 'PUT',
		data
	})
}
/**
 * 删除IP
 * @param {*} data
 * @returns
 */
export function delOneIP(data) {
	return request({
		url: `edu/sso-service/file/ip/delOne?id=${data && data.id}`,
		method: 'DELETE'
	})
}

/**
 * 删除IP version
 * @param {*} data
 * @returns
 */
export function delOneIPVersion(data) {
	return request({
		url: `edu/sso-service/file/ip/item/delOne?id=${data && data.id}`,
		method: 'DELETE'
	})
}
/**
 *根据IP id获取version列表
 * @param {*} data
 * @returns
 */
export function getIPVersionListByIPId(data) {
	return request({
		url: `edu/sso-service/file/ip/item/list?id=${data.id}`,
		method: 'get'
	})
}

/**
 * 根据课程id获取作业数
 * @param {*} data
 * @returns
 */
export function modifyIp(data) {
	return request({
		url: `edu/sso-service/file/ip/modify`,
		method: 'put',
		data
	})
}


/**
 * 分页搜索：搜索项查询
 * @param {*} data
 * @returns
 */
export function searchKey(data) {
	return request({
		url: `edu/sso-service/file/help/searchKey`,
		method: 'get',
		data
	})
}


/**
 *
 * @param {*} data
 * @returns
 */
export function geIpList(data) {
	console.log(data);
    let params = data && data.params
	let paramData = ''
    if (params && params.name) {
        paramData += `&name=${params.name}`
    }
    if (params && params.supplier) {
        paramData += `&supplier=${params.supplier}`
    }
    if (params && params.packageType) {
        paramData += `&packageType=${params.packageType}`
    }
    if (params && params.process) {
        paramData += `&process=${params.process}`
    }
    if (params && params.universityName) {
        paramData += `&universityName=${params.universityName}`
    }

    return request({
        url: `edu/sso-service/file/ip/page?pageSize=${data && data.limit || 10}&pageNum=${data && data.page || 1}${paramData}`,
        method: 'get',
    })
}




