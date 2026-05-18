import request from '../../utils/request';

//获取群组列表
export function queryGroupList() {
  return request({
    url: '/service/sso-service/sso/usergroup/getList',
    method: 'GET',
  });
}

export function create(values) {
  return request({
    url: '/service/sso-service/sso/usergroup/create',
    method: 'POST',
    data: values,
  });
}

export function update(values) {
  return request({
    url: '/service/sso-service/sso/usergroup/update',
    method: 'PUT',
    data: values,
  });
}

export function remove(values) {
  return request({
    url: `/service/sso-service/sso/usergroup/delete`,
    method: 'PUT',
    data: values,
  });
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>群组内用户<<<<<<<<<<<<<<<<<<<<<<<<<<<

//查询组内所有用户
export function queryGroupUserList(values) {
  const pageNum = values.pageNum || 1;
  const pageSize = values.pageSize || 10;
  return request({
    url: '/service/sso-service/sso/user/getPagedGroupUser',
    method: 'GET',
    data: {
      pageNum,
      pageSize,
      ...values
    }
  });
}

export function getUserInfoByParam(value) {
  return request({
    url: '/service/sso-service/sso/user/getUserInfoByParam',
    method: 'GET',
    data: value,
  });
}

export function createUser(values) {
  return request({
    url: '/service/sso-service/sso/usergroup/ownerInvite',
    method: 'PUT',
    data: values,
  });
}

export function updateUser(values) {
  return request({
    url: '/service/sso-service/sso/user/updUserInfo',
    method: 'PUT',
    data: values,
  });
}

export function removeUser(values) {
  return request({
    url: `/service/sso-service/sso/usergroup/removeMember?userId=${values.userId}&groupId=${values.groupId}`,
    method: 'PUT',
    // data: values,
  });
}

export function resetPassword(values) {
  return request({
    url: `/service/sso-service/sso/user/resetUserPwd?userId=${values.userId}`,
    method: 'PUT',
    // data: values,
  });
}

// 根据群组编号获取群组信息
export function getGroupByNum(values) {
  return request({
    url: '/service/sso-service/sso/usergroup/getGroupByNum',
    method: 'GET',
    data: values,
  });
}

// 个人申请入群
export function personalApply(values) {
  return request({
    url: '/service/sso-service/sso/usergroup/personApply',
    method: 'POST',
    data: values,
  });
}

// 群主查询入群申请列表
export function getApplyList(value) {
  return request({
    url: `/service/sso-service/sso/usergroup/managerGetApplyList?groupId=${value}`,
    method: 'POST',
  });
}

// 群主审核申请入群信息
export function verify(values) {
  return request({
    url: '/service/sso-service/sso/usergroup/verify',
    method: 'POST',
    data: values,
  });
}

// 下载Excel模板
export function downloadTemplate() {
  return request({
    url: '/service/sso-service/sso/usergroup/templateDownLoad',
    method: 'GET',
    responseType: 'blob',
  });
}

// 导入Excel数据
export function importExcel(values) {
  return request({
    headers: { 'content-type': 'multipart/form-data' },   // 支持 FormData 传值
    url: `/service/sso-service/sso/usergroup/insertBatchGroupUser?groupId=${values.groupId}`,
    method: 'POST',
    data: values.file  // 直接传值，不需要包在 json 对象里
  });
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>群组内用户VM账号<<<<<<<<<<<<<<<<<<<<<<<<<<<

// 一键注销群组下的所有VM
export function releaseVmsByGroupIds(values) {
  return request({
    url: `/service/zkxy-vmware-api/vm/releaseVmsByGroupIds?groupIds=${values}`,
    method: 'GET',
    // data: values,
  });
}

// 为用户创建账号
export function addUserCounts(values) {
  return request({
    url: `/service/zkxy-vmware-api/vm/addUserCounts?groupId=${values.groupId}`,
    method: 'POST',
    data: values.userCounts,
  });
}

// 批量注销群组下所选的用户账号
export function releaseUserCounts(values) {
  return request({
    url: `/service/zkxy-vmware-api/vm/releaseUserCounts?groupId=${values.groupId}`,
    method: 'POST',
    data: values.userCounts,
  });
}

// 获取购买时间及折扣的列表
export function getRebateList() {
  return request({
    url: '/service/icharge/specificationRebate/list',
    method: 'GET',
  });
}

// 账号延期导致的VM续费时，计算价格
export function calcVMCost(values) {
  return request({
    url: '/service/icharge/vmwareOrder/calcCost',
    method: 'POST',
    data: values,
  });
}

// 获取群组下的所有vmId
export function getVmIdsByGroupId(values) {
  return request({
    url: '/service/zkxy-vmware-api/vm/getVmIdsByGroupId',
    method: 'GET',
    data: values,
  });
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>群组内VM管理<<<<<<<<<<<<<<<<<<<<<<<<<<<

// 获取群组下的所有vm列表
export function queryVmPagedList(values) {
  const params = {
    ...values,
    pageNum: values.pageNum || 1,
    pageSize: values.pageSize || 10,
  }

  return request({
    url: `/service/zkxy-vmware-api/vm/getVmsByCurrentUserForPage?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    method: 'POST',
    data: params
  });
}

// 关闭虚拟机电源
export function powerOffVM(value) {
  return request({
    url: `/service/zkxy-vmware-api/power/poweroff?vmID=${value.vmId}`,
    method: 'PUT'
  });
}

// 打开虚拟机电源
export function powerOnVM(values) {
  return request({
    url: `/service//zkxy-vmware-api/power/poweron?vmID=${values.vmId}&hostName=${values.hostname}`,
    method: 'PUT'
  });
}

// 重启虚拟机
export function rebootVM(value) {
  return request({
    url: `/service/zkxy-vmware-api/power/reboot?vmID=${value.vmId}`,
    method: 'PUT'
  });
}

// 挂起虚拟机
export function suspendVM(value) {
  return request({
    url: `/service/zkxy-vmware-api/power/suspend?vmID=${value.vmId}`,
    method: 'PUT'
  });
}

export function getToolList() {
  return request({
    url: '/service/zkxy-vmware-api/tools/edaTools',
    method: 'GET',
  });
}

// 获取虚拟机实例配置列表接口，如 XX核 XXG
export function getVmStandardList(value) {
  return request({
    url: '/service/icharge/specification/list',
    method: 'GET',
    data: {
      ...value,
      status: 1
    }
  });
}

// 查询虚拟机分类列表，包括机型、cpu、内存
export function getVmTypes(value) {
  return request({
    url: '/service/icharge/specification/list/searchKey',
    method: 'GET',
    data: value
  });
}

// 根据群组ID获取当前群组下的虚拟机配置信息(vmName和hostname会生成唯一值)
export function getVmNewConfigByGroupId(value) {
  return request({
    url: '/service/zkxy-vmware-api/vm/getVmNewConfigByGroupId',
    method: 'GET',
    data: value
  });
}

export function createVmOrder(values) {
  return request({
    url: '/service/icharge/vmwareOrder/create',
    method: 'POST',
    data: values,
  });
}

// 获取网络宽带规格的列表
export function getNetworkList() {
  return request({
    url: '/service/icharge/specification/list/network?status=1',
    method: 'GET',
  });
}


export function getGroupById(value) {
  return request({
    url: '/service/sso-service/sso/usergroup/getGroupById',
    method: 'GET',
    data: value
  });
}

export function existGroup(value) {
  return request({
    url: `/service/sso-service/sso/usergroup/personExit?groupId=${value.groupId}`,
    method: 'PUT',
    // data: value,
  });
}
