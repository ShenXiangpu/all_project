import request from 'utils/request';

export function getOrderList(values) {
  const params = {
    ...values,
    pageNum: values.pageNum || 1,
    pageSize: values.pageSize || 10,
  }

  return request({
    url: '/service/icharge/order/combine/list',
    method: 'GET',
    data: params
  });
}

export function getVMOrderList(values) {
  const params = {
    ...values,
    pageNum: values.pageNum || 1,
    pageSize: values.pageSize || 10,
  }

  return request({
    url: '/service/icharge/vmwareOrder/list',
    method: 'GET',
    data: params
  });
}

export function getLicenseOrderList(values) {
  const params = {
    ...values,
    pageNum: values.pageNum || 1,
    pageSize: values.pageSize || 10,
  }

  return request({
    url: '/service/icharge/licenceOrder/list',
    method: 'GET',
    data: params
  });
}

export function getLicenseDetailByNum(value) {
  return request({
    url: '/service/icharge/licenceOrder/detailByNo',
    method: 'GET',
    data: value
  });
}

export function getVmDetailByNum(value) {
  return request({
    url: '/service/icharge/vmwareOrder/detailByNo',
    method: 'GET',
    data: value
  });
}

export function getVmReconfigDetailByNum(value) {
  return request({
    url: '/service/icharge/reconfigOrder/detailByNo',
    method: 'GET',
    data: value
  });
}

// 取消订单
export function cancelOrder(value) {
  return request({
    url: `/service/icharge/pay/cancel?orderNum=${value.orderNum}`,
    method: 'POST',
  });
}

// 按群组（部门）统计，预付费
export function getStatistics(value) {
  return request({
    url: '/service/icharge/order/combine/statistics',
    method: 'GET',
    data: value
  });
}

// 按群组（部门）或工具统计，后付费License
export function getLicStatistics(value) {
  return request({
    url: '/service/icharge/licenceOrder/statistics/money',
    method: 'GET',
    data: value
  });
}

// License按用户查询时，获取枚举列表，便于过滤
export function getLicStatisticsEnum() {
  return request({
    url: '/service/icharge/licenceOrder/enum/statistics',
    method: 'GET',
  });
}


