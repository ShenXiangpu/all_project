import { context1 } from "@/api/crm/context";
import request from "@/utils/request";

// 获取全部供应商列表
export function getSupplierList(data) {
  const { page, limit, params } = data;
  let url = `${context1}/supplier/supplierInfo/page/pageAllList?pageNum=${page}&pageSize=${limit}`;

  if (params) {
    const keys = Object.keys(params);
    keys.forEach((key) => {
      if (
        params[key] !== undefined &&
        params[key] !== "" &&
        params[key] !== null
      ) {
        url += `&${key}=${params[key]}`;
      }
    });
  }

  return request({
    url: url,
    method: "get",
  });
}

//新增一个供应商联系人
export function addLiaison(data) {
  return request({
    url: `${context1}/supplier/supplierInfo/liaison/addOne`,
    method: "post",
    data,
  });
}


//新增一个供应商联系人
export function addOne(data) {
  return request({
    url: `${context1}/supplier/supplierInfo/addOne`,
    method: "post",
    data,
  });
}

//修改一个供应商
export function editOne(data) {
  return request({
    url: `${context1}/supplier/supplierInfo/editOne`,
    method: "put",
    data,
  });
}


/**
 * 查询跟进记录列表
 */

export function followUpOneList(data) {
  return request({
    url: `${context1}/customerFollowUp/list?consumerId=${
      data && data.customerId
    }`,
    method: "get",
  });
}

// supplier/supplierInfo/oneDetail?customerId=12
export function oneDetail(data) {
  return request({
    url: `${context1}/supplier/supplierInfo/oneDetail?customerId=${data && data.id}`,
    method: "get",
  });
}


// supplier/supplierInfo/liaison/delOne?supplierLiaisonId=12
export function deleteOne(data) {
  return request({
    url: `${context1}/supplier/supplierInfo/liaison/delOne?supplierLiaisonId=${data && data.id}`,
    method: "delete",
  });
}

