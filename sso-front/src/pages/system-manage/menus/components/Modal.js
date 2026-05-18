import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Modal } from 'antd'

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
class MenuModal extends PureComponent {
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
      } else if (item.parentMenuId) {
        data = {
          parentMenuId: item.parentMenuId,
          ...getFieldsValue()
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
          <FormItem label='菜单名称' {...formItemLayout}>
            {getFieldDecorator('menuName', {
              initialValue: item.menuName || '',
              rules: [
                {
                  required: true,
                  message: '请输入菜单名称'
                }
              ],
            })(
              <Input placeholder="请输入菜单名称" />
            )}
          </FormItem>

          <FormItem label='路径' {...formItemLayout}>
            {getFieldDecorator('menuUrl', {
              initialValue: item.menuUrl || '',
              rules: [
                {
                  required: true,
                  message: '请输入路径'
                },
              ],
            })(
              <Input placeholder="请输入菜单路径" />
            )}
          </FormItem>
          <FormItem label='图标' {...formItemLayout}>
            {getFieldDecorator('menuIcon', {
              initialValue: item.menuIcon,
            })(
              <Input placeholder="请输入菜单图标" />
            )}
          </FormItem>
          <FormItem label='排序' {...formItemLayout}>
            {getFieldDecorator('menuSort', {
              initialValue: item.menuSort,
            })(
              <InputNumber min={0} max={127} />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

MenuModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default MenuModal
