import request from 'utils/request';

/**
 * 获取列表，包括：代工厂、供应商、工艺节点、IP类型
 * @returns
 */
export function queryNavi() {
  return request({
    url: '/service/ipdatamanage/v1/ipdatamanage/navi',
    method: 'GET',
  });
}

/**
 * 根据查询条件获取相关IP信息
 * @param {*}} values
 * @returns
 */
export function query(values) {
  return request({
    url: '/service/ipdatamanage/v1/ipdatamanage/list',
    method: 'POST',
    data: values
  });
}

/**
 * 获取推荐列表：最新
 * @param {*} values
 * @returns
 */
export function queryNewIPList() {
  return request({
    url: '/service/ipdatamanage/v1/ipdatamanage/list/newips',
    method: 'GET',
  });
}

/**
 * 获取推荐列表：最热
 * @param {*} values
 * @returns
 */
export function queryHotIPList() {
  return request({
    url: '/service/ipdatamanage/v1/ipdatamanage/list/hotestIps',
    method: 'GET',
  });
}

/**
 * 根据id获取IP详情
 * @param {*} id
 * @returns
 */
export function getIpDetailByID(id) {
  return request({
    url: '/service/ipdatamanage/v1/ipdatamanage/ip/detail',
    method: 'GET',
    data: id
  });
}

export function getIpsByProviderName(companyName) {
  return request({
    url: `/service/ipdatamanage/v1/ipdatamanage/list/companyBelongingIps?companyName=${companyName}`,
    method: 'GET',
    // data: companyName
  });
}
