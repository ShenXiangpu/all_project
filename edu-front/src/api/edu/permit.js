import request from '@/utils/request'



/**
 * 获取所有license信息(license按照录入时间倒排)
 * @returns 
 */
 export function getAllLicense(data) {

    return request({
        url: `edu/zkxy-vm-web/edulicense/getAllLicense`,
        method: 'post',
    })
}


/**
 * 获取所有license信息(license按照录入时间倒排)
 * @returns 
 */
export function getLatestLicense(data) {

    return request({
        url: `edu/zkxy-vm-web/edulicense/getLatestLicense`,
        method: 'post',
    })
}


/**
 * 查询物理服务器名称列表
 * @returns 
 */
export function getHostSystemList(data) {
    return request({
        url: `edu/zkxy-vm-web/hostSystem/getHostSystemList`,
        method: 'post',
    })
}

/**
 * 根据物理服务器名称查询服务的信息
 * @returns 
 */
export function getHostSystemInfos(data) {
    return request({
        url: `edu/zkxy-vm-web/hostSystem/getHostSystemInfos`,
        method: 'post',
        data
    })
}

//
/**
 * 根据物理服务器名称查询服务的信息
 * @returns 
 */
export function addLicense(data) {
    return request({
        url: `edu/zkxy-vm-web/edulicense/addLicense`,
        method: 'post',
        data
    })
}
