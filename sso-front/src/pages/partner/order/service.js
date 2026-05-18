import { log } from 'lodash-decorators/utils';
import request from '../../../utils/request';

//校验账号信息，发送手机号/邮箱，校验是否存在
export function listOneRegistration(values) {
    console.log('values',values);
    return request({
        url: `/service/education/qks/listOneRegistration?status=${values.status || ''}&name=${values.name || ''}&phone=${values.phone || ''}&affiliateName=${values.affiliateName || ''}&pageSize=${values.pageSize || 10}&pageNum=${values.pageNum || 1}`,
        method: 'GET',
    });
}
