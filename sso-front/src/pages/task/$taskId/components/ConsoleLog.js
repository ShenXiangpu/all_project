import { isEqual } from 'lodash';
import React, { PureComponent } from 'react';
import { Button, Tooltip } from 'antd'
import styles from './ConsoleLog.less';

class ConsoleLog extends PureComponent {
  state = {
    bottom: '',
  };

  componentDidUpdate(preProps) {
    const { taskJobLog } = this.props;
    const { taskJobLog: old_taskLog } = preProps;
    if (!isEqual(taskJobLog, old_taskLog)) {

      this.setState({ bottom: this.scrollAt() + this.getContentHeight(taskJobLog) })

      if (this.messagesEnd) {
        const scrollHeight = this.messagesEnd.scrollHeight;//里面div的实际高度  2000px
        const height = this.messagesEnd.clientHeight;  //网页可见高度  200px
        const maxScrollTop = scrollHeight - height;
        this.messagesEnd.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
      }
    }
  }

  scrollToTop = () => {
    this.messagesEnd.scrollTop = 0
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollTop = this.state.bottom // Number.MAX_VALUE;
  }

  scrollAt = () => {
    return this.messagesEnd.scrollTop
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
    const { taskJobLog } = this.props;

    return (
      <div className={styles.logWrap} ref={(el) => { this.messagesEnd = el; }}>
        {taskJobLog &&
          <pre>
            <p style={{ marginBottom: 0 }}>{taskJobLog}</p>
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
    )
  }
}

export default ConsoleLog
