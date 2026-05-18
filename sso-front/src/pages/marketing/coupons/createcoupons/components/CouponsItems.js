import {
  Form,
  Input,
  Radio,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  InputNumber,
  Checkbox,
  Button,
  DatePicker,
  message,
} from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

import React, { PureComponent } from 'react'
import isEqual from 'lodash.isequal';
import styles from "../styles.less"
import { router } from 'umi';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;

const leftColProps = {
  xs: 24,
  sm: 12,
  md: 6,
  style: {
    margin: 0,
  },
}
const ColProps = {
  xs: 24,
  sm: 12,
  md: 8,
  style: {
    margin: 0,
  },
}
const RowProps = {
  xs: 24,
  sm: 12,
  md: 8,
  style: {
    margin: 0,
    height: '80px',
    lineHeight: '80px'
  },
}




@Form.create()
class CouponsItems extends PureComponent {
  state = {
    isShow: true,
  };


  chooseCouponsType = (e) => {
    console.log(e)
    let values = e.target.value
    this.setState({
      isShow: isEqual(values, '10')
    })
  }

  chooseCouponsLimit = (e) => {

  }


  onCheckedChange = checkedList => {
    const { onCheckedChange } = this.props
    onCheckedChange(checkedList)
  };

  handleClose = () => {
    const { form, setFormValues, dispatch } = this.props
    form.resetFields()
    router.push({
      pathname: '/marketing/coupons'
    })
  }
  //提交
  handleSubmit = () => {
    const { isShow } = this.state;
    const { form, setFormValues, dispatch } = this.props
    const { getFieldsValue } = form
    this.props.form.validateFields((err, values) => {
      // const values = getFieldsValue();
      if (isShow) {
        let parValue = Number(values.parValue)
        let startValue = Number(values.startValue)
        if (parValue < startValue) {

          setFormValues(values);
        } else {
          message.error('优惠券起始金额必须大于面值金额')
        }
      } else {
        setFormValues(values);
      }

    });
    // setFormValues(values);
  }

  disabledDate = (current) => {

    console.log(moment().endOf('day'), "moment().endOf('day')");
    // Can not select days before today and today
    return current - 1 && current - 1 <= moment().subtract(1, 'days').endOf('day');

  }


  render() {
    const { form, scopeList, isBtnLoading } = this.props;
    const { isShow } = this.state;
    const { getFieldDecorator } = form;


    return (
      <div>
        <Form>
          <Row
            {...RowProps}
          >
            <Col {...ColProps}>
              <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 12 }} label="优惠券名称：">
                {getFieldDecorator('name', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: "请输入优惠券名称"
                    }
                  ],
                })(
                  <Input placeholder="请输入优惠券名称" style={{ width: '180px' }} />
                )}
                {/* <div style={{ fontSize: '12px', color: '#999' }}>名称不要超过12个字符</div> */}

              </FormItem>
            </Col>
          </Row>
          <Row
            {...RowProps}
          >
            <Col {...ColProps}>
              <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 12 }} label="发放总量：">
                {getFieldDecorator('maxQuantity', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: "请输入发放总量"
                    }
                  ],
                })(
                  <InputNumber min={1} />
                )} <span>张</span>
              </FormItem>
            </Col>
          </Row>
          <Row
            {...RowProps}
          >
            <Col {...ColProps}>
              <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 12 }} label="优惠内容：">
                {getFieldDecorator('type', {
                  initialValue: '10',
                  rules: [
                    {
                      required: true,
                    }
                  ],
                })(

                  <Radio.Group buttonStyle="solid" onChange={this.chooseCouponsType}>
                    <Radio.Button value="10">满减券</Radio.Button>
                    <Radio.Button value="20">代金券</Radio.Button>
                  </Radio.Group>
                )}
                <div style={{ fontSize: '12px', color: '#999' }}>满减券需要维护起始金额</div>

              </FormItem>
            </Col>
          </Row>
          <Row
            {...RowProps}
          >

            <Col {...ColProps}>
              <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 12 }} label="优惠券面值：">
                {getFieldDecorator('parValue', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: "请输入优惠券面值"
                    }
                  ],
                })(
                  <InputNumber min={1} />
                )} <span>元</span>
              </FormItem>
            </Col>
          </Row>
          {isShow &&
            <Row
              {...RowProps}
            >
              <Col {...ColProps}>
                <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 12 }} label="起始金额：">
                  {getFieldDecorator('startValue', {
                    initialValue: '',
                    rules: [
                      {
                        required: true,
                        message: "请输入起始金额"
                      }
                    ],
                  })(
                    <InputNumber min={1} />
                  )} <span>元</span>
                  <div style={{ fontSize: '12px', color: '#999' }}>起始金额必须大于优惠券面值</div>
                </FormItem>
              </Col>
            </Row>}
          <Row
            {...RowProps}
          >
            <Col {...ColProps}>
              <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 12 }} label="有效期：">
                {getFieldDecorator('date', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: "请输入有效期"
                    }
                  ],
                })(
                  <RangePicker
                    format={dateFormat}
                    disabledDate={this.disabledDate}
                  />
                )}

              </FormItem>
            </Col>
          </Row>
          <Row
            {...RowProps}
          >
            <Col {...ColProps} span={12}>
              <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 12 }} label="使用范围：">
                {getFieldDecorator('scope', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: "请选择使用范围"
                    }
                  ],
                })(
                  <CheckboxGroup style={{ minWidth: "500px" }}
                    onChange={this.onCheckedChange}
                  >
                    {scopeList && scopeList.length > 0 && scopeList.map(item => {
                      return (
                        <Checkbox style={{ padding: '10px 0', margin: '0' }} key={item.key} value={item.key}>{item.name}</Checkbox>
                      )
                    })}
                  </CheckboxGroup>

                )}

              </FormItem>
            </Col>
          </Row>
          <Row
            {...RowProps}
          >
            <Col {...ColProps}>
              <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 12 }} label="领取限制：">
                {getFieldDecorator('receiptLimit', {
                  initialValue: '1',
                  rules: [
                    {
                      required: true,
                    }
                  ],
                })(

                  <Radio.Group buttonStyle="solid" onChange={this.chooseCouponsLimit}>
                    <Radio.Button value="1">所有用户</Radio.Button>
                    <Radio.Button value="2">新用户</Radio.Button>
                  </Radio.Group>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row
            {...RowProps}
          >
            <Col {...ColProps}>
              <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 12 }} label="是否公开：">
                {getFieldDecorator('ofPublic', {
                  initialValue: '0',
                  rules: [
                    {
                      required: true,
                    }
                  ],
                })(

                  <Radio.Group buttonStyle="solid" onChange={this.chooseCouponsLimit}>
                    <Radio.Button value="1">是</Radio.Button>
                    <Radio.Button value="0">否</Radio.Button>
                  </Radio.Group>
                )}
                <div style={{ fontSize: '12px', color: '#999' }}>是否显示到门户网站上</div>

              </FormItem>
            </Col>
          </Row>
          <Row
            {...RowProps}
          >

            <Col {...ColProps}>
              <FormItem
              colon={false}
              labelCol={{ span: 7 }} wrapperCol={{ span: 12 }} label=" ">
                <Button type='primary' loading={isBtnLoading} onClick={this.handleSubmit}>提交</Button>&nbsp;

                <Button  onClick={this.handleClose}>取消</Button> 

              </FormItem>


            </Col>
          </Row>


        </Form>

      </div>
    );
  }
}



export default CouponsItems
