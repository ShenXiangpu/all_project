import request from 'utils/request';

// 获取License获取待付费信息
export function getLicenseDebt() {
  return request({
    url: '/service/icharge/licenceOrder/debt',
    method: 'GET',
  });
}
