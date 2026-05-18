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
// FormData 传值
export function sendAwardCode(value) {
  return request({
    headers: { 'content-type': 'multipart/form-data' },   // 支持 FormData 传值
    url: `/service/icharge/v1/icharge/promotion/sendAwardCode?degree=${value.degree}`,
    method: 'POST',
    data: value.file  // 直接传值，不需要包在 json 对象里
  });
}
