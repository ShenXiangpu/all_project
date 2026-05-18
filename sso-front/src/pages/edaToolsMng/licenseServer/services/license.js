import request from 'utils/request';

export function queryLicenseList(values) {
    const pageNum = values.pageNum || 1;
    const pageSize = values.pageSize || 10;

    return request({
        url: `/service/tool-service/lic/getLicInfo?pageNum=${pageNum}&pageSize=${pageSize}`,
        method: 'POST',
        data: values
    });
}

export function getLicenseInUsedList(values) {
    return request({
        url: '/service/tool-service/lic/getInUsed',
        method: 'GET',
        data: values
    });
}
