import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Input } from 'antd'
import styles from './fillMobileCode.less'
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

const formItemLayout2 = {
  labelCol: {
    xs: { span: 18 },
    sm: { span: 9 },
  },
  wrapperCol: {
    xs: { span: 30 },
    sm: { span: 15 },
  },
};

@Form.create()
class ResetPassword extends Component {

  handleOk = (e) => {
    e.preventDefault();

    const { form, currentMobile, onNext } = this.props
    const { validateFieldsAndScroll, setFields } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }

      const data = {
        phone: currentMobile,
        newPassword: Encrypt(values.password)
      }

      onNext(data)
    })
  }

  render() {
    const { form, loading, currentMobile } = this.props
    const { getFieldDecorator } = form

    return (
      <div className={styles.content}>
        <Form className={styles.form} >
          <FormItem label='手机号' {...formItemLayout}>
            <label>{currentMobile}</label>
          </FormItem>
          <Form.Item label="新的登录密码" {...formItemLayout}
            extra={<p style={{ width: '400px', margin: '0' }}>密码需8到30位，至少包括三项（英文、数字和特殊字符）</p>}
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true,
                message: '请重新设置你的登录密码'
              },
              {
                pattern: /^(?=.*\d)(?=.*[a-z[A-Z])(?=.*[()[\]`~!@#$%^&*-+=_|{}:;'<>,.?/]).{8,30}$/,
                message: '请按规则重新设置密码'
              }],
              validateTrigger: 'onBlur'
            })(
              <Input type="password" placeholder="请重新设置你的登录密码" />,
            )}
          </Form.Item>
          <Form.Item label="确认新密码" {...formItemLayout}>
            {getFieldDecorator('repeat_password', {
              validateTrigger: 'onBlur',
              rules: [{
                required: true,
                message: '请再次输入你的登录密码'
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
              <Input type="password" placeholder="请再次输入你的登录密码" />,
            )}
          </Form.Item>
          <Row style={{ textAlign: 'center' }}>
            <Button
              type="primary"
              className={styles.btn}
              onClick={this.handleOk}
            // loading={loading.effects.sendValidate}
            >
              确定
            </Button>
          </Row>
        </Form>
      </div>
    )
  }
}

ResetPassword.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  // onFilterChange: PropTypes.func,
}

export default ResetPassword
