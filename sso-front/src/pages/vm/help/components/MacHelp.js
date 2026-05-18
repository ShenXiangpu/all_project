import React, { PureComponent } from 'react';
import styles from './style.less'

class MacHelp extends PureComponent {

  render() {
    return (
      <div className={styles.help}>
        <p className={styles.title}>1. 打开钥匙串：启动台，搜索输入“钥匙串” ，单击解锁🔓，输入mac密码解锁“登录”</p>
        <p className={styles.img}><img src={require('assets/vm/img/mac1.jpg')} /></p>
        <p className={styles.img}><img src={require('assets/vm/img/mac2.jpg')} /></p>
        <p className={styles.img}><img src={require('assets/vm/img/mac3.jpg')} /></p>
        <p className={styles.img}><img src={require('assets/vm/img/mac4.jpg')} /></p>
        <p className={styles.title}>2. 打开访达，找到你需要安装的根证书文件</p>
        <p className={styles.img}><img src={require('assets/vm/img/mac5.jpg')} /></p>
        <p className={styles.title}>3. 拖放证书文件至登录右边的空白区域，拖放后如图</p>
        <p className={styles.img}><img src={require('assets/vm/img/mac6.jpg')} /></p>
        <p className={styles.title}>4. 右键此证书 -> 显示简介 -> 信任 -> 使用此证书时 -> 始终信任 -> 点击关闭时会提示输入mac登录密码</p>
        <p className={styles.img}><img src={require('assets/vm/img/mac7.jpg')} /></p>
        <p className={styles.img}><img src={require('assets/vm/img/mac8.jpg')} /></p>
        <p className={styles.img}><img src={require('assets/vm/img/mac9.jpg')} /></p>
        <p className={styles.title}>5. 检查钥匙串“登录”中查看此证书前的红叉变为如下状态即完成根证书安装。</p>
        <p className={styles.img}><img src={require('assets/vm/img/mac10.jpg')} /></p>
      </div>
    );
  }
}

export default MacHelp;
