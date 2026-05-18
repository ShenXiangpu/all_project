import request from '@/utils/request'

import { context1 } from '@/api/context'
/**
 * 新增作业
 * @param {*} data 
 * @returns 
 */
export function uploadRourse(data) {
    return request({
        url: `${context1}/sso-service/mini-io/file/upload`,
        method: 'post',
        data
    })
}

//
/**
 * 修改lab
 * @param {*} data 
 * @returns 
 */
export function updateResource(data) {
    return request({
        url: `${context1}/sso-service/mini-io/file/one`,
        method: 'put',
        data
    })
}

/**
 * 
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
    // let params = '';
    // if (data && data.params) {
    //     let paramData = data.params;
    //     if (paramData.courseId) {
    //         //查询关键字
    //         params += `&courseId =${paramData.courseId}`;
    //     }

    // }
    return request({
        url: `${context1}/sso-service/sso/file/projectResource/list?projectId=12=${data.courseId}`,

        // url: `${context1}/sso-service/mini-io/file/getOenList?pageNum=${data && data.page || 1}&pageSize=${data && data.limit || 10}${params}`,
        method: 'get'
    })
}


/**
 * 保存章节
 */
export function saveChapter(data) {
    return request({
        url: `${context1}/sso-service/section/save`,
        method: 'put',
        data
    })
}


/**
 * 查询章节及文件列表list
 */
export function listSections(data) {
    return request({
        url: `${context1}/sso-service/section/listSections?courseId=${data && data.courseId}`,
        method: 'get'
    })
}


/**
 * 
 */
export function delChapterOrFile(data) {
    return request({
        url: `${context1}/sso-service/section/del?id=${data && data.id}&isSection=${data && data.isSection}`,
        method: 'delete'
    })
}


/**
 * 
 */
export function uploadOneFile(data) {
    return request({
        url: `${context1}/sso-service/section/uploadOneFile?sectionId=${data && data.sectionId}&fileName=${data && data.fileName}`,
        method: 'post',
        data: data && data.file
    })
}

/**
 * 查看章节或文件，学习进度详情
 */
export function getStudentLearnDetail(data) {
    return request({
        url: `${context1}/sso-service/section/getStudentLearnDetail?id=${data && data.sectionId}&isSection=${data && data.isSection}`,
        method: 'get',
    })
}

/**
 * 查看章节或文件，学习进度详情
 */
export function editSectionFile(data) {
    return request({
        url: `${context1}/sso-service/section/editSectionFile`,
        method: 'put',
        data
    })
}
//

export function exportStudentExcel(data) {
    return request({
        url: `${context1}/sso-service/section/exportStudentExcel?id=${data && data.id}&isSection=${data && data.isSection}&isCompleted=${data && data.isCompleted}`,
        method: 'get',
        responseType: 'blob'
    })
}

//更新文件学习进度

export function updateFileLearnRate(data) {
    return request({
        url: `${context1}/sso-service/section/updateFileLearnRate?fileId=${data && data.fileId}&stuRate=${data && data.stuRate}`,
        method: 'put',
    })
}

