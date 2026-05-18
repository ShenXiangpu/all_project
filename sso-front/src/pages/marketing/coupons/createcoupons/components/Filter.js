import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, Select, Progress } from 'antd'
import styles from '../styles.less'
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

    };

    handleFormReset = () => {

    }

    handleRouter = () => {
       router.push('/marketing/coupons/CreateCoupons')
    }

    render() {
        const { form, storage, onBuyCapacity } = this.props;
        const { getFieldDecorator } = form;



        return (
            <Form {...formItemLayout} onSubmit={this.handleSearch} >
                <Row
                    gutter={{
                        md: 8,
                        lg: 24,
                        xl: 48,
                    }}
                >
                    <Col md={8} sm={24}>
                        <FormItem label="优惠券状态：">
                            {getFieldDecorator('name')(
                                <Input placeholder="输入文件名进行查询" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <span className={styles.submitButtons}>
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
                        </span>
                    </Col>
                    <Col md={4} sm={24}></Col>
                    <Col md={4} sm={24}>

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
