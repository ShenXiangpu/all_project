import React, { PureComponent } from 'react';
import styles from './style.less'

class LinHelp extends PureComponent {

  render() {
    return (
      <div className={styles.help}>
        <p className={styles.title}>1. 将下载的证书解压缩</p>
        <p className={styles.img}><img src={require('assets/vm/img/lin1.png')} /></p>
        <p className={styles.title}>2. 复制证书文件到指定目录</p>
        <p className={styles.img}><img src={require('assets/vm/img/lin2.png')} /></p>
        <p className={styles.title}>3. 执行命令将证书导入到系统中</p>
        <p className={styles.img}><img src={require('assets/vm/img/lin3.png')} /></p>
      </div>
    );
  }
}

export default LinHelp;
