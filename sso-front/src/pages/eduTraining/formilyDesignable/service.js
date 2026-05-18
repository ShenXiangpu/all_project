import request from '../../../utils/request';


// 提交申请
export function attendForm(values) {
  return request({
    url: '/service/education/train/attendForm',
    method: 'POST',
    data: values
  });
}

// 提交申请
export function attendForm2(values) {
  return request({
    url: `/service/education/train/attendForm?trainId=${values.trainId}`,
    method: 'GET',
  });
}


///

// 培训详情
export function getOneTrainDetailById(values) {
  return request({
    url: `/service/education/train/getOneTrainDetailById?trainId=${values.trainId}`,
    method: 'GET',
  });
}
