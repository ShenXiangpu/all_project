/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, Select } from 'antd'

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
    xs: { span: 16 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

@Form.create()
class Filter extends Component {

  componentDidUpdate(prevProps) {
    const { reload, form } = this.props
    const { reload: prevReload } = prevProps
    if (reload && reload !== prevReload) {
      form.resetFields();
    }
  }

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

  handleChange = (key, values) => {
    const { onReloadChange, onVendorChange, onToolChange } = this.props
    onReloadChange();

    switch (key) {
      case "edaVendorCode":
        onVendorChange(values);
        break;
      case "edaToolCode":
        onToolChange(values);
        break;
    }
  }

  render() {
    const { filter, form } = this.props
    const { getFieldDecorator } = form
    const { vendorList, toolList, featureList, edaVendorCode, edaToolCode, feaCode } = filter

    const edaVendorOptions = vendorList.map(element => {
      return <Option value={element.edaVendorCode} key={element.edaVendorCode}>{element.edaVendorName}</Option>
    })

    const edaToolOptions = toolList.map(element => {
      return <Option value={element.edaToolCode} key={element.edaToolCode}>{element.edaToolName}</Option>
    })

    const edaFeatureOptions = featureList.map(element => {
      return <Option value={element.feaCode} key={element.feaCode}>{element.feaCode}</Option>
    })

    return (
      <Form {...formItemLayout}>
        <Row gutter={24}>
          <Col
            {...ColProps}
            xl={{ span: 6 }}
            md={{ span: 8 }}
          >
            <Form.Item label="EDA厂商">
              {getFieldDecorator('edaVendorCode', { initialValue: edaVendorCode || '' })(
                <Select
                  showSearch
                  notFoundContent={null}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={this.handleChange.bind(this, 'edaVendorCode')}
                >
                  <Option value=''>----全部----</Option>
                  {edaVendorOptions}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col
            {...ColProps}
            xl={{ span: 6 }}
            md={{ span: 8 }}
          >
            <Form.Item label="EDA工具">
              {getFieldDecorator('edaToolCode', { initialValue: edaToolCode || (toolList && toolList[0] && toolList[0].edaToolCode) })(
                <Select
                  showSearch
                  notFoundContent={null}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={this.handleChange.bind(this, 'edaToolCode')}
                >
                  {/* <Option value=''>----全部----</Option> */}
                  {edaToolOptions}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col
            {...ColProps}
            xl={{ span: 6 }}
            md={{ span: 8 }}
          >
            <Form.Item label="EDA Feature">
              {getFieldDecorator('feaCode', { initialValue: feaCode || '' })(
                <Select
                  showSearch
                  notFoundContent={null}
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={this.handleChange.bind(this, 'feaCode')}
                >
                  <Option value=''>----全部----</Option>
                  {edaFeatureOptions}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col
            {...TwoColProps}
            xl={{ span: 6 }}
            md={{ span: 24 }}
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
