import React, { PureComponent } from 'react'
import { Menu } from 'antd'
import Page from 'components/Page/Page'
import styles from './index.less'
import { Link, router } from 'umi'
import store from 'store'
import { isEqual } from 'lodash-es'

const { Item } = Menu;

class AccountLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'inline',
      selectKey: 'base',
      isCompanyNormal: undefined,  // 是否为企业普通员工，如果是，不具备操作VM的权限，只能查看
      menuMap: [
        {
          key: 'base',
          name: '个人资料',
          auth: 'all'
        },
        {
          key: 'auth',
          name: '信息认证',
          auth: 'all'
        },
        {
          key: 'settings',
          name: '账号设置',
          auth: 'all'
        },
        {
          key: 'changepwd',
          name: '密码修改',
          auth: 'all'
        },
      ]
    };
  }

  // 页面刷新时，设置选中的菜单
  componentDidMount() {
    const { location: { pathname } } = this.props
    if (isEqual(pathname, '/account/personalInfo')) {
      router.push(`${pathname}/base`)
    }

    // 判断是否为公司普通用户（项目经理、工程师）
    const user = store.get('user');
    const userInfo = user && user.userInfo;
    const userRoles = userInfo && userInfo.userRoles;
    const isCompanyNormalArr = userRoles && userRoles.filter(item => {
      if (isEqual(item.name, 'admin') || isEqual(item.name, 'engineer')) {
        return item;
      }
    })
    const isCompanyNormal = isCompanyNormalArr && isCompanyNormalArr.length > 0;

    const { menuMap } = this.state;
    if (isCompanyNormal) {
      menuMap.splice(1, 1);
    }
    this.setState({
      isCompanyNormal,
      menuMap
    })
  }

  // 希望切换子组件之后回到顶部
  componentDidUpdate(prevProps) {
    const { location: { pathname } } = this.props;
    if (this.props.location !== prevProps.location) {
      if (isEqual(pathname, '/account/personalInfo')) {
        router.push(`${pathname}/base`)
      }

      window.scrollTo(0, 0);

      const key = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length);
      this.setState({
        selectKey: key,
      });
    }
  }

  selectKey = (key) => {
    this.setState({
      selectKey: key,
    });
  };

  getMenu = () => {
    const { menuMap } = this.state;
    return menuMap.map(item => {
      const user = store.get('user') || {};
      const userInfo = user && user.userInfo;
      const userRoleName = userInfo && userInfo.role && userInfo.role.name;

      const key = item.key;
      const auth = item.auth;
      if (isEqual(auth, 'all') || auth.indexOf(userRoleName) > -1) {
        return (
          <Item key={key}>
            <Link to={`/account/personalInfo/${key}`}>{item.name}</Link>
          </Item>
        )
      }
      return null;
    }
    );
  };

  getRightTitle = () => {
    const { selectKey, menuMap } = this.state;
    const filterArr = menuMap.filter(item => isEqual(item.key, selectKey))
    return filterArr && filterArr[0] && filterArr[0].name;
  };

  render() {
    const { mode, selectKey } = this.state;

    return (
      <Page inner>
        <div className={styles.main}>
          <div className={styles.leftMenu}>
            <Menu
              mode={mode}
              selectedKeys={[selectKey]}
              onClick={({ key }) => this.selectKey(key)}
            >
              {this.getMenu()}
            </Menu>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{this.getRightTitle()}</div>
            {this.props.children}
          </div>
        </div>
      </Page>
    )
  }
}

export default AccountLayout
