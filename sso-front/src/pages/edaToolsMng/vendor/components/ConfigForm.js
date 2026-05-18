import React, { PureComponent } from 'react'
import { Form, Input, Select, Modal, Button } from 'antd'
const { Option } = Select

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
class ConfigForm extends PureComponent {
  handleConfigClick = (e) => {
    e.preventDefault();

    const { item = {}, onConfig, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        edaVendorCode: item.edaVendorCode,
        operationType: 1
      }
      onConfig(data)
    })
  }

  handleOperate = (e, key) => {
    e.preventDefault();
    const { item = {}, configOperate } = this.props
    const data = {
      edaVendorCode: item.edaVendorCode,
      operation: key
    }
    configOperate(data)
  }

  render() {
    const { configItem = {}, form, configLoading, operateLoading } = this.props
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
            size="small"
            onClick={this.handleConfigClick}
            loading={configLoading}
          >
            配置
            </Button>
          <Button
            type="ghost"
            size="small"
            icon="caret-right"
            style={{ marginRight: '8px', marginLeft: '8px' }}
            loading={operateLoading}
            onClick={e => this.handleOperate(e, 'START')}
          >
            启动
          </Button>
          <Button
            type="ghost"
            size="small"
            icon="pause"
            loading={operateLoading}
            onClick={e => this.handleOperate(e, 'STOP')}
          >
            停止
            </Button>
        </p>
      </Form>
    )
  }
}

export default ConfigForm
