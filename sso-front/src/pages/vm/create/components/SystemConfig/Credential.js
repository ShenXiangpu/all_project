import React, { PureComponent } from 'react'
import { Form, Icon, Input } from 'antd';
import styles from './index.less';

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 22,
  },
}

class Credential extends PureComponent {
  render() {
    const { form: { getFieldDecorator }, rootPwd } = this.props;

    const tips = "Linux机器密码需8到30位，不支持“/”置于密码首位，至少包括三项（[a-z],[A-Z],[0-9]和[()`~!@#%^&*-+=_|{}[]:;' <>,.?/]的特殊符号）";
    const pwdTips = "请牢记您所设置的密码，如遗忘可登录VM控制台重置密码。";

    return (
      <Form
        labelAlign="left"
        colon={false}
        className={styles.form}
        hideRequiredMark
      >
        <FormItem label='登录名' {...formItemLayout}>
          root
        </FormItem>

        <FormItem
          label='登录密码'
          {...formItemLayout}
          help={tips}
          required
        >
          {getFieldDecorator('rootPwd', {
            initialValue: rootPwd || '',
            rules: [
              {
                required: true,
                message: '请输入登录密码'
              },
              {
                pattern: /^(?!.*\$)(?!\/)(?!.*\s)(?!.*\\)(?=.*\d)(?=.*[a-z[A-Z])(?=.*[()[\]`~!@#%^&*-+=_|{}:;'<>,.?/]).{8,30}$/,
                message: '请按规则重新设置密码'
              }
            ],
          })(<Input.Password placeholder="请输入登录密码" autoComplete='off' style={{ width: '400px' }} />)}
        </FormItem>

        <FormItem
          label='确认密码'
          {...formItemLayout}
          extra={pwdTips}
        >
          {getFieldDecorator('confirmPwd', {
            initialValue: rootPwd || '',
            rules: [
              {
                required: true,
                message: '请再次输入以确认登录密码'
              },
              {
                validator: (rule, value, callback) => {
                  const { getFieldValue } = this.props.form
                  if (value && value !== getFieldValue('rootPwd')) {
                    callback('您输入的密码不一致，请再次输入')
                  }
                  // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
                  callback();
                }
              }
            ],
          })(<Input.Password style={{ width: '400px' }} autoComplete='off' />)}
        </FormItem>

      </Form >
    )
  }
}
export default Credential
