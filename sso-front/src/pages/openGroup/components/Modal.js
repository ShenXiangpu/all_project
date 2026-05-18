import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Modal } from 'antd'
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
class GroupModal extends PureComponent {
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
        <Form layout="horizontal">
          <FormItem label='群组名称' {...formItemLayout}>
            {getFieldDecorator('groupName', {
              initialValue: item.groupName,
              rules: [
                {
                  required: true,
                  message: '请输入群组名称'
                },
              ],
            })(
              <Input placeholder="请输入群组名称" />
            )}
          </FormItem>
          <FormItem label='描述' {...formItemLayout}>
            {getFieldDecorator('groupDescription', {
              initialValue: item.groupDescription,
            })(
              <Input.TextArea
                autoSize={{ minRows: 2, maxRows: 6 }}
                placeholder="请输入描述信息"
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

GroupModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default GroupModal
