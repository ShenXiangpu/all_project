import { context1 } from "@/api/crm/context";
import request from '@/utils/request'

export function queryUnreadCount() {
  return request({
    // url: '/vue-element-admin/user/login',
    url: `${context1}/msg/queryUnreadCount`,
    method: 'get',
    
  })
}
