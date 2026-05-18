import React, { Fragment } from 'react';
import { Button, Upload, message } from 'antd';
import styles from './BaseView.less';

// 头像组件 方便以后独立，增加裁剪之类的功能
class AvatarView extends React.PureComponent {

    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('只支持上传JPG 、JPEG 、GIF、 PNG格式的图片');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片必须小于2MB');
        }
        return isJpgOrPng && isLt2M;
    }

    handleChange = (info) => {
        const { onFileChange } = this.props
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            // const file = info.file.response.resData;
            const file =  info.file.originFileObj;
            onFileChange(file)
        }
    }

    render() {
        const { avatar } = this.props

        return (
            <Fragment>
                <div className={styles.avatar_title}>头像</div>
                <div className={styles.avatar}>
                    <img src={avatar} alt="avatar" />
                </div>
                <Upload
                    showUploadList={false}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}>
                    <div className={styles.button_view}>
                        <Button icon="upload">更换头像</Button>
                    </div>
                </Upload>
            </Fragment>
        )
    }
}

export default AvatarView