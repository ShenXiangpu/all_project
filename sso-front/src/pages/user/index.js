import React, { PureComponent } from 'react'
import store from 'store'
import Platform from './Platform'
import Enterprise from './Enterprise'
import { router } from 'umi'
import { isEqual } from 'lodash'

class User extends PureComponent {

  render() {
    const currentUser = store.get('user') || {}
    const userRoles = currentUser && currentUser.userInfo && currentUser.userInfo.userRoles;

    // 是否为平台管理员
    const isPlatformAdminArr = userRoles && userRoles.filter(item => isEqual(item.name, 'superAdmin') || isEqual(item.name, 'supremeAdmin'));

    // 是否为企业管理员
    const isEnterpriseAdminArr = userRoles &&
      userRoles.filter(item => isEqual(item.name, 'enterpriseAdmin') || isEqual(item.name, 'ipAdmin') || isEqual(item.name, 'foundryAdmin'));

    return (
      <>
        {isPlatformAdminArr && isPlatformAdminArr.length > 0 ?
          <Platform />
          :
          <Enterprise isEnterpriseAdmin={isEnterpriseAdminArr && isEnterpriseAdminArr.length > 0} />
        }
      </>
    )
  }
}

export default User
