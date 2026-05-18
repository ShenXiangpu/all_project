import { Row, Select, InputNumber, Tooltip, Icon, Col, Form } from 'antd'
import React, { PureComponent } from 'react'
import styles from "./DataDisk.less";

const { Option } = Select;

let id = 1;
class DataDisk extends PureComponent {
  state = {
    diskList: [],           // 更多数据盘列表，默认显示一条（数组长度是1）
    diskNum: 20              // 默认可增加的总数据盘数量
  }

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
    console.log('changed', value);
  }

  addDisk = () => {
    const { diskList } = this.state;
    diskList.push(id++);
    this.setState({
      diskList,
      diskNum: 20 - diskList.length
    });
    this.forceUpdate();
  }

  remove = key => {
    const { diskList } = this.state;
    var index = diskList.indexOf(key);
    diskList.splice(index, 1);
    this.setState({
      diskList,
      diskNum: 20 - diskList.length
    });
    this.forceUpdate();
  }

  onNumberChange = value => {

  }

  // 等待后端实现可挂载多个数据盘，暂时注释掉
  getMoreDisks = () => {
    const { diskList } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const diskItems = diskList && diskList.map(item => {
      return (
        <Row key={item} className={styles.row}>
          <Col span={22}>
            <Row style={{ marginBottom: '10px' }}>
              <Form.Item
                className={styles.noBtom}
                required={false}
              >
                {getFieldDecorator(`ssd[${item}]`, {
                  initialValue: 'ssd'
                })(
                  <Select
                    style={{ width: 150 }}
                    getPopupContainer={() => document.getElementById('data')}
                  >
                    <Option value='ssd'>云盘</Option>
                  </Select>
                )}
              </Form.Item>

              <Tooltip placement="top" title='容量范围：20 ~ 1024'>

                <Form.Item
                  className={styles.noBtom}
                  required={false}
                >
                  {getFieldDecorator(`size[${item}]`, {
                    initialValue: 40
                  })(
                    <InputNumber
                      min={20}
                      max={1024}
                      formatter={this.limitNumber}
                      parser={this.limitNumber}
                      onChange={this.onInputChange}
                    />
                  )}
                  <span style={{ color: "#999" }}> GB</span>
                </Form.Item>
              </Tooltip>

              <Form.Item
                className={styles.noBtom}
                label="数量"
                required={false}
              >
                {getFieldDecorator(`num[${item}]`, {
                  initialValue: 1
                })(
                  <InputNumber
                    min={1}
                    max={20}
                    formatter={this.limitNumber}
                    parser={this.limitNumber}
                    onChange={this.onNumberChange}
                  />
                )}
              </Form.Item>
            </Row>
            <Row>
              <span style={{ color: "#999" }}>基准性能：1880 IOPS, 101.5 MB/s 带宽</span>
            </Row>
          </Col>
          <Col span={2}>
            <a
              className={styles.close}
              onClick={() => this.remove(item)}
            >
              <Icon type="close" />
            </a>
          </Col>
        </Row>
      )
    });
  }

  getOneDisks = () => {
    const { form, diskSizeMB } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Row className={styles.row}>
        <Col span={24}>
          <Row style={{ marginBottom: '10px' }}>
            {/* <Form.Item
              className={styles.noBtom}
              required={false}
            >
              {getFieldDecorator('ssd', {
                initialValue: 'ssd'
              })(
                <Select
                  style={{ width: 150 }}
                  getPopupContainer={() => document.getElementById('data')}
                >
                  <Option value='ssd'>云盘</Option>
                </Select>
              )}
            </Form.Item> */}

            <Tooltip placement="top" title='容量范围：20 ~ 1024'>
              <Form.Item
                className={styles.noBtom}
                required={false}
              >
                {getFieldDecorator('diskSizeMB', {
                  initialValue: diskSizeMB || 40
                })(
                  <InputNumber
                    min={20}
                    max={1024}
                    formatter={this.limitNumber}
                    parser={this.limitNumber}
                    onChange={this.onInputChange}
                  />
                )}
                <span style={{ color: "#999" }}> GB</span>
              </Form.Item>
            </Tooltip>
          </Row>
        </Col>
      </Row>
    )
  }

  render() {
    const { diskNum } = this.state;

    return (
      <div id='data'>
        <Form layout="inline">
          {this.getOneDisks()}

          {/* {this.getMoreDisks()}

          <p style={{ marginTop: '10px', marginBottom: 0 }}>
            <a
              onClick={() => this.addDisk()}
            >
              <Icon type="plus" style={{ marginRight: '5px', fontSize: '14px' }} />增加一块数据盘
            </a>
            <span className={styles.sp}>还可增加<label>{diskNum}</label>块盘</span>
          </p> */}
        </Form>
      </div>
    )
  }
}
export default DataDisk
