import React, { PureComponent } from 'react'
import { Form, Modal, Input } from 'antd'
import { isEmpty, isEqual } from 'lodash';
import classNames from 'classnames';
import moment from 'moment'
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
}



@Form.create()
class UserInfoModal extends PureComponent {
    state = {

    }




    handleOk = (e) => {
        e.preventDefault();

        const {  onOk, form } = this.props
        const { validateFields, getFieldValue } = form

        validateFields(errors => {
            if (errors) {
                return
            }
            const data = {
                name: getFieldValue('name'),
                phone: getFieldValue('phone'),
                remarks: getFieldValue('remarks') || null,
            }
            console.log(data,'data');
            onOk(data)
        })
    }

    render() {
        const { onOk, form, ...modalProps } = this.props
        const { getFieldDecorator } = form
        return (
            <Modal
                {...modalProps}
                onOk={this.handleOk}
            >
                <Form>
                    <Form.Item label="姓名"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('name', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '请输入业务员名称'
                                },
                            ],
                        })(
                            <Input placeholder='请输入业务员名称' />
                        )}
                    </Form.Item>
                    <Form.Item label="手机号"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('phone', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '请输入手机号'
                                },
                            ],
                        })(
                            <Input placeholder='请输入手机号' />
                        )}
                    </Form.Item>
                    <Form.Item label="备注"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('remarks', {
                            initialValue: '',
                            rules: [
                                {
                                    required: false,
                                    message: '备注信息'
                                },
                            ],
                        })(
                            <Input.TextArea placeholder='请输入姓名' />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}



export default UserInfoModal
