import React, { PureComponent } from 'react'
import { Button, Modal } from 'antd'
import styles from './BuyResultModal.less'

class BuyResultModal extends PureComponent {

  onBuyComplete = (e) => {
    e.preventDefault();
    const { checkBuyComplete } = this.props;
    checkBuyComplete();  // 再次获取存储容量
  }

  render() {
    const { onOk, ...modalProps } = this.props

    return (
      <Modal
        {...modalProps}
        footer={null}
      >
        <h3 className={styles.title}>存储扩容结果</h3>
        <p>请在新打开的页面上进行扩容，完成扩容后关闭此窗口确认。</p>
        <p className={styles.btns}>
          <Button type="primary" onClick={this.onBuyComplete}>扩容完成</Button>
        </p>
      </Modal>
    )
  }
}

export default BuyResultModal
