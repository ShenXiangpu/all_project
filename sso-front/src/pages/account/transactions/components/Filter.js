import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Select, DatePicker } from 'antd';
import moment from 'moment';
import { isEqual, isEmpty } from 'lodash-es';

const { Option } = Select

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const formItemLayout = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
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

    const values = getFieldsValue()
    const rangeTime = values.rangeTime;
    const data = {
      searchStartTime: rangeTime && rangeTime[0] ? rangeTime[0].format('YYYY-MM-DD') : '',
      searchEndTime: rangeTime && rangeTime[1] ? rangeTime[1].format('YYYY-MM-DD') : '',
      searchTradeEventList: values.tradeEvent ? values.tradeEvent.toString() : ''
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
    const { filter, form, tradeEventList } = this.props
    const { getFieldDecorator } = form
    const { checked } = filter;

    const options = tradeEventList && tradeEventList.map(item => (
      <Option value={item.key} key={item.key}>{item.name}</Option>
    ))

    return (
      <div id="filterDiv">
        <Form {...formItemLayout}>
          <Row gutter={24}>
            <Col
              {...ColProps}
              xl={{ span: 6 }}
              md={{ span: 8 }}
            >
              <Form.Item label="交易类型">
                {getFieldDecorator('tradeEvent', {})(
                  <Select
                    mode="multiple"
                    getContainer={() => document.getElementById('filterDiv')}
                  >
                    {options}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col
              {...ColProps}
              xl={{ span: 6 }}
              md={{ span: 8 }}
            >
              <Form.Item label="交易日期">
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
              {...TwoColProps}
              xl={{ span: 10 }}
              md={{ span: 6 }}
              sm={{ span: 24 }}
            >
              <Row type="flex" align="middle" justify="space-between">
                <div>
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
                </div>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

export default Filter
