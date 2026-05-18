import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import store from 'store'
import Page from 'components/Page'
import List from './components/List'
import Filter from './components/Filter'
import { isEmpty } from 'lodash-es'
import { router } from 'umi'

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const user = store.get('user');
const userId = user && user.userInfo && user.userInfo.id;

@connect(({ app, msg, loading }) => ({ app, msg, loading }))
class MessageCenter extends PureComponent {
  state = {
    filterValues: {
      toUserId: userId,
    },     // 查询条件
  };

  componentDidMount() {
    this.handleQuery();
  }

  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }

  handleQuery = (value) => {
    const { dispatch, msg } = this.props;
    const { pagination, selectedRows } = msg
    const { filterValues } = this.state;

    // 选中多条删除时，页数计算
    let total = pagination.total;
    if (selectedRows && selectedRows.length > 0) {
      total -= selectedRows.length;
    }
    const totalPage = Math.ceil((total - 1) / pagination.pageSize);
    const currentPage = pagination.current > totalPage ? totalPage : pagination.current;
    if (value && value.pageNum) {
      value.pageNum = currentPage < 1 ? 1 : currentPage;
    }

    dispatch({
      type: 'msg/query',
      payload: {
        ...filterValues,
        ...value
      }
    })
  }

  get listProps() {
    const { dispatch, msg, loading } = this.props
    const { list, pagination, selectedRowKeys, selectedRows } = msg

    return {
      dataSource: list,
      loading: loading.effects['msg/query'],
      pagination,
      onChange: (pagination, filters, sorter) => {
        this.handleTableChange(pagination, filters, sorter)
      },
      rowSelection: {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          dispatch({
            type: 'msg/updateState',
            payload: {
              selectedRowKeys,
              selectedRows,
            },
          })
        },
      },
      onShowMsgDetail: id => {
        // 跳转至详情页
        const { location: { pathname } } = this.props;
        router.push(`${pathname}/${id}`)
      }
    }
  }

  handleTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
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

    dispatch({
      type: 'msg/query',
      payload: params,
    });
  };

  get filterProps() {
    const { location, dispatch, msg } = this.props
    const { list, selectedRows, pagination } = msg
    const { filterValues } = this.state;

    return {
      list,
      selectedRows,
      setFilterValues: value => {
        this.setState({
          filterValues: {
            ...filterValues,
            msgTitle: value
          }
        })
      },
      onSearch: value => {
        const data = {
          msgTitle: value
        }
        this.handleQuery(data)
      },
      onMultiUpdate: (status) => { // 选中标为已读、删除
        selectedRows.map(item => item.msgStatus = status);
        dispatch({
          type: 'msg/updateBatch',
          payload: {
            list: selectedRows,
            msgStatus: status
          },
        }).then(() => {
          this.handleQuery({
            pageNum: pagination.current,
          })
        })
      },
      onReadAll: () => { // 全部标为已读
        dispatch({
          type: 'msg/allReadOrDel',
          payload: {
            status: '1'
          },
        }).then(() => {
          this.handleQuery({
            pageNum: pagination.current,
          })
        })
      },
    }
  }

  render() {
    return (
      <Page inner>
        <Filter {...this.filterProps} />
        <List {...this.listProps} />
      </Page>
    )
  }
}

MessageCenter.propTypes = {
  msg: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default MessageCenter
