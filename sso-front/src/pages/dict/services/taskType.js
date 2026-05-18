import request from '../../../utils/request';

export function queryList() {
  return request({
    url: '/service/tool-service/task-type/getList',
    method: 'GET',
  });
}

export function create(values) {
  return request({
    url: '/service/tool-service/task-type/add',
    method: 'POST',
    data: values,
  });
}

export function update(values) {
  return request({
    url: '/service/tool-service/task-type/edit',
    method: 'PUT',
    data: values,
  });
}

export function remove(id) {
  return request({
    url: `/service/tool-service/task-type/delete?typeId=${id}`,
    method: 'DELETE',
    // data: values,
  });
}
