import { Row, Form, Col, Input, Button } from 'antd';
import React from 'react';

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


function Filter(props) {

  const handleSubmit = () => {
    const { setFormValues, onSearch, form } = props
    const { getFieldsValue } = form

    const values = getFieldsValue()
    setFormValues(values);
    onSearch(values);
  }

  const handleReset = () => {
    const { form, setFormValues, onSearch } = props
    form.resetFields();
    setFormValues({});
    onSearch({});
  }

  const { form, filter, onShowMdl } = props
  const { getFieldDecorator } = form
  // const { keyword } = filter

  return (
    <Form {...formItemLayout}>
      <Row gutter={24}>
        <Col
          {...ColProps}
          xl={{ span: 8 }}
          md={{ span: 8 }}
        >
          <Form.Item label="策略名称">
            {getFieldDecorator('keyword', {
              initialValue: ''
            })(
              <Input placeholder="请输入策略名称进行查询" />
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
                onClick={handleSubmit}
              >
                查询
              </Button>
              <Button style={{ marginLeft: 18 }} onClick={handleReset}>
                重置
              </Button>
            </div>
            <div>
              <Button
                icon="plus"
                type="primary"
                onClick={onShowMdl}
              >
                新建策略
              </Button>
            </div>
          </Row>
        </Col>
      </Row>
    </Form>
  )
}

// const Filter = Form.create()(Filter)
export default Form.create()(Filter);
