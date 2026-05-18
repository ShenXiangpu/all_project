import { isEmpty } from 'lodash-es';
import request from 'utils/request';

export function queryMsgList(values) {
  const pageNum = values.pageNum || 1;
  const pageSize = values.pageSize || 10;
  const statusList = values.msgStatus || [0, 1];

  if (values.msgStatus || isEmpty(values.msgStatus)) {
    delete values.msgStatus
  }

  return request({
    url: `/service/zkxy-message-center/msg/commonQueryForPage?statusList=${statusList}&&pageNum=${pageNum}&&pageSize=${pageSize}`,
    method: 'POST',
    data: values
  });
}

/**
 * 批量更新消息，删除、标记为已读
 */
export function updateBatch(values) {
  return request({
    url: '/service/zkxy-message-center/msg/updateBatch',
    method: 'POST',
    data: values
  });
}

/**
 * 更新单条消息，删除、标记为已读
 */
export function update(values) {
  return request({
    url: '/service/zkxy-message-center/msg/update',
    method: 'POST',
    data: values
  });
}

/**
 * 全部已读或者删除接口
 */
export function allReadOrDel(value) {
  return request({
    url: `/service/zkxy-message-center/msg/allReadOrDel?status=${value}`,
    method: 'POST',
  });
}

/**
 * 根据id查询详情
 */
export function queryById(values) {
  return request({
    url: '/service/zkxy-message-center/msg/query',
    method: 'POST',
    data: values
  });
}


/**
 * 获取一个用户可以领取的优惠券列表
 */
 export function canReceive(values) {
  const msgId = values.msgId
  return request({
    url: `/service/icharge/couponPush/getByMsgId?msgId=${msgId}`,
    method: 'GET',
    // data: {
    //   pageSize:Number(values.pageSize)  || 30,
    //   pageNum:Number(values.pageNum)  || 1,  
    // }
  });
}

/**
 * 领取优惠券
 */
 export function receiveCoupons(values) {

  return request({
    url: `/service/icharge/couponPush/receive?typeId=${values.typeId}&msgId=${values.msgId}`,
    method: 'POST',
  });
}
