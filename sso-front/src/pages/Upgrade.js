import React from 'react'
import styles from './404.less'

const Upgrade = () => (
  <div className={styles.errorDiv}>
    <img src={require('assets/upgrade.gif')} alt="系统升级维护中..." />
  </div>
)

export default Upgrade

