import request from '../../../utils/request';

export function queryMenuList(values) {
    return request({
        url: '/service/sso-service/sso/menu/getList',
        method: 'GET',
        data: values
    });
}

export function queryRoleList(values) {
    return request({
        url: '/service/sso-service/sso/role/getList',
        method: 'POST',
        data: values
    });
}

export function getRoleMenus(values) {
    return request({
        url: '/service/sso-service/sso/menu/getAuthorized',
        method: 'GET',
        data: values,
    });
}

export function updateRoleMenus(values) {
    return request({
        url: '/service/sso-service/sso/menu/distribute',
        method: 'POST',
        data: values,
    });
}
