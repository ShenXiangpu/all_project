/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input } from 'antd'

const { Search } = Input;

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

  handleSubmit = (value) => {
    const { onSearch, setFormValues } = this.props;
    const data = {
      keyWord: value
    }
    setFormValues(data);
    onSearch(data);
  }

  render() {
    const { onAdd, filter, form } = this.props
    const { getFieldDecorator } = form
    const { keyWord } = filter

    return (
      <Form {...formItemLayout} style={{ marginBottom: 12 }}>
        <Row gutter={24}>
          {/* <Col
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
            xl={{ span: 12 }}
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
              <Button type="ghost" onClick={onAdd}>
                新增
              </Button>
            </Row>
          </Col>
           */}

          <Col span={18}>
            <Button
              type="primary"
              ghost
              onClick={onAdd}
            >
              新增
            </Button>
          </Col>

          <Col span={6} style={{ textAlign: 'right' }}>
            <Search
              placeholder="请输入关键字进行查询"
              onSearch={this.handleSubmit}
            />
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
  setFormValues: PropTypes.func,
  onSearch: PropTypes.func,
}

export default Filter
