import React, { PureComponent } from 'react'
import { Breadcrumb } from 'antd';
import Link from 'umi/link';
import Page from 'components/Page';
import Detail from './detail'
import ResourceMonitor from './resourceMonitor'

class DockerInfos extends PureComponent {
  renderChildren = () => {
    const { location } = this.props;
    const detail = location.query.detail;
    if (detail) {
      return <Detail />
    }
    return <ResourceMonitor location={location} />
  };

  render() {
    const { location: { query } } = this.props;

    return (
      <Page inner>
        <Breadcrumb style={{ marginBottom: '32px' }} separator=">">
          <Breadcrumb.Item>
            <Link to='/docker-vm'>远程可视化</Link>
          </Breadcrumb.Item>
          {query.detail ?
            <Breadcrumb.Item>详细信息</Breadcrumb.Item>
            : <Breadcrumb.Item>资源监控</Breadcrumb.Item>}
        </Breadcrumb>

        {this.renderChildren()}
      </Page>
    )
  }
}

export default DockerInfos
