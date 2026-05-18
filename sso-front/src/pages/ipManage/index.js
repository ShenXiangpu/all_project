import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { stringify } from 'qs'
import { connect } from 'dva'
import Page from 'components/Page/Page'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'
import debounce from 'lodash/debounce'

@connect(({ app, ipManage, loading }) => ({ app, ipManage, loading }))
class IPManage extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'ipManage/queryNodeList',
      payload: {},
    })

    dispatch({
      type: 'ipManage/queryFoundryList',
      payload: {},
    })

    dispatch({
      type: 'ipManage/queryIpCategoryList',
      payload: {},
    })

  }

  handleRefresh = newQuery => {
    const { location } = this.props
    const { query, pathname } = location

    router.push({
      pathname,
      search: stringify(
        {
          ...query,
          ...newQuery,
        },
        { arrayFormat: 'repeat' }
      ),
    })
  }

  handleResetRefresh = () => {
    const { location } = this.props
    const { pathname } = location

    router.push({
      pathname
    })
  }

  get filterProps() {
    const { location, dispatch } = this.props
    const { query } = location

    return {
      filter: {
        ...query,
      },
      onFilterChange: value => {
        this.handleRefresh({
          ...value,
          // pageNum: 1
        })
      },
      onReset: () => {
        this.handleResetRefresh()
      },
      onAdd() {
        dispatch({
          type: 'ipManage/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
  }

  get listProps() {
    const { dispatch, ipManage, loading } = this.props
    const { list } = ipManage

    return {
      dataSource: list,
      loading: loading.effects['ipManage/query'],
      onDeleteItem: debounce(values => {
        dispatch({
          type: 'ipManage/delete',
          payload: values,
        }).then(() => {
          this.handleRefresh()
        })
      }, 1000),
      onEditItem(item) {
        dispatch({
          type: 'ipManage/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
    }
  }


  get modalProps() {
    const { dispatch, ipManage, loading } = this.props
    const { currentItem, modalVisible, modalType, nodeList, foundryList, ipCategoryList } = ipManage

    return {
      item: modalType === 'create' ? {} : currentItem,
      nodeList,
      foundryList,
      ipCategoryList,
      visible: modalVisible,
      destroyOnClose: true,
      width: 600,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects[`ipManage/${modalType}`],
      title: `${modalType === 'create' ? '新增IP' : '修改IP'
        }`,
      centered: true,
      okText: '确认',
      cancelText: '取消',
      onOk: debounce(data => {
        dispatch({
          type: `ipManage/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      }, 1000),
      onCancel() {
        dispatch({
          type: 'ipManage/hideModal',
        })
      },
    }
  }

  render() {
    return (
      <Page inner>
        <Filter {...this.filterProps} />
        <List {...this.listProps} />
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

IPManage.propTypes = {
  ipManage: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default IPManage
