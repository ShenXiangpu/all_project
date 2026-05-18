import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Input, Select, message, Upload, Icon } from 'antd'
import styles from './FillCompanyInfo.less'

const FormItem = Form.Item
const { Option } = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 16 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

@Form.create()
class CompanyInfoForm extends Component {
  state = {
    fileList: []        //企业logo列表，只展示一条
  }

  //校验企业名称是否已存在
  handleCheckCompanyName = (rule, value, callback) => {
    const { dispatch } = this.props
    if (value) {
      dispatch({
        type: 'email/checkCompanyName',
        payload: { companyName: value },
        callback: (response) => {
          if (response && !response.flag) {
            callback(response.errMessage)
          } else {
            callback()
          }
        }
      })
    } else {
      // Note: 必须总是返回一个 callback
      callback()
    }
  }

  //校验企业统一社会信用代码是否已存在
  handleCheckCertificateCode = (rule, value, callback) => {
    const { dispatch } = this.props
    if (value) {
      dispatch({
        type: 'email/checkCertificateCode',
        payload: { certificateCode: value },
        callback: (response) => {
          if (response && !response.flag) {
            callback(response.errMessage)
          } else {
            callback()
          }
        }
      })
    } else {
      // Note: 必须总是返回一个 callback
      callback()
    }
  }

  handleOk = (e) => {
    e.preventDefault();
    const { form, onNext, contactInfos, licenseUrl } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }

      console.log(values);

      if (!licenseUrl) {
        message.config({
          top: 300,
          duration: 2,
        });
        message.error('请上传营业执照！');
        return
      }

      const fileList = values.logoFileList;
      if (!fileList || fileList.length === 0) {
        message.config({
          top: 300,
          duration: 2,
        });
        message.error('请上传企业logo！');
        return
      }

      const data = {
        licenseUrl,
        ...contactInfos,
        ...values,
        logoUrl: fileList && fileList.length > 0 ? fileList[0].response.resData : ''
      }

      onNext(data)
    })
  }

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleUploadChange = info => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    this.setState({ fileList });
  };


  render() {
    const { form, loading, companyTypes } = this.props
    const { getFieldDecorator } = form

    const options = companyTypes && companyTypes.map(element => {
      return <Option value={element.id} key={element.id}>{element.name}</Option>
    })

    const uploadAction = '/service/dochandler/v1/dochandler/uploadThumbImage';

    return (
      <Form className={styles.form}>
        <FormItem label='企业名称' {...formItemLayout}>
          {getFieldDecorator('companyName', {
            rules: [
              {
                required: true,
                message: '请输入企业名称'
              },
              {
                validator: this.handleCheckCompanyName
              }
            ],
            validateTrigger: 'onBlur'
          })(
            <Input autoComplete="off" placeholder="请输入企业名称" />
          )}
        </FormItem>
        <FormItem label='企业简称' {...formItemLayout}>
          {getFieldDecorator('companyAbbrevication', {
            rules: [
              {
                required: true,
                message: '请输入企业简称'
              }
            ],
          })(
            <Input autoComplete="off" placeholder="请输入企业简称" />
          )}
        </FormItem>
        <FormItem label='企业英文简称' {...formItemLayout}>
          {getFieldDecorator('companyNameEn', {
            rules: [
              {
                required: true,
                message: '请输入企业英文简称'
              },
              {
                pattern: /^([A-Za-z]+\s?)*[A-Za-z]$/,
                message: "请输入英文简称（只能包含英文大小写）"
              },
            ],
          })(
            <Input autoComplete="off" placeholder="请输入企业英文简称" />
          )}
        </FormItem>
        <Form.Item label="企业logo" extra="建议尺寸180*70" {...formItemLayout} required>
          {getFieldDecorator('logoFileList', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload
              name="file"
              action={uploadAction}
              listType="picture"
              onChange={this.handleUploadChange}
              showUploadList={{
                showRemoveIcon: false,
                showDownloadIcon: false
              }}
            >
              <Button>
                <Icon type="upload" /> 点击上传
              </Button>
            </Upload>,
          )}
        </Form.Item>
        <FormItem label='企业类型' {...formItemLayout}>
          {getFieldDecorator('roleId', {
            rules: [
              {
                required: true,
                message: '请选择企业类型'
              }
            ],
          })(
            <Select
              showSearch
              placeholder="请选择企业类型"
              notFoundContent={null}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {options}
            </Select>
          )}
        </FormItem>
        <FormItem label='统一社会信用代码' {...formItemLayout}>
          {getFieldDecorator('certificateCode', {
            rules: [
              {
                required: true,
                message: '请输入你所属企业的统一社会信用代码'
              },
              {
                validator: this.handleCheckCertificateCode
              }
            ],
            validateTrigger: 'onBlur'
          })(
            <Input autoComplete="off" placeholder="请输入你所属企业的统一社会信用代码" />
          )}
        </FormItem>
        <FormItem label='企业法人' {...formItemLayout}>
          {getFieldDecorator('legalName', {
            rules: [
              {
                required: true,
                message: '请输入企业法人'
              }
            ],
          })(
            <Input autoComplete="off" placeholder="请输入企业法人" />
          )}
        </FormItem>
        <FormItem label='注册地址' {...formItemLayout}>
          {getFieldDecorator('registeredAddress', {
            rules: [
              {
                required: true,
                message: '请输入企业注册地址'
              }
            ],
          })(
            <Input autoComplete="off" placeholder="请输入企业注册地址" />
          )}
        </FormItem>
        <FormItem label='企业描述' {...formItemLayout}>
          {getFieldDecorator('description', {
          })(
            <Input.TextArea />
          )}
        </FormItem>
        <Row style={{ marginTop: '50px', textAlign: 'center' }}>
          <Button
            type="primary"
            className={styles.btn}
            onClick={this.handleOk}
            loading={loading.effects['email/createAccount']}
          >
            提交
                        </Button>
        </Row>
      </Form >
    )
  }
}

CompanyInfoForm.propTypes = {
  form: PropTypes.object,
  companyTypes: PropTypes.array,
  contactInfos: PropTypes.object,
  onNext: PropTypes.func,
}

export default CompanyInfoForm
