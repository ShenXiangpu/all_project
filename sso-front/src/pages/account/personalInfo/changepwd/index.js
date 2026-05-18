import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva';
import Page from 'components/Page/Page'
import { Form, Input, Button, message, Modal } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import { Encrypt } from 'utils/secret.js'

@connect(({ login, loading }) => ({ login, loading }))
@Form.create()
class ChangePassword extends PureComponent {

  handleCheckPassword = (rule, value, callback) => {
    const { dispatch } = this.props
    if (value) {
      dispatch({
        type: 'app/checkPassword',
        payload: { pwd: value },
        callback: (response) => {
          if (!response.flag) {
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

  @Debounce(1000)
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form: { validateFields, setFields } } = this.props
    validateFields((error, values) => {
      if (error) {
        return;
      }

      dispatch({
        type: 'app/updatePassword',
        payload: {
          oldPassword: Encrypt(values.oldPassword),
          newPassword: Encrypt(values.newPassword)
        },
        callback: response => {
          if (response && response.flag) {
            //密码修改成功后跳转登录页
            this.successModal()
          } else {
            setFields({
              'oldPassword': {
                value: values.oldPassword,
                errors: [new Error('当前密码输入错误')]
              }
            })
          }
        }
      })
    });
  };

  successModal = () => {
    let secondsToGo = 5;
    let timer, timer2;
    const modal = Modal.success({
      title: '密码修改成功',
      content: `将在 ${secondsToGo} 秒后跳转登录页，请重新登录`,
      okText: '知道了',
      onOk: () => {
        clearInterval(timer);
        modal.destroy();

        clearTimeout(timer2);  //停止, 清除Timeout

        this.props.dispatch({
          type: 'app/signOut'
        })
      }
    });

    timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `将在 ${secondsToGo} 秒后跳转登录页，请重新登录`,
      });
    }, 1000);

    timer2 = setTimeout(() => {
      clearInterval(timer);
      modal.destroy();

      this.props.dispatch({
        type: 'app/signOut'
      })
    }, secondsToGo * 1000);
  }

  render() {
    const { form: { getFieldDecorator }, loading } = this.props;
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

    return (
      <Page inner>
        <div style={{ width: 400 }}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="当前密码" >
              {getFieldDecorator('oldPassword', {
                rules: [{
                  required: true,
                  message: '请输入当前的密码'
                }, {
                  // validator: this.handleCheckPassword
                }],
                // validateTrigger: 'onBlur'
              })(
                <Input type="password" placeholder="请输入当前的密码" />,
              )}
            </Form.Item>
            <Form.Item label="新密码"
              extra={<p style={{ width: '400px', margin: '0' }}>密码需8到30位，至少包括三项（英文、数字和特殊字符）</p>}
            >
              {getFieldDecorator('newPassword', {
                rules: [{
                  required: true,
                  message: '请输入新密码'
                },
                {
                  pattern: /^(?=.*\d)(?=.*[a-z[A-Z])(?=.*[()[\]`~!@#$%^&*-+=_|{}:;'<>,.?/]).{8,30}$/,
                  message: '请按规则重新设置密码'
                }],
                validateTrigger: 'onBlur'
              })(
                <Input type="password" placeholder="请输入新密码" />,
              )}
            </Form.Item>
            <Form.Item label="确认密码" >
              {getFieldDecorator('repeat_newPassword', {
                validateTrigger: 'onBlur',
                rules: [{
                  required: true,
                  message: '请再次输入以确认新密码'
                },
                {
                  validator: (rule, value, callback) => {
                    const { getFieldValue } = this.props.form
                    if (value && value !== getFieldValue('newPassword')) {
                      callback('您输入的密码不一致，请再次输入')
                    }
                    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
                    callback();
                  }
                }],
              })(
                <Input type="password" placeholder="请再次输入以确认新密码" />,
              )}
            </Form.Item>
            <p style={{ textAlign: "center" }}>
              <Button type="primary" htmlType="submit" loading={loading.effects['login/updatePassword']}>
                确定
                            </Button>
            </p>
          </Form>
        </div>
      </Page>
    )
  }
}

ChangePassword.propTypes = {
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default ChangePassword
