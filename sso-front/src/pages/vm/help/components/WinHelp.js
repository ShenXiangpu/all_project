import React, { PureComponent } from 'react';
import styles from './style.less'

class WinHelp extends PureComponent {

  render() {
    return (
      <div className={styles.help}>
        <p className={styles.title}>1. 将下载的证书压缩包解压，打开certs/win目录，双击证书crt文件，点击安装证书</p>
        <p className={styles.img}><img src={require('assets/vm/img/w1.png')} /></p>
        <p className={styles.img}><img src={require('assets/vm/img/w2.png')} /></p>
        <p className={styles.title}>2. 选择存储位置，点击“下一页”</p>
        <p className={styles.img}><img src={require('assets/vm/img/w3.png')} /></p>
        <p className={styles.title}>3. 证书存储，选择“将所有的证书都放入下列存储”，点击“浏览”</p>
        <p className={styles.img}><img src={require('assets/vm/img/w4.png')} /></p>
        <p className={styles.title}>4. 选择“受信任的根证书颁发机构”后，点击“下一页”</p>
        <p className={styles.img}><img src={require('assets/vm/img/w5.png')} /></p>
        <p className={styles.title}>5. 完成</p>
        <p className={styles.img}><img src={require('assets/vm/img/w6.png')} /></p>
      </div>
    );
  }
}

export default WinHelp;
