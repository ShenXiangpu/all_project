import request from '@/utils/request'

export function queryUnreadCount(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: 'edu/zkxy-message-center/msg/queryUnreadCount',
    method: 'get',
    
  })
}
