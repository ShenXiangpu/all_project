import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import Page from 'components/Page'
import List from './components/List'
import Filter from './components/Filter'
import styles from './styles.less'

@connect(({ app, userLog, loading }) => ({ app, userLog, loading }))
class UserOperateLog extends PureComponent {
  state = {
    formValues: {},     // 查询条件
  };

  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }

  handleQuery = (value) => {
    const { dispatch } = this.props
    const { formValues } = this.state
    if (value && value.pageNum) {
      dispatch({
        type: 'userLog/query',
        payload: {
          pageNum: value.pageNum,
          ...formValues
        }
      })
    } else {
      dispatch({
        type: 'userLog/query',
        payload: formValues
      })
    }
  }

  get listProps() {
    const { dispatch, userLog, loading } = this.props
    const { list, pagination } = userLog

    return {
      dataSource: list,
      loading: loading.effects['userLog/query'],
      pagination,
      onChange: (pagination, filters, sorter) => {
        this.handleTableChange(pagination, filters, sorter)
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
      type: 'userLog/query',
      payload: params,
    });
  };

  get filterProps() {
    const { location, dispatch, userLog } = this.props
    const { query } = location
    const { operateTypes } = userLog

    return {
      operateTypes,
      filter: {
        ...query,
      },
      setFormValues: values => {
        this.setStateValue('formValues', values)
      },
      onSearch: values => {
        dispatch({
          type: 'userLog/query',
          payload: values
        })
      },
      onReset: () => {
        dispatch({
          type: 'userLog/query',
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

UserOperateLog.propTypes = {
  userLog: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default UserOperateLog
