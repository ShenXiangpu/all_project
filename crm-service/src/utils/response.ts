/**
 * 统一响应格式
 */
export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

export function success<T>(data: T, message: string = 'success'): ApiResponse<T> {
  return {
    code: 200,
    data,
    message
  };
}

export function fail(code: number, message: string): ApiResponse {
  return {
    code,
    data: null,
    message
  };
}

export function unauthorized(message: string = '未授权'): ApiResponse {
  return fail(401, message);
}

export function badRequest(message: string = '请求参数错误'): ApiResponse {
  return fail(400, message);
}
