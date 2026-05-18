import request from '../../../utils/request';

export function queryRoleList(values) {
    return request({
        url: '/service/sso-service/sso/role/getList',
        method: 'POST',
        data: values
    });
}

export function create(values) {
    return request({
        url: '/service/sso-service/sso/role/create',
        method: 'POST',
        data: values,
    });
}

export function update(values) {
    return request({
        url: '/service/sso-service/sso/role/edit',
        method: 'PUT',
        data: values,
    });
}

export function remove(values) {
    return request({
        url: `/service/sso-service/sso/role/delete`,
        method: 'DELETE',
        data: values,
    });
}
