import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';
import styles from './style.less';

// 优惠券
@connect(({ bill, loading }) => ({ bill, loading }))
class Expense extends PureComponent {
  state = {
    formValues: {},          // 查询条件
  };

  componentDidMount() {
    // this.handleQuery();
  }

  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }

  get filterProps() {
    const { bill, dispatch } = this.props
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
      }
    }
  }


  handleQuery = values => {
    const { dispatch } = this.props
    const { formValues } = this.state
    dispatch({
      type: 'bill/getCoupons',
      payload: {
        ...formValues,
        ...values,
      }
    })
  }

  get listProps() {
    const { dispatch, bill, loading } = this.props
    const { list } = bill

    return {
      dataSource: list,
      loading: loading.effects['bill/getCoupons'],
      pagination: false,
    }
  }

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

export default Expense
