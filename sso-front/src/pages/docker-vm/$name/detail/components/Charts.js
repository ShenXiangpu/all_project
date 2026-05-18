import React, { PureComponent } from 'react'
import { Row, Col } from 'antd'
import AutoEchart from './AutoEchart'
import styles from './Filter.less'

class Charts extends PureComponent {
  render() {
    const { chartsData } = this.props;

    const cpuChartsData = chartsData && chartsData.filter(item => item.graphID === 'CPU')
    const memoryChartsData = chartsData && chartsData.filter(item => item.graphID === '内存')
    const netChartsData = chartsData && chartsData.filter(item => item.graphID === '网络数据包')

    return (
      <div>
        <Row gutter={24} className={styles.chartRow}>
          <Col span={24} className={styles.chartCol}>
            {cpuChartsData.length > 0 &&
              <AutoEchart docId="cpu" graphID={cpuChartsData[0].graphID} data={cpuChartsData[0].series} />
            }
          </Col>
        </Row>
        <Row gutter={24} className={styles.chartRow} style={{ marginTop: '10px', marginBottom: '10px' }}>
          <Col span={24} className={styles.chartCol}>
            {memoryChartsData.length > 0 &&
              <AutoEchart docId="memory" graphID={memoryChartsData[0].graphID} data={memoryChartsData[0].series} />
            }
          </Col>
        </Row>
        <Row gutter={24} className={styles.chartRow}>
          <Col span={24} className={styles.chartCol}>
            {netChartsData.length > 0 &&
              <AutoEchart docId="net" graphID={netChartsData[0].graphID} data={netChartsData[0].series} />
            }
          </Col>
        </Row>
      </div>
    )
  }
}

export default Charts;
