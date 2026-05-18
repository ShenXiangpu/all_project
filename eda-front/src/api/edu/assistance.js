import request from '@/utils/request'
import { context1 } from '@/api/context'
/**
 * 学生端-向老师发起请求
 */
export function sendHelp(data) {

    return request({
        url: `${context1}/sso-service/assist/sendHelp?courseId=${data && data.courseId}`,
        method: 'put',
    })
}
/**
 * 学生端--取消协助
 */
//
export function cancelHelp() {

    return request({
        url: `${context1}/sso-service/assist/cancelHelp`,
        method: 'put',
    })
}

/**
 * 学生端--退出实验
 */
export function exitTrial() {

    return request({
        url: `${context1}/sso-service/assist/exitTrial`,
        method: 'put',
    })
}
/**
 * 老师退出学生的实验
 */
export function exitTrialTeacher(data) {
    return request({
        url: `${context1}/sso-service/assist/exitTrialTeacher?studentId=${data && data.studentId}`,
        method: 'put',
    })
}


/**
 * 前端打开监控页面时，主动调用获取一次学生列表及学生状态，学生列表结果由websocket发送
 */
export function getStudentList(data) {
    return request({
        url: `${context1}/sso-service/assist/getStudentList?courseId=${data && data.courseId}`,
        method: 'get',
    })
}


/**
 * 老师端，拒绝请求
 */
export function rejectHelp(data) {
    return request({
        url: `${context1}/sso-service/assist/rejectHelp?studentId=${data && data.studentId}`,
        method: 'get',
    })
}



/**
 * 老师同意某位学生的请求
 */
export function acceptHelp(data) {
    return request({
        url: `${context1}/sso-service/assist/acceptHelp?studentId=${data && data.studentId}`,
        method: 'get',
    })
}



