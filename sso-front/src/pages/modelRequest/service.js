import request from '../../utils/request';


// 提交申请
export function collectInfoAdd(values) {
  return request({
    url: '/service/ip/tHeadCustomerInfoCollection/add',
    method: 'POST',
    data: values
  });
}


// 导出一个文档
export function exportOne(values) {
  return request({
    url: `/service/ip/tHeadCustomerInfoCollection/exportOne?id=${values.id}`,
    method: 'get'
  });
}

// 获取用户个人申请的记录
export function listMine(values) {
  return request({
    url: `/serviceip/ip/tHeadCustomerInfoCollection/list/mime?pageSize=${values.pageSize}&pageNum=${values.pageNum}`,
    method: 'get'
  });
}


// 回调修改存放路径
export function setPath(values) {
  return request({
    url: `/serviceip/ip/tHeadCustomerInfoCollection/setPath`,
    method: 'put'
  });
}
