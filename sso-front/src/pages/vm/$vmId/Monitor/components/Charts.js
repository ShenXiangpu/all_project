import React, { PureComponent } from 'react'
import { Row, Col, Spin } from 'antd'
import AutoEchart from './AutoEchart'

class Charts extends PureComponent {
  render() {
    const { chartsData, chartsLoading } = this.props;

    const cpuChartsData = chartsData && chartsData.length > 0 && chartsData[0];
    const memoryChartsData = chartsData && chartsData.length > 1 && chartsData[1];
    const netChartsData = chartsData && chartsData.length > 2 && chartsData[2];
    const diskChartsData = chartsData && chartsData.length > 3 && chartsData[3];

    return (
      <div>
        <Row gutter={24}>
          <Col span={12}>
            <Spin spinning={chartsLoading}>
              {cpuChartsData.length > 0 &&
                <AutoEchart docId="cpu" graphID="CPU" data={cpuChartsData} />
              }
            </Spin>
          </Col>
          <Col span={12}>
            <Spin spinning={chartsLoading}>
              {memoryChartsData.length > 0 &&
                <AutoEchart docId="memory" graphID="内存" data={memoryChartsData} />
              }
            </Spin>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: '15px' }}>
          <Col span={12}>
            <Spin spinning={chartsLoading}>
              {netChartsData.length > 0 &&
                <AutoEchart docId="net" graphID="网络" data={netChartsData} />
              }
            </Spin>
          </Col>
          <Col span={12}>
            <Spin spinning={chartsLoading}>
              {diskChartsData.length > 0 &&
                <AutoEchart docId="card" graphID="磁盘" data={diskChartsData} />
              }
            </Spin>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Charts;
