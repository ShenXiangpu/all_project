import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, Select, Progress,DatePicker } from 'antd'
import styles from '../style.less'
import { router } from 'utils'
import moment from 'moment';

const { Option } = Select
const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';


const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
};

@Form.create()
class Filter extends Component {

    handleSearch = e => {
        const { form, onhandleSelectChange } = this.props;
        form.validateFields((err, values) => {
            const dates = values.date;
            const status = values.status;
            if(dates){
                const searchStartTime  = moment(dates[0]._d).format('YYYY-MM-DD 00:00:00')
                const searchEndTime  = moment(dates[1]._d).format('YYYY-MM-DD 23:59:59')
                const params = {
                    searchStartTime,
                    searchEndTime,
                    status
                }
                onhandleSelectChange(params)
            } else {
                const params = {
                    status
                }
                onhandleSelectChange(params)
            }
        })

       

    };


    handleFormReset = () => {
        const { form, setFormValues, onhandleSelectChange } = this.props
        form.resetFields();
        setFormValues({});
        onhandleSelectChange({})
    }

    handleRouter = () => {
        router.push('/marketing/coupons/CreateCoupons')
    }


    render() {
        const { form, status,date,couponsList } = this.props;
        const { getFieldDecorator } = form;

        console.log(status, 'status');

        return (
            <Form {...formItemLayout}  >
                <Row
                    gutter={{
                        md: 8,
                        lg: 24,
                        xl: 48,
                    }}
                >
                    <Col md={4} sm={24}>
                        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 12 }} label="推送状态：">
                            {getFieldDecorator('status', {
                                initialValue: status || ''
                            })(
                                <Select style={{ width: 120 }}>
                                    <Option value="">全部</Option>
                                    <Option value="0">待推送</Option>
                                    <Option value="1">已推送</Option>
                                    <Option value="2">已领取</Option>
                                    <Option value="3">过期未领取</Option>
                                    <Option value="4">推送失败</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    {/* <Col md={4} sm={24}>
                        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 12 }} label="用户id：">
                            {getFieldDecorator('userId', {
                                initialValue: ''
                            })(
                                <Input placeholder="请输入用户id" />
                            )}
                        </FormItem>
                    </Col> */}
                    {/* <Col md={4} sm={24}>
                        <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 12 }} label="优惠券名称：">
                            {getFieldDecorator('status', {
                                initialValue: '',
                            })(
                                <Select style={{ width: 180 }}>
                                    {couponsList && couponsList.length > 0 && couponsList.map(item => {
                                        const options = {

                                        }
                                    })}
                                </Select>
                            )}
                        </FormItem>
                    </Col> */}
                    <Col md={8} sm={24}>
                        <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 12 }} label="有效期：">
                            {getFieldDecorator('date', {
                                initialValue: date || '' ,
                            })(
                                <RangePicker
                                    format={dateFormat}
                                />
                            )}

                        </FormItem>
                    </Col>

                    <Col md={4} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button type="primary" onClick={this.handleSearch}>
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
                        </span>
                    </Col>
                    <Col md={4} sm={24}></Col>
                </Row>
            </Form>
        );
    }
}

Filter.propTypes = {
    form: PropTypes.object,
    filter: PropTypes.object,
    setFormValues: PropTypes.func,
    onSearch: PropTypes.func,
}

export default Filter
