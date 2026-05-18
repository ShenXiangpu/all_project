import { Checkbox, Col, Row, Select } from 'antd'
import React, { PureComponent } from 'react'
import styles from "./ScanConfig.less";

const { Option } = Select;

class ScanConfig extends PureComponent {
  onChange = e => {
    console.log(`checked = ${e.target.checked}`);
  }

  render() {
    return (
      <Row>
        <Col span={12} className={styles.col} style={{ paddingRight: '10px' }}>
          <div className={styles.panel}>
            <Checkbox
              style={{ marginBottom: '10px' }}
              onChange={this.onChange}
            >
              对系统盘设置定期快照
            </Checkbox>
            <br />
            <Select
              defaultValue='policy'
              style={{ width: '100%' }}
              getPopupContainer={() => document.getElementById('image')}
            >
              <Option value='policy'>
                <span title="asp-joj8aatb，星期四、星期五，1:00 自动创建快照">default-policy|星期四...|1:00|保留30天后自动删除</span>
              </Option>
            </Select>
          </div>
        </Col>
        <Col span={12} className={styles.col} style={{ paddingLeft: '10px' }} >
          <div className={styles.panel}>
            <Checkbox
              style={{ marginBottom: '10px' }}
              onChange={this.onChange}
            >
              对数据盘设置定期快照
            </Checkbox>
            <br />
            <Select
              defaultValue='policy'
              style={{ width: '100%' }}
              getPopupContainer={() => document.getElementById('image')}
            >
              <Option value='policy'>
                <span title="asp-joj8aatb，星期四、星期五，1:00 自动创建快照">default-policy|星期四...|1:00|保留30天后自动删除</span>
              </Option>
            </Select>
          </div>
        </Col>
      </Row>
    )
  }
}
export default ScanConfig
