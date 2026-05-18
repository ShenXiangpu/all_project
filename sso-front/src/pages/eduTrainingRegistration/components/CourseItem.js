import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Popover, Col, Input, Select, Card, Tag } from 'antd'
const { Meta } = Card;
import styles from '../style.less'
import { router } from 'utils'
import { divide, isEqual } from 'lodash'
import moment from 'moment'

const { Option } = Select
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
};

@Form.create()
class CourseItem extends Component {

    state = {
        statusIndex: 0, //控制点击选择
    }

    setStateValue = (field, value) => {
        this.setState({
            [`${field}`]: value
        })
    }
    seachForm = (item) => {
        const { onSeachForm } = this.props
        onSeachForm(item)
    }



    render() {
        const { item, onSeachForm, onCallMissLi } = this.props

        const btn = (item) => {
            if (isEqual(item.status, 1)) {
                return (
                    <div>
                        <Button type="primary" block onClick={() => onSeachForm(item)}>
                            立即报名
                        </Button>
                    </div>
                )
            } else if (isEqual(item.status, 3)) {
                return (
                    <div>
                        <Button type="primary" block onClick={() => onCallMissLi()}>
                            审核中
                        </Button>
                    </div>
                )
            } else if (isEqual(item.status, 4)) {
                return (
                    <div>
                        <Button type="danger" block >
                            已驳回
                        </Button>
                    </div>
                )
            } else if (isEqual(item.status, 5)) {
                return (
                    <div>
                        <Button type="primary" block onClick={() => onCallMissLi()}>
                            报名成功
                        </Button>
                    </div>
                )
            } else if (isEqual(item.status, 6)) {
                return (
                    <div>
                        <Button type="primary" block>
                            报名结束
                        </Button>
                    </div>
                )
            }

        }


        return (
            <div>
                <div className={styles.card}>
                    <Card
                        hoverable
                        style={{ width: '100%', }}
                        cover={<img alt="example" style={{ height: 168, objectFit: 'scale-down' }} src={item.coverPath} />}
                    >
                        <div>
                            <div className={`${styles.flex} ${styles.justifyBetween} ${styles.marginBottom10}`}>


                                <Popover content={item.name} >
                                    <div className={`${styles.viewText}`}>{item.name}</div>
                                </Popover>,
                            </div>
                            <div className={`${styles.marginBottom10}`}>培训时间：{moment(item.attendStartDate).format('YYYY-MM-DD')}至{moment(item.attendEndDate).format('YYYY-MM-DD')}</div>
                            {btn(item)}
                        </div>
                    </Card>
                </div>

            </div>
        );
    }
}

CourseItem.propTypes = {
    form: PropTypes.object,
    filter: PropTypes.object,
    setFormValues: PropTypes.func,
    onSearch: PropTypes.func,
}

export default CourseItem
