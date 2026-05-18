import React, { PureComponent } from 'react'
import { Modal, Button, Tooltip, Icon, Spin, Input } from 'antd'
import classnames from 'classnames'
import styles from './ShutdownTip.less'

class ShutdownTip extends PureComponent {
  render() {
    return (
      <div className={styles.tip}>
        <p>
          <Icon type="info-circle" style={{ marginRight: 5 }} />
          当前操作需要实例在关机状态下进行：
        </p>
        <ul>
          <li>避免数据丢失，实例将关机中断您的业务，请仔细确认。</li>
          <li>强制关机可能会导致数据丢失或文件系统损坏，您也可以主动关机后再进行操作。</li>
          <li>强制关机可能需要您等待较长时间，请耐心等待。</li>
        </ul>
      </div>
    )
  }
}

export default ShutdownTip
