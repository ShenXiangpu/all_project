import { Row, Col, Radio, Divider, Slider, InputNumber } from 'antd';
import React, { PureComponent } from 'react'
import classNames from 'classnames';
import { isEqual } from 'lodash';
import styles from "./index.less";

class NetworkConfig extends PureComponent {
  state = {
    rdValue: '',          // 当前选中的网络带宽
    inputValue: 1,
  };

  componentDidMount() {
    const { networkList, currentItem } = this.props;
    if (currentItem.networkFlavorId || currentItem.netNameId) {
      this.setState({ rdValue: currentItem.networkFlavorId || currentItem.netNameId });
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
        <Divider />
        <Row style={{ marginTop: '20px' }}>
          <Col span={2}><span>网络计费模式</span></Col>
          <Col span={22}>
            <Radio.Group size="small" value="payByBandWidth" className={styles.rd}>
              <Radio.Button value="payByBandWidth">按固定带宽</Radio.Button>
              {/* <Radio.Button value="payByTraffic">按使用流量</Radio.Button> */}
            </Radio.Group>
          </Col>
        </Row>
        <Row style={{ marginTop: '13px' }}>
          <Col span={2}><span>目标带宽</span></Col>
          <Col span={22}>
            <Radio.Group className={classNames(styles.rd, styles.rd1)} onChange={this.onRadioChange} value={rdValue}>
              {netRadioBtns}
            </Radio.Group>
          </Col>
        </Row>
      </div>
    )
  }
}
export default NetworkConfig
