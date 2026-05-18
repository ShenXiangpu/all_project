/**
 * 实操云相关操作
 */

import request from "@/utils/request";

/**
 * edu)根据vm id获取vm信息
 * @param {*} data
 * @returns
 */
export function getVmByVmId(data) {
  return request({
    url: `edu/zkxy-vm-web/vm/getVmByVmId?vmId=${data.id}`,
    method: "get",
  });
}

/**
 * edu)根据vm id获取vm信息
 * @param {*} data
 * @returns
 */
export function getVmByCourseId(data) {
  let param = "";
  if (data && data.userId && data.userId != 0) {
    param += `&userId=${data.userId}`;
  }
  return request({
    url: `edu/zkxy-vm-web/vm/getVmByCourseId?courseId=${data.id}${param}`,
    method: "get",
  });
}

/**
 * (edu)老师根据班级创建课程所需IC设计云(创建任务异步执行,该接口只返回任务是否已提交成功(true:任务提交成功,否则返回false)),创建结果以WebSocket形式通知
 * @param {*} data
 * @returns
 */
export function createVM(data) {
  return request({
    url: `edu/zkxy-vm-web/vm/createVM`,
    method: "post",
    data,
  });
}

/**
 * (edu)根据当前用户角色和查询条件分页查询实操云列表
 * @param {*} data
 * @returns
 */
export function getVmsByCurrentUserForPage(data) {
  let virtualMachine = data && data.params;
  return request({
    url: `edu/zkxy-vm-web/vm/getVmsByCurrentUserForPage?pageNum=${
      (data && data.page) || 1
    }&pageSize=${(data && data.limit) || 10}`,
    method: "post",
    data: virtualMachine || {},
  });
}

/**
 * edu)根据当前用户角色和查询条件分页查询实操云列表(不包括课程的)
 * @param {*} data
 * @returns
 */
export function getVmsByCurrentUserForPagelC(data) {
  let virtualMachine = data && data.params;
  return request({
    url: `edu/zkxy-vm-web/vm/getVmsByCurrentUserForPageIC?pageNum=${
      (data && data.page) || 1
    }&pageSize=${(data && data.limit) || 10}`,
    method: "post",
    data: virtualMachine || {},
  });
}
/**
 * (edu)根据当前用户角色和查询条件分页查询实操云列表
 * @param {*} data
 * @returns
 */
export function homework(data) {
  return request({
    url: `edu/zkxy-vm-web/vm/homework?teacherId=${
      data.teacherId || 10
    }&courseId=${data.courseId}&courseName=${data.courseName}&homeworkName=${
      data.homeworkName
    }`,
    method: "get",
  });
}

/**
 * (edu)初始化ip列表接口测试(dev:172.18.10.10-100;test:172.18.10.101-240)
 * @param {*} data
 * @returns
 */
export function ipInit(data) {
  return request({
    url: `edu/zkxy-vm-web/vm/ipInit`,
    method: "get",
  });
}

/**
 * (edu)根据当前登录用户和路径展示用户所在实操云下的文件列表
 * @param {*} data
 * @returns
 */
export function listFile(data) {
  console.log(data);
  let param = "";

  if (data && data.userId && data.userId != 0) {
    param += `&userId=${data.userId}`;
  }
  console.log(param);
  return request({
    url: `edu/zkxy-vm-web/vm/listFile?vmId=${data.vmId}&path=${
      (data && data.path) || ""
    }${param}`,
    method: "post",
  });
}

/**
 * (edu)重置用户实操云指定用户的密码(如果重置的用户为关联用户,则noVNC密码也会一同被重置)
 * @param {*} data
 * @returns
 */
export function resetPwd(data) {
  return request({
    url: `edu/zkxy-vm-web/vm/resetPwd?vmId=${data.vmId}&username=${data.username}&password=${data.password}`,
    method: "post",
  });
}

/**
 * (edu)重置用户实操云指定用户的密码(如果重置的用户为关联用户,则noVNC密码也会一同被重置)
 * @param {*} data
 * @returns
 */
export function submitHomeWork(data) {
  return request({
    url: `edu/zkxy-vm-web/vm/submitHomeWork?vmId=${data.vmId}&homeWorkSources=${data.homeWorkSources}&homeWorkDestDir=${data.homeWorkDestDir}`,
    method: "post",
  });
}

//实操云类型和实例规格接口
/**
 * (edu)查询实操云实例列表
 * @param {*} data
 * @returns
 */
export function getVmStandards(data) {
  return request({
    url: `edu/zkxy-vm-web/vm/getVmStandards`,
    method: "post",
    data,
  });
}

/**
 * (edu)查询实操云分类列表
 * @param {*} data
 * @returns
 */
export function getVmTypes() {
  return request({
    url: `edu/zkxy-vm-web/specification/list/searchKey`,
    method: "get",
  });
}

/**
 * (edu)获取网络带宽规格的列表(不分页)
 * @param {*} data
 * @returns
 */
export function network() {
  return request({
    url: `edu/zkxy-vm-web/specification/list/network?status=1`,
    method: "get",
  });
}

//zkxy-vm-web/vm/validateVmName?vmName=12321

/**
 * (edu)
 * @param {*} data
 * @returns
 */
export function validateVmName(data) {
  return request({
    url: `edu/zkxy-vm-web/vm/validateVmName?vmName=${data.vmName}`,
    method: "get",
  });
}

/**
 * (edu)
 * @param {*} data
 * @returns
 */
export function cn2py(data) {
  return request({
    url: `edu/zkxy-vm-web/cn/cn2py?chinese=${data.chinese}`,
    method: "get",
  });
}

/**
 * (edu)校验主机名是否唯一(如唯一返回空,如不唯一返回建议值)
 * @param {*} data
 * @returns
 */
export function checkHostname(data) {
  return request({
    url: `edu/zkxy-vm-web/cn/checkHostname?hostname=${data.hostname}`,
    method: "get",
  });
}

/**
 * (edu)关闭实操云电源
 * @param {*} data
 * @returns
 */
export function poweroff(data) {
  return request({
    url: `edu/zkxy-vm-web/power/poweroff?vmID=${data.id}`,
    method: "put",
  });
}

/**
 * (edu)打开实操云电源
 * @param {*} data
 * @returns
 */
export function poweron(data) {
  return request({
    url: `edu/zkxy-vm-web/power/poweron?vmID=${data.id}&hostName=${data.hostName}`,
    method: "put",
  });
}

/**
 * (edu)重启实操云
 * @param {*} data
 * @returns
 */
export function reboot(data) {
  return request({
    url: `edu/zkxy-vm-web/power/reboot?vmID=${data.id}`,
    method: "put",
  });
}

/**
 * (edu)挂起实操云
 * @param {*} data
 * @returns
 */
export function suspend(data) {
  return request({
    url: `edu/zkxy-vm-web/power/suspend?vmID=${data.id}`,
    method: "put",
  });
}

/**
 * (edu)根据实操云ID查询实操云的快照策略
 * @param {*} data
 * @returns
 */
export function getPolicyByVmId(data) {
  return request({
    url: `edu/zkxy-vm-web/snapshot/getPolicyByVmId?vmID=${data && data.id}`,
    method: "get",
  });
}

/**
 * (edu)获取实操云指定用户名的noVNC地址
 * @param {*} data
 * @returns
 */
export function getConsoleForUser(data) {
  return request({
    url: `edu/zkxy-vm-web/remoteConsole/getConsoleForUser?vmId=${data.vmId}&username=${data.username}`,
    method: "get",
  });
}

/**
 * (edu)根据实操云id对指定的实操云进行升降配操作(CPU,内存,磁盘以及EDA工具等)
 * @param {*} data
 * @returns
 */
export function reConfig(data) {
  return request({
    url: `edu/zkxy-vm-web/vm/reConfig`,
    method: "post",
    data,
  });
}

/**
 * (edu)根据实操云ids对指定的实操云进行批量升降配操作(CPU,内存,磁盘以及EDA工具等)
 * @param {*} data
 * @returns
 */
export function reConfigBatch(data) {
  return request({
    url: `edu/zkxy-vm-web/vm/reConfigBatch?vmIds=${data && data.vmIds}`,
    method: "post",
    data: data && data.updateVMInfo,
  });
}

//重启实操云桌面

/**
 * (edu)根据实操云id对指定的实操云进行升降配操作(CPU,内存,磁盘以及EDA工具等)
 * @param {*} data
 * @returns
 */
export function restartDesktop(data) {
  return request({
    url: `edu/zkxy-vm-web/remoteConsole/restartDesktop?vmId=${
      data && data.vmId
    }&username=${data && data.username}`,
    method: "get",
  });
}

/**
 * (edu)根据实操云id对指定的实操云进行升降配操作(CPU,内存,磁盘以及EDA工具等)
 * @param {*} data
 * @returns
 */
export function deleteVMs(data) {
  return request({
    url: `edu/zkxy-vm-web/vm/deleteVMs?vmIdList=${data}`,
    method: "get",
  });
}

/**
 * (edu)
实操云关联账号增加和禁用(因为账号可能在使用,会导致账号无法正常删除,除非强制关机后再启动再进行删除,所以此处只是进行账号禁用)
 * @param {*} data 
 * @returns 
 */
export function changeUserCounts(data) {
  return request({
    url: `edu/zkxy-vm-web/vm/changeUserCounts?vmId=${data && data.vmId}`,
    method: "post",
    data: data && data.userCounts,
  });
}

/**
 * (edu)
实操云关联账号增加和禁用(因为账号可能在使用,会导致账号无法正常删除,除非强制关机后再启动再进行删除,所以此处只是进行账号禁用)
 * @param {*} data 
 * @returns 
 */
export function snapshotList(data) {
  return request({
    url: `edu/zkxy-vm-web/snapshot/list?vmID=${data && data.vmId}`,
    method: "get",
  });
}
//

export function isExistSnapshot(data) {
  return request({
    url: `edu/zkxy-vm-web/snapshot/isExistSnapshot`,
    method: "post",
    data: data && data.vmIds,
  });
}

//

/**
 * (edu)查询实操云性能摘要
 * @param {*} data
 * @returns
 */
export function vMPerformanceSummary(data) {
  return request({
    url: `edu/zkxy-vm-web/performance/queryVMPerformanceSummary?vmID=${
      data && data.vmId
    }`,
    method: "get",
  });
}

/**
 * (edu)查询时间段内的性能指标
 * @param {*} data
 * @returns
 */
export function periodPerformance(data) {
  return request({
    url: `edu/zkxy-vm-web/performance/queryPeriodPerformance?vmID=${
      data && data.vmId
    }&startTime=${data && data.startTime}&endTime=${data && data.endTime}`,
    method: "get",
  });
}

/**
 * (edu)列出实操云全部快照
 * @param {*} data
 * @returns
 */
// export function snapshotList(data) {
//     return request({
//         url: `edu/zkxy-vm-web/snapshot/list?vmID=${data && data.vmId}`,
//         method: 'get',
//     })
// }

/**
 * (edu)删除实操云快照
 * @param {*} data
 * @returns
 */
export function deleteSnapshot(data) {
  return request({
    url: `edu/zkxy-vm-web/snapshot/delete`,
    method: "delete",
    data,
  });
}

/**
 * (edu)删除实操云快照
 * @param {*} data
 * @returns
 */
export function deleteAllSnapshot(data) {
  return request({
    url: `edu/zkxy-vm-web/snapshot/deleteAll?vmID=${data && data.vmId}`,
    method: "delete",
  });
}
//

/**
 * (edu)删除实操云快照
 * @param {*} data
 * @returns
 */
export function updatePolicy(data) {
  return request({
    url: `edu/zkxy-vm-web/snapshot/updatePolicy`,
    method: "post",
    data,
  });
}

/**
 * (edu)根据快照名称获取快照时实操云的配置信息
 * @param {*} data
 * @returns
 */
export function getVmInfoBySnapshotName(data) {
  return request({
    url: `edu/zkxy-vm-web/snapshot/getVmInfoBySnapshotName?snapshotName=${
      data && data.name
    }`,
    method: "get",
  });
}

/**
 * (edu)从指定的快照恢复实操云并提示是否可以进行快照恢复
 * @param {*} data
 * @returns
 */
export function revert(data) {
  return request({
    url: `edu/zkxy-vm-web/snapshot/revert`,
    method: "post",
    data,
  });
}

/**
 * 告警
 */

//
/**
 * (edu)删除实操云快照
 * @param {*} data
 * @returns
 */
export function validateAlarmName(data) {
  return request({
    url: `edu/zkxy-vm-web/alarm/validateAlarmName?alarmName=${
      data && data.alarmName
    }`,
    method: "get",
  });
}

//
/**
 * (edu)删除实操云快照
 * @param {*} data
 * @returns
 */
export function getIcSupportAlarmTypes(data) {
  return request({
    url: `edu/zkxy-vm-web/alarm/getIcSupportAlarmTypes`,
    method: "get",
  });
}

//
/**
 * (edu)删除实操云快照
 * @param {*} data
 * @returns
 */
export function addOrUpdate(data) {
  return request({
    url: `edu/zkxy-vm-web/alarm/addOrUpdate`,
    method: "post",
    data,
  });
}

//

/**
 * (edu)根据实操云id查询告警配置列表
 * @param {*} data
 * @returns
 */
export function getAlarmConfigsByVmId(data) {
  return request({
    url: `edu/zkxy-vm-web/alarm/getAlarmConfigsByVmId?vmId=${
      data && data.vmId
    }`,
    method: "get",
  });
}

/**
 * 根据实操云id和告警配置id删除告警配置信息
 * @param {*} data
 * @returns
 */

export function deleteAlarmConfig(data) {
  return request({
    url: `edu/zkxy-vm-web/alarm/deleteAlarmConfig?alarmId=${data && data.id}`,
    method: "post",
  });
}

/**
 * 查询实操云警报事件
 * @param {*} data
 * @returns
 */

export function queryAlarmEvent(data) {
  return request({
    url: `edu/zkxy-vm-web/alarm/queryAlarmEvent?pageNum=${
      (data && data.page) || 1
    }&pageSize=${(data && data.limit) || 10}`,
    method: "post",
    data: data && data.params,
  });
}
/**
 * 告警
 */

/**
 * 文件上传到虚拟机
 */

export function uploadFileToVM(data) {
  let param = "";
  if (data && data.userId && data.userId != 0) {
    param += `&userId=${data.userId}`;
  }
  return request({
    url: `edu/zkxy-vm-web/file/uploadFileToVM?vmId=${
      data && data.vmId
    }&uploadPath=${data && data.uploadPath}${param}`,
    method: "post",
    data: data && data.md5,
  });
}
