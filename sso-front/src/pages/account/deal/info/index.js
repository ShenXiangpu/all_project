import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Page from 'components/Page';
import { Button, Row, Col, Breadcrumb, Icon, Modal, message } from 'antd'
import Link from 'umi/link';
import styles from './style.less';
import classNames from 'classnames';
import { isEqual, isEmpty } from 'lodash-es';
import ToPaySvg from 'assets/order/toPay.svg';
import CancelSvg from 'assets/order/cancel.svg';
import DoneSvg from 'assets/order/done.svg';
import List from './components/List';
import LicenseList from './components/LicenseList';
import StorageList from './components/StorageList'
import { router } from 'umi';
const { confirm } = Modal

// 订单详情
@connect(({ deal, loading }) => ({ deal, loading }))
class OrderDetailInfo extends PureComponent {

  componentDidMount() {
    const { location, dispatch } = this.props;
    const query = location.query;
    const orderNum = query.orderNum;
    const orderType = query.orderType;

    // 根据订单号查询详情
    if (orderNum && !isEmpty(orderNum) && orderType && !isEmpty(orderType)) {
      if (isEqual(orderType, 'reconfig')) {
        // 升降配订单
        dispatch({
          type: 'deal/getVmReconfigDetailByNum',
          payload: {
            orderNum
          }
        })
      } else if (isEqual(orderType, 'vmware') || isEqual(orderType, 'storage')) {
        // VM 新购订单
        dispatch({
          type: 'deal/getVmDetailByNum',
          payload: {
            orderNum
          }
        })
      } else if (isEqual(orderType, 'license')) {
        // license 订单
        dispatch({
          type: 'deal/getLicenseDetailByNum',
          payload: {
            orderNum
          }
        })
      }
    }
  }

  get listProps() {
    const { dispatch, deal, loading } = this.props;
    const { vmDetail } = deal;

    return {
      dataSource: [vmDetail],
      loading: loading.effects['deal/getVmDetailByNum'],
    }
  }

  get licenseProps() {
    const { dispatch, deal, loading } = this.props;
    const { licenseDetail } = deal;

    return {
      dataSource: [licenseDetail],
      loading: loading.effects['deal/getLicenseDetailByNum'],
    }
  }

  handlePayClick = e => {
    e.preventDefault();
    const { location } = this.props;
    const query = location.query;
    const orderNum = query.orderNum;
    const orderType = query.orderType;

    const type = isEqual(orderType, 'license') ? 'license' : 'vm'
    router.push(`/account/order?from=deal&&type=${type}&&orderNum=${orderNum}&&orderType=${orderType}`);
  }

  // 取消订单
  handleCancelOrder = e => {
    e.preventDefault();
    const { location, dispatch } = this.props;
    const query = location.query;
    const orderNum = query.orderNum;
    const orderType = query.orderType;

    confirm({
      title: '提示',
      content: `是否取消订单 ${orderNum}`,
      okText: '确定',
      cancelText: '取消',
      width: 500,
      onOk: () => {
        dispatch({
          type: 'deal/cancelOrder',
          payload: { orderNum }
        }).then(response => {
          if (response && response.flag) {
            message.success('订单取消成功！');
            if (isEqual(orderType, 'license')) {// license订单详情
              dispatch({
                type: 'deal/getLicenseDetailByNum',
                payload: {
                  orderNum
                },
              })
            } else if (isEqual(orderType, 'reconfig')) {// VM升降配订单详情
              dispatch({
                type: 'deal/getVmReconfigDetailByNum',
                payload: {
                  orderNum
                },
              })
            } else if (isEqual(orderType, 'vmware')) {// VM订单详情
              dispatch({
                type: 'deal/getVmDetailByNum',
                payload: {
                  orderNum
                },
              })
            }
          } else {
            message.config({
              top: 100,
              duration: 2,
            });
            message.error(response.errMessage)
          }
        })
      },
    })
  }

  render() {
    const { deal, location } = this.props;
    const { vmDetail, licenseDetail } = deal;
    const query = location.query;
    const orderType = query.orderType;

    const detail = orderType && isEqual(orderType, 'license') ? licenseDetail : vmDetail;

    return (
      <Page inner>
        <Breadcrumb style={{ marginBottom: '5px' }} separator=">">
          <Breadcrumb.Item>
            <Link to='/account/deal'>订单管理</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>订单详情</Breadcrumb.Item>
        </Breadcrumb>

        {/* 待支付订单 */}
        {detail && isEqual(detail.payStatus, 0) &&
          <div className={styles.header}>
            <div className={styles.col}>
              <Icon component={ToPaySvg} className={styles.icon} />
              <span className={classNames(styles.title, styles.price)}>
                待支付
              </span>
              <span>
                实付金额：
                <span className={classNames(styles.price, styles.priceSpace)}>{detail && detail.totalPrice} 元</span>
              </span>
              <span>
                请在
                <span className={styles.danger}> {detail && detail.payTimeExpire} 前完成支付</span>
                ，逾期订单及对应优惠将自动取消
              </span>
            </div>
            <div>
              <Button type="primary" className={styles.sureBtn} onClick={this.handlePayClick}>立即付款</Button>
              <Button type="ghost" onClick={this.handleCancelOrder}>取消订单</Button>
            </div>
          </div>
        }

        {/* 已完成订单 */}
        {detail && isEqual(detail.payStatus, 1) &&
          <div className={styles.header}>
            <div className={styles.col}>
              <Icon component={DoneSvg} className={styles.icon} />
              <span className={classNames(styles.title, styles.price)} style={{ color: '#52c41a' }}>
                已完成
              </span>
              <span>
                实付金额：
                <span className={classNames(styles.price, styles.priceSpace)}>{detail && detail.totalPrice} 元</span>
              </span>
            </div>
            <div>
              {/* <Button type="danger" ghost>删除订单</Button> */}
            </div>
          </div>
        }

        {/* 已过期订单 */}
        {detail && isEqual(detail.payStatus, 3) &&
          <div className={styles.header}>
            <div className={styles.col}>
              <Icon component={CancelSvg} className={styles.icon} />
              <span className={classNames(styles.title, styles.price)} style={{ color: '#000' }}>
                已过期
              </span>
              <span>
                实付金额：
                <span className={classNames(styles.price, styles.priceSpace)}>{detail && detail.totalPrice} 元</span>
              </span>
              <span>
                未在 2021-11-20 15:59:58 前完成支付，订单已过期。
              </span>
            </div>
            <div>
              {/* <Button type="danger" ghost>删除订单</Button> */}
            </div>
          </div>
        }

        {/* 失效订单：包括手动取消、超时取消、支付失败等 */}
        {
          detail && isEqual(detail.payStatus, 2) &&
          <div className={styles.header}>
            <div className={styles.col}>
              <Icon component={CancelSvg} className={styles.icon} />
              <span className={classNames(styles.title, styles.price)} style={{ color: '#000' }}>
                失效订单
              </span>
              <span>
                实付金额：
                <span className={classNames(styles.price, styles.priceSpace)}>{detail && detail.totalPrice} 元</span>
              </span>
            </div>
            <div>
              {/* <Button type="danger" ghost>删除订单</Button> */}
            </div>
          </div>
        }

        <div className={styles.boxbd}>
          <Row>
            <Col span={12}>
              <div className={styles.panel}>
                <div className={styles.text}>
                  <div className={styles.lb}>
                    <label>订单号：</label>
                  </div>
                  <div className={styles.value}>
                    {detail && detail.orderNum}
                  </div>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className={styles.panel}>
                <div className={styles.text}>
                  <div className={styles.lb}>
                    <label>订单类型：</label>
                  </div>
                  <div className={styles.value}>
                    {detail && detail.orderBigTypeName}{detail && detail.orderSmallTypeName && <span>（{detail.orderSmallTypeName}）</span>}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <div className={styles.panel}>
                <div className={styles.text}>
                  <div className={styles.lb}>
                    <label>订单创建人：</label>
                  </div>
                  <div className={styles.value}>
                    {detail && detail.createByName}
                  </div>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className={styles.panel}>
                <div className={styles.text}>
                  <div className={styles.lb}>
                    <label>创建时间：</label>
                  </div>
                  <div className={styles.value}>
                    {detail && detail.createTime}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <div className={styles.panel}>
                <div className={styles.text}>
                  <div className={styles.lb}>
                    <label>付款时间：</label>
                  </div>
                  <div className={styles.value}>
                    {detail && detail.payTime || '--'}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className={styles.orderWrap}>
          <h3>订单信息</h3>
          {orderType && !isEmpty(detail) &&
            <div>
              {isEqual(orderType, 'vmware') && <List {...this.listProps} />}
              {isEqual(orderType, 'license') && <LicenseList {...this.licenseProps} />}
              {isEqual(orderType, 'storage') && <StorageList {...this.listProps} />}
            </div>
          }
        </div>

      </Page >
    )
  }
}

export default OrderDetailInfo
