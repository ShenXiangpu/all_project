/**
 * 统一响应格式
 */
export interface ApiResponse<T = any> {
    code: number;
    message: string;
    data: T;
}

export function success<T = any>(data: T, message: string = 'success'): ApiResponse<T> {
    return {
        code: 200,
        message,
        data,
    };
}

export function fail(code: number, message: string = 'error'): ApiResponse {
    return {
        code,
        message,
        data: null,
    };
}

export function unauthorized(message: string = '未授权'): ApiResponse {
    return fail(401, message);
}

export function badRequest(message: string = '请求参数错误'): ApiResponse {
    return fail(400, message);
}