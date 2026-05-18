import request from '@/utils/request'



/**
 * 根据过滤条件精准查询消息
 * @returns 
 */
export function updUserBasicInfo(data) {

    return request({
        url: `edu/sso-service/sso/user/v2/updUserBasicInfo`,
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
        url: `edu/sso-service/sso/user/v2/updUserPwd`,
        method: 'put',
        data
    })
}


//

