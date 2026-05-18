import React, { PureComponent } from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import { Row, Col, Card, Icon, Button } from 'antd'
import styles from './index.less';
import DataSvg from 'assets/index/data.svg';
import TaskSvg from 'assets/index/task.svg';
import CloudSvg from 'assets/index/cloud.svg';
import { router } from 'umi';

const { Meta } = Card;

class IndexPage extends PureComponent {

  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.title}>欢迎使用 高性能EDA云平台</div>
        <Row>
          <Col span={8} className={classNames(styles.col1, styles.col)}>
            <Card className={styles.card}>
              <Meta
                avatar={
                  <Icon component={DataSvg} style={{ fontSize: '68px' }} />
                }
                title="数据管理"
                description={
                  <div>
                    <div className={styles.content}>
                      <p>设计工具文件管理，提供各层级安全机制保障机制，确保数据及作业安全运行。</p>
                    </div>
                    <Button type="primary" ghost onClick={() => { router.push('/dictionary') }} >开始使用</Button>
                  </div>
                }
              />
            </Card>
          </Col>
          <Col span={8} className={classNames(styles.col2, styles.col)}>
            <Card className={styles.card}>
              <Meta
                avatar={
                  <Icon component={TaskSvg} style={{ fontSize: '68px' }} />
                }
                title="新建任务"
                description={
                  <div>
                    <div className={styles.content}>
                      <p>通过任务的方式运行工具，启动高性能并行计算，只需要上传工具文件数据并配置相关参数，即可开启计算集群运行任务。</p>
                    </div>
                    <Button type="primary" ghost onClick={() => { router.push('/task') }} disabled>敬请期待</Button>
                  </div>
                }
              />
            </Card>
          </Col>
          <Col span={8} className={classNames(styles.col3, styles.col)}>
            <Card className={styles.card}>
              <Meta
                avatar={
                  <Icon component={CloudSvg} style={{ fontSize: '68px' }} />
                }
                title="IC设计云服务器"
                description={
                  <div>
                    <div className={styles.content}>
                      <p>一站式网络化服务，快捷搭建IC设计云服务器，聚焦设计流程本身。</p>
                    </div>
                    <Button type="primary" ghost onClick={() => { router.push('/vm') }}>开始使用</Button>
                  </div>
                }
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
