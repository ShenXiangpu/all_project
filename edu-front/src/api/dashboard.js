import request from "@/utils/request";



export function getCourseInfoForIndex(data) {
  return request({
    url: `edu/sso-service/sso/course/v2/getCourseInfoForIndex`,
    method: 'get',
  })
}



//虚拟机性能接口


//performance/queryClusterPerformance

export function queryClusterPerformance(data) {
  return request({
    url: `edu/zkxy-vm-web/performance/queryClusterPerformance?interval=${data && data.interval}`,
    method: 'get',
  })
}


export function getCoursePageForIndex(data) {
  return request({
    url: `edu/sso-service/sso/course/v2/getCoursePageForIndex?pageNum=${
      (data && data.page) || 1
    }&pageSize=${(data && data.limit) || 10}`,
    method: "get",
  });
}

//

export function getIndexUserMonitorData(data) {
  return request({
    url: `edu/sso-service/sso/index/getIndexUserMonitorData`,
    method: "get",
  });
}

//首页获取作业统计数据
export function getHomeworkMarkForIndex(data) {
  return request({
    url: `edu/sso-service/sso/index/getHomeworkMarkForIndex?pageNum=${
      (data && data.page) || 1
    }&pageSize=${(data && data.limit) || 10}`,
    method: "get",
  });
}

export function getHomeworkMarkForIndexDown(data) {
  let params = "";
  let paramsData = data && data.params;
  if (paramsData) {
    if (paramsData.keyword) {
      //只查询设备，屏蔽其它条件
      params += `&keyword=${paramsData.keyword}`;
    }
    if (paramsData.courseId) {
      params += `&courseId=${paramsData.courseId}`;
    }
    // if (data.homeworkId) {
    //     params += `&homeworkId=${data.homeworkId}`;
    // }
  }

  return request({
    url: `edu/sso-service/sso/index/getHomeworkMarkForIndexDown?size=${
      (data && data.limit) || 10
    }&current=${(data && data.page) || 1}${params}`,
    method: "get",
  });
}

//

//首页获取作业统计数据
export function getUnSubmitHomeworkUsers(data) {
  return request({
    url: `edu/sso-service/sso/index/v2/getUnSubmitHomeworkUsers?homeworkId=${
      (data && data.homeworkId) || 0
    }`,
    method: "get",
  });
}

//V3.0 老师首页--作业数据监控List
export function getIndexHomeworkList(data) {
  let paramsData = data && data.params;
  let params = "";
  if (paramsData && paramsData.courseId) {
    params += `&courseId=${paramsData.courseId}`;
  }
  return request({
    url: `edu/sso-service/sso/index/getIndexHomeworkList?pageNum=${
      (data && data.page) || 1
    }&pageSize=${(data && data.limit) || 10}${params}`,
    method: "get",
  });
}

// V3.0 老师首页--实验数据监控List
export function getIndexTrialItemList(data) {
  let paramsData = data && data.params;
  let params = "";
  if (paramsData && paramsData.courseId) {
    params += `&courseId=${paramsData.courseId}`;
  }
  return request({
    url: `edu/sso-service/sso/index/getIndexTrialItemList?pageNum=${
      (data && data.page) || 1
    }&pageSize=${(data && data.limit) || 10}${params}`,
    method: "get",
  });
}
/**
 * 统计系统人数
 * @param {*}
 * @returns
 */
export function onlineDate() {
  return request({
    url: `edu/zkxy-vm-web/hostSystem/getClusterInfo`,
    method: 'post',
  })
}


//排行榜

export function rankingList(data) {
  return request({
    url: `edu/sso-service/sso/feature/monitor/rankingList?dayLimit=${data && data.dayLimit}`,
    method: 'get',
  })
}


export function getIndexCourseRankingList(data) {
  return request({
    url: `edu/sso-service/sso/index/getIndexCourseRankingList?academicYear=${data && data.year}`,
    method: 'get',
  })
}

export function getIndexStudentScoreRankingList(data) {
  return request({
    url: `edu/sso-service/sso/index/getIndexStudentScoreRankingList?courseId=${data && data.courseId}`,
    method: 'get',
  })
}


export function getIndexUniversityRankingList(data) {
  return request({
    url: `edu/sso-service/sso/index/getIndexUniversityRankingList?startTime=${data && data.startTime}&endTime=${data && data.endTime}`,
    method: 'get',
  })
}




export function getUnFinishedTrialUsers(data) {
  return request({
    url: `edu/sso-service/sso/index/v3/getUnFinishedTrialUsers?trialId=${data && data.trialId}&courseId=${data && data.courseId}`,
    method: 'get',
  })
}


