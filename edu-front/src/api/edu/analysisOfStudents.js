import request from '@/utils/request'

/**
 * 学生端-向老师发起请求
 */
export function del(data,str="teacher") {

    return request({
        url: `edu/sso-service/dataHistory/${str}/del`,
        method: 'delete',
        data
    })
}


export function queryStudentList(data) {
  const { page, limit, params } = data;
  let url = `edu/sso-service/dataHistory/teacher/getList?pageNum=${page}&pageSize=${limit}`;

  if (params) {
    const keys = Object.keys(params);
    keys.forEach((key) => {
      if (params[key] !== undefined && params[key] !== "") {
        url += `&${key}=${params[key]}`;
      }
    });
  }

  return request({
    url: url,
    method: "get",
  });
}



export function getTeacherReport(data) {
  const { year, courseId } = data;
  return request({
      url: `edu/sso-service/dataHistory/teacher/getTeacherReport?year=${year}&courseId=${courseId}`,
      method: 'get',
  })
}




export function getStudentReport(data) {
  const { year, courseId,userId } = data;
  return request({
      url: `edu/sso-service/dataHistory/student/getStudentReport?year=${year}&courseId=${courseId}&userId=${userId}`,
      method: 'get',
  })
}



// 课程数据列表--导出列表Excel
export function exportTeacherHistoryExcel(data) {
  return request({
      url: `edu/sso-service/dataHistory/teacher/exportTeacherHistoryExcel`,
      method: 'post',
      responseType: 'blob',
      data
  })
}




export function exportStudentHistoryExcel(data) {
  return request({
      url: `edu/sso-service/dataHistory/student/exportStudentHistoryExcel`,
      method: 'post',
      responseType: 'blob',
      data
  })
}

///dataHistory/student/list


export function queryCourseStudentList(data) {
  const { page, limit, params } = data;
  let url = `edu/sso-service/dataHistory/student/list?pageNum=${page}&pageSize=${limit}`;

  if (params) {
    const keys = Object.keys(params);
    keys.forEach((key) => {
      if (params[key] !== undefined && params[key] !== "") {
        url += `&${key}=${params[key]}`;
      }
    });
  }

  return request({
    url: url,
    method: "get",
  });
}


//




export function downLoadReport(data,str="student") {
  return request({
      url: `edu/sso-service/dataHistory/${str}/downLoadReport`,
      method: 'post',
      responseType: 'blob',
      data
  })
}

//

export function classList() {
  return request({
      url: `edu/sso-service/dataHistory/student/classList`,
      method: 'get',
  })
}


//
export function getTeachersForSearch() {
  return request({
      url: `edu/sso-service/dataHistory/teacher/getTeachersForSearch`,
      method: 'get',
  })
}
