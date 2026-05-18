import React, { PureComponent } from 'react'
import { connect } from 'dva';
import Page from 'components/Page';
import { Button, Icon, Popover } from 'antd';
import styles from './index.less';
import classNames from 'classnames';
import store from 'store';
import { Link, router } from 'umi';
import List from './components/List';
import { floatSub, formatMoney } from 'utils/utils.js';

// 计费中心
@connect(({ app, accountCenter, loading }) => ({ app, accountCenter, loading }))
class Home extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/queryBalance'
    })
    dispatch({
      type: 'app/queryMachineHours'
    })
    dispatch({
      type: 'accountCenter/getArrearList'
    })
  }

  get listProps() {
    const { dispatch, accountCenter, loading } = this.props;
    const { arrearList } = accountCenter;

    return {
      dataSource: arrearList,
      loading: loading.effects['accountCenter/getArrearList'],
    }
  }

  handleRechargeClick = e => {
    e.preventDefault();
    router.push('/account/home/recharge')
  }

  handleTransClick = e => {
    e.preventDefault();
    router.push('/account/transactions')
  }

  render() {
    const balance = store.get('balance');
    const machineHours = store.get('machineHours');

    const { accountCenter } = this.props;
    const { arrearList } = accountCenter;

    const arrearPrice = arrearList && arrearList.length > 0 ? arrearList[0].currentArrearsPrice : 0; // 欠费金额
    const money = floatSub(balance, arrearPrice); // 可用额度
    const fMoney = money && formatMoney(money, true);

    return (
      <div>

        {/* 余额 */}
        <div className={styles.panel}>
          <div className={styles.hd}>
            <h3 className={styles.title}>
              可用额度
              <Popover content="由于系统同步原因，查询结果与实际可能存在差异" title={null}>
                <Icon type="question-circle" className={styles.icon} />
              </Popover>
            </h3>
          </div>
          <div className={styles.bd}>
            <div className={styles.dataMod}>
              <div className={styles.dataValue}>
                {fMoney}
                <label className={styles.unit}>元</label>
              </div>
              <div className={styles.dataTool}>
                <Button type="primary" size="small" onClick={this.handleRechargeClick}>
                  充值汇款
                </Button>
                <Button type="primary" ghost size="small" style={{ marginLeft: 15 }} onClick={this.handleTransClick}>
                  收支明细
                </Button>
              </div>
            </div>

            <div className={styles.bubbleWrap}>
              <div className={styles.bubble}>
                <div className={styles.item}>
                  <div className={styles.title}>现金金额</div>
                  <div className={styles.value}>{balance && formatMoney(balance, true)} 元</div>
                </div>
                <div className={classNames(styles.item, styles.symbol)}>+</div>
                <div className={styles.item}>
                  <div className={styles.title}>优惠金额</div>
                  <div className={styles.value}>0 元</div>
                </div>
                <div className={classNames(styles.item, styles.symbol)}>-</div>
                <div className={styles.item}>
                  <div className={styles.title}>欠费金额</div>
                  <div className={styles.value}>{arrearPrice && formatMoney(arrearPrice, true) || 0} 元</div>
                </div>
                <div className={classNames(styles.item, styles.symbol)}>-</div>
                <div className={styles.item}>
                  <div className={styles.title}>冻结金额</div>
                  <div className={styles.value}>0 元</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 剩余机时 */}
        <div className={styles.panel}>
          <div className={styles.hd}>
            <h3 className={styles.title}>
              剩余机时
              <Popover content="IC设计云服务器可用时长" title={null}>
                <Icon type="question-circle" className={styles.icon} />
              </Popover>
            </h3>
          </div>
          <div className={styles.bd}>
            <div className={styles.dataMod}>
              <div className={styles.dataValue}>
                {machineHours}
                <label className={styles.unit}>时</label>
              </div>
              <div className={styles.dataTool}>
                <Button type="primary" size="small">
                  <Link to="/account/coupons">机时兑换</Link>
                </Button>
              </div>
            </div>

            <div className={styles.bubbleWrap}>
              <div className={styles.bubble}>
                <div className={styles.item}>
                  <div className={styles.title}>现金兑换机时</div>
                  <div className={styles.value}>0 时</div>
                </div>
                <div className={classNames(styles.item, styles.symbol)}>+</div>
                <div className={styles.item}>
                  <div className={styles.title}>优惠机时</div>
                  <div className={styles.value}>{machineHours} 时</div>
                </div>
                <div className={classNames(styles.item, styles.symbol)}>-</div>
                <div className={styles.item}>
                  <div className={styles.title}>购买VM使用机时</div>
                  <div className={styles.value}>0 时</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 欠费列表 */}
        <div className={styles.panel}>
          <h3 className={styles.cardTitle}>
            待缴费资源
          </h3>
          <List {...this.listProps} />
        </div>
      </div>
    )
  }
}

export default Home
