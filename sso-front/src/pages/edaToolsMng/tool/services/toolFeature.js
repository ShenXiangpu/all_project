import request from 'utils/request';

export function getToolFeatures(value) {
  return request({
    url: '/service/tool-service/tool/getToolFeatures',
    method: 'GET',
    data: value
  });
}

export function queryFeatureListByVendor(values) {
  const parmas = {
    ...values,
    pageNum: values.pageNum || 1,
    pageSize: values.pageSize || 10
  }

  return request({
    url: '/service/tool-service/lic/getLicenseInfoByVendor',
    method: 'GET',
    data: parmas
  });
}

export function updateToolFeature(values) {
  return request({
    url: '/service/tool-service/tool/updFeatureForTool',
    method: 'PUT',
    data: values,
  });
}
