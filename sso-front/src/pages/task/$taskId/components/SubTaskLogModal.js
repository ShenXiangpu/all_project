import React, { PureComponent } from 'react'
import { Modal, Button } from 'antd'
import { isEqual } from 'lodash';
import styles from './ConsoleLog.less';

class SubTaskLogModal extends PureComponent {
  state = {
    bottom: '',
  };

  componentDidUpdate(preProps) {
    const { subTaskLog, visible, subTaskWsConnect } = this.props;
    const { subTaskLog: old_taskLog, visible: old_visible } = preProps;
    if (!isEqual(subTaskLog, old_taskLog)) {
      this.setState({ bottom: this.scrollAt() + this.getContentHeight(subTaskLog) })

      if (this.messagesEnd) {
        const scrollHeight = this.messagesEnd.scrollHeight;//里面div的实际高度  2000px
        const height = this.messagesEnd.clientHeight;  //网页可见高度  200px
        const maxScrollTop = scrollHeight - height;
        this.messagesEnd.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
      }
    }

    if (visible && !isEqual(visible, old_visible)) {
      // 延迟执行，避免会出现ws数据接收完，modal窗口才打开
      setTimeout(() => { subTaskWsConnect(visible) }, 500);
    }
  }

  componentWillUnmount() {
    const { subTaskWsClose } = this.props;
    subTaskWsClose();
  }

  scrollToTop = () => {
    this.messagesEnd.scrollTop = 0
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollTop = this.state.bottom // Number.MAX_VALUE;
  }

  scrollAt = () => {
    if (this.messagesEnd) {
      return this.messagesEnd.scrollTop;
    }
  }

  getContentHeight = (content) => {
    const lineCount = content.split(/\r\n|\r|\n/).length
    const realCount = lineCount >= 2 ? lineCount - 2 : 0
    if (realCount === 0) return 0
    const lineHeightCSS = window.getComputedStyle(this.messagesEnd, null).getPropertyValue('line-height')
    const lineHeight = parseInt(lineHeightCSS.replace('px', ''), 10)

    return realCount * lineHeight
  }

  render() {
    const { subTaskLog, ...modalProps } = this.props;

    return (
      <Modal {...modalProps} className={styles.modal}>
        <div className={styles.logWrap} ref={(el) => { this.messagesEnd = el; }}>
          {subTaskLog &&
            <pre>
              <p style={{ marginBottom: 0 }}>{subTaskLog}</p>
            </pre>
          }
          <div className={styles.logControl}>
            <Button type="ghost" icon="caret-up" onClick={this.scrollToTop} />
            <Button type="ghost"
              style={{ marginLeft: '10px' }}
              icon="caret-down"
              onClick={this.scrollToBottom}
            />
          </div>
        </div>
      </Modal>
    )
  }
}

export default SubTaskLogModal
