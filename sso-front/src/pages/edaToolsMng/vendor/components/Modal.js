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
class VendorModal extends PureComponent {
  handleOk = (e) => {
    e.preventDefault();

    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      let data = {}
      if (item.id) {
        data = {
          ...getFieldsValue(),
          id: item.id
        }
      } else {
        data = {
          ...getFieldsValue()
        }
      }
      onOk(data)
    })
  }

  handleChange = (value) => {
    const { onCompanyChange } = this.props.selectProps
    onCompanyChange(value);
  }

  render() {
    const { item = {}, onOk, form, selectProps, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label='厂商代码' {...formItemLayout}>
            {getFieldDecorator('vendorCode', {
              initialValue: item.vendorCode || '',
              rules: [
                {
                  required: true,
                  message: '请输入厂商代码'
                },
                {
                  pattern: /^[0-9a-zA-Z]+$/,
                  message: '只能输入英文或数字'
                }
              ],
            })(
              <Input disabled={item.vendorCode ? true : false} placeholder="请输入厂商代码" />
            )}
          </FormItem>
          <FormItem label='厂商名称' {...formItemLayout}>
            {getFieldDecorator('vendorName', {
              initialValue: item.vendorName || '',
              rules: [
                {
                  required: true,
                  message: '请输入厂商名称'
                },
              ],
            })(
              <Input placeholder="请输入厂商名称" />
            )}
          </FormItem>
          <FormItem label='厂商英文名称' {...formItemLayout}>
            {getFieldDecorator('vendorNameEn', {
              initialValue: item.vendorNameEn || '',
              rules: [
                {
                  required: true,
                  message: '请输入厂商英文名'
                },
              ],
            })(
              <Input placeholder="请输入厂商英文名" />
            )}
          </FormItem>
          <FormItem label='联系人' {...formItemLayout}>
            {getFieldDecorator('vendorContact', {
              initialValue: item.vendorContact,
              rules: [
                {
                  required: true,
                  message: '请输入厂商联系人'
                },
              ],
            })(
              <Input placeholder="请输入厂商联系人" />
            )}
          </FormItem>
          <FormItem label='联系电话' {...formItemLayout}>
            {getFieldDecorator('vendorPhone', {
              initialValue: item.vendorPhone,
              rules: [
                {
                  required: true,
                  message: '请输入厂商联系电话'
                },
              ],
            })(
              <Input placeholder="请输入厂商联系电话" />
            )}
          </FormItem>
          <FormItem label='邮箱' {...formItemLayout}>
            {getFieldDecorator('vendorEmail', {
              initialValue: item.vendorEmail,
              rules: [
                {
                  required: true,
                  message: '请输入邮箱',
                },
                {
                  pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                  message: '邮箱格式不正确',
                },
              ],
            })(
              <Input placeholder="请输入邮箱" />
            )}
          </FormItem>
          <FormItem label='地址' {...formItemLayout}>
            {getFieldDecorator('vendorAddress', {
              initialValue: item.vendorAddress,
              rules: [
                {
                  required: true,
                  message: '请输入厂商地址'
                },
              ],
            })(
              <Input placeholder="请输入厂商地址" />
            )}
          </FormItem>

          {/* <FormItem label='计价' {...formItemLayout}>
            {getFieldDecorator('licensePrice', {
              initialValue: item.licensePrice,
              rules: [
                {
                  required: true,
                  message: '请输入License价格'
                },
                {
                  pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9](0-9)?$)/,
                  message: '请输入正确的金额',
                },
              ],
            })(
              <Input prefix="￥" suffix="元/时" />
            )}
          </FormItem> */}

          <FormItem label='备注' {...formItemLayout}>
            {getFieldDecorator('description', {
              initialValue: item.description,
            })(
              <Input.TextArea
                autoSize={{ minRows: 2, maxRows: 6 }}
                placeholder="请输入备注信息"
              />
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
