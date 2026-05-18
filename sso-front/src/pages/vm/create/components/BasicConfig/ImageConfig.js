import { Row, Select, Radio, Icon } from 'antd'
import React, { PureComponent } from 'react'
import bcStyles from "./index.less";
import styles from "./ImageConfig.less";
import CentosSvg from 'assets/cent-os.svg'

const { Option } = Select;
class ImageConfig extends PureComponent {

  handleChange = (value) => {
    console.log(value);
  }

  handleChange2 = (value) => {
    console.log(value);
  }

  render() {
    return (
      <div id='image' className={styles.select}>
        <Row style={{ marginBottom: 10 }}>
          <Radio.Group size="small" value="publicImage" className={bcStyles.rd}>
            <Radio.Button value="publicImage">公共镜像</Radio.Button>
          </Radio.Group>
        </Row>
        <Row>
          <Select
            defaultValue='CentOS'
            style={{ width: 150 }}
            getPopupContainer={() => document.getElementById('image')}
          >
            <Option value='CentOS'><Icon component={CentosSvg} /><span style={{ marginLeft: 5 }}>CentOS</span></Option>
          </Select>
          <Select
            defaultValue='64bit'
            style={{ width: 150, marginLeft: 10, marginRight: 10 }}
            getPopupContainer={() => document.getElementById('image')}
            onChange={this.handleChange}
          >
            <Option value='64bit'>64位</Option>
          </Select>
          <Select
            optionLabelProp="label"
            defaultValue='7'
            style={{ width: 400 }}
            getPopupContainer={() => document.getElementById('image')}
            onChange={this.handleChange2}
          >
            <Option value='7' label="CentOS 7 64位">
              CentOS 7 64位
            </Option>
          </Select>
        </Row>
      </div>
    )
  }
}
export default ImageConfig
