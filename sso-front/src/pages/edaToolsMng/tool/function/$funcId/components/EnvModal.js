import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal,Select } from 'antd'
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
      let featureName = values.featureName;
      featureName = featureName.split(',')
      const data = {
        featureName,
        featureType,
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
          <FormItem label='名称'>
            {getFieldDecorator('featureName', {
              initialValue: item.featureName,
              rules: [
                {
                  required: true,
                  message: '请输入feature名称'
                },
              ],
            })(
              <Input autoComplete="off" placeholder="请输入feature名称(多个请用“，”隔开)" />
            )}
          </FormItem>

          <FormItem label='标识'>
            {getFieldDecorator('featureType', {
              initialValue: item.featureType  || '0',
              rules: [
                {
                  required: true,
                  message: '请选择'
                },
              ],
            })(
              <Select>
                <Option value="1">核心</Option>
                <Option value="0">普通</Option>
              </Select>
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
