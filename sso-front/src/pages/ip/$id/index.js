import React, { PureComponent } from 'react';
import { connect } from 'dva'
import { router } from 'utils'
import { Row, Col, Card, Divider, Button, Breadcrumb, List, Icon, Spin } from 'antd'
import styles from "./styles.less";
import Link from 'umi/link';

@connect(({ ipCloud, loading }) => ({ ipCloud, loading }))
class IpDetail extends PureComponent {
  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props
    dispatch({
      type: 'ipCloud/getIpDetailByID',
      payload: { id },
    })
  }

  handleIpClick = (e, value) => {
    // const { dispatch } = this.props
    router.replace({ pathname: `/ip/${value}` })
    location.reload();
  }

  render() {
    const { loading, ipCloud } = this.props;
    const { currentIP, providerIpList } = ipCloud;
    let data = [];
    if (providerIpList && providerIpList.length > 5) {
      data = providerIpList.slice(0, 5);  //截取前5条
    } else {
      data = providerIpList;
    }

    return (
      <div className={styles.content}>
        <Breadcrumb style={{ marginBottom: '12px' }} separator=">">
          <Breadcrumb.Item>
            <Link to='/ip'>IP共享云</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            IP详情
          </Breadcrumb.Item>
        </Breadcrumb>

        <Spin spinning={loading.effects['ipCloud/getIpDetailByID']} >
          <Row>
            <Card bordered={false}>
              <h2 className={styles.title}>{currentIP && currentIP.name} </h2>
            </Card>
          </Row>
          <Row style={{ marginTop: '24px' }}>
            <Col span={18}>
              <Card bordered={false}>
                <Row>
                  <Col span={4}>简单描述</Col>
                  <Col span={20}>{currentIP && currentIP.name}</Col>
                </Row>
                <Divider dashed />
                <Row>
                  <Col span={4}>IP供应商</Col>
                  <Col span={20}>{currentIP && currentIP.providerName}</Col>
                </Row>
                <Divider dashed />
                <Row>
                  <Col span={4}>详细信息</Col>
                  <Col span={20}>{currentIP && currentIP.profile}</Col>
                </Row>
                <Divider dashed />
                <Row>
                  <Col span={4}>最后更新日期</Col>
                  <Col span={20}>{currentIP && currentIP.createTime && currentIP.createTime.split(' ')[0]}</Col>
                </Row>
              </Card>
            </Col>
            <Col span={6} style={{ paddingLeft: '24px' }}>
              {/* <Row>
                <Button type="primary" style={{ marginRight: '12px' }}>下载数据</Button>
                <Button type="primary">联系供应商</Button>
              </Row>
              <Divider /> */}
              <h3 className={styles.lineTitle}>公司特色IP</h3>
              <Card bordered={false}>
                <List
                  dataSource={data}
                  renderItem={item => (
                    <List.Item>
                      <a className={styles.color} onClick={e => this.handleIpClick(e, item.id)}>
                        <Icon type="right" style={{ color: '#1890ff' }} /> {item.name}
                      </a>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Spin>
      </div>
    )
  }
}
export default IpDetail
