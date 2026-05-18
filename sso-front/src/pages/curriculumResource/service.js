import request from '../../utils/request';

import { isEqual } from 'lodash'


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
 * 单文件上传接口 
 * @returns 
 */
export function uploadFile(values) {
  return request({
    url: `/service/education/ps/file/uploadFile?type=${values && values.type}`,
    method: 'POST',
    data: values.file
  });
}

/**
 * step3: 新增一个课程：文件直接上传minio后，调用此接口保存
 * @returns 
 */
export function addOne(values) {
  return request({
    url: '/service/education/ps/course/addOne',
    method: 'post',
    data: values
  });
}

/**
 * 获取课程列表 
 * @returns 
 */
export function courseList(values) {
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
  return request({
    url: `/service/education/ps/course/list?pageSize=${values && values.pageSize || 10}&pageNum=${values && values.pageNum || 1}${params}`,
    method: 'get',

  });
}

/**
 *  根据一个课程id，找到他下面的第一个课程并返回该课程资料的访问连接
 */

export function getResourcebyCourseId(values) {
  
  return request({
    url: `/service/education/ps/course/file/share/byCourseId/${values && values.courseId}`,
    method: 'get',
  });
}