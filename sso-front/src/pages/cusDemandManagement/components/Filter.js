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
              <Form.Item label='公司名称'>
                {getFieldDecorator('companyName', {
                  initialValue: ''
                })(
                  <Input placeholder="请输入公司名称" />
                )}
              </Form.Item>
            </Col>
            <Col
              {...ColProps}
            >
              <Form.Item label="客户名称">
                {getFieldDecorator('userName', {
                  initialValue: ''
                })(
                  <Input placeholder="请输入客户名称" />
                )}
              </Form.Item>
            </Col>
            {/* <Col
              {...ColProps}
            >
              <Form.Item label='时间'>
                {getFieldDecorator('createTime', {
                  initialValue: ''
                })(
                  <DatePicker />
                )}
              </Form.Item>
            </Col> */}
            <Col md={8} sm={24}>
              <Form.Item labelCol={{ span: 7 }} wrapperCol={{ span: 12 }} label="提交时间">
                {getFieldDecorator('date', {
                  initialValue: '',
                })(
                  <RangePicker
                    format={dateFormat}
                  />
                )}

              </Form.Item>
            </Col>


          </Row>

          <Row style={{ marginBottom: 16 }}>

            <Col
              span={12}
            >
              <Button type="primary" className={styles.sureBtn} onClick={onAdd}>
                新建流片需求
              </Button>
            </Col>

            <Col span={12} align="right">
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
