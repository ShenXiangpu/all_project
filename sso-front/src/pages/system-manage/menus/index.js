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

@connect(({ app, menus, loading }) => ({ app, menus, loading }))
class Menus extends PureComponent {
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
    const { dispatch, menus, loading } = this.props
    const { currentItem, modalVisible, modalType } = menus

    return {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
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
          type: `menus/${type}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      }, 1000),
      onCancel() {
        dispatch({
          type: 'menus/hideModal',
        })
      },
    }
  }

  get listProps() {
    const { dispatch, menus, loading } = this.props
    const { list } = menus

    return {
      dataSource: list,
      loading: loading.effects['menus/query'],
      onDeleteItem: debounce(values => {
        dispatch({
          type: 'menus/delete',
          payload: values,
        }).then(() => {
          this.handleRefresh({})
        })
      }, 1000),
      onEditItem(item) {
        dispatch({
          type: 'menus/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onAddSubMenuItem(item) {
        dispatch({
          type: 'menus/showModal',
          payload: {
            modalType: 'createSub',
            currentItem: { parentMenuId: item.id },
          },
        })
      },
      onUpdateStatus: (item) => {
        dispatch({
          type: 'menus/editStatus',
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
          type: 'menus/showModal',
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

Menus.propTypes = {
  menus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Menus
