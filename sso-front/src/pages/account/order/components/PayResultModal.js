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
    const { detail, onOk, ...modalProps } = this.props

    return (
      <Modal
        {...modalProps}
        footer={null}
      >
        <h3 className={styles.title}>支付结果</h3>
        {detail && isEqual(detail.realPrice, 0) ?
          <p>支付完成后关闭此窗口确认。</p>
          :
          <p>请在新打开的页面上进行支付，支付完成后关闭此窗口确认。</p>
        }
        <p className={styles.btns}>
          <Button type="primary" onClick={this.onPayComplete}>支付完成</Button>
          {/* <Button type="ghost" style={{ marginLeft: '20px' }}>支付遇到问题</Button> */}
        </p>
      </Modal>
    )
  }
}

export default PayResultModal
