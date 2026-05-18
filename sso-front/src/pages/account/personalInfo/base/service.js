import request from 'utils/request';

export function uploadHeadImg(values) {
    return request({
        url: '/service/sso-service/sso/user/upAvatar',
        method: 'POST',
        data: values,
    });
}
