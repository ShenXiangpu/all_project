import request from 'utils/request';


/**
 * 获取扩容的订单详情
 */

// export function getVMDetailByNo(values) {
//   return request({
//     url: '/service/icharge/vmwareOrder/detailByNo',
//     method: 'GET',
//     data: values
//   });
// }
// 创建License最新欠费订单
export function createLicOrder(value) {
  return request({
    url: '/service/icharge/licenceOrder/create',
    method: 'POST',
    data: value
  });
}

// 获取License获取待付费信息
export function getLicenseDebt() {
  return request({
    url: '/service/icharge/licenceOrder/debt',
    method: 'GET',
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

// 创建升降配订单
export function createReconfigOrder(values) {
  return request({
    url: '/service/icharge/vmwareOrder/reVm',
    method: 'POST',
    data: values,
  });
}

// 创建续费订单
export function createRechargeOrder(values) {
  return request({
    url: '/service/icharge/vmwareOrder/renew',
    method: 'POST',
    data: values,
  });
}

// 获取详情信息
export function getVmByVmId(value) {
  return request({
    url: '/service/zkxy-vmware-api/vm/getVmByVmId',
    method: 'GET',
    data: value,
  });
}

// 获取可使用优惠券列表 orderType=vmware
export function oneOrderType(value) {
  return request({
    url: '/service/icharge/coupon/list/oneOrderType',
    method: 'GET',
    data: value,
  });
}


// 创建VM时、续费时，计算价格，获取可使用的优惠券列表
export function calcVMCost(values) {
  return request({
    url: '/service/icharge/vmwareOrder/calcCost',
    method: 'POST',
    data: values,
  });
}



// 计算价格2，传入优惠券id和订单号，获取可使用的优惠券列表
export function calcVMCost2(values) {
  return request({
    url: '/service/icharge/vmwareOrder/calcCost2',
    method: 'POST',
    data: values,
  });
}
// license缴费的优惠券列表
export function calcVMCostLicense(values) {
  return request({
    url: '/service/icharge/licenceOrder/calcCost',
    method: 'POST',
    data: values,
  });
}

// license缴费的优惠券列表
export function calcVMCostLicense2(values) {
  return request({
    url: '/service/icharge/licenceOrder/calcCost2',
    method: 'POST',
    data: values,
  });
}
