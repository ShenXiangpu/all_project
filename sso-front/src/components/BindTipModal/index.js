import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Icon } from 'antd'
import BindPhoneSvg from 'assets/bindPhone.svg'
import styles from './index.less'

class BindTipModal extends PureComponent {

  render() {
    const { item = {}, showBindModal, onCancel, ...modalProps } = this.props

    return (
      <Modal {...modalProps} style={{ top: 120 }}>
        <div className={styles.svgDiv}>
          <Icon className={styles.svg} component={BindPhoneSvg} />
        </div>
        <h2 className={styles.title}>
          您还没有绑定手机
        </h2>
        <p className={styles.text} style={{ marginBottom: 0 }}>
          为了您的账号安全,并且能正常使用EDA云平台,请绑定手机号
        </p>
        <p className={styles.text}>
          绑定后可快速登录
        </p>
        <div className={styles.btnDiv}>
          <Button type='primary' className={styles.btn} onClick={showBindModal}>绑定手机</Button>
          <a className={styles.link} onClick={onCancel}>暂不绑定</a>
        </div>
      </Modal>
    )
  }
}

export default BindTipModal
