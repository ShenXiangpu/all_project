import React, { PureComponent } from 'react'
import { connect } from 'dva'
import Page from '../../components/Page'
import styles from './index.less'
import Filter from './components/Filter'
import EduTable from './components/EduTable'
import InfoModal from './components/InfoModal'
import { router } from 'umi'
import { isEqual } from 'lodash'
import debounce from 'lodash/debounce';
import { message } from 'antd'

@connect(({ app, eduTrainingRegistration, loading }) => ({ app, eduTrainingRegistration, loading }))
class EduTraining extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {},  // 查询条件
            status: '', //用来判断培训报名的状态
            infoModalVisible: false,

            directionList: [],//方向
            directionListForForm: [],//方向
            trainingTypeList: [],//培训形式
            typeList: [],//分类
            name: '',
            courseDirectionId: '',
            courseClassificationId: '',
            trainingFormatId: '',
            pageSize: 10,
            pageNum: 1,
        };
    }
    componentDidMount() {
        const { dispatch } = this.props

        dispatch({
            type: 'eduTrainingRegistration/queryKeyValue',
        }).then((response) => {
            let courseDirectionList = undefined
            if (response && response.flag) {
                courseDirectionList = response.resData
                dispatch({
                    type: 'eduTrainingRegistration/updateState',
                    payload: {
                        courseDirectionList: courseDirectionList,
                    },
                })
            } else {
                message.config({
                    top: 100,
                    duration: 2,
                });
            }
            let directionList = [{
                id: 0,
                key: 'CourseDirection',
                name: '全部'
            }];
            let itemlist = courseDirectionList && courseDirectionList[0] && courseDirectionList[0].itemList
            itemlist && itemlist && itemlist.length > 0 && itemlist.map(item => {
                directionList.push(item)
            })
            // let directionListForForm = []
            // let itemlists = courseDirectionList && courseDirectionList[0] && courseDirectionList[0].itemList
            // itemlists && itemlists && itemlists.length > 0 && itemlists.map(item => {
            //     directionListForForm.push(item)
            // })
            let trainingTypeList = [
                {
                    id: 0,
                    key: '',
                    name: '全部'
                }
            ]
            let itemlistss = courseDirectionList && courseDirectionList[3] && courseDirectionList[3].itemList
            itemlistss && itemlistss.length > 0 && itemlistss.map(item => {
                trainingTypeList.push(item)
            })
            this.setStateValue('trainingTypeList', trainingTypeList)
            this.setStateValue('directionList', directionList)
            // this.setStateValue('directionListForForm', directionListForForm)
            this.queryTypeList('CourseDirection', courseDirectionList)

        })



        dispatch({
            type: 'eduTrainingRegistration/queryEduList',
            payload: {
                pageNum: 1,
                pageSize: 10
            }
        });


    }

    queryTypeList = (key) => {
        const { eduTrainingRegistration } = this.props;
        const { courseDirectionList } = eduTrainingRegistration;
        let typeList = [{
            id: 0,
            key: 'CourseClassification',
            name: '全部'
        }];
        if (isEqual(key, 'CourseDirection')) {
            courseDirectionList[1] && courseDirectionList[1].itemList.map(item => {
                typeList.push(item)
            })
            courseDirectionList[2] && courseDirectionList[2].itemList.map(item => {
                typeList.push(item)
            })
        } else if (isEqual(key, 'CourseClassification_IC')) {
            courseDirectionList[1] && courseDirectionList[1].itemList.map(item => {
                typeList.push(item)
            })
        } else if (isEqual(key, 'CourseClassification_IT')) {
            courseDirectionList[2] && courseDirectionList[2].itemList.map(item => {
                typeList.push(item)
            })
        }
        this.setStateValue('typeList', typeList)
    }

    setStateValue = (field, value) => {
        this.setState({
            [`${field}`]: value
        })
    }
    // get filterProps() {
    //     const { dispatch, loading } = this.props;
    //     const { formValues } = this.state
    //     return {
    //         filter: {
    //             ...formValues,
    //         },
    //         setFormValues: values => {
    //             this.setStateValue('status', values.status)
    //             this.setStateValue('formValues', values)
    //         },
    //         onSearch: values => {
    //             dispatch({
    //                 type: 'eduTrainingRegistration/updateState',
    //                 payload: {
    //                     eduList: []
    //                 }
    //             })
    //             dispatch({
    //                 type: 'eduTrainingRegistration/queryEduList',
    //                 payload: {
    //                     ...values
    //                 }
    //             })

    //         },
    //     }
    // }
    handleAddClick = () => {
        const pathname = '/eduTrainingRegistration/addEduForm'
        router.push({
            pathname
        })
    }

    get infoModalProps() {
        const { dispatch, eduTrainingRegistration, loading } = this.props
        const { oneUserDetail } = eduTrainingRegistration;
        const { infoModalVisible } = this.state


        return {
            oneUserDetail,
            visible: infoModalVisible,
            destroyOnClose: true,
            maskClosable: true,  //点击蒙层是否允许关闭，默认 true
            title: '报名信息',
            width: '30vw',
            centered: true,
            footer: () => { },
            onCancel: () => {
                this.setStateValue('infoModalVisible', false)
            }
        }
    }

    get eduListProps() {
        const { dispatch, eduTrainingRegistration, loading } = this.props
        const { eduList, pagination } = eduTrainingRegistration;
        const { status } = this.state

        return {
            status,
            loading: loading.effects['eduTrainingRegistration/queryEduList'],
            dataSource: eduList,
            pagination,
            onChange: (pagination, filters, sorter) => {
                this.handleTableChange(pagination, filters, sorter)
            },
            onQueryInfo: (value) => {
                dispatch({
                    type: 'eduTrainingRegistration/queryOneUserDetail',
                    payload: {
                        trainId: value
                    }
                }).then(() => {
                    this.setStateValue('infoModalVisible', true)
                })

            }
        }
    }


    get listProps() {
        const { dispatch, eduTrainingRegistration, loading } = this.props
        const { eduList, pagination, total } = eduTrainingRegistration;
        return {
            total,
            pagination,
            sourcesList: eduList,
            onChange: (pagination, filters, sorter) => {
                this.handleTableChange(pagination)
            },

            onSeachForm: (item) => {
                dispatch({
                    type: 'eduTrainingRegistration/updateState',
                    payload: {
                        currentItem: item,
                    }
                })
                router.push(`/eduTrainingRegistration/testFormCreate?id=${item.id}`)
            },
            onCallMissLi:() => {
                dispatch({
                    type: 'eduTrainingRegistration/updateState',
                    payload: {
                        isShowQCode: true
                    }
                }) 
                router.push(`/eduTrainingRegistration/testFormCreate`)
            }
            
        }
    }

    handleTableChange = (pagination) => {
        const {
            name,
            courseDirectionId,
            courseClassificationId,
        } = this.state

        const params = {
            pageNum: pagination.current,
            pageSize: pagination.pageSize,
            name,
            courseDirectionId,
            courseClassificationId,
        };
        this.handleQuery(params);
    }

    get filterProps() {
        const { app, eduTrainingRegistration, dispatch } = this.props
        const {
            directionList,//方向
            trainingTypeList,
            typeList,//分类
            name,
            status,
            courseDirectionId,
            trainingFormatId,
            courseClassificationId,
        } = this.state
        const { pagination } = eduTrainingRegistration

        return {
            trainingTypeList,
            directionList,
            typeList,
            directionTitle: '课程方向',
            typeTitle: '课程分类',
            dispatch,
            onChooseDirectItem: (value) => {
                const { id, key } = value
                this.queryTypeList(key)
                this.setState({
                    courseDirectionId: id,
                    courseClassificationId: 0,
                })
                this.handleQuery({
                    name,
                    status,
                    courseDirectionId: id,
                    courseClassificationId: 0,
                    trainingFormatId,
                    ...pagination
                })

            },

            onChooseTypeItem: (value) => {
                const { id } = value
                this.setState({
                    courseClassificationId: id,
                })
                this.handleQuery({
                    name,
                    status,
                    courseDirectionId,
                    trainingFormatId,
                    courseClassificationId: id,
                    ...pagination
                })
            },
            onChooseTrainingItem: (value) => {
                const { id } = value
                this.setState({
                    trainingFormatId: id,
                })
                this.handleQuery({
                    name,
                    status,
                    courseDirectionId,
                    trainingFormatId: id,
                    courseClassificationId,
                    ...pagination
                })
            },
            onSearch: debounce(data => {
                this.setState({
                    name: data,
                })
                this.handleQuery({
                    name: data,
                    status,
                    courseDirectionId,
                    trainingFormatId,
                    courseClassificationId,
                    ...pagination
                })
            }, 300),

            onSelectChange: (value) => {
                this.setState({
                    status: value,
                })
                this.handleQuery({
                    status: value,
                    name,
                    courseDirectionId,
                    trainingFormatId,
                    courseClassificationId,
                    ...pagination
                })
            },
            onSearchChange: (value) => {
                this.setState({
                    name: value,
                })
                this.handleQuery({
                    name: value,
                    status,
                    courseDirectionId,
                    trainingFormatId,
                    courseClassificationId,
                    ...pagination
                })
            },
        }
    }

    handleQuery = values => {
        const { dispatch } = this.props;
        dispatch({
            type: 'eduTrainingRegistration/queryEduList',
            payload: {
                ...values,
            }
        })
    }

    render() {
        const { eduTraining } = this.props

        return (
            <Page inner>
                <div className={styles.formFilter}>
                    <Filter {...this.filterProps} />
                </div>

                <EduTable {...this.listProps} />

                <InfoModal {...this.infoModalProps} />

            </Page>
        )
    }
}



export default EduTraining
