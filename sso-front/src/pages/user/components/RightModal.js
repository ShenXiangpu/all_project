import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Select, Modal } from 'antd'
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
class RightModal extends PureComponent {
  handleOk = (e) => {
    e.preventDefault();

    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields((errors, values) => {
      if (errors) {
        return
      }
      const data = {
        ...item,
        roleId: [values.roleId]
      }
      onOk(data)
    })
  }

  render() {
    const { item = {}, onOk, form, roleList, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label='用户角色' {...formItemLayout}>
            {getFieldDecorator('roleId', {
              // initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请选择角色'
                },
              ],
            })(
              <Select
                placeholder="请选择角色"
              >
                {roleList && roleList.map(item => {
                  return (<Option key={item.id} value={item.id}>{item.cnName}</Option>)
                })
                }
              </Select>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

RightModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default RightModal
