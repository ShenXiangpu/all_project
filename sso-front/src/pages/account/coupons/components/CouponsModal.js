import React, { PureComponent } from 'react'
import { Form, Input, Button, Modal } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
}
@Form.create()
class CouponsModal extends PureComponent {

  handleClick = (e) => {
    e.preventDefault();

    const { onCheckAwardCode, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      onCheckAwardCode(data)
    })
  }

  render() {
    const { form, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps}
        onOk={this.handleClick}
      >
        <Form layout="horizontal">
          <FormItem label='兑换码' {...formItemLayout}>
            {getFieldDecorator('awardCode', {
              rules: [
                {
                  required: true,
                  message: '请输入正确的兑换码'
                },
              ],
            })(
              <Input placeholder="请输入兑换码" />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default CouponsModal
