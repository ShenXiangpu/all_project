
/**
 * 作业和批改作业
 */

import request from '@/utils/request'
import { context1 } from '@/api/context'

/**
 * 新增作业
 * @param {*} data 
 * @returns 
 */
export function uploadLab(data) {
    return request({
        url: `${context1}/sso-service/mini-io/lab/upload`,
        method: 'post',
        data
    })
}

/**
 * Lab管理：删除一个leb
 * @param {*} data 
 * @returns 
 */
export function deleteLabById(data) {
    return request({
        url: `${context1}/sso-service/mini-io/lab/one?id=${data.id}`,
        method: 'delete'
    })
}

/**
 * 获取Lab列表,暂时不需要分页
 * @param {*} data 
 * @returns 
 */
export function getOenList(data) {
    let params = '';
    if (data && data.params) {
        let paramData = data.params;
        if (paramData.fileName) {
            //查询关键字
            params += `&fileName=${paramData.fileName}`;
        }

    }
    return request({
        url: `${context1}/sso-service/mini-io/lab/getOenList?pageNum=${data && data.page || 1}&pageSize=${data && data.limit || 10}${params}`,
        method: 'get'
    })
}

/**
 * Lab管理：删除一个leb
 * @param {*} data 
 * @returns 
 */
export function maxFileUploadSize(data) {
    return request({
        url: `${context1}/sso-service/mini-io/dict/maxFileUploadSize`,
        method: 'get'
    })
}


/**
 * Lab管理：删除一个leb
 * @param {*} data 
 * @returns 
 */
export function updateLab(data) {
    return request({
        url: `${context1}/sso-service/mini-io/lab/one`,
        method: 'put',
        data
    })
}
//