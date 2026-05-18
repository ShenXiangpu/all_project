import request from '../../utils/request';


// 提交申请
export function collectInfoAdd(values) {
  return request({
    url: '/service/ip/tHeadCustomerInfoCollection/add',
    method: 'POST',
    data: values
  });
}

