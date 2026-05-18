
import request from '@/utils/request'
import { context1 } from '@/api/context'

/**
 * 查询角色列表
 * @param {*} param 
 * @returns 
 */
export function getUserOperateLog(data) {
    let operation = data && data.operation
    let param = ''
    if (operation) {
        param += `&operation=${operation}`
    }
    let keyWord = data && data.keyWord
    if (keyWord) {
        param += `&keyWord=${keyWord}`
    }

    return request({
        url: `${context1}/sso-service/sso/behaviorLog/getUserOperateLog?pageNum=${data && data.page || 1}&pageSize=${data && data.limit || 10}${param}`,
        method: 'get',
    })
}

///sso-service/sso/behaviorLog/getUserOperateType

export function getUserOperateType() {
    return request({
        url: `${context1}/sso-service/sso/behaviorLog/getUserOperateType`,
        method: 'get',
    })
}