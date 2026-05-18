/**
 *  设置
 */
import request from '@/utils/request'


/**
 * 获取系统主题
 * @param {*} data 
 * @returns 
 */
export function getTheme() {
    return request({
        url: `edu/sso-service/systemTheme/getTheme`,
        method: 'get',
    })
}

/**
 * 删除
 * @param {*} data 
 * @returns 
 */
export function saveTheme(data) {
    return request({
        url: `edu/sso-service/systemTheme/save`,
        method: 'put',
        data
    })
}
