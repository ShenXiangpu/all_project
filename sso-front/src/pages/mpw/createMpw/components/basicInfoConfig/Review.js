import React, { PureComponent } from 'react'
import { Form, Row,Radio,Input } from 'antd'
const { TextArea } = Input;

const ColProps = {
    xs: 24,
    sm: 12,
    xl: 24,
    md: 8,

}

const formItemLayout = {
    labelCol: {
        xs: { span: 8 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 16 },
        sm: { span: 16 },
    },
};

class Review extends PureComponent {
    state = {

    }

    render() {

        const { form, } = this.props
        const { getFieldDecorator } = form


        return (
            <div >

                <Row>
                    <div>
                        <Form.Item
                            label="能否满足该项客户需求:"
                            required={true}
                            {...formItemLayout}
                            colon={false}
                            labelAlign="right"
                        >
                            {getFieldDecorator('reviewStatus', {
                                initialValue: '',
                            })(
                                <Radio.Group>
                                    <Radio value={1}>满足</Radio>
                                    <Radio value={2}>不满足</Radio>
                                </Radio.Group>
                            )}
                        </Form.Item>

                    </div>
                </Row>
                <Row>
                    <div>
                        <Form.Item
                            label="备注:"
                            required={false}
                            {...formItemLayout}
                            colon={false}
                            labelAlign="right"
                        >
                            {getFieldDecorator('b', {
                                initialValue: [],
                                // rules: [
                                //   {
                                //     required: true,
                                //     message: '请选择执行定期快照的时间'
                                //   },
                                // ],
                            })(
                                <TextArea style={{width:'250px'}} />
                            )}
                        </Form.Item>
                    </div>
                </Row>
            </div>
        )
    }
}

export default Review;
