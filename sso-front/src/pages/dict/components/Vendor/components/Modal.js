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
class VendorModal extends PureComponent {
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
          <FormItem label='供应商名称'>
            {getFieldDecorator('vendorName', {
              initialValue: item.vendorName,
              rules: [
                {
                  required: true,
                  message: '请输入工具供应商名称'
                },
              ],
            })(
              <Input autoComplete="off" placeholder="请输入工具供应商名称" />
            )}
          </FormItem>

          <FormItem label='英文名称'>
            {getFieldDecorator('vendorNameEn', {
              initialValue: item.vendorNameEn,
            })(
              <Input autoComplete='off' placeholder="请输入供应商英文名称" />
            )}
          </FormItem>

        </Form>
      </Modal>
    )
  }
}

VendorModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default VendorModal
