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
        <Form layout="horizontal" {...formItemLayout}>
          <FormItem label='计费规则名称' >
            {getFieldDecorator('feeRuleName', {
              initialValue: item.feeRuleName,
              rules: [
                {
                  required: true,
                  message: '请输入计费规则名称'
                },
              ],
            })(
              <Input autoComplete="off" placeholder="请输入计费规则名称" />
            )}
          </FormItem>
          <FormItem label='计费类型' >
            {getFieldDecorator('feeType', {
              initialValue: item.feeType,
              rules: [
                {
                  required: true,
                  message: '请输入计费类型'
                },
              ],
            })(
              <Input autoComplete="off" placeholder="请输入计费类型" />
            )}
          </FormItem>
          <FormItem label='计价单位' >
            {getFieldDecorator('priceUnit', {
              initialValue: item.priceUnit,
              rules: [
                {
                  required: true,
                  message: '请输入计价单位'
                },
              ],
            })(
              <Input autoComplete="off" placeholder="请输入计价单位" />
            )}
          </FormItem>
          <FormItem label='资源类型' >
            {getFieldDecorator('resourceName', {
              initialValue: item.resourceName,
              rules: [
                {
                  required: true,
                  message: '请输入资源类型'
                },
              ],
            })(
              <Input autoComplete="off" placeholder="请输入资源类型" />
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
