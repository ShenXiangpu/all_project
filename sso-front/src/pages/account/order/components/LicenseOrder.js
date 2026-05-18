import React, { PureComponent } from 'react';
import Page from 'components/Page';
import { Button, Row, Col, Skeleton } from 'antd'
import VouchersList from './VouchersList';
import styles from './styles.less'
import classNames from 'classnames';
import { isEqual } from 'lodash-es';

// License使用时长订单
class LicenseOrder extends PureComponent {
  componentDidMount() {
    const { from, onInit } = this.props;
    onInit();
  }

  handleClick = (value, e) => {
    e.preventDefault();
    const { onCreateOrder } = this.props;
    onCreateOrder(value);
  }

  handlePayClick = (value, e) => {
    e.preventDefault();
    const { onPayClick } = this.props;
    onPayClick(value);
  }

  handleCompleteClick = (e) => {
    e.preventDefault();
    const { onCompleteClick } = this.props;
    onCompleteClick();
  }


  // 点击代金券选中添加样式
  checkVoucherItem = (e) => {
    const { onCheckVoucherItem } = this.props
    onCheckVoucherItem(e);
  }
  //显示隐藏优惠券
  showVouchers = (e) => {
    const { onShowVouchers } = this.props
    onShowVouchers(e);
  }
  // 测试传入优惠券列表和方法
  get vouchersProps() {

    const { canUseCouponList, currentItemId, isShow, disabled } = this.props
    console.log("this.props", this.props)
    return {
      canUseCouponList,//可使用的优惠券列表
      currentItemId,
      isShow,
      disabled,
      checkVoucherItem: (e) => {//选择优惠券
        this.checkVoucherItem(e)
      },
      showVouchers: (e) => {//显示隐藏优惠券，重置折扣金额
        this.showVouchers(e)
      }
    }
  }
  render() {
    const { licLoading, licenseVData, btnLoading, licenseDetail, isOrdered, orderNum } = this.props;

    const { priceInfo } = licenseDetail

    return (
      <Page inner>
        <Skeleton loading={licLoading}>
          <Row>
            <Col span={18} className={styles.leftCol}>
              <div className={styles.payCard}>
                <div className={styles.hd}>
                  {isOrdered ?
                    <h3 className={styles.title}>订单{orderNum}</h3>
                    :
                    <h3 className={styles.title}>商品清单</h3>
                  }
                </div>
                <div className={styles.bd}>
                  <div className={styles.box}>
                    <div className={styles.inner}>
                      <div className={styles.boxHd}>
                        <div className={styles.title}>
                          License计费
                        </div>
                        <div className={styles.extra}>
                          <span className={styles.cost}>
                            <span className={styles.num}>
                              {licenseDetail && licenseDetail.totalPrice}
                            </span>
                            <span className={styles.unit}>
                              元
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className={styles.boxbd}>

                        {licenseDetail && licenseDetail.itemList &&
                          licenseDetail.itemList.map(ele => (
                            <Row key={ele.id}>
                              <Col span={8}>
                                <div className={styles.panel}>
                                  <div className={styles.text}>
                                    <div className={styles.lb}>
                                      <label>EDA工具厂商：</label>
                                    </div>
                                    <div className={styles.value}>
                                      {ele.vendorName}
                                    </div>
                                  </div>
                                </div>
                              </Col>
                              <Col span={8}>
                                {/* <div className={styles.panel}>
                                  <div className={styles.text}>
                                    <div className={styles.lb}>
                                      <label>使用时长：</label>
                                    </div>
                                    <div className={styles.value}>
                                      {ele.buyDuration} {ele.buyUnit}
                                    </div>
                                  </div>
                                </div> */}
                              </Col>
                              <Col span={8}>
                                <div className={styles.panel}>
                                  <div className={styles.text}>
                                    <div className={styles.lb}>
                                      <label>总价：</label>
                                    </div>
                                    <div className={styles.value}>
                                      {ele.itemTotalPrice} 元
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          ))
                        }

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className={classNames(styles.payCoupon, styles.payCard)}>
              <div className={styles.hd}>
                <h3 className={styles.title}>优惠券</h3>
              </div>
            </div> */}

            </Col>
            <Col span={6} className={styles.side}>
              <div className={styles.inner}>
                <div className={styles.card}>
                  <div className={styles.cardHd}>
                    <div className={styles.cardTitle}>
                      核对订单
                    </div>
                  </div>

                  <div className={styles.cardBd}>
                    <div className={styles.form}>
                      <div className={styles.formText}>
                        <div className={styles.formLabel}>
                          <label>License使用时长计费</label>
                        </div>
                        <div className={styles.formCtrl}>
                          <span className={styles.cost}>
                            <span className={styles.num}>
                              {isEqual(licenseDetail.payStatus, 1) ? priceInfo && priceInfo.rebatePrice : licenseVData && licenseVData.rebatePrice}
                            </span>
                            <span className={styles.unit}>元</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <hr className={styles.hr} />

                    <div className={styles.form}>
                      <div className={styles.formText}>
                        <div className={styles.formLabel}>
                          <label>商品总计：</label>
                        </div>
                        <div className={styles.formCtrl}>
                          <span className={styles.cost}>
                            <span className={styles.num} style={{ fontWeight: 'bold' }}>
                              {isEqual(licenseDetail.payStatus, 1) ? priceInfo && priceInfo.rebatePrice : licenseVData && licenseVData.rebatePrice}
                            </span>
                            <span className={styles.unit}>元</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.form}>
                      <div className={styles.formText}>
                        <div className={styles.formLabel}>
                          <label style={{ fontSize: '14px' }}>代金券抵扣：</label>
                        </div>
                        <div className={styles.formCtrl}>
                          <span className={styles.cost}>
                            <span className={styles.num}> {isEqual(licenseDetail.payStatus, 1) ? priceInfo && priceInfo.couponPrice : licenseVData && licenseVData.couponPrice} </span>
                            <span className={styles.unit}>元</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <hr className={styles.hr} style={{ marginBottom: 0 }} />

                    <div className={styles.form}>
                      <div className={classNames(styles.formText, styles.total)}>
                        <div className={styles.formLabel}>
                          <label>实付金额</label>
                        </div>
                        <div className={styles.formCtrl}>
                          <span className={classNames(styles.cost, styles.costXL)}>
                            <span className={styles.num} style={{ marginBottom: '10px' }}>
                              {isEqual(licenseDetail.payStatus, 1) ? priceInfo && priceInfo.realPrice : licenseVData && licenseVData.realPrice}
                            </span>
                            <span className={styles.unit}>元</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {isEqual(licenseDetail.payStatus, 1) ?
                      <Button type="primary" className={classNames(styles.btn, styles.completeBtn)} onClick={e => this.handleCompleteClick(e)}>支付完成</Button>
                      :
                      (isOrdered && licenseDetail ?
                        <Button loading={btnLoading} type="primary" className={styles.btn} onClick={e => this.handlePayClick(licenseVData.realPrice, e)}>立即支付</Button>
                        :
                        <Button loading={btnLoading} type="primary" className={styles.btn} onClick={e => this.handleClick(licenseVData.realPrice, e)}>提交订单</Button>
                      )
                    }

                    <p className={styles.weaker}>
                      所有消费 (包括购买、续费等）均可开票，订单支付成功后，可前往&nbsp;
                      <a href="#" className={styles.link}>发票管理开票</a>
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          {/* 优惠券 */}
          {!isEqual(licenseDetail.payStatus, 1) ? <VouchersList {...this.vouchersProps} /> : ''}
        </Skeleton>
      </Page>
    )
  }
}

export default LicenseOrder

