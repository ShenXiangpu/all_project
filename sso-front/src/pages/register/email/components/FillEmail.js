import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, Icon, Checkbox } from 'antd'
import Link from 'umi/link';
import styles from './fillEmail.less'

const FormItem = Form.Item

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

const formItemLayout2 = {
  labelCol: {
    xs: { span: 18 },
    sm: { span: 9 },
  },
  wrapperCol: {
    xs: { span: 30 },
    sm: { span: 15 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 6,
    },
  },
};

@Form.create()
class FillEmail extends Component {
  componentDidMount() {
    this.verifyImage.src = '/service/sso-service/sso/captcha/getVerify?' + Math.random();
  }

  changeVerifyCode = () => {
    this.verifyImage.src = '/service/sso-service/sso/captcha/getVerify?' + Math.random();  //需要添加随机数，否则新旧图片的地址是一样的，浏览器会默认从缓存中读取数据
  }

  handleOk = (e) => {
    e.preventDefault();
    const { form, onNext } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }

      if (values.vertification && values.vertification.length === 4) {
        //后端：校验验证码后，校验邮箱是否已注册
        onNext(values)
      }
    })
    // this.verifyImage.src = '/service/sso-service/sso/captcha/getVerify?' + Math.random();
  }

  render() {
    const { form, loading, errorMessage } = this.props
    const { getFieldDecorator } = form

    return (
      <div className={styles.content}>
        <Form className={styles.form}>
          <FormItem label='电子邮箱' {...formItemLayout}>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: '请输入你的电子邮箱'
                },
                {
                  pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                  message: '邮箱格式不正确',
                }
              ],
              validateTrigger: 'onBlur'
            })(
              <Input autoComplete="off" placeholder="请输入你的电子邮箱" />
            )}
          </FormItem>
          <Row gutter={24}>
            <Col span={16}>
              <FormItem label='验证码' {...formItemLayout2}>
                {getFieldDecorator('vertification', {
                  rules: [{
                    required: true,
                    message: '请输入验证码'
                  },
                  {
                    pattern: /^\d{4}$/,
                    message: '请输入正确的验证码'
                  }],
                  validateTrigger: 'onBlur'
                })(
                  <Input autoComplete="off" placeholder="请输入验证码" />
                )}

              </FormItem>
            </Col>

            {/* 后端验证码 */}
            <Col span={4} style={{ height: '42px', lineHeight: '42px', paddingLeft: 0, paddingRight: 0 }}>
              <img alt="验证码" style={{ cursor: 'pointer' }} src='/service/sso-service/sso/captcha/getVerify' ref={el => this.verifyImage = el} onClick={this.changeVerifyCode} />
            </Col>
            <Col span={4} style={{ height: '42px', lineHeight: '42px', paddingLeft: 0, paddingRight: 0 }}>
              <a className={styles.aLink} href="#" onClick={this.changeVerifyCode}>换一张</a>
            </Col>
          </Row>

          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              initialValue: [],
              rules: [
                {
                  required: true,
                  message: '请确认阅读并同意注册须知'
                },
              ],
            })(
              <Checkbox.Group>
                <Checkbox value={true}>我已阅读并同意<a target='_blank' rel='noopener noreferrer' href="/agreement/registeContract" >注册须知</a></Checkbox>
              </Checkbox.Group>
            )}
          </Form.Item>

          <Row style={{ textAlign: 'center' }}>
            <Button
              type="primary"
              className={styles.btn}
              onClick={this.handleOk}
              loading={loading.effects.sendValidate}
            >
              下一步
            </Button>
          </Row>
          {errorMessage &&
            <Row style={{ textAlign: 'center' }}>
              <p className={styles.error}><Icon type="close-circle" theme="filled" /><label>{errorMessage}</label></p>
            </Row>}
          <Row style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/register/mobile">个人用户可以使用手机号注册 ></Link>
          </Row>
        </Form>
      </div>
    )
  }
}

FillEmail.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  // onFilterChange: PropTypes.func,
}

export default FillEmail
