import request from '../../utils/request';

/**
 * 添加一个教学
 * @returns
 */
export function addOneEdu(values) {
    return request({
        url: '/service/education/train/addOne',
        method: 'POST',
        data: { ...values }
    });
}

/**
 * step5:更新教学某个字段
 * @returns
 */
export function updateOneEdu(values) {
    return request({
        url: `/service/education/train/updateOneTrain`,
        method: 'PUT',
        data: values
    });
}


/**
 * 教学列表
 * @returns
 */
export function eduList(values) {
    return request({
        url: `/service/education/train/list?status=${values.status || ''}&pageSize=${values.pageSize || 10}&pageNum=${values.pageNum || 1}`,
        method: 'GET',
    });
}

/**
 * 对一次教学的一个报名表单，查看报名记录
 * @returns
 */
export function oneFormFillList(values) {
    return request({
        url: `/service/education/train/oneFormFillList?status=${values.status || ''}&trainId=${values.trainId || ''}&pageSize=${values.pageSize || 10}&pageNum=${values.pageNum || 1}`,
        method: 'GET',
    });
}


/**
 * 用户填写培训的报名表单后，培训管理员进行审核
 * @returns
 */
export function userFillFormAudit(values) {
    return request({
        url: `/service/education/train/userFillFormAudit`,
        method: 'PUT',
        data: values
    });
}

/**
 * step5:对一个教学，手动修改他的状态
 * 现在是报名中 那就只能改成培训中 status传1
    现在是培训中 要向改回报名中 status传0
    现在是培训中 要想改成已结束 status传2
 * @returns
 */
export function modifyOneTrainStatus(values) {
    return request({
        url: `/service/education/train/modifyOneTrainStatus`,
        method: 'PUT',
        data: values
    });
}

// 导出一个文档
export function exportOne(values) {
    return request({
        url: `/service/education/train/oneFormFillList3?status=${values.status || ''}&trainId=${values.trainId || ''}&trainInfoId=${values.trainInfoId || ''}`,
        method: 'get',
        responseType: 'blob',
    });
}


/**
 * step1: 获取字典项：课程方向、课程分类等
 * @returns 
 */
export function getKeyValue() {
    return request({
        url: '/service/education/ps/dict/keyValue',
        method: 'GET',
    });
}



// 培训详情
export function getOneTrainDetailById(values) {
    return request({
        url: `/service/education/train/getOneTrainDetailById?trainId=${values.trainId}`,
        method: 'GET',
    });
}










