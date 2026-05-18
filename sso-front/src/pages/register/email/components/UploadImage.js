import React from 'react';
import { Upload, Icon, message } from 'antd';
import styles from './FillCompanyInfo.less'

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class UploadImage extends React.PureComponent {
    state = {
        loading: false,
        imageUrl: ''
    };

    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('只支持上传JPG 、JPEG 、GIF、 PNG格式的图片');
        }
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
            message.error('图片必须小于5MB');
        }
        return isJpgOrPng && isLt2M;
    }

    handleChange = (info) => {
        const { saveUploadUrl } = this.props

        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            saveUploadUrl(info.file.response.resData)

            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    }

    render() {
        const { imageUrl } = this.state

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">点击上传营业执照</div>
            </div>
        );

        const uploadProps = {
            action: '/service/sso-service/sso/register/upload',   //上传接口请求的地址
        }

        return (
            <Upload
                {...uploadProps}
                listType='picture-card'
                showUploadList={false}
                className={styles.upload}
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="营业执照" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        )
    }
}

export default UploadImage
