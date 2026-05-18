import React, { Component } from 'react'
import store from 'store'
import PropTypes from 'prop-types'
import { Form, Button, Row, Input, Select, Upload, Descriptions, Badge, Icon, message } from 'antd'
import styles from './BaseView.less'

const FormItem = Form.Item
const { Option } = Select

const formItemLayout = {
    labelCol: {
        xs: { span: 0 },
        sm: { span: 0 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
    },
};


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}


@Form.create()
class BaseInfoForm extends Component {

    state = {
        imgSrc: undefined,
        imgStyle: null,
        uploadLoading: false,
    }

    //校验企业名称是否已存在
    handleCheckCompanyName = (rule, value, callback) => {
        const { dispatch, baseInfo } = this.props
        if (value && value !== baseInfo.companyName) {
            dispatch({
                type: 'enterprise/checkCompanyName',
                payload: { companyName: value },
                callback: (response) => {
                    if(response && !response.flag) {
                        callback(response.errMessage)
                    } else {
                        callback()
                    }
                }
            })
        } else {
            // Note: 必须总是返回一个 callback
            callback()
        }
    }

    //校验企业统一社会信用代码是否已存在
    handleCheckCertificateCode = (rule, value, callback) => {
        const { dispatch, baseInfo } = this.props
        if (value && value !== baseInfo.certificateCode) {
            dispatch({
                type: 'enterprise/checkCertificateCode',
                payload: { certificateCode: value },
                callback: (response) => {
                    if(response && !response.flag) {
                        callback(response.errMessage)
                    } else {
                        callback()
                    }
                }
            })
        } else {
            // Note: 必须总是返回一个 callback
            callback()
        }
    }

    renderChildren = (status) => {
        switch (status) {
            case 0:
                return <Badge status="processing" text="正在审核" />;
            case 1:
                return <Badge status="success" text="审核通过" />;
                break;
            case 2:
                return <Badge status="error" text="审核不通过" />;
                break;
            default:
                break;
        }
        return null;
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
        if (info.file.status === 'uploading') {
            this.setState({ uploadLoading: true });
            return;
        }

        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    uploadLoading: false,
                    imgSrc: imageUrl
                })
            );
        }
    }

    handleBackClick = (e) => {
        e.preventDefault();
        const { onCancelUpdate } = this.props
        onCancelUpdate();
    }

    handleReSubmit = (e) => {
        e.preventDefault();
        const { form, onUpdateSubmit, baseInfo } = this.props
        const { validateFieldsAndScroll } = form
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }

            const data = {
                ...baseInfo,
                ...values
            }

            onUpdateSubmit(data)
        })
    }

    render() {
        const { form, updateLoading, companyTypes, baseInfo, auditInfo } = this.props
        const { getFieldDecorator } = form
        const { imgStyle, imgSrc, uploadLoading } = this.state

        const options = companyTypes && companyTypes.map(element => {
            return <Option value={element.id} key={element.id}>{element.name}</Option>
        })

        const uploadProps = {
            action: '/service/sso-service/sso/enterprise/upload',   //上传接口请求的地址
            headers: {
                "Auth-token": store.get('Token')
            }
        }

        return (
            <Form>
                <Row className={styles.rightRow}>
                    <a href="#" onClick={this.handleBackClick} ><Icon type="left" style={{ marginRight: '5px' }} />返回</a>
                </Row>
                <Descriptions title="企业基本信息" className={styles.dep} bordered>
                    <Descriptions.Item label="企业名称" className={styles.depForm}>
                        <FormItem {...formItemLayout}>
                            {getFieldDecorator('companyName', {
                                initialValue: baseInfo && baseInfo.companyName,
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入企业名称'
                                    },
                                    {
                                        validator: this.handleCheckCompanyName
                                    }
                                ],
                                validateTrigger: 'onBlur'
                            })(
                                <Input autoComplete="off" placeholder="请输入企业名称" />
                            )}
                        </FormItem>
                    </Descriptions.Item>
                    <Descriptions.Item label="法定代表人" className={styles.depForm}>
                        <FormItem {...formItemLayout}>
                            {getFieldDecorator('legalName', {
                                initialValue: baseInfo && baseInfo.legalName,
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入企业法人'
                                    }
                                ],
                            })(
                                <Input autoComplete="off" placeholder="请输入企业法人" />
                            )}
                        </FormItem>
                    </Descriptions.Item>
                    <Descriptions.Item label="统一社会信用代码" className={styles.depForm}>
                        <FormItem {...formItemLayout}>
                            {getFieldDecorator('certificateCode', {
                                initialValue: baseInfo && baseInfo.certificateCode,
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入你所属企业的统一社会信用代码'
                                    },
                                    {
                                        validator: this.handleCheckCertificateCode
                                    }
                                ],
                                validateTrigger: 'onBlur'
                            })(
                                <Input autoComplete="off" placeholder="请输入你所属企业的统一社会信用代码" />
                            )}
                        </FormItem>
                    </Descriptions.Item>
                    <Descriptions.Item label="企业简称" className={styles.depForm}>
                        <FormItem {...formItemLayout}>
                            {getFieldDecorator('companyAbbrevication', {
                                initialValue: baseInfo && baseInfo.companyAbbrevication,
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入企业简称'
                                    }
                                ],
                            })(
                                <Input autoComplete="off" placeholder="请输入企业简称" />
                            )}
                        </FormItem>
                    </Descriptions.Item>
                    <Descriptions.Item label="注册地址" span={2} className={styles.depForm}>
                        <FormItem {...formItemLayout}>
                            {getFieldDecorator('registeredAddress', {
                                initialValue: baseInfo && baseInfo.registeredAddress,
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入企业注册地址'
                                    }
                                ],
                            })(
                                <Input autoComplete="off" placeholder="请输入企业注册地址" />
                            )}
                        </FormItem>
                    </Descriptions.Item>
                    <Descriptions.Item label="申请企业类型" className={styles.depForm}>
                        <FormItem {...formItemLayout}>
                            {getFieldDecorator('roleId', {
                                initialValue: baseInfo && baseInfo.roleId,
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择企业类型'
                                    }
                                ],
                            })(
                                <Select
                                    placeholder="请选择企业类型"
                                    notFoundContent={null}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {options}
                                </Select>
                            )}
                        </FormItem>
                    </Descriptions.Item>
                    <Descriptions.Item label="申请时间" span={2}>{baseInfo && baseInfo.createdAt}</Descriptions.Item>
                    <Descriptions.Item label="企业描述" span={3} className={styles.depForm}>
                        <FormItem {...formItemLayout}>
                            {getFieldDecorator('description', {
                                initialValue: baseInfo && baseInfo.description,
                            })(
                                <Input.TextArea
                                    autoSize={{ minRows: 2, maxRows: 6 }}
                                />
                            )}
                        </FormItem>
                    </Descriptions.Item>
                    <Descriptions.Item label="营业执照" span={3}>
                        <Upload
                            {...uploadProps}
                            listType="picture-card"
                            showUploadList={false}
                            className={styles.upload}
                            beforeUpload={this.beforeUpload}
                            onChange={this.handleChange}
                        >
                            <img className={styles.img2} src={imgSrc ? imgSrc : baseInfo && baseInfo.licenseUrl} />
                        </Upload>
                    </Descriptions.Item>
                </Descriptions>
                <label style={{ color: 'red' }}>* 请修改后重新提交</label>
                <Row className={styles.centerRow}>
                    <Button type="primary" loading={updateLoading} onClick={this.handleReSubmit} >重新申请</Button>
                </Row>
            </Form>
        )
    }
}

BaseInfoForm.propTypes = {
    form: PropTypes.object,
    companyTypes: PropTypes.array,
    onSubmit: PropTypes.func,
}

export default BaseInfoForm
