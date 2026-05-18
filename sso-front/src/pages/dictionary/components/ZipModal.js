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
class ZipModal extends PureComponent {
  handleOk = (e) => {
    e.preventDefault();

    const { item = {}, onZipClick, form } = this.props
    const { validateFields, getFieldValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const zipName = getFieldValue('zipName');
      onZipClick(zipName)
    })
  }

  render() {
    const { item = {}, form, defaultZipName, btnLoading, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps}
        title="压缩文件名"
        footer={null}
      >
        <Form {...formItemLayout} className={styles.form}>
          <Row>
            <Col span={20}>
              <FormItem label='压缩文件名'>
                {getFieldDecorator('zipName', {
                  initialValue: defaultZipName,
                  rules: [
                    {
                      required: true,
                      message: '请输入压缩文件名'
                    },
                  ],
                })(
                  <Input autoComplete="off" placeholder="请输入压缩文件名" />
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

export default ZipModal;
