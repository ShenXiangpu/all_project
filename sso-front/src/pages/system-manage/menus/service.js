import request from '../../../utils/request';

export function queryMenuList(values) {
  return request({
    url: '/service/sso-service/sso/menu/getList',
    method: 'POST',
    data: values
  });
}

export function createMenu(values) {
  return request({
    url: '/service/sso-service/sso/menu/createNew',
    method: 'POST',
    data: values,
  });
}

export function updateMenu(values) {
  return request({
    url: '/service/sso-service/sso/menu/editNew',
    method: 'PUT',
    data: values,
  });
}

export function removeMenu(values) {
  return request({
    url: '/service/sso-service/sso/menu/delete',
    method: 'DELETE',
    data: values,
  });
}

export function editStatus(values) {
  return request({
    url: `/service/sso-service/sso/menu/editStatus?id=${values.id}&status=${values.status}`,
    method: 'PUT',
    // data: values,
  });
}
