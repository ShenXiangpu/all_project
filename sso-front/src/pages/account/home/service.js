import request from 'utils/request';

// 获取License欠费列表，一条，总的
export function getArrearList() {
  return request({
    url: '/service/icharge/arrearsNorms/list',
    method: 'GET',
  });
}

// 充值
export function recharge(values) {
  return request({
    url: '/service/icharge/v1/icharge/balance/recharge',
    method: 'POST',
    data: values
  });
}

// 充值支付结果check
export function rechargeCheck(values) {
  return request({
    url: '/service/icharge/v1/icharge/balance/rechargeStatus',
    method: 'GET',
    data: values
  });
}
