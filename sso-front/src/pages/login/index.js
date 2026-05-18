import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input, Icon } from 'antd'
import { Encrypt } from 'utils/secret.js'
import styles from './index.less'
import { isEmpty, isEqual } from 'lodash-es'
import { Debounce } from 'lodash-decorators';

const FormItem = Form.Item

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    span: 22,
  },
};

@connect(({ loading, login }) => ({ loading, login }))
@Form.create()
class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loginMode: 'phone',  // 登录方式：手机号登录、账号密码登录，默认手机号
      deadline: 60,        // 发送验证码倒计时
      isShowBac: false,
      ua: false,
    }
    this.timer = null;
  }
  //
  componentDidMount() {
    const { location: { pathname }, dispatch } = this.props;
    const ua = navigator.userAgent.toLowerCase();
    let isWeixin = ua.match(/MicroMessenger/i) == "micromessenger";
    this.setStateValue('ua', isWeixin)
    let search = location.search;
    let isPath = !isEqual(search.indexOf('partner_enroll'), -1)
    if (isPath && isWeixin) {
      this.setStateValue('isShowBac', true)
    } else {
      this.setStateValue('isShowBac', false)
    }

  }

  setStateValue = (key, value) => {
    this.setState({
      [`${key}`]: value
    })
  }
  componentDidUpdate(preProps) {
    const { errorMessage } = this.props.login;
    const { errorMessage: old_errorMessage } = preProps.login;
    if (errorMessage && !isEqual(errorMessage, old_errorMessage)) {
      this.setState({ deadline: 60 })
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  handleGetCode = () => {
    const { dispatch, form: { getFieldValue } } = this.props;
    const phone = getFieldValue('phone');
    if (phone) {
      // 获取验证码
      dispatch({
        type: 'login/send',
        payload: {
          phone
        }
      }).then(response => {
        if (response && response.flag) {
          //倒计时
          this.setState({ deadline: 60 })
          this.timeLimit(60)
        }
      })
    }
  }

  timeLimit = (count) => {
    const that = this
    this.timer = setInterval(function () {
      if (count >= 0) {
        count -= 1;
        that.setState({ deadline: count });
      }
    }, 1000)
  }

  @Debounce(1000)
  handleOk = (e) => {
    e.preventDefault();
    clearInterval(this.timer);

    const { dispatch, form } = this.props
    const { validateFieldsAndScroll } = form
    const { loginMode } = this.state;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }

      if (isEqual(loginMode, 'phone')) {
        dispatch({
          type: 'login/loginUserByPhone',
          payload: values
        })
      } else {
        const pwd = values.password;
        const encryptPwd = Encrypt(pwd);
        dispatch({
          type: 'login/loginUserByAccount',
          payload: {
            userName: values.userName,
            password: encryptPwd
          },
        })
      }

    })
  }

  onChangeLoginMode = () => {
    const { loginMode } = this.state;
    this.setState({
      loginMode: isEqual(loginMode, 'phone') ? 'account' : 'phone'
    })
  }

  render() {
    const { loading, form, login: { errorMessage } } = this.props
    const { getFieldDecorator } = form;
    const { loginMode, deadline, isShowBac, ua } = this.state;

    return (
      <>
        {
          !isShowBac ?
            <div className={styles.content}>
              <div className={styles.loginBg}>
              </div>
              <div className={styles.contentLayout}>
                <div className={styles.left}>
                  <div className={styles.description}>
                    {/* <a href="http://172.18.0.103:8091/" target="_blank" title="高性能EDA业务平台" ref="noopener norefferrer"> */}
                    <a href="#" target="_blank" title="高性能EDA平台" ref="noopener norefferrer">
                      {/* <img src={require('assets/eda.png')} /> */}
                      <img src={require('assets/title.png')} />
                    </a>
                  </div>
                </div>
                <div className={styles.form}>
                  <img className={styles.logo} src={require('assets/title.png')} />
                  <div className={styles.loginBox}>
                    <h1>高性能EDA平台</h1>
                    {!errorMessage ?
                      <div className={styles.loginTitle}>
                        {isEqual(loginMode, 'phone') ? '验证码登录' : '账号密码登录'}
                      </div>
                      :
                      <div className={styles.errorMsg}>
                        <Icon type="minus-circle" theme="filled" /><label>{errorMessage}</label>
                      </div>
                    }

                    {/* 手机号登录 */}
                    {isEqual(loginMode, 'phone') &&
                      <>
                        <FormItem>
                          {getFieldDecorator('phone', {
                            rules: [
                              {
                                required: true,
                                message: "请输入手机号码"
                              },
                              {
                                pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                                message: '手机号格式不正确',
                              },
                            ],
                          })(
                            <Input
                              // prefix={<Icon type="phone" style={{ color: '#1890ff' }} />}
                              onPressEnter={this.handleOk}
                              placeholder="请输入手机号码"
                            />
                          )}
                        </FormItem>
                        <FormItem>
                          {getFieldDecorator('smsCode', {
                            rules: [
                              {
                                required: true,
                                message: "请输入短信验证码"
                              },
                            ],
                          })(
                            !isEqual(deadline, 60) && deadline >= 0 ?
                              <Input
                                suffix={`${deadline}s后重新发送`}
                                onPressEnter={this.handleOk}
                              />
                              :
                              <Input.Search
                                // prefix={<Icon type="lock" style={{ color: '#1890ff' }} />}
                                onPressEnter={this.handleOk}
                                placeholder="验证码"
                                enterButton='获取验证码'
                                onSearch={this.handleGetCode}
                              />
                          )}
                        </FormItem>
                      </>
                    }

                    {/* 账号密码登录 */}
                    {isEqual(loginMode, 'account') &&
                      <>
                        <FormItem>
                          {getFieldDecorator('userName', {
                            rules: [
                              {
                                required: true,
                                message: "请输入账户名"
                              },
                            ],
                          })(
                            <Input
                              prefix={<Icon type="user" style={{ color: '#1890ff' }} />}
                              onPressEnter={this.handleOk}
                              placeholder="邮箱/手机号"
                            />
                          )}
                        </FormItem>
                        <FormItem>
                          {getFieldDecorator('password', {
                            rules: [
                              {
                                required: true,
                                message: "请输入密码"
                              },
                            ],
                          })(
                            <Input
                              prefix={<Icon type="lock" style={{ color: '#1890ff' }} />}
                              type="password"
                              onPressEnter={this.handleOk}
                              placeholder="密码"
                            />
                          )}
                        </FormItem>
                      </>
                    }

                    <Row>
                      <Button
                        type="primary"
                        onClick={this.handleOk}
                        loading={loading.effects.login}
                      >
                        登录
                      </Button>
                    </Row>

                    {isEqual(loginMode, 'phone') ?
                      <div className={styles.links}>
                        <a onClick={this.onChangeLoginMode} >
                          账号密码登录
                        </a>
                      </div>
                      :
                      <div className={styles.links}>
                        <a onClick={this.onChangeLoginMode} >
                          验证码登录
                        </a>
                        <a href="/password_find" target="_blank">忘记密码</a>
                      </div>
                    }

                    <p>
                      <span>注册登录即表示同意 </span>
                      <a target='_blank' rel='noopener noreferrer' href="/agreement/registeContract" >用户协议 、 隐私政策</a>
                    </p>
                    {/* <div className={styles.links}>
                <a href="http://47.105.223.151/eda/login" target="_blank">arose平台登录</a>
                <a href="http://124.135.23.222:8081/eda/login" >arose平台登录</a>
                <a href="/password_find" target="_blank">忘记密码</a>
                <a href="/register/mobile" target="_blank">免费注册</a>
              </div> */}

                  </div>
                </div>
              </div>
            </div> :
            <div className={styles.tips}>
              检测到您正在使用应用内置浏览器<br />
              请切换到手机浏览器访问
            </div>
        }

      </>

    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Login
