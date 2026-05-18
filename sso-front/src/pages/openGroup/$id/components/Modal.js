import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Modal, Alert } from 'antd'
import { Encrypt } from 'utils/secret.js'
import { isEmpty, isEqual } from 'lodash-es'

const { Option } = Select
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
class UserModal extends PureComponent {
  state = {
    isExist: false,   // 用户是否已存在
  }

  //校验手机号或邮箱是否已存在，如果存在，自动填充用户名、邮箱号
  handleCheck = (rule, value, callback, type) => {
    const { item = {}, dispatch, form } = this.props;
    const { setFieldsValue } = form;
    const itemValue = isEqual(type, 'phone') ? item.phone : item.email;

    if (value && value !== itemValue) {
      dispatch({
        type: 'openGroup/getUserInfoByParam',
        payload: { param: value },
        callback: (response) => {
          if (response && response.flag) {
            const resData = response.resData;
            if (isEqual(type, 'phone')) {
              setFieldsValue({
                email: resData.email,
                userName: resData.userName,
              });
            } else {
              setFieldsValue({
                phone: resData.phone,
                userName: resData.userName,
              });
            }

            this.setState({ isExist: true });
          } else {
            if (isEqual(type, 'phone')) {
              // setFieldsValue({
              //   email: '',
              //   userName: '',
              // });
            } else {
              // setFieldsValue({
              //   phone: '',
              //   userName: '',
              // });
            }
            this.setState({ isExist: false });
          }
          callback()
        }
      })
    } else {
      this.setState({ isExist: false });
      // Note: 必须总是返回一个 callback
      callback()
    }
  }

  handleOk = (e) => {
    e.preventDefault();
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue, getFieldValue } = form;
    const { isExist } = this.state;

    validateFields(errors => {
      if (!isExist && errors) {
        return
      }

      const data = {
        ...getFieldsValue(),
        id: item.id,
      }

      const password = getFieldValue('password');
      if (!isExist) {
        if (isEmpty(password)) {
          data.password = Encrypt('123456abc!');
        } else {
          data.password = Encrypt(password);
        }
      }

      this.setState({ isExist: false });
      onOk(data)
    })
  }

  handleClose = e => {
    e.preventDefault();
    const { onCancel } = this.props
    this.setState({ isExist: false });
    onCancel();
  }

  onClose = e => {
    this.setState({ isExist: false });
    const { form } = this.props;
    form.resetFields();
  };

  render() {
    const { item = {}, onOk, form, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const { isExist } = this.state;

    return (
      <Modal {...modalProps} onOk={this.handleOk} onCancel={this.handleClose}>
        {isExist &&
          <Alert
            type="warning"
            message="用户已注册是否添加？"
            closeText="不添加"
            style={{ marginBottom: '20px' }}
            closable
            onClose={this.onClose}
          />
        }

        <Form layout="horizontal">
          <FormItem label='手机号' {...formItemLayout}>
            {getFieldDecorator('phone', {
              initialValue: item.phone,
              rules: [
                {
                  required: true,
                  message: '请输入手机号'
                },
                {
                  pattern: /^1[3456789]\d{9}$/,
                  message: "手机号码格式不正确，请重新输入"
                },
                {
                  validator: (rule, value, callback) => this.handleCheck(rule, value, callback, 'phone')
                }
              ],
              validateTrigger: 'onBlur'
            })(
              <Input placeholder="请输入手机号" disabled={isExist} />
            )}
          </FormItem>
          <FormItem label='邮箱' {...formItemLayout}>
            {getFieldDecorator('email', {
              initialValue: item.email,
              rules: [
                {
                  required: true,
                  message: '请输入用户邮箱',
                },
                {
                  pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                  message: '邮箱格式不正确',
                },
                {
                  validator: this.handleCheck
                }
              ],
              validateTrigger: 'onBlur'
            })(
              <Input placeholder="请输入用户邮箱" disabled={isExist} />
            )}
          </FormItem>
          <FormItem label='用户姓名' {...formItemLayout}>
            {getFieldDecorator('userName', {
              initialValue: item.userName,
              rules: [
                {
                  required: true,
                  message: '请输入用户姓名'
                },
                {
                  pattern: /^\w*[a-zA-Z\u4E00-\u9FA5]+\w*$/,
                  // pattern: /^(?!\d*$)/,
                  message: '用户名可包含英文、数字、汉字或下划线，不能为纯数字',
                },
              ],
            })(
              <Input placeholder="请输入用户姓名" disabled={isExist} />
            )}
          </FormItem>
          {/* <FormItem label='昵称' {...formItemLayout}>
            {getFieldDecorator('nickName', {
              initialValue: item.nickName,
            })(
              <Input placeholder="请输入昵称" />
            )}
          </FormItem> */}

          <FormItem label='初始密码' {...formItemLayout}
            extra="默认密码：123456abc!"
          >
            {getFieldDecorator('password', {
              initialValue: item.password,
              rules: [
                {
                  pattern: /^(?=.*\d)(?=.*[a-z[A-Z])(?=.*[()[\]`~!@#$%^&*-+=_|{}:;'<>,.?/]).{8,30}$/,
                  message: '请按规则重新设置密码'
                }],
            })(
              <Input placeholder="请设置新用户初始密码" disabled={isExist} />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default UserModal
