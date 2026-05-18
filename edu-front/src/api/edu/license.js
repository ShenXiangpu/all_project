/**
 * 工具操作
 */

import request from '@/utils/request'


/**
 * 添加liscense
 * @param {*} data 
 * @returns 
 */
export function addLicenseServer(data) {
    return request({
        url: `edu/zkxy-vm-web/license/addLicenseServer`,
        method: 'post',
        data
    })
}

/**
 * 删除liscense
 * @param {*} data 
 * @returns 
 */
export function delLicenseServer(data) {
    return request({
        url: `edu/zkxy-vm-web/license/delLicenseServer?serverId=${data.id}`,
        method: 'delete',
    })
}



/**
 * 修改licenseServer
 * @param {*} data 
 * @returns 
 */
export function editLicenseServer(data) {
    return request({
        url: `edu/zkxy-vm-web/license/editLicenseServer`,
        method: 'put',
        data
    })
}


/**
 * 获取EDA工具列表
 * @param {*} data 
 * @returns 
 */
export function getLicenseServers(data) {
    let params = '';
    if (data && data.params) {
        let paramData = data.params;
        if (paramData.keyword) {
            //查询关键字
            params += `&keyword=${paramData.keyword}`;
        }
        //供应商id
        if (paramData.vendorId) {
            params += `&vendorId=${paramData.vendorId}`;
        }
    }
    return request({
        url: `edu/zkxy-vm-web/license/getLicenseServers?pageNum=${data && data.page || 1}&pageSize=${data && data.limit || 10}${params}`,
        method: 'get'
    })
}


/**
 * 修改licenseServer 状态
 * @param {*} data 
 * @returns 
 */
export function changeStatusLicenseServer(data) {
    return request({
        url: `edu/zkxy-vm-web/license/changeStatus?serverId=${data.serverId}&status=${data.status}`,
        method: 'put',
        
    })
}




