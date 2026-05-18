import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import Page from 'components/Page';
import LicenseList from './components/LicenseList';
import styles from './style.less'
import { Row, Col } from 'antd';

// 订单管理
@connect(({ licensePay, loading }) => ({ licensePay, loading }))
class LicenseToPay extends PureComponent {

  componentDidMount() {
    this.handleQuery();
  }

  handleQuery = values => {
    const { dispatch, loading } = this.props;
    dispatch({
      type: 'licensePay/getLicenseDebt',
      payload: {
        ...values,
      }
    })
  }

  get listProps() {
    const { dispatch, licensePay, loading } = this.props;
    const { debtList } = licensePay;

    return {
      dataSource: debtList && debtList.itemList || [],
      loading: loading.effects['licensePay/getLicenseDebt'],
      pagination: false,
    }
  }
  render() {
    const { licensePay } = this.props;
    const { debtList } = licensePay;

    return (
      <Page inner>
        <h1 className={styles.title}>License最近待缴费使用记录</h1>
        {debtList && debtList.totalPrice ?
          <p className={styles.row}>
            <span>统计开始时间：<label className={styles.lb}>{debtList && debtList.startTime}</label></span>
            <span className={styles.sp}>统计结束时间：<label className={styles.lb}>{debtList && debtList.endTime}</label></span>
            {/* <span className={styles.sp}>免费试用总时长：<label className={styles.lb}>{debtList && debtList.freeBuyDurationString}</label></span> */}
            {/* <span className={styles.sp}>计费总时长：<label className={styles.lb}>{debtList && debtList.buyDurationString}</label></span> */}
            <span className={styles.sp}>欠费：<label className={styles.fee}>{debtList && debtList.totalPrice}</label>元</span>
            <span className={styles.sp}><Link to='/account/order?from=license'>立即付款</Link></span>
          </p>
          : null
        }
        <LicenseList {...this.listProps} />
      </Page>
    )
  }
}

export default LicenseToPay
