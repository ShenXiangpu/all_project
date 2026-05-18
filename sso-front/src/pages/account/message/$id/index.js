import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Icon, Skeleton, Empty, Button } from 'antd';
import Page from 'components/Page';
import styles from './index.less';
import { isEmpty, isEqual } from 'lodash-es';
import moment from "moment";

@connect(({ app, msg, loading }) => ({ app, msg, loading }))
class MessageDetail extends PureComponent {
  state = {

  }
  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props;
    dispatch({
      type: 'msg/queryById',
      payload: {
        id
      },
    })
    // 请求

    dispatch({
      type: 'msg/canReceive',
      payload: {
        msgId:id
      },
    })


  }

  componentDidUpdate(prevProps, prevState) {
    const { msg: { currentItem }, dispatch } = this.props;
    const { currentItem: old_currentItem } = prevProps.msg;
    if (currentItem && !isEqual(currentItem, old_currentItem)) {
      if (currentItem && currentItem.length > 0) {
        const status = currentItem[0].msgStatus;

        // 如果消息未读，标记为已读
        if (isEqual(status, '0')) {
          dispatch({
            type: 'msg/update',
            payload: {
              id: currentItem[0].id,
              msgStatus: '1'
            },
          })
        }
      }
    }
  }

  getCoupons = (typeId) => {
    const {  msg: { canUseCouponsList },match: { params: { id } },dispatch } = this.props;
    dispatch({
      type: 'msg/receiveCoupons',
      payload: {
        typeId,
        msgId:id,
        canUseCouponsList
      },
    })
  }


  render() {
    const { msg: { currentItem, canUseCouponsList }, loading } = this.props;
    const msgLoading = loading.effects['msg/queryById'];
    return (
      <Page inner>
        <div className={styles.main}>
          <p className={styles.back}>
            <a href="/account/message">
              <Icon type="arrow-left" style={{ fontSize: '16px' }} />
            </a>
            {currentItem && currentItem.length > 0 &&
              <span className={styles.font}>{currentItem[0].msgTitle}</span>
            }
          </p>
          <div className={styles.wrap}>
            <Skeleton loading={msgLoading}>
              {currentItem && currentItem.length > 0 ?
                <div className={styles.info}>
                  <h2>{currentItem[0].msgTitle}</h2>
                  <pre>
                    {currentItem[0].msgInfo}
                    { canUseCouponsList && canUseCouponsList.length > 0 ? <div className={styles.couponsContainer}>
                      {
                        canUseCouponsList && canUseCouponsList.length > 0 && canUseCouponsList.map(item => {

                          return (
                            <div className={styles.couponsItem} key={item.id}>
                              <div className={styles.top}>
                                <div className={styles.itemTop}>
                                  <div className={styles.topLeft}>EDA云平台优惠券</div>
                                  <div className={styles.topRight}>领取时间:{moment(item.startTime).format('MM.DD') || isEmpty}-{ moment(item.endTime).format('MM.DD') || isEmpty}</div>
                                </div>
                                <div className={styles.couponSection}>
                                  <div className={styles.secLeft}>
                                    <div>
                                      <div className={styles.secLeft_a}>
                                        <span className={styles.moneySign}>￥</span>
                                        <span className={styles.money}>{item.parValue}元</span>
                                      </div>
                                    </div>
                                    <div>
                                      <span className={styles.text}>{item.name}</span>
                                    </div>
                                  </div>
                                  <div className={styles.secRight}>使用范围</div>
                                  <div className={styles.secRight}>{item.scopeString}</div>
                                </div>

                              </div>

                              {/* 点击领取， */}
                              {
                                isEqual(item.status, 1) ? <div className={styles.couponsBottom } onClick={() => this.getCoupons(item.typeId)}>立即领取</div>:isEmpty
                              }
                              {
                                isEqual(item.status, 2) ? <div className={styles.couponsBottomClick} >已经领取</div>:isEmpty
                              }
                              {
                                isEqual(item.status, 3) ? <div className={styles.couponsBottomClick} >已经过期</div>:isEmpty
                              }

                            </div>
                          )
                        })
                      }


                    </div> : ""}

                  </pre>
                </div>
                :
                <Empty />
              }
            </Skeleton>
          </div>


        </div>
      </Page>
    )
  }
}

export default MessageDetail;
