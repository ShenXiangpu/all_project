import React, { PureComponent } from 'react'
import { Form, Button, Input } from 'antd'

const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}
@Form.create()
class ReplaceConfigForm extends PureComponent {
  handleConfigClick = (e) => {
    e.preventDefault();

    const { edaVendorCode, operationType, onConfig, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        edaVendorCode,
        operationType
      }
      onConfig(data)
    })
  }

  render() {
    const { configItem = {}, form, configLoading } = this.props
    const { getFieldDecorator } = form

    return (
      <Form layout="horizontal">
        <FormItem label='服务器IP' {...formItemLayout}>
          {getFieldDecorator('serverIp', {
            initialValue: configItem.serverIp || '',
            rules: [
              {
                required: true,
                message: '请输入服务器IP'
              }
            ],
          })(
            <Input placeholder="请输入服务器IP" />
          )}
        </FormItem>
        <FormItem label='ssh端口' {...formItemLayout}>
          {getFieldDecorator('serverPort', {
            initialValue: configItem.serverPort || '',
          })(
            <Input placeholder="请输入ssh端口（默认：22）" />
          )}
        </FormItem>
        <FormItem label='ssh登录用户名' {...formItemLayout}>
          {getFieldDecorator('sshLoginUser', {
            initialValue: configItem.sshLoginUser || '',
            rules: [
              {
                required: true,
                message: '请输入ssh登录用户名'
              },
            ],
          })(
            <Input placeholder="请输入ssh登录用户名" />
          )}
        </FormItem>
        <FormItem label='ssh登录密码' {...formItemLayout}>
          {getFieldDecorator('sshLoginPassword', {
            initialValue: configItem.sshLoginPassword || '',
            rules: [
              {
                required: true,
                message: '请输入ssh登录密码'
              },
            ],
          })(
            <Input type="password" placeholder="请输入ssh登录密码" />
          )}
        </FormItem>
        <FormItem label='执行脚本' {...formItemLayout}>
          {getFieldDecorator('executeBash', {
            initialValue: configItem.executeBash || '',
            rules: [
              {
                required: true,
                message: '请输入执行脚本'
              },
            ],
          })(
            <Input placeholder="请输入执行脚本" />
          )}
        </FormItem>
        <FormItem label='执行脚本入参' {...formItemLayout}>
          {getFieldDecorator('bashParams', {
            initialValue: configItem.bashParams || '',
          })(
            <Input.TextArea
              autoSize={{ minRows: 2, maxRows: 6 }}
              placeholder="请输入执行脚本入参"
            />
          )}
        </FormItem>

        <p style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            // size="small"
            onClick={this.handleConfigClick}
            loading={configLoading}
          >
            配置
            </Button>
        </p>
      </Form >
    )
  }
}

export default ReplaceConfigForm
