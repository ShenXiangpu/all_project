import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, Select } from 'antd'
import styles from '../style.less'

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

  handleSubmit = () => {
    const { setFormValues, onSearch, form } = this.props
    const { getFieldsValue } = form

    const values = getFieldsValue()
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
    const { filter, form, onShowModal } = this.props
    const { getFieldDecorator } = form
    const { checked, userEmail } = filter

    return (
      <Form {...formItemLayout}>
        <Row gutter={24}>
          <Col
            {...ColProps}
            xl={{ span: 4 }}
            md={{ span: 6 }}
          >
            <Form.Item label="是否已兑换">
              {getFieldDecorator('checked', { initialValue: checked || '' })(
                <Select>
                  <Option value="">全部</Option>
                  <Option value="0">未兑换</Option>
                  <Option value="1">已兑换</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col
            {...ColProps}
            xl={{ span: 6 }}
            md={{ span: 8 }}
          >
            <Form.Item label="用户邮箱">
              {getFieldDecorator('userEmail', { initialValue: userEmail || '' })(
                <Input />
              )}
            </Form.Item>
          </Col>
          <Col
            {...TwoColProps}
            xl={{ span: 14 }}
            md={{ span: 10 }}
            sm={{ span: 24 }}
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
              <Button type="ghost" onClick={onShowModal}>
                发送兑奖码
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Filter
