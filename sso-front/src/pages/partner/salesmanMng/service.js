import request from '../../../utils/request';

//添加一个销售渠道
export function addOneSalesman(values) {
    return request({
        url: '/service/education/qks/addOneSalesman',
        method: 'POST',
        data: values
    });
}

//展示销售渠道
export function listSalesman(values) {
    return request({
        url: `/service/education/qks/listSalesman?name=${values.name || ''}&phone=${values.phone|| ''}&pageSize=${values.pageSize || 10}&pageNum=${values.pageNum || 1}`,
        method: 'GET',
    });
}

//获取一个渠道二维码
export function oneSalesmanQrCode(values) {
    return request({
        url: `/service/education/qks/oneSalesmanQrCode?id=${values.id}`,
        method: 'GET',
    });
}