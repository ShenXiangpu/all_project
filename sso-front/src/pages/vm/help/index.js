import React, { PureComponent } from 'react';
import Page from 'components/Page/Page';
import { Breadcrumb } from 'antd';
import Link from 'umi/link';
import ConnectVM from './components/ConnectVM'

class Help extends PureComponent {

  render() {
    return (
      <Page inner>
        <Breadcrumb style={{ marginBottom: '15px' }} separator=">">
          <Breadcrumb.Item>
            <Link to='/vm'>IC设计云</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>远程连接：安装及配置 CA 证书流程</Breadcrumb.Item>
        </Breadcrumb>
        <ConnectVM />
      </Page>
    );
  }
}

export default Help;
