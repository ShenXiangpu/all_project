import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select, Radio } from 'antd'

const FormItem = Form.Item
const { Option, OptGroup } = Select

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
@Form.create()
class LicenseServerModal extends PureComponent {

  handleOk = (e) => {
    e.preventDefault();

    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields((errors, values) => {
      console.log(values);
      if (errors) {
        return
      }
      const data = {
        ...values,
        id: item.id,
      }
      onOk(data)
    })
  }

  render() {
    const { item = {}, onOk, form, vendorList, ...modalProps } = this.props
    const { getFieldDecorator } = form

    const arr = item && item.types && item.types.length > 0 && item.types.map(item => {
      return item.id;
    })

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <div id='tool'>
          <Form layout="horizontal" {...formItemLayout}>
            <FormItem label='License服务器名称'>
              {getFieldDecorator('licenseServerName', {
                initialValue: item.licenseServerName,
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请输入License服务器名称'
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入License服务器名称" />
              )}
            </FormItem>

            <FormItem label='厂商'>
              {getFieldDecorator('vendorId', {
                initialValue: item.vendorId,
                rules: [
                  {
                    required: true,
                    message: '请选择License所属厂商'
                  },
                ],
              })(
                <Select
                  showSearch
                  placeholder="请选择License所属厂商"
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  getPopupContainer={() => document.getElementById('tool')}
                >
                  {vendorList && vendorList.length > 0 && vendorList.map(item => {
                    return (<Option key={item.id} value={item.id}>{item.vendorName}</Option>)
                  })}
                </Select>
              )}
            </FormItem>

            <FormItem label='是否临时License' required>
              {getFieldDecorator('isTemporary', {
                initialValue: item.isTemporary || 2,
              })(
                <Radio.Group>
                  <Radio.Button value={1}>是</Radio.Button>
                  <Radio.Button value={2}>否</Radio.Button>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem label='环境变量Home'>
              {getFieldDecorator('licenseServerHome', {
                initialValue: item.licenseServerHome,
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请输入License服务器环境变量Home'
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入环境变量Home" />
              )}
            </FormItem>

            <FormItem label='主机名'>
              {getFieldDecorator('licenseServerHostname', {
                initialValue: item.licenseServerHostname,
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请输入License服务器HostName'
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入License服务器HostName" />
              )}
            </FormItem>

            <FormItem label='IP地址'>
              {getFieldDecorator('licenseServerIp', {
                initialValue: item.licenseServerIp,
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请输入License服务器IP地址'
                  },
                  {
                    pattern: /^((2(5[0-5]|[0-4]\d))|1\d{2}|[1-9]?\d)(\.((2(5[0-5]|[0-4]\d))|1\d{2}|[1-9]?\d)){3}$/,
                    message: 'IP地址格式不正确',
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入License服务器IP地址" />
              )}
            </FormItem>

            <FormItem label='端口'>
              {getFieldDecorator('licenseServerPort', {
                initialValue: item.licenseServerPort ? item.licenseServerPort.toString() : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请输入License服务器端口'
                  },
                  {
                    pattern: /^(6553[0-5]|655[0-2]\d|65[0-4]\d{2}|6[0-4]\d{3}|[0-5]\d{4}|[1-9]\d{0,3})$/,
                    message: '端口只能在 1-65535 之间',
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入License服务器端口" />
              )}
            </FormItem>

            <FormItem label='代理IP地址'>
              {getFieldDecorator('agentIp', {
                initialValue: item.agentIp,
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请输入License服务器代理IP地址'
                  },
                  {
                    pattern: /^((2(5[0-5]|[0-4]\d))|1\d{2}|[1-9]?\d)(\.((2(5[0-5]|[0-4]\d))|1\d{2}|[1-9]?\d)){3}$/,
                    message: '代理IP地址格式不正确',
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入License服务器代理IP地址" />
              )}
            </FormItem>

            <FormItem label='代理端口'>
              {getFieldDecorator('agentPort', {
                initialValue: item.agentPort ? item.agentPort.toString() : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请输入License服务器代理端口'
                  },
                  {
                    pattern: /^(6553[0-5]|655[0-2]\d|65[0-4]\d{2}|6[0-4]\d{3}|[0-5]\d{4}|[1-9]\d{0,3})$/,
                    message: '端口只能在 1-65535 之间',
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入License服务器代理端口" />
              )}
            </FormItem>

            <FormItem label='SSH端口'>
              {getFieldDecorator('sshPort', {
                initialValue: item.sshPort ? item.sshPort.toString() : '',
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请输入License服务器SSH端口'
                  },
                  {
                    pattern: /^[1-9]\d*$/,
                    message: '只能输入整数',
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入License服务器SSH端口" />
              )}
            </FormItem>

            <FormItem label='SSH登录密码'>
              {getFieldDecorator('sshPassword', {
                initialValue: item.sshPassword,
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请输入License服务器SSH登录密码'
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入License服务器SSH登录密码" />
              )}
            </FormItem>

            <FormItem label='脚本路径'>
              {getFieldDecorator('scriptPath', {
                initialValue: item.scriptPath,
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请输入License服务器脚本路径'
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入License服务器脚本路径" />
              )}
            </FormItem>


            <FormItem label='License文件路径'>
              {getFieldDecorator('licenseServerPath', {
                initialValue: item.licenseServerPath,
              })(
                <Input autoComplete="off" placeholder="请输入License文件路径" />
              )}
            </FormItem>

            <FormItem label='日志目录'>
              {getFieldDecorator('licenseServerLog', {
                initialValue: item.licenseServerLog,
              })(
                <Input autoComplete="off" placeholder="请输入License服务器日志目录" />
              )}
            </FormItem>

          </Form>
        </div>
      </Modal>
    )
  }
}

LicenseServerModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default LicenseServerModal
