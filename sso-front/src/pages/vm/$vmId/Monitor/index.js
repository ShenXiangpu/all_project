import React, { PureComponent } from 'react';
import Filter from './components/Filter'
import Charts from './components/Charts'
import styles from './style.less'
import classnames from 'classnames';
import { Col, Icon, Row, Card, Spin } from 'antd';
import CPUSvg from 'assets/vm/cpu-usage.svg'
import MemorySvg from 'assets/vm/memory-usage.svg'
import DiskSvg from 'assets/vm/disk-usage.svg'

class Monitor extends PureComponent {



  render() {
    const {
      onSearch,
      summaryLoading,
      vmPerformanceSummary,
      chartsLoading,
      vmChartsData,
    } = this.props;

    return (
      <div>
        <Card
          size="small"
          style={{ marginBottom: '15px' }}
        >
          <Row className={styles.row}>
            <Col span={8} className={styles.col}>
              <Spin spinning={summaryLoading}>
                <Icon component={CPUSvg} className={styles.icon} />
                <span className={styles.title}>CPU使用情况</span>
                <span className={styles.value}>
                  <label>{vmPerformanceSummary && vmPerformanceSummary.cpuUsage}</label>
                  MHz
                </span>
              </Spin>
            </Col>
            <Col span={8} className={classnames(styles.col, styles.middleCol)}>
              <Spin spinning={summaryLoading}>
                <Icon component={MemorySvg} className={styles.icon} />
                <span className={styles.title}>内存使用情况</span>
                <span className={styles.value}>
                  <label style={{ color: 'rgb(255, 148, 22)' }}>
                    {vmPerformanceSummary && vmPerformanceSummary.memoryUsage}
                  </label>
                  GB
                </span>
              </Spin>
            </Col>
            <Col span={8} className={styles.col}>
              <Spin spinning={summaryLoading}>
                <Icon component={DiskSvg} className={styles.icon} />
                <span className={styles.title}>存储使用情况</span>
                <span className={styles.value}>
                  <label style={{ color: 'rgb(91, 143, 217)' }}>
                    {vmPerformanceSummary && vmPerformanceSummary.diskUsage}
                  </label>
                  GB
                </span>
              </Spin>
            </Col>
          </Row>
        </Card>

        <Filter onSearch={onSearch} />
        {vmChartsData && vmChartsData.length === 0 ?
          <p className={styles.description}>没有足够的数据绘制图表</p> :
          <Charts chartsData={vmChartsData} chartsLoading={chartsLoading} />
        }
      </div>
    )
  }
}

export default Monitor
