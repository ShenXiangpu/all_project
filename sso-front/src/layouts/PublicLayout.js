import styles from './index.less'
import { config } from 'utils'

export default ({ children }) => {

  const pathname = children.props.location.pathname;
  let subTitle = ''
  if (pathname === '/password_find') {
    subTitle = '找回密码'
  } else if (pathname.endsWith('/mobile')) {
    subTitle = '用户注册'
  } else if (pathname.endsWith('/email')) {
    subTitle = '企业注册'
  }

  if (pathname === "/login" || pathname === "/login2" || pathname.includes("/remoteConn")) {
    return children;
  } else {
    return (
      <>
        <div className={pathname === "/login" ? styles.page : styles.registerPage}>
          <div className={styles.header}>
            <div className={pathname === "/login" ? styles.loginLogo : styles.logo}>
              <img src={require('../assets/title.png')} />
              {/* <img src={require('../assets/eda.png')} /> */}
              <h2>{subTitle}</h2>
            </div>
          </div>
          {children}
        </div>
        <div className={styles.footer}>
          <p>© 2023 {config.links.title} 版权所有</p>
        </div>
      </>
    )
  }
}
