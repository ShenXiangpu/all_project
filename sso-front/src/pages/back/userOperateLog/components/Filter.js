/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, Select } from 'antd'

const { Option } = Select

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

  handleSubmit = (e) => {
    e.preventDefault()
    const { setFormValues, onSearch, form } = this.props
    const { getFieldsValue } = form
    const values = getFieldsValue()
    setFormValues(values);
    onSearch(values);
  }

  handleReset = () => {
    const { form, setFormValues, onReset, filter: { toolList } } = this.props
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
    fields.edaToolCode = toolList && toolList[0] && toolList[0].edaToolCode;
    setFieldsValue(fields)
    setFormValues({});
    onReset();
  }

  render() {
    const { operateTypes, filter, form } = this.props
    const { getFieldDecorator } = form
    const { keyWord, operation } = filter

    return (
      <Form {...formItemLayout}>
        <div id='filter'>
          <Row gutter={24}>
            <Col span={6}>
              <Form.Item label="操作类型">
                {getFieldDecorator('operation', { initialValue: operation || '' })(
                  <Select
                    showSearch
                    notFoundContent={null}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    getPopupContainer={() => document.getElementById('filter')}
                  >
                    <Option value=''>----全部----</Option>
                    {operateTypes && operateTypes.map(item => {
                      return (
                        <Option value={item} key={item}>{item}</Option>
                      )
                    })}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="用户名">
                {getFieldDecorator('keyWord', { initialValue: keyWord || '' })(
                  <Input placeholder='请输入用户名进行查询' />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
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
