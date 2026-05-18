
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
        url: `${context1}/sso-service/sso/file/pdk/uploadOne?&fileRename=${data && data.fileRename}&remark=${data && data.remark}`,
        method: 'post',
        data:data && data.FormDatas
    })
}

/**
 * Lab管理：删除一个leb
 * @param {*} data 
 * @returns 
 */
export function deleteLabById(data) {
    return request({
        url: `${context1}/sso-service/sso/file/pdk/delOne?id=${data.id}`,
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
        url: `${context1}/sso-service/sso/file/pdk/pageList?pageNum=${data && data.page || 1}&pageSize=${data && data.limit || 10}${params}`,
        method: 'get'
    })
}

/**
 * 
 * @param {*} data 
 * @returns 
 */
export function maxFileUploadSize(data) {
    return request({
        url: `${context1}/sso-service/sso/file/dict/maxFileUploadSize`,
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
        url: `${context1}/sso-service/sso/file/pdk/modifyRemark?id=${data && data.id}&fileRename=${data && data.displayName}&remark=${data && data.remark}`,
        method: 'put',
    })
}
//