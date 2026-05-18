import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { router } from 'utils'
import { Steps, Form, message, Modal, Row, Col, Input, Select, Button } from 'antd';
const { Option } = Select;
import Page from '../../../components/Page'

import List from './components/List'
import Filter from './components/Filter'
import { log } from 'lodash-decorators/utils'

const ColProps = {
    xs: 24,
    sm: 24,
    xl: 8,
    md: 8,
    lg: 8
}
const formItemLayout = {
    labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
        xl: { span: 6 },
        md: { span: 6 },
        lg: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 },
        xl: { span: 14 },
        md: { span: 14 },
        lg: { span: 14 },
    },
}
@Form.create()
@connect(({ order, loading }) => ({ order, loading }))
class Order extends PureComponent {

    state = {
        formValues: '',
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: 'order/queryListOneRegistration',
            payload: {}
        })
    }


    handleReset = e => {

    }
    handleCancleClick = e => {

    }


    handleQuery = values => {
        const { dispatch, } = this.props;

        dispatch({
            type: 'order/queryListOneRegistration',
            payload: {
                ...values,
            }
        })
    }
    setStateValue = (field, value) => {
        this.setState({
            [`${field}`]: value
        })
    }


    get filterProps() {
        const { loading, dispatch, order } = this.props

        return {

            setFormValues: values => {
                this.setStateValue('formValues', values)
                this.setState({
                    filterValues: {
                        ...values,
                    }
                })
            },
            onSearch: values => {
                dispatch({
                    type: 'order/queryListOneRegistration',
                    payload: {
                        ...values
                    }
                })



            },
        }
    }
    handleTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
        const { formValues } = this.state;
        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = { ...obj };
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});
        const params = {
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
            ...formValues,
            ...filters,
        };
        console.log('params',params);
        this.setState({
            filterValues: {
                ...formValues,
                ...filters,
            }
        })

        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }
        this.handleQuery(params)
    };
    get tableProps() {
        const { loading, dispatch, order } = this.props
        const { orderList, pagination } = order
        return {
            orderList,
            pagination,
            loading: loading.effects['order/queryListOneRegistration'],
            pagination,
            onChange: (pagination, filters, sorter) => {
                this.handleTableChange(pagination, filters, sorter)
            },
        }
    }

    render() {
        const { Order, form } = this.props
        const { getFieldDecorator } = form

        return (
            <Page inner>
                <div className={styles.formFilter}>
                    <Filter {...this.filterProps} />
                </div>
                <List {...this.tableProps}></List>
            </Page>
        )
    }
}

Order.propTypes = {
    order: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}

export default Order