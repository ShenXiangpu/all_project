import request from 'utils/request';

export function getCoupons(values) {
  const pageNum = values.pageNum || 1;
  const pageSize = values.pageSize || 10;
  const status = Number(values.status) || 1;
  let value = {
    pageNum,
    pageSize,
    status
  }

  return request({
    url: `/service/icharge/coupon/list/had`,
    method: 'GET',
    data: value
  });
}

export function checkAwardCode(value) {
  return request({
    url: `/service/icharge/v1/icharge/promotion/checkAwardCode?awardCode=${value.awardCode}`,
    method: 'POST',
    data: value
  });
}
