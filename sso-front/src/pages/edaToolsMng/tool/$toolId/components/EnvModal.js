import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal } from 'antd'
import styles from './EnvModal.less'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
}
@Form.create()
class EnvModal extends PureComponent {

  handleOk = (e) => {
    e.preventDefault();

    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue, getFieldValue } = form

    validateFields((errors, values) => {
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
      <Modal {...modalProps} onOk={this.handleOk} className={styles.modal}>
        <Form layout="horizontal" {...formItemLayout}>
          <FormItem label='变量名(N)'>
            {getFieldDecorator('variableName', {
              initialValue: item.variableName,
              rules: [
                {
                  required: true,
                  message: '请输入变量名(N)'
                },
              ],
            })(
              <Input autoComplete="off" placeholder="请输入变量名(N)" />
            )}
          </FormItem>

          <FormItem label='变量值(V)'>
            {getFieldDecorator('variableValue', {
              initialValue: item.variableValue,
              rules: [
                {
                  required: true,
                  message: '请输入变量名(N)'
                },
              ],
            })(
              <Input autoComplete="off" placeholder="请输入变量值(V)，多个以分号分隔" />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

EnvModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default EnvModal
