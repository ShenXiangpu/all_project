import request from 'utils/request';

//获取docker虚拟机列表
export function queryVmList(values) {
  return request({
    url: '/service/zkxy-resource-allocation/rancher/project/workloads',
    data: values,
    method: 'GET',
  });
}

// 获取命令窗口地址
export function getConsoleUrl(values) {
  return request({
    url: '/service/zkxy-resource-allocation/rancher/container/console/getByProjectIdAndWorkloadId',
    data: values,
    method: 'GET',
  });
}

// 获取资源监控页面各个图表的数据
export function getResourceUsage(values) {
  return request({
    url: '/service/zkxy-resource-allocation/rancher/resourceUsage',
    data: values,
    method: 'GET',
  });
}

export function create(values) {
  return request({
    url: '/service/zkxy-resource-allocation/rancher/container/create',
    method: 'POST',
    data: values,
  });
}

export function getToolList() {
  return request({
    url: '/service/zkxy-resource-allocation/tools/edaTools',
    method: 'GET',
  });
}

export function getTemplateList() {
  return request({
    url: '/service/zkxy-resource-allocation/rancher/containerTemplate',
    method: 'GET',
  });
}

export function checkVmName(value) {
  return request({
    url: '/service/zkxy-resource-allocation/rancher/container/checkVmName',
    data: value,
  });
}

export function getDockerInfoById(value) {
  return request({
    url: `/service/zkxy-resource-allocation/rancher/workloads/${value}`,
  });
}
