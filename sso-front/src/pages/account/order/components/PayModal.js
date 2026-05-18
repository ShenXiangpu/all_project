import React, { PureComponent } from 'react';
import { Modal, Button, Icon, message, Row, Col } from 'antd';
import classNames from 'classnames';
import styles from './PayModal.less'
import BalanceSvg from 'assets/pay/pay-balance.svg'
import OnlineSvg from 'assets/pay/pay-online.svg'
import WechatSvg from 'assets/pay/wechat.svg'
import AliSvg from 'assets/pay/ali.svg'
import BankSvg from 'assets/pay/bank.svg'
import store from 'store';
import { isEmpty, isEqual, values } from 'lodash-es';
import PayModeCheck from './PayModeCheck';

const balance = store.get('balance');  // 余额

// 支付方式（余额支付、在线支付）选择页面
// 仅支持一种支付方式：余额支付、在线支付
class PayModal extends PureComponent {
  state = {
    checked: 'online',  // 当前选择的支付方式，balance：余额支付，online：在线支付
    step: 0,            // 第一步
    mode: 'AL'
  }

  componentDidMount() {
    const { detail } = this.props;
    console.log('detail',detail);
    const { priceInfo } = detail;
    if (!isEmpty(detail) && isEqual(detail.totalPrice, 0)) {
      // 试用或机时抵扣时，只能使用余额计费
      this.setState({ checked: 'balance' })
    }
  }

  componentDidUpdate(preProps) {
    const { amountToPay, visible, detail } = this.props;
    const { amountToPay: old_amountToPay, visible: old_visible, detail: old_detail } = preProps;
    console.log(amountToPay,old_amountToPay)

    if (amountToPay && !isEqual(amountToPay, old_amountToPay)) {
      if (balance) {
        if (balance >= amountToPay && amountToPay > 0) {
          this.setState({ checked: 'balance' })
        } else if (balance > 0 && balance < amountToPay) {
          this.setState({ checked: 'online' })
        }
      }
    }

    if (visible && !isEqual(visible, old_visible)) {
      this.setState({ step: 0 })
    }

    // 试用或机时抵扣时，只能使用余额计费
    if (detail && !isEqual(detail, old_detail) && isEqual(detail.totalPrice, 0)) {
      this.setState({ checked: 'balance' })
    }
  }

  // 切换支付方式
  handleChange = (value) => {
    const { amountToPay } = this.props;
    const { checked } = this.state;

    if (isEqual(checked, 'online')) {
      if (isEqual(value, 'balance')) {
        if (balance >= amountToPay && amountToPay > 0) {
          this.setState({
            checked: 'balance'
          })
        }
      }
    }

    if (isEqual(checked, 'balance')) {
      if (isEqual(value, 'online') && balance >= amountToPay && amountToPay > 0) {
        this.setState({
          checked: 'online'
        })
      }
    }
  }

  handleNext = () => {
    const { checked, step, mode } = this.state;
    const { onOnlinePay } = this.props;
    if (!isEqual(checked, 'balance')) {
      if (isEqual(step, 0)) {
        this.setState({ step: 1 });
      } else {
        if (isEqual(checked, 'online')) { // 单一在线支付方式
          onOnlinePay(['AL']);
        }
      }
    }
  }

  handleBalancePay = () => {
    const { onOnlinePay } = this.props;
    onOnlinePay(['AB']);
  }

  get modeProps() {
    const { mode } = this.state;
    return {
      mode,
      setPayMode: key => {
        this.setState({ mode: key });
      }
    }
  }

  render() {
    const { detail, amountToPay, ...modalProps } = this.props;
    const { checked, step } = this.state;
    return (
      <Modal
        {...modalProps}
        className={styles.modal}
        footer={[
          isEqual(checked, 'balance') ?
            <Button key="submit" type="primary" style={{ width: '100px' }} onClick={this.handleBalancePay}>确认支付</Button>
            :
            <Button key="submit" type="primary" style={{ width: '100px' }} onClick={this.handleNext}>
              {isEqual(step, 0) ? '下一步' : '确认支付'}
            </Button>
        ]}
      >
        {isEqual(step, 0) &&
          <div>
            <div className={styles.title}>
              订单金额：
              <span className={styles.cost}>
                <span className={styles.num}>{amountToPay}</span>
                <span className={styles.unit}>元</span>
              </span>
            </div>

            <div className={styles.option}>
              <div className={styles.itemBox}>
                <div
                  className={
                    detail && isEqual(detail.totalPrice, 0) ?
                      classNames(styles.item, styles.actived)
                      :
                      (balance && balance >= amountToPay ?
                        (isEqual(checked, 'balance') ? classNames(styles.item, styles.actived) : classNames(styles.item, styles.unCheck))
                        : classNames(styles.item, styles.disabled)
                      )
                  }
                  onClick={e => this.handleChange('balance', e)}
                >
                  <div className={styles.content}>
                    <div className={styles.left}>
                      <Icon component={BalanceSvg} style={{ fontSize: '56px' }} />
                    </div>
                    <div className={styles.right}>
                      <div className={styles.header}>
                        <span className={styles.name}>余额支付</span>
                        {((detail && isEqual(detail.totalPrice, 0)) || (balance && balance > 0 && !isEqual(checked, 'online'))) &&
                          <div className={styles.extra}>
                            <span className={styles.payCost}>
                              <span className={styles.weak}>支付：</span>
                              <span className={styles.cost}>
                                <span className={styles.num}>{amountToPay}</span>
                                <span className={styles.unit}>元</span>
                              </span>
                            </span>
                          </div>
                        }
                      </div>
                      <div className={styles.body}>
                        <p className={styles.text}>
                          {balance && balance < amountToPay ?
                            <span className={styles.weak}>
                              账户可用余额 <label style={{ color: 'rgb(255, 114, 0)' }}>{balance}元</label>，余额不够支付，您也可以 对公汇款 充值后在订单管理页进行支付
                            </span>
                            :
                            <span className={styles.weak}>
                              账户可用余额 <label style={{ color: 'rgb(255, 114, 0)' }}>{balance}元</label>，余额足够支付
                            </span>
                          }
                          <span className={styles.weak}>
                            <br />
                            如果您有正在使用中的后付费产品,请保证有足够余额。
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.itemBox}>
                <div
                  className={
                    detail && isEqual(detail.totalPrice, 0) ?
                      classNames(styles.item, styles.disabled)
                      :
                      (isEqual(checked, 'online') || (balance < amountToPay)
                        ? classNames(styles.item, styles.actived) : classNames(styles.item, styles.unCheck)
                      )
                  }
                  onClick={e => this.handleChange('online', e)}
                >
                  <div className={styles.content}>
                    <div className={styles.left}>
                      <Icon component={OnlineSvg} style={{ fontSize: '56px' }} />
                    </div>
                    <div className={styles.right}>
                      <div className={styles.header}>
                        <span className={styles.name}>在线支付</span>
                        {!isEqual(checked, 'balance') && (detail && !isEqual(detail.totalPrice, 0)) &&
                          <div className={styles.extra}>
                            <span className={styles.payCost}>
                              <span className={styles.weak}>支付：</span>
                              <span className={styles.cost}>
                                <span className={styles.num}>{amountToPay}</span>
                                <span className={styles.unit}>元</span>
                              </span>
                            </span>
                          </div>
                        }
                      </div>
                      <div className={styles.body}>
                        <p className={styles.text}>
                          <span className={styles.weak}>
                            支持
                            <Icon component={AliSvg} style={{ fontSize: '18px' }} />
                            <Icon component={WechatSvg} style={{ fontSize: '18px' }} />
                            <Icon component={BankSvg} style={{ fontSize: '18px' }} />
                            多种支付方式
                          </span>
                        </p>
                        <p className={styles.text}>
                          <span className={styles.weak}>
                            如需使用国际信用卡支付，请在微信支付里添加国际卡后支付。&nbsp;
                            <a target="_blank" className={styles.link} href="https://cloud.tencent.com/document/product/555/7444">微信国际卡支付指引</a>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        {isEqual(step, 1) && !isEqual(checked, 'balance') &&
          <div>
            <div className={styles.row}>
              <div className={styles.left}>
                <Icon type="check-circle" theme="filled" className={styles.tipIcon} />
              </div>
              <div className={styles.right}>
                <span className={styles.tip}>您的订单已提交成功，请尽快付款</span>
                <br />
                <span>
                  <span>金额：
                    <span className={styles.cost}>￥{amountToPay}</span>
                  </span>
                </span>
              </div>
            </div>
            <PayModeCheck {...this.modeProps} />
          </div>
        }
      </Modal>
    );
  }
}

export default PayModal
