import request from 'utils/request';

export function getAllVendor() {
    return request({
        url: '/service/tool-service/vendor/getAll',
        method: 'GET',
    });
}

export function queryList(values) {
    const pageNum = values.pageNum || 1;
    const pageSize = values.pageSize || 10;

    return request({
        url: `/service/tool-service/license-server/getServerList?pageNum=${pageNum}&pageSize=${pageSize}`,
        method: 'POST',
        data: values
    });
}


export function create(values) {
    return request({
        url: '/service/tool-service/license-server/add',
        method: 'POST',
        data: values,
    });
}

export function update(values) {
    return request({
        url: '/service/tool-service/license-server/edit',
        method: 'PUT',
        data: values,
    });
}

export function remove(values) {
    return request({
        url: `/service/tool-service/license-server/delete?serverId=${values.serverId}`,
        method: 'DELETE',
        data: values,
    });
}

export function updateStatus(values) {
    return request({
        url: `/service/tool-service/license-server/status?serverId=${values.serverId}&status=${values.status}`,
        method: 'PUT',
        // data: values,
    });
}
