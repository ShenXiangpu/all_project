import { Row, Col, Radio, Divider, Slider, InputNumber } from 'antd';
import React, { PureComponent } from 'react'
import classNames from 'classnames';
import { isEqual } from 'lodash';
import styles from "../BasicConfig/index.less";

const marks = {
  1: '1M',
  25: '25M',
  50: '50M',
  75: '75M',
  100: '100M'
};

class NetworkConfig extends PureComponent {
  state = {
    rdValue: '',          // 当前选中的网络带宽
    inputValue: 1,
  };

  componentDidMount() {
    const { networkList, currentItem } = this.props;
    if (currentItem.networkFlavorId) {
      this.setState({ rdValue: currentItem.networkFlavorId });
    } else {
      this.setDefaultChecked(networkList);
    }
  }

  componentDidUpdate(prevProps) {
    const { networkList } = this.props;
    const { networkList: old_networkList } = prevProps;
    if (!isEqual(networkList, old_networkList)) {
      this.setDefaultChecked(networkList);
    }
  }

  setDefaultChecked = (networkList) => {
    const { setNetworkValue } = this.props;
    let { rdValue } = this.state;
    rdValue = networkList && networkList.length > 0 ? networkList[0].id : '';  // 默认第一个
    this.setState({ rdValue });
    setNetworkValue(rdValue);
  }

  onChange = value => {
    this.setState({
      inputValue: value,
    });
  };

  onRadioChange = e => {
    const { setNetworkValue } = this.props;
    const checkedNetId = e.target.value;
    this.setState({
      rdValue: checkedNetId
    });
    setNetworkValue(checkedNetId);
  };

  render() {
    const { inputValue, rdValue } = this.state;
    const { networkList } = this.props;

    const netRadioBtns = networkList && networkList.length > 0 && networkList.map(t => {
      return (
        <Radio.Button key={t.id} value={t.id}>{t.flavorName}</Radio.Button>
      )
    })

    return (
      <div id="area" className={styles.main}>
        <Row>
          <Col span={2}><span>网络</span></Col>
          <Col span={22}>
            <Radio.Group size="small" value="network" className={styles.rd}>
              <Radio.Button value="network">专有网络</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={2}><span>带宽计费模式</span></Col>
          <Col span={22}>
            <Radio.Group size="small" value="payByBandWidth" className={styles.rd}>
              <Radio.Button value="payByBandWidth">按固定带宽</Radio.Button>
              {/* <Radio.Button value="payByTraffic">按使用流量</Radio.Button> */}
            </Radio.Group>
          </Col>
        </Row>
        <Row style={{ marginTop: 30 }}>
          <Col span={2}><span>带宽值</span></Col>
          <Col span={16}>
            <Radio.Group className={classNames(styles.rd, styles.rd1)} onChange={this.onRadioChange} value={rdValue}>
              {netRadioBtns}
            </Radio.Group>
          </Col>
          {/* <Col span={12}>
            <Slider
              marks={marks}
              defaultValue={1}
              onChange={this.onChange}
              value={typeof inputValue === 'number' ? inputValue : 0}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={1}
              max={100}
              style={{ marginLeft: 30 }}
              value={inputValue}
              onChange={this.onChange}
            /> Mbps
          </Col> */}
        </Row>
      </div>
    )
  }
}
export default NetworkConfig
