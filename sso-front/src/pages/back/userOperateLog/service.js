import request from 'utils/request';

export function getUserOperateLog(values) {
  const pageNum = values.pageNum || 1;
  const pageSize = values.pageSize || 10;

  const data = {
    pageNum,
    pageSize,
    ...values
  }

  return request({
    url: '/service/sso-service/sso/behaviorLog/getUserOperateLog',
    method: "GET",
    data: data
  });
}

//获取用户行为分类
export function getUserOperateType() {
  return request({
    url: '/service/sso-service/sso/behaviorLog/getUserOperateType',
    method: 'GET',
  });
}
