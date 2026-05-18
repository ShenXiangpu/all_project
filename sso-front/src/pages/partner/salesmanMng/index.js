import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { router } from 'utils'
import debounce from 'lodash/debounce'
import { Steps, Form, message, Modal, Row, Col, Input, Select, Button } from 'antd';
import Page from '../../../components/Page'

import List from './components/List'
import Filter from './components/Filter'
import UserInfoModal from './components/UserInfoModal'
const { Option } = Select;

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
@connect(({ salesmanMng, loading }) => ({ salesmanMng, loading }))
class SalesmanMng extends PureComponent {
    state = {
        userModalFlag: false,
        formValues: '',
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: 'salesmanMng/listSalesman',
            payload: {}
        })
    }
    get fillAccountProps() {
        const { loading, dispatch, salesmanMng } = this.props
        const { errorMessage } = salesmanMng

        return {
            loading,
            errorMessage,
            onNext: (values) => {
                dispatch({
                    type: 'findPassword/checkVerigyandAccount',
                    payload: {
                        verifyInput: values.vertification,
                        loginName: values.loginName
                    }
                })
            }
        }
    }

    handleReset = e => {

    }
    handleCancleClick = e => {

    }


    handleQuery = values => {
        const { dispatch, } = this.props;

        dispatch({
            type: 'salesmanMng/listSalesman',
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
        const { loading, dispatch, salesmanMng } = this.props
        const { errorMessage } = salesmanMng
        const { userModalFlag } = this.state;

        return {
            userModalFlag,
            onOpenModal: () => {
                this.setState({
                    userModalFlag: true
                })
            },
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
                    type: 'salesmanMng/listSalesman',
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
        console.log('pagination',pagination);
        const params = {
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
            ...formValues,
            ...filters,
        };

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
        const { loading, dispatch, salesmanMng } = this.props
        const { salemanList, pagination } = salesmanMng
        return {
            salemanList,
            pagination,
            loading: loading.effects['salesmanMng/listSalesman'],
            pagination,
            onChange: (pagination, filters, sorter) => {
                this.handleTableChange(pagination, filters, sorter)
            },
        }
    }

    get userModalProps() {
        const { dispatch, loading } = this.props;
        const { userModalFlag } = this.state;
        return {
            visible: userModalFlag,
            // loading: loading.effects['vm/getConsole'],
            width: '30%',
            destroyOnClose: true,
            maskClosable: true,  //点击蒙层是否允许关闭，默认 true
            title: '新增业务员',
            maxmin: true,
            centered: true,
            //   footer: null,
            onCancel: () => {
                this.setState({
                    userModalFlag: false
                })
            },
            onOk: debounce(data => {
                console.log(data, 'data');
                dispatch({
                    type: 'salesmanMng/addOneSalesman',
                    payload: data,
                }).then(response => {
                    if (response && response.flag) {
                        message.success("渠道新增成功")

                        this.setState({
                            userModalFlag: false
                        })
                        this.handleQuery();
                    } else {
                        message.config({
                            top: 100,
                            duration: 2,
                        });
                        message.error(response.errMessage)
                    }
                })
            }, 1000),
        }
    }


    render() {
        const { salesmanMng: { currentStep }, form } = this.props
        const { getFieldDecorator } = form

        return (
            <Page inner>
                <div className={styles.formFilter}>
                    <Filter {...this.filterProps} />
                </div>
                <List {...this.tableProps}></List>
                <UserInfoModal {...this.userModalProps}></UserInfoModal>
            </Page>
        )
    }
}

SalesmanMng.propTypes = {
    salesmanMng: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}

export default SalesmanMng