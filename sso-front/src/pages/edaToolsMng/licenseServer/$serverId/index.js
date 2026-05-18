import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { stringify } from 'qs'
import { connect } from 'dva'
import { Breadcrumb, message } from 'antd'
import Link from 'umi/link';
import Page from 'components/Page/Page'
import LicenseServerList from './components/List'
import Filter from './components/Filter'
import styles from './styles.less'
import InUsedModal from './components/InUsedModal'

@connect(({ app, licenseServer, loading }) => ({ app, licenseServer, loading }))
class LicenseInfo extends PureComponent {
  state = {
    formValues: {
      keyword: ''
    },        // 查询条件
    featureName: undefined,   // modal title
  }

  componentDidMount() {
    const { location, dispatch, match: { params: { serverId } } } = this.props;
    const { formValues } = this.state;

    const payload = location.query || {
      pageNum: 1,
      pageSize: 10,
    }

    dispatch({
      type: 'licenseServer/queryLicenseList',
      payload: {
        ...payload,
        ...formValues,
        serverId
      },
    })
  }

  handleRefresh = newQuery => {
    const { licenseServer, dispatch, match: { params: { serverId } } } = this.props;
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
      type: 'licenseServer/queryLicenseList',
      payload: {
        ...defaultPagination,
        ...pagination,
        ...formValues,
        ...newQuery,
        serverId,
      },
    })
  }

  handleResetRefresh = () => {
    const { licenseServer, dispatch, match: { params: { serverId } } } = this.props;

    const defaultPagination = {
      pageNum: 1,
      pageSize: 10,
    }

    const formValues = { keyword: '' };

    this.setState({
      formValues: {
        keyword: ''
      }
    })

    dispatch({
      type: 'licenseServer/queryLicenseList',
      payload: {
        ...defaultPagination,
        ...formValues,
        serverId
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
    }
  }

  get listProps() {
    const { dispatch, licenseServer, loading, match: { params: { serverId } } } = this.props
    const { list, pagination } = licenseServer

    return {
      dataSource: list,
      loading: loading.effects['licenseServer/queryLicenseList'],
      pagination,
      onChange: (pagination, filters, sorter) => {
        this.handleTableChange(pagination, filters, sorter)
      },
      onGetInUsedList: (value) => {
        const that = this;
        dispatch({
          type: 'licenseServer/getLicenseInUsedList',
          payload: {
            serverId,
            ...value
          },
        }).then(() => {
          that.setState({ featureName: value.featureName });

          dispatch({
            type: 'licenseServer/showLicInUsedModal',
            payload: {},
          });
        })
      },
    }
  }

  handleTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch, match: { params: { serverId } } } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      ...formValues,
      ...filters,
      serverId,
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
    };

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'licenseServer/queryLicenseList',
      payload: params,
    });
  };

  get modalProps() {
    const { dispatch, licenseServer, loading } = this.props;
    const { licenseInUsedList, licInUsedMdlVisible } = licenseServer;
    const { featureName } = this.state;

    return {
      modalProps: {
        width: 1000,
        visible: licInUsedMdlVisible,
        destroyOnClose: true,
        maskClosable: false,  //点击蒙层是否允许关闭，默认 true
        title: `${featureName} 使用详情`,
        centered: true,
        footer: null,
        onCancel: () => {
          dispatch({
            type: 'licenseServer/hideLicInUsedModal',
            payload: {},
          });
          this.setState({ featureName: undefined });
        },
      },
      tableProps: {
        dataSource: licenseInUsedList,
        loading: loading.effects['licenseServer/getLicenseInUsedList'],
      }
    }
  }

  render() {
    return (
      <Page inner>
        <Breadcrumb style={{ marginBottom: '24px' }} separator=">">
          <Breadcrumb.Item>
            <Link to='/edaToolsMng/licenseServer'>License服务器</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>License详情</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.formFilter}><Filter {...this.filterProps} /></div>
        <LicenseServerList {...this.listProps} />
        <InUsedModal {...this.modalProps} />
      </Page>
    )
  }
}

LicenseInfo.propTypes = {
  licenseServer: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default LicenseInfo
