import request from '../../../utils/request';

export function queryMenuList(values) {
  return request({
    url: '/service/tool-service/tool-category/list/tree',
    method: 'GET',
    data: values
  });
}

export function createMenu(values) {
  return request({
    url: `/service/tool-service/tool-category/add?&categoryName=${values.categoryName}&parentCid=${values.parentCid || '0'}&sort=${values.sort}`,
    method: 'POST',
  });
}

export function updateMenu(values) {
  return request({
    url: `/service/tool-service/tool-category/update?catId=${values.catId}&categoryName=${values.categoryName}&parentCid=${values.parentCid || '0'}&sort=${values.sort}`,
    method: 'POST',
  });
}

export function removeMenu(values) {
  return request({
    url: `/service/tool-service/tool-category/delete?catId=${values.catId || ''}`,
    method: 'DELETE',
  });
}

export function editStatus(values) {
  return request({
    url: `/service/sso-service/sso/menu/editStatus?id=${values.id}&status=${values.status}`,
    method: 'PUT',
    // data: values,
  });
}
