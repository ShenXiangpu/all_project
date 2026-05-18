import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import Page from 'components/Page'
import List from './components/List'
import Filter from './components/Filter'
import styles from './styles.less'

@connect(({ app, orderError, loading }) => ({ app, orderError, loading }))
class OrderError extends PureComponent {
  state = {
    formValues: {},     // 查询条件
  };

  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }

  componentDidMount() {
    this.handleQuery();
  }

  handleQuery = (value) => {
    const { dispatch } = this.props
    const { formValues } = this.state
    if (value && value.pageNum) {
      dispatch({
        type: 'orderError/query',
        payload: {
          pageNum: value.pageNum,
          ...formValues
        }
      })
    } else {
      dispatch({
        type: 'orderError/query',
        payload: formValues
      })
    }
  }

  get listProps() {
    const { dispatch, orderError, loading } = this.props
    const { list, pagination } = orderError

    return {
      dataSource: list,
      loading: loading.effects['orderError/query'],
      pagination,
      onChange: (pagination, filters, sorter) => {
        this.handleTableChange(pagination, filters, sorter)
      },
      showUserInfo: id => {
        dispatch({
          type: 'app/getUserInfoById',
          payload: {
            userId: id
          },
        }).then(() => {
          dispatch({
            type: 'app/showUserInfoModal'
          })
        })
      },
      onRetry: msgId => {
        dispatch({
          type: 'orderError/retry',
          payload: {
            messageId: msgId
          }
        })
      }
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

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'orderError/query',
      payload: params,
    });
  };

  get filterProps() {
    const { location, dispatch, orderError } = this.props
    const { query } = location

    return {
      filter: {
        ...query,
      },
      setFormValues: values => {
        this.setStateValue('formValues', values)
      },
      onSearch: values => {
        dispatch({
          type: 'orderError/query',
          payload: values
        })
      },
      onReset: () => {
        dispatch({
          type: 'orderError/query',
          payload: {}
        })
      },
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

export default OrderError
