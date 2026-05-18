import React, { PureComponent } from 'react'
import { Button, Modal } from 'antd'
import styles from './PayResultModal.less'
import { isEqual } from 'lodash-es';

class PayResultModal extends PureComponent {

  onPayComplete = (e) => {
    e.preventDefault();
    const { checkPayComplete } = this.props;
    checkPayComplete();
  }

  render() {
    const { onOk, ...modalProps } = this.props

    return (
      <Modal
        {...modalProps}
        footer={null}
      >
        <h3 className={styles.title}>充值完成前请不要关闭此窗口</h3>
        <p>请在新打开的页面上完成账户充值。</p>
        <p className={styles.btns}>
          <Button type="primary" onClick={this.onPayComplete}>已完成充值</Button>
          {/* <Button type="ghost" style={{ marginLeft: '20px' }}>支付遇到问题</Button> */}
        </p>
      </Modal>
    )
  }
}

export default PayResultModal
