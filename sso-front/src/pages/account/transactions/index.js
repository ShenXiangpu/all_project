import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { message } from 'antd'
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';
import styles from './style.less';

// 优惠券 兑奖码
@connect(({ app, transactions, loading }) => ({ app, transactions, loading }))
class Coupons extends PureComponent {
  state = {
    formValues: {},          // 查询条件
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'transactions/getTradeEventList',
    })

    this.handleQuery();
  }

  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }

  get filterProps() {
    const { transactions, dispatch } = this.props
    const { formValues } = this.state;
    const { tradeEventList } = transactions;

    return {
      tradeEventList,
      filter: {
        ...formValues
      },
      setFormValues: values => {
        this.setStateValue('formValues', values)
      },
      onSearch: values => {
        this.handleQuery(values);
      },
      onShowModal: () => {
        dispatch({
          type: 'transactions/showModal',
        })
      }
    }
  }


  handleQuery = values => {
    const { dispatch } = this.props
    const { formValues } = this.state;
    dispatch({
      type: 'transactions/getTransList',
      payload: {
        ...formValues,
        ...values,
      }
    })
  }

  get listProps() {
    const { dispatch, transactions, loading } = this.props
    const { list, pagination } = transactions

    return {
      dataSource: list,
      loading: loading.effects['transactions/getTransList'],
      pagination,
      onChange: (pagination, filters, sorter) => {
        this.handleTableChange(pagination, filters, sorter)
      },
    }
  }

  handleTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };

    this.setState({
      formValues: {
        ...formValues,
        ...filters,
      }
    })

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'transactions/getTransList',
      payload: params,
    });
  };


  render() {
    return (
      <Page inner>
        <div className={styles.formFilter}>
          <Filter {...this.filterProps} />
        </div>
        <List {...this.listProps} />
      </Page>
    )
  }
}

export default Coupons
