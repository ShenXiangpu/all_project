import React, { PureComponent } from 'react'
import { Modal, Form, Button, Input, Row, Col } from 'antd'
import styles from './ZipModal.less'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
}

@Form.create()
class UnZipModal extends PureComponent {
  handleOk = (e) => {
    e.preventDefault();

    const { onUnZipClick, form } = this.props
    const { validateFields, getFieldValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const unzipPath = getFieldValue('unzipPath');
      onUnZipClick(unzipPath)
    })
  }

  render() {
    const { form, defaultUnZipPath, btnLoading, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps}
        title="解压路径"
        footer={null}
      >
        <Form {...formItemLayout} className={styles.form}>
          <Row>
            <Col span={20}>
              <FormItem label='目标路径'>
                {getFieldDecorator('unzipPath', {
                  initialValue: defaultUnZipPath,
                })(
                  <Input autoComplete="off" />
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <Button type="primary" onClick={this.handleOk} loading={btnLoading}>确定</Button>
            </Col>
          </Row>
        </Form>
      </Modal >
    )
  }
}

export default UnZipModal;
