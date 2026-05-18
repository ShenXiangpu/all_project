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
class ModalFilter extends Component {

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
  handleExportTable = () => {
    const { onHandleExportTable } = this.props
    onHandleExportTable()
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
              xl={{ span: 8 }}
              md={{ span: 8 }}
            >
              <Form.Item label="报名状态">
                {getFieldDecorator('status', {
                  initialValue: '',
                })(
                  <Select style={{ width: 120 }}>
                    <Option value="">-请选择-</Option>
                    <Option value="0">待审核</Option>
                    <Option value="1">已审核</Option>
                    <Option value="2">已驳回</Option>
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
                  <Button style={{ marginLeft: 18 }} onClick={this.handleExportTable}>
                    导出
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



export default ModalFilter
