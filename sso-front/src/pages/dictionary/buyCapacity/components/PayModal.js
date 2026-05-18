import React, { PureComponent } from 'react'
import { Button, Modal, Row, Col, Radio, Icon } from 'antd'
import styles from './PayModal.less'
import classNames from 'classnames';
import store from 'store';
import { isEqual } from 'lodash-es';
const balance = store.get('balance');  // 余额
// const balance = 70;
class PayModal extends PureComponent {

  state = {
    value: 0,
    capatityId: 0,
    loading: false,//立即支付进入loading
  }

  onChange = e => {
    let value = e.target.value
    const { capacityList, checked } = this.props
    capacityList && capacityList.length > 0 && capacityList.forEach(item => {
      if (item.id === value) {
        this.setState({
          capatityId: item.id
        });
        const payMoney = item.yearPrice
        if (balance >= payMoney) {
          const propsValue = {
            payMoney,
            payLoading: false,
            isBalance: true,
            checked
          }
          this.props.handlerChange(propsValue)
        } else {
          const propsValue = {
            payMoney,
            payLoading: false,
            isBalance: false,
            checked
          }
          this.props.handlerChange(propsValue)
        }

        return
      }
    });

  };

  //点击支付方式
  handleModeClick = (value) => {

    const { isBalance, capacityItem, checked, payMoney, payLoading, } = this.props;

    if (isEqual(checked, 'online')) {
      if (isEqual(value, 'balance')) {
        if (isBalance) {
          const propsValue = {
            checked: 'balance',
            payMoney,
            payLoading,
            isBalance,
          }
          this.props.handlerChange(propsValue)
        }
      }
    }

    if (isEqual(checked, 'balance')) {
      if (isEqual(value, 'online')) {
        if (capacityItem.yearPrice != 0) {
          const propsValue = {
            checked: 'online',
            payMoney,
            payLoading,
            isBalance,
          }
          this.props.handlerChange(propsValue)
        }

      }
    }
  }
  // 生成预订单
  createCaPayOrder = () => {
    const { createPayOrder, capacityItem, payMoney, checked, isBalance, closable } = this.props;
    const { capatityId } = this.state;
    let flavorId = 0;
    if (capatityId && !isEqual(capatityId, 0)) {
      flavorId = capatityId
    } else {
      flavorId = capacityItem.id
    }
    // const payMoney = capacityItem.yearPrice;
    const propsValue = {
      payMoney,
      payLoading: true,
      checked,
      closable: false,
      isBalance
    }
    this.props.handlerChange(propsValue)
    // ((balance > 0 && || isEqual(payMoney,0))) && payMoney <= balance ?  createPayOrder(flavorId, ['AB']): createPayOrder(flavorId, ['AL'])
    isEqual(checked, 'balance') ? createPayOrder(flavorId, ['AB']) : createPayOrder(flavorId, ['AL'])
  }


  render() {

    const { capacityList, capacityItem, payMoney, payLoading, isBalance, checked, ...modalProps } = this.props;
    console.log(isBalance, 'isBalance')

    // const {  loading } = this.state;


    return (
      <Modal
        {...modalProps}
      >

        <div>
          {/* <Row>
            <Col span={6} >
              当前账号：
            </Col>
            <Col span={18}>
              18363971268
            </Col>
          </Row> */}
          {/* <Row>
            <Col span={6} >
              容量套餐：
            </Col>
            <Col span={18}>
              日期
            </Col>
          </Row> */}
          <Row>
            <Col span={6} > 容量套餐：</Col>
            <Col span={18}>
              <Radio.Group defaultValue={capacityItem.id} onChange={this.onChange}>
                {capacityList && capacityList.length > 0 && capacityList.map((item) => {
                  return (
                    <Radio value={item.id} key={item.id}>
                      <div>
                        <div>{item.flavorName}  </div>
                        <div>
                          <span>{item.yearPrice}</span><span>元/年</span>
                        </div>
                      </div>
                    </Radio>
                  )
                })}

              </Radio.Group>
            </Col>
          </Row>
          <Row>
            {/*
              余额支付和支付宝支付
              余额充足优先使用余额支付，余额不足不能使用，默认使用支付宝支付，不能选择余额支付
              点击立即支付获取余额，并比较余额，显示余额样式
              切换套餐比较余额，确认余额样式


            */}
            {/* <Col span={6} >
              支付方式：
            </Col>
            <Col span={18}>
              <div className={styles.list}>
                <ul className={styles.mode}>
                  <li
                    className={isEqual(isBalance, true) && isEqual(checked, 'balance') ? classNames(styles.item, styles.actived) : classNames(styles.item, styles.unCheck)}
                    onClick={e => this.handleModeClick('balance', e)}
                  >
                    <span className={styles.name}>余额支付</span>
                    <span>{balance}</span>

                  </li>
                  <li
                    className={isEqual(isBalance, false) || isEqual(checked, 'online') ? classNames(styles.item, styles.actived) : classNames(styles.item, styles.unCheck)}
                    onClick={e => this.handleModeClick('online', e)}
                  >
                    <span className={styles.aliIcon} />
                    <span className={styles.name}>支付宝支付</span>
                  </li>
                </ul>
              </div>
            </Col> */}
          </Row>
          <Row>
            <Col span={6} >
              支付金额：
            </Col>
            <Col span={18}>
              <span className={styles.payMoney}>{payMoney || capacityItem.yearPrice}</span>
              元
            </Col>
          </Row>
          <Row>
            <Col span={6} >

            </Col>
            <Col span={18}>
              <div className={styles.payNow}>
                <Button type="primary" shape="round" loading={payLoading} onClick={() => this.createCaPayOrder()}>立即支付</Button>
              </div>
            </Col>
          </Row>

        </div>
      </Modal>
    )
  }
}

export default PayModal
