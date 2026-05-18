import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Page from 'components/Page';
import Filter from './components/Filter';
import List from './components/List';
import SendModal from './components/SendModal';
import styles from './style.less';

// 平台管理员：兑奖码管理
@connect(({ couponsMng, loading }) => ({ couponsMng, loading }))
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
    const { couponsMng, dispatch } = this.props
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
          type: 'couponsMng/showModal',
        })
      }
    }
  }


  handleQuery = values => {
    const { dispatch } = this.props
    dispatch({
      type: 'couponsMng/getCoupons',
      payload: {
        ...values,
      }
    })
  }

  get listProps() {
    const { dispatch, couponsMng, loading } = this.props;
    const { list, pagination } = couponsMng;

    return {
      dataSource: list,
      loading: loading.effects['couponsMng/getCoupons'],
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
      type: 'couponsMng/getCoupons',
      payload: params,
    });
  };


  get modalProps() {
    const { dispatch, couponsMng, loading } = this.props;
    const { modalVisible, modalType } = couponsMng;

    return {
      confirmLoading: loading.effects['couponsMng/sendAwardCode'],
      modalType,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: '兑奖码发送',
      centered: true,
      onSend: data => {
        dispatch({
          type: 'couponsMng/sendAwardCode',
          payload: data,
        }).then(() => {
          this.handleQuery()
        })
      },
      onCancel() {
        dispatch({
          type: 'couponsMng/hideModal',
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
        <SendModal {...this.modalProps} />
      </Page>
    )
  }
}

export default Coupons
