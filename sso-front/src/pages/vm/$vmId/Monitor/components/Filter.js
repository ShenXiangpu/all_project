import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, DatePicker, Select } from 'antd'
import moment from 'moment'
import styles from './Filter.less'
import isEqual from 'lodash.isequal'

const { Option } = Select

@Form.create()
class Filter extends Component {

  state = {
    rangeValue: [moment().subtract(1, 'hours'), moment()],
    type: '1hour',
    labelStartTime: moment().subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
    labelEndTime: moment().format('YYYY-MM-DD HH:mm:ss')
  };

  componentDidMount() {
    const { type } = this.state;
    if (isEqual(type, '1hour')) {
      this.timer = setInterval(() => {
        this.searchHourData();
      }, 60000);
    }
  }

  searchHourData = () => {
    const { onSearch } = this.props;
    const data = {
      startTime: moment().subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
      endTime: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    this.setState({
      labelStartTime: data.startTime,
      labelEndTime: data.endTime
    })

    onSearch(data);
  }

  componentDidUpdate(preProps, preState) {
    const { type } = this.state;
    const { type: old_type } = preState;
    if (!isEqual(type, old_type)) {
      if (isEqual(type, '1hour')) {
        if (this.timer != null) {
          clearInterval(this.timer);
        }

        this.timer = setInterval(() => {
          this.searchHourData();
        }, 60000);
      } else {
        if (this.timer != null) {
          clearInterval(this.timer);
        }
      }
    }
  }

  componentWillUnmount() {
    if (this.timer != null) {
      clearInterval(this.timer);
    }
  }

  handleSubmit = () => {
    const { onSearch, form } = this.props
    const { getFieldsValue } = form

    const values = getFieldsValue();
    if (!isEqual(values.timeSpan, 'custom')) {
      const data = {}
      switch (values.timeSpan) {
        case '1hour':
          data.startTime = moment().subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss');
          data.endTime = moment().format('YYYY-MM-DD HH:mm:ss');
          break;
        case '1day':
          data.startTime = moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss');
          data.endTime = moment().format('YYYY-MM-DD HH:mm:ss');
          break;
        case '1week':
          data.startTime = moment().subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss');
          data.endTime = moment().format('YYYY-MM-DD HH:mm:ss');
          break;
        case '1month':
          data.startTime = moment().subtract(1, 'months').format('YYYY-MM-DD HH:mm:ss');
          data.endTime = moment().format('YYYY-MM-DD HH:mm:ss');
          break;
        case '1year':
          data.startTime = moment().subtract(1, 'years').format('YYYY-MM-DD HH:mm:ss');
          data.endTime = moment().format('YYYY-MM-DD HH:mm:ss');
          break;
      }

      this.setState({
        labelStartTime: data.startTime,
        labelEndTime: data.endTime
      })

      onSearch(data);
    }
  }

  onTimeSpanChange = value => {
    this.setState({ type: value });
  }

  onTimeSpanSelect = value => {
    this.handleSubmit();
  }

  disabledDate = (current) => {
    return current > moment().endOf('day');
  }

  onChange = (dates, dateStrings) => {
    const { onSearch } = this.props
    const data = {
      startTime: dates[0].format('YYYY-MM-DD HH:mm:ss'),
      endTime: dates[1].format('YYYY-MM-DD HH:mm:ss')
    }
    onSearch(data);
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form
    const { type, rangeValue, labelStartTime, labelEndTime } = this.state;

    return (
      <Form layout="inline" style={{ marginBottom: '15px' }}>
        <Form.Item>
          {getFieldDecorator('timeSpan', { initialValue: '1hour' })(
            <Select
              onChange={this.onTimeSpanChange}
              onSelect={this.onTimeSpanSelect}
              style={{ width: 140 }}
            >
              <Option value="1hour">实时</Option>
              <Option value="1day">最近一天</Option>
              <Option value="1week">最近一周</Option>
              <Option value="1month">最近一月</Option>
              <Option value="1year">最近一年</Option>
              <Option value="custom"> 自定义间隔</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item className={styles.col} style={type === 'custom' ? { display: 'none' } : { display: 'inline-block' }}>
          <span className={styles.date}>
            <label>{labelStartTime}</label>
            <label className={styles.middle}>~</label>
            <label>{labelEndTime}</label>
          </span>
        </Form.Item>

        <Form.Item style={type === 'custom' ? { display: 'inline-block' } : { display: 'none' }}>
          {getFieldDecorator('rangeTime', { initialValue: rangeValue })(
            <DatePicker.RangePicker
              ranges={{
                '1小时': [moment().subtract(1, 'hours'), moment()],
                '6小时': [moment().subtract(6, 'hours'), moment()],
                '1天': [moment().subtract(1, 'days'), moment()],
                '7天': [moment().subtract(7, 'days'), moment()]
              }}
              renderExtraFooter={() => '时间最大间隔为15天'}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              disabledDate={this.disabledDate}
              // disabledTime={this.disabledRangeTime}
              onChange={this.onChange}
            />
          )}
        </Form.Item>
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
