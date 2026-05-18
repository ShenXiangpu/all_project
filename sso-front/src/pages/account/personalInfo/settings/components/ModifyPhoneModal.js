import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Button, Icon } from 'antd'
import { isEqual } from 'lodash-es';
import styles from './modal.less'

const FormItem = Form.Item

@Form.create()
class ModifyPhoneModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      deadline: 60,
      step: 0
    }
    this.timer = null;
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

    const { onOk, form } = this.props
    const { validateFields } = form

    validateFields((errors, values) => {
      if (errors) {
        return
      }

      onOk(values)
    })
  }

  // 发送验证码到当前手机号
  handleSendCode = () => {
    const { onSendCode } = this.props;
    // 获取验证码
    onSendCode();

    //倒计时
    this.setState({ deadline: 60 })
    this.timeLimit(60)
  }

  // 新手机换绑，发送验证码
  handleSendNewCode = () => {
    const { onSendNewPhoneCode, form: { getFieldValue } } = this.props;
    const phone = getFieldValue('phone');
    if (phone) {
      // 获取验证码
      onSendNewPhoneCode(phone);

      //倒计时
      this.timeLimit(60)
    }
  }

  handleNext = e => {
    e.preventDefault();
    clearInterval(this.timer)

    const { form, onVerifyPhone } = this.props
    const { validateFields } = form

    validateFields((errors, values) => {
      if (errors) {
        return
      }

      // 验证手机号和当前token用户是否一致
      const data = {
        smsCode: values.code
      }
      onVerifyPhone(data).then(res => {
        if (res) { // 验证码正确
          // 下一步：新手机绑定
          this.setState({
            step: 1,
            deadline: 60
          })
          clearInterval(this.timer);
        }
      })

    })
  }

  handleCancel = () => {
    const { onCloseModal } = this.props;
    onCloseModal();
    this.setState({ step: 0 });
    clearInterval(this.timer);
  }

  render() {
    const { onOk, form, phoneStar, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const { deadline, step } = this.state

    return (
      <Modal
        {...modalProps}
        className={styles.modal}
        title={isEqual(step, 0) ? '手机换绑' : '新手机绑定'}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          isEqual(step, 0) ?
            <Button key="next" type="primary" onClick={this.handleNext}>下一步</Button>
            :
            <Button key="submit" type="primary" onClick={this.handleOk}>确认</Button>
        ]}
      >
        <p>原手机号 {phoneStar}</p>
        <Form layout="horizontal">

          {isEqual(step, 0) ?
            <FormItem>
              {getFieldDecorator('code', {
                rules: [
                  {
                    required: true,
                    message: "请输入短信验证码"
                  },
                ],
              })(
                !isEqual(deadline, 60) && deadline >= 0 ?
                  <Input
                    suffix={`${deadline}s后重新发送`}
                  />
                  :
                  <Input.Search
                    placeholder="验证码"
                    enterButton='获取验证码'
                    onSearch={this.handleSendCode}
                  />
              )}
            </FormItem>
            :
            <>
              <FormItem>
                {getFieldDecorator('phone', {
                  rules: [
                    {
                      required: true,
                      message: "请输入新的手机号码"
                    },
                    {
                      pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                      message: '手机号格式不正确',
                    },
                  ],
                })(
                  <Input
                    placeholder="请输入新的手机号码"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('smsCode', {
                  rules: [
                    {
                      required: true,
                      message: "请输入短信验证码"
                    },
                  ],
                })(
                  !isEqual(deadline, 60) && deadline >= 0 ?
                    <Input
                      suffix={`${deadline}s后重新发送`}
                    />
                    :
                    <Input.Search
                      placeholder="验证码"
                      enterButton='获取验证码'
                      onSearch={this.handleSendNewCode}
                    />
                )}
              </FormItem>
            </>
          }
        </Form>
      </Modal >
    )
  }
}

export default ModifyPhoneModal
