//实验分配
import request from '@/utils/request'
/**
 * 从广场中添加实验时，展示的筛选的实验列表
 * @param {*} data 
 * @returns 
 */
export function getSquare4ForkList(data) {

    let params = ''
    if (data && data.trialName) {
        params += `&trialName=${data.trialName}`
    }
    if (data && data.createBy) {
        params += `&createBy=${data.createBy}`
    }
    return request({
        url: `edu/sso-service/admin/manage/list/square4Fork?pageSize=${data && data.limit || 10}&pageNum=${data && data.page || 1}${params}`,
        method: 'get',
    })
}