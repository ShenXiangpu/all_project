import { Row, Select, InputNumber, Tooltip } from 'antd'
import React, { PureComponent } from 'react'

const { Option } = Select;
class SystemDisk extends PureComponent {

  limitNumber = value => {
    if (typeof value === 'string') {
      return !isNaN(Number(value)) ? value.replace(/^(0+)|[^\d]/g, '') : ''
    } else if (typeof value === 'number') {
      return !isNaN(value) ? String(value).replace(/^(0+)|[^\d]/g, '') : ''
    } else {
      return ''
    }
  }

  onInputChange = value => {
    // console.log('changed', value);
  }

  render() {
    return (
      <div id='system'>
        <Row>
          <Select
            defaultValue='ssd'
            style={{ width: 150, marginRight: 10 }}
            getPopupContainer={() => document.getElementById('system')}
          >
            <Option value='ssd'>云盘</Option>
          </Select>
          {/* <Tooltip placement="top" title='容量范围：20 ~ 500'> */}
            <InputNumber
              min={16}
              max={500}
              defaultValue={40}
              onChange={this.onInputChange}
              formatter={this.limitNumber}
              parser={this.limitNumber}
            /> GB
          {/* </Tooltip> */}
        </Row>
      </div>
    )
  }
}
export default SystemDisk
