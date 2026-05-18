import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import Page from '../../../components/Page/Page'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'
import debounce from 'lodash/debounce'
import styles from './styles.less'
import { message } from 'antd'

@connect(({ app, toolFunctionMng, loading }) => ({ app, toolFunctionMng, loading }))
class ToolFunctionMng extends PureComponent {
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

  get modalProps() {
    const { dispatch, toolFunctionMng, loading } = this.props
    const { currentItem, modalVisible, modalType } = toolFunctionMng

    return {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      modalType,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects[`menus/${modalType}`],
      title: `${modalType === 'update' ? '修改菜单' : '新增菜单'}`,
      centered: true,
      okText: '确认',
      cancelText: '取消',
      onOk: debounce(data => {
        const type = modalType === 'update' ? 'update' : 'create';
        dispatch({
          type: `toolFunctionMng/${type}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      }, 1000),
      onCancel() {
        dispatch({
          type: 'toolFunctionMng/hideModal',
        })
      },
    }
  }

  get listProps() {
    const { dispatch, toolFunctionMng, loading } = this.props
    const { list } = toolFunctionMng

    return {
      dataSource: list,
      loading: loading.effects['toolFunctionMng/query'],
      onDeleteItem: debounce(values => {
        dispatch({
          type: 'toolFunctionMng/delete',
          payload: values,
        }).then(() => {
          this.handleRefresh({})
        })
      }, 1000),
      onEditItem(item) {
        dispatch({
          type: 'toolFunctionMng/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onAddSubMenuItem(item) {
        dispatch({
          type: 'toolFunctionMng/showModal',
          payload: {
            modalType: 'createSub',
            currentItem: { parentCid: item.catId },
          },
        })
      },
      onUpdateStatus: (item) => {
        dispatch({
          type: 'toolFunctionMng/editStatus',
          payload: item,
        }).then(response => {
          console.log("res", response);
          if (response && response.flag) {
            message.success("状态更新成功")
            this.handleRefresh({});
          } else {
            message.config({
              top: 100,
              duration: 2,
            });
            message.error(response.errMessage)
          }
        })
      },
    }
  }

  get filterProps() {
    const { location, dispatch } = this.props
    const { query } = location

    return {
      filter: {
        ...query,
      },
      onReset: () => {
        this.handleResetRefresh()
      },
      onFilterChange: value => {
        this.handleRefresh({
          ...value,
        })
      },
      onAdd() {
        dispatch({
          type: 'toolFunctionMng/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
  }

  render() {
    return (
      <Page inner>
        <div className={styles.formFilter}><Filter {...this.filterProps} /></div>
        <List {...this.listProps} />
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

ToolFunctionMng.propTypes = {
  menus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default ToolFunctionMng
