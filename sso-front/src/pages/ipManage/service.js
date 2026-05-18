import request from 'utils/request';

export function queryList(values) {
  return request({
    url: '/service/ipdatamanage/v1/ipdatamanage/list/admin/ips',
    method: 'GET',
    data: values
  });
}

export function create(values) {
  return request({
    url: '/service/ipdatamanage/v1/ipdatamanage/ip/upload',
    method: 'POST',
    data: values,
  });
}

export function update(values) {
  return request({
    url: `/service/ipdatamanage/v1/ipdatamanage/ip/update?id=${values.id}`,
    method: 'POST',
    data: values,
  });
}

export function remove(id) {
  return request({
    url: `/service/ipdatamanage/v1/ipdatamanage/ip/delete?id=${id}`,
    method: 'DELETE',
    // data: values,
  });
}
