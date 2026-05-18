import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, Select, Card, Tag } from 'antd'
const { Meta } = Card;
import styles from '../style.less'
import { router } from 'utils'
import { divide } from 'lodash'
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
    goToReDetail = (item) => {
        router.push(`/curriculumResource/${item.id}`)
    }
    

    render() {
        const { item } = this.props

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
                                <div className={`${styles.viewText}`}>{item.name}</div><div className={`${styles.tips}`}> <Tag color="blue">{item && item.itemList[0] && item.itemList[0].fileTypeTag} </Tag></div>
                            </div>
                            <div className={`${styles.marginBottom10}`}>课程分类：<Tag color="blue" style={{marginLeft:0}}>{item.courseClassificationName}</Tag></div>
                            <div>
                                <Button type="primary" block onClick={() => this.goToReDetail(item)}>
                                    立即学习
                                </Button>
                            </div>
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
