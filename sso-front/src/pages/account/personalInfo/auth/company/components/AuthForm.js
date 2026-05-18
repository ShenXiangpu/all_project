import React, { Component } from 'react';
import { Button, Form, Input, Select, Row, Col, Upload, Icon, message, Checkbox } from 'antd';
import store from 'store';
import styles from './AuthForm.less';
import isEqual from 'lodash.isequal';

const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
}

const formItemLayout2 = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 12,
  },
}


const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};

class AuthForm extends Component {
  state = {
    loading: false,     // 营业执照图片上传
    licenseUrl: '',     // 营业执照图片的 url 地址
    licenseUrlBase64: '',
    logoLoading: false, // logo的上传状态
    logoUrl: '',        // logo 的 url 地址
    logoUrlBase64: '',
  };

  componentDidMount() {
    const { identityInfo } = this.props;
    if (identityInfo && identityInfo.licenseUrl) {
      this.setState({
        licenseUrl: identityInfo.licenseUrl
      })
    }

    if (identityInfo && identityInfo.logoUrl) {
      this.setState({
        logoUrl: identityInfo.logoUrl
      })
    }
  }

  setBaseInfo = () => {
    const { currentUser, form } = this.props;
    if (currentUser) {
      Object.keys(form.getFieldsValue()).forEach(key => {
        const obj = {};
        obj[key] = currentUser[key] || null;
        form.setFieldsValue(obj);
      });
    }
  };

  getAvatarURL() {
    const { currentUser } = this.props;
    if (currentUser) {
      if (currentUser.headUrl) {
        return currentUser.headUrl;
      }
      const url = defaultHeadImg;
      return url;
    }
    return '';
  }

  handlerSubmit = (event) => {
    event.preventDefault();
    const { form: { validateFields, getFieldsValue }, onUserAuth } = this.props;
    const { licenseUrl, logoUrl } = this.state;

    validateFields(err => {
      if (err)
        return;

      if (!logoUrl) {
        message.config({
          top: 300,
          duration: 2,
        });
        message.error('请上传企业Logo！');
        return
      }

      if (!licenseUrl) {
        message.config({
          top: 300,
          duration: 2,
        });
        message.error('请上传企业营业执照！');
        return
      }


      const data = {
        ...getFieldsValue(),
        licenseUrl,
        logoUrl
      }
      onUserAuth(data)
    });
  };

  onChange = (value) => {
    const { onGetUniversity } = this.props;
    const data = {
      province: value
    }
    onGetUniversity(data);
  }

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只支持上传JPG 、JPEG 、GIF、 PNG格式的图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片必须小于2MB');
    }
    return isJpgOrPng && isLt2M;
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      const fileUrl = info.file.response.resData;
      this.setState({
        licenseUrl: fileUrl
      })

      const file = info.file.originFileObj;
      this.getBase64(file, imgUrl =>
        this.setState({
          licenseUrlBase64: imgUrl,
          loading: false,
        })
      );
    }
  }

  // logo 上传
  handleLogoChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ logoLoading: true });
      return;
    }
    if (info.file.status === 'done') {
      const fileUrl = info.file.response.resData;
      this.setState({ logoUrl: fileUrl });

      const file = info.file.originFileObj;
      this.getBase64(file, imgUrl =>
        this.setState({
          logoUrlBase64: imgUrl,
          logoLoading: false,
        })
      );
    }
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }


  render() {
    const { form: { getFieldDecorator }, currentUser, companyTypes, identityInfo } = this.props;
    const { logoUrlBase64, licenseUrlBase64, loading } = this.state;

    const options = companyTypes && companyTypes.map(element => {
      return <Option value={element.id} key={element.id}>{element.name}</Option>
    })

    const uploadProps = {
      headers: {      //请求头
        "Auth-token": store.get('Token')
      },
      action: '/service/sso-service/sso/identity/uploadICardImg',   //上传图片接口
    }

    return (
      <div id='authForm'>
        <Form {...formItemLayout}>
          <FormItem label='企业名称' >
            {getFieldDecorator('companyName', {
              initialValue: identityInfo.companyName || '',
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
          <FormItem label='企业简称' >
            {getFieldDecorator('companyAbbrevication', {
              initialValue: identityInfo.companyAbbrevication || '',
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
          <FormItem label='企业英文简称' >
            {getFieldDecorator('companyNameEn', {
              initialValue: identityInfo.companyNameEn || '',
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
          <Form.Item label="企业logo" extra="建议尺寸180*70" required>
            <Upload
              {...uploadProps}
              listType="picture-card"
              showUploadList={false}
              beforeUpload={this.beforeUpload}
              onChange={this.handleLogoChange}>
              {logoUrlBase64 || identityInfo.logoUrl ?
                <img src={logoUrlBase64 || identityInfo.logoUrl} alt="avatar" style={{ width: '100%' }} />
                :
                <div>
                  <Icon type={loading ? 'loading' : 'plus'} />
                  <div className="ant-upload-text">上传企业logo</div>
                </div>
              }
            </Upload>
          </Form.Item>
          <FormItem label='企业类型' >
            {getFieldDecorator('roleId', {
              initialValue: identityInfo.roleId || '',
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
          <FormItem label='统一社会信用代码' >
            {getFieldDecorator('certificateCode', {
              initialValue: identityInfo.certificateCode || '',
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
          <FormItem label='企业法人' >
            {getFieldDecorator('legalName', {
              initialValue: identityInfo.legalName || '',
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
          <FormItem label='注册地址' {...formItemLayout2}>
            {getFieldDecorator('registeredAddress', {
              initialValue: identityInfo.registeredAddress || '',
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
          <FormItem label='企业描述' {...formItemLayout2}>
            {getFieldDecorator('description', {
              initialValue: identityInfo.description || '',
            })(
              <Input.TextArea />
            )}
          </FormItem>

          <FormItem
            label="营业执照"
            extra="上传资料要求：请上传最新版三证合一高清彩色版企业营业执照，或加盖红色企业公章的复印件（非电子公章），请确保营业执照完整清晰，便于识别。"
            required
            className={styles.formItem}
          >
            <Upload
              {...uploadProps}
              listType="picture-card"
              showUploadList={false}
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}>
              {licenseUrlBase64 || identityInfo.licenseUrl ?
                <img src={licenseUrlBase64 || identityInfo.licenseUrl} alt="avatar" style={{ width: '100%' }} />
                :
                <div>
                  <Icon type={loading ? 'loading' : 'plus'} />
                  <div className="ant-upload-text">上传企业营业执照</div>
                </div>
              }
            </Upload>
          </FormItem>

          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              initialValue: [],
              rules: [
                {
                  required: true,
                  message: '请确认阅读并同意用户认证服务协议'
                },
              ],
            })(
              <Checkbox.Group>
                <Checkbox value={true}>我已阅读并同意<a target='_blank' rel='noopener noreferrer' href="/agreement/userAuthContract" >《EDA云平台认证服务协议》</a></Checkbox>
              </Checkbox.Group>
            )}
          </Form.Item>

          <Row>
            <Col span={4}></Col>
            <Col span={20}>
              <Button type="primary" onClick={this.handlerSubmit}>提交申请</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Form.create()(AuthForm);
