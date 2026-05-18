import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, Select } from 'antd'

const { Option, OptGroup } = Select

const ColProps = {
  xs: 24,
  sm: 12,
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
    xs: { span: 20 },
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
    const { form, filter } = this.props
    const { getFieldDecorator } = form
    return (
      <Form {...formItemLayout}>
        <div id="taskFilter">
          <Row gutter={24}>
            <Col
              {...ColProps}
              xl={{ span: 4 }}
              md={{ span: 4 }}
            >
              <Form.Item label="教学状态">
                {getFieldDecorator('status', {
                  initialValue:'',
                })(
                  <Select  style={{ width: 120 }}>
                    <Option  value="">-请选择-</Option>
                    <Option  value="0">报名中</Option>
                    <Option  value="1">培训中</Option>
                    <Option  value="2">已结束</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col
              {...TwoColProps}
              xl={{ span: 16 }}
              md={{ span: 16 }}
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
        </div>
      </Form>
    )
  }
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  setFormValues: PropTypes.func,
  onSearch: PropTypes.func,
}

export default Filter
