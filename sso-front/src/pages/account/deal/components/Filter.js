import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, DatePicker } from 'antd'
import styles from '../style.less'
import moment from 'moment'
import { isEqual, isEmpty } from 'lodash-es'

const formItemLayout = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 16 },
    sm: { span: 16 },
  },
};


@Form.create()
class Filter extends Component {

  componentDidUpdate(preProps) {
    const { filter } = this.props;
    const { filter: old_filter } = preProps;
    if (!isEqual(filter, old_filter) && isEmpty(filter)) {
      const { form } = this.props
      form.resetFields();
    }
  }

  handleSubmit = () => {
    const { setFormValues, onSearch, form } = this.props
    const { getFieldsValue } = form

    const values = getFieldsValue();
    const rangeTime = values.rangeTime;
    const data = {
      searchStartTime: rangeTime && rangeTime[0] ? rangeTime[0].format('YYYY-MM-DD') : '',
      searchEndTime: rangeTime && rangeTime[1] ? rangeTime[1].format('YYYY-MM-DD') : '',
      orderNum: values.orderNum
    }
    setFormValues(data);
    onSearch(data);
  }

  handleReset = () => {
    const { form, setFormValues, onSearch } = this.props
    form.resetFields();
    setFormValues({});
    onSearch({});
  }

  disabledDate = (current) => {
    return current > moment().endOf('day');
  }

  render() {
    const { filter, form } = this.props
    const { getFieldDecorator } = form

    return (
      <Form {...formItemLayout}>
        <Row gutter={24}>
          <Col
            span={6}
          >
            <Form.Item label="订单日期">
              {getFieldDecorator('rangeTime', {
                initialValue: ''
              })(
                <DatePicker.RangePicker
                  ranges={{
                    '近1个月': [moment().subtract(1, 'months'), moment()],
                    '近3个月': [moment().subtract(3, 'months'), moment()],
                    '近6个月': [moment().subtract(6, 'months'), moment()],
                    '近一年': [moment().subtract(1, 'years'), moment()]
                  }}
                  format="YYYY-MM-DD"
                  disabledDate={this.disabledDate}
                />
              )}
            </Form.Item>
          </Col>
          <Col
            span={6}
          >
            <Form.Item label="订单号">
              {getFieldDecorator('orderNum', {
                initialValue: ''
              })(
                <Input placeholder="请输入订单号进行查询" />
              )}
            </Form.Item>
          </Col>
          <Col
            span={12}
          >
            <Row type="flex" align="middle" justify="space-between">
              <span className={styles.submitButtons}>
                <Button
                  type="primary"
                  className="margin-right"
                  onClick={this.handleSubmit}
                >
                  查询
                </Button>
                <Button style={{ marginLeft: 18 }} onClick={this.handleReset}>
                  重置
                </Button>
              </span>
            </Row>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Filter
