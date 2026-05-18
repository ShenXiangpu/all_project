import React from 'react';
import styles from './AuditMsg.less'

class AuditMsg extends React.PureComponent {


  render() {
    return (
      <div className={styles.content}>
        <h1>正在努力审核中...</h1>
        <p>我们会在您提交申请的7个工作日内完成审核，<br />请耐心等待~</p>
        <img src={require('assets/audit.png')} />
      </div>
    )
  }
}

export default AuditMsg
