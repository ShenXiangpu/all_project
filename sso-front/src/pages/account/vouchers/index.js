import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { message, Tabs } from 'antd'
import Page from 'components/Page';
import List from './components/List';
import UseLogInfoModal from './components/UseLogInfoModal';
import styles from './style.less';

const { TabPane } = Tabs;
// 优惠券 兑奖码
@connect(({ app, vouchers, loading }) => ({ app, vouchers, loading }))
class Vouchers extends PureComponent {
  state = {  
    tabActiveKey:1,
    formValues: {}       // 查询条件
  };

  componentDidMount() {
    this.handleQuery();
  }

  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }



  handleQuery = values => {
    const { dispatch } = this.props
    dispatch({
      type: 'vouchers/getCoupons',
      payload: {
        ...values,
      }
    })
  }

  get listProps() {
    const { dispatch, vouchers, loading } = this.props
    const { list, pagination } = vouchers
    const { tabActiveKey } = this.state;
    console.log('tabActiveKey',tabActiveKey);

    return {
      dataSource: list,
      index:tabActiveKey,
      loading: loading.effects['vouchers/getCoupons'],
      pagination,
      onChange: (pagination, filters, sorter) => {
        this.handleTableChange(pagination, filters, sorter)
      },
      onShowUserLogInfoModal:(e) => {
        this.onShowUserLogInfoModal(e);
      }
    }
  }


  //点击使用记录打开使用记录modal
  onShowUserLogInfoModal = (e) => {
    console.log(e);
    const { dispatch } = this.props;
    dispatch({
      type: 'vouchers/showModal',
      payload: {
      },
    })
  }


  get useLogInfoModalProps() {
    const { dispatch, vouchers, location } = this.props;
    const {modalVisible} = vouchers

    return {
      visible: modalVisible,
      destroyOnClose: true,
      width: 1000,
      centered: true,
      closable: true,
      maskClosable: false,
      title: '使用记录',
      onCancel: () => {
        dispatch({
          type: 'vouchers/hideModal',
          payload: {
          },
        })
      },
      
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
      type: 'vouchers/getCoupons',
      payload: params,
    });
  };

  callback = (tabActiveKey) => {
    const { dispatch } = this.props;
    this.setState({
      tabActiveKey,
      formValues: {}
    });

    // dispatch({
    //   type: 'deal/updateState',
    //   payload: {
    //     list: []
    //   },
    // })

    dispatch({
      type: 'vouchers/getCoupons',
      payload: {
        status: Number(tabActiveKey)
      },
    })
  }

  // 打开modal，展示使用记录
  onShowUserLogInfoModal = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'vouchers/showModal',
      payload: {
        // status: Number(id)
      },
    })
  }



  render() {


    return (
      <Page inner>
        <Tabs
          defaultActiveKey="before"
          onChange={this.callback}
        >
          <TabPane tab="待使用" key="1">
            <List {...this.listProps} />
          </TabPane>
          {/* <TabPane tab="使用中(支付中)" key="2">
            <List {...this.listProps} />
          </TabPane> */}
          <TabPane tab="已使用" key="3">
            <List {...this.listProps} />
          </TabPane>
          <TabPane tab="已过期" key="4">
            <List {...this.listProps} />
          </TabPane>
        </Tabs>
        <UseLogInfoModal {...this.useLogInfoModalProps}/>
      </Page>
    )
  }
}

export default Vouchers
