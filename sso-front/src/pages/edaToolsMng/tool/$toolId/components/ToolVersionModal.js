import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select, Radio } from 'antd'
import { isEqual } from 'lodash'

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
class ToolVersionModal extends PureComponent {

  handleOk = (e) => {
    e.preventDefault();

    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
      }
      onOk(data)
    })
  }

  render() {
    const { item = {}, onOk, form, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <div id='tool'>
          <Form layout="horizontal" {...formItemLayout}>
            <FormItem label='工具版本'>
              {getFieldDecorator('toolVersion', {
                initialValue: item.toolVersion,
                rules: [
                  {
                    required: true,
                    message: '请输入工具版本'
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入工具版本" />
              )}
            </FormItem>

            <FormItem label='服务器安装地址'>
              {getFieldDecorator('toolLocation', {
                initialValue: item.toolLocation && isEqual(item.toolLocation, '阿里云') ? '2' : '1',
                rules: [
                  {
                    required: true,
                    message: '请选择工具安装服务器所在地址'
                  },
                ],
              })(
                <Radio.Group>
                  <Radio.Button value="1">本地云</Radio.Button>
                  <Radio.Button value="2">阿里云</Radio.Button>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem label='主机host地址'>
              {getFieldDecorator('hostAddress', {
                initialValue: item.hostAddress,
                rules: [
                  {
                    required: true,
                    message: '请输入主机host地址'
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入主机host地址" />
              )}
            </FormItem>

            <FormItem label='安装路径'>
              {getFieldDecorator('toolPath', {
                initialValue: item.toolPath,
                rules: [
                  {
                    required: true,
                    message: '请输入工具安装路径'
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入工具安装路径" />
              )}
            </FormItem>

            {/* <FormItem label='安装路径HOME'>
              {getFieldDecorator('toolPathHome', {
                initialValue: item.toolPathHome,
                rules: [
                  {
                    required: true,
                    message: '请输入工具安装路径HOME'
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入工具安装路径HOME" />
              )}
            </FormItem>

            <FormItem label='环境变量'>
              {getFieldDecorator('environmentPath', {
                initialValue: item.environmentPath,
                rules: [
                  {
                    required: true,
                    message: '请输入工具环境变量'
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入工具环境变量" />
              )}
            </FormItem> */}

            <FormItem label='安装包下载地址'>
              {getFieldDecorator('toolSourcePath', {
                initialValue: item.toolSourcePath,
              })(
                <Input autoComplete="off" placeholder="请输入工具安装包下载地址" />
              )}
            </FormItem>

            <FormItem label='工具安装脚本'>
              {getFieldDecorator('installScript', {
                initialValue: item.installScript,
              })(
                <Input autoComplete="off" placeholder="请输入工具安装脚本" />
              )}
            </FormItem>

            <FormItem label='工具指南'>
              {getFieldDecorator('installGuide', {
                initialValue: item.installGuide,
              })(
                <Input autoComplete="off" placeholder="请输入工具指南" />
              )}
            </FormItem>

          </Form>
        </div>
      </Modal>
    )
  }
}

ToolVersionModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default ToolVersionModal
