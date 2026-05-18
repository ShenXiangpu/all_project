import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { stringify } from 'qs'
import { connect } from 'dva'
import Page from 'components/Page/Page'
import ToolList from './components/List'
import Filter from './components/Filter'
import ToolModal from './components/ToolModal'
import ToolFeatureModal from './components/ToolFeatureModal'
import debounce from 'lodash/debounce'
import styles from './styles.less'

@connect(({ app, tool, loading }) => ({ app, tool, loading }))
class Tool extends PureComponent {
  state = {
    formValues: {},        // 查询条件
    selectedFeatureKeys: [],
    selectedFeatures: [],
    featureFilter: {},     // Feature窗口查询条件
    tooId: {},
    vendorId: {}
  }

  componentDidMount() {
    const { location, dispatch } = this.props;

    const payload = location.query || {
      pageNum: 1,
      pageSize: 10,
    }

    dispatch({
      type: 'tool/query',
      payload,
    })

    dispatch({
      type: 'tool/queryTaskType',
      payload: {},
    })

    dispatch({
      type: 'tool/getAllVendor',
      payload: {},
    })
  }

  handleRefresh = newQuery => {
    const { tool, dispatch } = this.props;
    const { formValues } = this.state;
    const { pagination } = tool;

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
      type: 'tool/query',
      payload: {
        ...defaultPagination,
        ...pagination,
        ...formValues,
        ...newQuery,
      },
    })

    dispatch({
      type: 'tool/queryTaskType',
      payload: {},
    })

    dispatch({
      type: 'tool/getAllVendor',
      payload: {},
    })
  }

  handleResetRefresh = () => {
    const { tool, dispatch } = this.props;

    const defaultPagination = {
      pageNum: 1,
      pageSize: 10,
    }

    this.setState({
      formValues: {}
    })

    dispatch({
      type: 'tool/query',
      payload: {
        ...defaultPagination,
      },
    })
  }

  get filterProps() {
    const { location, dispatch, tool } = this.props
    const { query } = location
    const { taskTypes, vendors } = tool

    return {
      taskTypes,
      vendors,
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
          type: 'tool/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
  }
  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }
  get listProps() {
    const { dispatch, tool, loading } = this.props
    const { list, pagination } = tool

    return {
      dataSource: list,
      loading: loading.effects['tool/query'],
      pagination,
      onChange: (pagination, filters, sorter) => {
        this.handleTableChange(pagination, filters, sorter)
      },
      switchLoading: loading.effects['tool/updateToolStatus'],
      onDeleteItem: debounce(values => {
        dispatch({
          type: 'tool/delete',
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
          type: 'tool/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onUpdateStatus: (item) => {
        return new Promise(function (reslove, reject) {
          dispatch({
            type: 'tool/updateToolStatus',
            payload: item,
          }).then(res => {
            reslove(res)
          })
        })
      },
      onRedirectVersion: value => {
        router.push({
          pathname: `/edaToolsMng/tool/${value}`
        })
      },
      onFunctionMng: value => {
        router.push({
          pathname: `/edaToolsMng/tool/function/${value}`
        })
      },
      onGetFeatures: values => {
        this.setStateValue('toolId', values.id)
        this.setStateValue('vendorId', values.toolVendor)
        dispatch({
          type: 'tool/queryFeaturesList',
          payload: {
            toolId: values.id,
            vendorId: values.toolVendor
          }
        }).then(() => {
          dispatch({
            type: 'tool/showFeatureModal',
            payload: {
              currentItem: values
            }
          })
        })
      }
    }
  }

  handleTableChange = (pagination, filtersArg, sorter, vendorId) => {
    const { dispatch } = this.props;
    const { formValues, featureFilter, } = this.state;
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

    if (vendorId) { // Feature管理窗口，根据厂商查询feature分页
      dispatch({
        type: 'tool/queryFeaturesList',
        payload: {
          vendorId,
          ...featureFilter,
          ...params,
        }
      })
    } else { // 工具主页面
      dispatch({
        type: 'tool/query',
        payload: params,
      });
    }
  };

  get modalProps() {
    const { dispatch, tool, loading } = this.props
    const { taskTypes, vendors, currentItem, modalVisible, modalType } = tool

    return {
      taskTypes,
      vendors,
      width: 600,
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects[`tool/${modalType}`],
      title: `${modalType === 'create' ? '新增工具' : '修改工具'
        }`,
      centered: true,
      okText: '确认',
      cancelText: '取消',
      onOk: debounce(data => {
        dispatch({
          type: `tool/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      }, 1000),
      onCancel() {
        dispatch({
          type: 'tool/hideModal',
        })
      },
    }
  }

  get featureMdlProps() {
    const { dispatch, tool, loading } = this.props
    const { toolFeaturesList, toolFeaturePagination, featureMdlVisible,licenseInUsedList,licInUsedMdlVisible } = tool
    const { toolId, vendorId } = this.state

    return {
      toolId,
      vendorId,
      loading: loading.effects['tool/queryFeaturesList'],
      toolFeaturesList,
      toolFeaturePagination,
      width: '80vw',
      visible: featureMdlVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: '工具Feature管理',
      centered: true,
      licInUsedMdlVisible,
      licenseInUsedList,
      loading2:loading,
      footer: () => { },
      onCancel: () => {
        dispatch({
          type: 'tool/hideFeatureModal',
          payload: {
          }
        })
      },
      onCancel2:() => {
        dispatch({
          type: 'tool/hideLicInUsedModal',
          payload: {
          }
        })
      },
      onSeachFuncTeatureList: (formValues) => {
        dispatch({
          type: 'tool/queryFeaturesList',
          payload: {
            ...formValues,
            toolId,
            vendorId
          }
        })
      },
      onGetInUsedList: (value) => {
        const that = this;
        dispatch({
          type: 'tool/getFeaturesUseInfo',
          payload: {
            ...value,
            vendorId
          },
        }).then(() => {
          // that.setState({ featureName: value.featureName });

          dispatch({
            type: 'tool/showLicInUsedModal',
            payload: {},
          });
        })
      },
    }
  }

  render() {
    return (
      <Page inner>
        <div className={styles.formFilter}><Filter {...this.filterProps} /></div>
        <ToolList {...this.listProps} />
        <ToolModal {...this.modalProps} />
        <ToolFeatureModal {...this.featureMdlProps} />
      </Page>
    )
  }
}

Tool.propTypes = {
  tool: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Tool
