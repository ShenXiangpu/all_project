import request from '@/utils/request'

export function queryUnreadCount(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: 'edu/msg/queryUnreadCount',
    method: 'get',
    
  })
}
