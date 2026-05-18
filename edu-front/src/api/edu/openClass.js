//实验中心
import request from "@/utils/request";


//实验修改接口
export function editLabTrial(data) {
  return request({
    url: `edu/sso-service/trial/trial/v3`,
    method: "put",
    data,
  });
}

/**
 * @param {*} data
 * @returns
 */
export function handleTrial2(data) {
  return request({
    url: `edu/sso-service/trial/trial2`,
    method: "post",
    data,
  });
}

/**
 *
 * @param {*} data
 * @returns
 */
export function getSquareTrialList(data) {
  let params = "";
  if (data && data.trialName) {
    params += `&trialName=${data.trialName}`;
  }
  if (data && data.createBy) {
    params += `&createBy=${data.createBy}`;
  }
  return request({
    url: `edu/sso-service/trial/page/square?pageSize=${
      (data && data.limit) || 10
    }&pageNum=${(data && data.page) || 1}${params}`,
    method: "get",
  });
}

//
/**
 * 从广场中添加实验时，展示的筛选的实验列表
 * @param {*} data
 * @returns
 */
export function getSquare4ForkList(data) {
  let params = "";
  if (data && data.trialName) {
    params += `&trialName=${data.trialName}`;
  }
  if (data && data.createBy) {
    params += `&createBy=${data.createBy}`;
  }
  if (data && data.courseId) {
    params += `&courseId=${data.courseId}`;
  }

  if (data && data.ofPublic) {
    params += `&ofPublic=${data.ofPublic}`;
  }
  return request({
    url: `edu/sso-service/trial/list/square4Fork?pageSize=${
      (data && data.limit) || 10
    }&pageNum=${(data && data.page) || 1}${params}`,
    method: "get",
  });
}

//
/**
 *
 * @param {*} data
 * @returns
 */
export function createBy(data) {
  let params = "";
  if (data && data.self) {
    params += `&self=${data.self}`;
  }
  if (data && data.ofPublic) {
    params += `&ofPublic=${data.ofPublic}`;
  }

  return request({
    url: `edu/sso-service/trial/searchKey/createBy?str=1${params}`,
    method: "get",
  });
}


/**
 * 获取一个实验模板的详情
 * @param {*} data
 * @returns
 */
export function oneTrialTempInfo(id) {
  return request({
    url: `edu/sso-service/trial/oneTrialTempInfo?trialId=${id}`,
    method: "get",
  });
}
//pageNum=1&pageSize=10&trialCourseId=1&keyWord=1&status=1&className=1

//
/**
 * 从广场中添加实验时，展示的筛选的实验列表
 * @param {*} data
 * @returns
 */
export function getListTrialReport(data) {
  let params = "";
  if (data && data.trialCourseId) {
    params += `&trialCourseId=${data.trialCourseId}`;
  }
  if (data && data.keyWord) {
    params += `&keyWord=${data.keyWord}`;
  }
  if (data && data.status) {
    params += `&status=${data.status}`;
  }

  if (data && data.className) {
    params += `&className=${data.className}`;
  }
  return request({
    url: `edu/sso-service/trialReport/listTrialReport?pageSize=${
      (data && data.limit) || 10
    }&pageNum=${(data && data.page) || 1}${params}`,
    method: "get",
  });
}

/**
 *
填写实验报告
 * @param {*} data
 * @returns
 */
export function submitReportI(data) {
  return request({
    url: `edu/sso-service/trialReport/submitReport?id=${data && data.id}`,
    method: "put",
  });
}

/**
 * 保存实验报告
 * @param {*} data
 * @returns
 */
export function saveReportI(data) {
  return request({
    url: `edu/sso-service/trialReport/saveReport`,
    method: "put",
    data,
  });
}



/**
 * 查看实验报告
 */
export function getTrialReportById(data) {
  return request({
    url: `edu/sso-service/trialReport/getTrialReportById?reportId=${
      data && data.id
    }`,
    method: "get",
  });
}

//?reportId=123

/**
 * 批改实验报告
 */
export function markReport(data) {
  return request({
    url: `edu/sso-service/trialReport/markReport?reportId=${
      data && data.reportId
    }&score=${data && data.score}&suggestion=${data && data.suggestion}`,
    method: "put",
  });
}

/**
 * 实验报告查询--班级下拉框
 */
export function getClassesForSearch(data) {
  return request({
    url: `edu/sso-service/trialReport/getClassesForSearch?trialCourseId=${
      data && data.id
    }`,
    method: "get",
  });
}

/**
 * 上传
 * @param {*} data
 * @returns
 */
export function uploadFile(data) {
  return request({
    url: `edu/sso-service/trial/file/uploadFile`,
    method: "post",
    data,
  });
}

/**
 * 下载实验报告
 * @param {*} data
 * @returns
 */
export function downLoadReport(data) {
  return request({
    url: `edu/sso-service/trialReport/downLoadReport?reportIds=${
      data && data.ids
    }`,
    method: "get",
    responseType: "blob",
  });
}

/**
 * 根据过滤条件精准查询消息
 * @returns
 */
export function manualPDF(data) {
  let params = "";
  if (data && data.trialCourseId) {
    params = "?trialCourseId=" + data.trialCourseId;
  } else if (data && data.trialId) {
    params = "?trialId=" + data.trialId;
  }

  return request({
    url: `edu/sso-service/trial/file/download/manualPDF` + params,
    method: "post",
    responseType: "blob",
  });
}

/**
 * 修改一个自定义实验里的任务
 */
export function modifyTrialItem(data) {
  return request({
    url: `edu/sso-service/trial/modifyTrialItem`,
    method: "put",
    data,
  });
}

/**
 * 新增一个自定义实验里的任务
 */
export function addTrialItem(data) {
  return request({
    url: `edu/sso-service/trial/addTrialItem`,
    method: "post",
    data,
  });
}

/**
 *  获取一个实验所包含的任务列表
 */

export function oneTrialHasItemList(data) {
  return request({
    url: `edu/sso-service/trial/oneTrialHasItemList?trialId=${data.trialId}`,
    method: "get",
  });
}

/**
 *  获取一个实验所包含的任务列表
 */

export function listFile(data) {
  let param = "";
  if (data && data.path) {
    param = "&path=" + data.path;
  }
  return request({
    url: `edu/zkxy-vm-web/vm/listFile?vmId=${data && data.vmId}${param}`,
    method: "post",
  });
}

/**
 *
 */

//
export function taskLogin(data) {
  return request({
    url: `edu/zkxy-vm-web/experiment/taskLogin?taskID=${data && data.taskID}`,
    method: "get",
  });
}

/**
 *  删除一个实验所包含的任务列表
 */
export function deleteOneTrialOneItem(data) {
  return request({
    url: `edu/sso-service/trial/deleteOneTrialOneItem?trialItemId=${
      data && data.trialItemId
    }`,
    method: "delete",
  });
}
//

/**
 *
 */
export function createContainerByExp(data) {
  return request({
    url: `edu/zkxy-vm-web/container/createTrialContainer`,
    method: "post",
    data
  });
}



export function trialContainerStatus(data) {
  return request({
    url: `edu/zkxy-vm-web/container/trialContainerStatus`,
    method: "post",
    data
  });
}
//查看关联实验的课程列表
export function getRelTrialCourseList(data) {
  let params = "";
  Object.keys(data).forEach((key) => {
    if (data[key] !== null && data[key] !== undefined) {
      params +="&" + key + "=" + encodeURIComponent(data[key]);
    }
  })
  return request({
    url: `edu/sso-service/trial/preDel?${params}`,
    method: "delete",
  });
}


/**
 *  删除一个实验所包含的任务列表
 */

 export function unBind(data) {
  return request({
    url: `edu/sso-service/trial/unBind?trialCourseId=${data && data.trialCourseId}`,
    method: "delete",
  });
}






/**
 * 保存章节
 */
export function saveChapter(data) {
    return request({
        url: `edu/sso-service/sso/openCourse/saveSection`,
        method: 'put',
        data
    })
}



/**
 * 查看章节或文件，学习进度详情
 */
export function editSectionFile(data) {
    return request({
        url: `edu/sso-service/section/editSectionFile`,
        method: 'put',
        data
    })
}



/**
 *
 * @param {*} data
 * @returns
 */
export function getMyTrialList(data) {
  let params = "";
  Object.keys(data || {}).forEach((key) => {
    if (data[key] !== "" && data[key] !== null && data[key] !== undefined && key !== "limit" && key !== "page") {
      params += `&${key}=${data[key]}`;
    }
  });
  return request({
    url: `edu/sso-service/sso/openCourse/getList?pageSize=${
      (data && data.limit) || 10
    }&pageNum=${(data && data.page) || 1}${params}`,
    method: "get",
  });
}



/**
 * 查询章节及文件列表list
 */
export function listSections(data) {
    return request({
        url: `edu/sso-service/sso/openCourse/listSections?courseId=${data && data.courseId}`,
        method: 'get'
    })
}


/**
 *
 */
export function delChapter(data) {
    return request({
        url: `edu/sso-service/sso/openCourse/delSection?id=${data && data.id}`,
        method: 'delete'
    })
}


/**
 * 获取一个公开课的详情
 * @param {*} data
 * @returns
 */
export function oneDetail(id) {
  return request({
    url: `edu/sso-service/sso/openCourse/getCourseDetailById?id=${id}`,
    method: "get",
  });
}



/**
 * @param {*} data
 * @returns
 */
export function handleOpenClass(data,str) {
  return request({
    url: `edu/sso-service/sso/openCourse/${str}`,
    method: 'put',
    data,
  });
}



/**
 *
填写实验报告
 * @param {*} data
 * @returns
 */
export function deleteOpenClass(data) {
  return request({
    url: `edu/sso-service/sso/openCourse/del?id=${data && data.id}`,
    method: "delete",
  });
}
