import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Checkbox } from 'antd'
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
class TaskTypeModal extends PureComponent {
  handleOk = (e) => {
    e.preventDefault();

    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue, getFieldValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }

      let status;
      const fieldStatus = getFieldValue('status');
      if (fieldStatus && fieldStatus.length === 2) {
        status = 3;
      } else {
        status = fieldStatus.toString();
      }

      const data = {
        ...getFieldsValue(),
        status,
        id: item.id,
      }
      onOk(data)
    })
  }

  render() {
    const { item = {}, onOk, form, ...modalProps } = this.props
    const { getFieldDecorator } = form

    const arr = [];
    if (item && item.status) {
      arr.push(item.status);
    }

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal"  {...formItemLayout}>
          <FormItem label='任务类型名称'>
            {getFieldDecorator('typeName', {
              initialValue: item.typeName,
              rules: [
                {
                  required: true,
                  message: '请输入任务类型名称'
                },
              ],
            })(
              <Input autoComplete="off" placeholder="请输入任务类型名称" />
            )}
          </FormItem>

          <FormItem label='英文名称'>
            {getFieldDecorator('typeNameEn', {
              initialValue: item.typeNameEn,
              rules: [
                {
                  required: false,
                  message: '请输入任务类型英文名称'
                },
              ],
            })(
              <Input autoComplete='off' placeholder="请输入任务类型英文名称" />
            )}
          </FormItem>

          <FormItem label='任务类型'>
            {getFieldDecorator('status', {
              initialValue: item.status && isEqual(item.status, 3) ? [1, 2] : arr,
              rules: [
                {
                  required: true,
                  message: '请选择任务类型'
                },
              ],
            })(
              <Checkbox.Group>
                <Checkbox value={1}>前端</Checkbox>
                <Checkbox value={2}>后端</Checkbox>
              </Checkbox.Group>
            )}
          </FormItem>

        </Form>
      </Modal>
    )
  }
}

TaskTypeModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default TaskTypeModal
