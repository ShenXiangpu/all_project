import React, { Component } from 'react'
import { Form, Button, Row, Col, Input, Select } from 'antd'
import styles from './Filter.less'
import { isEqual, isEmpty } from 'lodash-es'

const ColProps = {
  xs: 24,
  sm: 12,
  xl: 6,
  md: 8,
}

const formItemLayout = {
  labelCol: {
    xs: { span: 6 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 16 },
    sm: { span: 16 },
  },
};

@Form.create()
class Filter extends Component {

  componentDidUpdate(preProps) {
    const { filter } = this.props;
    const { filter: old_filter } = preProps;
    if (!isEqual(filter, old_filter) && isEmpty(filter)) {
      const { form } = this.props
      form.resetFields();
    }
  }

  handleSubmit = () => {
    const { setFormValues, onSearch, form } = this.props
    const { getFieldsValue } = form

    const values = getFieldsValue();
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
    const { isCompanyNormal, form, onAdd, foundryList, processNodesList } = this.props
    const { getFieldDecorator } = form

    return (
      <div id="filterDiv">
        <Form {...formItemLayout}>
          <Row gutter={24}>
            <Col
              {...ColProps}
            >
              <Form.Item label='代工厂'>
                {getFieldDecorator('foundryName', {
                  initialValue: ''
                })(
                  <Select
                    filterOption={(input, option) =>
                      console.log(input, option)
                    }
                    getContainer={() => document.getElementById('filterDiv')}
                  >
                    <Select.Option value=''>--请选择--</Select.Option>
                    {
                      foundryList && foundryList.map(item => {
                        return (
                          <Select.Option key={item.id} value={item.name}>{item.name}</Select.Option>
                        )
                      })
                    }
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col
              {...ColProps}
            >
              <Form.Item label="工艺节点">
                {getFieldDecorator('processNode', {
                  initialValue: ''
                })(
                  <Select
                    filterOption={(input, option) =>
                      console.log(input, option)
                    }
                    getContainer={() => document.getElementById('filterDiv')}
                  >
                    <Select.Option value=''>--请选择--</Select.Option>
                    {
                      processNodesList && processNodesList.map(item => {
                        return (
                          <Select.Option key={item.id} value={item.name}>{item.name}</Select.Option>
                        )
                      })
                    }
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col
              {...ColProps}
            >
              <Form.Item label="联系人:">
                {getFieldDecorator('userName', {
                  initialValue: ''
                })(
                  <Input placeholder="请输入联系人" />
                )}
              </Form.Item>
            </Col>
            <Col
              {...ColProps}
            >
              <Form.Item label='公司名称'>
                {getFieldDecorator('companyName', {
                  initialValue: ''
                })(
                  <Input placeholder="请输入公司名称" />
                )}
              </Form.Item>
            </Col>
            
          </Row>
          <Row style={{ marginBottom: 16 }}>

            <Col
              span={12}
            >
              <Button type="primary" className={styles.sureBtn} onClick={onAdd}>
                +我要流片
              </Button>
            </Col>
            <Col span={12} align="right">
              <span className={styles.submitButtons}>
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
              </span>
            </Col>

          </Row>
        </Form>
      </div>
    )
  }
}

export default Filter
