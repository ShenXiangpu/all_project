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
    xs: { span: 4 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

// 平台管理员查询企业用户的查询条件
@Form.create()
class EnterpriseFilter extends Component {

  componentDidUpdate(prevProps) {
    const { form, tabActiveKey } = this.props;
    const { tabActiveKey: oldTabActiveKey } = prevProps;
    if (tabActiveKey !== oldTabActiveKey) {
      form.resetFields();
    }
  }

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
    const { companies, companyId, keyWord } = filter

    const options = companies.map(element => {
      return <Option value={element.id.toString()} key={element.id}>{element.companyName}</Option>
    })

    return (
      <Form {...formItemLayout}>
        <Row gutter={24}>
          <Col
            {...ColProps}
            xl={{ span: 6 }}
            md={{ span: 8 }}
          >
            <Form.Item label="企业">
              {getFieldDecorator('companyId', { initialValue: companyId || '' })(
                <Select
                  showSearch
                  notFoundContent={null}
                  filterOption={(input, option) =>
                    option.props.children && option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  onChange={this.handleSelectChange}
                >
                  <Option value=''>----全部----</Option>
                  {options}
                </Select>
              )}
            </Form.Item>
          </Col>
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
            </Row>
          </Col>
        </Row>
      </Form>
    )
  }
}

EnterpriseFilter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  setFormValues: PropTypes.func,
  onSearch: PropTypes.func,
}

export default EnterpriseFilter
