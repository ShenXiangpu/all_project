import request from '../../utils/request';


/**
 * 流片流程前期接口
 */
//  流片需求List
export function getDemandList(values) {
  let companyName = values && values.companyName ? values.companyName.trim() : '';
  let createTime = values && values.createTime ? values.createTime.trim() : '';
  let foundryName = values && values.foundryName ? values.foundryName.trim() : '';
  let processNode = values && values.processNode ? values.processNode.trim() : '';
  let userName = values && values.userName ? values.userName.trim() : '';
  let data = {
    companyName,
    createTime,
    foundryName,
    processNode,
    userName
  }
  return request({
    url: `/service/zkxy-mpw/mpw/chipdemand/getDemandList?pageNum=${values.pageNum || 1}&pageSize=${values.pageSize || 10}`,
    method: 'POST',
    data: data
  });
}

// 提交流片需求
export function submitMpwDemand(values) {
  return request({
    url: '/service/zkxy-mpw/mpw/chipdemand/submit',
    method: 'POST',
    data: values
  });
}

// 评审流片需求 POST 
export function reviewMpwDemand(values) {
  return request({
    url: '/service/zkxy-mpw/mpw/chipdemand/review',
    method: 'POST',
    data: values
  });
}

// 根据需求id查询需求详情
export function getDemandInfoById(values) {
  return request({
    url: '/service/zkxy-mpw/mpw/chipdemand/getDemandInfoById',
    method: 'GET',
    data: values
  });
}

// 根据用户useName 查询用户信息
export function getInfoByUserName(values) {
  return request({
    url: '/service/user/api/getInfoByUserName',
    method: 'GET',
    data: values
  });
}

/**
 * 多选列表
 */


// 代工厂列表 
export function getFoundryList(values) {
  return request({
    url: '/service/zkxy-mpw/mpw/foundry/getList',
    method: 'POST',
    data: {
      keyWord: ''
    }
  });
}

// 工艺节点列表 
export function getProcessNodesList(values) {
  return request({
    url: '/service/zkxy-mpw/mpw/processnode/getList',
    method: 'POST',
    data: {
      keyWord: ''
    }
  });
}

// 工艺类型列表
export function getProcessTypeList(values) {
  return request({
    url: '/service/zkxy-mpw/mpw/processtype/getList',
    method: 'POST',
    data: {
      keyWord: ''
    }
  });
}

// 工艺特征列表 
export function getProcessCharacteristicsList(values) {
  return request({
    url: '/service/zkxy-mpw/sys/processcharacteristic/getList',
    method: 'POST',
    data: {
      keyWord: ''
    }
  });
}

// Poly和Metal的使用  
export function getPolyAndMetalList(values) {
  return request({
    url: '/service/zkxy-mpw/sys/ploymetal/getList',
    method: 'POST',
    data: {
      keyWord: ''
    }
  });
}



// 顶层金属
export function getTopMetalList(values) {
  return request({
    url: '/service/zkxy-mpw/mpw/topmetal/getList',
    method: 'POST',
    data: {
      keyWord: ''
    }
  });
}

// 电容   
export function getCapacitanceList(values) {
  return request({
    url: '/service/zkxy-mpw/mpw/capacitance/getList',
    method: 'POST',
    data: {
      keyWord: ''
    }
  });
}

// 电阻    
export function getResistanceList(values) {
  return request({
    url: '/service/zkxy-mpw/mpw/resistance/getList',
    method: 'POST',
    data: {
      keyWord: ''
    }
  });
}

// Core电压    
export function getCorevoltageList(values) {
  return request({
    url: '/service/zkxy-mpw/mpw/corevoltage/getList',
    method: 'POST',
    data: {
      keyWord: ''
    }
  });
}

// IO器件电压
export function getIovoltageList(values) {
  return request({
    url: '/service/zkxy-mpw/mpw/iovoltage/getList',
    method: 'POST',
    data: {
      keyWord: ''
    }
  });
}































// 设计包需求
export function getDesignPackageRequirementsList(values) {
  return request({
    url: '/service/zkxy-mpw/mpw/packagerequirement/getList',
    method: 'POST',
    data: {
      keyWord: ''
    }
  });
}

// 流片计划
// export function getTapeOutPlanList(values) {
//   return request({
//     url: '/service/mpw/tapeout/getList',
//     method: 'POST',
//     data: values
//   });
// }


// 流片计划
export function getTapeOutPlanList(values) {
  return request({
    url: '/service/zkxy-mpw/mpw/tapeout/getList',
    method: 'POST',
    data: {
      keyWord: ''
    }
  });
}


// 芯片
// export function getTapeOutPlanList(values) {
//   return request({
//     url: '/service/mpw/tapeout/getList',
//     method: 'POST',
//     data: values
//   });
// }    


// 生成项目
export function createProject(values) {
  return request({
    url: '/service/zkxy-mpw/mpw/chipproject/create',
    method: 'POST',
    data: values
  });
}

// 下载审核结果
export function downloadReviewResult(values) {
  return request({
    url: `/service/zkxy-mpw/mpw/chipdemand/downloadReviewResult?demandId=${values.demandId}`,
    method: 'GET',
    // data: values.fileId,
    responseType: 'blob',
  }).then(response => {
    const contentDisposition = response.headers['content-disposition'];
    const filename = `评审结果${decodeURI(contentDisposition.split('fileName=')[1] || contentDisposition.split('filename=')[1])}`;
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
  // return request({
  //   url: `/service/zkxy-mpw/mpw/chipdemand/downloadReviewResult?demandId=${values.demandId}`,
  //   method: 'GET',
  // });
}








/**
 * mpw 后期接口
 */


// 获取配额使用情况
export function checkStorage(values) {
  return request({
    url: `/service/zkxy-mpw/mpw/chipproject/checkStorage`,
    method: 'GET',
    data: values
  });
}

// 关闭项目

export function closeProject(values) {
  return request({
    url: `/service/zkxy-mpw/mpw/chipproject//zkxy-mpw/mpw/chipproject/close`,
    method: 'POST',
    data: values
  });
}
/**
 * 复制文件
 * @param {*} values 
 * @returns 
 */

export function copyFiles(values) {
  return request({
    url: `/service/zkxy-mpw/mpw/chipproject/copyFile?projectId=${values.projectId}&copyPath=${values.copyPath || '/'}&copyPathId=${values.copyPathId || '1'}`,
    method: 'POST',
    data: values.fileList
  });
}


/**
 * 删除文件
 */
export function deleteFileById(values) {
  console.log('values', values);
  return request({
    url: `/service/zkxy-mpw/mpw/chipproject/deleteFileById?projectId=${values.projectId}`,
    method: 'POST',
    data: values.data
  });
}

/**
 * 删除回收站文件
 */
export function deleteRecycleById(values) {
  console.log(values, 'values');
  return request({
    url: `/service/zkxy-mpw/mpw/chipproject/deleteRecycleById?projectId=${values.projectId}`,
    method: 'POST',
    data: values.values
  });
}
/**
 * 下载文件
 */
export function downloadById(values) {
  console.log(values, '=============================');
  return request({
    url: `/service/zkxy-mpw/mpw/chipproject/downLoadById?projectId=${values.projectId}`,
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
 * 创建文件夹 /zkxy-mpw/mpw/chipproject/createDir?projectId=1&pathInfo=1&currentPath=1
 */
export function createFolder(values) {
  return request({
    url: `/service/zkxy-mpw/mpw/chipproject/createDir?projectId=${values.projectId}&pathInfo=${values.pathInfo}&currentPath=${values.currentPath}`,
    method: 'POST',
  });
}


/**
 * 清空回收站内文件
 */
export function emptyRecycleById(values) {
  return request({
    url: `/service/zkxy-mpw/mpw/chipproject/emptyRecycleById?projectId=${values.projectId}`,
    method: 'POST',
  });
}



/**
 * 上传文件前，检查项目配额是否足够
 */
export function isEnoughStorage(values) {
  return request({
    url: `/service/zkxy-mpw/mpw/chipproject/isEnoughStorage?fileSize=${values.fileSize}&projectId=${values.projectId}`,
    method: 'POST',
  });
}


/**
 * 文件列表查询
 */
export function listFiles(values) {
  return request({
    url: `/service/zkxy-mpw/mpw/chipproject/listFiles`,
    method: 'GET',
    data: values
  });
}

/**
 * 移动文件
 */
export function moveFiles(values) {
  return request({
    url: `/service/zkxy-mpw/mpw/chipproject/moveFile?projectId=${values.projectId}&copyPath=${values.copyPath || '/'}&copyPathId=${values.copyPathId || '1'}`,
    method: 'POST',
    data: values.fileId
  });
}

/**
 * 回收站列表
 */
export function recycleFileList(values) {
  return request({
    url: `/service/zkxy-mpw/mpw/chipproject/recycleFileList?projectId=${values.projectId}`,
    method: 'GET',
  });
}


/**
 * 还原删除文件
 */
export function resumeById(values) {
  return request({
    url: `/service/zkxy-mpw/mpw/chipproject/resumeById?projectId=${values.projectId}`,
    method: 'POST',
    data: values.data
  });
}






/**
 * 上传文件
 */
export function uploadBigFile(values) {
  console.log(values, 'values');
  return request({
    url: `/service/zkxy-mpw/mpw/chipproject/uploadBigFile?
    currentPath=${values.currentPath}
    &pathName=${values.pathName}
    &chunks=${values.chunks}
    &chunk=${values.chunk}
    &md5=${values.md5}
    &projectId=${values.projectId}`,
    method: 'POST',
    data: values
  });
}




/**
 * 
 */

/**
 * 还原删除文件
 */
export function submit(values) {

  return request({
    url: `/service/zkxy-mpw/mpw/servicerecord/submit`,
    method: 'POST',
    data: values
  });
}

/**
 * 验证文件  zkxy-mpw/mpw/chipproject/verifyFiles?projectId=12
 */
export function verifyFiles(values) {

  return request({
    url: `/service/zkxy-mpw/mpw/chipproject/verifyFiles?projectId=${values.projectId}`,
    method: 'POST',
    data: values.data
  });
}

/**
 * 查看项目详情 zkxy-mpw/mpw/chipproject/getProjectInfo?demandId=12
 */

export function getProjectInfo(values) {

  return request({
    url: `/service/zkxy-mpw/mpw/chipproject/getProjectInfo?demandId=${values.demandId}`,
    method: 'GET',
  });
}

