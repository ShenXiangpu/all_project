import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { stringify } from 'qs'
import { connect } from 'dva'
import { message } from 'antd'
import Page from 'components/Page/Page'
import LicenseServerList from './components/List'
import Filter from './components/Filter'
import LicenseServerModal from './components/LicenseServerModal'
import debounce from 'lodash/debounce'
import styles from './styles.less'

@connect(({ app, licenseServer, loading }) => ({ app, licenseServer, loading }))
class LicenseServer extends PureComponent {
  state = {
    formValues: {},        // 查询条件
  }

  componentDidMount() {
    const { location, dispatch } = this.props;

    const payload = location.query || {
      pageNum: 1,
      pageSize: 10,
    }

    dispatch({
      type: 'licenseServer/query',
      payload,
    })

    dispatch({
      type: 'licenseServer/getAllVendor',
      payload: {},
    })
  }

  handleRefresh = newQuery => {
    const { licenseServer, dispatch } = this.props;
    const { formValues } = this.state;
    const { pagination } = licenseServer;

    const defaultPagination = {
      pageNum: 1,
      pageSize: 10,
    }

    this.setState({
      formValues: {
        ...formValues,
        ...newQuery,
      }
    })

    dispatch({
      type: 'licenseServer/query',
      payload: {
        ...defaultPagination,
        ...pagination,
        ...formValues,
        ...newQuery,
      },
    })

    dispatch({
      type: 'licenseServer/getAllVendor',
      payload: {},
    })
  }

  handleResetRefresh = () => {
    const { licenseServer, dispatch } = this.props;

    const defaultPagination = {
      pageNum: 1,
      pageSize: 10,
    }

    this.setState({
      formValues: {}
    })

    dispatch({
      type: 'licenseServer/query',
      payload: {
        ...defaultPagination,
      },
    })
  }

  get filterProps() {
    const { location, dispatch, licenseServer } = this.props
    const { query } = location
    const { vendorList } = licenseServer

    return {
      vendorList,
      filter: {
        ...query,
      },
      onFilterChange: value => {
        this.handleRefresh({
          ...value,
          pageNum: 1
        })
      },
      onReset: () => {
        this.handleResetRefresh()
      },
      onAdd() {
        dispatch({
          type: 'licenseServer/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
  }

  get listProps() {
    const { dispatch, licenseServer, loading } = this.props
    const { list, pagination } = licenseServer

    return {
      dataSource: list,
      loading: loading.effects['licenseServer/query'],
      pagination,
      onChange: (pagination, filters, sorter) => {
        this.handleTableChange(pagination, filters, sorter)
      },
      switchLoading: loading.effects['licenseServer/updateStatus'],
      onDeleteItem: debounce(values => {
        dispatch({
          type: 'licenseServer/delete',
          payload: values,
        }).then(() => {
          this.handleRefresh({
            pageNum:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      }, 1000),
      onEditItem(item) {
        dispatch({
          type: 'licenseServer/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onUpdateStatus: (item) => {
        dispatch({
          type: 'licenseServer/updateStatus',
          payload: item,
        }).then(response => {
          if (response && response.flag) {
            message.success("状态更新成功")
            this.handleRefresh();
          } else {
            message.config({
              top: 100,
              duration: 2,
            });
            message.error(response.errMessage)
          }
        })
      },
      onRedirectVersion: value => {
        router.push({
          pathname: `/edaToolsMng/licenseServer/${value}`
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
      ...formValues,
      ...filters,
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
    };

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'licenseServer/query',
      payload: params,
    });
  };

  get modalProps() {
    const { dispatch, licenseServer, loading } = this.props
    const { taskTypes, vendorList, currentItem, modalVisible, modalType } = licenseServer

    return {
      taskTypes,
      vendorList,
      width: 600,
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects[`licenseServer/${modalType}`],
      title: `${modalType === 'create' ? '新增License服务器' : '修改License服务器'
        }`,
      centered: true,
      okText: '确认',
      cancelText: '取消',
      onOk: debounce(data => {
        dispatch({
          type: `licenseServer/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      }, 1000),
      onCancel() {
        dispatch({
          type: 'licenseServer/hideModal',
        })
      },
    }
  }

  render() {
    return (
      <Page inner>
        <div className={styles.formFilter}><Filter {...this.filterProps} /></div>
        <LicenseServerList {...this.listProps} />
        <LicenseServerModal {...this.modalProps} />
      </Page>
    )
  }
}

LicenseServer.propTypes = {
  licenseServer: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default LicenseServer
