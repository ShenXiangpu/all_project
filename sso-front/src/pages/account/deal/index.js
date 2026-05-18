import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Page from 'components/Page';
import { Tabs, message } from 'antd';
import Filter from './components/Filter';
import List from './components/List';
import LicenseList from './components/LicenseList';
import CouponsList from './components/CouponsList';
import StattisticsModal from './components/StattisticsModal';
import styles from './style.less';
import store from 'store';
import { isEmpty, isEqual } from 'lodash';

const { TabPane } = Tabs;

// 订单管理
@connect(({ deal, loading }) => ({ deal, loading }))
class Deal extends PureComponent {
  state = {
    formValues: {},          // 查询条件
    tabActiveKey: 1,
    groupMdlVisible: false,    // 按组（部门）统计订单信息窗口
  };

  componentDidMount() {
    this.handleQuery();
  }

  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }

  get filterProps() {
    const { deal, dispatch } = this.props
    const { formValues } = this.state

    return {
      filter: {
        ...formValues
      },
      setFormValues: values => {
        this.setStateValue('formValues', values)
      },
      onSearch: values => {
        this.handleQuery(values);
      },
    }
  }


  handleQuery = values => {
    const { dispatch } = this.props;
    const { tabActiveKey, formValues } = this.state;

    dispatch({
      type: 'deal/getOrderList',
      payload: {
        paymentMode: tabActiveKey,
        ...formValues,
        ...values,
      }
    })
  }

  get listProps() {
    const { dispatch, deal, loading } = this.props;
    const { list, pagination } = deal;

    return {
      dataSource: list,
      loading: loading.effects['deal/getOrderList'],
      pagination,
      onChange: (pagination, filters, sorter) => {
        this.handleTableChange(pagination, filters, sorter)
      },
      onCancelOrder: values => {
        this.cancelOrder(values);
      }
    }
  }

  // 取消订单
  cancelOrder = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'deal/cancelOrder',
      payload: { orderNum: value }
    }).then(response => {
      if (response && response.flag) {
        message.success('订单取消成功！');
        this.handleQuery();
      } else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    })
  }

  get licenseListProps() {
    const { dispatch, deal, loading } = this.props;
    const { list, pagination } = deal;

    return {
      dataSource: list,
      loading: loading.effects['deal/getOrderList'],
      pagination,
      onChange: (pagination, filters, sorter) => {
        this.handleTableChange(pagination, filters, sorter)
      },
      onCancelOrder: values => {
        this.cancelOrder(values);
      }
    }
  }

  handleTableChange = (pagination, filtersArg, sorter) => {
    const { filterValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...filterValues,
      ...filters,
    };

    this.setState({
      filterValues: {
        ...filterValues,
        ...filters,
      }
    })

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    this.handleQuery(params);
  };

  callback = (tabActiveKey) => {
    const { dispatch } = this.props;
    this.setState({
      tabActiveKey,
      formValues: {}
    });

    dispatch({
      type: 'deal/updateState',
      payload: {
        list: []
      },
    })

    dispatch({
      type: 'deal/getOrderList',
      payload: {
        paymentMode: tabActiveKey
      },
    })
  }

  handleStatisticsClick = () => {
    const { dispatch } = this.props;
    const { tabActiveKey } = this.state;
    this.setState({ groupMdlVisible: true })
    if (isEqual(Number(tabActiveKey), 1)) {
      dispatch({
        type: 'deal/getStatistics',
        payload: {},
      })
    } else if (isEqual(Number(tabActiveKey), 2)) {
      dispatch({
        type: 'deal/getLicStatistics',
        payload: {
          statisticalType: 'group'
        },
      })

      dispatch({
        type: 'deal/getLicStatisticsEnum',
        payload: {},
      })
    }
  }

  get modalProps() {
    const { dispatch, deal, loading } = this.props;
    const { stattistics, statisticsEnum } = deal;
    const { groupMdlVisible, tabActiveKey } = this.state;

    const user = store.get('user');
    const companyId = user && user.userInfo && user.userInfo.companyId;

    let name = '预付费';
    if (isEqual(Number(tabActiveKey), 2)) {
      name = '后付费';
    }

    return {
      isCompanyUser: companyId,
      chartLoading: isEqual(Number(tabActiveKey), 1) ? loading.effects["deal/getStatistics"] : loading.effects["deal/getLicStatistics"],
      tabActiveKey,
      stattistics,
      statisticsEnum,
      visible: groupMdlVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: `${name}-消费统计`,
      centered: true,
      footer: null,
      onSearch: values => {
        if (isEqual(Number(tabActiveKey), 1)) {
          dispatch({
            type: 'deal/getStatistics',
            payload: values,
          })
        } else if (isEqual(Number(tabActiveKey), 2)) {
          dispatch({
            type: 'deal/getLicStatistics',
            payload: values,
          })
        }
      },
      onCancel: () => {
        this.setState({ groupMdlVisible: false });
        dispatch({
          type: 'deal/updateState',
          payload: {
            stattistics: {}
          },
        })
      },
    }
  }

  render() {
    const { tabActiveKey } = this.state;

    return (
      <Page inner>
        <Tabs
          defaultActiveKey="before"
          onChange={this.callback}
          tabBarExtraContent={
            !isEqual(tabActiveKey, '3') ?
              <a href='#' onClick={this.handleStatisticsClick}>消费统计</a>
              : null
          }
        >
          <TabPane tab="预付费" key="1">
            <div className={styles.formFilter}>
              <Filter {...this.filterProps} />
            </div>
            <List {...this.listProps} />
          </TabPane>
          <TabPane tab="后付费" key="2">
            <div className={styles.formFilter}>
              <Filter {...this.filterProps} />
            </div>
            <LicenseList {...this.licenseListProps} />
          </TabPane>
          <TabPane tab="机时抵扣" key="3">
            <div className={styles.formFilter}>
              <Filter {...this.filterProps} />
            </div>
            <CouponsList {...this.listProps} />
          </TabPane>
        </Tabs>
        <StattisticsModal {...this.modalProps} />
      </Page>
    )
  }
}

export default Deal
