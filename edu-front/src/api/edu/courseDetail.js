import request from '@/utils/request'


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
        url: `edu/sso-service/sso/course/v2/getCourseList?current=${data.page || 1}&size=${data.limit || 10}${params}`,
        method: 'post'
    })
}


/**
 * 新增课程
 */

export function saveCourse(data) {

    return request({
        url: `edu/sso-service/sso/course/v2/saveCourse`,
        method: 'post',
        data
    })
}

/**
 * 更新课程
 */

export function uptCourse(data) {

    return request({
        url: `edu/sso-service/sso/course/v2/uptCourse`,
        method: 'post',
        data
    })
}




/**
 * 创建课程时过滤用户--班级下拉框
 */

export function getClassesForSearch(data) {

    return request({
        url: `edu/sso-service/sso/course/v2/getClassesForSearch`,
        method: 'get',
        data
    })
}


/**
 * 更新-根据课程id查询详情
 */

export function getCourseDetailById(data) {
    return request({
        url: `edu/sso-service/sso/course/v2/getCourseDetailById?id=${data.id}`,
        method: 'get',
    })
}


/**
 * 创建课程时过滤用户--角色下拉框
 */

export function getRolesForSearch() {

    return request({
        url: `edu/sso-service/sso/course/v2/getRolesForSearch`,
        method: 'get',
    })
}


/**
 * 课程管理List查询条件--老师下拉框
 */

export function getTeachersForSearch() {

    return request({
        url: `edu/sso-service/sso/course/v2/getTeachersForSearch`,
        method: 'get',
    })
}

// 
/**
 * 课程管理List查询条件--老师下拉框
 */

export function getClassNameForHomeWork() {

    return request({
        url: `edu/sso-service/sso/course/v2/getClassNameForHomeWork`,
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
        url: `edu/sso-service/sso/course/v2/getUsersForCourse?edu=true${params}`,
        method: 'get'
    })
}


//

export function getCourseUserNoVm(data) {
    let params = ''
    if (data) {
        if (data.keyWord) {
            //只查询设备，屏蔽其它条件
            params += `&keyWord=${data.keyWord}`;
        }
    }

    return request({
        url: `edu/sso-service/sso/course/v2/getCourseUserNoVm?courseId=${data.courseId}${params}`,
        method: 'get'
    })
}

//
export function addUserCounts(data) {
    return request({
        url: `edu/zkxy-vm-web/vm/addUserCounts?courseId=${data.courseId}`,
        method: 'post',
        data: data && data.userCounts
    })
}

//

export function delCourse(data) {
    return request({
        url: `edu/sso-service/sso/course/v2/delCourse?id=${data && data.id}`,
        method: 'delete',
    })
}


//删除课程资料

export function delCourseRourceById(data) {
    return request({
        url: `edu/sso-service/mini-io/file/one?courseFileId=${data && data.id}`,
        method: 'delete',
    })
}