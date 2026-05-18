import request from '../../../utils/request';

export function queryList(values) {
  return request({
    url: '/service/ipdatamanage/v1/ipdatamanage/list/type?parentId=0',
    method: 'GET',
    data: values
  });
}

export function create(values) {
  return request({
    url: '/service/ipdatamanage/v1/ipdatamanage/create/type',
    method: 'POST',
    data: values,
  });
}

export function update(values) {
  return request({
    url: '/service/sso-service/sso/ipCategory/edit',
    method: 'PUT',
    data: values,
  });
}

export function remove(values) {
  return request({
    url: `/service/ipdatamanage/v1/ipdatamanage/type/delete?id=${values.id}`,
    method: 'DELETE',
    // data: values,
  });
}
