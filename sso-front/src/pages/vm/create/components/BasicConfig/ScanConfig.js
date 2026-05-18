import { Form, Checkbox, Row, Col, Radio, InputNumber } from 'antd'
import { isEqual } from 'lodash';
import React, { PureComponent } from 'react'
import styles from "./ScanConfig.less";

const weekOptions = [
  { label: '每周日', value: '1' },
  { label: '每周一', value: '2' },
  { label: '每周二', value: '3' },
  { label: '每周三', value: '4' },
  { label: '每周四', value: '5' },
  { label: '每周五', value: '6' },
  { label: '每周六', value: '7' },
];

const hourOptions = [
  { label: '00:00', value: '0' },
  { label: '01:00', value: '1' },
  { label: '02:00', value: '2' },
  { label: '03:00', value: '3' },
  { label: '04:00', value: '4' },
  { label: '05:00', value: '5' },
  { label: '06:00', value: '6' },
  { label: '07:00', value: '7' },
  { label: '08:00', value: '8' },
  { label: '09:00', value: '9' },
  { label: '10:00', value: '10' },
  { label: '11:00', value: '11' },
  { label: '12:00', value: '12' },
  { label: '13:00', value: '13' },
  { label: '14:00', value: '14' },
  { label: '15:00', value: '15' },
  { label: '16:00', value: '16' },
  { label: '17:00', value: '17' },
  { label: '18:00', value: '18' },
  { label: '19:00', value: '19' },
  { label: '20:00', value: '20' },
  { label: '21:00', value: '21' },
  { label: '22:00', value: '22' },
  { label: '23:00', value: '23' },
];

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

class ScanConfig extends PureComponent {
  state = {
    days: 7      //默认初始值
  }

  onChange = value => {
    const { setScanDays } = this.props;
    if (!value) {
      this.setState({ days: 7 })
    } else {
      this.setState({ days: value })
    }
    const days = value || 7;
    setScanDays(days);
  }

  render() {
    const { form, autoSnapshotPolicy } = this.props;
    const { getFieldDecorator } = form;
    const { days } = this.state;

    return (
      <div className={styles.scan}>
        <Form.Item
          label="备份日期"
          required={false}
          {...formItemLayout}
          colon={false}
          labelAlign="left"
        >
          {getFieldDecorator('dayOfWeek', {
            initialValue: autoSnapshotPolicy.dayOfWeek || [],
            // rules: [
            //   {
            //     required: true,
            //     message: '请选择执行定期快照的时间'
            //   },
            // ],
          })(
            <Checkbox.Group>
              {weekOptions.map(item => {
                return (
                  <Checkbox value={item.value} key={item.value}>{item.label}</Checkbox>
                )
              })}
            </Checkbox.Group>
          )}
        </Form.Item>

        <Form.Item
          label="备份时间点"
          required={false}
          {...formItemLayout}
          colon={false}
          labelAlign="left"
        >
          {getFieldDecorator('hours', {
            initialValue: autoSnapshotPolicy.hours || [],
            // rules: [
            //   {
            //     required: true,
            //     message: '请选择执行定期快照的时间'
            //   },
            // ],
          })(
            <Checkbox.Group>
              <Row>
                {hourOptions.map(item => {
                  return (
                    <Col span={2} key={item.value}>
                      <Checkbox value={item.value}>{item.label}</Checkbox>
                    </Col>
                  )
                })}
              </Row>
            </Checkbox.Group>
          )}
        </Form.Item>

        <Form.Item
          label="快照保留时间"
          required={false}
          {...formItemLayout}
          colon={false}
          labelAlign="left"
        >
          {getFieldDecorator('retention', {
            initialValue: isEqual(autoSnapshotPolicy.retentionDays, '-1') ? 'permanent' : 'custom'
          })(
            <Radio.Group>
              <Radio value="custom">
                保留
                <InputNumber
                  min={1}
                  max={30}
                  defaultValue={autoSnapshotPolicy.retentionDays && !isEqual(autoSnapshotPolicy.retentionDays, '-1') ? autoSnapshotPolicy.retentionDays : days}
                  style={{ width: '80px', marginLeft: 5, marginRight: 5 }}
                  onChange={this.onChange}
                />
                天后自动删除</Radio>
              <br />
              {/* <Radio value="permanent">永久保留</Radio> */}
            </Radio.Group>
          )}
        </Form.Item>
      </div>
    )
  }
}
export default ScanConfig
