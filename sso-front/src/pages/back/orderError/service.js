import request from 'utils/request';

export function getErrorList(values) {
  const pageNum = values.pageNum || 1;
  const pageSize = values.pageSize || 10;

  const data = {
    pageNum,
    pageSize,
    ...values
  }

  return request({
    url: '/service/icharge/vmwareOrder/errList',
    method: "GET",
    data: data
  });
}

export function retry(values) {
  return request({
    url: '/service/zkxy-vmware-api/order/retry',
    method: 'GET',
    data: values
  });
}
