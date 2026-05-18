import React, { Component } from 'react';
import { connect } from 'dva';
import { router } from 'utils'
import { Steps, Form, message, Spin, Menu, Button, Icon, Breadcrumb, Drawer, Modal } from 'antd';
import BasicInfoConfig from '../createMpw/components/basicInfoConfig';
import ProjectDetail from './components/ProjectDetail';
import AddFolderSvg from '../../../assets/add-folder.svg'
import recycleBinSvg from 'assets/recycleBin.svg'
import Page from '../../../components/Page/Page'
import Filter from './components/Filter';
import FilesList from './components/FilesList';
import FileUpload from './components/FileUpload';
import TreeModal from './components/TreeModal'
import RecycleFileList from './components/RecycleFileList';
import DownFileModal from './components/DownFileModal';

import styles from './style.less'
import { stringify } from 'qs'
import { isEqual, isEmpty } from 'lodash';
import debounce from 'lodash/debounce'


const { confirm } = Modal

const NEW_FOLDER_KEY = 'NEW_TEMP_KEY';         // 新建文件夹时，临时的key值
const ROOT_DIR = '/';                      // 文档结构根路径


const { Step } = Steps;

@Form.create()
@connect(({ app, mpw, loading }) => ({ app, mpw, loading }))
class MpwDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {},     // 查询条件
            data: this.props.mpw.list,
            createFolderBtnClicked: false,  // "新建文件夹"按钮是否点击,如果点击了,不可选择复选框,没有列表行悬浮事件等操作
            visible: false,  //右键目录框
            tableRightTipVisible: false, // 列表行，鼠标右键目录框
            drawerVisible: false,
            zipModalVisible: false,
            unZipModalVisible: false,
            unZipFile: {},
            single: false,        // 是否只操作单条数据，如移动、赋值等，通过点击列表中的操作菜单进入的
            isEmptyRecycle: false,  // 是否已经清空回收站

            buyResultMdlVisible: false,  //扩容窗口

            loading: false,
            current: '1',
            id: '',
            projectId: '',
            status: '',

        };
        this.root = React.createRef();
        this.uploader = React.createRef();
    }

    setStateValue = (field, value) => {
        this.setState({
            [`${field}`]: value
        })
    }

    componentWillUnmount() {
        const { dispatch } = this.props
        console.log('componentWillUnmount');
        dispatch({
            type: 'mpw/updateState',
            payload: {
                showReview: false,
                showSubmit: false,
                showUpdate: false,
                isDetail: false,
                showUpload: false,
                leftReadOnly: false,
                rightReadOnly: false,
                projectInfo:{},
            }
        })
    }


    componentDidMount() {
        const { location, dispatch, loading, mpw } = this.props;
        const { current } = this.state;
        const query = location.query;
        const id = query.id; //详情id
        const status = query.status;
        const projectId = query.projectId;
        console.log('projectId', projectId);
        this.setStateValue('id', id);//保存详情id
        this.setStateValue('status', status);//保存status，完成页面使用来判断显示内容
        this.setStateValue('projectId', projectId);
        if (query && query.op) {
            const op = query.op;
            if (isEqual(Number(op), 3)) { // 查看详情
                if (isEqual(Number(status), 1)) {
                    dispatch({
                        type: 'mpw/updateState',
                        payload: {
                            showReview: false,
                            showSubmit: false,
                            showUpdate: false,
                            isDetail: false,
                            showUpload: false,
                            leftReadOnly: true,
                            rightReadOnly: true,// 查看详情，仅仅是查看
                        }
                    })
                } else {
                    dispatch({
                        type: 'mpw/updateState',
                        payload: {
                            showReview: true,
                            showSubmit: false,
                            showUpdate: false,
                            isDetail: false,
                            showUpload: false,
                            leftReadOnly: true,
                            rightReadOnly: true,// 查看详情，仅仅是查看
                        }
                    })
                }

            } else if (isEqual(Number(op), 4)) { //修改
                dispatch({
                    type: 'mpw/updateState',
                    payload: {
                        showReview: true,
                        showSubmit: false,
                        showUpdate: true,
                        isDetail: false,
                        showUpload: false,
                        leftReadOnly: false,
                        rightReadOnly: true, // 修改，评审结果无法修改
                    }
                })
            }
        }


        if (id) {
            dispatch({
                type: 'mpw/getDemandInfoById',
                payload: {
                    demandId: id
                }
            }).then(response => {
                if (response && response.flag) {
                    let demandObj = response.resData
                    dispatch({
                        type: 'mpw/getFoundryList'
                    }).then(response => {
                        if (response && response.flag) {
                            let foundryList = response.resData
                            this.checkArray(foundryList, 'FoundryModel', demandObj, 'foundryModel')
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    demandObj,
                                },
                            })
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    foundryList,
                                },
                            })
                        } else {
                            message.config({
                                top: 100,
                                duration: 2,
                            });
                            // message.error(response.errMessage)
                        }
                    })



                    dispatch({
                        type: 'mpw/getProcessNodesList'
                    }).then(response => {
                        if (response && response.flag) {
                            let processNodesList = response.resData
                            this.checkArray(processNodesList, 'ProcessNodeModel', demandObj, 'processNodeModel')
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    demandObj,
                                },
                            })
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    processNodesList,
                                },
                            })

                        } else {
                            message.config({
                                top: 100,
                                duration: 2,
                            });
                            // message.error(response.errMessage)
                        }
                    })


                    dispatch({
                        type: 'mpw/getProcessTypeList'
                    }).then(response => {
                        if (response && response.flag) {
                            let processTypeList = response.resData
                            this.checkArray(processTypeList, 'ProcessTypeModel', demandObj, 'processTypeModel')
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    demandObj,
                                },
                            })
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    processTypeList: response.resData,
                                },
                            })

                        } else {
                            message.config({
                                top: 100,
                                duration: 2,
                            });
                            // // message.error(response.errMessage)
                        }
                    })


                    dispatch({
                        type: 'mpw/getProcessCharacteristicsList'
                    }).then(response => {
                        if (response && response.flag) {
                            let processCharacteristicsList = response.resData
                            this.checkArray(processCharacteristicsList, 'ProcessCharacterModel', demandObj, 'processCharacterModel')
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    demandObj,
                                },
                            })
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    processCharacteristicsList
                                },
                            })

                        } else {
                            message.config({
                                top: 100,
                                duration: 2,
                            });
                            // // // message.error(response.errMessage)
                        }
                    })


                    dispatch({
                        type: 'mpw/getPolyAndMetalList'
                    }).then(response => {
                        if (response && response.flag) {
                            let polyAndMetalList = response.resData
                            this.checkArray(polyAndMetalList, 'PloyMetalModel', demandObj, 'ployMetalModel')
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    demandObj,
                                },
                            })
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    polyAndMetalList
                                },
                            })

                        } else {
                            message.config({
                                top: 100,
                                duration: 2,
                            });
                            // // message.error(response.errMessage)
                        }
                    })

                    dispatch({
                        type: 'mpw/getTopMetalList'
                    }).then(response => {
                        if (response && response.flag) {
                            let topMetalList = response.resData
                            this.checkArray(topMetalList, 'TopMetalModel', demandObj, 'topMetalModel')
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    demandObj,
                                },
                            })
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    topMetalList,
                                },
                            })
                        } else {
                            message.config({
                                top: 100,
                                duration: 2,
                            });
                            // // message.error(response.errMessage)
                        }
                    })

                    dispatch({
                        type: 'mpw/getCapacitanceList'
                    }).then(response => {
                        if (response && response.flag) {
                            let capacitanceList = response.resData
                            this.checkArray(capacitanceList, 'CapacitanceModel', demandObj, 'capacitanceModel')
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    demandObj,
                                },
                            })
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    capacitanceList,
                                },
                            })
                        } else {
                            message.config({
                                top: 100,
                                duration: 2,
                            });
                            // // message.error(response.errMessage)
                        }
                    })


                    dispatch({
                        type: 'mpw/getResistanceList'
                    }).then(response => {
                        if (response && response.flag) {
                            let resistanceList = response.resData
                            this.checkArray(resistanceList, 'ResistanceModel', demandObj, 'resistanceModel')
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    demandObj,
                                },
                            })
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    resistanceList,
                                },
                            })
                        } else {
                            message.config({
                                top: 100,
                                duration: 2,
                            });
                            // // message.error(response.errMessage)
                        }
                    })


                    dispatch({
                        type: 'mpw/getCorevoltageList'
                    }).then(response => {
                        if (response && response.flag) {
                            let corevoltageList = response.resData
                            this.checkArray(corevoltageList, 'CoreVoltageModel', demandObj, 'coreVoltageModel')
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    demandObj,
                                },
                            })
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    corevoltageList,
                                },
                            })
                        } else {
                            message.config({
                                top: 100,
                                duration: 2,
                            });
                            // // message.error(response.errMessage)
                        }
                    })

                    dispatch({
                        type: 'mpw/getIovoltageList'
                    }).then(response => {
                        if (response && response.flag) {
                            let iovoltageList = response.resData
                            this.checkArray(iovoltageList, 'IoVoltageModel', demandObj, 'ioVoltageModel')
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    demandObj,
                                },
                            })
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    iovoltageList,
                                },
                            })
                        } else {
                            message.config({
                                top: 100,
                                duration: 2,
                            });
                            // message.error(response.errMessage)
                        }
                    })

                    dispatch({
                        type: 'mpw/getDesignPackageRequirementsList'
                    }).then(response => {
                        if (response && response.flag) {
                            let designPackageRequirementsList = response.resData
                            this.checkArray(designPackageRequirementsList, 'RequirementModel', demandObj, 'requirementModel')
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    demandObj,
                                },
                            })
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    designPackageRequirementsList,
                                },
                            })
                        } else {
                            message.config({
                                top: 100,
                                duration: 2,
                            });
                            // message.error(response.errMessage)
                        }
                    })

                    dispatch({
                        type: 'mpw/getTapeOutPlanList'
                    }).then(response => {
                        if (response && response.flag) {
                            let tapeOutPlanList = response.resData
                            this.checkArray(tapeOutPlanList, 'TapeOutPlanModel', demandObj, 'tapeOutPlanModel')
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    demandObj,
                                },
                            })
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    tapeOutPlanList,
                                },
                            })
                        } else {
                            message.config({
                                top: 100,
                                duration: 2,
                            });
                            // message.error(response.errMessage)
                        }
                    })

                    if (demandObj && demandObj.chipAreaModel && demandObj.chipAreaModel.optionName) {
                        let chipArea = demandObj.chipAreaModel.optionName;
                        let arra = chipArea.split(',');
                        if (arra && isEqual(arra.length, 2)) {
                            demandObj.chipAreaModel.left = arra[0];
                            demandObj.chipAreaModel.right = arra[1];
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    demandObj,
                                },
                            })
                        }
                    }
                } else {
                    message.config({
                        top: 100,
                        duration: 2,
                    });
                    // message.error(response.errMessage)
                }
            })
        }

        // 当current是2显示设计文件详情
        if (isEqual(Number(current), 2)) {
            // 添加右键点击、点击事件监听
            // document.addEventListener('contextmenu', this.handleContextMenu)
            document.addEventListener('click', this.handleClick)

            if (this.uploader.current) {
                this.uploader.current.setAttribute('webkitdirectory', '');
                // this.uploader.current.setAttribute('directory', '');
                this.uploader.current.setAttribute('multiple', '');
            }

            this.handleRefresh();
        }
    }


    componentDidUpdate(preProps) {
        const { list: old_list } = preProps.mpw;
        const { list } = this.props.mpw;
        if (list && !isEqual(old_list, list)) {
            this.setState({
                data: list
            })
        }
        const { isDataRefresh: old_isDataRefresh } = preProps.app;
        const { isDataRefresh } = this.props.app;
        if (isDataRefresh && !isEqual(isDataRefresh, old_isDataRefresh)) {

            this.handleRefresh();
        }
    }

    //关闭右侧回收站
    onClose = () => {
        const { dispatch } = this.props;
        const { projectId } = this.state
        this.setState({
            drawerVisible: false,
        });

        dispatch({
            type: 'mpw/checkStorage',
            payload: {
                projectId,
            },
        })
    };
    //点击回收站按钮
    handleRecycleBinClick = () => {
        const { dispatch } = this.props;
        const { projectId } = this.state;
        this.setState({
            drawerVisible: true,
        });
        dispatch({
            type: 'mpw/queryRecycleFileList',
            payload: {
                projectId
            }
        })
    }

    componentWillUnmount() {
        const { location, dispatch, loading, mpw } = this.props;
        dispatch({
            type: 'mpw/updateState',
            payload: {
                demandObj: {},
                projectInfo:{},
            },
        })


        // 移除事件监听
        document.removeEventListener('contextmenu', this.handleContextMenu)
        document.removeEventListener('click', this.handleClick)

    }

    // 右键菜单事件
    handleContextMenu = (event) => {
        event.preventDefault()

        // 如果正在新增文件夹，点击右键后，取消新增
        const { createFolderBtnClicked, data = [] } = this.state
        if (createFolderBtnClicked) {
            const newData = data.filter(item => item.key !== NEW_FOLDER_KEY);
            this.setState({
                data: newData,
            });
        }

        this.setState({
            createFolderBtnClicked: false,  // 如果此时正在新建，取消
            visible: true,                  // 显示右键目录框
            tableRightTipVisible: false     // 隐藏列表的右键目录框
        })

        // clientX/Y 获取到的是触发点相对于浏览器可视区域左上角距离
        const clickX = event.clientX
        const clickY = event.clientY
        // window.innerWidth/innerHeight 获取的是当前浏览器窗口的视口宽度/高度
        const screenW = window.innerWidth
        const screenH = window.innerHeight
        // 获取自定义菜单的宽度/高度
        const rootW = this.root.current.offsetWidth
        const rootH = this.root.current.offsetHeight

        // right为true，说明鼠标点击的位置到浏览器的右边界的宽度可以放下菜单。否则，菜单放到左边。
        // bottom为true，说明鼠标点击位置到浏览器的下边界的高度可以放下菜单。否则，菜单放到上边。
        const right = (screenW - clickX) > rootW
        const left = !right
        const bottom = (screenH - clickY) > rootH
        const top = !bottom

        if (right) {
            this.root.current.style.left = `${clickX}px`
        }

        if (left) {
            this.root.current.style.left = `${clickX - rootW}px`
        }

        if (bottom) {
            this.root.current.style.top = `${clickY}px`
        }
        if (top) {
            this.root.current.style.top = `${clickY - rootH}px`
        }
    };

    // 鼠标单击事件，当鼠标在任何地方单击时，设置菜单不显示
    handleClick = (e) => {
        const { dispatch, mpw, loading } = this.props
        const { id } = this.state
        const current = e.key
        this.setStateValue('current', current)
        if (isEqual(Number(current), 2)) {
            // const pathname = '/mpw/mpwDetail'
            // router.push({
            //     pathname
            // })
            this.handleRefresh()
        }

    }

    /**
   * 确认选项是不是其他
   * @param {*} arra 需求选择列表
   * @param {*} value 详情默认的值
   * @returns 
   */
    checkArray = (arra, objModel, obj, modelStr) => {
        let objStr = obj[`${modelStr}`]
        let objItem = arra && arra.length > 0 && objStr && arra.find(item => item.name === objStr.optionName);
        if (!objItem && arra && arra.length > 0 && objStr && objStr.optionName) {
            objStr.elseName = objStr.optionName
            objStr.optionName = arra[arra.length - 1].name
            this.setStateValue(objModel, true)
        }
    }

    get basicInfoProps() {
        const { form, mpw, loading, dispatch } = this.props;
        const { FoundryModel, //控制其他后面的输入框的显示隐藏
            ProcessNodeModel,
            ProcessTypeModel,
            ProcessCharacterModel,
            PloyMetalModel,
            TopMetalModel,
            CapacitanceModel,
            ResistanceModel,
            CoreVoltageModel,
            IoVoltageModel,
            RequirementModel,
            TapeOutPlanModel,
            id,
            result,

        } = this.state
        const { showUpdate, leftReadOnly, rightReadOnly } = mpw
        return {
            form,
            leftReadOnly,
            rightReadOnly,
            mpw,
            showUpdate,
            FoundryModel, //控制其他后面的输入框的显示隐藏
            ProcessNodeModel,
            ProcessTypeModel,
            ProcessCharacterModel,
            PloyMetalModel,
            TopMetalModel,
            CapacitanceModel,
            ResistanceModel,
            CoreVoltageModel,
            IoVoltageModel,
            RequirementModel,
            TapeOutPlanModel,
            id,
            result,
            // 我要流片-头部表单页面的样式
            basColProps: {
                xs: 24,
                sm: 12,
                xl: 6,
                md: 6,
            },

            basformItemLayout: {
                labelCol: {
                    xs: { span: 10 },
                    sm: { span: 10 },
                },
                wrapperCol: {
                    xs: { span: 14 },
                    sm: { span: 14 },
                }
            },
            // 中间部分表单的样式
            proColProps: {
                xs: 24,
                sm: 12,
                xl: 12,
                md: 8,
            },
            proformItemLayout: {
                labelCol: {
                    xs: { span: 6 },
                    sm: { span: 6 },
                },
                wrapperCol: {
                    xs: { span: 18 },
                    sm: { span: 18 },
                },
            },
            // 下面部分表单的样式
            neeColProps: {
                xs: 24,
                sm: 12,
                xl: 12,
                md: 8,
            },
            neeformItemLayout: {
                labelCol: {
                    xs: { span: 6 },
                    sm: { span: 6 },
                },
                wrapperCol: {
                    xs: { span: 18 },
                    sm: { span: 18 },
                },
            },
            reviewLayout: {
                labelCol: {
                    xs: { span: 8 },
                    sm: { span: 8 },
                },
                wrapperCol: {
                    xs: { span: 15 },
                    sm: { span: 15 },
                },
            },
            wloading: loading.effects['mpw/getDemandInfoById'] || loading.effects['mpw/getTapeOutPlanList'],
            onChange: (objName, value) => {
                this.setStateValue(objName, value)
            },
            onSubmit: (values, status, id) => {
                /**
                 * 1.第一次提交 status:'' id = 0  id为零可认为是第一次提交
                 * 2.第二次提交 status：0 id      id不为零，用户点击跳转的
                 * 3.评审通过 status：2   id      
                 * 4.评审不通过 status：3 id
                 * 5.退回修改 status：0   id      
                 * 
                 */
                if (showUpdate) { //评审
                    dispatch({
                        type: 'mpw/submitMpwDemand',
                        payload: {
                            ...values,
                            id,
                            status
                        }
                    }).then(response => {
                        if (response && response.flag) {
                            message.success('提交成功')
                            dispatch({
                                type: 'mpw/updateState',
                                payload: {
                                    demandObj: {},
                                    showReview: false,
                                    showSubmit: false,
                                    showUpdate: false,
                                },
                            })
                            const pathname = '/mpw';
                            router.push({
                                pathname,
                            })
                        } else {
                            message.config({
                                top: 100,
                                duration: 2,
                            });
                            message.error(response.errMessage)
                        }
                    })
                } else { //提交

                }

            },
            onReBackList: (res) => {
                if (isEqual(res, '1')) {
                    const pathname = '/mpw';
                    router.push({
                        pathname,
                    })
                } else {
                    const pathname = '/cusDemandManagement';
                    router.push({
                        pathname,
                    })
                }
            },
            onHandleUpload: (demandId) => {
                dispatch({
                    type: 'mpw/updateState',
                    payload: {
                        downModalVisible: true,
                    }
                })
                dispatch({
                    type: 'mpw/downloadReviewResult',
                    payload: {
                        demandId,
                    }
                })
            }
        }
    }


    get projectDetailProps() {
        const { mpw: { projectInfo }, loading,form } = this.props;

        return {
            form,
            formItemLayout: {
                labelCol: {
                    xs: { span: 6 },
                    sm: { span: 6 },
                },
                wrapperCol: {
                    xs: { span: 18 },
                    sm: { span: 18 },
                },
            },
            // 下面部分表单的样式
            ColProps: {
                xs: 24,
                sm: 12,
                xl: 12,
                md: 8,
            },
            loading: loading.effects['mpw/getProjectInfo'],
            projectInfo,
        }
    }

    //点击切换导航
    handleClick = (e) => {
        const { dispatch, mpw, loading } = this.props
        const { id } = this.state
        const current = e.key
        this.setStateValue('current', current)
        if (isEqual(Number(current), 2)) {
            this.handleRefresh()
        } else if (isEqual(Number(current), 3)) {

            dispatch({
                type: 'mpw/getProjectInfo',
                payload: {
                    demandId: id
                },
            })
        }

    }


    static getDerivedStateFromProps(nextProps, preState) {
        if (isEqual(nextProps.mpw.list, preState.data)) {
            return null;
        }

        return {
            data: preState.data,
        };
    }

    //点击删除按钮
    handleMultiDeleteClick = () => {
        const { dispatch, mpw } = this.props;
        const { selectedRowKeys, list } = mpw;
        const { projectId } = this.state
        const data = [];
        selectedRowKeys.map(key => {
            return list.map(item => {
                if (key === item.id) {
                    const newItem = {
                        id: item.id,
                        dir: item.dir
                    }
                    data.push(newItem);
                }
                return data;
            })
        })

        let that = this
        confirm({
            title: '确定删除所选文件/文件夹吗？',
            content: '删除的文件可在 2天 内通过回收站还原',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                dispatch({
                    type: 'mpw/deleteFileById',
                    payload: { data, projectId }
                }).then(() => {

                    that.handleQuery()
                })
            },
        })
    }


    handleDownloadClick = () => {
        const { dispatch, mpw } = this.props;
        const { selectedRowKeys, list } = mpw;
        const { projectId } = this.state

        const arr = [];
        let isIncludeFolders = false;
        selectedRowKeys.map(key => {
            return list.map(item => {
                if (key === item.id) {
                    if (item.dir && !item.canDownload) {
                        isIncludeFolders = true;
                    } else if (item.canDownload) {
                        arr.push(item.id);
                    }
                }
                return arr;
            })
        })

        let content = '';
        if (isIncludeFolders) {
            content = '选择的文件中包含文件夹，文件夹不能直接被下载，是否下载除文件夹以外的其他文件？'
        }

        confirm({
            title: '下载文件',
            content: content,
            okText: '确定',
            cancelText: '取消',
            onOk() {
                if (arr && arr.length > 0) {
                    // 点击下载按钮先，弹出提示框，表示正在下载
                    dispatch({
                        type: 'mpw/updateState',
                        payload: {
                            downModalVisible: true,
                        }
                    })
                    dispatch({
                        type: 'mpw/download',
                        payload: {
                            fileId: arr,
                            projectId,
                        }
                    })
                }
            },
        })
    }

    //执行刷新
    handleRefresh = () => {
        const { location, dispatch, mpw } = this.props
        const { projectId } = this.state
        const { currentPath } = mpw
        const payload = currentPath ? {
            currentPath: '/',
            projectId,
        } : { currentPath, projectId, };

        // const payload =  {
        //     currentPath: '/',
        //     projectId:id,
        // } 

        dispatch({
            type: 'mpw/query',
            payload: payload,
        })

        // const payload2 = isEmpty(location.query) ? {
        //     path: '/'
        // } : {
        //     path: location.query.currentPath
        // }
        dispatch({
            type: 'mpw/checkStorage',
            payload: {
                projectId
            },
        })
    }


    handleQuery = (path) => {
        const { dispatch, location, mpw: { currentPath } } = this.props
        const { query, pathname } = location
        const { formValues, projectId } = this.state;
        console.log('path', path);
        dispatch({
            type: 'mpw/query',
            payload: {
                ...formValues,
                projectId,
                currentPath: isEmpty(path) ? currentPath : path
            }
        })

        dispatch({
            type: 'mpw/checkStorage',
            payload: { projectId, },
        })

        router.push({
            pathname,
            search: stringify(
                {
                    ...query,
                    currentPath: isEmpty(path) ? currentPath : path
                },
                { arrayFormat: 'repeat' }
            ),
        })
    }

    cdForder = (key) => {
        let path = key;
        if (key.length > 2) {
            path = key.slice(0, key.length - 1);
        }
        this.handleQuery(path)
    }

    get filterProps() {
        const { formValues, projectId } = this.state
        const { location, dispatch, mpw } = this.props
        const { storage, isShowText, currentPath } = mpw

        return {
            storage,
            isShowText,
            currentPath,
            projectId,
            filter: {

                ...formValues,
            },
            setFormValues: values => {
                this.setStateValue('formValues', values)
            },
            onSearch: values => {
                dispatch({
                    type: 'mpw/query',
                    payload: values
                })
            },
        }
    }


    handleAddClick = e => {
        e.preventDefault();

        const { dispatch } = this.props
        const { data = [] } = this.state

        this.setState({ createFolderBtnClicked: true })

        const newItems = data.filter(item => item.isNew === true)
        if (newItems.length > 0) {  // 控制每次只能添加一个,新增的时候focus到当前的新增项上
            // this.textInput.current.focus();
        } else {
            const newData = data.map(item => ({ ...item }));
            newData.unshift({
                key: NEW_FOLDER_KEY,
                fileName: '新建文件夹',
                isNew: true,
                dir: true
            });
            this.setState({
                data: newData,
            });

            // 新建文件夹时，取消选中列表数据，阻止其他操作，例如移动、复制等
            dispatch({
                type: 'mpw/updateState',
                payload: {
                    selectedRowKeys: [],
                },
            })
        }
    }

    //清空回收站
    onEmptyClick = () => {
        const { dispatch } = this.props;
        const { projectId } = this.state
        confirm({
            title: '确认清空回收站？',
            content: '清空后文件将无法恢复',
            onOk: () => {
                dispatch({
                    type: 'mpw/emptyRecycle',
                    payload: {
                        projectId
                    }
                }).then(response => {
                    if (response && response.flag) {
                        message.config({
                            top: 100,
                            duration: 2,
                        });
                        message.success('清空完成！')

                        dispatch({
                            type: 'mpw/queryRecycleFileList',
                            payload: {
                                // currentPath: '/',
                                projectId
                            }
                        })

                        this.setState({ isEmptyRecycle: true });
                    } else {
                        message.config({
                            top: 100,
                            duration: 2,
                        });
                        message.error(response.errMessage)
                    }
                })
            },
        });
    }

    get filesListProps() {
        const { dispatch, mpw, loading } = this.props
        const { list, selectedRowKeys, currentPath } = mpw
        const { data, createFolderBtnClicked, tableRightTipVisible, projectId } = this.state

        return {
            projectId,
            selectedRowKeys,
            createFolderBtnClicked,
            dataSource: data,
            pagination: false,
            loading: loading.effects['mpw/query'] || loading.effects['mpw/addFolder'],
            newFolderKey: NEW_FOLDER_KEY,
            tableRightTipVisible,
            onFolderClick: (folderPath) => {
                if (folderPath === '') {
                    folderPath = "/"
                }
                this.handleQuery(folderPath)
            },
            onSetState: (field, value) => {
                console.log(field, value);
                this.setStateValue(field, value)
            },
            onAddFolder: values => {
                dispatch({
                    type: 'mpw/addFolder',
                    payload: {
                        currentPath,
                        projectId,
                        ...values
                    },
                }).then((response) => {
                    if (response && response.flag) {
                        message.success("添加成功")
                        dispatch({
                            type: 'mpw/query',
                            payload: {
                                currentPath,
                                projectId,
                            }
                        })

                    } else {
                        message.config({
                            top: 100,
                            duration: 2,
                        });
                        dispatch({
                            type: 'mpw/query',
                            payload: {
                                currentPath,
                                projectId,
                            }
                        })
                        message.error(response.errMessage)
                    }
                    this.setState({ createFolderBtnClicked: false })

                })
            },
            onDeleteItem: (data) => {
                dispatch({
                    type: 'mpw/deleteFileById',
                    payload: {
                        data,
                        projectId
                    },
                }).then(() => {
                    this.handleQuery()
                })
            },
            onMoveItem: (item) => {
                dispatch({
                    type: 'mpw/showTreeModal',
                    payload: {
                        treeModalType: 'move',
                        currentItem: item,
                    },
                })

                this.setState({ single: true });
            },
            rowSelection: {
                selectedRowKeys,
                onChange: (keys, records) => {
                    dispatch({
                        type: 'mpw/updateState',
                        payload: {
                            selectedRowKeys: keys,
                        },
                    })
                },
                getCheckboxProps: (record) => ({ disabled: createFolderBtnClicked || record.status === 1 })
            },
            onShowFile: values => {
                dispatch({
                    type: 'app/getFileContent',
                    payload: {
                        fileId: values.id,
                    }
                }).then(() => {
                    dispatch({
                        type: 'app/showFileEditorModal',
                        payload: {
                            editorModalType: 'edit',
                            fileName: values.fileName,
                            fileId: values.id
                        }
                    })
                })
            },
            onDownloadFile: value => {
                dispatch({
                    type: 'mpw/updateState',
                    payload: {
                        downModalVisible: true,
                    }
                })
                dispatch({
                    type: 'mpw/download',
                    payload: {
                        projectId,
                        ...value
                    }
                })
            },
            // onUnZip: (values, key) => {
            //     values.filePath = currentPath;
            //     const arr = [];
            //     arr.push(values);

            //     let unzipPath = undefined;
            //     if (isEqual(key, 'unzipToZipName')) {
            //         unzipPath = ''
            //     } else if (isEqual(key, 'unzipToCurrent')) {
            //         unzipPath = currentPath;
            //     }

            //     dispatch({
            //         type: 'mpw/unZipFile', //文件解压
            //         payload: {
            //             unzipPath,
            //             file: arr
            //         }
            //     }).then(() => {
            //         this.handleRefresh();
            //     })
            // },
            // onUnZipToCustom: data => {
            //     const values = data.file;
            //     values.filePath = currentPath;
            //     const arr = [];
            //     arr.push(values);
            //     const unzipPath = currentPath + '/' + data.zipName;

            //     this.setState({
            //         unZipFile: {
            //             unzipPath,
            //             file: arr
            //         },
            //         unZipModalVisible: true
            //     });
            // },
        }
    }

    // 上传文件
    get uploaderProps() {
        const { dispatch, mpw, loading, app } = this.props
        const { currentPath } = mpw
        const { fileList } = app
        const { projectId } = this.state

        return {
            dispatch,
            projectId,
            beforeFileQueued: (file) => {
                console.log('beforeFileQueued');
                // if (file.size === 0) {
                //   Modal.error({
                //     title: '不能上传空文件',
                //   });
                //   return false;
                // }
                // return true;
            },
            fileList,
            uploadUrl: '/service/zkxy-mpw/mpw/chipproject/uploadBigFile',
            rootPath: currentPath,
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
                dispatch({
                    type: 'app/updateState',
                    payload: {
                        fileList: value
                    },
                })
            },
            refreshList: () => {
                this.handleQuery();
            }
        }
    }

    get recycleProps() {
        const { dispatch, mpw, loading } = this.props;
        const { recycleFileList } = mpw;
        const { isEmptyRecycle, projectId } = this.state;


        return {
            dataSource: recycleFileList,
            isEmptyRecycle,
            loading: loading.effects['mpw/queryRecycleFileList'],
            onResumeItem: data => { // 还原
                dispatch({
                    type: 'mpw/resume',
                    payload: {
                        data,
                        projectId
                    },
                }).then(() => {
                    dispatch({
                        type: 'mpw/queryRecycleFileList',
                        payload: {
                            projectId
                        }
                    })

                    this.handleQuery();
                })
            },
            onDeleteItem: debounce(values => { // 彻底删除
                console.log(values);
                dispatch({
                    type: 'mpw/deleteRecycleById',
                    payload: {
                        values,
                        projectId
                    },
                }).then((response) => {
                    if (response && response.flag) {
                        dispatch({
                            type: 'mpw/queryRecycleFileList',
                            payload: {
                                projectId
                            }
                        })
                        dispatch({
                            type: 'mpw/updateState',
                            payload: {
                                selectedRowKeys: [],
                            },
                        })
                        message.config({
                            top: 100,
                            duration: 2,
                        });
                        message.success('删除成功！')
                    } else {
                        message.config({
                            top: 100,
                            duration: 2,
                        });
                        message.error(response.errMessage)
                    }

                })
            }, 1000),
            resetEmptyRecycleState: () => {
                this.setState({ isEmptyRecycle: false });
            }
        }
    }


    onMoveOrCopyClick = (e, treeModalType) => {
        const { dispatch, mpw } = this.props
        const { currentSelectFolder, selectedRowKeys, list, currentPath, currentItem } = mpw
        const { single, projectId } = this.state;

        if (isEqual(treeModalType, 'move')) { // 移动
            const arr = [];
            if (single) {
                const newItem = {
                    fileName: currentItem.dir ? currentItem.pathName : currentItem.fileName,
                    id: currentItem.id,
                    isDir: Number(currentItem.dir),
                    filePath: currentItem.path 
                    // filePath: currentPath                     // 需要移动的文件/文件夹的当前地址
                }
                arr.push(newItem);
            } else {
                selectedRowKeys.map(key => {
                    return list.map(item => {
                        if (key === item.id) {
                            const newItem = {
                                fileName: item.dir ? item.pathName : item.fileName,
                                id: item.id,
                                isDir: item.dir,
                                filePath: item.path 
                                // filePath: currentPath                     // 需要移动的文件/文件夹的当前地址
                            }

                            // 目标文件夹ID
                            arr.push(newItem)     // 目标文件夹ID);
                        }
                        return arr;
                    })
                })
            }


            // 移动数据
            dispatch({
                type: 'mpw/moveFiles',
                payload: {
                    fileId: arr,
                    copyPath: currentSelectFolder.key,  // 目标文件夹地址
                    copyPathId: currentSelectFolder.id,
                    projectId
                },
            }).then(() => {
                this.handleQuery();
            })
        } else if (isEqual(treeModalType, 'copy')) { // 复制

            const arr = [];
            if (single) {
                const newItem = {
                    fileName: currentItem.dir ? currentItem.pathName : currentItem.fileName,
                    id: currentItem.id,
                    isDir: currentItem.dir,
                    filePath: currentPath                     // 需要复制的文件/文件夹的当前路径
                }
                arr.push(newItem);
            } else {
                selectedRowKeys.map(key => {
                    return list.map(item => {
                        if (key === item.id) {
                            const newItem = {
                                fileName: item.dir ? item.pathName : item.fileName,
                                id: item.id,
                                isDir: item.dir,
                                filePath: currentPath                     // 需要复制的文件/文件夹的当前路径
                            }
                            arr.push(newItem);
                        }
                        return arr;
                    })
                })
            }

            // 复制数据
            dispatch({
                type: 'mpw/copyFiles',
                payload: {
                    fileList: arr,
                    copyPath: currentSelectFolder.key,  // 目标文件夹地址
                    copyPathId: currentSelectFolder.id,
                    projectId
                },
            }).then(() => {
                this.handleQuery();
                this.setState({ single: false })
            })

        }
    }

    handleCancelClick = () => {
        const { dispatch } = this.props
        dispatch({
            type: 'mpw/hideTreeModal',
            payload: {},
        })

        dispatch({
            type: 'mpw/updateState',
            payload: {
                currentSelectFolder: {}
            },
        })
    }
    handleDownClick = () => {
        dispatch({
            type: 'mpw/updateState',
            payload: {
                downModalVisible: false,
            }
        })
    }
    get downModalProps() {
        const { mpw: { downModalVisible }, dispatch } = this.props
        return {
            visible: downModalVisible,
            destroyOnClose: true,
            maskClosable: false,  //点击蒙层是否允许关闭，默认 true
            title: '下载文件',
            footer: null,
            centered: true,

            onCancel: () => {
                dispatch({
                    type: 'mpw/updateState',
                    payload: {
                        downModalVisible: false,
                    },
                })
            }
        }
    }

    get treeModalProps() {
        const { dispatch, mpw } = this.props;
        const { treeModalType, treeModalVisible, selectedRowKeys, folderList } = mpw;
        const { projectId } = this.state
        return {
            rootKey: ROOT_DIR,
            folderList,
            visible: treeModalVisible,
            destroyOnClose: true,
            maskClosable: false,  //点击蒙层是否允许关闭，默认 true
            title: treeModalType === 'move' ? '移动到' : '复制到',
            centered: true,
            footer:
                [
                    // <Button key="new" style={{ float: 'left', color: '#40a9ff', borderColor: '#40a9ff' }} onClick={this.handleModalCreateFolder}>
                    //   <Icon component={AddFolderSvg} />新建文件夹
                    //           </Button>,
                    <Button key="cancel" onClick={this.handleCancelClick}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary" onClick={e => this.onMoveOrCopyClick(e, treeModalType)}>
                        确定
                    </Button>,
                ],
            onCancel: () => {
                dispatch({
                    type: 'mpw/hideTreeModal',
                    payload: {},
                })

                this.setState({ single: false })
            },
            onLoadFolderList: value => {
                dispatch({
                    type: 'mpw/queryFolderList',
                    payload: {
                        currentPath: value,
                        listDir: true,
                        projectId
                    },
                })
            },
            onSelectFolder: value => {
                dispatch({
                    type: 'mpw/updateState',
                    payload: {
                        currentSelectFolder: value
                    },
                })
            }
        }
    }


    openTreeModal = (type) => {
        const { dispatch } = this.props
        const { projectId } = this.state

        dispatch({
            type: 'mpw/queryFolderList',
            payload: {
                currentPath: ROOT_DIR,
                projectId,
                listDir: true
            },
        }).then(() => {
            dispatch({
                type: 'mpw/showTreeModal',
                payload: {
                    treeModalType: type,
                },
            })
        })
    }

    handleMoveClick = () => {
        this.openTreeModal('move')
    }

    handleCopyClick = () => {
        this.openTreeModal('copy')
    }


    // 文件验证
    handleVerifyClick = () => {
        const { mpw: { selectedRowKeys, list }, loading } = this.props;
        const data = [];
        selectedRowKeys.map(key => {
            return list.map(item => {
                if (key === item.id) {
                    data.push(item.id);
                }
                return data;
            })
        })
        // 首先文件数量必须是两个2个
        if (data && data.length !== 2) {
            message.warn('验证文件数量不能多余两个')
            return
        }
        this.onVerifyClick(data)
    }

    onVerifyClick = (data) => {

        const { dispatch } = this.props
        const { projectId } = this.state



        dispatch({
            type: 'mpw/verifyFiles',
            payload: {
                projectId,
                data
            },
        }).then(() => {
            this.handleQuery()
        })
    }


    render() {
        const { mpw: { selectedRowKeys, list, currentPath, operateAuth }, loading } = this.props;
        const { current, visible, drawerVisible, status } = this.state

        const recycleTitle = (
            <p style={{ marginBottom: 0 }}>
                <span>数据回收站</span>
                <Button type="primary" style={{ float: 'right' }} onClick={this.onEmptyClick}>
                    <Icon style={{ fontSize: '18px', verticalAlign: '-0.225em' }} component={recycleBinSvg} />
                    清空回收站
                </Button>
            </p>
        )

        return (
            <Page inner>
                <div className={styles.pageContainer}>
                    <Menu
                        onClick={this.handleClick}
                        style={{ width: 256, }}
                        defaultSelectedKeys={current}
                        selectedKeys={[current]}
                        mode={'inline'}
                    >
                        <Menu.Item key={'1'}>需求详情</Menu.Item>

                        {Number(status) > 3 ? <Menu.Item key={'2'}>设计文件</Menu.Item> : null}
                        {Number(status) > 3 ? <Menu.Item key={'3'}>项目详情</Menu.Item> : null}

                    </Menu>
                    <div style={{ width: '100%' }} className={styles.rightContainer}>
                        {
                            current && isEqual(current, '1') &&
                            <Spin spinning={this.state.loading} delay={50}>
                                <BasicInfoConfig  {...this.basicInfoProps} />
                            </Spin>
                        }
                        {

                            current && isEqual(current, '2') &&
                            <>
                                <div className={styles.tableList}>
                                    <div className={styles.tableListForm}>
                                        <Filter {...this.filterProps} />
                                    </div>
                                    <div className={styles.tableListOperator}>
                                        {operateAuth.canUpload ?
                                            <>
                                                <FileUpload {...this.uploaderProps} pickerId="filePicker" />
                                                <FileUpload {...this.uploaderProps} pickerId="folderPicker" isDirectory={true} />
                                                <Button className={styles.blueBtn} style={{ marginRight: '16px', marginLeft: '16px' }} onClick={this.handleAddClick}>
                                                    <Icon component={AddFolderSvg} />新建文件夹
                                                </Button>
                                            </> : null


                                        }





                                        {selectedRowKeys.length > 0 && (

                                            <>{operateAuth.canUpload ?
                                                <Button type='primary' onClick={this.handleVerifyClick} style={{ marginRight: '16px', marginLeft: '16px' }}>验证文件</Button> : null
                                            }


                                                <Button.Group>
                                                    {/* {operateAuth && operateAuth.canZip &&
        <Button className={styles.blueBtn} onClick={this.handleZipClick}>压缩到</Button>
    } */}
                                                    {operateAuth && operateAuth.canMove &&
                                                        <Button className={styles.blueBtn} onClick={this.handleMoveClick}>移动到</Button>
                                                    }
                                                    {operateAuth && operateAuth.canCopy &&
                                                        <Button className={styles.blueBtn} onClick={this.handleCopyClick}>复制到</Button>
                                                    }
                                                    {operateAuth && operateAuth.canDownload &&
                                                        <Button className={styles.blueBtn} onClick={this.handleDownloadClick} icon="download">下载</Button>
                                                    }
                                                    {operateAuth && operateAuth.canDeleted &&
                                                        <Button className={styles.blueBtn} icon="delete" onClick={this.handleMultiDeleteClick}>删除</Button>
                                                    }
                                                </Button.Group>

                                            </>

                                        )}
                                        < Button style={{ marginBottom: '15px', float: 'right' }} type="danger" onClick={this.handleRecycleBinClick}>
                                            <Icon style={{ fontSize: '18px', verticalAlign: '-0.225em' }} component={recycleBinSvg} />
                                            回收站
                                        </Button>
                                    </div>
                                    <div className={styles.tableBreadcrumb}>
                                        <div className={styles.breadcrumbLine}>
                                            <Breadcrumb separator="/">
                                                <Breadcrumb.Item><a href="#" onClick={(ev) => this.cdForder('/')}>全部文件</a></Breadcrumb.Item>
                                                {currentPath && currentPath.split('/').map((ele, index) => {
                                                    let stage = currentPath.split("/");
                                                    let key = stage.slice(0, index + 1);
                                                    key = key.join("/");
                                                    key = key.slice(-1) === '/' || isEmpty(key) ? key : key + '/';

                                                    if (key === '/' || isEmpty(key))
                                                        return null;

                                                    if (index === stage.length - 1) {
                                                        return <Breadcrumb.Item key={key}>{ele}</Breadcrumb.Item>
                                                    }

                                                    return <Breadcrumb.Item key={key}><a href="#" onClick={(ev) => this.cdForder(key)}>{ele}</a></Breadcrumb.Item>
                                                })}
                                            </Breadcrumb>
                                        </div>
                                        <div className={styles.text}> 当前位置共{list && list.length ? list.length : 0}个内容 </div>
                                    </div>
                                    <FilesList {...this.filesListProps} />
                                </div>


                                <TreeModal {...this.treeModalProps} />

                                <Drawer
                                    title={recycleTitle}
                                    // title='测试'
                                    placement="right"
                                    closable={false}
                                    onClose={this.onClose}
                                    visible={drawerVisible}
                                    getContainer={false}
                                    width={650}
                                    style={{ position: 'absolute' }}
                                >
                                    <p>提示：回收站文件保存2天后将被自动清除。</p>
                                    <RecycleFileList {...this.recycleProps} />
                                </Drawer>

                                {/* 下载时，可能会出现文件过大响应不及时的问题，出现提示框 */}
                                <DownFileModal {...this.downModalProps} />
                            </>

                        }
                        {
                            current && isEqual(current, '3') &&
                            <Spin spinning={this.state.loading} delay={50}>
                                <ProjectDetail {...this.projectDetailProps} />
                            </Spin>
                        }

                    </div>

                </div>




            </Page>
        )
    }
}

export default MpwDetail;
