import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, Select, Progress } from 'antd'
import styles from '../style.less'
import { router } from 'utils'

const { Option } = Select
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
};

@Form.create()
class Filter extends Component {

    handleSearch = e => {
        const { form, onhandleSelectChange } = this.props
        const { getFieldsValue } = form
        const {status} = getFieldsValue();
        onhandleSelectChange(status)
        e.preventDefault()

    };

    handleFormReset = () => {
        const { form,onHandleFormReset } = this.props
        form.resetFields();
        onHandleFormReset()
    }

    handleRouter = () => {
        router.push('/marketing/coupons/CreateCoupons')
    }


    render() {
        const { form,status } = this.props;
        const { getFieldDecorator } = form;

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
                        <FormItem label="状态">
                            {getFieldDecorator('status', {
                                initialValue: status,
                            })(
                                <Select style={{ width: 120 }}>
                                    <Option value="all">全部</Option>
                                    <Option value="0">禁用</Option>
                                    <Option value="1">启用</Option>
                                    <Option value="2">已过期失效</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    {/* <Col md={4} sm={24}></Col>
                    <Col md={4} sm={24}></Col>
                    <Col md={4} sm={24}></Col> */}
                    <Col md={16} sm={24}>
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
                    {/* <Col md={4} sm={24}></Col> */}
                    <Col md={4} sm={24} style={{textAlign:'right'}}>
                        <Button type="primary" onClick={this.handleRouter}>
                            新建优惠券
                        </Button>
                    </Col>
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
