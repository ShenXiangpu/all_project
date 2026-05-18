import request from '@/utils/request'
import { context1 } from '@/api/context'

/**
 * 统计系统人数
 * @param {*}  
 * @returns 
 */
export function getCoursePageForIndex() {
  return request({
    url: `${context1}/sso-service/sso/indexCalculate/userData`,
    method: 'get',
  })
}



//


export function onlineDate() {
  return request({
    url: `${context1}/sso-service/sso/feature/monitor/onlineDate`,
    method: 'get',
  })
}


//


export function usageDuration(data) {
  return request({
    url: `${context1}/sso-service/sso/feature/monitor/usageDuration?dayLimit=${data && data.dayLimit}`,
    method: 'get',
  })
}

//虚拟机性能接口


//performance/queryClusterPerformance

export function queryClusterPerformance(data) {
  return request({
    url: `${context1}/zkxy-vmware-api/performance/queryClusterPerformance?interval=${data && data.interval}`,
    method: 'get',
  })
}


//排行榜

export function rankingList(data) {
  return request({
    url: `${context1}/sso-service/sso/feature/monitor/rankingList?dayLimit=${data && data.dayLimit}`,
    method: 'get',
  })
}