/**
 * 作业和批改作业
 */

import request from '@/utils/request'


/**
 * IP list
 * @param {*} data 
 * @returns 
 */
export function iPList(data) {
	return request({
		url: `edu/sso-service/file/ip/list`,
		method: 'get',
	})
}

/**
 * pdk list
 * @param {*} data 
 * @returns 
 */
export function pdkList(data) {
	return request({
		url: `edu/sso-service/file/pdk/list`,
		method: 'get',
	})
}




