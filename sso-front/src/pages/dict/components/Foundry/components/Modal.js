import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal } from 'antd'

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
class FoundryModal extends PureComponent {
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
        <Form layout="horizontal"  {...formItemLayout}>
          <FormItem label='代工厂名称'>
            {getFieldDecorator('foundryName', {
              initialValue: item.foundryName,
              rules: [
                {
                  required: true,
                  message: '请输入代工厂名称'
                },
              ],
            })(
              <Input autoComplete="off" placeholder="请输入代工厂名称" />
            )}
          </FormItem>

          <FormItem label='代工厂简介'>
            {getFieldDecorator('introduction', {
              initialValue: item.introduction,
              rules: [
                {
                  required: false,
                  message: '请输入代工厂简介'
                },
              ],
            })(
              <Input.TextArea rows={4} placeholder="请输入代工厂简介" />
            )}
          </FormItem>

        </Form>
      </Modal>
    )
  }
}

FoundryModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default FoundryModal
