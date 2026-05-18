import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import store from 'store'
import Page from '../../components/Page'
import List from './components/List'
import Filter from './components/Filter'

@connect(({ app, license, loading }) => ({ app, license, loading }))
class License extends PureComponent {
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
        type: 'license/query',
        payload: {
          pageNum: value.pageNum,
          ...formValues
        }
      })
    } else {
      dispatch({
        type: 'license/query',
        payload: formValues
      })
    }

    dispatch({
      type: 'license/getToolList',
      payload: {
        vendorCode: formValues.edaVendorCode ? formValues.edaVendorCode : '',
      },
    })

    dispatch({
      type: 'license/getFeatureList',
      payload: {
        vendorCode: formValues.edaVendorCode ? formValues.edaVendorCode : '',
        toolCode: formValues.edaToolCode ? formValues.edaToolCode : '',
      },
    })
  }

  get listProps() {
    const { dispatch, license, loading } = this.props
    const { list, pagination } = license
    const { userRights } = store.get('user') || {}

    return {
      role: userRights,
      dataSource: list,
      loading: loading.effects['license/query'],
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
      type: 'license/query',
      payload: params,
    });
  };

  get filterProps() {
    const { location, dispatch, license } = this.props
    const { query } = location
    const { vendorList, toolList, featureList, reload } = license

    return {
      reload,
      filter: {
        vendorList,
        toolList,
        featureList,
        ...query,
      },
      setFormValues: values => {
        this.setStateValue('formValues', values)
      },
      onSearch: values => {
        dispatch({
          type: 'license/query',
          payload: values
        })
      },
      onReset: () => {
        dispatch({
          type: 'license/query',
          payload: {}
        })

        dispatch({
          type: 'license/queryEdaVendorList',
          payload: {}
        })

        dispatch({
          type: 'license/getToolList',
          payload: {}
        })

        dispatch({
          type: 'license/getFeatureList',
          payload: {}
        })
      },
      onReloadChange: () => {
        dispatch({
          type: 'license/updateState',
          payload: {
            reload: false
          }
        })
      },
      onVendorChange: value => { //厂商下拉框数据变化，关联获取对应的EDA工具信息
        dispatch({
          type: 'license/getToolList',
          payload: {
            vendorCode: value,
          },
        })

        dispatch({
          type: 'license/getFeatureList',
          payload: {
            vendorCode: value,
          },
        })
      },
      onToolChange: value => { //EDA工具下拉框数据变化，关联获取对应的EDA工具feature信息
        dispatch({
          type: 'license/getFeatureList',
          payload: {
            toolCode: value,
          },
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

License.propTypes = {
  license: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default License
