import { Row, Col, Divider, message } from 'antd';
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import store from 'store';
import styles from './index.less';
import debounce from 'lodash/debounce'
import ModifyPhoneModal from './components/ModifyPhoneModal';
import ResetPasswordModal from './components/ResetPasswordModal';
import BindingPhoneModal from './components/BindingPhoneModal';
import { isEmpty } from 'lodash-es';

const user = store.get('user') || {};
const userPhone = user && user.userInfo && user.userInfo.phone;

@connect(({ app, accountSettings, loading }) => ({ app, accountSettings, loading }))
class AccountSettings extends Component {
  state = {
    modifyPhoneMdlVisible: false,   // 换绑手机号窗口
    resetPwdMdlVisible: false,      // 重置密码窗口
    bindingPhoneMdlVisible: false,  // 绑定手机号窗口（企业用户）
  }

  onShowModifyPhoneModal = () => {
    this.setState({
      modifyPhoneMdlVisible: true
    })
  }

  onShowBingingPhoneModal = () => {
    this.setState({
      bindingPhoneMdlVisible: true
    })
  }

  onShowResetPwdModal = () => {
    this.setState({
      resetPwdMdlVisible: true
    })
  }

  get modifyPhoneMdlProps() {
    const { dispatch, loading } = this.props;
    const { modifyPhoneMdlVisible } = this.state;
    const phoneStar = this.replacePhoneToStar(userPhone);

    return {
      phoneStar,
      visible: modifyPhoneMdlVisible,
      width: 300,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      mask: false,
      confirmLoading: loading.effects['accountSettings/modifyPhone'],
      center: true,
      onOk: data => {
        dispatch({
          type: 'accountSettings/modifyPhone',
          payload: data
        }).then(response => {
          if (response && response.flag) {
            message.success('手机换绑成功');
            // 重新获取用户信息
            dispatch({
              type: 'app/queryCurrentUser',
              payload: {}
            })

            this.setState({ modifyPhoneMdlVisible: false })
            window.location.reload();
          } else {
            message.config({
              top: 100,
              duration: 2,
            });
            message.error(response.errMessage);
          }
        })
      },
      onCloseModal: () => {
        this.setState({ modifyPhoneMdlVisible: false })
      },
      onSendCode: debounce(() => {
        dispatch({
          type: 'accountSettings/send',
          payload: {},
        })
      }, 1000),
      onVerifyPhone: value => {
        return new Promise(function (reslove, reject) {
          dispatch({
            type: 'accountSettings/verifyPhone',
            payload: value,
          }).then(res => {
            if (res && res.flag) {
              reslove(res.flag)
            } else {
              message.config({
                top: 100,
                duration: 2,
              });
              message.error(res.errMessage);

              reject();
            }
          })
        })
      },
      onSendNewPhoneCode: debounce((data) => {
        dispatch({
          type: 'accountSettings/sendToNewPhone',
          payload: {
            phone: data
          },
        })
      }, 1000),
    }
  }

  get resetPwdMdlProps() {
    const { dispatch, loading } = this.props;
    const { resetPwdMdlVisible } = this.state;

    return {
      visible: resetPwdMdlVisible,
      width: 300,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      mask: false,
      title: '手机重置密码',
      confirmLoading: loading.effects['accountSettings/resetPassword'],
      center: true,
      onOk: data => {
        dispatch({
          type: 'accountSettings/resetPassword',
          payload: data
        }).then((response) => {
          if (response && response.flag) {
            message.success('密码重置成功')
            this.setState({ resetPwdMdlVisible: false })
          } else {
            message.config({
              top: 100,
              duration: 2,
            });
            message.error(response.errMessage)
          }
        })
      },
      onCloseModal: () => {
        this.setState({ resetPwdMdlVisible: false })
      },
      onSendCode: (data) => {
        return new Promise(function (reslove, reject) {
          dispatch({
            type: 'accountSettings/resetPwdSend',
            payload: {
              phone: data
            },
          }).then(res => {
            if (res && res.flag) {
              reslove(res.flag)
            } else {
              message.config({
                top: 100,
                duration: 2,
              });
              message.error(res.errMessage);

              reject();
            }
          })
        })
      },
    }
  }

  get bindingPhoneMdlProps() {
    const { dispatch, loading } = this.props;
    const { bindingPhoneMdlVisible } = this.state;

    return {
      visible: bindingPhoneMdlVisible,
      width: 300,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      mask: false,
      title: '绑定手机号',
      confirmLoading: loading.effects['accountSettings/modifyPhone'],
      center: true,
      onOk: data => {
        dispatch({
          type: 'accountSettings/modifyPhone',
          payload: data
        }).then((response) => {
          if (response && response.flag) {
            message.success('手机号绑定成功')
            // 重新获取用户信息
            dispatch({
              type: 'app/queryCurrentUser',
              payload: {}
            })

            this.setState({ bindingPhoneMdlVisible: false });

            window.location.reload();
          } else {
            message.config({
              top: 100,
              duration: 2,
            });
            message.error(response.errMessage)
          }
        })
      },
      onCloseModal: () => {
        this.setState({ bindingPhoneMdlVisible: false })
      },
      onSendCode: (data) => {
        return new Promise(function (reslove, reject) {
          dispatch({
            type: 'accountSettings/bindPhoneSend',
            payload: {
              phone: data
            },
          }).then(res => {
            if (res && res.flag) {
              reslove(res.flag)
            } else {
              message.config({
                top: 100,
                duration: 2,
              });
              message.error(res.errMessage);

              reject();
            }
          })
        })
      },
    }
  }

  replacePhoneToStar = phone => {
    if (phone) {
      return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    }
  }

  render() {
    const phoneStar = this.replacePhoneToStar(userPhone);

    return (
      <div className={styles.main}>
        <Divider />
        <Row>
          <Col span={2}>
            <span>手机号</span>
          </Col>
          <Col span={20}>
            <span style={{ color: '#909090' }}>
              {phoneStar}
            </span>
          </Col>
          <Col span={2}>
            {!isEmpty(userPhone) ?
              <a href="#" onClick={this.onShowModifyPhoneModal}>换绑</a>
              :
              <a href="#" onClick={this.onShowBingingPhoneModal}>绑定</a>
            }
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={2}>
            <span>密码</span>
          </Col>
          <Col span={20}>
          </Col>
          <Col span={2}>
            <a href="#" onClick={this.onShowResetPwdModal}>重置</a>
          </Col>
        </Row>
        <Divider />
        <ModifyPhoneModal {...this.modifyPhoneMdlProps} />
        <ResetPasswordModal {...this.resetPwdMdlProps} />
        <BindingPhoneModal {...this.bindingPhoneMdlProps} />
      </div>
    );
  }
}

export default AccountSettings;
