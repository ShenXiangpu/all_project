import React, { PureComponent } from 'react'
import { Form, Icon, Upload, Button, Input } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
}
@Form.create()
class ReplaceFileForm extends PureComponent {
  state = {
    fileList: []   //上传的文件列表
  }

  handleClick = (e) => {
    e.preventDefault();

    const { edaVendorCode, onReplaceFile, form } = this.props
    const { validateFields, setFields } = form
    const { fileList } = this.state;

    validateFields(errors => {
      if (errors) {
        return
      }
      if (fileList && fileList.length === 0) {
        setFields({
          'serverIp': { errors: [new Error('请先选择文件进行替换')] }
        })
        return;
      }

      const formData = new FormData();
      formData.append('edaVendorCode', edaVendorCode);

      // 如果自定义 new FormData() 然后上传文件，传文件的 originFileObj
      // 只上传第一个文件
      formData.append('file', fileList[0].originFileObj);

      // 上传所有文件列表
      // fileList.forEach(file => {
      //   formData.append('files', file.originFileObj);
      // });

      console.log('formData edaVendorCode:',formData.get('edaVendorCode'))
      console.log('formData file:',formData.get('file'))
      onReplaceFile(formData)
    })
  }

  normFile = e => {
    // console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    this.setState({ fileList: e.fileList })
    return e && e.fileList;
  };

  render() {
    const { form, replaceBtnLoading } = this.props
    const { getFieldDecorator } = form

    return (
      <Form layout="horizontal">
        <FormItem label='文件' {...formItemLayout}>
          {getFieldDecorator('serverIp', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload
              showUploadList={{
                showDownloadIcon: false
              }}
            >
              <Button>
                <Icon type="upload" /> 点击上传替换文件
              </Button>
            </Upload>
          )}
        </FormItem>

        <p style={{ textAlign: 'right' }}>
          <Button
            type="primary"
            // size="small"
            onClick={this.handleClick}
            loading={replaceBtnLoading}
          >
            替换
            </Button>
        </p>
      </Form >
    )
  }
}

export default ReplaceFileForm
