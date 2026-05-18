import request from '../../utils/request';

export function queryDictList(values) {
  return request({
    url: '/service/datamanage-service/v1/datamanage/listFiles',
    method: 'GET',
    data: values
  });
}

export function createFolder(values) {
  return request({
    url: '/service/datamanage-service/v1/datamanage/createHdfsDir',
    method: 'POST',
    data: values,
  });
}

// export function deleteFile(values) {
//     return request({
//         url: '/dict/delete',
//         method: 'DELETE',
//         data: values,
//     });
// }

export function deleteMulti(values) {
  return request({
    url: '/service/datamanage-service/v1/datamanage/deleteById',
    method: 'POST',
    data: values,
  });
}

/**
 * 获取回收站列表
 * @param {*} values
 */
export function queryRecycleFileList(values) {
  return request({
    url: `/service/datamanage-service/v1/datamanage/recycleFileList?currentPath=${values.currentPath}`,
    method: 'POST',
    // data: values
  });
}

/**
 * 还原文件
 * @param {*} values
 */
export function resumeById(values) {
  return request({
    url: '/service/datamanage-service/v1/datamanage/resumeById',
    method: 'POST',
    data: values,
  });
}

export function deleteRecycleById(values) {
  return request({
    url: '/service/datamanage-service/v1/datamanage/deleteRecycleById',
    method: 'POST',
    data: values,
  });
}

/**
 * 清空回收站
 */
export function emptyRecycle() {
  return request({
    url: '/service/datamanage-service/v1/datamanage/emptyRecycleById',
    method: 'POST',
  });
}


export function downloadById(values) {
  return request({
    url: '/service/datamanage-service/v1/datamanage/downloadById',
    method: 'POST',
    data: values.fileId,
    responseType: 'blob',
  }).then(response => {
    const contentDisposition = response.headers['content-disposition'];
    const filename = decodeURI(contentDisposition.split('fileName=')[1] || contentDisposition.split('filename=')[1]);
    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);
    if (window.navigator.msSaveBlob) {
      try {
        window.navigator.msSaveBlob(blob, filename);
      }
      catch (e) {
        console.log(e);
      }
    }
    else {
      let link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    }
  })
}

/**
 * 移动文件
 * @param {*} values
 */
export function moveFiles(values) {
  return request({
    url: '/service/datamanage-service/v1/datamanage/moveFile',
    method: 'POST',
    data: values,
  });
}

/**
 * 压缩文件
 * @param {*} values
 */
export function zipFile(values) {
  return request({
    url: `/service/datamanage-service/v1/datamanage/zipFile?zipName=${values.zipName}`,
    method: 'POST',
    data: values.fileList,
  });
}

export function unZipFile(values) {
  return request({
    url: `/service/datamanage-service/v1/datamanage/unZipFile?unzipPath=${values.unzipPath}`,
    method: 'POST',
    data: values.file,
  });
}

/**
 * 复制文件
 * @param {*} values
 */
export function copyFiles(values) {
  return request({
    url: `/service/datamanage-service/v1/datamanage/copyFile?copyPath=${values.copyPath}`,
    method: 'POST',
    data: values.fileList,
  });
}

/**
 * 检查存储空间
 */
export function checkStorage(values) {
  return request({
    url: '/service/datamanage-service/v1/datamanage/checkStorage',
    method: 'POST',
    data:values
  });
}


/**
 * 查询可购买扩容套餐
 * @param {*} values state 0 1 2
 * @returns 
 */
export function queryCapacityList(values) {
  return request({
    url: '/service/icharge/specification/list/storage',
    method: 'GET',
    data: values
  });
}

/**
 * 生成订单oriderID 传入套餐的Id
 * @param flavorId
 */
export function createCaOrder(values) {
  return request({
    url: '/service/icharge/vmwareOrder/storage',
    method: 'POST',
    data: values
  });
}

/**
 * 获取订单列表
 * @param pageSize 
 * @param pageNum
 */
export function getCapatityOrders(values) {
  return request({
    url: '/service/icharge/vmwareOrder/list',
    method: 'GET',
    data: values
  });
}

/**
 * 获取用户容量组成
 */

 export function getOneUserInfo(values) {
  return request({
    url: '/service/icharge/vmwareOrder/storage/oneUserInfo',
    method: 'GET',
    data: values
  });
}

/**
 */

 export function getVMDetailByNo(values) {
  return request({
    url: '/service/icharge/vmwareOrder/detailByNo',
    method: 'GET',
    data: values
  });
}

