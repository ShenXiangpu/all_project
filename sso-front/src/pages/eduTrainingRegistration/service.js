import request from '../../utils/request';




/**
 * step1: 获取字典项：课程方向、课程分类等
 * @returns 
 */
export function getKeyValue() {
    return request({
      url: '/service/education/ps/dict/keyValue',
      method: 'GET',
    });
  }
  

/**
 * 添加一个教学
 * @returns
 */
export function addOneEdu(values) {
    return request({
        url: '/service/education/train/addOne',
        method: 'POST',
        data: { ...values }
    });
}


/**
 * 教学列表
 * @returns
 */
export function oneUserCanLooklist(values) {



    let params = ''
    if (values && values.name) {
      params += `&name=${values.name}`
    }
    if (values && values.courseDirectionId) {
      params += `&courseDirectionId=${values.courseDirectionId}`
    }
    if (values && values.courseClassificationId) {
      params += `&courseClassificationId=${values.courseClassificationId}`
    }
    if (values && values.trainingFormatId) {
      params += `&trainingFormatId=${values.trainingFormatId}`
    }
    if (values && values.status) {
        params += `&status=${values.status}`
      }

    return request({
        url: `/service/education/train/oneUserCanLooklist?&pageSize=${values.pageSize || 10}&pageNum=${values.pageNum || 1}${params}`,
        method: 'GET',
    });
}

/**
 *  用户填写培训的报名表单
 * @returns
 */
export function userFillForm(values) {
    return request({
        url: `/service/education/train/userFillForm`,
        method: 'POST',
        data: values
    });
}

// 获取报名列表
export function attendForm2(values) {
    return request({
        url: `/service/education/train/attendForm?trainId=${values.trainId}`,
        method: 'GET',
    });
}

// 获取报名信息

export function oneUserDetail(values) {
    return request({
        url: `/service/education/train/oneUserDetail?trainId=${values.trainId}`,
        method: 'GET',
    });
}


// 培训详情
export function getOneTrainDetailById(values) {
  return request({
    url: `/service/education/train/getOneTrainDetailById?trainId=${values.trainId}`,
    method: 'GET',
  });
}