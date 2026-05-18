
/**
 * 试题和题库
 */

import request from '@/utils/request'
import { context1 } from '@/api/context'
/**
 * 教学方向管理
 * 
 */

/**
 * 查询 教学方向
 */

export function getTeachDirectionList(data) {
    return request({
        url: `${context1}/sso-service/teachDirection/getList`,
        method: 'get',
    })
}
/**
 * 新增、修改
 * @param {*} data 
 * @returns 
 */
export function addOrUpdateTeachDirection(data) {
    return request({
        url: `${context1}/sso-service/teachDirection/save`,
        method: 'put',
        data
    })
}

//题型标签
export function getListLables(data) {
    return request({
        url: `${context1}/sso-service/questionLable/listLables`,
        method: 'get',
    })
}





/**
 * 题型管理
 */

/**
 * 查询
 * @param {*} data 
 * @returns 
 */
export function getQuestionTypeList(data) {
    return request({
        url: `${context1}/sso-service/questionType/getList`,
        method: 'get',
    })
}

/**
 * 新增、修改
 * @param {*} data 
 * @returns 
 */
export function addOrUpdataQuestionType(data) {
    return request({
        url: `${context1}/sso-service/questionType/save`,
        method: 'put',
        data
    })
}
/**
 * 题库管理
 */


/**
 * 导出题库--TODO待调研
 * @param {*} data 
 * @returns 
 */
export function exportQuBank(data) {
    return request({
        url: `${context1}/sso-service/questionBank/exportQuBank?quIds=${data && data.id}`,
        method: 'get',
        responseType: 'blob'

    })
}

/**
 * 查询题库下拉框
 * @param {*} data 
 * @returns 
 */
export function getList4SelectBox(data) {
    return request({
        url: `${context1}/sso-service/questionBank/getList4SelectBox`,
        method: 'get',
    })
}



/**
 * 查询题库下拉框
 * @param {*} data 
 * @returns 
 */
export function getQuBankList(data) {
    let paramsData = ''
    let params = data && data.params
    if (params && params.keyWord) {
        paramsData += `&keyWord=${params.keyWord}`
    }
    if (params && params.directionId) {
        paramsData += `&directionId=${params.directionId}`
    }
    if ((params.isPublic == 0 || params.isPublic == 1) && params.isPublic != 'all') {
        paramsData += `&isPublic=${params.isPublic}`
    }
    return request({
        url: `${context1}/sso-service/questionBank/getQuBankList?pageNum=${data && data.page || 1}&pageSize=${data && data.limit || 10}${paramsData}`,
        method: 'get',
    })
}


/**
 * 添加或修改
 * @param {*} data 
 * @returns 
 */
export function addOrUpdataQuestionBank(data) {
    return request({
        url: `${context1}/sso-service/questionBank/save`,
        method: 'post',
        data
    })
}


/**
 * 题目管理
 */

/**
 * 新增/修改题目
 */
export function addOrUpdataQuestionItem(data) {
    return request({
        url: `${context1}/sso-service/questionItem/save`,
        method: 'put',
        data
    })
}


/**
 * 查询
 * @param {*} data 
 * @returns 
 */
export function getItemListByBankId(data) {
    let paramsData = ''
    let params = data && data.params
    if (params && params.keyWord) {
        paramsData += `&keyWord=${params.keyWord}`
    }
    if (params && params.label) {
        paramsData += `&label=${params.label}`
    }
    if (params && params.quTypeId && params.quTypeId != 0) {
        paramsData += `&quTypeId=${params.quTypeId}`
    }
    if (params && params.level) {
        paramsData += `&level=${params.level}`
    }
    return request({
        url: `${context1}/sso-service/questionItem/getItemListByBankId?&quBankId=${data && data.quBankId}&pageNum=${data && data.page || 1}&pageSize=${data && data.limit || 10}${paramsData}`,
        method: 'get',
    })
}

//sso-service/questionItem/getItemById?id=123
export function getItemById(data) {
    return request({
        url: `${context1}/sso-service/questionItem/getItemById?id=${data.id}`,
        method: 'get',
    })
}
/**
 * 添加一个试卷
 * @param {*} data 
 * @returns 
 */
export function addOne(data) {
    return request({
        url: `${context1}/sso-service/questionPaper/addOne`,
        method: 'post',
        data
    })
}

/**
 * 批量操作
 */

/*
*批量删除试卷
*/
export function deleteQuestions(data) {
    return request({
        url: `${context1}/sso-service/questionItem/del?ids=${data.ids}`,
        method: 'delete',
    })
}

/*
*下载题目导入模板
*/
export function downImportTemplate(data) {
    return request({
        url: `${context1}/sso-service/questionItem/downImportTemplate?type=${data.quTypeId}`,
        method: 'get',
        responseType: 'blob'
    })
}

/*
*批量导入题目
*/
export function importItems(data) {
    return request({
        url: `${context1}/sso-service/questionItem/importItems?quBankId=${data.quBankId}`,
        method: 'post',
        data: data.file
    })
}

/*
*批量设置题目标签
*/
export function setLabels(data) {
    return request({
        url: `${context1}/sso-service/questionItem/setLabels?itemIds=${data.itemId}&labels=${data.labels}`,
        method: 'put',
    })
}

/**
 * 批量移除题目标签
 * @param {*} data 
 * @returns 
 */
//
export function removeLabels(data) {
    return request({
        url: `${context1}/sso-service/questionItem/removeLabels?itemIds=${data.itemIds}`,
        method: 'delete',
    })
}

/*
*批量导出题目
*/
export function exportItems(data) {
    return request({
        url: `${context1}/sso-service/questionItem/exportItems?itemIds=${data.ids}`,
        method: 'get',
        responseType: 'blob'
    })
}



/**
 * 查询试卷列表
 * @param {*} data 
 * @returns 
 */
export function getTestPaperList(data) {
    let paramsData = ''
    let params = data && data.params

    if (params && params.ofPublic) {
        paramsData += `&ofPublic=${params.ofPublic}`
    }
    if (params && params.title) {
        paramsData += `&title=${params.title}`
    }
    return request({
        url: `${context1}/sso-service/questionPaper/page/list?pageNum=${data && data.page || 1}&pageSize=${data && data.limit || 10}${paramsData}`,
        method: 'get',
    })
}

/**
 * 
 * @param {*} data 
 * @returns 
 */
export function getTestPaperDetailById(data) {
    return request({
        url: `${context1}/sso-service/questionPaper/one/detail?id=${data.id}&isStudent=${data.isStudent || false}`,
        method: 'get',
    })
}



/**
 * 修改试卷
 * @param {*} data 
 * @returns 
 */
export function modifyOne(data) {
    return request({
        url: `${context1}/sso-service/questionPaper/modifyOne`,
        method: 'put',
        data
    })
}



/**
 * 
 */
/**
 * 修改试卷
 * @param {*} data 
 * @returns 
 */
export function getHomeworkPathByid(data) {
    return request({
        url: `${context1}/sso-service/sso/homework/v2/getHomeworkPathByid?homeworkMarkId=${data && data.id}&paperId=${data && data.paperId}`,
        method: 'get',
    })
}



/*
* 导出一套试卷
*/
export function downQuestionPaper(data) {
    return request({
        url: `${context1}/sso-service/questionPaper/file/download/questionPaper?ids=${data.ids}`,
        method: 'post',
        responseType: 'blob'
    })
}



// 删除试卷
export function deleteOne(data) {
    return request({
        url: `${context1}/sso-service/questionPaper/deleteOne?id=${data.id}`,
        method: 'delete',
    })
}






