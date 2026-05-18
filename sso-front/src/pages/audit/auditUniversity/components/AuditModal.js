import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
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
class AuditModal extends PureComponent {

  //审核
  handleClick = (status, e) => {
    e.preventDefault();

    const { item = {}, onAudit, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        userId: item.userId,
        status
      }
      onAudit(data)
    })
  }

  render() {
    const { item = {}, onOk, form, confirmLoading, confirmLoading2, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps}
        footer={[
          <Button key="reject" type="danger" loading={confirmLoading2} onClick={(e) => this.handleClick(2, e)}>
            不通过
          </Button>,
          <Button key="submit" type="primary" loading={confirmLoading} onClick={(e) => this.handleClick(1, e)}>
            通过
          </Button>,
        ]}
      >
        <Form layout="horizontal">
          <FormItem label='备注' {...formItemLayout}>
            {getFieldDecorator('description', {
              rules: [
                {
                  required: true,
                  message: '请填写备注信息'
                },
              ],
            })(
              <Input.TextArea rows={6} placeholder="请输入备注信息（如果审核不通过，请备注原因）" />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

AuditModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default AuditModal
