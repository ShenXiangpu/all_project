import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Modal } from 'antd'
import { isEqual } from 'lodash'

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

    const { item = {}, onOk, form, modalType } = this.props
    console.log(item, 'item');
    const { validateFields, getFieldsValue } = form

    // return
    validateFields(errors => {
      if (errors) {
        return
      }
      let data = {}
      if (isEqual(modalType, 'update')) {
        data = {
          ...getFieldsValue(),
          parentCid: item.parentCid,
          catId:item.parentCid
        }

      } else {
        if (item && item.parentCid) { //子菜单添加
          data = {
            ...getFieldsValue(),
            parentCid: item.parentCid,
          }
        }else {
          data = {
            ...getFieldsValue(),
          }
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
    // catId=${values.catId}
    // &categoryName=${values.categoryName}
    // &parentCid=${values.parentCid}
    // &categoryLevel=${values.categoryLevel}
    // &sort=${values.sort}`,
    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label='功能名称' {...formItemLayout}>
            {getFieldDecorator('categoryName', {
              initialValue: item.categoryName || '',
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



          <FormItem label='排序' {...formItemLayout}>
            {getFieldDecorator('sort', {
              initialValue: item.sort,
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
