import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import Page from '../../../components/Page/Page'
import { Tabs } from 'antd';
import TreeList from './components/TreeList'

const { TabPane } = Tabs;

@connect(({ roleMenus, loading }) => ({ roleMenus, loading }))
class RoleMenus extends PureComponent {
  state = {
    key: ''
  }

  componentDidMount() {
    const { roleMenus: { roles }, dispatch } = this.props
    if (roles && roles.length > 0) {
      dispatch({
        type: 'roleMenus/getRoleMenus',
        payload: {
          roleId: roles[0].id
        },
      })
      this.setState({ key: roles[0].id.toString() })
    }
  }

  componentDidUpdate(prevProps) {
    const old_roleMenus = prevProps.roleMenus
    const old_roles = old_roleMenus && old_roleMenus.roles
    const { roleMenus: { roles }, dispatch } = this.props
    if (old_roles !== roles && roles.length > 0) {
      dispatch({
        type: 'roleMenus/getRoleMenus',
        payload: {
          roleId: roles[0].id
        },
      })
      this.setState({ key: roles[0].id.toString() })
    }
  }

  onTabChange = (key) => {
    this.setState({ key })
    const { dispatch } = this.props
    dispatch({
      type: 'roleMenus/getRoleMenus',
      payload: {
        roleId: key
      },
    })
  }

  get listProps() {
    const { dispatch, roleMenus, loading } = this.props
    const { list, roleCheckedMenus } = roleMenus
    const { key } = this.state
    return {
      treeData: list,
      roleCheckedMenus,
      loading: loading.effects['roleMenus/getRoleMenus'],
      btnloading: loading.effects['roleMenus/update'],
      onEditItem(values) {
        dispatch({
          type: 'roleMenus/update',
          payload: {
            roleId: key,
            menuId: values
          },
        })
      },
    }
  }

  render() {
    const { key } = this.state
    const { roleMenus: { roles } } = this.props

    roles.sort((a, b) => a.type - b.type);  // 排序，type升序

    return (
      <Page inner>
        <Tabs
          onChange={this.onTabChange}
          defaultActiveKey={key}
          tabPosition='left'
          style={{ height: '100%' }}
        >
          {roles && roles.map(element => {
            const tabName = element.cnName;
            const title = tabName && tabName.length < 50 ? tabName : <span title={tabName}>{tabName.substring(0, 50)}...</span>
            return (
              <TabPane tab={title} key={element.id}>
                <TreeList {...this.listProps} />
              </TabPane>
            )
          })
          }
        </Tabs>
      </Page>
    )
  }
}

RoleMenus.propTypes = {
  roleMenus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default RoleMenus
