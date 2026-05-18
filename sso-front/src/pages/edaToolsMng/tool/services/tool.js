import request from 'utils/request';

export function queryList(values) {
  const pageNum = values.pageNum || 1;
  const pageSize = values.pageSize || 10;

  return request({
    url: `/service/tool-service/tool/getToolList?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'POST',
    data: values
  });
}

export function getTaskType() {
  return request({
    url: '/service/tool-service/tools/querytasktype',
    method: 'GET',
  });
}

// 获取所有厂商
export function getAllVendor() {
  return request({
    url: '/service/tool-service/vendor/getAll',
    method: 'GET',
  });
}

export function create(values) {
  return request({
    url: '/service/tool-service/tool/add',
    method: 'POST',
    data: values,
  });
}

export function update(values) {
  return request({
    url: '/service/tool-service/tool/editTool',
    method: 'PUT',
    data: values,
  });
}

export function remove(values) {
  return request({
    url: `/service/tool-service/tool/delTool?toolId=${values.toolId}`,
    method: 'DELETE',
    data: values,
  });
}

export function updateToolStatus(values) {
  return request({
    url: `/service/tool-service/tool/updToolStatus?toolId=${values.toolId}&status=${values.status}`,
    method: 'PUT',
    // data: values,
  });
}
