import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { router } from 'utils'
import { stringify } from 'qs'
import { Button, Breadcrumb, Icon, Divider, Modal, Drawer, message } from 'antd'
import Page from '../../../components/Page'

import List from './components/List'
import Filter from './components/Filter'




@connect(({ app, coupons, loading }) => ({ app, coupons, loading }))
class Coupons extends PureComponent {


  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'coupons/couponsList',
      payload: {
        status: 'all'
      }
    })
  }

  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }

  get filterProps() {
    const { app, coupons, dispatch } = this.props
    const { status } = coupons
    return {
      dispatch,
      status,
      onhandleSelectChange: (value) => {
        const params = {
          pageNum: 1,
          pageSize: 10,
          status: value,
        };
        dispatch({
          type: 'coupons/couponsList',
          payload: {
            ...params
          }
        })
      },
      onHandleFormReset: () => {
        const params = {
          pageNum: 1,
          pageSize: 10,
          status: 'all'
        };
        dispatch({
          type: 'coupons/couponsList',
          payload: {
            ...params
          }
        })
      }
    }
  }

  handleTableChange = (pagination) => {

    const params = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
    };
    this.handleQuery(params);
  }
  handleQuery = values => {
    const { dispatch, coupons } = this.props;
    const { status } = coupons
    dispatch({
      type: 'coupons/couponsList',
      payload: {
        ...values,
        status
      }
    })
  }
  get listProps() {
    const { coupons, loading, dispatch } = this.props
    const { couponsList, pagination,status } = coupons
    return {
      couponsList,
      pagination,
      loading: loading.effects['coupons/couponsList'],
      onChange: (pagination, filters, sorter) => {
        this.handleTableChange(pagination)
      },
      onHandleStatus: (hstatus,id) => {
        dispatch({
          type: 'coupons/handleStatus',
          payload: {
            status:hstatus,
            id
          }
        }).then(response => {
          if (response && response.flag) {
            message.success('修改成功')
            dispatch({
              type: 'coupons/couponsList',
              payload: {
                ...pagination,
                status
              }
            })
          } else {
            message.config({
              top: 100,
              duration: 2,
            });
            message.error(response.errMessage)
          }
        })
      }
    }
  }







  render() {

    return (
      <Page inner style={{ overflow: 'hidden' }}>
        <Filter {...this.filterProps} />
        <List {...this.listProps} />
      </Page>
    )
  }
}

export default Coupons
