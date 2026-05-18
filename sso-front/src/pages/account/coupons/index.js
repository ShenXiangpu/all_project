import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { message } from 'antd'
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';
import CouponsModal from './components/CouponsModal';
import styles from './style.less';

// 优惠券 兑奖码
@connect(({ app, coupons, loading }) => ({ app, coupons, loading }))
class Coupons extends PureComponent {
  state = {
    formValues: {},          // 查询条件
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
    const { coupons, dispatch } = this.props
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
      onShowModal: () => {
        dispatch({
          type: 'coupons/showModal',
        })
      }
    }
  }


  handleQuery = values => {
    const { dispatch } = this.props
    dispatch({
      type: 'coupons/getCoupons',
      payload: {
        ...values,
      }
    })
  }

  get listProps() {
    const { dispatch, coupons, loading } = this.props
    const { list, pagination } = coupons

    return {
      dataSource: list,
      loading: loading.effects['coupons/getCoupons'],
      pagination,
      onChange: (pagination, filters, sorter) => {
        this.handleTableChange(pagination, filters, sorter)
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
      type: 'coupons/getCoupons',
      payload: params,
    });
  };

  get modalProps() {
    const { dispatch, coupons, loading } = this.props;
    const { modalVisible, modalType } = coupons;

    return {
      confirmLoading: loading.effects['coupons/checkAwardCode'],
      modalType,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: '兑换机时',
      centered: true,
      onCheckAwardCode: data => {
        dispatch({
          type: 'coupons/checkAwardCode',
          payload: data,
        }).then(response => {
          if (response && response.flag) {
            this.handleQuery();
            dispatch({
              type: 'coupons/hideModal',
            })

            // 剩余机时
            dispatch({
              type: 'app/queryMachineHours'
            })
          } else {
            message.config({
              top: 100,
              duration: 2,
            });
            message.error(response.errMessage)
          }
        })
      },
      onCancel() {
        dispatch({
          type: 'coupons/hideModal',
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
        <CouponsModal {...this.modalProps} />
      </Page>
    )
  }
}

export default Coupons
