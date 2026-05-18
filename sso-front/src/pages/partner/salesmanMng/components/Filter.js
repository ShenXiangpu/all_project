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
    const dates = values.date;

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
    const { isCompanyNormal, form, onOpenModal, } = this.props
    const { getFieldDecorator } = form

    return (
      <div id="filterDiv">
        <Form {...formItemLayout}>
          <Row gutter={24}>
            <Col
              {...ColProps}
            >
              <Form.Item label='渠道名称'>
                {getFieldDecorator('name', {
                  initialValue: ''
                })(
                  <Input placeholder="请输入渠道名称" />
                )}
              </Form.Item>
            </Col>
            <Col
              {...ColProps}
            >
              <Form.Item label="渠道手机号">
                {getFieldDecorator('phone', {
                  initialValue: ''
                })(
                  <Input placeholder="请输入渠道手机号" />
                )}
              </Form.Item>
            </Col>
            <Col {...ColProps}>
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

          <Row style={{ marginBottom: 16 }}>

            <Col
              span={12}
            >
              <Button type="primary" className={styles.sureBtn} onClick={onOpenModal}>
                新增
              </Button>
            </Col>

            
          </Row>
        </Form>
      </div>
    )
  }
}

export default Filter
