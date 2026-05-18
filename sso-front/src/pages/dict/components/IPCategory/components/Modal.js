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
class IpCategoryModal extends PureComponent {
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
      } else if (item.parentId) {
        data = {
          parentId: item.parentId,
          parentTypeName: item.parentTypeName,
          ...getFieldsValue()
        }
      } else {
        data = {
          ...getFieldsValue(),
          parentId: 0
        }
      }

      onOk(data)
    })
  }

  render() {
    const { item = {}, onOk, form, ...modalProps } = this.props
    const { getFieldDecorator, getFieldValue } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label='IP类型名称' {...formItemLayout}>
            {getFieldDecorator('typeName', {
              initialValue: item.typeName,
              rules: [
                {
                  required: true,
                  message: '请输入IP类型名称'
                },
              ],
            })(
              <Input autoComplete="off" placeholder="请输入IP类型名称" />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

IpCategoryModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default IpCategoryModal
