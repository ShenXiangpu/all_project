import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Button, Icon } from 'antd'
import styles from "./verifyModal.less"

const FormItem = Form.Item

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
}


@Form.create()
class VerifyModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            deadline: 60
        }
        this.timer = null;
    }

    componentDidUpdate(preProps) {
        const { visible, errorMessage } = this.props
        if (visible && visible !== preProps.visible) {
            const { deadline } = this.state
            this.timeLimit(deadline)
        }

        if (!visible && visible !== preProps.visible) {
            clearInterval(this.timer)
        }

        if (errorMessage && errorMessage !== preProps.errorMessage) {
            // clearInterval(this.timer)
            // this.setState({ deadline: -1 })

            const { deadline } = this.state
            this.timeLimit(deadline)
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer)
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
        clearInterval(this.timer)

        const { currentMobile, onOk, form } = this.props
        const { validateFields } = form

        validateFields((errors, values) => {
            if (errors) {
                return
            }

            const data = {
                phone: currentMobile,
                code: values.mobileCode
            }
            onOk(data)
        })
    }

    handleClick = () => {
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

    render() {
        const { onOk, form, errorMessage, currentMobile, ...modalProps } = this.props
        const { getFieldDecorator } = form
        const { deadline } = this.state



        return (
            <Modal {...modalProps} onOk={this.handleOk}
                footer={[<Button key="submit" type="primary" onClick={this.handleOk}>确认</Button>]}
                className={styles.modal}
                style={{ top: '190px' }}
            >
                <p className={styles.tip}><Icon type="info-circle" theme="filled" /><label>校验码已发送到你的手机，15分钟内输入有效，请勿泄漏</label></p>

                <Form layout="horizontal">
                    <FormItem label='手机号' {...formItemLayout}>
                        <label>{currentMobile}</label>
                    </FormItem>
                    <FormItem
                        label='验证码'
                        {...formItemLayout}
                        extra={!errorMessage ? <p className={styles.tip}><Icon type="check-circle" theme="filled" style={{ color: '#6bc827' }} /><label>校验码已发送至你的手机，请查收</label></p>
                            : <p className={styles.tip}><Icon type="close-circle" theme="filled" style={{ color: '#f5222d' }} /><label style={{ color: '#f5222d' }}>{errorMessage}</label></p>}
                    >
                        {getFieldDecorator('mobileCode', {
                            rules: [{
                                required: true,
                                message: '请输入验证码'
                            }],
                        })(
                            <Input autoComplete="off" style={{ width: '100px' }} />
                        )}
                        {deadline >= 0 ?
                            <Button className={styles.btn} disabled>重发验证码({deadline}s)</Button> :
                            <Button className={styles.btn} onClick={this.handleClick}>免费获取验证码</Button>
                        }
                    </FormItem>
                </Form>
            </Modal >
        )
    }
}

VerifyModal.propTypes = {
    currentMobile: PropTypes.string,
    onOk: PropTypes.func,
}

export default VerifyModal
