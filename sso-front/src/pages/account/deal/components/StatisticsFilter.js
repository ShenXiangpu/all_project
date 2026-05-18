import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, DatePicker, Select } from 'antd'
import styles from '../style.less'
import moment from 'moment'
import { isEqual, isEmpty } from 'lodash-es'

const { Option, OptGroup } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 6 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 18 },
    sm: { span: 18 },
  },
};

@Form.create()
class StatisticsFilter extends Component {
  state = {
    statisticalType: 'group'
  }

  componentDidUpdate(preProps) {
    const { filter } = this.props;
    const { filter: old_filter } = preProps;
    if (!isEqual(filter, old_filter) && isEmpty(filter)) {
      const { form } = this.props
      form.resetFields();
    }
  }

  handleSubmit = () => {
    const { setFormValues, onSearch, form, tabActiveKey, setStatisticalType } = this.props
    const { getFieldsValue, setFields } = form
    const { statisticalType } = this.state;

    const values = getFieldsValue();
    const rangeTime = values.rangeTime;
    let data = {
      searchStartTime: rangeTime && rangeTime[0] ? rangeTime[0].format('YYYY-MM-DD') : '',
      searchEndTime: rangeTime && rangeTime[1] ? rangeTime[1].format('YYYY-MM-DD') : '',
    }

    if (isEqual(Number(tabActiveKey), 2)) {
      data.statisticalType = values.statisticalType;

      if (isEqual(values.statisticalType, 'user')) {
        const userType = values.userType;
        if (isEmpty(userType)) {
          setFields({
            'userType': {
              errors: [new Error('请选择')]
            }
          })
          return;
        } else {
          setFields({
            'userType': {
              value: values.userType,
              errors: null
            }
          })

          const index = userType.indexOf('_');
          const type = userType.substring(0, index);
          const value = userType.substring(index + 1, userType.length + 1);

          data[type] = value;
        }
      }
    }

    setFormValues(data);
    onSearch(data);
    setStatisticalType(statisticalType);
  }

  handleReset = () => {
    const { form, setFormValues, onSearch, tabActiveKey, setStatisticalType } = this.props
    form.resetFields();

    const data = {};
    if (isEqual(Number(tabActiveKey), 2)) {
      data.statisticalType = 'group';
      setStatisticalType('group');
      this.setState({ statisticalType: 'group' })
    }

    setFormValues(data);
    onSearch(data);
  }

  disabledDate = (current) => {
    return current > moment().endOf('day');
  }

  onChange = value => {
    this.setState({
      statisticalType: value
    })
  }

  render() {
    const { filter, form, tabActiveKey, statisticsEnum } = this.props
    const { getFieldDecorator } = form
    const { statisticalType } = this.state;

    return (
      <Form {...formItemLayout}>
        <Row gutter={24}>
          <Col
            span={8}
          >
            <Form.Item label="订单日期">
              {getFieldDecorator('rangeTime', {
                initialValue: ''
              })(
                <DatePicker.RangePicker
                  ranges={{
                    '近1个月': [moment().subtract(1, 'months'), moment()],
                    '近3个月': [moment().subtract(3, 'months'), moment()],
                    '近6个月': [moment().subtract(6, 'months'), moment()],
                    '近一年': [moment().subtract(1, 'years'), moment()]
                  }}
                  format="YYYY-MM-DD"
                  disabledDate={this.disabledDate}
                />
              )}
            </Form.Item>
          </Col>

          {isEqual(Number(tabActiveKey), 2) &&
            <Col
              span={4}
            >
              <Form.Item label="分类">
                {getFieldDecorator('statisticalType', {
                  initialValue: 'group'
                })(
                  <Select onChange={this.onChange}>
                    <Select.Option value="group">群组</Select.Option>
                    <Select.Option value="tool">工具</Select.Option>
                    <Select.Option value="user">用户</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          }

          {isEqual(statisticalType, 'user') &&
            <Col
              span={6}
            >
              <Form.Item label="用户所属">
                {getFieldDecorator('userType', {
                  initialValue: ''
                })(
                  <Select>
                    <OptGroup label="云服务器">
                      {statisticsEnum && statisticsEnum.vmId &&
                        statisticsEnum.vmId.map(item => {
                          return (<Option key={item} value={`vmId_${item}`}>{item}</Option>)
                        })
                      }
                    </OptGroup>
                    <OptGroup label="主机">
                      {statisticsEnum && statisticsEnum.hostName &&
                        statisticsEnum.hostName.map(item => {
                          return (<Option key={item} value={`hostName_${item}`}>{item}</Option>)
                        })
                      }
                    </OptGroup>
                    <OptGroup label="群组">
                      {statisticsEnum && statisticsEnum.groupName &&
                        statisticsEnum.groupName.map(item => {
                          return (<Option key={item} value={`groupName_${item}`}>{item}</Option>)
                        })
                      }
                    </OptGroup>
                  </Select>
                )}
              </Form.Item>
            </Col>
          }

          <Col
            span={6}
          >
            <Row type="flex" align="middle" justify="space-between">
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
            </Row>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default StatisticsFilter
