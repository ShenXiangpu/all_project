import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Button, Icon } from 'antd'
import { isEqual } from 'lodash-es';
import styles from './modal.less'
import { Encrypt } from 'utils/secret.js'

const FormItem = Form.Item

@Form.create()
class BindingPhoneModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      deadline: 60,
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
    // clearInterval(this.timer)

    const { onOk, form } = this.props
    const { validateFields } = form

    validateFields((errors, values) => {
      if (errors) {
        return
      }

      const data = {
        ...values,
        password: Encrypt(values.password)
      }

      onOk(data)
      // this.setState({ deadline: 60 })
      // this.timeLimit(60)
    })
  }

  // 发送验证码到当前手机号
  handleSendCode = () => {
    const { onSendCode, form: { getFieldValue } } = this.props;
    const phone = getFieldValue('phone');
    if (phone) {
      // 获取验证码
      onSendCode(phone).then(res => {
        this.setState({ deadline: 60 })

        if (res) {
          //倒计时
          this.timeLimit(60)
        } else {
          clearInterval(this.timer);
        }
      })
    }
  }

  handleCancel = () => {
    const { onCloseModal } = this.props;
    this.setState({ deadline: 60 });
    clearInterval(this.timer);
    onCloseModal();
  }

  render() {
    const { onOk, form, phoneStar, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const { deadline } = this.state

    return (
      <Modal
        {...modalProps}
        className={styles.modal}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form>
          <FormItem>
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                  message: "请输入手机号码"
                },
                {
                  pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                  message: '手机号格式不正确',
                },
              ],
            })(
              <Input
                placeholder="请输入手机号码"
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
                  onSearch={this.handleSendCode}
                />
            )}
          </FormItem>
        </Form>
      </Modal >
    )
  }
}

export default BindingPhoneModal
