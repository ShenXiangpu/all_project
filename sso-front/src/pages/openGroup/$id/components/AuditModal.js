import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal } from 'antd'

const FormItem = Form.Item

/**
 * 审核窗口
 */
@Form.create()
class AuditModal extends PureComponent {
  handleOk = (e) => {
    e.preventDefault();

    const { onOk, form } = this.props
    const { validateFields } = form

    validateFields((errors, values) => {
      if (errors) {
        return
      }

      const data = {
        description: values.description,
      }
      onOk(data)
    })
  }

  render() {
    const { form, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <div>
          <FormItem label="不通过的原因">
            {getFieldDecorator('description', {
              rules: [
                {
                  required: true,
                  message: '请输入审核不通过的原因'
                },
              ],
            })(
              <Input.TextArea rows={4} placeholder="请输入审核不通过的原因" />
            )}
          </FormItem>
        </div>
      </Modal>
    )
  }
}

export default AuditModal
