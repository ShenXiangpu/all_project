import request from '../../utils/request';

//
export function addOneRegistration(values) {
    return request({
        url: '/service/education/qks/addOneRegistration',
        method: 'POST',
        data: values
    });
}


//
export function goToPay(values) {
    return request({
        url: '/service/education/qks/pay/goToPay',
        method: 'POST',
        data: values
    });
}


//
export function getOneRegistration(values) {
    return request({
        url: `/service/education/qks/getOneRegistration?id=${values.id || ''}&num=${values.num || ''}`,
        method: 'GET',
    });
}

//
export function goToPay4Query(values) {
    return request({
        url: `/service/education/qks/pay/goToPay4Query?orderNum=${values.num || ''}`,
        method: 'POST',
    });
}

//获取报名的基本信息
export function getRegistrationBasisInfo(values) {
    return request({
        url: `/service/education/qks/getRegistrationBasisInfo`,
        method: 'GET',
    });
}