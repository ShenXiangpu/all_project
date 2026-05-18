import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Button, Row, Col, Input, Select, message } from 'antd'
import Page from '../../components/Page/Page'
import styles from './index.less'
import Filter from './components/Filter'
import EduTable from './components/EduTable'
import { router } from 'umi'
import EduModal from './components/EduModal'

@connect(({ app, eduTraining, loading }) => ({ app, eduTraining, loading }))
class EduTraining extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {},           // 查询条件
            trainId: '',
        };
    }
    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: 'eduTraining/queryEduList',
        })
    }
    setStateValue = (field, value) => {
        this.setState({
            [`${field}`]: value
        })
    }
    get filterProps() {
        const { dispatch, loading } = this.props;
        const { formValues } = this.state
        return {
            filter: {
                ...formValues,
            },
            setFormValues: values => {
                this.setStateValue('formValues', values)
            },
            onSearch: values => {
                dispatch({
                    type: 'eduTraining/queryEduList',
                    payload: {
                        ...values
                    }
                })
            },
        }
    }
    handleAddClick = () => {
        const { dispatch, loading } = this.props;
        const pathname = '/eduTraining/addEduForm'
        router.push({
            pathname
        })
        dispatch({
            type: 'eduTraining/updateState',
            payload: {
                sign: 'add'
            }
        })

    }
    //打开报名列表
    handleModalShow = (id) => {
        const { dispatch, loading } = this.props;
        this.setStateValue('trainId', id)
        dispatch({
            type: 'eduTraining/oneFormFillList',
            payload: {
                trainId: id
            }
        }).then(() => {
            dispatch({
                type: 'eduTraining/showModal',
            })
        })


    }
    get eduListProps() {
        const { dispatch, eduTraining, loading } = this.props
        const { eduList, pagination } = eduTraining;
        const { formValues } = this.state

        return {
            loading: loading.effects['eduTraining/queryEduList'],
            dataSource: eduList,
            pagination,
            onChange: (pagination, filters, sorter) => {
                this.handleTableChange(pagination, filters, sorter)
            },
            onWatchList: (id) => {
                this.handleModalShow(id)
            },
            // 修改报名状态
            // 现在是报名中 那就只能改成培训中 status传1
            // 现在是培训中 要向改回报名中 status传0
            // 现在是培训中 要想改成已结束 status传2
            onHandleActionStatus: (id, status) => {
                dispatch({
                    type: 'eduTraining/modifyOneTrainStatus',
                    payload: {
                        id, status
                    }
                }).then((response) => {
                    if (response && response.flag) {
                        message.success('修改成功')
                        dispatch({
                            type: 'eduTraining/queryEduList',
                            payload: {
                                ...formValues
                            }
                        })
                    } else {
                        message.error(response.errMessage)
                    }
                })
            },
            onHandleUpdateTeach: (item) => {
                dispatch({
                    type: 'eduTraining/queryOneUserDetail',
                    payload: {
                        trainId: item.id
                    }
                })
                dispatch({
                    type: 'eduTraining/updateState',
                    payload: {
                        sign: 'update'
                    }
                })
                router.push(`/eduTraining/addEduForm?id=${item.id}`)
            },
            onSeachForm: (item) => {
                dispatch({
                    type: 'eduTraining/updateState',
                    payload: {
                        currentItem: item,
                    }
                })
                router.push(`./eduTraining/formilyDesignable/testFormCreate?id=${item.id}`)
            },

        }
    }


    get eduModalProps() {
        const { dispatch, eduTraining, loading } = this.props
        const { modalVisible, formFillList, pagination } = eduTraining
        const { trainId } = this.state
        return {
            trainId,
            visible: modalVisible,
            destroyOnClose: true,
            maskClosable: false,  //点击蒙层是否允许关闭，默认 true
            title: '报名列表',
            width: '60vw',
            centered: true,
            // okText: '确认',
            // cancelText: '取消',
            footer: null,
            formFillList,
            dispatch,
            loading,
            pagination,
            onOk() {

            },
            onCancel() {
                dispatch({
                    type: 'eduTraining/hideModal',
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

        this.setState({
            formValues: {
                ...formValues,
                ...filters,
            }
        })

        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        dispatch({
            type: 'eduTraining/queryEduList',
            payload: params,
        });
    };

    render() {
        const { eduTraining } = this.props

        return (
            <Page inner>
                <div className={styles.formFilter}><Filter {...this.filterProps} /></div>
                <p>
                    <Button icon="plus" type="primary" onClick={this.handleAddClick}>
                        添加教学
                    </Button>
                </p>
                <EduTable {...this.eduListProps} />
                <EduModal {...this.eduModalProps} />
            </Page>
        )
    }
}



export default EduTraining
