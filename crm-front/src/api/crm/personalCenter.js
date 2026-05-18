import request from '@/utils/request'
import { context1 } from "@/api/crm/context";


/**
 * 根据过滤条件精准查询消息
 * @returns 
 */
export function updUserBasicInfo(data) {

    return request({
        url: `${context1}/system/user/updUserBasicInfo`,
        method: 'put',
        data
    })
}

/**
 * 根据过滤条件精准查询消息
 * @returns 
 */
export function updUserPwd(data) {

    return request({
        url: `${context1}/system/user/updUserPwd`,
        method: 'put',
        data
    })
}

//
//
/**
 * 新增作业
 * @param {*} data 
 * @returns 
 */
export function uploadUserAvatar(data) {
    return request({
        url: `edu/sso-service/sso/user/v2/uploadUserAvatar`,
        method: 'post',
        data
    })
}
