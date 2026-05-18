import React, { PureComponent } from 'react';
import { Select, Row, Radio } from 'antd';
import styles from "./InstanceFilter.less";
import { isEmpty, isEqual } from 'lodash';

const { Option } = Select

class InstanceFilter extends PureComponent {

  handleChange = (value, filter) => {
    // console.log(`selected ${value} ${filter}`);
    const { setInstanceFilter } = this.props;
    const data = {
      [`${filter}`]: value
    }
    setInstanceFilter(data);
  }

  handleRadioChange = e => {
    // console.log('radio checked:', e.target.value);
    const { setInstanceFilter } = this.props;
    const value = e.target.value;
    const data = {
      flavorType: isEqual(value, '') ? null : value
    }
    setInstanceFilter(data);
  }

  sort = arr => {
    let min;
    //遍历数组，默认arr中的某一个元素为最大值，进行逐一比较
    for (let i = 0; i < arr.length; i++) {
      //外层循环一次，就拿arr[i] 和 内层循环arr.legend次的 arr[j] 做对比
      for (let j = i; j < arr.length; j++) {
        if (arr[i] > arr[j]) {
          //如果arr[j]大就把此时的值赋值给最大值变量max
          min = arr[j];
          arr[j] = arr[i];
          arr[i] = min;
        }
      }
    }
    return arr;
  }

  render() {
    const { vmTypes, item, list } = this.props;

    const cpuCoreCounts = [];
    list.map(item => cpuCoreCounts.push(item.cpu));
    let cpuList = Array.from(new Set(cpuCoreCounts));
    cpuList = this.sort(cpuList);
    const memorySizes = [];
    list.map(item => memorySizes.push(item.memory));
    let memoryList = Array.from(new Set(memorySizes));
    memoryList = this.sort(memoryList);

    return (
      <div id='filter'>
        <Row style={{ marginBottom: 10 }}>
          <Select
            getPopupContainer={() => document.getElementById('filter')}
            defaultValue={item && item.cpu ? item.cpu : ''}
            className={styles.slt}
            onChange={value => this.handleChange(value, 'cpu')}
          >
            <Option value=''>全部CPU</Option>
            {/* {cpuList && cpuList.length > 0 && cpuList.map(item => (
              <Option key={item} value={item}>{item} 核</Option>
            ))} */}
            {vmTypes && vmTypes.cpu && vmTypes.cpu.length > 0 && vmTypes.cpu.map(ele => (
              <Option value={ele} key={ele}>{ele} 核</Option>
            ))}
          </Select>
          <Select
            getPopupContainer={() => document.getElementById('filter')}
            defaultValue={item && item.memory ? item.memory : ''}
            className={styles.slt}
            onChange={value => this.handleChange(value, 'memory')}
          >
            <Option value=''>全部内存</Option>
            {/* {memoryList && memoryList.length > 0 && memoryList.map(item => (
              <Option key={item} value={item}>{item} GB</Option>
            ))} */}
            {vmTypes && vmTypes.memory && vmTypes.memory.length > 0 && vmTypes.memory.map(ele => (
              <Option value={ele} key={ele}>{ele} G</Option>
            ))}
          </Select>
        </Row>
        <Row style={{ marginBottom: 10 }}>
          <Radio.Group
            size="small"
            defaultValue={item && item.flavorType ? item.flavorType : ''}
            className={styles.rd}
            onChange={this.handleRadioChange}
          >
            <Radio.Button value={""}>全部机型</Radio.Button>
            {vmTypes && vmTypes.flavorType && vmTypes.flavorType.length > 0 && vmTypes.flavorType.map(ele => (
              <Radio.Button value={ele} key={ele}>{ele}</Radio.Button>
            ))}
          </Radio.Group>
        </Row>
      </div>
    )
  }
}
export default InstanceFilter
