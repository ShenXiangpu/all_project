import React, { PureComponent } from 'react';
import { Row, Col, Select ,Checkbox} from 'antd'
import styles from './styles.less'
import classNames from 'classnames';
import { isEqual } from 'lodash-es';
import moment from 'moment'
// VM订单
class VouchersList extends PureComponent {

    showVouchers = (e) => {
        const { showVouchers} = this.props
        showVouchers(e)
    }


    render() {

        const { disabled,isShow,canUseCouponList, checkVoucherItem, currentItemId,} = this.props
        const checkVoucherItemT = (item) => {
            checkVoucherItem(item)
        }

        const voucherEle = canUseCouponList && canUseCouponList.length > 0 && canUseCouponList.map(item => {
            let moneyStr = item.parValue.toString();
            if (item && item.money && moneyStr.indexOf('.') != -1) {
                item.preMoney = moneyStr.split('.')[0]
                item.beMoney = moneyStr.split('.')[1]
                console.log(item.preMoney, item.beMoney)
            } else {
                item.preMoney = item.parValue
                item.beMoney = ".00"
            }

            return (

                <div className={styles.vouchersConttainer} onClick={() => { checkVoucherItemT(item) }} key={item.id}>
                    <div className={styles.left}>
                        <div className={styles.title}>
                            代金券
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.money}>
                            <div className={styles.mMoney}>
                                <div className={styles.sign}>￥</div>
                                <div className={styles.numLeft}>{item.preMoney}</div>
                                <div className={styles.numRight}>{item.beMoney}</div>
                            </div>
                            {/* <div className={styles.mDetail}>
                                满{item&&item.startValue}元可用
                            </div> */}
                            <div className={styles.mTips}>
                                限单次可用
                            </div>
                        </div>
                        <div className={styles.vname}>
                            {item&&item.typeName}
                        </div>
                        <div className={styles.scope}>
                            适用：{item&&item.scope }
                        </div>
                        <div className={styles.startAndStart}>
                            {item&& moment(item.startTime).format('YYYY/MM/DD')} - {item && moment(item.endTime).format('YYYY/MM/DD')}
                        </div>
                    </div>

                    <div className={isEqual(currentItemId, item.id) ? classNames(styles.itemIcon, styles.actived) : classNames(styles.item, styles.unCheck)}></div>
                </div>
            )
        })

        return (
            <Row>
                <Col span={18} className={styles.leftCol}>
                    <div className={classNames(styles.payCoupon, styles.payCard)}>
                        <div className={styles.hd}>
                            <h3 className={styles.title}>优惠券</h3>
                        </div>
                    </div>
                    <div className={styles.userVoucher}>
                        <Checkbox
                            onChange={this.showVouchers}
                            disabled={disabled}
                        >
                            使用代金券
                        </Checkbox>
                        {/* + <a>兑换</a> */}
                    </div>
                    <div>您有{canUseCouponList && canUseCouponList.length > 0 ? canUseCouponList.length: 0}张与订单中产品相关的代金券</div>
                    {
                        isShow &&
                        <div>
                            <div className={styles.container}>
                                {voucherEle}

                            </div>
                        </div>
                    }
                </Col>
            </Row>

        )
    }
}

export default VouchersList

