import React, { Component,useMemo } from 'react';
import { connect } from 'dva';
import { router } from 'utils'
import { Steps, Form, Menu, Modal } from 'antd';
import debounce from 'lodash/debounce';
import { isEmpty, isEqual } from 'lodash';
import store from 'store';
import styles from '../../index.less'

import { leggoItemStore } from '../../utils/itemStore'
import  CreateLeggoItem  from '../../utils/CreateLeggoItem'


const { Step } = Steps;

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
}

@Form.create()
class Left extends Component {
    state = {
        leggoItems:[]
    }

    setStateValue = (field, value) => {
        console.log(field);
        this.setState({
            [`${field}`]: value
        })
    }


    get creaProps () {
        const { form } = this.props
        return {
            form,
            leggoItemStore
        }
    }


    render() {
        const { leggoItems } = this.state

        return (
            <>
                <div className={styles.leggoConfigsLeft}>
                    <Form {...layout}>
                        <div className={styles.leggoConfigsLeftFormContent}>
                            <CreateLeggoItem {...this.creaProps} />
                        </div>
                    </Form>
                </div>
            </>
        )
    }
}

export default Left;
