import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, Select, Icon, DatePicker } from 'antd'
import styles from './Filter.less'
import moment from 'moment'
import { isEqual, isEmpty } from 'lodash-es'
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const ColProps = {
  xs: 24,
  sm: 12,
  xl: 6,
  md: 8,
}

const formItemLayout = {
  labelCol: {
    xs: { span: 6 },
    sm: { span: 6 },
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
    values.createTime = values.createTime ? moment(values.createTime).format('YYYY-MM-DD') : ''

    const dates = values.date;
    if (dates) {
      values.createTime = moment(dates[0]._d).format('YYYY-MM-DD 00:00:00')
      values.createTimeEnd = moment(dates[1]._d).format('YYYY-MM-DD 23:59:59')
    }

    setFormValues(values);
    onSearch(values);
  }

  handleReset = () => {
    const { form, setFormValues, onSearch } = this.props
    form.resetFields();
    setFormValues({});
    onSearch({});
  }

  render() {
    const { isCompanyNormal, form, onAdd, } = this.props
    const { getFieldDecorator } = form

    return (
      <div id="filterDiv">
        <Form {...formItemLayout}>
          <Row gutter={24}>
            <Col
              {...ColProps}
            >
              <Form.Item label='业务员名称'>
                {getFieldDecorator('affiliateName', {
                  initialValue: ''
                })(
                  <Input placeholder="请输入业务员名称" />
                )}
              </Form.Item>
            </Col>
            <Col
              {...ColProps}
            >
              <Form.Item label='名称'>
                {getFieldDecorator('name', {
                  initialValue: ''
                })(
                  <Input placeholder="请输入名称" />
                )}
              </Form.Item>
            </Col>
            <Col
              {...ColProps}
            >
              <Form.Item label="客户手机号">
                {getFieldDecorator('phone', {
                  initialValue: ''
                })(
                  <Input placeholder="请输入客户名称" />
                )}
              </Form.Item>
            </Col>
            <Col
              {...ColProps}
            >
              <Form.Item label="支付状态">
                {getFieldDecorator('status', {
                  initialValue: ''
                })(
                  <Select>
                    <Option value="">全部</Option>
                    <Option value="0">待支付</Option>
                    <Option value="1">支付成功</Option>
                    <Option value="2">支付失败</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            
          </Row>
          <Row gutter={24}>
            <Col  style={{textAlign:'right',marginBottom:'16px'}}>
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
            </Col>
          </Row>

        </Form>
      </div>
    )
  }
}

export default Filter
