import React, { PureComponent } from 'react'
import { Button, Modal } from 'antd'
import styles from './CreateResultModal.less'
import { isEqual } from 'lodash-es';

class CreateResultModal extends PureComponent {

  onCreateComplete = (e) => {
    e.preventDefault();
    const { checkCreateComplete } = this.props;
    checkCreateComplete();  // 再次刷新VM列表
  }

  render() {
    const { onOk, ...modalProps } = this.props

    return (
      <Modal
        {...modalProps}
        footer={null}
      >
        <h3 className={styles.title}>IC设计云服务器创建结果</h3>
        <p>请在新打开的页面上进行创建，创建完成后关闭此窗口确认。</p>
        <p className={styles.btns}>
          <Button type="primary" onClick={this.onCreateComplete}>创建完成</Button>
        </p>
      </Modal>
    )
  }
}

export default CreateResultModal
