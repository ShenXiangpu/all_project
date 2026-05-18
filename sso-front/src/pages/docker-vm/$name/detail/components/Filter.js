import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Select, DatePicker } from 'antd'
import Link from 'umi/link';
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
    rangeValue: [moment().subtract(1, 'hours'), moment()],
  };

  disabledDate = (current) => {
    return current > moment().endOf('day');
  }

  onChange = (dates, dateStrings) => {
    const { onSearch } = this.props
    const data = {
      fromTime: dates[0].format('x'),
      toTime: dates[1].format('x')
    }
    onSearch(data);
  }

  render() {
    const { form, handleResourceClick } = this.props
    const { getFieldDecorator } = form
    const { rangeValue } = this.state;

    return (
      <Form {...formItemLayout}>
        <Row gutter={24}>
          <Col span={4}>
            <span className={styles.spanText}>监控信息</span>
          </Col>
          <Col span={20} className={styles.col}>
            <a href="#" onClick={handleResourceClick}><span className={styles.spanText2}>查看内存等更多指标</span></a>
            <Form.Item>
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
