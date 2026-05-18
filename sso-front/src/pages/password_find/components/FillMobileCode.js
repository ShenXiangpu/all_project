import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, Icon } from 'antd'
import Link from 'umi/link';
import styles from './fillMobileCode.less'

const FormItem = Form.Item

const formItemLayout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
}

@Form.create()
class FillMobileCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deadline: -1
        }
        this.timer = null;
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    handleCodeClick = (e) => {
        e.preventDefault();
        //发送手机验证码
        const { currentMobile, onSendCode } = this.props
        const data = {
            phone: currentMobile
        }
        onSendCode(data)

        //倒计时
        this.setState({ deadline: 60 })
        this.timeLimit(60)


    }

    timeLimit = (count) => {
        const that = this
        this.timer = setInterval(function () {
            if (count >= 0) {
                count -= 1;
                that.setState({ deadline: count });
            }
        }, 1000)
    }


    handleOk = (e) => {
        e.preventDefault();

        const { form, currentMobile, onNext } = this.props
        const { validateFieldsAndScroll, setFields } = form
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }

            const data = {
                // phone: currentMobile,
                code: values.code
            }

            onNext(data)
        })
    }

    render() {
        const { form, loading, errorMessage, currentMobile } = this.props
        const { getFieldDecorator } = form
        const { deadline } = this.state

        return (
            <div className={styles.content}>
                <Form layout="horizontal" className={styles.form}>
                    <FormItem label='手机号' {...formItemLayout}>
                        <label>{currentMobile}</label>
                    </FormItem>
                    <FormItem
                        label='验证码'
                        {...formItemLayout}
                        className={deadline >= 0 ? '' : styles.hiddenExtra}
                        extra={<p className={styles.tip}><Icon type="check-circle" theme="filled" style={{ color: '#6bc827' }} /><label>校验码已发送到你的手机，15分钟内输入有效，请勿泄漏</label></p>}
                    >
                        {getFieldDecorator('code', {
                            rules: [{
                                required: true,
                                message: '请输入验证码'
                            }]
                        })(
                            <Input autoComplete="off" style={{ width: '120px' }} placeholder="请输入验证码" />
                        )}
                        {deadline >= 0 ?
                            <Button className={styles.codeBtn} disabled>重发验证码({deadline}s)</Button> :
                            <Button className={styles.codeBtn} onClick={this.handleCodeClick}>获取短信校验码</Button>
                        }
                    </FormItem>
                </Form>

                <Row style={{ textAlign: 'center' }}>
                    <Button
                        type="primary"
                        className={styles.btn}
                        onClick={this.handleOk}
                        loading={loading.effects.sendValidate}
                    >
                        确定
                        </Button>
                </Row>
                {errorMessage &&
                    <Row style={{ textAlign: 'center' }}>
                        <p className={styles.error}><Icon type="close-circle" theme="filled" /><label>{errorMessage}</label></p>
                    </Row>}
            </div>
        )
    }
}

FillMobileCode.propTypes = {
    form: PropTypes.object,
    filter: PropTypes.object,
    // onFilterChange: PropTypes.func,
}

export default FillMobileCode
