import React, { PureComponent } from 'react'
import { Form, Row, Col, Divider, Radio } from 'antd';
import CheckTools from './CheckTools'
import styles from "./index.less";
import Instance from './Instance';
import SystemDisk from "./SystemDisk";
import DataDisk from "./DataDisk";
import NetworkConfig from './NetworkConfig';
import { isEmpty, isEqual } from 'lodash-es';

class BasicConfig extends PureComponent {

  dedupe = (arr) => {
    const newSet = new Set(arr);  // arr变成了set的数据结构，并去除了其中重复的元素
    return Array.from(newSet);  // Array.from方法将set数据结构转为数组数据结构
  }

  get instanceProps() {
    const { vmTypes,
      templateList,
      setInstanceFilter,
      setInstanceConfig,
      item,
      vmInfo
    } = this.props;

    return {
      vmInfo, // 调整配置用户端使用
      filterProps: {
        vmTypes,
        setInstanceFilter,
        list: templateList,
        item: item && item.instanceFilter,
      },
      listProps: {
        vmInfo:item, // 调整配置群组使用
        item: item && item.instanceConfig,
        list: templateList,
        onSetInstanceConfig: values => {
          // console.log('instanceConfig:', values);
          setInstanceConfig(values);
        }
      },
    }
  }

  get toolProps() {
    const { form, toolList, item, setVmToolsInfo, setActiveDiv, vmTools,vmInfo } = this.props;
    return {
      vmTools,
      vmInfo,
      activeDiv: (item && item.activeDiv) || [],
      form,
      toolList,
      setVmToolsInfo: values => {
        setVmToolsInfo(values);
      },
      setActiveDiv: values => {
        setActiveDiv(values);
      },
    }
  }

  get networkConfigProps() {
    const { networkList, item, setNetWork } = this.props;

    return {
      networkList,
      currentItem: item,
      setNetworkValue: value => {
        setNetWork(value);
      },
    }
  }

  render() {
    const { form, toolList, setScanDays, item, templateList } = this.props;

    const checkedInstance = item && item.instanceConfig;
    let isExists = true;  // 当前选中的实例规格，在实例列表里是否存在，默认存在
    if (!isEmpty(checkedInstance)) {
      const arr = templateList.filter(ele => ele.id === checkedInstance.id);
      if (arr && isEqual(arr.length, 0)) {
        isExists = false;
      }
    }

    return (
      <div id="area" className={styles.main}>
        <Row>
          <Col span={2}><span>工具选择</span></Col>
          <Col span={22}>
            <CheckTools {...this.toolProps} />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={2}><span>实例规格</span></Col>
          <Col span={22}>
            <Instance {...this.instanceProps} />
          </Col>
        </Row>
        {item && item.instanceConfig &&
          <Row style={{ marginTop: '20px' }}>
            <Col span={2}><span>当前选择实例</span></Col>
            <Col span={22}>
              <span>
                {/* <label style={isEqual(isExists, false) ? { color: '#f01b1b' } : {}}> */}
                {item.instanceConfig.flavorName}
                {/* </label> */}
                （
                {item.instanceConfig.cpu}核&nbsp;
                {item.instanceConfig.memory}GB，
                {item.instanceConfig.flavorType}
                ）
              </span>
            </Col>
          </Row>
        }
        <Divider />
        {/* <Row>
          <Col span={2}><span>系统盘</span></Col>
          <Col span={22}>
            <SystemDisk />
          </Col>
        </Row> */}
        <Row style={{ marginTop: '20px' }}>
          <Col span={2}><span>数据盘</span></Col>
          <Col span={22}>
            <DataDisk form={form} diskSizeMB={item && item.disk/1024} />
          </Col>
        </Row>
        <NetworkConfig {...this.networkConfigProps} />
      </div>
    )
  }
}

export default BasicConfig;
