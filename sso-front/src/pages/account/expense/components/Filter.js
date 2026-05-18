import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input } from 'antd'
import styles from '../style.less'

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
    const { filter, form } = this.props
    const { getFieldDecorator } = form
    const { keyWord } = filter

    return (
      <Form {...formItemLayout}>
        <Row gutter={24}>
          <Col
            {...ColProps}
            xl={{ span: 6 }}
            md={{ span: 8 }}
          >
            <Form.Item label="关键字">
              {getFieldDecorator('keyWord', { initialValue: keyWord })(
                <Input placeholder="请输入关键字进行查询" />
              )}
            </Form.Item>
          </Col>
          <Col
            {...TwoColProps}
            xl={{ span: 18 }}
            md={{ span: 16 }}
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
            </Row>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Filter
