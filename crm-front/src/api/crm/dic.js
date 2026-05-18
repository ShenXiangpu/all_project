import { context1 } from "@/api/crm/context";
import request from "@/utils/request";

/**
 * 
 * @param {*} data 
 * @param {*} op add,update,query
 * @returns 
 */
export function opDict(data,op) {
  return request({
    url: `${context1}/dict/${op}`,
    method: "post",
    data
  });
}