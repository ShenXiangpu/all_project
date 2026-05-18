import request from '../../../utils/request';

export function queryList(values) {
    return request({
        url: '/service/ipdatamanage/v1/ipdatamanage/list/foundry',
        method: 'GET',
        data: values
    });
}

export function create(values) {
    return request({
        url: '/service/ipdatamanage/v1/ipdatamanage/create/foundry',
        method: 'POST',
        data: values,
    });
}

export function update(values) {
    return request({
        url: '/service/ipdatamanage/edit',
        method: 'PUT',
        data: values,
    });
}

export function remove(value) {
    return request({
        url: `/service/ipdatamanage/v1/ipdatamanage/foundry/delete?foundryId=${value.id}`,
        method: 'DELETE',
        data: value,
    });
}
