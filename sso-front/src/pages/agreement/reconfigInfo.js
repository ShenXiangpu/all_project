import React, { PureComponent } from 'react';
import styles from './index.less';

class ReconfigInfo extends PureComponent {

  render() {
    return (
      <div className={styles.main}>
        <h1 className={styles.title}>实例调整配置费用说明</h1>
        <p className={styles.right}><strong>最近更新时间：2022-01-17</strong></p>
        <p>&nbsp;</p>
        <p><strong>因实例配置在试用阶段，配置调整免费对外开放，暂不收费。</strong></p>
        <p></p>
        <p> &nbsp; </p>
        <p></p>
      </div>
    )
  }
}

export default ReconfigInfo;
