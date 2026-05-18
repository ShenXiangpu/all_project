import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Radio } from 'antd'

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
    const { getFieldDecorator, getFieldValue } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal"  {...formItemLayout}>
          <FormItem label='角色中文名称'>
            {getFieldDecorator('cnName', {
              initialValue: item.cnName,
              rules: [
                {
                  required: true,
                  message: '请输入角色中文名称'
                },
              ],
            })(
              <Input autoComplete="off" placeholder="请输入角色中文名称" />
            )}
          </FormItem>
          <FormItem label='角色英文名称'>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                  required: true,
                  message: '请输入角色英文名称'
                },
              ],
            })(
              <Input autoComplete="off" placeholder="请输入角色英文名称" />
            )}
          </FormItem>
          <FormItem label='角色类型' required>
            {getFieldDecorator('type', {
              initialValue: item.type || 2,
            })(
              <Radio.Group>
                <Radio.Button value={1}>内部</Radio.Button>
                <Radio.Button value={2}>外部</Radio.Button>
              </Radio.Group>
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
