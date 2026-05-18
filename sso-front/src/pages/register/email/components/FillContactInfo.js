import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Input } from 'antd'
import styles from './fillEmail.less'
import { Encrypt } from 'utils/secret.js'

const FormItem = Form.Item

const formItemLayout = {
    labelCol: {
        xs: { span: 16 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

@Form.create()
class FillContactInfo extends Component {

    //校验手机号是否已注册
    handleCheckPhone = (rule, value, callback) => {
        const { dispatch } = this.props
        if (value) {
            dispatch({
                type: 'email/checkMobile',
                payload: { phone: value },
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

    handleOk = (e) => {
        e.preventDefault();

        const { currentEmail, form, onNext } = this.props
        const { validateFieldsAndScroll } = form
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }

            values.password = Encrypt(values.password);

            const data = {
                email: currentEmail,
                ...values
            }

            onNext(data)
        })
    }

    render() {
        const { form, loading, currentEmail } = this.props
        const { getFieldDecorator } = form

        return (
            <div className={styles.content}>
                <Form className={styles.form}>
                    <FormItem label='登录名' {...formItemLayout}>
                        <label className={styles.boldField}>{currentEmail}</label>
                    </FormItem>
                    <FormItem label='用户名' {...formItemLayout}>
                        {getFieldDecorator('userName', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入你的用户名'
                                }
                            ],
                        })(
                            <Input autoComplete="off" placeholder="用户名一旦设置成功，无法修改" />
                        )}
                    </FormItem>
                    <FormItem label='昵称' {...formItemLayout}>
                        {getFieldDecorator('nickName', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入你的昵称'
                                }
                            ],
                        })(
                            <Input autoComplete="off" placeholder="设置你的昵称" />
                        )}
                    </FormItem>
                    <FormItem label='手机号' {...formItemLayout}>
                        {getFieldDecorator('phone', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入你的手机号码'
                                },
                                {
                                    pattern: /^1[3456789]\d{9}$/,
                                    message: "手机号码格式不正确，请重新输入"
                                },
                                {
                                    validator: this.handleCheckPhone
                                }
                            ],
                            validateTrigger: 'onBlur'
                        })(
                            <Input autoComplete="off" placeholder="输入你的手机号" />
                        )}
                    </FormItem>
                    <Form.Item label="登录密码" {...formItemLayout}
                        extra={<p style={{ width: '400px', margin: '0' }}>密码需8到30位，至少包括三项（英文、数字和特殊字符）</p>}
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true,
                                message: '请设置你的登录密码'
                            },
                            {
                                pattern: /^(?=.*\d)(?=.*[a-z[A-Z])(?=.*[()[\]`~!@#$%^&*-+=_|{}:;'<>,.?/]).{8,30}$/,
                                message: '请按规则重新设置密码'
                            }],
                            validateTrigger: 'onBlur'
                        })(
                            <Input type="password" placeholder="设置你的登录密码" />,
                        )}
                    </Form.Item>
                    <Form.Item label="确认密码" {...formItemLayout}>
                        {getFieldDecorator('repeat_password', {
                            validateTrigger: 'onBlur',
                            rules: [{
                                required: true,
                                message: '请再次输入你的密码'
                            },
                            {
                                validator: (rule, value, callback) => {
                                    const { getFieldValue } = this.props.form
                                    if (value && value !== getFieldValue('password')) {
                                        callback('两次密码输入不一致')
                                    }
                                    callback();
                                }
                            }],
                        })(
                            <Input type="password" placeholder="请再次输入你的密码" />,
                        )}
                    </Form.Item>
                    <Row style={{ textAlign: 'center' }}>
                        <Button
                            type="primary"
                            className={styles.btn}
                            onClick={this.handleOk}
                        >
                            下一步
                        </Button>
                    </Row>
                </Form>
            </div>
        )
    }
}

FillContactInfo.propTypes = {
    form: PropTypes.object,
    filter: PropTypes.object,
    // onFilterChange: PropTypes.func,
}

export default FillContactInfo
