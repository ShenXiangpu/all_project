/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input } from 'antd'

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

  handleSubmit = () => {
    const { onFilterChange, form } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    onFilterChange(fields)
  }

  handleReset = () => {
    const { form, onReset } = this.props
    const { getFieldsValue, setFieldsValue } = form

    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else if (typeof fields[item] !== 'string') {
          fields[item] = undefined
        } else {
          fields[item] = ''
        }
      }
    }
    setFieldsValue(fields)
    // this.handleSubmit()

    onReset();
  }

  render() {
    const { filter, form } = this.props
    const { getFieldDecorator } = form;

    return (
      <Form {...formItemLayout}>
        <div id='filter'>
          <Row gutter={24}>

            <Col span={6}>
              <Form.Item label='Feature名称'>
                {getFieldDecorator('keyword', {
                  initialValue: filter.keyword || '',
                })(
                  <Input placeholder='请输入Feature名称进行查询' />
                )}
              </Form.Item>
            </Col>

            <Col span={18} >
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
            </Col>
          </Row>
        </div >
      </Form >
    )
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter
