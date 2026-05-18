import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Table, Input, Icon } from 'antd'
import classNames from 'classnames'
import Page from 'components/Page/Page'
import LicenseServerList from './FeatureList'
import Filter from './FeatureFilter'
import styles from './ToolFeatureModal.less'
import InUsedModal from './InUsedModal'
import { connect } from 'dva'
import { filter } from 'lodash'

const { Search } = Input;

@connect(({ app, tool, loading }) => ({ app, tool, loading }))
class ToolFeatureModal extends PureComponent {
  state = {
    formValues: {}
  }





  handleCancel = () => {
    const { onCancel } = this.props;
    this.setState({
      doubleArr: [],
      filterRows: [],
    })
    onCancel();
  }

  handleOk = e => {
    e.preventDefault();
    const { onOk } = this.props;
    this.setState({
      doubleArr: [],
      filterRows: [],
    })
    onOk();
  }

  handleRefresh = newQuery => {
    const { dispatch, toolFeaturePagination } = this.props;
    const { formValues } = this.state;

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
      type: 'tool/queryLicenseList',
      payload: {
        ...defaultPagination,
        ...toolFeaturePagination,
        ...formValues,
        ...newQuery,
      },
    })
  }

  handleResetRefresh = () => {
    const { dispatch, toolId, vendorId, } = this.props;

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
      type: 'tool/queryFeaturesList',
      payload: {
        ...defaultPagination,
        ...formValues,
        toolId,
        vendorId
      },
    })
  }

  get filterProps() {
    const { toolFeaturesList, toolId, vendorId, loading } = this.props


    return {
      toolFeaturesList,
      filter: {
        toolId,
        vendorId
      },
      onFilterChange: value => {
        this.setState({
          formValues: {
            ...value
          }
        })
        this.handleRefresh({
          ...filter,
          ...value,
        })
      },
      onReset: () => {
        this.handleResetRefresh()
      },
    }
  }

  get listProps() {
    const { toolFeaturesList, toolFeaturePagination, toolId, vendorId, loading } = this.props
    return {
      dataSource: toolFeaturesList,
      loading: loading.effects['tool/queryFeaturesList'],
      pagination: toolFeaturePagination,
      onChange: (toolFeaturePagination, filters, sorter) => {
        this.handleTableChange(toolFeaturePagination, filters, sorter)
      },
      onGetInUsedList: (value) => {
        const { onGetInUsedList } = this.props
        onGetInUsedList(value)
        this.setState({
          featureName: value.featureName
        })
      },
    }
  }
  handleTableChange = (pagination, filtersArg, sorter) => {
    const { onSeachFuncTeatureList } = this.props;
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
    onSeachFuncTeatureList(params)
  };

  get modalProps() {
    const { licInUsedMdlVisible, licenseInUsedList, onCancel2, loading2 } = this.props;
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
          onCancel2()
          this.setState({ featureName: undefined });
        },
      },
      tableProps: {
        dataSource: licenseInUsedList,
        loading: loading2.effects['licenseServer/getLicenseInUsedList'],
      }
    }
  }


  render() {
    const { ...modalProps } = this.props;

    return (
      <Modal {...modalProps}
        onCancel={this.handleCancel}
      >
        {/* <div className={styles.formFilter}><Filter {...this.filterProps} /></div> */}
        <LicenseServerList {...this.listProps} />
        <InUsedModal {...this.modalProps} />

      </Modal>
    )
  }
}

export default ToolFeatureModal
