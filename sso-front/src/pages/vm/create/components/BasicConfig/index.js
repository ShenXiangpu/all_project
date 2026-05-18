import React, { PureComponent } from 'react'
import { Form, Row, Col, Divider, Radio } from 'antd';
import CheckTools from './CheckTools'
import styles from "./index.less";
import Instance from './Instance';
import ImageConfig from "./ImageConfig";
import SystemDisk from "./SystemDisk";
import DataDisk from "./DataDisk";
import ScanConfig from "./ScanConfig";
import { isEmpty, isEqual } from 'lodash-es';

const list = [];
for (let i = 0; i < 20; i++) {
  list.push({
    key: i,
    id: i,
    familyLabel: `标准型 ${i}`,
    instanceTypeId: 'ecs.s6-c1m1.small',
    cpuCoreCount: '1vCPU',
    memorySize: '1GiB',
    baselineCredit: 1,
    clockSpeed: '2.5 GHz/3.2 GHz',
    intranetBandwidth: '最高1.5Gbps',
    privatePPS: '15万PPS',
    storageEnhancementCategory: 1,
    eniIpv6AddressQuantity: '是',
    referencePrice: '￥ 33.0 /月',
    physicalProcessor: 'Intel(R) Xeon(R) Platinum 8269CY',
  });
}

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
      item
    } = this.props;

    return {
      filterProps: {
        vmTypes,
        setInstanceFilter,
        list: templateList,
        item: item && item.instanceFilter,
      },
      listProps: {
        item: item && item.instanceConfig,
        list: templateList,
        onSetInstanceConfig: values => {
          console.log('instanceConfig:', values);
          setInstanceConfig(values);
        }
      },
    }
  }

  get toolProps() {
    const { form, toolList, item, setVmToolsInfo, setActiveDiv, vmTools } = this.props;
    return {
      vmTools,
      activeDiv: item.activeDiv || [],
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
          <Col span={2}><span>付费模式</span></Col>
          <Col span={22}>
            <Radio.Group size="small" value="year" className={styles.rd}>
              <Radio.Button value="year">包年包月</Radio.Button>
            </Radio.Group>
          </Col>
        </Row>
        <Divider />
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
        <Row style={{ marginTop: '20px' }}>
          <Col span={2}><span>当前选择实例</span></Col>
          <Col span={22}>
            <span>
              {/* <label style={isEqual(isExists, false) ? { color: '#f01b1b' } : {}}> */}
                {item && item.instanceConfig && item.instanceConfig.flavorName}
              {/* </label> */}
              （
              {item && item.instanceConfig && item.instanceConfig.cpu}核&nbsp;
              {item && item.instanceConfig && item.instanceConfig.memory}GB，
              {item && item.instanceConfig && item.instanceConfig.flavorType}
              ）
            </span>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={2}><span>镜像</span></Col>
          <Col span={22}>
            <ImageConfig />
          </Col>
        </Row>
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
            <DataDisk form={form} diskSizeMB={item && item.diskSizeMB} />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={2}><span>快照服务</span></Col>
          <Col span={22}>
            <ScanConfig form={form} setScanDays={setScanDays} autoSnapshotPolicy={item && item.autoSnapshotPolicy || {}} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default BasicConfig;
