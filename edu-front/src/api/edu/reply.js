/**
 * 作业和批改作业
 */

import request from "@/utils/request";

/**
 * 新增回复
 * @param {*} data
 * @returns
 */
export function addComment(data) {
  console.log("data", data);
  return request({
    url: `edu/sso-service/sso/comment/v3/addComment`,
    method: "put",
    data,
  });
}
/**
 * 新增回复
 * @param {*} data
 * @returns
 */
export function isLike(data) {
  return request({
    url: `edu/sso-service/sso/comment/v3/isLike?commentId=${data && data.id}`,
    method: "put",
  });
}
/**
 * 删除评论或问题
 * @param {*} data
 * @returns
 */
export function delQuerstion(data) {
  return request({
    url: `edu/sso-service/sso/comment/v3/del?commentId=${data && data.id}`,
    method: "delete",
  });
}
/**
 * 查看问题详情
 * @param {*} data
 * @returns
 */
export function getCommentDetail(data) {
  return request({
    url: `edu/sso-service/sso/comment/v3/getCommentDetail?commentId=${
      data && data.id
    }`,
    method: "get",
  });
}

/**
 * 查询问题列表List
 * @param {*} data
 * @returns
 */
export function getCommentList(data) {
  let params = "";
  if (data && data.keyWord) {
    params += `&keyWord=${data.keyWord}`;
  }
  return request({
    url: `edu/sso-service/sso/comment/v3/getCommentList?courseId=${
      data && data.courseId
    }${params}`,
    method: "get",
  });
}

/**
 * 查询问题列表List
 * @param {*} data
 * @returns
 */
export function getMyCommentList(data) {
  let params = "";
  if (data && data.keyWord) {
    params += `&keyWord=${data.keyWord}`;
  }
  return request({
    url: `edu/sso-service/sso/comment/v3/getMyCommentList?courseId=${
      data && data.courseId
    }${params}`,
    method: "get",
  });
}

/**
 * 我的问题列表List
 * @param {*} data
 * @returns
 */
export function getReplyListByPage(data) {
  return request({
    url: `edu/sso-service/sso/comment/v3/getReplyListByPage?pageNum=${
      (data && data.page) || 1
    }&pageSize=${(data && data.limit) || 10}&commentId=${data && data.id}`,
    method: "get",
  });
}
