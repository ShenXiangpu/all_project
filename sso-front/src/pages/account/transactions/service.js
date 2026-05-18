import request from 'utils/request';

export function getTransList(values) {
  const params = {
    ...values,
    pageNum: values.pageNum || 1,
    pageSize: values.pageSize || 10,
  }

  return request({
    url: '/service/icharge/accountFlow/list/oneUser',
    method: 'GET',
    data: params
  });
}

// 交易类型枚举类
export function getTradeEventList() {
  return request({
      url: '/service/icharge/accountFlow/enum/tradeEventList',
      method: 'GET',
  });
}
