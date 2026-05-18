import React, { PureComponent } from 'react'
import { Form, InputNumber, Button, Input } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}
@Form.create()
class LimitForm extends PureComponent {

  handleClick = (e) => {
    e.preventDefault();

    const { edaVendorCode, onLimit, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }

      const data = {
        ...getFieldsValue(),
        edaVendorCode
      }

      onLimit(data)
    })
  }

  render() {
    const { form, limitBtnLoading } = this.props
    const { getFieldDecorator } = form

    return (
      <Form layout="horizontal">
        <FormItem label='用户组' {...formItemLayout}>
          {getFieldDecorator('hostGroupName', {
            rules: [
              {
                required: true,
                message: '请输入用户组'
              }
            ],
          })(
            <Input placeholder="请输入用户组" />
          )}
        </FormItem>
        <FormItem label='主机列表' {...formItemLayout}>
          {getFieldDecorator('hostNames', {
            rules: [
              {
                required: true,
                message: '请输入主机列表（空格隔开）'
              }
            ],
          })(
            <Input.TextArea
              autoSize={{ minRows: 2, maxRows: 6 }}
              placeholder="请输入主机列表（空格隔开）"
            />
          )}
        </FormItem>
        <FormItem label='feature' {...formItemLayout}>
          {getFieldDecorator('feature', {
            rules: [
              {
                required: true,
                message: '请输入需要限制的feature'
              }
            ],
          })(
            <Input placeholder="请输入需要限制的feature" />
          )}
        </FormItem>
        <FormItem label='限制' {...formItemLayout}>
          {getFieldDecorator('limitNums', {
            rules: [
              {
                required: true,
                message: '请输入限制数量'
              }
            ],
          })(
            <InputNumber min={0} />
          )}
        </FormItem>

        <p style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            // size="small"
            onClick={this.handleClick}
            loading={limitBtnLoading}
          >
            限制
            </Button>
        </p>
      </Form >
    )
  }
}

export default LimitForm
