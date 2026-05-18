import { Row, Form, Col, DatePicker, Button } from 'antd';
import React from 'react';
import moment from 'moment'

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
    const rangeTime = values.rangeTime;
    const data = {
      startTime: rangeTime && rangeTime[0] ? rangeTime[0].format('YYYY-MM-DD') : '',
      endTime: rangeTime && rangeTime[1] ? rangeTime[1].format('YYYY-MM-DD') : ''
    }
    setFormValues(data);
    onSearch(data);
  }

  const handleReset = () => {
    const { form, setFormValues, onSearch } = props
    form.resetFields();
    setFormValues({});
    onSearch({});
  }

  const disabledDate = (current) => {
    return current > moment().endOf('day');
  }

  const { form, filter } = props
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
          <Form.Item label="日期">
            {getFieldDecorator('rangeTime', {
              initialValue: ''
            })(
              <DatePicker.RangePicker
                ranges={{
                  '近1周': [moment().subtract(7, 'days'), moment()],
                  '近1个月': [moment().subtract(1, 'months'), moment()],
                  '近3个月': [moment().subtract(3, 'months'), moment()],
                  '近6个月': [moment().subtract(6, 'months'), moment()],
                }}
                format="YYYY-MM-DD"
                disabledDate={disabledDate}
              />
            )}
          </Form.Item>
        </Col>
        <Col
          {...TwoColProps}
          xl={{ span: 16 }}
          md={{ span: 16 }}
        >
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
        </Col>
      </Row>
    </Form>
  )
}

export default Form.create()(Filter);
