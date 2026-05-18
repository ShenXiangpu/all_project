import request from '@/utils/request'
import { context1 } from '@/api/context'


/**
 * 根据过滤条件精准查询消息
 * @returns 
 */
export function updUserBasicInfo(data) {

    return request({
        url: `${context1}/sso-service/sso/user/updUserBasicInfo`,
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
        url: `${context1}/sso-service/sso/user/updUserPwd`,
        method: 'put',
        data
    })
}


//

