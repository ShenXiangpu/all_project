import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Col, Input, Select, Progress } from 'antd'
import styles from '../style.less'
import { router } from 'utils'
import { divide } from 'lodash'

const { Option } = Select
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
};

@Form.create()
class ChooseList extends Component {

    state = {
      
    }

    setStateValue = (field, value) => {
        this.setState({
            [`${field}`]: value
        })
    }


    chooseItem = (i, index) => {
        const { onChooseItem,setStatusIndex } = this.props
        setStatusIndex(index)
        const { id, key, name } = i
        console.log(i);
        onChooseItem({ id, key, name })
    }

    render() {
        const { list, title ,statusIndex} = this.props
        return (
            <div className={`${styles.flex} ${styles.alignCenter}`}>
                <div className={`${styles.fontW7} ${styles.marginRight20}`}>{title}：</div>
                <div className={styles.flex}>
                    {
                        list && list.length > 0 && list.map((i, index) => {
                            return (
                                <div key={i.id} onClick={() => this.chooseItem(i, index)} className={`${statusIndex == index ? styles.textStyle1 : styles.textStyle2} ${styles.textStyle} ${styles.fontW7} ${styles.marginRight20} ${styles.padding20} ${styles.pointer}`}>
                                    {i.name}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

ChooseList.propTypes = {
    form: PropTypes.object,
    filter: PropTypes.object,
    setFormValues: PropTypes.func,
    onSearch: PropTypes.func,
}

export default ChooseList
