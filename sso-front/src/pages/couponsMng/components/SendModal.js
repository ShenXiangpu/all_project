import React, { PureComponent } from 'react'
import { Form, Input, Select, Modal } from 'antd'

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
class SendModal extends PureComponent {

  state = {
    file: undefined
  }

  handleClick = (e) => {
    e.preventDefault();

    const { onSend, form } = this.props;
    const { validateFields, getFieldsValue } = form;
    const { file } = this.state;

    validateFields((errors, values) => {
      if (errors) {
        return
      }

      const formdata = new FormData();
      formdata.append("file", file);

      const data = {
        degree: values.degree,
        file: formdata
      }

      onSend(data)
    })
  }

  onFileChange = () => {
    const file = document.querySelector('#file').files[0];
    this.setState({ file })
  }

  render() {
    const { form, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps}
        onOk={this.handleClick}
      >
        <Form layout="horizontal">
          <FormItem label='奖项等级' {...formItemLayout}>
            {getFieldDecorator('degree', {
              rules: [
                {
                  required: true,
                  message: '请选择奖项等级'
                },
              ],
            })(
              <Select
                style={{ width: 150 }}
                placeholder="请选择奖项等级"
              >
                <Select.Option value="一等奖">一等奖</Select.Option>
                <Select.Option value="二等奖">二等奖</Select.Option>
                <Select.Option value="三等奖">三等奖</Select.Option>
              </Select>
            )}
          </FormItem>
          <Form.Item label="Excel文件" {...formItemLayout}>
            {getFieldDecorator('file', {
              rules: [
                {
                  required: true,
                  message: '请选择文件进行上传'
                },
              ],
            })(
              <Input
                type="file"
                style={{ padding: '2px' }}
                accept="'.csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"
                onClick={event => { event.target.value = null }}  // 防止连续上传同一个文件出发onChange
                id="file"
                onChange={this.onFileChange}
              >
              </Input>,
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default SendModal
