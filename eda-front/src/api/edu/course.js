import request from '@/utils/request'
import { context1 } from '@/api/context'

/**
 * 查询课程list
 */

export function getCourseList(data) {
    let params = '';
    if (data && data.params) {
        let paramData = data.params;
        if (paramData.keyWord) {
            //只查询设备，屏蔽其它条件
            params += `&keyWord=${paramData.keyWord}`;
        }
        if (paramData.year) {
            params += `&year=${paramData.year}`;
        }
        if (paramData.teacherId) {
            params += `&teacherId=${paramData.teacherId}`;
        }

    }
    return request({
        url: `${context1}/sso-service/sso/course/v2/getCourseList?current=${data.page || 1}&size=${data.limit || 10}${params}`,
        method: 'post'
    })
}


/**
 * 新增课程
 */

export function saveCourse(data) {

    return request({
        url: `${context1}/sso-service/sso/course/v2/saveCourse`,
        method: 'post',
        data
    })
}

/**
 * 更新课程
 */

export function uptCourse(data) {

    return request({
        url: `${context1}/sso-service/sso/course/v2/uptCourse`,
        method: 'post',
        data
    })
}




/**
 * 创建课程时过滤用户--班级下拉框
 */

export function getClassesForSearch(data) {

    return request({
        url: `${context1}/sso-service/sso/course/v2/getClassesForSearch`,
        method: 'get',
        data
    })
}


/**
 * 更新-根据课程id查询详情
 */

export function getCourseDetailById(data) {
    return request({
        url: `${context1}/sso-service/sso/course/v2/getCourseDetailById?id=${data.id}`,
        method: 'get',
    })
}


/**
 * 创建课程时过滤用户--角色下拉框
 */

export function getRolesForSearch() {

    return request({
        url: `${context1}/sso-service/sso/course/v2/getRolesForSearch`,
        method: 'get',
    })
}


/**
 * 课程管理List查询条件--老师下拉框
 */

export function getTeachersForSearch() {

    return request({
        url: `${context1}/sso-service/sso/course/v2/getTeachersForSearch`,
        method: 'get',
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
            params += `&keyWord=${data.keyWord}`;
        }
        if (data.roleName) {
            params += `&roleName=${data.roleName}`;
        }
        if (data.className) {
            params += `&className=${data.className}`;
        }

    }

    return request({
        url: `${context1}/sso-service/sso/course/v2/getUsersForCourse?edu=true&roleName=学生${params}`,
        method: 'get'
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
            params += `&vmStatus=${paramData.vmStatus == "1" ? true :false}`;
        }
        if (paramData.systemStatus) {
            params += `&systemStatus=${paramData.systemStatus == "1" ? true :false}`;
        }

    }
    return request({
        url: `${context1}/sso-service/sso/course/v2/getCourseUserPage?courseId=${data.courseId || 0}&pageNum=${data.page || 1}&pageSize=${data.limit || 10}${params}`,
        method: 'get'
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