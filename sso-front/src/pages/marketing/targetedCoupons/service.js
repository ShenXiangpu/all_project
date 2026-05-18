import { isEqual } from 'lodash';
import request from '../../../utils/request';



export function getUserByPhone(values) {
  let pageNum = values.pageNum || 1;
  let pageSize = values.pageSize || 50;
  let phone = values.phone

  return request({
    url: `/service/sso-service/sso/user/getUserByPhone?pageNum=${pageNum}&pageSize=${pageSize}&phone=${phone}`,
    method: 'GET',
    // data: {
    //   companyId: "",
    //   deptId: "",
    //   groupId: "",
    //   keyWord: values.phone || '0000000000',
    //   roleType: "",
    //   sorter: ""
    // }
  });
}

/**
 * 获取推送用户角色
 * @param {*} values 
 * @returns 
 */
export function getUserRole(values) {
  return request({
    url: `/service/sso-service/sso/role/getList`,
    method: 'POST',
    data: {
      keyWord: '',
      roleType: "2",
    }
  });
}

/**
 * 获取已推送过的记录
 * @param {*} values 
 * @returns 
 */
export function getCouponPushList(values) {
  const status = values.status

  return request({
    url: `/service/icharge/couponPush/list`,
    method: 'GET',
    data: {
      ...values
    }
  });
}

/**
 * 推送
 * @param {*} values 
 * @returns 
 */
export function createPush(values) {

  return request({
    url: `/service/icharge/couponPush/create`,
    method: 'POST',
    data: { ...values }
  });
}

/**
 * 获取优惠券列表  0-禁用 1-启用 2-已过期失效
 * @returns 
 */
export function couponsList(values) {
  let status = values.status || 1
  let pageSize = values.pageSize || 5
  let pageNum = values.pageNum || 1
  return request({
    url: `/service/icharge/couponType/list?status=${status}&pageSize=${pageSize}&pageNum=${pageNum}`,
    method: 'GET',
  });
}



