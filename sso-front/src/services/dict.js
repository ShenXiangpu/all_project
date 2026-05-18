import request from '../utils/request';

/**
 * 通用的数据字典
 */

export function getProjectDicts() {
    return request({
        url: '/service/datamanage-service/v1/datamanage/queryProcessNodeInfo',
        method: "GET"
    });
}
