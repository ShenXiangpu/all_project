import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { router } from 'utils'
import { stringify } from 'qs'
import { message, Button } from 'antd'
import Page from '../../components/Page/Page'
import styles from './style.less'
import debounce from 'lodash/debounce';
import Filter from './components/Filter'
import List from './components/List'
import SourceModal from './components/SourceModal'
import { isEqual } from 'lodash'
import store from 'store';

@connect(({ app, curriculumResource, loading }) => ({ app, curriculumResource, loading }))
class CurriculumResource extends PureComponent {
    state = {
        directionList: [],//方向
        directionListForForm: [],//方向

        typeList: [],//分类
        name: '',
        courseDirectionId: '',
        courseClassificationId: '',
        pageSize: 10,
        pageNum: 1,
    }

    componentDidMount() {
        const { dispatch } = this.props

        dispatch({
            type: 'curriculumResource/queryKeyValue',
        }).then((response) => {
            let courseDirectionList = undefined
            if (response && response.flag) {
                courseDirectionList = response.resData
                dispatch({
                    type: 'curriculumResource/updateState',
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
            let directionListForForm = []
            let itemlists = courseDirectionList && courseDirectionList[0] && courseDirectionList[0].itemList
            itemlists && itemlists && itemlists.length > 0 && itemlists.map(item => {
                directionListForForm.push(item)
            })
            this.setStateValue('directionList', directionList)
            this.setStateValue('directionListForForm', directionListForForm)
            this.queryTypeList('CourseDirection', courseDirectionList)
        })


        dispatch({
            type: 'curriculumResource/queryCourseList',
            payload: {
                pageNum: 1,
                pageSize: 10
            }
        })
    }

    queryTypeList = (key) => {
        const { curriculumResource } = this.props;
        const { courseDirectionList } = curriculumResource;
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

    get filterProps() {
        const { app, curriculumResource, dispatch } = this.props
        const {
            directionList,//方向
            typeList,//分类
            name,
            courseDirectionId,
            courseClassificationId,
        } = this.state
        const { pagination } = curriculumResource

        return {
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
                    courseDirectionId: id,
                    courseClassificationId: 0,
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
                    courseDirectionId,
                    courseClassificationId: id,
                    ...pagination
                })
            },
            onSearch: debounce(data => {
                this.setState({
                    name: data,
                })
                this.handleQuery({
                    name: data,
                    courseDirectionId,
                    courseClassificationId,
                    ...pagination
                })
            }, 300),
            onSearchChange: (value) => {
                this.setState({
                    name: value,
                })
                this.handleQuery({
                    name: value,
                    courseDirectionId,
                    courseClassificationId,
                    ...pagination
                })
            },
        }
    }

    handleTableChange = (pagination) => {
        console.log(pagination);
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
    handleQuery = values => {
        const { dispatch, coupons } = this.props;
        dispatch({
            type: 'curriculumResource/queryCourseList',
            payload: {
                ...values,
            }
        })
    }
    get listProps() {
        const { curriculumResource, loading, dispatch } = this.props
        const { pagination, sourcesList, total } = curriculumResource
        return {
            total,
            pagination,
            sourcesList,
            loading: loading.effects['curriculumResource/queryCourseList'],
            onChange: (pagination, filters, sorter) => {
                this.handleTableChange(pagination)
            },
        }
    }

    get modalProps() {
        const { dispatch, app, curriculumResource, loading } = this.props
        const { currentItem, modalVisible, modalType, courseDirectionList, pagination } = curriculumResource
        const { directionListForForm, name, courseDirectionId, courseClassificationId } = this.state
        return {
            app,
            dispatch,
            courseDirectionList,
            directionListForForm,
            item: modalType === 'create' ? {} : currentItem,
            visible: modalVisible,
            destroyOnClose: true,
            maskClosable: false,  //点击蒙层是否允许关闭，默认 true
            confirmLoading: loading.effects[`curriculumResource/addOne`],
            title: `${modalType === 'create' ? '新增课程资源' : '修改课程资源'}`,
            centered: true,
            okText: '确认',
            cancelText: '取消',
            onOk: debounce(data => {
                dispatch({
                    type: `curriculumResource/addOne`,
                    payload: data,
                }).then(() => {
                    this.handleQuery({
                        name,
                        courseDirectionId,
                        courseClassificationId,
                        ...pagination
                    })
                    dispatch({
                        type: `curriculumResource/updateModalVisibleHidden`,
                    })
                })
            }, 1000),
            onCancel() {
                dispatch({
                    type: 'curriculumResource/updateModalVisibleHidden',
                })
            },
        }
    }

    showSourceModal = () => {
        const { dispatch } = this.props
        dispatch({
            type: 'curriculumResource/updateModalVisibleShow',
        })
    }





    render() {

        const user = store.get('user') //trainerAdmin
        const roles = user && user.userInfo && user.userInfo.userRoles
        let btn = false;
        roles && roles.length > 0 && roles.map(item => {
            if (isEqual(item.name, 'trainerAdmin')) {
                return btn = true
            }
        });


        return (
            <Page inner style={{ overflow: 'hidden' }}>
                <Filter {...this.filterProps} />
                {!btn && <div className={`${styles.marginTop20}`}>
                    <Button type="primary" icon="plus" onClick={this.showSourceModal}>
                        添加资源
                    </Button>
                </div>}

                <List  {...this.listProps} />
                <SourceModal {...this.modalProps} />
            </Page>
        )
    }
}

export default CurriculumResource
