import React, { Component } from 'react';
import { Button, Form, Input, Select, Radio, Row, Col, Upload, Icon, message, Checkbox } from 'antd';
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
    span: 20,
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
    loading: false,   // 图片上传
    imageUrl: '',     // 上传图片的 url 地址
  };

  componentDidMount() {
    const { identityInfo, saveUploadImgUrl } = this.props;
    if (identityInfo && identityInfo.identityCard) {
      this.setState({
        imageUrl: identityInfo.identityCard
      })
      saveUploadImgUrl(identityInfo.identityCard);
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
    validateFields(err => {
      if (!err) {
        const data = {
          ...getFieldsValue()
        }
        onUserAuth(data)
      }
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
    const { saveUploadImgUrl } = this.props;

    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      const fileUrl = info.file.response.resData;
      saveUploadImgUrl(fileUrl)

      const file = info.file.originFileObj;
      this.getBase64(file, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
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
    const { form: { getFieldDecorator }, currentUser, provinceList, universityList, allUniversityList, identityInfo } = this.props;
    const { imageUrl, loading } = this.state;

    const uploadProps = {
      headers: {      //请求头
        "Auth-token": store.get('Token')
      },
      action: '/service/sso-service/sso/identity/uploadICardImg',   //上传用户身份图片接口
    }

    const nowYear = new Date().getFullYear();

    const provinceArr = identityInfo && allUniversityList && allUniversityList.length > 0
      && allUniversityList.filter(ele => isEqual(ele.id, identityInfo.universityId));
    const selectedProvince = provinceArr && provinceArr.length > 0 && provinceArr[0].province;

    return (
      <div id='authForm' className={styles.form}>
        <Form {...formItemLayout}>
          <FormItem label="真实姓名">
            {currentUser && currentUser.userName}
          </FormItem>

          <FormItem label="学校所在省份">
            {getFieldDecorator('province', {
              initialValue: selectedProvince || '',
              rules: [
                {
                  required: true,
                  message: "请选择省份",
                },
              ]
            })(
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="---请选择省份---"
                optionFilterProp="children"
                onChange={this.onChange}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                getPopupContainer={() => document.getElementById('authForm')}
              >
                {provinceList && provinceList.length > 0 && provinceList.map(item => (
                  <Option value={item} key={item}>{item}</Option>
                ))}
              </Select>
            )}
          </FormItem>

          <FormItem label="学校名称">
            {getFieldDecorator('universityId', {
              initialValue: identityInfo.universityId || '',
              rules: [
                {
                  required: true,
                  message: "请选择学校",
                },
              ]
            })(
              <Select
                showSearch
                style={{ width: 300 }}
                placeholder="---请选择学校---"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                getPopupContainer={() => document.getElementById('authForm')}
              >
                {universityList && universityList.length > 0 && universityList.map(item => (
                  <Option value={item.id} key={item.id}>{item.universityName}</Option>
                ))}
              </Select>
            )}
          </FormItem>

          <FormItem label="所在学院">
            {getFieldDecorator('college', {
              initialValue: identityInfo.college || '',
              rules: [
                {
                  required: true,
                  message: "请填写您所在学院",
                },
              ]
            })(
              <Input style={{ width: 300 }} />
            )}
          </FormItem>

          <FormItem label="职称">
            {getFieldDecorator('title', {
              initialValue: identityInfo.title || 1,
              rules: [
                {
                  required: true,
                  message: "请选择职称",
                },
              ]
            })(
              <Radio.Group>
                <Radio value={1}>教授</Radio>
                <Radio value={2}>副教授</Radio>
                <Radio value={3}>讲师</Radio>
              </Radio.Group>
            )}
          </FormItem>

          <FormItem
            label="教师证"
            extra="请上传教师身份认证证书，确保证件信息清晰可见"
            required
          >
            <Upload
              {...uploadProps}
              listType="picture-card"
              showUploadList={false}
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}>
              {imageUrl ?
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                :
                <div>
                  <Icon type={loading ? 'loading' : 'plus'} />
                  <div className="ant-upload-text">上传教师身份认证证书</div>
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
