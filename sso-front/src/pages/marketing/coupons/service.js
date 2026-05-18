import request from '../../../utils/request';

import { isEqual } from 'lodash'


/**
 * 获取优惠券适用范围列表 
 * @returns 
 */ 
export function queryScopeList(values) {
  return request({
    url: '/service/icharge/couponType/enum/scopeList',
    method: 'GET',
    data: values
  });
}


/**
 * 创建优惠券 
 * @returns 
 */ 
 export function createCoupons(values) {
  return request({
    url: '/service/icharge/couponType/create',
    method: 'POST',
    data: values
  });
}

/**
 * 获取优惠券列表 
 * @returns 
 */ 
 export function couponsList(values) {
   const status = values.status
   console.log(values)
  return request({
    url:!isEqual(status,'all')  ? `/service/icharge/couponType/list?status=${values.status}&pageSize=${values.pageSize || 10}&pageNum=${values.pageNum || 1}` : `/service/icharge/couponType/list?pageSize=${values.pageSize || 10}&pageNum=${values.pageNum || 1}`,
    method: 'GET',
  });
}

/**
 * 使优惠券生效或失效 
 * @returns 
 */ 
 export function handleStatus(values) {
  const status = values.status;
  const id = values.id;
  return request({
    url: `/service/icharge/couponType/status`,
    method: 'PUT',
    data: {
      status,
      id
    }
  });
}