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
class NodeModal extends PureComponent {
  handleOk = (e) => {
    e.preventDefault();

    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        nodeName: getFieldValue('node'),
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
          <FormItem label='工艺节点' {...formItemLayout}>
            {getFieldDecorator('node', {
              initialValue: item.node,
              rules: [
                {
                  required: true,
                  message: '请输入工艺节点'
                },
              ],
            })(
              <Input autoComplete="off" placeholder="请输入工艺节点" />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

NodeModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default NodeModal
