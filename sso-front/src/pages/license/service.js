import request from 'utils/request';

/**
 * 厂商 --> 工具 --> feature 级联
 */

//获取EDA厂商下拉列表
export function getEdaVendorList(values) {
    return request({
        url: '/lms/vendor/selectVendor',
        method: 'GET',
        data: values
    });
}

//获取EDA工具下拉列表
export function getToolList(values) {
    return request({
        url: '/lms/tool/selectTool',
        method: 'GET',
        data: values
    });
}

//获取EDA工具feature下拉列表
export function getFeatureList(values) {
    return request({
        url: '/lms/fea/selectFea',
        method: 'GET',
        data: values
    });
}


export function queryFeatureList(values) {
    const pageNum = values.pageNum || 1;
    const pageSize = values.pageSize || 10;
    return request({
        url: `/lms/fea/edaFea?pageNum=${pageNum}&&pageSize=${pageSize}`,
        method: 'POST',
        data: values
    });
}

