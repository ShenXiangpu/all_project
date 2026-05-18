import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select, Radio, Cascader } from 'antd'
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
class ToolFunctionModal extends PureComponent {

  handleOk = (e) => {
    e.preventDefault();

    const { item = {}, onOk, form, funcId,functionId } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        functionId: item.functionId || functionId,
        toolId: funcId,
        ...getFieldsValue(),
      }
      console.log(data);
      onOk(data)
    })
  }

  render() {
    const { item = {}, functionTypeList, onOk, form, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const residences = functionTypeList;
    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <div id='tool'>
          <Form layout="horizontal" {...formItemLayout}>
            <FormItem label='功能名称'>
              {getFieldDecorator('functionName', {
                initialValue: item && item.functionName,
                rules: [
                  {
                    required: true,
                    message: '请输入功能名称'
                  },
                ],
              })(
                <Input autoComplete="off" placeholder="请输入功能名称" />
              )}
            </FormItem>

            <FormItem label='功能分类'>
              {getFieldDecorator('categoryId', {
                initialValue:  item && item.catIds,
                rules: [
                  {
                    required: true,
                    message: '请输入功能分类'
                  },
                ],
              })(
                <Cascader fieldNames={{ label: 'categoryName', value: 'catId', children: 'children' }} options={residences} placeholder="请选择功能类型" />
              )}
            </FormItem>

            <FormItem label='功能类型'>
              {getFieldDecorator('functionType', {
                initialValue: '0',
                rules: [
                  {
                    required: true,
                    message: '请选择功能类型'
                  },
                ],
              })(
                <Radio.Group>
                  <Radio.Button value="0">一般功能</Radio.Button>
                  <Radio.Button value="1">基础功能</Radio.Button>
                </Radio.Group>
              )}
            </FormItem>

            <FormItem label='描述'>
              {getFieldDecorator('description', {
                initialValue:  item && item.description,
                rules: [
                  {
                    required: false,
                    message: '请输入描述'
                  },
                ],
              })(
                <Input.TextArea placeholder="请输入描述" />
              )}
            </FormItem>
          </Form>
        </div>
      </Modal>
    )
  }
}

ToolFunctionModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default ToolFunctionModal
