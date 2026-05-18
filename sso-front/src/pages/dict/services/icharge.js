import request from 'utils/request';

//>>>>>>>>>>>>>>>>>>>> 计费规格 <<<<<<<<<<<<<<<<<<<<<<

// 计费规格列表
export function queryFlavorList(values) {
  return request({
    url: '/service/icharge/specification/list',
    method: 'GET',
    data: values
  });
}

// 新增计费规格
export function createFlavor(values) {
  return request({
    url: '/service/icharge/specification',
    method: 'POST',
    data: values,
  });
}

export function updateFlavor(values) {
  return request({
    url: '/service/icharge/specification',
    method: 'PUT',
    data: values,
  });
}


//>>>>>>>>>>>>>>>>>>>> 计费：业务配置管理 <<<<<<<<<<<<<<<<<<<<<<

// 业务配置列表
export function queryBizConfigList() {
  return request({
    url: '/service/icharge/sysBizConfig/list',
    method: 'GET',
  });
}

export function updateBizConfig(values) {
  return request({
    url: '/service/icharge/sysBizConfig/modify',
    method: 'PUT',
    data: values,
  });
}
