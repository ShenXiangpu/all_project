import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Input } from 'antd'
import styles from './fillMobile.less'
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
class FillDetailInfo extends Component {

    //校验邮箱是否已存在
    handleCheckEmail = (rule, value, callback) => {
        const { item = {}, dispatch } = this.props
        if (value && value !== item.email) {
            dispatch({
                type: 'app/checkEmail',
                payload: { email: value },
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

        const { form, currentMobile, onNext } = this.props
        const { validateFieldsAndScroll } = form
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }

            values.password = Encrypt(values.password);

            const data = {
                phone: currentMobile,
                ...values
            }

            onNext(data)
        })
    }

    render() {
        const { form, currentMobile } = this.props
        const { getFieldDecorator } = form

        return (
            <div className={styles.content}>
                <Form className={styles.form}>
                    <FormItem label='手机号' {...formItemLayout}>
                        <label>{currentMobile}</label>
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
                    <FormItem label='邮箱' {...formItemLayout}>
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入邮箱',
                                },
                                {
                                    pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                                    message: '邮箱格式不正确',
                                },
                                {
                                    validator: this.handleCheckEmail
                                }
                            ],
                            validateTrigger: 'onBlur'
                        })(
                            <Input autoComplete="off" placeholder="输入你的邮箱" />
                        )}
                    </FormItem>
                    <Form.Item label="登录密码" {...formItemLayout}
                        extra={<p style={{width:'400px', margin:'0'}}>密码需8到30位，至少包括三项（英文、数字和特殊字符）</p>}
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
                        // loading={loading.effects.sendValidate}
                        >
                            提交
                        </Button>
                    </Row>
                </Form>
            </div>
        )
    }
}

FillDetailInfo.propTypes = {
    form: PropTypes.object,
    filter: PropTypes.object,
    // onFilterChange: PropTypes.func,
}

export default FillDetailInfo
