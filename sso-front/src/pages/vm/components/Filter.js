import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, Select, Icon } from 'antd'
import styles from './Filter.less'
import moment from 'moment'
import { isEqual, isEmpty } from 'lodash-es'

const ColProps = {
  xs: 24,
  sm: 12,
  xl: 6,
  md: 8,
  // style: {
  //   marginBottom: 16,
  // },
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
    const { isCompanyNormal, filter, form, onAdd, isCompanyUser, groupList } = this.props
    const { getFieldDecorator } = form

    return (
      <div id="filterDiv">
        <Form {...formItemLayout}>
          <Row gutter={24}>
            <Col
              {...ColProps}
            >
              <Form.Item label={isCompanyUser ? '所属部门' : '所属群组'}>
                {getFieldDecorator('groupId', {
                  initialValue: ''
                })(
                  <Select
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    getContainer={() => document.getElementById('filterDiv')}
                  >
                    <Select.Option value=''>--请选择--</Select.Option>
                    {
                      groupList && groupList.map(item => {
                        return (
                          <Select.Option key={item.id} value={item.id}>{isCompanyUser ? item.deptName : item.groupName}</Select.Option>
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
              <Form.Item label="实例ID">
                {getFieldDecorator('vmId', {
                  initialValue: ''
                })(
                  <Input placeholder="请输入实例ID" />
                )}
              </Form.Item>
            </Col>
            <Col
              {...ColProps}
            >
              <Form.Item label="实例名称">
                {getFieldDecorator('vmName', {
                  initialValue: ''
                })(
                  <Input placeholder="请输入实例名称" />
                )}
              </Form.Item>
            </Col>
            <Col
              {...ColProps}
            >
              <Form.Item label="主机名称">
                {getFieldDecorator('hostname', {
                  initialValue: ''
                })(
                  <Input placeholder="请输入主机名称" />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: 16 }}>
            {!isCompanyNormal &&
              <Col
                {...ColProps}
              >
                <Button type="primary" className={styles.sureBtn} onClick={onAdd}>
                  立即创建
                </Button>
              </Col>
            }
            <Col span={isCompanyNormal ? 18 : 12}></Col>
            <Col
              {...ColProps}
              align="right"
            >
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
