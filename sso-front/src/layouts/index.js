import { Component } from 'react';
import PropTypes from 'prop-types';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import { Helmet } from "react-helmet";
import { ConfigProvider } from 'antd';    //国际化：中文
import zhCN from 'antd/es/locale/zh_CN';
import { queryLayout } from 'utils'
import config from 'utils/config'
import PublicLayout from './PublicLayout'
import PrimaryLayout from './PrimaryLayout'
import styles from './index.less'

const LayoutMap = {
  primary: PrimaryLayout,
  public: PublicLayout
}

@withRouter
@connect(({ app, loading }) => ({ app, loading }))
class BasicLayout extends Component {

  render() {
    const { children, location } = this.props
    console.log('this.props',this.props);
    const Container = LayoutMap[queryLayout(config.layouts, location.pathname)]

    const pathname = location.pathname;
    let title = ''
    if (pathname.startsWith('/register')) {
      title = '账户注册 | '
    } else if (pathname === '/password_find') {
      title = '账户中心 | '
    } else if (pathname.indexOf('/registeContract') >= 0) {
      title = '用户注册协议 | '
    } else if (pathname.indexOf('/icVmContract') >= 0) {
      title = 'EDA云服务器服务协议 | '
    }

    return (
      <ConfigProvider locale={zhCN}>
        <div className={styles.layoutContainer}>
          <Helmet>
            <title>{title + config.siteName}</title>
          </Helmet>
          <Container>{children}</Container>
        </div>
      </ConfigProvider>
    )
  }
}

BasicLayout.propTypes = {
  loading: PropTypes.object,
}
export default BasicLayout;
