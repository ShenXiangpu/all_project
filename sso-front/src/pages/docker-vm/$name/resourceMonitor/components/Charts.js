import React, { PureComponent } from 'react'
import { Row, Col } from 'antd'
import AutoEchart from './AutoEchart'

class Charts extends PureComponent {
  render() {
    const { chartsData } = this.props;

    const cpuChartsData = chartsData && chartsData.filter(item => item.graphID === 'CPU')
    const memoryChartsData = chartsData && chartsData.filter(item => item.graphID === '内存')
    const netChartsData = chartsData && chartsData.filter(item => item.graphID === '网络数据包')
    const netioChartsData = chartsData && chartsData.filter(item => item.graphID === '网络I/O')
    const cardChartsData = chartsData && chartsData.filter(item => item.graphID === '磁盘I/O')

    return (
      <div>
        <Row gutter={24}>
          <Col span={8}>
            {cpuChartsData.length > 0 &&
              <AutoEchart docId="cpu" graphID={cpuChartsData[0].graphID} data={cpuChartsData[0].series} />
            }
          </Col>
          <Col span={8}>
            {memoryChartsData.length > 0 &&
              <AutoEchart docId="memory" graphID={memoryChartsData[0].graphID} data={memoryChartsData[0].series} />
            }
          </Col>
          <Col span={8}>
            {netChartsData.length > 0 &&
              <AutoEchart docId="net" graphID={netChartsData[0].graphID} data={netChartsData[0].series} />
            }
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={8}>
            {netioChartsData.length > 0 &&
              <AutoEchart docId="netio" graphID={netioChartsData[0].graphID} data={netioChartsData[0].series} />
            }
          </Col>
          <Col span={8}>
            {cardChartsData.length > 0 &&
              <AutoEchart docId="card" graphID={cardChartsData[0].graphID} data={cardChartsData[0].series} />
            }
          </Col>
        </Row>
      </div>
    )
  }
}

export default Charts;
