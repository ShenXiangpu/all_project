import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, Icon } from 'antd'
import styles from './fillAccount.less'

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

const formItemLayout2 = {
    labelCol: {
        xs: { span: 18 },
        sm: { span: 9 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

@Form.create()
class FillAccount extends Component {
    componentDidMount() {
        this.verifyImage.src = '/service/sso-service/sso/captcha/getVerify?' + Math.random();
    }

    changeVerifyCode = () => {
        this.verifyImage.src = '/service/sso-service/sso/captcha/getVerify?' + Math.random();  //需要添加随机数，否则新旧图片的地址是一样的，浏览器会默认从缓存中读取数据
    }

    handleOk = (e) => {
        e.preventDefault();

        const { form, onNext } = this.props
        const { validateFieldsAndScroll, setFields } = form
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }

            if (values.vertification && values.vertification.length === 4) {
                //校验图片验证码成功之后，进行身份验证操作
                onNext(values)
            }
        })

        this.verifyImage.src = '/service/sso-service/sso/captcha/getVerify?' + Math.random();
    }

    render() {
        const { form, loading, errorMessage } = this.props
        const { getFieldDecorator } = form

        return (
            <div className={styles.content}>
                <Form className={styles.form}>
                    <FormItem label='登录名' {...formItemLayout}>
                        {getFieldDecorator('loginName', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入你的用户名'
                                },
                            ]
                        })(
                            <Input autoComplete="off" placeholder="手机号/邮箱" />
                        )}
                    </FormItem>
                    <Row gutter={24}>
                        <Col span={16} style={{ paddingRight: 0 }}>
                            <FormItem label='验证码' {...formItemLayout2}>
                                {getFieldDecorator('vertification', {
                                    rules: [{
                                        required: true,
                                        message: '请输入验证码'
                                    },
                                    {
                                        pattern: /^\d{4}$/,
                                        message: '请输入正确的验证码'
                                    }],
                                    validateTrigger: 'onBlur'
                                })(
                                    <Input autoComplete="off" placeholder="请输入验证码"/>
                                )}

                            </FormItem>
                        </Col>

                        {/* 后端验证码 */}
                        <Col span={4} style={{ height: '42px', lineHeight: '42px', paddingLeft: 0, paddingRight: 0 }}>
                            <img alt="验证码" style={{ cursor: 'pointer' }} src='/service/sso-service/sso/captcha/getVerify' ref={el => this.verifyImage = el} onClick={this.changeVerifyCode} />
                        </Col>
                        <Col span={4} style={{ height: '42px', lineHeight: '42px', paddingLeft: 0, paddingRight: 0 }}>
                            <a className={styles.aLink} href="#" onClick={this.changeVerifyCode}>换一张</a>
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'center' }}>
                        <Button
                            type="primary"
                            className={styles.btn}
                            onClick={this.handleOk}
                            loading={loading.effects.sendAccount}
                        >
                            确定
                        </Button>
                    </Row>
                    {errorMessage &&
                        <Row style={{ textAlign: 'center' }}>
                            <p className={styles.error}><Icon type="close-circle" theme="filled" /><label>{errorMessage}</label></p>
                        </Row>}
                </Form>
            </div>
        )
    }
}

FillAccount.propTypes = {
    form: PropTypes.object,
}

export default FillAccount
