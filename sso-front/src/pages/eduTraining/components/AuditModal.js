import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Modal } from 'antd'
import { connect } from 'dva'
const { Option } = Select

const FormItem = Form.Item

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
}

@Form.create()
class AuditModal extends PureComponent {
    state = {
        formValues: {},
    }
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
          status: '2',
        }
        onOk(data)
      })
    }








    render() {
        const { item = {}, onOk, form, ...modalProps } = this.props
        const { getFieldDecorator, getFieldValue } = form

        return (
            <Modal {...modalProps}
            onOk={this.handleOk}
            >
                <Form {...layout} >

                    <Form.Item label="驳回原因">
                        {getFieldDecorator('auditMind', {
                            initialValue: '',
                            rules: [
                              {
                                required: true,
                                message: '请填写审核意见'
                              },
                            ],
                        })(
                            <Input.TextArea />
                        )}
                    </Form.Item>
                </Form>
            </Modal>



        )
    }
}



export default AuditModal
