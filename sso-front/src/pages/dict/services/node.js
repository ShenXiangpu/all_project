import request from '../../../utils/request';

export function queryNodeList(values) {
  return request({
    url: '/service/ipdatamanage/v1/ipdatamanage/list/node',
    method: 'GET',
    data: values
  });
}

export function create(values) {
  return request({
    url: '/service/ipdatamanage/v1/ipdatamanage/create/node',
    method: 'POST',
    data: values,
  });
}

export function update(values) {
  return request({
    url: '/service/ipdatamanage/v1/ipdatamanage/node/edit',
    method: 'PUT',
    data: values,
  });
}

export function remove(values) {
  return request({
    url: `/service/ipdatamanage/v1/ipdatamanage/node/delete?nodeName=${values.nodeName}`,
    method: 'DELETE',
    // data: values,
  });
}
