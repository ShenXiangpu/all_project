import request from 'utils/request';

//获取虚拟机列表
export function queryVmList(values) {
  return request({
    url: '/service/zkxy-vmware-api/vm/getVmsByCurrentUser',
    data: values,
    method: 'GET',
  });
}

//获取虚拟机分页列表
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

// 获取命令窗口地址
export function getConsoleUrl(values) {
  return request({
    url: '/service/zkxy-vmware-api/rancher/container/console/getByProjectIdAndWorkloadId',
    data: values,
    method: 'GET',
  });
}

// 获取资源监控页面各个图表的数据
export function getResourceUsage(values) {
  return request({
    url: '/service/zkxy-vmware-api/rancher/resourceUsage',
    data: values,
    method: 'GET',
  });
}

export function create(values) {
  return request({
    url: '/service/zkxy-vmware-api/vm/createVM',
    method: 'POST',
    data: values,
  });
}

export function createVmOrder(values) {
  return request({
    url: '/service/icharge/vmwareOrder/create',
    method: 'POST',
    data: values,
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

export function checkVmName(value) {
  return request({
    url: '/service/zkxy-vmware-api/vm/validateVmName',
    method: 'GET',
    data: value,
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

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 详情页面相关接口（包括基本信息、监控信息） >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// 获取详情信息
export function getVmByVmId(value) {
  return request({
    url: '/service/zkxy-vmware-api/vm/getVmByVmId',
    method: 'GET',
    data: value,
  });
}

// 获取VM性能摘要
export function queryVMPerformanceSummary(value) {
  return request({
    url: '/service/zkxy-vmware-api/performance/queryVMPerformanceSummary',
    method: 'GET',
    data: value,
  });
}

// 查询时间段内VM的性能指标
export function queryPeriodPerformance(value) {
  return request({
    url: '/service/zkxy-vmware-api/performance/queryPeriodPerformance',
    method: 'GET',
    data: value,
  });
}

// 获取VM web远程连接
export function getConsole(value) {
  return request({
    url: '/service/zkxy-vmware-api/remoteConsole/getConsole',
    method: 'GET',
    data: value,
  });
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VM 多用户创建，获取用户列表 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//获取企业内部门列表
export function queryDeptList() {
  return request({
    url: '/service/sso-service/sso/dept/getList',
    method: 'GET',
  });
}

//企业管理员按部门获取部门内用户列表
export function queryEnterpriseUserList(values) {
  const params = {
    ...values,
    pageNum: values.pageNum || 1,
    pageSize: values.pageSize || 10,
  }
  return request({
    url: `/service/sso-service/sso/user/getInternalUser?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    method: 'POST',
    data: params
  });
}

//获取群组列表
export function queryGroupList() {
  return request({
    url: '/service/sso-service/sso/usergroup/getList',
    method: 'GET',
  });
}

//查询组内用户
export function queryGroupUserList(values) {
  return request({
    url: '/service/sso-service/sso/user/getGroupUserNoVm',
    method: 'GET',
    data: values
  });
}

// 汉字转拼音，并去重
export function cn2py(values) {
  return request({
    url: '/service/zkxy-vmware-api/cn/cn2hn',
    method: 'GET',
    data: values
  });
}

// 接收用户列表，将用户名转为拼音
export function user2py(values) {
  return request({
    url: '/service/zkxy-vmware-api/cn/user2py',
    method: 'POST',
    data: values
  });
}

export function checkHostname(value) {
  return request({
    url: '/service/zkxy-vmware-api/cn/checkHostname',
    method: 'GET',
    data: value,
  });
}

export function getConsoleForUser(values) {
  return request({
    url: '/service/zkxy-vmware-api/remoteConsole/getConsoleForUser',
    method: 'GET',
    data: values,
  });
}

// 升降配时，计算价格
// export function calcCost(values) {
//   return request({
//     url: '/service/icharge/reconfigOrder/calcCost',
//     method: 'GET',
//     data: values,
//   });
// }

// 创建VM时、续费时，计算价格
export function calcVMCost(values) {
  return request({
    url: '/service/icharge/vmwareOrder/calcCost',
    method: 'POST',
    data: values,
  });
}


// 获取某VM快照列表
export function getVMSnapshotList(value) {
  return request({
    url: '/service/zkxy-vmware-api/snapshot/list',
    method: 'GET',
    data: value
  });
}

// 删除某VM全部快照
export function deleteAllSnapshot(value) {
  return request({
    url: `/service/zkxy-vmware-api/snapshot/deleteAll?vmID=${value.vmID}`,
    method: 'DELETE',
  });
}

// 根据快照name删除某VM的快照
export function deleteSnapshot(value) {
  return request({
    url: '/service/zkxy-vmware-api/snapshot/delete',
    method: 'DELETE',
    data: value
  });
}

// 根据快照名称获取快照时虚拟机的配置信息
export function getVmInfoBySnapshotName(value) {
  return request({
    url: '/service/zkxy-vmware-api/snapshot/getVmInfoBySnapshotName',
    method: 'GET',
    data: value
  });
}

// 从指定快照恢复VM
export function revertVM(value) {
  return request({
    url: '/service/zkxy-vmware-api/snapshot/revert',
    method: 'POST',
    data: value
  });
}

// 根据VMID获取该VM的快照策略
export function getPolicyByVmId(value) {
  return request({
    url: '/service/zkxy-vmware-api/snapshot/getPolicyByVmId',
    method: 'GET',
    data: value
  });
}

// 变更某VM的快照策略
export function updatePolicy(values) {
  return request({
    url: '/service/zkxy-vmware-api/snapshot/updatePolicy',
    method: 'POST',
    data: values
  });
}

// VM关联多用户账号的CRUD
export function changeUserCounts(values) {
  return request({
    url: `/service/zkxy-vmware-api/vm/changeUserCounts?vmId=${values.vmId}`,
    method: 'POST',
    data: values.userCounts
  });
}

// 获取购买时间及折扣的列表
export function getRebateList() {
  return request({
    url: '/service/icharge/specificationRebate/list',
    method: 'GET',
  });
}

// 获取网络宽带规格的列表
export function getNetworkList() {
  return request({
    url: '/service/icharge/specification/list/network?status=1',
    method: 'GET',
  });
}

//企业项目经理查询部门内所有用户
export function queryDeptUserList(values) {
  const pageNum = values.pageNum || 1;
  const pageSize = values.pageSize || 10;
  return request({
    url: '/service/sso-service/sso/user/getPagedDeptUser',
    method: 'GET',
    data: {
      pageNum,
      pageSize,
      ...values
    }
  });
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> VM 告警策略 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// 根据虚拟机id查询告警配置列表
export function getAlarmConfigsByVmId(value) {
  return request({
    url: '/service/zkxy-vmware-api/alarm/getAlarmConfigsByVmId',
    method: 'GET',
    data: value
  });
}

// 获取IC设计云支持的告警配置类型
export function getIcSupportAlarmTypes() {
  return request({
    url: '/service/zkxy-vmware-api/alarm/getIcSupportAlarmTypes',
    method: 'GET',
  });
}

// 根据虚拟机id和告警配置名词重名判断
export function validateAlarmName(value) {
  return request({
    url: '/service/zkxy-vmware-api/alarm/validateAlarmName',
    method: 'GET',
    data: value
  });
}

// 添加、编辑告警策略
export function addOrUpdatePolicy(values) {
  return request({
    url: '/service/zkxy-vmware-api/alarm/addOrUpdate',
    method: 'POST',
    data: values
  });
}

// 根据虚拟机id和告警配置id删除告警配置信息
export function deleteAlarmConfig(value) {
  return request({
    url: `/service/zkxy-vmware-api/alarm/deleteAlarmConfig?vmId=${value.vmId}&alarmId=${value.alarmId}`,
    method: 'POST',
  });
}

// 查询虚拟机警报历史事件
export function queryAlarmEvent(values) {
  const params = {
    ...values,
    pageNum: values.pageNum || 1,
    pageSize: values.pageSize || 10,
  }

  return request({
    url: `/service/zkxy-vmware-api/alarm/queryAlarmEvent?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    method: 'POST',
    data: params
  });
}

// 查询虚拟机警报历史事件
export function handleNameToChinese(values) {
  return request({
    url: `/service/zkxy-vmware-api/cn/cn2py?chinese=${values.chinese}`,
    method: 'GET',
  });
}



