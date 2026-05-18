//实验中心
import request from '@/utils/request'
import { context1 } from '@/api/context'

/**
 * @param {*} data 
 * @returns 
 */
export function handleTrial(data) {
    return request({
        url: `${context1}/sso-service/trial/trial`,
        method: data && data.method,
        data: data && data.params
    })
}

/**
 * @param {*} data 
 * @returns 
 */
export function handleTrial2(data) {
    return request({
        url: `${context1}/sso-service/trial/trial2`,
        method: 'post',
        data
    })
}

// ?


/**
 * 
 * @param {*} data 
 * @returns 
 */
export function getMyTrialList(data) {

    let params = ''
    if (data && data.trialName) {
        params += `&trialName=${data.trialName}`
    }
    if (data && data.createBy) {
        params += `&createBy=${data.createBy}`
    }
    if (data && data.ofPublic) {
        params += `&ofPublic=${data.ofPublic}`
    }
    if (data && data.studentStatus || data.studentStatus == 0) {
        params += `&studentStatus=${data.studentStatus}`
    }
    if (data && data.courseId) {
        params += `&courseId=${data.courseId}`
    }
    return request({
        url: `${context1}/sso-service/trial/page/my?pageSize=${data && data.limit || 10}&pageNum=${data && data.page || 1}${params}`,
        method: 'get',
    })
}


/**
 * 
 * @param {*} data 
 * @returns 
 */
export function getSquareTrialList(data) {

    let params = ''
    if (data && data.trialName) {
        params += `&trialName=${data.trialName}`
    }
    if (data && data.createBy) {
        params += `&createBy=${data.createBy}`
    }
    return request({
        url: `${context1}/sso-service/trial/page/square?pageSize=${data && data.limit || 10}&pageNum=${data && data.page || 1}${params}`,
        method: 'get',
    })
}

//
/**
 * 从广场中添加实验时，展示的筛选的实验列表
 * @param {*} data 
 * @returns 
 */
export function getSquare4ForkList(data) {

    let params = ''
    if (data && data.trialName) {
        params += `&trialName=${data.trialName}`
    }
    if (data && data.createBy) {
        params += `&createBy=${data.createBy}`
    }
    if (data && data.courseId) {
        params += `&courseId=${data.courseId}`
    }

    if (data && data.ofPublic) {
        params += `&ofPublic=${data.ofPublic}`
    }
    return request({
        url: `${context1}/sso-service/trial/list/square4Fork?pageSize=${data && data.limit || 10}&pageNum=${data && data.page || 1}${params}`,
        method: 'get',
    })
}


//
/**
 * 
 * @param {*} data 
 * @returns 
 */
export function createBy(data) {
    let params = ''
    if (data && data.self) {
        params += `&self=${data.self}`
    }
    if (data && data.ofPublic) {
        params += `&ofPublic=${data.ofPublic}`
    }

    return request({
        url: `${context1}/sso-service/trial/searchKey/createBy?str=1${params}`,
        method: 'get',
    })
}

//
/**
 * 获取一个实验的详情
 * @param {*} data 
 * @returns 
 */
export function oneDetail(id) {
    return request({
        url: `${context1}/sso-service/trial/oneDetail?trialCourseId=${id}`,
        method: 'get',
    })
}



/**
 * 获取一个实验模板的详情
 * @param {*} data 
 * @returns 
 */
export function oneTrialTempInfo(id) {
    return request({
        url: `${context1}/sso-service/trial/oneTrialTempInfo?trialId=${id}`,
        method: 'get',
    })
}
//pageNum=1&pageSize=10&trialCourseId=1&keyWord=1&status=1&className=1

//
/**
 * 从广场中添加实验时，展示的筛选的实验列表
 * @param {*} data 
 * @returns 
 */
export function getListTrialReport(data) {

    let params = ''
    if (data && data.trialCourseId) {
        params += `&trialCourseId=${data.trialCourseId}`
    }
    if (data && data.keyWord) {
        params += `&keyWord=${data.keyWord}`
    }
    if (data && data.status) {
        params += `&status=${data.status}`
    }

    if (data && data.className) {
        params += `&className=${data.className}`
    }
    return request({
        url: `${context1}/sso-service/trialReport/listTrialReport?pageSize=${data && data.limit || 10}&pageNum=${data && data.page || 1}${params}`,
        method: 'get',
    })
}

/**
 * 
填写实验报告
 * @param {*} data 
 * @returns 
 */
export function submitReport(data) {
    return request({
        url: `${context1}/sso-service/trialReport/submitReport`,
        method: 'put',
        data
    })
}


/**
 * 
填写实验报告
 * @param {*} data 
 * @returns 
 */
export function deleteOneRel(data) {
    return request({
        url: `${context1}/sso-service/trial/oneRel?trialCourseId=${data && data.id}`,
        method: 'delete',
    })
}


/**
 * 查看实验报告
 */
export function getTrialReportById(data) {
    return request({
        url: `${context1}/sso-service/trialReport/getTrialReportById?reportId=${data && data.id}`,
        method: 'get',
    })
}


//?reportId=123

/**
 * 批改实验报告
 */
export function markReport(data) {
    return request({
        url: `${context1}/sso-service/trialReport/markReport?reportId=${data && data.reportId}&score=${data && data.score}&suggestion=${data && data.suggestion}`,
        method: 'put',
    })
}





/**
 * 实验报告查询--班级下拉框
 */
export function getClassesForSearch(data) {
    return request({
        url: `${context1}/sso-service/trialReport/getClassesForSearch?trialCourseId=${data && data.id}`,
        method: 'get',
    })
}


/**
 * 上传
 * @param {*} data 
 * @returns 
 */
export function uploadFile(data) {
    return request({
        url: `${context1}/sso-service/trial/file/uploadFile`,
        method: 'post',
        data
    })
}


/**
 * 下载实验报告
 * @param {*} data 
 * @returns 
 */
export function downLoadReport(data) {
    return request({
        url: `${context1}/sso-service/trialReport/downLoadReport?reportIds=${data && data.ids}`,
        method: 'get',
        responseType: 'blob'
    })
}

/**
 * 根据过滤条件精准查询消息
 * @returns 
 */
export function manualPDF(data) {
    let params = '';
    if (data && data.trialCourseId) {
        params = '?trialCourseId=' + data.trialCourseId
    } else if (data && data.trialId) {
        params = '?trialId=' + data.trialId
    }

    return request({
        url: `${context1}/sso-service/trial/file/download/manualPDF` + params,
        method: 'post',
        responseType: 'blob'

    })
}

/**
 * 修改一个自定义实验里的任务
 */
export function modifyTrialItem(data) {
    return request({
        url: `${context1}/sso-service/trial/modifyTrialItem`,
        method: 'put',
        data
    })
}


/**
 * 新增一个自定义实验里的任务
 */
export function addTrialItem(data) {
    return request({
        url: `${context1}/sso-service/trial/addTrialItem`,
        method: 'post',
        data
    })
}



/**
 *  获取一个实验所包含的任务列表
 */


export function oneTrialHasItemList(data) {
    return request({
        url: `${context1}/sso-service/trial/oneTrialHasItemList?trialId=${data.trialId}`,
        method: 'get',
    })
}


/**
 *  获取一个实验所包含的任务列表
 */


export function listFile(data) {
    let param = '';
    if (data && data.path) {
        param = '&path=' + data.path
    }
    return request({
        url: `${context1}/zkxy-vmware-api/vm/listFile?vmId=${data && data.vmId}${param}`,
        method: 'post',
    })
}

/**
 *
 */

//
export function taskLogin(data) {
    return request({
        url: `${context1}/zkxy-vmware-api/experiment/taskLogin?taskID=${data && data.taskID}`,
        method: 'get',
    })
}


/**
 *  删除一个实验所包含的任务列表
 */
export function deleteOneTrialOneItem(data) {
    return request({
        url: `${context1}/sso-service/trial/deleteOneTrialOneItem?trialItemId=${data && data.trialItemId}`,
        method: 'delete',
    })
}




