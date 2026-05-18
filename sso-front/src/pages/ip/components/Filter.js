import React, { Component } from 'react'
import { Form, Button, Row, Col, Input, Select, Icon, Badge } from 'antd'

const { Option } = Select
const FormItem = Form.Item;

const btnStyle = {
  display: 'block',
  whiteSpace: 'nowrap'
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

@Form.create()
class Filter extends Component {

  handleSearch = e => {
    e.preventDefault();
    const { dispatch, form, setFormValues, onSearch } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const data = fieldsValue;
      data.nodeName = fieldsValue.node;
      delete data.node;

      setFormValues(data);
      onSearch(data);
    });
  };

  handleFormReset = () => {
    const { form, setFormValues, onSearch } = this.props
    form.resetFields();
    setFormValues({});
    onSearch({});
  }

  toggleForm = () => {
    const { expandForm, setExpandForm } = this.props;
    setExpandForm(!expandForm)
  };

  renderSimpleForm() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form {...formItemLayout} onSubmit={this.handleSearch}>
        <Row>
          <Col span={12}>
            <FormItem label="关键字" style={{ marginBottom: 0 }}>
              {getFieldDecorator('key')(<Input placeholder="请输入IP搜索关键词" />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <span style={btnStyle}>
              <Button type="primary" htmlType="submit">
                查询
                           </Button>
              <Button
                style={{
                  marginLeft: 8,
                }}
                onClick={this.handleFormReset}
              >
                重置
               </Button>
              <a
                style={{
                  marginLeft: 8,
                }}
                onClick={this.toggleForm}
              >
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
      nodeList,
      foundryList,
      ipCategoryList,
      ipProviderList,
      filter
    } = this.props;

    return (
      <div id="area">
        <Form {...formItemLayout} onSubmit={this.handleSearch}>
          <Row>
            <Col span={12}>
              <FormItem label="关键字">
                {getFieldDecorator('keyword', {
                  initialValue: filter.keyword,
                })(<Input placeholder="请输入IP搜索关键词" />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <span style={btnStyle}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button
                  style={{
                    marginLeft: 8,
                  }}
                  onClick={this.handleFormReset}
                >
                  重置
                </Button>
                <a
                  style={{
                    marginLeft: 8,
                  }}
                  onClick={this.toggleForm}
                >
                  收起 <Icon type="up" />
                </a>
              </span>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="工艺节点">
                {getFieldDecorator('node', {
                  initialValue: filter.nodeName,
                })(
                  <Select
                    mode="multiple"
                    placeholder="请选择工艺节点进行查询"
                    getPopupContainer={() => document.getElementById('area')}
                  >
                    {nodeList && nodeList.length > 0 && nodeList.map(item => (
                      <Option key={item} value={item}>{item}</Option>
                    ))}
                  </Select>,
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="代工厂">
                {getFieldDecorator('foundryName', {
                  initialValue: filter.foundryName || '',
                })(
                  <Select
                    // mode="multiple"
                    showSearch
                    placeholder="请选择代工厂进行查询"
                    getPopupContainer={() => document.getElementById('area')}
                  >
                    <Option value=''>--全部--</Option>
                    {foundryList && foundryList.length > 0 && foundryList.map(item => (
                      <Option key={item.foundryName} value={item.foundryName}>{item.foundryName}</Option>
                    ))}
                  </Select>,
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="IP类型" style={{ marginBottom: 0 }}>
                {getFieldDecorator('typeName', {
                  initialValue: filter.typeName || '',
                })(
                  <Select
                    showSearch
                    placeholder="请选择IP类型进行查询"
                    getPopupContainer={() => document.getElementById('area')}
                  >
                    <Option value=''>--全部--</Option>
                    {ipCategoryList && ipCategoryList.length > 0 && ipCategoryList.map(item => (
                      <Option key={item.typeName} value={item.typeName}>{item.typeName}</Option>
                    ))}
                  </Select>,
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="IP供应商" style={{ marginBottom: 0 }}>
                {getFieldDecorator('providerName', {
                  initialValue: filter.providerName || '',
                })(
                  <Select
                    showSearch
                    placeholder="请选择IP供应商进行查询"
                    getPopupContainer={() => document.getElementById('area')}
                  >
                    <Option value=''>--全部--</Option>
                    {ipProviderList && ipProviderList.length > 0 && ipProviderList.map(item => (
                      <Option key={item.name} value={item.name}>{item.name}</Option>
                    ))}
                  </Select>,
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }

  render() {
    const { expandForm } = this.props
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }
}

export default Filter
