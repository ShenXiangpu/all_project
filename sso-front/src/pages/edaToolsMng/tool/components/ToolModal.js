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
class ToolModal extends PureComponent {

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
    const { item = {}, onOk, form, taskTypes, vendors, ...modalProps } = this.props
    const { getFieldDecorator } = form

    const frontTypeOptions = taskTypes && taskTypes.F && taskTypes.F.map(element => {
      return <Option value={element.id} key={element.id}>{element.name}</Option>
    })

    const backTypeOptions = taskTypes && taskTypes.B && taskTypes.B.map(element => {
      return <Option value={element.id} key={element.id}>{element.name}</Option>
    })

    const arr = item && item.types && item.types.length > 0 && item.types.map(item => {
      return item.id;
    })

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <div id='tool'>
          <Form layout="horizontal" {...formItemLayout}>
            <FormItem label='工具名'>
              {getFieldDecorator('toolName', {
                initialValue: item.toolName,
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请输入工具名称'
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入工具名称" />
              )}
            </FormItem>

            <FormItem label='厂商'>
              {getFieldDecorator('toolVendor', {
                initialValue: item.toolVendor,
                rules: [
                  {
                    required: true,
                    message: '请选择工具所属厂商'
                  },
                ],
              })(
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  getPopupContainer={() => document.getElementById('tool')}
                >
                  {vendors && vendors.length > 0 && vendors.map(item => {
                    return (<Option key={item.id} value={item.id}>{item.vendorName}</Option>)
                  })}
                </Select>
              )}
            </FormItem>

            <Form.Item label="任务类型">
              {getFieldDecorator('taskTypes', {
                initialValue: arr || [],
                rules: [
                  {
                    required: true,
                    message: '请选择任务类型'
                  },
                ],
              })(
                <Select
                  mode="multiple"
                  notFoundContent={null}
                  getPopupContainer={() => document.getElementById('tool')}
                >
                  <OptGroup label="前端">
                    {frontTypeOptions}
                  </OptGroup>
                  <OptGroup label="后端">
                    {backTypeOptions}
                  </OptGroup>
                </Select>
              )}
            </Form.Item>

            <FormItem label='是否开源' required>
              {getFieldDecorator('openSource', {
                initialValue: item.openSource || 2,
              })(
                <Radio.Group>
                  <Radio.Button value={1}>是</Radio.Button>
                  <Radio.Button value={2}>否</Radio.Button>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem label='是否支持挂载' required>
              {getFieldDecorator('supportMount', {
                initialValue: item.supportMount || 1,
              })(
                <Radio.Group>
                  <Radio.Button value={1}>是</Radio.Button>
                  <Radio.Button value={2}>否</Radio.Button>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem label='是否支持web端' required>
              {getFieldDecorator('allowWeb', {
                initialValue: item.allowWeb || 1,
              })(
                <Radio.Group>
                  <Radio.Button value={1}>支持</Radio.Button>
                  <Radio.Button value={2}>不支持</Radio.Button>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem label='占用资源类型' required>
              {getFieldDecorator('useResourceType', {
                initialValue: item.useResourceType || 3,
              })(
                <Radio.Group>
                  <Radio.Button value={3}>通用型</Radio.Button>
                  <Radio.Button value={1}>内存型</Radio.Button>
                  <Radio.Button value={2}>计算型</Radio.Button>
                </Radio.Group>
              )}
            </FormItem>

            {/* <FormItem label='工具license_home'>
              {getFieldDecorator('licenseHome', {
                initialValue: item.licenseHome,
              })(
                <Input autoComplete="off" placeholder="请输入工具license_home" />
              )}
            </FormItem>

            <FormItem label='license地址'>
              {getFieldDecorator('licenseUrl', {
                initialValue: item.licenseUrl,
              })(
                <Input autoComplete="off" placeholder="请输入工具license地址" />
              )}
            </FormItem> */}

            <FormItem label='描述'>
              {getFieldDecorator('description', {
                initialValue: item.description,
              })(
                <Input.TextArea autoComplete="off" placeholder="请输入工具描述" />
              )}
            </FormItem>

          </Form>
        </div>
      </Modal>
    )
  }
}

ToolModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default ToolModal
