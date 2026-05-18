import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Modal } from 'antd'
import { Encrypt } from 'utils/secret.js'
import { isEmpty } from 'lodash-es'

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

  //校验手机号是否已存在
  handleCheckPhone = (rule, value, callback) => {
    const { item = {}, dispatch } = this.props
    if (value && value !== item.phone) {
      dispatch({
        type: 'app/checkMobile',
        payload: { phone: value },
        callback: (response) => {
          if (response && !response.flag) {
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

  //校验邮箱是否已存在
  handleCheckEmail = (rule, value, callback) => {
    const { item = {}, dispatch } = this.props
    if (value && value !== item.email) {
      dispatch({
        type: 'app/checkEmail',
        payload: { email: value },
        callback: (response) => {
          if (response && !response.flag) {
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

    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue, getFieldValue } = form;

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
      }

      const password = getFieldValue('password');
      console.log('password:', password);
      if (isEmpty(password)) {
        data.password = Encrypt('123456abc!');
      } else {
        data.password = Encrypt(password);
      }
      onOk(data)
    })
  }

  handleChange = (value) => {
    const { onCompanyChange } = this.props.selectProps
    const { form: { setFieldsValue } } = this.props
    setFieldsValue({ userGroupCode: undefined })
    onCompanyChange(value);
  }

  render() {
    const { item = {}, onOk, form, enterpriseGroupList, enterpriseRoles, ...modalProps } = this.props
    const { getFieldDecorator } = form

    const groupOptions = enterpriseGroupList.map(element => {
      return <Option value={element.id} key={element.id}>{element.deptName}</Option>
    })

    const roleOptions = enterpriseRoles.map(element => {
      return <Option value={element.id} key={element.id}>{element.cnName}</Option>
    })

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label='用户姓名' {...formItemLayout}>
            {getFieldDecorator('userName', {
              initialValue: item.userName,
              rules: [
                {
                  required: true,
                  message: '请输入用户姓名'
                },
              ],
            })(
              <Input placeholder="请输入用户姓名" />
            )}
          </FormItem>
          {/* <FormItem label='昵称' {...formItemLayout}>
            {getFieldDecorator('nickName', {
              initialValue: item.nickName,
            })(
              <Input placeholder="请输入昵称" />
            )}
          </FormItem> */}
          <FormItem label='所属部门' {...formItemLayout} required>
            {getFieldDecorator('deptId', {
              initialValue: (item.department && item.department.id) || (enterpriseGroupList.length > 0 ? enterpriseGroupList[0].id : ''),
            })(
              <Select>
                {groupOptions}
              </Select>
            )}
          </FormItem>
          <FormItem label='用户角色' {...formItemLayout} required>
            {getFieldDecorator('roleId', {
              initialValue: item.roleId || (enterpriseRoles.length > 0 ? enterpriseRoles[0].id : ''),
            })(
              <Select>
                {roleOptions}
              </Select>
            )}
          </FormItem>
          {/* <FormItem label='手机号' {...formItemLayout}>
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
                  validator: this.handleCheckPhone
                }
              ],
              validateTrigger: 'onBlur'
            })(
              <Input placeholder="请输入手机号" />
            )}
          </FormItem> */}
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
                  validator: this.handleCheckEmail
                }
              ],
              validateTrigger: 'onBlur'
            })(
              <Input placeholder="请输入用户邮箱" />
            )}
          </FormItem>
          <FormItem label='设置密码' {...formItemLayout}
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
              <Input placeholder="请设置用户密码" />
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
