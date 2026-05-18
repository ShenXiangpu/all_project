import { values } from 'lodash-es';
import request from 'utils/request';

export function getTaskList(values) {
  const params = {
    ...values,
    pageNum: values.pageNum || 1,
    pageSize: values.pageSize || 10,
  }
  return request({
    url: `/service/edaTask-service/task/getTasks?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    method: 'POST',
    data: params
  });
}

// 获取用户工作空间目录
export function getUserPath() {
  return request({
    url: '/service/datamanage-service/v1/datamanage/getUserPath',
    method: 'GET',
  });
}

// 获取所有EDA厂商列表
export function getAllVendor() {
  return request({
    url: '/service/tool-service/vendor/getSupportTasks',
    method: 'GET',
  });
}

// 获取某厂商的所有工具
export function getToolByVendor(value) {
  return request({
    url: '/service/tool-service/tool/getToolByVendor',
    method: 'GET',
    data: value,
  });
}

// 创建任务
export function createTask(value) {
  return request({
    url: '/service/edaTask-service/task/create',
    method: 'POST',
    data: value,
  });
}

/**
 * 读取网表文件（子任务列表）
 */
export function readNetList(values) {
  return request({
    url: '/service/datamanage-service/v1/datamanage/readNetList',
    method: 'GET',
    data: values,
  });
}


// 执行任务
export function executeTask(values) {
  return request({
    url: '/service/edaTask-service/task/executeTask',
    method: 'POST',
    data: values,
  });
}

export function getTaskById(value) {
  return request({
    url: '/service/edaTask-service/task/getTask',
    method: 'GET',
    data: value,
  });
}

/**
 * 根据任务ID获取任务执行结果Job列表
 * @param {taskId} value 任务ID
 */
export function getJobList(value) {
  return request({
    url: '/service/edaTask-service/task-job/getTaskJob',
    method: 'GET',
    data: value,
  });
}

// 获取子任务列表
export function getSubtaskList(values) {
  const params = {
    ...values,
    pageNum: values.pageNum || 1,
    pageSize: values.pageSize || 10,
  }
  return request({
    url: `/service/edaTask-service/subtask/getSubtaskList?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    method: 'POST',
    data: params
  });
}

export function cancelJob(value) {
  return request({
    url: `/service/edaTask-service/task/cancel?jobId=${value.jobId}`,
    method: 'PUT',
  });
}

/**
* 删除任务
*/
export function deleteTask(value) {
  return request({
    url: `/service/edaTask-service/task/deleteTask?taskId=${value.taskId}&isDeleteFile=${value.isDeleteFile}`,
    method: 'DELETE',
    data: value,
  });
}

// 删除子任务
export function deleteSubTask(value) {
  return request({
    url: '/service/edaTask-service/subtask/delete',
    method: 'DELETE',
    data: value,
  });
}


// 执行任务时，检查用户输入命令
export function checkOption(values) {
  return request({
    url: '/service/edaTask-service/option/check',
    method: 'POST',
    data: values,
  });
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

/**
 * 根据 featureId 获取任务对应的工具列表
 * @param {*} values
 */
export function getToolFields(values) {
  return request({
    url: `/service/tool-service/tools/${values.feature_id}`,
  });
}

export function updateTask(values) {
  return request({
    url: '/service/task-service/task/updateTask',
    method: 'PUT',
    data: values,
  });
}

export function deleteResultLog(value) {
  return request({
    url: '/service/pms-service/task/deleteResultLog',
    method: 'DELETE',
    data: value,
  });
}

export function previewResultLog(value) {
  return request({
    url: '/service/pms-service/task/previewResultLog',
    method: 'GET',
    data: value,
  });
}

/**
 * 根据任务ID获取任务结果多版本列表
 * @param {taskId} value 任务ID
 */
export function getVersionList(value) {
  return request({
    url: '/service/task-service/res/list',
    method: 'GET',
    data: value,
  });
}

/**
 * 根据任务ID、任务版本ID，获取输入文件列表
 * @param {*} values
 */
export function getInputList(values) {
  return request({
    url: '/service/task-service/res/input',
    method: 'GET',
    data: values,
  });
}

/**
 * 根据任务路径ID，获取输出文件列表
 * @param {*} values
 */
export function getOutputList(values) {
  return request({
    url: '/service/datamanage-service/v1/datamanage/listTaskFiles',
    method: 'GET',
    data: values,
  });
}

/**
 * 根据任务路径ID，获取输出文件列表，超算平台
 * @param {*} values
 */
export function getOutputListSuper(values) {
  return request({
    url: '/service/zkxy-resource-adapter-webapp/job/queryJobDir',
    method: 'GET',
    data: values,
  });
}

/**
 * 根据任务ID、任务版本ID，获取日志输出
 * @param {*} values
 */
export function getTaskLog(values) {
  return request({
    url: '/service/task-service/res/log',
    method: 'GET',
    data: values,
  });
}

/**
 * 根据任务ID，获取执行任务所需参数
 * @param {*} values
 */
export function getTaskParams(values) {
  return request({
    url: '/service/edaTask-service/task/getTaskParams',
    method: 'GET',
    data: values,
  });
}

/**
 * 获取共享数据列表：公共库、个人工作空间
 * @param {string} path
 */
export function getFilesByPath(values) {
  return request({
    url: '/service/datamanage-service/v1/datamanage/listTaskFiles',
    method: 'GET',
    data: values
  });
}

/**
 * 清空回收站
 * @param {*} value
 */
export function emptyTrash(value) {
  return request({
    url: `/service/task-service/task/emptyTrash?taskIds=${value.taskIds}`,
    method: 'PUT',
    // data: value,
  });
}
/**
 * 从回收站还原
 */
export function resumeTask(value) {
  return request({
    url: `/service/task-service/task/resumeTask?taskIds=${value.taskIds}`,
    method: 'PUT',
    // data: value,
  });
}
