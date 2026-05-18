import request from '../../../utils/request';

export function queryList() {
  return request({
    url: '/service/tool-service/vendor/getAll',
    method: 'GET',
  });
}

export function create(values) {
  return request({
    url: '/service/tool-service/vendor/add',
    method: 'POST',
    data: values,
  });
}

export function update(values) {
  return request({
    url: '/service/tool-service/vendor/editVendor',
    method: 'PUT',
    data: values,
  });
}

export function remove(id) {
  return request({
    url: `/service/tool-service/vendor/delVendor?vendorId=${id}`,
    method: 'DELETE',
    // data: values,
  });
}
