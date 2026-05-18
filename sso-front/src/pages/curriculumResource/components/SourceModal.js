import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, Input, Modal, Select, Icon, Avatar, Skeleton, Form, message } from 'antd'
import styles from '../style.less'
import { isEmpty, isEqual } from 'lodash'
import FileUpload from './FileUpload'
import { stringify } from 'qs'
const FormItem = Form.Item
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
}
@Form.create()
class SourceModal extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            typeList: [],
            fileImgName: '',
            fileName: '',
            typeName: '',
            imgfilePath: '',//封面图
            resourcefile: '',//课程资料
        }
    }


    handleGetGroupInfo = value => {
        if (!isEmpty(value)) {
            const { onGetGroupInfo } = this.props;
            onGetGroupInfo(value);
        }
    }

    onShowUserInfo = (id, e) => {
        const { showUserInfo } = this.props;
        showUserInfo(id);
    }

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
                this.setStateValue('fileImgName', '')
                this.setStateValue('imgfilePath', '')
                dispatch({
                    type: 'app/updateState',
                    payload: {
                        fileList: value,
                    },
                })
            },
            onSetFilePath: (value) => {
                let res = value && value.response
                res = res && JSON.parse(res)
                if (res && res.flag) {
                    let resData = res.resData
                    let filePath = resData.filePath
                    this.setStateValue('fileImgName', resData.originFileName)
                    this.props.form.setFieldsValue({ fileImgName: resData.originFileName, });
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
        const { dispatch, curriculumResource, loading, app } = this.props
        // const { currentPath } = curriculumResource
        const { fileList } = app


        return {

            dispatch,
            fileList,
            uploadUrl: '/service/education/ps/file/uploadFile?type=file',
            // rootPath: currentPath,
            onChange: (file, list) => {
                console.log('Modal onChange >>>> ', file, list)

            },
            onShowModal: (value) => {
                console.log('value-----------------------', value);
                dispatch({
                    type: 'app/showUploadModal',
                    payload: {
                        webUploader: value
                    },
                })

            },
            onSetFileList: (value) => {
                this.setStateValue('fileName', '')
                this.setStateValue('resourcefile', {})
                let ext = value && value[0] && value[0].ext
                if (isEqual(ext, 'mp4')) {

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
                        this.setStateValue('fileName', resData.originFileName)
                        this.props.form.setFieldsValue({ fileName: resData.originFileName, });
                        debugger
                        this.setStateValue('resourcefile', resData)
                    }
                } else {
                    message.error('请上传MP4格式的视频')
                    this.setStateValue('resourcefile', '')
                }

            },
        }
    }
    setStateValue = (field, value) => {
        this.setState({
            [`${field}`]: value
        })
    }


    queryTypeList = (id) => {
        let key = ''
        this.setStateValue('typeList', [])
        this.props.form.setFieldsValue({ courseClassificationId: "", });
        const { courseDirectionList } = this.props;
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

    handleOk = (e) => {
        e.preventDefault();
        // clearInterval(this.timer)

        const { onOk, form } = this.props
        const { validateFields } = form
        const { resourcefile, imgfilePath } = this.state
        validateFields((errors, values) => {
            if (errors) {
                return
            }
            const { courseClassificationId, courseDirectionId, name, } = values
            const data = {
                coverPath: imgfilePath,
                courseClassificationId, courseDirectionId, name,
                itemList: [
                    resourcefile
                ],
            }

            onOk(data)
            this.setState({
                typeList: [],
                fileImgName: '',
                fileName: '',
                typeName: '',
                imgfilePath: '',//封面图
                resourcefile: '',//课程资料
            })
        })
    }

    onCancel = () => {
        const { onCancel } = this.props

        onCancel()
        this.setState({
            typeList: [],
            fileImgName: '',
            fileName: '',
            typeName: '',
            imgfilePath: '',//封面图
            resourcefile: '',//课程资料
        })
    }

    render() {
        const { form, directionListForForm, curriculumResource, ...modalProps } = this.props
        const { getFieldDecorator } = form;
        const { typeList, imgfilePath = "", resourcefile = {}, fileImgName = '', fileName = '', typeName } = this.state;

        // newDirectList.splice(0, 1)
        return (
            <Modal {...modalProps} onOk={this.handleOk} onCancel={this.onCancel}>
                <Form layout="horizontal">
                    <FormItem label='课程名称' {...formItemLayout}>
                        {getFieldDecorator('name', {
                            initialValue: '',
                            rules: [
                                {
                                    required: true,
                                    message: '请输入课程名称'
                                },
                            ],
                        })(
                            <Input placeholder="请输入课程名称" />
                        )}
                    </FormItem>
                    <FormItem label='课程方向' {...formItemLayout}>
                        {getFieldDecorator('courseDirectionId', {
                            initialValue: '',
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
                    </FormItem>
                    {
                        typeList && typeList.length > 0 && <FormItem ref='typeRef' label='课程类型' {...formItemLayout}>
                            {getFieldDecorator('courseClassificationId', {
                                initialValue: typeName || '',
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
                        </FormItem>
                    }


                    <Form.Item label="封面图" {...formItemLayout}>
                        {getFieldDecorator('fileImgName', {
                            initialValue: fileImgName || '',
                            rules: [
                                {
                                    required: true,
                                    message: "请上传封面图",
                                },
                            ],
                        })(
                            <Input readOnly style={{ width: '172px', marginRight: '10px' }} placeholder="封面图名称" />
                        )}<FileUpload {...this.uploaderProps1} pickerId="filePicker1" />


                    </Form.Item>

                    <Form.Item label="课程资料" {...formItemLayout}>
                        {getFieldDecorator('fileName', {
                            initialValue: fileName || '',
                            rules: [
                                {
                                    required: true,
                                    message: "请上传课程资料",
                                },
                            ],
                        })(
                            <Input readOnly style={{ width: '172px', marginRight: '10px' }} placeholder="课程资料名称" />
                        )}<FileUpload {...this.uploaderProps2} pickerId="filePicker2" />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default SourceModal
