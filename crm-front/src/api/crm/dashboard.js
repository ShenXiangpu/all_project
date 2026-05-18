import request from "@/utils/request";
import { context1 } from "@/api/crm/context";

export function platform() {
  return request({
    url: `${context1}/dashboard/platform`,
    method: "post",
  });
}


export function department() {
  return request({
    url: `${context1}/dashboard/department`,
    method: "post",
  });
}



export function contract() {
  return request({
    url: `${context1}/dashboard/contract`,
    method: "post",
  });
}