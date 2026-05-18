import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select, Radio, Checkbox, InputNumber } from 'antd'
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
class ParamsModal extends PureComponent {

  handleOk = (e) => {
    e.preventDefault();

    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue, getFieldValue } = form

    validateFields((errors, values) => {
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
        <div id='params'>
          <Form layout="horizontal" {...formItemLayout}>
            <FormItem label='参数名称'>
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [
                  {
                    required: true,
                    message: '请输入参数名称'
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入参数名称" />
              )}
            </FormItem>

            <FormItem label='字段名Label'>
              {getFieldDecorator('label', {
                initialValue: item.label,
                rules: [
                  {
                    required: true,
                    message: '请输入参数字段名'
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入参数字段名" />
              )}
            </FormItem>

            <Form.Item label="类型">
              {getFieldDecorator('type', {
                initialValue: item.type || 'file',
                rules: [
                  {
                    required: true,
                    message: '请选择参数类型'
                  },
                ],
              })(
                <Select
                  showSearch
                  notFoundContent={null}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  getPopupContainer={() => document.getElementById('params')}
                >
                  <Option value='text'>文本（text）</Option>
                  <Option value='file'>文件（file）</Option>
                  <Option value='file|directory'>文件或文件夹路径（file|directory）</Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item label="HTML类型">
              {getFieldDecorator('html_type', {
                initialValue: item.html_type || 'input',
                rules: [
                  {
                    required: true,
                    message: '请选择参数类型'
                  },
                ],
              })(
                <Radio.Group>
                  <Radio.Button value='input'>input</Radio.Button>
                  <Radio.Button value='select'>select</Radio.Button>
                  <Radio.Button value='label'>label</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>

            <FormItem label='默认值'>
              {getFieldDecorator('default_value', {
                initialValue: item.default_value,
              })(
                <Input autoComplete="off" placeholder="请输入参数默认值" />
              )}
            </FormItem>

            <FormItem label='选项值'>
              {getFieldDecorator('select_option', {
                initialValue: item.select_option,
              })(
                <Input.TextArea autoComplete="off" placeholder="HTML类型如果是select，请输入select选项值，以分号隔开多个选项" />
              )}
            </FormItem>

            <FormItem label='是否必填'>
              {getFieldDecorator('necessity', {
                initialValue: item.necessity || 'required',
              })(
                <Radio.Group>
                  <Radio.Button value="required">required</Radio.Button>
                  <Radio.Button value="optional">optional</Radio.Button>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem label='是否多选'>
              {getFieldDecorator('num', {
                initialValue: item.num || 'single',
              })(
                <Radio.Group>
                  <Radio.Button value="single">单选</Radio.Button>
                  <Radio.Button value="mult">多选</Radio.Button>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem label='placeholder'>
              {getFieldDecorator('placeholder', {
                initialValue: item.placeholder,
              })(
                <Input autoComplete="off" placeholder="请输入参数提示信息" />
              )}
            </FormItem>

            <FormItem label='描述信息'>
              {getFieldDecorator('description', {
                initialValue: item.description,
              })(
                <Input.TextArea autoComplete="off" placeholder="请输入参数描述信息" />
              )}
            </FormItem>

            <FormItem label='允许类型'>
              {getFieldDecorator('allowed_type', {
                initialValue: item.allowed_type,
              })(
                <Input autoComplete="off" placeholder="请输入参数允许类型" />
              )}
            </FormItem>

            <FormItem label='排序'>
              {getFieldDecorator('order_num', {
                initialValue: item.order_num || 0,
              })(
                <InputNumber min={0} autoComplete="off" />
              )}
            </FormItem>
          </Form>
        </div>
      </Modal>
    )
  }
}

ParamsModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default ParamsModal
