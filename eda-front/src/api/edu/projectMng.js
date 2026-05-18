import request from '@/utils/request'
import { context1 } from '@/api/context'

/**
 * 查询课程list
 */

export function getProjectList(data) {
    let params = '';
    if (data && data.params) {
        let paramData = data.params;
        if (paramData.keyWord) {
            //只查询设备，屏蔽其它条件
            params += `&keyWord=${paramData.keyWord}`;
        }

        if (paramData.userId) {
            params += `&userId=${paramData.userId}`;
        }

    }

    return request({
        url: `${context1}/sso-service/sso/project/getList?current=${data.page || 1}&size=${data.limit || 10}${params}`,
        method: 'get'
    })
}


/**
 * 课程管理List查询条件--老师下拉框
 */

export function getUsersForSearch() {

    return request({
        url: `${context1}/sso-service/sso/project/getUsersForSearch`,
        method: 'get',
    })
}



/**
 * 新增课程
 */

export function saveProject(data) {

    return request({
        url: `${context1}/sso-service/sso/project/create`,
        method: 'post',
        data
    })
}

/**
 * 更新课程
 */

export function uptProject(data) {

    return request({
        url: `${context1}/sso-service/sso/project/update`,
        method: 'put',
        data
    })
}


/**
 * 删除项目
 */
//
export function deleteProject(data) {

    return request({
        url: `${context1}/sso-service/sso/project/delete?id=${data && data.id}`,
        method: 'delete',
    })
}


/**
 * 根据项目编号查询项目
 */

export function getProjectByNum(data) {

    return request({
        url: `${context1}/sso-service/sso/project/getProjectByNum?projectNumber=${data && data.projectNumber}`,
        method: 'get',
    })
}

/**
 * 个人加入项目
 * @param {*} data 
 * @returns 
 */

export function personApply(data) {

    return request({
        url: `${context1}/sso-service/sso/project/personApply?projectNumber=${data && data.projectNumber}`,
        method: 'post',
    })
}
/**
 * 更新
 */

export function getProjectById(data) {
    return request({
        url: `${context1}/sso-service/sso/project/getProjectById?projectId=${data.id}`,
        method: 'get',
    })
}

/**
 * 创建课程时获取用户List

 */

export function getUsersNotInCourse(data) {
    let params = ''
    if (data) {
        if (data.keyWord) {
            //只查询设备，屏蔽其它条件
            params += `&keyWord=${data.keyWord}`;
        }
    }

    return request({
        url: `${context1}/sso-service/sso/project/getUsersNotInProject?${context1}=true&projectId=${data && data.courseId}${params}`,
        method: 'get'
    })
}


//http://172.18.0.185:32005/


/**
 * 项目创建人-查询待审核申请列表
 */
export function getApplyList(data) {
    return request({
        url: `${context1}/sso-service/sso/project/getApplyList?projectId=${data && data.projectId}`,
        method: 'post'
    })
}
/**
 * 
 */

export function verify(data) {
    return request({
        url: `${context1}/sso-service/sso/project/verify?applyId=${data && data.applyId}&status=${data && data.status}`,
        method: 'post'
    })
}

/**
 * @param {*} data 
 * @returns 
 */
export function getOenList(data) {

    return request({
        url: `${context1}/sso-service/sso/file/projectResource/list?projectId=${data.courseId}`,
        method: 'get'
    })
}

/**
 * 上传资源
 * @param {*} data 
 * @returns 
 */
export function uploadRourse(data) {
    return request({
        url: `${context1}/sso-service/sso/file/projectResource/uploadOne?projectId=${data && data.courseId}&fileRename=${data && data.fileRename}&remark=${data && data.remark}`,
        method: 'post',
        data: data && data.FormDatas
    })
}

//
/**
 * 修改lab
 * @param {*} data 
 * @returns 
 */
export function updateResource(data) {
    return request({
        url: `${context1}/sso-service/sso/file/projectResource/modifyRemark?id=${data && data.id}&fileRename=${data && data.fileRename}&remark=${data && data.remark}`,
        method: 'put',
    })
}

/**
 * 
 * @param {*} data 
 * @returns 
 */
export function maxFileUploadSize(data) {
    return request({
        url: `${context1}/sso-service/mini-io/dict/maxFileUploadSize`,
        method: 'get'
    })
}


/**
 * Lab管理：删除一个leb
 * @param {*} data 
 * @returns 
 */
export function deleteLabById(data) {
    return request({
        url: `${context1}/sso-service/sso/file/projectResource/delOne?id=${data.id}`,
        method: 'delete'
    })
}




/**
 * 创建课程时获取用户List

 */

export function getUsersForCourse(data) {
    let params = ''
    if (data) {
        if (data.keyWord) {
            //只查询设备，屏蔽其它条件
            params += `?keyWord=${data.keyWord}`;
        }

    }

    return request({
        url: `${context1}/sso-service/sso/project/getUsersForProject${params}`,
        method: 'get'
    })
}


/**
 * @returns 
 */
export function addUser2Project(data) {

    return request({
        url: `${context1}/sso-service/sso/project/addUser2Project?userIds=${data && data.userIds}&courseId=${data && data.courseId}`,
        method: 'put',
    })
}




/**
 * 文件上传到虚拟机
 */



export function uploadFileToVM(data) {
    let param = ''
    if (data && data.userId && data.userId != 0) {
        param += `&userId=${data.userId}`
    }
    return request({
        url: `${context1}/zkxy-vmware-api/file/uploadFileToVM?vmId=${data && data.vmId}&uploadPath=${data && data.uploadPath}${param}`,
        method: 'post',
        data: data && data.md5
    })
}

/**
 * 手动创建 -- 未在虚拟机名单成员列表
 * @param {*} data 
 * @returns 
 */

export function getCourseUserNoVm(data) {
    let params = ''
    if (data) {
        if (data.keyWord) {
            //只查询设备，屏蔽其它条件
            params += `&keyWord=${data.keyWord}`;
        }
    }

    return request({
        url: `${context1}/sso-service/sso/project/getProjectUserNoVm?projectId=${data.courseId}${params}`,
        method: 'get'
    })
}


//向虚拟机中加入学生
export function addUserCounts(data) {
    return request({
        url: `${context1}/zkxy-vmware-api/vm/addUserCounts?courseId=${data.courseId}`,
        method: 'post',
        data: data && data.userCounts
    })
}


//删除课程资料

export function delCourseRourceById(data) {
    return request({
        url: `${context1}/sso-service/sso/file/projectResource/delOne?id=${data && data.id}`,
        method: 'delete',
    })
}
//

/**
 * 创建课程时获取用户List

 */

export function getHomeworkList(data) {
    let dataParm = data.params;
    let params = ''
    if (data.params) {
        if (dataParm.homeworkId) {
            //
            params += `&homeworkId=${dataParm.homeworkId}`;
        }
        if (dataParm.keyword) {
            //
            params += `&keyword=${dataParm.keyword}`;
        }
        if (dataParm.score) {
            let score = encodeURIComponent(dataParm.score);
            params += `&score=${score}`;
        }
        if (dataParm.className) {
            params += `&className=${dataParm.className}`;
        }
        if (dataParm.status || dataParm.status == '0') {
            params += `&status=${dataParm.status}`;
        }
    }

    return request({
        url: `${context1}/sso-service/sso/homework/v2/getHomeworkList?pageNum=${data.page}&pageSize=${data.limit}${params}`,
        method: 'get'
    })
}





/**
 * 课程详情-批改作业 获取评价等级
 */

export function getScoreLevel() {

    return request({
        url: `${context1}/sso-service/sso/dictionary/v2/getScoreLevel`,
        method: 'get',
    })
}

/**
 * 获取学年下拉列表
 * @returns 
 */
export function getAcademicYear() {

    return request({
        url: `${context1}/sso-service/sso/course/v2/getAcademicYearForHomeWork`,
        method: 'get',
    })
}

/**
 * 获取课程下拉列表
 * @returns 
 */
export function getCourseForHomeWork(data) {

    return request({
        url: `${context1}/sso-service/sso/course/v2/getCourseForHomeWork?year=${data}`,
        method: 'get',
    })
}

/**
 * 查询课程中学生列表--包括设计云状态
 */

export function getCourseUserPage(data) {
    let params = '';
    if (data && data.params) {
        let paramData = data.params;
        if (paramData.keyWord) {
            //只查询设备，屏蔽其它条件
            params += `&keyWord=${paramData.keyWord}`;
        }
        if (paramData.vmStatus) {
            params += `&vmStatus=${paramData.vmStatus == "1" ? true : false}`;
        }
        if (paramData.systemStatus) {
            params += `&systemStatus=${paramData.systemStatus == "1" ? true : false}`;
        }

    }
    return request({
        url: `${context1}/sso-service/sso/project/getUsersInProject?projectId=${data.courseId || 0}&pageNum=${data.page || 1}&pageSize=${data.limit || 10}${params}`,
        method: 'get'
    })
}
/** 
 * 课程中移除学生
 * @returns 
 */
export function removeStudent(data) {
    return request({
        url: `${context1}/sso-service/sso/project/removeUser?userId=${data && data.userId}&projectId=${data && data.courseId}`,
        method: 'put',
    })
}


/**
 * 
 * @param {*} data 
 * @returns 
 */
export function oneCourseRelTrialList(data) {
    console.log(data);
    let params = ''
    if (data && data.trialName) {
        params += `&trialName=${data.trialName}`
    }
    if (data && data.createBy) {
        params += `&createById=${data.createBy}`
    }
    if (data && data.ofPublic) {
        params += `&ofPublic=${data.ofPublic}`
    }
    if (data && data.studentStatus || data.studentStatus == 0) {
        params += `&studentStatus=${data.studentStatus}`
    }
    return request({
        url: `${context1}/sso-service/trial/oneCourseRelTrialList?courseId=${data && data.courseId}${params}`,
        method: 'get',
    })
}

/**
 * V2.1课程管理-统计在线、课程、实验、作业完成的学生数
 * @returns 
 */
export function getStudentScheduleCount(data) {

    return request({
        url: `${context1}/sso-service/sso/course/v2/getStudentScheduleCount?courseId=${data && data.courseId}`,
        method: 'get',
    })
}

/**
 * 
 * @param {*} data 
 * @returns 
 */
export function getSectionFileStreamById(data) {
    return request({
        url: `${context1}/sso-service/section/getSectionFileStreamById?id=${data && data.id}`,
        method: 'get',
        responseType: 'Blob'
    })
}