/**
 * 工具操作
 */

import request from '@/utils/request'
import { context1 } from '@/api/context'

/**
 * 添加工具
 * @param {*} data 
 * @returns 
 */
export function addTool(data) {
    return request({
        url: `${context1}/zkxy-vmware-api/tool/addTool`,
        method: 'post',
        data
    })
}

/**
 * 添加工具版本
 * @param {*} data 
 * @returns 
 */
export function addToolVersion(data) {
    return request({
        url: `${context1}/zkxy-vmware-api/tool/addToolVersion`,
        method: 'post',
        data
    })
}


/**
 * 删除工具信息
 * @param {*} data 
 * @returns 
 */
export function delTool(data) {
    return request({
        url: `${context1}/zkxy-vmware-api/tool/delTool?toolId=${data.id}`,
        method: 'delete',
    })
}


/**
 * 删除工具版本信息
 * @param {*} data 
 * @returns 
 */
export function delToolVersion(data) {
    return request({
        url: `${context1}/zkxy-vmware-api/tool/delToolVersion?versionId=${data.id}`,
        method: 'delete',
    })
}

/**
 * 修改工具信息
 * @param {*} data 
 * @returns 
 */
export function editTool(data) {
    return request({
        url: `${context1}/zkxy-vmware-api/tool/editTool`,
        method: 'put',
        data
    })
}


/**
 * 修改工具版本信息
 * @param {*} data 
 * @returns 
 */
export function editToolVersion(data) {
    return request({
        url: `${context1}/zkxy-vmware-api/tool/editToolVersion`,
        method: 'put',
        data
    })
}


/**
 * 获取EDA工具列表
 * @param {*} data 
 * @returns 
 */
export function getEdaTools(data) {
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
        url: `${context1}/zkxy-vmware-api/tool/getEdaTools?pageNum=${data && data.page || 1}&pageSize=${data && data.limit || 10}${params}`,
        method: 'get'
    })
}


/**
 * 获取EDA工具供应商列表
 * @param {*} data 
 * @returns 
 */
export function getEdaVendor(data) {
    return request({
        url: `${context1}/zkxy-vmware-api/tool/getEdaVendor`,
        method: 'get',
        data
    })
}




/**
 * 根据id获取EDA工具版本环境变量列表
 * @param {*} data 
 * @returns 
 */
export function queryToolEnvList(data) {
    return request({
        url: `${context1}/zkxy-vmware-api/tool/queryToolEnvList?versionId=${data.id}`,
        method: 'get',
    })
}


/**
 * 根据id获取EDA工具版本列表
 * @param {*} data 
 * @returns 
 */
export function queryToolVersionList(data) {
    return request({
        url: `${context1}/zkxy-vmware-api/tool/queryToolVersionList?toolId=${data.toolId}`,
        method: 'get',
    })
}


//


/**
 * 根据id获取EDA工具版本列表
 * @param {*} data 
 * @returns 
 */
export function edaTools() {
    return request({
        url: `${context1}/zkxy-vmware-api/tool/edaTools`,
        method: 'get',
    })
}


/**
 * 根据id获取EDA工具版本列表
 * @param {*} data 
 * @returns 
 */
export function changeStatus(data) {
    return request({
        url: `${context1}/zkxy-vmware-api/tool/changeStatus?toolId=${data.toolId}&status=${data.status}`,
        method: 'put',
    })
}

