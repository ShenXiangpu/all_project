import React, { PureComponent } from 'react';
import { Button, Icon, message } from 'antd';
import styles from './PayModeCheck.less'
import classNames from 'classnames';
import SelectedSvg from 'assets/pay/checkActive.svg';
import { isEqual } from 'lodash-es';

// 支付方式选择：微信、支付宝、网银
class PayModeCheck extends PureComponent {

  handleModeClick = (key, e) => {
    const { setPayMode } = this.props;
    setPayMode(key);
  }

  render() {
    const { mode } = this.props;

    return (
      <div className={styles.main}>
        <p className={styles.title}>请选择支付方式：</p>
        <div className={styles.list}>
          <ul className={styles.mode}>
            <li
              className={isEqual(mode, 'AL') ? classNames(styles.item, styles.selected) : styles.item}
              onClick={e => this.handleModeClick('AL', e)}
            >
              <span className={styles.aliIcon} />
              <span className={styles.name}>支付宝支付</span>
              {isEqual(mode, 'AL') && <Icon className={styles.selectedIcon} component={SelectedSvg} />}
            </li>
            {/* <li
              className={isEqual(mode, 'WX') ? classNames(styles.item, styles.selected) : styles.item}
              onClick={e => this.handleModeClick('WX', e)}
            >
              <span className={styles.wechatIcon} />
              <span className={styles.name}>微信支付</span>
              {isEqual(mode, 'WX') && <Icon className={styles.selectedIcon} component={SelectedSvg} />}
            </li>
            <li
              className={isEqual(mode, 'UN') ? classNames(styles.item, styles.selected) : styles.item}
              onClick={e => this.handleModeClick('UN', e)}
            >
              <span className={styles.bankIcon} />
              <span className={styles.name}>网银支付</span>
              {isEqual(mode, 'UN') && <Icon className={styles.selectedIcon} component={SelectedSvg} />}
            </li> */}
          </ul>
        </div>
      </div >
    )
  }
}

export default PayModeCheck
