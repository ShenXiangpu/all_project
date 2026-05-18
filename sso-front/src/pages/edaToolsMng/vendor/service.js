import request from 'utils/request';

export function queryVendorList() {
    return request({
        url: '/service/tool-service/vendor/getAll',
        method: 'GET',
    });
}

export function createVendor(values) {
    return request({
        url: '/service/tool-service/vendor/add',
        method: 'POST',
        data: values,
    });
}

export function updateVendor(values) {
    return request({
        url: '/service/tool-service/vendor/editVendor',
        method: 'PUT',
        data: values,
    });
}

export function removeVendor(values) {
    return request({
        url: `/service/tool-service/vendor/delVendor?vendorId=${values.vendorId}`,
        method: 'DELETE',
        // data: values,
    });
}

export function removeVendorList(values) {
    return request({
        url: '/service/tool-service/vendor/delMulti',
        method: 'DELETE',
        data: values,
    });
}

export function sshConfig(values) {
    return request({
        url: '/service/tool-service/ssh/config',
        method: 'POST',
        data: values,
    });
}

export function getConfigList(values) {
    return request({
        url: '/service/tool-service/ssh/getConfigList',
        method: 'POST',
        data: values,
    });
}

export function configOperate(values) {
    return request({
        url: `/service/tool-service/ssh/operate?edaVendorCode=${values.edaVendorCode}&operation=${values.operation}`,
        method: 'POST'
    });
}

export function replaceFile(values) {
    return request({
        url: '/service/tool-service/ssh/replace',
        method: 'POST',
        data: values,
    });
}

export function limit(values) {
    return request({
        url: `/service/tool-service/ssh/limit?edaVendorCode=${values.edaVendorCode}`,
        method: 'POST',
        data: values,
    });
}
