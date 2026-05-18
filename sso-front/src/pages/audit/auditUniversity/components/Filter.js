/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Select } from 'antd'
const { Option } = Select

const formItemLayout = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 20 },
    sm: { span: 20 },
  },
};

const formItemLayout2 = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 12 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 12 },
  },
};

@Form.create()
class Filter extends Component {

  componentDidUpdate(prevProps) {
    const { form, tabActiveKey } = this.props;
    const { tabActiveKey: oldTabActiveKey } = prevProps;
    if (tabActiveKey !== oldTabActiveKey) {
      console.log('in');
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

  handleChange = (value) => {
    const { setFormValues, onSearch, form } = this.props
    const { getFieldsValue } = form
    let fields = getFieldsValue()
    const data = {
      ...fields,
      isVerified: value
    }

    setFormValues(data);
    onSearch(data);
  }

  onChange = (value) => {
    const { onGetUniversity } = this.props;
    const data = {
      province: value
    }
    onGetUniversity(data);
  }

  render() {
    const { filter, form, tabActiveKey } = this.props
    const { getFieldDecorator } = form
    const { provinceList, universityList, isVerified, province, universityId } = filter;

    return (
      <div id={tabActiveKey} style={{ paddingTop: 12, paddingBottom: 12 }}>
        <Form {...formItemLayout}>
          <Row gutter={24}>
            <Col
              span={4}
            >
              <Form.Item label="省份">
                {getFieldDecorator('province', {
                  initialValue: province || '',
                })(
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    optionFilterProp="children"
                    onChange={this.onChange}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    // getPopupContainer={() => document.getElementById(tabActiveKey)}
                  >
                    <Option value=''>----全部----</Option>
                    {provinceList && provinceList.length > 0 && provinceList.map(item => (
                      <Option value={item} key={item}>{item}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>

            <Col
              span={6}
            >
              <Form.Item label="学校名称">
                {getFieldDecorator('universityId', {
                  initialValue: universityId || '',
                })(
                  <Select
                    showSearch
                    style={{ width: 300 }}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    // getPopupContainer={() => document.getElementById(tabActiveKey)}
                  >
                    <Option value=''>----全部----</Option>
                    {universityList && universityList.length > 0 && universityList.map(item => (
                      <Option value={item.id} key={item.id}>{item.universityName}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col
              span={8}
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
            <Col
              span={6}
            >
              <Form.Item label="审核状态" {...formItemLayout2}>
                {getFieldDecorator('isVerified', { initialValue: isVerified || '' })(
                  <Select
                    showSearch
                    notFoundContent={null}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={this.handleChange}
                    // getPopupContainer={() => document.getElementById(tabActiveKey)}
                  >
                    <Option value=''>----全部----</Option>
                    <Option value={1}>未审核</Option>
                    <Option value={2}>审核通过</Option>
                    <Option value={3}>审核未通过</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
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
