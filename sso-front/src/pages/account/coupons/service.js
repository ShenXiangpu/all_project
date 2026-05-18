import request from 'utils/request';

export function getCoupons(values) {
  const pageNum = values.pageNum || 1;
  const pageSize = values.pageSize || 10;

  return request({
    url: `/service/icharge/v1/icharge/promotion/getPrizesList?pageNum=${pageNum}&&pageSize=${pageSize}`,
    method: 'POST',
    data: values
  });
}

export function checkAwardCode(value) {
  return request({
    url: `/service/icharge/v1/icharge/promotion/checkAwardCode?awardCode=${value.awardCode}`,
    method: 'POST',
    data: value
  });
}
