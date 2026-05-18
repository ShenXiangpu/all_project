import request from 'utils/request';

export function getVersions(value) {
  return request({
    url: '/service/tool-service/tool-version/getVersions',
    method: 'GET',
    data: value
  });
}

export function createVersion(values) {
  return request({
    url: '/service/tool-service/tool-version/add',
    method: 'POST',
    data: values,
  });
}

export function updateVersion(values) {
  return request({
    url: '/service/tool-service/tool-version/editVersion',
    method: 'PUT',
    data: values,
  });
}

export function removeVersion(values) {
  return request({
    url: `/service/tool-service/tool-version/delVersion?versionId=${values.id}`,
    method: 'DELETE',
  });
}

export function getToolEnv(value) {
  return request({
    url: '/service/tool-service/tool-env/getToolEnv',
    method: 'GET',
    data: value
  });
}

export function addToolEnv(values) {
  return request({
    url: '/service/tool-service/tool-env/addToolEnv',
    method: 'POST',
    data: values,
  });
}

export function updateToolEnv(values) {
  return request({
    url: '/service/tool-service/tool-env/updToolEnv',
    method: 'POST',
    data: values,
  });
}

export function delToolEnv(value) {
  return request({
    url: `/service/tool-service/tool-env/delToolEnv?envId=${value.envId}`,
    method: 'DELETE',
    // data: value,
  });
}

