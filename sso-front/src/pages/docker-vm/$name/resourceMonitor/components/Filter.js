import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Select, DatePicker } from 'antd'
import moment from 'moment'
import styles from './Filter.less'

const { Option } = Select;

const formItemLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

@Form.create()
class Filter extends Component {

  state = {
    type: '5m',
    startValue: moment().subtract('minutes', 1),
    endValue: moment(),
    endOpen: false,
  };

  componentDidUpdate(prevProps) {
    const { form, tabActiveKey } = this.props;
    const { tabActiveKey: oldTabActiveKey } = prevProps;
    if (tabActiveKey !== oldTabActiveKey) {
      form.resetFields();
    }
  }

  handleSubmit = () => {
    const { setFormValues, onSearch, form } = this.props
    const { getFieldsValue } = form

    const values = getFieldsValue();

    if (values.fromTime) {
      values.fromTime = moment(values.fromTime).format('x');
    }

    if (values.toTime) {
      values.toTime = moment(values.toTime).format('x');
    }

    if (values.timeSpan !== 'custom') {
      delete values.fromTime;
      delete values.toTime;
    }

    setFormValues(values);
    onSearch(values);
  }

  onTimeSpanChange = value => {
    this.setState({ type: value });
  }

  onTimeSpanSelect = value => {
    this.handleSubmit();
  }

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue > moment() || endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = value => {
    this.onChange('startValue', value);
  };

  onEndChange = value => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  render() {
    const { filter, form } = this.props
    const { getFieldDecorator } = form
    const { type, startValue, endValue, endOpen } = this.state;
    // const { keyWord } = filter

    return (
      <Form {...formItemLayout}>
        <Row gutter={24} className={styles.row}>
          <Col span={6}>
            <Form.Item>
              {getFieldDecorator('timeSpan', { initialValue: '5m' })(
                <Select
                  onChange={this.onTimeSpanChange}
                  onSelect={this.onTimeSpanSelect}
                >
                  <Option value="custom"> 自定义时间段</Option>
                  <Option value="5m">5分钟</Option>
                  <Option value="1h">1小时</Option>
                  <Option value="6h">6小时</Option>
                  <Option value="24h">24小时</Option>
                  <Option value="168h">7天</Option>
                  <Option value="720h">30天</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={8} style={type === 'custom' ? { display: 'block' } : { display: 'none' }}>
            <Form.Item>
              {getFieldDecorator('fromTime', { initialValue: startValue })(
                <DatePicker
                  style={{ width: '100%' }}
                  disabledDate={this.disabledStartDate}
                  showTime
                  format="MM/DD HH:mm"
                  // value={startValue}
                  placeholder="Start"
                  onChange={this.onStartChange}
                  onOpenChange={this.handleStartOpenChange}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8} style={type === 'custom' ? { display: 'block' } : { display: 'none' }}>
            <Form.Item>
              {getFieldDecorator('toTime', { initialValue: endValue })(
                <DatePicker
                  style={{ width: '100%' }}
                  disabledDate={this.disabledEndDate}
                  showTime
                  format="MM/DD HH:mm"
                  // value={endValue}
                  placeholder="End"
                  onChange={this.onEndChange}
                  open={endOpen}
                  onOpenChange={this.handleEndOpenChange}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={2}>
            <Row type="flex" align="middle" justify="space-between">
              <div>
                <Button
                  type="primary"
                  icon="undo"
                  onClick={this.handleSubmit}
                />
              </div>
            </Row>
          </Col>
        </Row>
      </Form>
    )
  }
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  setFormValues: PropTypes.func,
  onSearch: PropTypes.func,
}

export default Filter
