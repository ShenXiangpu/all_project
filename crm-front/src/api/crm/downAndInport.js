import { context1 } from "@/api/crm/context";
import request from "@/utils/request";

/**
 * 下载设备导入模板
 */
export function downTemplate(url) {
    return request({
      url: `${context1}/${url}`,
      method: "get",
      responseType: "blob",
    });
  }
  
  
  /**
   * 批量导入用户
   * @param {*} data
   * @returns
   */
  export function insertBatch(data,url) {
    return request({
      url: `${context1}/${url}`,
      method: "post",
      data,
      // responseType: 'blob'
    });
  }