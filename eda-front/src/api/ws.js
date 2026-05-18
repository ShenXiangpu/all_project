import request from '@/utils/request'
import { context1 } from '@/api/context'
export function queryUnreadCount(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: `${context1}/zkxy-message-center/msg/queryUnreadCount`,
    method: 'get',
    
  })
}
