import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { stringify } from 'qs'
import { connect } from 'dva'
import Page from '../../../components/Page'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'
import debounce from 'lodash/debounce'
import styles from './styles.less'

@connect(({ app, roles, loading }) => ({ app, roles, loading }))
class Roles extends PureComponent {

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
          type: 'roles/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
  }

  get listProps() {
    const { dispatch, roles, loading } = this.props
    const { list } = roles

    return {
      dataSource: list,
      loading: loading.effects['roles/query'],
      onDeleteItem: debounce(values => {
        dispatch({
          type: 'roles/delete',
          payload: values,
        }).then(() => {
          this.handleRefresh()
        })
      }, 1000),
      onEditItem(item) {
        dispatch({
          type: 'roles/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
    }
  }


  get modalProps() {
    const { dispatch, roles, loading } = this.props
    const { currentItem, modalVisible, modalType } = roles

    return {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects[`roles/${modalType}`],
      title: `${modalType === 'create' ? '新增角色' : '修改角色'
        }`,
      centered: true,
      okText: '确认',
      cancelText: '取消',
      onOk: debounce(data => {
        dispatch({
          type: `roles/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      }, 1000),
      onCancel() {
        dispatch({
          type: 'roles/hideModal',
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

Roles.propTypes = {
  roles: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Roles
