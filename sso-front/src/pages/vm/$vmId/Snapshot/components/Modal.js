import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Checkbox, Radio, InputNumber } from 'antd'
import styles from './Modal.less'
import { isEqual } from 'lodash';

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
}

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

// 快照策略变更窗口
@Form.create()
class SnapshotModal extends PureComponent {
  state = {
    days: 30      //快照默认保留时间，默认30天
  }

  handleOk = (e) => {
    e.preventDefault();

    const { onOk, form } = this.props
    const { validateFields } = form
    const { days } = this.state;

    validateFields((errors, values) => {
      if (errors) {
        return
      }
      const scanDays = isEqual(values.retention, 'custom') ? days : '-1';
      const data = {
        dayOfWeek: values.dayOfWeek,
        hours: values.hours,
        retentionDays: scanDays
      }
      onOk(data)
    })
  }

  onChange = value => {
    if (!value) {
      this.setState({ days: 30 })
    } else {
      this.setState({ days: value })
    }
  }

  render() {
    const { onOk, form, snapshotPolicy, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const { days } = this.state;

    const dayOfWeek = snapshotPolicy && snapshotPolicy.dayOfWeek && snapshotPolicy.dayOfWeek.map(item => item.toString());
    const hours = snapshotPolicy && snapshotPolicy.hours && snapshotPolicy.hours.map(item => item.toString());

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <div className={styles.scan}>
          <Form.Item
            label="备份日期"
            required={false}
            {...formItemLayout}
            colon={false}
            labelAlign="left"
          >
            {getFieldDecorator('dayOfWeek', {
              initialValue: dayOfWeek || [],
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
              initialValue: hours || [],
            })(
              <Checkbox.Group>
                {hourOptions.map(item => {
                  return (
                    <Checkbox value={item.value} key={item.value}>{item.label}</Checkbox>
                  )
                })}
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
              initialValue: isEqual(snapshotPolicy.retentionDays, '-1') ? 'permanent' : 'custom'
            })(
              <Radio.Group>
                <Radio value="custom">
                  保留
                  <InputNumber
                    min={1}
                    max={30}
                    defaultValue={snapshotPolicy.retentionDays && !isEqual(snapshotPolicy.retentionDays, '-1') ? snapshotPolicy.retentionDays : days}
                    style={{ width: '80px', marginLeft: 5, marginRight: 5 }}
                    onChange={this.onChange}
                  />
                  天后自动删除</Radio>
                <br />
                <Radio value="permanent">永久保留</Radio>
              </Radio.Group>
            )}
          </Form.Item>
        </div>
      </Modal>
    )
  }
}

SnapshotModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default SnapshotModal
