import request from '@/utils/request'



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
        if (data.roleName) {
            params += `&roleName=${data.roleName}`;
        }
        if (data.className) {
            params += `&className=${data.className}`;
        }


    }

    return request({
        url: `edu/sso-service/sso/course/v2/getUsersNotInCourse?edu=true&roleName=学生&courseId=${data && data.courseId}${params}`,
        method: 'get'
    })
}

/**
 * @returns 
 */
export function addUser2Course(data) {

    return request({
        url: `edu/sso-service/sso/course/v2/addUser2Course?userIds=${data && data.userIds}&courseId=${data && data.courseId}`,
        method: 'put',
    })
}


/** 
 * 课程中移除学生
 * @returns 
 */
export function removeStudent(data) {
    return request({
        url: `edu/sso-service/sso/course/v2/removeStudent?courseId=${data && data.courseId}&userId=${data && data.userId}`,
        method: 'put',
    })
}


/**
 * 下载设备导入模板
 */
export function exportStudentExcel(data) {
    let params = ''
    if (data && data.keyWord) {
        params += `&keyWord=${data.keyWord}`;
    } else if (data && data.vmStatus) {
        params += `&keyWord=${data.vmStatus}`;
    }
    return request({
        url: `edu/sso-service/sso/course/v2/exportStudentExcel?courseId=${data && data.courseId}${params}`,
        method: 'get',
        responseType: 'blob'
    })
}
