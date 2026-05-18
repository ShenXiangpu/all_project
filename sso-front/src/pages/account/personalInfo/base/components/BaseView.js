import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';
import styles from './BaseView.less';
import AvatarView from './AvatarView'
import HooksCropperModal from '../components/HooksCropperModal'
import { defaultHeadImg } from 'utils/config'

const FormItem = Form.Item;

class BaseView extends Component {

  state = {
    hooksModalFile: null
  }

  componentDidMount() {
    this.setBaseInfo();
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

  getViewDom = (ref) => {
    this.view = ref;
  };

  handlerSubmit = (event) => {
    event.preventDefault();
    const { currentUser, form: { validateFields, getFieldsValue }, onUpdateInfo } = this.props;
    validateFields(err => {
      if (!err) {
        const data = {
          ...getFieldsValue(),
          id: currentUser.id
        }
        onUpdateInfo(data)
      }
    });
  };

  //校验手机号是否已存在
  handleCheckPhone = (rule, value, callback) => {
    const { currentUser, dispatch } = this.props
    if (value && value !== currentUser.phone) {
      dispatch({
        type: 'app/checkMobile',
        payload: { phone: value },
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

  //校验邮箱是否已存在
  handleCheckEmail = (rule, value, callback) => {
    const { currentUser, dispatch } = this.props
    if (value && value !== currentUser.email) {
      dispatch({
        type: 'app/checkEmail',
        payload: { email: value },
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

  onCheckFile = (file) => {
    const { onOpenModal } = this.props
    this.setState({ hooksModalFile: file })
    onOpenModal()
  }

  render() {
    const { form: { getFieldDecorator }, modalProps, currentUser } = this.props;
    const { hooksModalFile } = this.state

    return (
      <div>
        {currentUser && currentUser.company &&
          <p>
            <label className={styles.company}>{currentUser.company && currentUser.company.companyName}</label>
            <label>{currentUser.group && currentUser.group.groupName}</label>
          </p>
        }
        <div className={styles.baseView} ref={this.getViewDom}>
          <div className={styles.left}>
            <Form layout="vertical" hideRequiredMark>
              <FormItem label="姓名">
                {getFieldDecorator('userName', {
                  rules: [
                    {
                      required: true,
                      message: "请输入用户名",
                    },
                    {
                      pattern: /^\w*[a-zA-Z\u4E00-\u9FA5]+\w*$/,
                      // pattern: /^(?!\d*$)/,
                      message: '用户名可包含英文、数字、汉字或下划线，不能为纯数字',
                    },
                  ],
                })(<Input />)}
              </FormItem>
              <FormItem label="昵称">
                {getFieldDecorator('nickName', {
                  rules: [
                    {
                      required: true,
                      message: "请输入昵称",
                    },
                  ],
                })(<Input />)}
              </FormItem>
              {/* <FormItem label="手机号">
                                {getFieldDecorator('phone', {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入手机号",
                                        },
                                        {
                                            pattern: /^1[3456789]\d{9}$/,
                                            message: "手机号码格式不正确，请重新输入"
                                        },
                                        {
                                            validator: this.handleCheckPhone
                                        }
                                    ],
                                    validateTrigger: 'onBlur'
                                })(
                                    <Input />,
                                )}
                            </FormItem> */}
              <FormItem label="邮箱">
                {getFieldDecorator('email', {
                  rules: [
                    {
                      required: true,
                      message: "请输入邮箱",
                    },
                    {
                      pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                      message: '邮箱格式不正确',
                    },
                    {
                      validator: this.handleCheckEmail
                    }
                  ],
                  validateTrigger: 'onBlur'
                })(
                  <Input />,
                )}
              </FormItem>
              <Button type="primary" onClick={this.handlerSubmit}>保存修改</Button>
            </Form>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={this.getAvatarURL()} onFileChange={this.onCheckFile} />
          </div>
        </div>
        {modalProps.visible && <HooksCropperModal
          modalProps={modalProps}
          uploadedImageFile={hooksModalFile}
        />}
      </div>
    );
  }
}

export default Form.create()(BaseView);
