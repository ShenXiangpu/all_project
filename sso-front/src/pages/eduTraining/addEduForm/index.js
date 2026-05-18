import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Form, Button, Row, Col, Input, message, DatePicker, Switch, Select } from 'antd'
import Page from '../../../components/Page/Page'
import styles from '../index.less'
import { router } from 'umi'
import moment from 'moment'
import { isEqual } from 'lodash'
import FileUpload from './components/FileUpload'
const { RangePicker } = DatePicker;

const ColProps = {
    xs: 24,
    sm: 24,
    xl: 24,
    md: 24,
    // style: {
    //   marginBottom: 16,
    // },
}


const formItemLayout = {
    labelCol: {
        xs: { span: 8 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 6 },
        sm: { span: 5 },
    },
};
@Form.create()
@connect(({ app, eduTraining, loading }) => ({ app, eduTraining, loading }))
class addEduForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            btnLoading: false,
            typeList: [],
            coverPath: '',
            linkVideoPath: '',
            typeName: '',
            imgfilePath: '',//封面图
            directionListForForm: [],
            directionList: [],
            trainingTypeList: [],
            resourcefile: '',//课程资料
        };
    }

    componentDidMount() {
        const { dispatch, eduTraining } = this.props
        const { currentItem = {} } = eduTraining
        const search = location.search;
        if (search && !isEqual(search, '')) {
            const id = search.split('=')[1]; //详情id
            this.setStateValue('id', id);
            dispatch({
                type: 'eduTraining/queryOneTrainDetailById',
                payload: {
                    trainId: id
                }
            }).then((currentItem) => {
                dispatch({
                    type: 'eduTraining/updateState',
                    payload: {
                        currentItem
                    }
                })
                if (currentItem) {
                    this.queryTypeList(currentItem.courseDirectionId)
                }
            })
        }

        dispatch({
            type: 'eduTraining/queryKeyValue',
        }).then((response) => {
            let courseDirectionList = []
            if (response && response.flag) {
                courseDirectionList = response.resData
                dispatch({
                    type: 'eduTraining/updateState',
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
            itemlist && itemlist.length > 0 && itemlist.map(item => {
                directionList.push(item)
            })
            let directionListForForm = []
            let itemlists = courseDirectionList && courseDirectionList[0] && courseDirectionList[0].itemList
            itemlists && itemlists.length > 0 && itemlists.map(item => {
                directionListForForm.push(item)
            })
            let trainingTypeList = []
            let itemlistss = courseDirectionList && courseDirectionList[3] && courseDirectionList[3].itemList
            itemlistss && itemlistss.length > 0 && itemlistss.map(item => {
                trainingTypeList.push(item)
            })
            this.setStateValue('trainingTypeList', trainingTypeList)
            this.setStateValue('directionList', directionList)
            this.setStateValue('directionListForForm', directionListForForm)
            // this.queryTypeList('CourseDirection', courseDirectionList)
        })


    }

    queryTypeList = (id) => {
        let key = ''
        this.setStateValue('typeList', [])
        this.props.form.setFieldsValue({ courseClassificationId: "", });
        const { eduTraining } = this.props;
        const { courseDirectionList, } = eduTraining
        if (isEqual('', id)) {
            key = 'CourseDirection'
        } else if (isEqual(1, id)) {
            key = 'CourseClassification_IC'
        } else if (isEqual(2, id)) {
            key = 'CourseClassification_IT'
        }
        let typeList = [];
        if (isEqual(key, 'CourseDirection')) {
            this.setStateValue('typeList', [])
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
    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'eduTraining/updateState',
            payload: {
                currentItem: {}
            }
        })

    }

    handleAddClick = () => {

    }
    //取消 返回上一级
    handleCancleClick = () => {
        const pathname = '/eduTraining'
        const { dispatch } = this.props;
        dispatch({
            type: 'eduTraining/updateState',
            payload: {
                currentItem: {}
            }
        })
        router.push({
            pathname
        })
    }
    //提交表单
    handleSubmit = e => {
        const { handleSubmit, eduTraining: { currentItem = {}, sign }, dispatch } = this.props;
        const { imgfilePath, resourcefile } = this.state
        this.setStateValue('btnLoading', true)
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            console.log(fieldsValue);
            if (err) {
                this.setStateValue('btnLoading', false)
                return;
            }
            const signStartDate = fieldsValue.signTimeDate[0].format('YYYY-MM-DD')
            const signEndDate = fieldsValue.signTimeDate[1].format('YYYY-MM-DD')
            const attendStartDate = fieldsValue.attendTimeDate[0].format('YYYY-MM-DD')
            const attendEndDate = fieldsValue.attendTimeDate[1].format('YYYY-MM-DD')
            const ofOpen = fieldsValue.ofOpen ? 1 : 2
            const name = fieldsValue.name;
            const sponsor = fieldsValue.sponsor;
            const trainingFormatId = fieldsValue.trainingFormatId;
            const teacher = fieldsValue.teacher;
            const groupName = fieldsValue.groupName;
            const courseDirectionId = fieldsValue.courseDirectionId;
            const remarks = fieldsValue.remarks;
            const courseClassificationId = fieldsValue.courseClassificationId;
            const coverPath = imgfilePath
            const linkVideoPath = resourcefile.filePath
            const values = {
                name,
                sponsor,
                trainingFormatId,
                signStartDate,
                teacher,
                groupName,
                courseDirectionId,
                remarks,
                courseClassificationId,
                coverPath,
                linkVideoPath,
                signEndDate,
                attendStartDate,
                attendEndDate,
                ofOpen,
                id: currentItem.id || ''
            };
            dispatch({
                type: `eduTraining/${sign}OneEdu`,
                payload: values
            }).then(response => {
                if (response && response.flag) {
                    message.success(sign === 'update' ? "修改成功" : "添加成功")
                    setTimeout(() => {
                        this.setStateValue('btnLoading', false)
                        router.push({
                            pathname: '../eduTraining'
                        })
                    }, 200);
                } else {
                    this.setStateValue('btnLoading', false)
                    message.config({
                        top: 100,
                        duration: 2,
                    });
                    message.error(response.errMessage)
                }

            })
        });
    };

    //重置表单
    handleReset = e => {
        e.preventDefault();
        this.props.form.resetFields()
    };

    // 上传文件
    get uploaderProps1() {
        const { dispatch, curriculumResource, loading, app } = this.props
        // const { currentPath } = curriculumResource
        const { fileList } = app


        return {
            dispatch,
            beforeFileQueued: (file) => {
                console.log('beforeFileQueued');
                if (file.size > 1) {
                    Modal.error({
                        title: '不能上传多个文件',
                    });
                    return false;
                }
                return true;
            },
            fileList,
            uploadUrl: '/service/education/ps/file/uploadFile?type=avatar',
            // rootPath: currentPath,
            onChange: (file, list) => {
                console.log('Modal onChange >>>> ', file, list)
            },
            onShowModal: (value) => {
                dispatch({
                    type: 'app/showUploadModal',
                    payload: {
                        webUploader: value
                    },
                })

            },
            onSetFileList: (value) => {
                this.setStateValue('coverPath', '')
                this.setStateValue('imgfilePath', '')
                dispatch({
                    type: 'app/updateState',
                    payload: {
                        fileList: value,
                    },
                })

            },
            onSetFilePath: (value) => {
                console.log(value);
                let res = value && value.response
                res = res && JSON.parse(res)
                if (res && res.flag) {
                    let resData = res.resData
                    let filePath = resData.filePath
                    this.setStateValue('coverPath', resData.originFileName)
                    this.setStateValue('imgfilePath', filePath)

                }
            },
            onSetValue: (id) => {
                // dispatch({
                //     type: 'mpw/updateState',
                //     payload: {
                //         fileGdsId: id
                //     },
                // })
            }
        }
    }
    get uploaderProps2() {
        const { dispatch, loading, app } = this.props
        // const { currentPath } = curriculumResource
        const { fileList } = app


        return {

            dispatch,
            beforeFileQueued: (file) => {
                console.log('beforeFileQueued');
                if (file.size > 1) {
                    Modal.error({
                        title: '不能上传多个文件',
                    });
                    return false;
                }
                return true;
            },
            fileList,
            uploadUrl: '/service/education/ps/file/uploadFile?type=avatar',
            // rootPath: currentPath,
            onChange: (file, list) => {
                console.log('Modal onChange >>>> ', file, list)

            },
            onShowModal: (value) => {
                dispatch({
                    type: 'app/showUploadModal',
                    payload: {
                        webUploader: value
                    },
                })

            },
            onSetFileList: (value) => {
                let ext = value && value[0] && value[0].ext
                if (isEqual(ext, 'mp4')) {
                    this.setStateValue('linkVideoPath', '')
                    this.setStateValue('resourcefile', {})
                    dispatch({
                        type: 'app/updateState',
                        payload: {
                            fileList: value,
                        },
                    })
                } else {
                    dispatch({
                        type: 'app/hideUploadModal',
                        payload: {
                            webUploader: {}
                        },
                    })
                }


            },
            onSetFilePath: (value) => {
                let ext = value && value.ext
                if (isEqual(ext, 'mp4')) {
                    let res = value && value.response
                    res = res && JSON.parse(res)
                    if (res && res.flag) {
                        let resData = res.resData
                        this.setStateValue('linkVideoPath', resData.originFileName)
                        this.setStateValue('resourcefile', resData)
                    }
                } else {
                    message.error('请上传MP4格式的视频')
                }
            },
        }
    }


    render() {
        const { btnLoading } = this.state
        const { typeList, coverPath = "", imgfilePath = "", resourcefile = {}, linkVideoPath = "", trainingTypeList, directionListForForm } = this.state;

        const { eduTraining: { currentItem }, form } = this.props
        const { getFieldDecorator } = form
        console.log('currentItem', currentItem);
        return (
            <Page inner>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <Row style={{ marginBottom: 16 }}>
                            <Col
                                {...ColProps}
                            >
                                <Form.Item label="培训名称" {...formItemLayout}>
                                    {getFieldDecorator('name', {
                                        initialValue: currentItem && currentItem.name || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入培训名称",
                                            },
                                        ],
                                    })(
                                        <Input placeholder="请输入培训名称" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 16 }}>
                            <Col
                                {...ColProps}
                                align="left"
                            >
                                <Form.Item label="主办方" {...formItemLayout}>
                                    {getFieldDecorator('sponsor', {
                                        initialValue: currentItem && currentItem.sponsor || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入主办方",
                                            },
                                        ],
                                    })(
                                        <Input placeholder="请输入主办方" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row style={{ marginBottom: 16 }}>

                            <Col
                                {...ColProps}
                                align="left"
                            >
                                <Form.Item label="培训方式" {...formItemLayout}>
                                    {getFieldDecorator('trainingFormatId', {
                                        initialValue: currentItem && currentItem.trainingFormatId || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入培训方式",
                                            },
                                        ],
                                    })(



                                        <Select>
                                            <Select.Option value=''>--请选择--</Select.Option>
                                            {
                                                trainingTypeList && trainingTypeList.map(item => {
                                                    return (
                                                        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>

                                    )}
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: 16 }}>

                            <Col
                                {...ColProps}
                                align="left"
                            >
                                <Form.Item label="讲师" {...formItemLayout}>
                                    {getFieldDecorator('teacher', {
                                        initialValue: currentItem && currentItem.teacher || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入讲师姓名",
                                            },
                                            // {
                                            //     pattern: /^1[3456789]\d{9}$/,
                                            //     message: "手机号码格式不正确，请重新输入"
                                            // }
                                        ],
                                        // validateTrigger: 'onBlur'
                                    })(
                                        <Input placeholder="请输入讲师姓名" />

                                    )}
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: 16 }}>

                            <Col
                                {...ColProps}
                                align="left"
                            >
                                <Form.Item label="群组名称" {...formItemLayout}>
                                    {getFieldDecorator('groupName', {
                                        initialValue: currentItem && currentItem.groupName || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入群组名称",
                                            }
                                        ]
                                    })(
                                        <Input readOnly={currentItem.groupName ? true : false} placeholder="请输入群组名称" />
                                    )}
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row style={{ marginBottom: 16 }}>

                            <Col
                                {...ColProps}
                                align="left"
                            >
                                <Form.Item label="报名时间" {...formItemLayout}>
                                    {getFieldDecorator('signTimeDate', {
                                        initialValue: currentItem && currentItem.signStartDate ? [moment(currentItem.signStartDate), moment(currentItem.signEndDate)] : null,
                                        rules: [
                                            {
                                                required: true,
                                                message: "请选择开始结束时间",
                                            }
                                        ]
                                    })(
                                        <RangePicker />

                                    )}
                                </Form.Item>
                            </Col>

                        </Row>

                        <Row style={{ marginBottom: 16 }}>
                            <Col
                                {...ColProps}
                                align="left"
                            >
                                <Form.Item label="教学时间" {...formItemLayout}>
                                    {getFieldDecorator('attendTimeDate', {
                                        initialValue: currentItem && currentItem.attendStartDate ? [moment(currentItem.attendStartDate), moment(currentItem.attendEndDate)] : null,
                                        rules: [
                                            {
                                                required: true,
                                                message: "请选择开始结束时间",
                                            }
                                        ]
                                    })(
                                        <RangePicker />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 16 }}>
                            <Col
                                {...ColProps}
                                align="left"
                            >
                                <Form.Item label='是否公开'  {...formItemLayout}>
                                    {getFieldDecorator('ofOpen', {
                                        initialValue: isEqual(currentItem && currentItem.ofOpen, 1),
                                        valuePropName: 'checked',
                                    })(
                                        <Switch checkedChildren="公开" unCheckedChildren="不公开" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 16 }}>

                            <Col
                                {...ColProps}
                                align="left"
                            >
                                <Form.Item label='课程方向' {...formItemLayout}>
                                    {getFieldDecorator('courseDirectionId', {
                                        initialValue: currentItem && currentItem.courseDirectionId || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: '请选择课程方向'
                                            },
                                        ],
                                    })(
                                        <Select onSelect={this.queryTypeList}>
                                            <Select.Option value=''>--请选择--</Select.Option>
                                            {
                                                directionListForForm && directionListForForm.map(item => {
                                                    return (
                                                        <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        {
                            typeList && typeList.length > 0 && <Row style={{ marginBottom: 16 }}>

                                <Col
                                    {...ColProps}
                                    align="left"
                                >
                                    <Form.Item ref='typeRef' label='课程类型' {...formItemLayout}>
                                        {getFieldDecorator('courseClassificationId', {
                                            initialValue: currentItem && currentItem.courseClassificationId || '',
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请选择课程类型'
                                                },
                                            ],
                                        })(
                                            <Select>
                                                <Select.Option value=''>--请选择--</Select.Option>
                                                {
                                                    typeList && typeList.map(item => {
                                                        return (
                                                            <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                        }
                        <Row style={{ marginBottom: 16 }}>
                            <Col
                                {...ColProps}
                                align="left"
                            >
                                <Form.Item label="课程介绍" {...formItemLayout}>
                                    {getFieldDecorator('remarks', {
                                        initialValue: currentItem && currentItem.remarks || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: "请输入课程介绍",
                                            },
                                        ],
                                    })(
                                        <Input.TextArea placeholder="请输入课程介绍" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 16 }}>
                            <Col
                                {...ColProps}
                                align="left"
                            >
                                <Form.Item label="封面图" {...formItemLayout}>
                                    {getFieldDecorator('coverPath', {
                                        initialValue: coverPath || currentItem && currentItem.coverPath || '',
                                        rules: [
                                            {
                                                required: true,
                                                message: "请上传封面图",
                                            },
                                        ],
                                    })(
                                        <Input style={{ marginRight: '20px' }} readOnly placeholder="封面图名称" />
                                    )}<FileUpload {...this.uploaderProps1} pickerId="filePicker1" />


                                </Form.Item>


                            </Col>
                        </Row>
                        <Row style={{ marginBottom: 16 }}>
                            <Col
                                {...ColProps}
                                align="left"
                            >
                                <Form.Item label="视频介绍" {...formItemLayout}>
                                    {getFieldDecorator('linkVideoPath', {
                                        initialValue: linkVideoPath || currentItem && currentItem.linkVideoPath || '',
                                        // rules: [
                                        //     {
                                        //         required: true,
                                        //         message: "请上传课程资料",
                                        //     },
                                        // ],
                                    })(
                                        <Input style={{ marginRight: '20px' }} readOnly placeholder="课程资料名称" />
                                    )}<FileUpload {...this.uploaderProps2} pickerId="filePicker2" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row style={{ marginBottom: 16 }}>
                            <Col
                                {...ColProps}
                                align="left"
                            >
                                <Form.Item
                                    wrapperCol={{
                                        xs: { span: 24, offset: 0 },
                                        sm: { span: 16, offset: 8 },
                                    }}
                                >

                                    <Button loading={btnLoading} type="primary" htmlType="submit">
                                        确定
                                    </Button>
                                    &nbsp;
                                    &nbsp;
                                    {currentItem && currentItem.groupName ? null : <Button type="default" onClick={this.handleReset}>
                                        重置
                                    </Button>}
                                    &nbsp;
                                    &nbsp;
                                    <Button onClick={this.handleCancleClick} >
                                        取消
                                    </Button>
                                </Form.Item>
                            </Col>

                        </Row>
                    </Form>
                </div>
            </Page >
        )
    }
}



export default addEduForm
