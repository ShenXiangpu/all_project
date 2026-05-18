import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import store from 'store'
import { Modal } from 'antd'
import Page from 'components/Page'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import AuditModal from './components/AuditModal'
import styles from './styles.less'
import { isEqual } from 'lodash-es'

@connect(({ app, audit, loading }) => ({ app, audit, loading }))
class AuditEnterprise extends PureComponent {
  state = {
    confirmLoading: false,   // 审核通过loading
    confirmLoading2: false   // 审核不通过loading
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
    const { location, app } = this.props
    const { query } = location
    const { companies } = app

    return {
      filter: {
        companies,
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
      }
    }
  }

  get listProps() {
    const { dispatch, audit, loading, app } = this.props
    const { list, pagination, auditInfo } = audit
    const currentUser = store.get('user') || {}
    const id = currentUser && currentUser.id

    return {
      currentUserCode: id,
      dataSource: list,
      loading: loading.effects['audit/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          pageNum: page.current,
          pageSize: page.pageSize,
        })
      },
      onAuditItem(item) {
        dispatch({
          type: 'audit/showModal',
          payload: {
            currentItem: item,
            modalType: 'audit'
          },
        })
      },
      onViewItem(item) {
        dispatch({
          type: 'audit/getAuditInfo',
          payload: {
            companyId: item.id
          },
          callback: (responseData) => {
            if (responseData) {
              Modal.info({
                title: '审核详情',
                okText: '确定',
                content: (
                  <div>
                    <p>
                      <label>审核时间：</label>
                      <label>{responseData.createdAt}</label>
                    </p>
                    <p>
                      <label>审核结果：</label>
                      <label>{responseData.description}</label>
                    </p>
                  </div>
                )
              });
            }
          }
        })
      },
    }
  }


  get modalProps() {
    const { dispatch, audit, app, loading } = this.props
    const { currentItem, modalVisible, modalType } = audit
    const { confirmLoading, confirmLoading2 } = this.state

    return {
      confirmLoading,
      confirmLoading2,
      dispatch,
      modalType,
      item: currentItem,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: '企业信息审核',
      centered: true,
      onAudit: data => {
        const state = data.state
        if (state === '1') {
          console.log('1');
          this.setState({ confirmLoading: true })
        } else {
          console.log('2', state, state === '1', isEqual(Number(state), 1));
          this.setState({ confirmLoading2: true })
        }

        dispatch({
          type: 'audit/audit',
          payload: data,
        }).then(() => {
          this.setState({
            confirmLoading: false,
            confirmLoading2: false
          })
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'audit/hideModal',
        })
      },
    }
  }

  render() {

    return (
      <Page inner>
        <div className={styles.formFilter}><Filter {...this.filterProps} /></div>
        <List {...this.listProps} />
        <AuditModal {...this.modalProps} />
      </Page>
    )
  }
}

AuditEnterprise.propTypes = {
  audit: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default AuditEnterprise
