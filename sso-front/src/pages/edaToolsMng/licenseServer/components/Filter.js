/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, Select } from 'antd'

const { Option, OptGroup } = Select

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
    const { onAdd, filter, form, vendorList } = this.props
    const { getFieldDecorator } = form;

    return (
      <Form {...formItemLayout}>
        <div id='filter'>
          <Row gutter={24}>

            <Col span={6}>
              <Form.Item label='厂商'>
                {getFieldDecorator('vendorId', {
                  initialValue: filter.vendorId || '',
                })(
                  <Select
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    getPopupContainer={() => document.getElementById('filter')}
                  >
                    <Option value=''>--全部--</Option>
                    {vendorList && vendorList.length > 0 && vendorList.map(item => {
                      return (<Option key={item.id} value={item.id}>{item.vendorName}</Option>)
                    })}
                  </Select>
                )}
              </Form.Item>
            </Col>

            <Col span={18} >
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
                <Button type="ghost" onClick={onAdd}>
                  新增
                </Button>
              </Row>
            </Col>
          </Row>
        </div>
      </Form>
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
