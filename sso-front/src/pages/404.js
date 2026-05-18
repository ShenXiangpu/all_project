import React from 'react'
import { Icon } from 'antd'
import styles from './404.less'

const Error = () => (
  <div className={styles.errorDiv}>
    <img src={require('assets/404.jpg')} alt="404" />
  </div>
)

export default Error

