import request from '@/utils/request'
import { context1 } from '@/api/context'


/**
 * 根据过滤条件精准查询消息
 * @returns 
 */
 export function queryNewsList(data) {

    return request({
        url: `${context1}/zkxy-message-center/msg/commonQueryForPage?statusList=${data && data.statusList}&pageNum=${data && data.page || 1}&pageSize=${data && data.limit || 10}`,
        method: 'post',
        data:data.params
    })
}

/**
 * 全部已读
 * @returns 
 */
export function allReadOrDel(data) {

    return request({
        url: `${context1}/zkxy-message-center/msg/allReadOrDel?status=${data && data.status}`,
        method: 'post',
    })
}

/**
 * 批量已读
 * @returns 
 */
export function updateBatch(data) {

    return request({
        url: `${context1}/zkxy-message-center/msg/updateBatch`,
        method: 'post',
        data
    })
}

/**      id
 * 已读  msgStatus:1(已读) & 2(删除)
 * @returns 
 */
export function updateMsg(data) {

    return request({
        url: `${context1}/zkxy-message-center/msg/update`,
        method: 'post',
        data
    })
}

//

/**
 * 查询消息详情 同时调用更新接口 id
 * @returns 
 */
export function queryOneMsgInfo(data) {

    return request({
        url: `${context1}/zkxy-message-center/msg/query`,
        method: 'post',
        data
    })
}


/**
 * 查询消息详情 同时调用更新接口 id
 * @returns 
 */
export function webssh(data) {

    return request({
        url: `/edu1/zkxy-vmware-api/ws/webssh`,
        method: 'post',
        headers: { "HTTP_CLIENT_IP": '192.168.10.67'},
        data
    })
}
