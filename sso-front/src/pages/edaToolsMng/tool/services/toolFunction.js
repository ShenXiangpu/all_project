import request from 'utils/request';
/**
 * 后端代码重构，此处所有feature均改为function
 */

export function getToolFunctions(value) {
  return request({
    url: '/service/tool-service/tool-task/getToolFunctions',
    method: 'GET',
    data: value
  });
}

export function createFunction(values) {
  return request({
    url: '/service/tool-service/tool-task/add',
    method: 'POST',
    data: values,
  });
}

export function updateFunction(values) {
  return request({
    url: '/service/tool-service/tool-task/editFunction',
    method: 'PUT',
    data: values,
  });
}

export function removeFunction(values) {
  return request({
    url: `/service/tool-service/tool-task/delFunction?functionId=${values.id}`,
    method: 'DELETE',
  });
}

//----------------Feature参数信息维护 start---------------------

// 获取Feature对应参数列表
export function getParams(value) {
  return request({
    url: `/service/tool-service/task-parameter/query?functionId=${value.functionId}`,
    method: 'POST',
    // data: value
  });
}

export function createParam(values) {
  return request({
    url: '/service/tool-service/task-parameter/add',
    method: 'POST',
    data: values,
  });
}

export function updateParam(values) {
  return request({
    url: '/service/tool-service/task-parameter/edit',
    method: 'PUT',
    data: values,
  });
}

export function removeParam(values) {
  return request({
    url: `/service/tool-service/task-parameter/deleteById?parameterId=${values.id}`,
    method: 'DELETE',
  });
}

/**
 * 根据工具ID查询功能列表
 * @param {*} values 
 * @returns 
 */
export function getListByToolById(values) {
  return request({
    url: `/service/tool-service/tool-function/getListByTool?toolId=${values.funcId}`,
    method: 'GET',
  });
}
/**
 * 给工具新增功能
 * 
 */

export function addToolFuction(values) {
  return request({
    url: `/service/tool-service/tool-function/add`,
    method: 'POST',
    data: values
  });
}


/**
 * 编辑功能
 * 
 */

export function updateToolFuction(values) {
  return request({
    url: `/service/tool-service/tool-function/update`,
    method: 'PUT',
    data: values
  });
}

/**
 * 功能分类
 * 
 */

export function functionTreeList(values) {
  return request({
    url: `/service/tool-service/tool-category/list/tree`,
    method: 'GET',
  });
}



/**
 * 功能分类
 * 
 */

export function deleteFunctionById(values) {
  return request({
    url: `/service/tool-service/tool-function/delToolFunction?functionId=${values.functionId}`,
    method: 'DELETE',
  });
}

//tool-service/tool-function/getFeature?functionId=1


/**
 * 功能feature
 * 
 */

export function getFeature(values) {
  return request({
    url: `/service/tool-service/tool-function/getFeature?functionId=${values.functionId}`,
    method: 'GET',
  });
}

/**
 * 增加功能feature
 * 
 */
export function addFeature(values) {
  return request({
    url: `/service/tool-service/tool-function/addFeature?featureName=${values.featureName}&functionId=${values.functionId}`,
    method: 'POST',
  });
}

/**
 * 修改feature
 */
export function updateFeature(values) {
  return request({
    url: `/service/tool-service/tool-function/updateFeature?relationId=${values.relationId}&featureType=${values.featureType}`,
    method: 'PUT',
  });
}

/**
 * 修改feature
 */
export function delFeature(values) {
  return request({
    url: `/service/tool-service/tool-function/delFeature?relationId=${values.relationId}`,
    method: 'DELETE',
  });
}

/**
 * 获得工具相关的features
 */
 export function getFeaturesList(values) {
  return request({
    url: `/service/tool-service/tool/getFeatures?pageNum=${values.pageNum || 1}&pageSize=${values.pageSize || 10}&toolId=${values.toolId}&vendorId=${values.vendorId}`,
    method: 'GET',
  });
}


/**
 * 获得工具相关的features
 */
 export function getFeaturesUseInfo(values) {
  return request({
    url: `/service/tool-service/tool/getFeatureInUsed?&featureName=${values.featureName}&vendorId=${values.vendorId}`,
    method: 'GET',
  });
}


