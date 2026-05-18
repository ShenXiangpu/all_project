import request from '../../utils/request';


/**
 * 流片流程前期接口
 */
//  流片需求List
export function getDemandList(values) {
  return request({
    url: `/service/zkxy-mpw/mpw/chipdemand/getAllDemandList?pageNum=${values.pageNum || 1}&pageSize=${values.pageSize|| 10}`,
    method: 'POST',
    data: {
      companyName:values.companyName || '',
      createTime:values.createTime || '',
      createTimeEnd:values.createTimeEnd || '',
      foundryName:values.foundryName || '',
      processNode:values.processNode || '',
      userName:values.userName || '',
    }
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
    url: '/service/mpw/chipdemand/review',
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
    data:  {
      keyWord: ''
    }
  });
}

// Poly和Metal的使用  
export function getPolyAndMetalList(values) {
  return request({
    url: '/service/zkxy-mpw/sys/ploymetal/getList',
    method: 'POST',
    data:  {
      keyWord: ''
    }
  });
}



// 顶层金属
export function getTopMetalList(values) {
  return request({
    url: '/service/zkxy-mpw/mpw/topmetal/getList',
    method: 'POST',
    data:  {
      keyWord: ''
    }
  });
}

// 电容   
export function getCapacitanceList(values) {
  return request({
    url: '/service/zkxy-mpw/mpw/capacitance/getList',
    method: 'POST',
    data:  {
      keyWord: ''
    }
  });
}

// 电阻    
export function getResistanceList(values) {
  return request({
    url: '/service/zkxy-mpw/mpw/resistance/getList',
    method: 'POST',
    data:  {
      keyWord: ''
    }
  });
}

// Core电压    
export function getCorevoltageList(values) {
  return request({
    url: '/service/zkxy-mpw/mpw/corevoltage/getList',
    method: 'POST',
    data:  {
      keyWord: ''
    }
  });
}

// IO器件电压
export function getIovoltageList(values) {
  return request({
    url: '/service/zkxy-mpw/mpw/iovoltage/getList',
    method: 'POST',
    data:  {
      keyWord: ''
    }
  });
}


/**
 * 下载文件
 */
 export function downloadServiceRecord(values) {
  return request({
    url: `/service/zkxy-mpw/mpw/servicerecord/downloadServiceRecord?demandId=${values.demandID}`,
    method: 'GET',
    // data: values.fileId,
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


// IO器件电压
export function closeProject(values) {
  return request({
    url: `/service/zkxy-mpw/mpw/chipproject/close?projectId=${values.projectId}`,
    method: 'POST',
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

/**
 * 评审满意度调查
 */
 export function getRecordById(values) {
  console.log(values);
  return request({
    url: `/service/zkxy-mpw/mpw/servicerecord/getRecordById?demandId=${values.demandID}`,
    method: 'GET',
  });
}

// 
export function reviewSa(values) {
  return request({
    url: `/service/zkxy-mpw/mpw/servicerecord/review`,
    method: 'POST',
    data: values
  });
}