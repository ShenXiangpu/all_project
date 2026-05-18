import React, { Component } from 'react';
import { connect } from 'dva';
import { router } from 'utils'
import { Steps, Form, message, Modal } from 'antd';
import Page from '../../../components/Page/Page'
import BasicInfoConfig from './components/basicInfoConfig';
import ReviewConfig from "./components/reviewConfig";
import FinishConfig from './components/finishConfig';
import debounce from 'lodash/debounce';
import { isEmpty, isEqual } from 'lodash';
import store from 'store';
import styles from './index.less'

const { Step } = Steps;

const ColProps = {
  xs: 24,
  sm: 12,
  xl: 12,
  md: 8,
  // style: {
  //   marginBottom: 16,
  // },
}





const formItemLayout = {
  labelCol: {
    xs: { span: 3 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 18 },
    sm: { span: 18 },
  },
};


@Form.create()
@connect(({ app, mpw, loading }) => ({ app, mpw, loading }))
class CreateMpw extends Component {
  state = {
    FoundryModel: false, //控制其他后面的输入框的显示隐藏
    ProcessNodeModel: false,
    ProcessTypeModel: false,
    ProcessCharacterModel: false,
    PloyMetalModel: false,
    TopMetalModel: false,
    CapacitanceModel: false,
    ResistanceModel: false,
    CoreVoltageModel: false,
    IoVoltageModel: false,
    RequirementModel: false,
    TapeOutPlanModel: false,
    id: 0,
    result: "0",//显示form，1显示提交完成页面，2显示评审完成页面 
    currentStep: 0,
    status: '',
    projectId: '',
    op: '',
    formItemLayout: {
      labelCol: {
        xs: { span: 3 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 18 },
      },
    },
    ColProps: {
      xs: 24,
      sm: 12,
      xl: 12,
      md: 8,
      // style: {
      //   marginBottom: 16,
      // },
    }





  }

  componentDidMount() {
    const { location, dispatch, loading, mpw } = this.props;
    const query = location.query;
    const id = query.id; //详情id
    const status = query.status;
    const projectId = query.projectId;//项目id
    const op = query.op
    this.setStateValue('id', id);//保存详情id
    this.setStateValue('status', status);//保存status，完成页面使用来判断显示内容
    this.setStateValue('projectId', projectId);
    this.setStateValue('op', op);

    //根据status 判断显示步骤
    if (status && (
      isEqual(status, '1') ||// 提交流片需求，等待审核
      isEqual(status, '0') || //被退回修改
      isEqual(status, '2') || //评审通过
      isEqual(status, '4') || //已生成项目
      isEqual(status, '5') || //验证中
      isEqual(status, '6')
    )
    ) {
      this.setStateValue('currentStep', Number(1));
    } else if (
      status && (
        isEqual(status, '7') ||
        isEqual(status, '3') //评审不通过，需求结束
      )

    ) {
      //统一显示第三步
      this.setStateValue('currentStep', Number(2));
    }

    /**
     * 使用status和op来控制按钮
     * 进入流片页面有四大类 op=2 
     * 一、我要流片或者新建，这时只有提交和取消一组按钮 
     *  1.有提交和取消，无评审
     * 二、查看详情 op=3
     *  1.根据状态分为是否已经提交评审了，评审中，无按钮和评审意见
     *  其他状态都可以下载评审意见和显示评审意见
     * 三、修改 op=4
     *  1.修改有修改和取消按钮
     * 
     * 四、评审时有评审栏和评审按钮 op=1
     * 
     * 
     */

    if (query && query.op) {
      const op = query.op;
      if (isEqual(op, '1')) { //评审
        dispatch({
          type: 'mpw/updateState',
          payload: {
            showReview: true,
            isDetail: true,
            showSubmit: false,
            showUpdate: false,
            showUpload: false,
            leftReadOnly:false,
            rightReadOnly:false
          }
        })
        this.setStateValue('currentStep', Number(1));
      } else if (isEqual(op, '2')) { //编辑
        dispatch({
          type: 'mpw/updateState',
          payload: {
            showReview: false,
            showSubmit: true,
            showUpdate: false,
            showUpload: false,
            isDetail: false,
            leftReadOnly:false,
            rightReadOnly:false
          }
        })
        this.setStateValue('currentStep', Number(0));
      } else if (isEqual(op, '3')) { // 查看详情
        if (isEqual(status, 1)) { //待
          // dispatch({
          //   type: 'mpw/updateState',
          //   payload: {
          //     showReview: true,
          //     showSubmit: false,
          //     showUpdate: false,
          //     isDetail: false
          //   }
          // })
        } else {

        }

        dispatch({
          type: 'mpw/updateState',
          payload: {
            showReview: false,
            showSubmit: false,
            showUpdate: true,
            showUpload: true,
            isDetail: false,
            leftReadOnly:true,
            rightReadOnly:true
          }
        })

      } else if (isEqual(op, '4')) { // 修改按钮显示
        dispatch({
          type: 'mpw/updateState',
          payload: {
            showReview: false,
            showSubmit: false,
            showUpdate: true,
            showUpload: false,
            isDetail: false,
            leftReadOnly:false,
            rightReadOnly:false
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
    } else {
      dispatch({
        type: 'mpw/getFoundryList'
      }).then(response => {
        if (response && response.flag) {
          let foundryList = response.resData
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
          dispatch({
            type: 'mpw/updateState',
            payload: {
              processTypeList
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
        type: 'mpw/getProcessCharacteristicsList'
      }).then(response => {
        if (response && response.flag) {
          let processCharacteristicsList = response.resData
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
          // message.error(response.errMessage)
        }
      })


      dispatch({
        type: 'mpw/getPolyAndMetalList'
      }).then(response => {
        if (response && response.flag) {
          let polyAndMetalList = response.resData

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
          // message.error(response.errMessage)
        }
      })

      dispatch({
        type: 'mpw/getTopMetalList'
      }).then(response => {
        if (response && response.flag) {
          let topMetalList = response.resData
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
          // message.error(response.errMessage)
        }
      })

      dispatch({
        type: 'mpw/getCapacitanceList'
      }).then(response => {
        if (response && response.flag) {
          let capacitanceList = response.resData
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
          // message.error(response.errMessage)
        }
      })


      dispatch({
        type: 'mpw/getResistanceList'
      }).then(response => {
        if (response && response.flag) {
          let resistanceList = response.resData
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
          // message.error(response.errMessage)
        }
      })


      dispatch({
        type: 'mpw/getCorevoltageList'
      }).then(response => {
        if (response && response.flag) {
          let corevoltageList = response.resData
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
          // message.error(response.errMessage)
        }
      })

      dispatch({
        type: 'mpw/getIovoltageList'
      }).then(response => {
        if (response && response.flag) {
          let iovoltageList = response.resData
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
    }
  }


  componentWillUnmount() {
    const { location, dispatch, loading, mpw } = this.props;
    dispatch({
      type: 'mpw/updateState',
      payload: {
        demandObj: {},
      },
    })

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

  setStateValue = (field, value) => {
    console.log(field);
    this.setState({
      [`${field}`]: value
    })
  }


  get basicInfoProps() {
    const { form, mpw, loading, dispatch, } = this.props;
    const { showReview,    leftReadOnly, rightReadOnly, } = mpw
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
      status,
      projectId,
      op
    } = this.state
    return {
      form,
      mpw,
      leftReadOnly,
      rightReadOnly,
      wloading: loading.effects['mpw/getDemandInfoById'] || loading.effects['mpw/getTapeOutPlanList'],
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
      status,
      projectId,
      op,
      result,
      // 我要流片-头部表单页面的样式
      basColProps: {
        xs: 24,
        sm: 12,
        xl: 6,
        md: 8,
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
          xs: { span: 6 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 15 },
          sm: { span: 15 },
        },
      },


      loading: loading.effects['mpw/getIovoltageList'],
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
        if (showReview) { //评审
          dispatch({
            type: 'mpw/reviewMpwDemand',
            payload: {
              ...values,
              id,
              status
            }
          }).then(response => {
            if (response && response.flag) {
              message.success('评审完成')
              dispatch({
                type: 'mpw/updateState',
                payload: {
                  demandObj: {},
                  showReview: false,
                  showSubmit: false,
                  showUpdate: false
                },
              })
              this.setStateValue('currentStep', 1)
              const pathname = `/cusDemandManagement`
              router.push(
                pathname
              )
            } else {
              message.config({
                top: 100,
                duration: 2,
              });
              message.error(response.errMessage)
            }
          })
        } else { //提交
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
              this.setStateValue('currentStep', 1)
              const pathname = `/cusDemandManagement`
              router.push(
                pathname
              )
            } else {
              message.config({
                top: 100,
                duration: 2,
              });
              message.error(response.errMessage)
            }
          })
        }

      },
      onReBackList: (res) => {
        if (isEqual(res, '1')) {
          const pathname = '/cusDemandManagement';
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
    }
  }

  get reviewProps() {
    const { form, mpw } = this.props;
    const { id, status, op, projectId } = this.state;
    return {
      form,
      mpw,
      id,
      status,
      op,
      projectId,
      onWatchDetailById: () => {
        let pathname = `/cusDemandManagement/mpwDetail?id=${id}&op=3&status=${status}&projectId=${projectId}`

        if(!projectId){
          pathname = `/cusDemandManagement/mpwDetail?id=${id}&op=3&status=${status}`
        }
        router.push(
          pathname
        )

      }
    }
  }

  //第三步
  get finishProps() {
    const { form, mpw } = this.props;
    const { id, status, op, projectId } = this.state;
    return {
      form,
      mpw,
      id,
      status,
      op,
      projectId,
      onWatchDetailById: () => {
        const pathname = `/cusDemandManagement/mpwDetail?id=${id}&op=3&status=${status}&projectId=${projectId}`
        router.push(
          pathname
        )

      }
    }

  }

  get firstTitleProps() {
    return (
      <div>
        <div>流片设计需求</div>
        <div>流片技术服务需求登记</div>
      </div>
    )

  }
  get secondTitleProps() {
    return (
      <div>
        <div>评审</div>
        <div>根据行业经验和专业知识进行评审</div>
      </div>
    )

  }


  render() {
    const { currentStep } = this.state
    const { location } = this.props
    const { query } = location
    return (
      <Page>
        <Steps size="small" current={currentStep}>
          <Step status={isEqual(currentStep, 0) ? "process" : "finish"} title={this.firstTitleProps} />
          <Step status={currentStep < 1 ? "wait" : (isEqual(currentStep, 1) ? "process" : "finish")} title={this.secondTitleProps} />
          <Step status={currentStep < 2 ? "wait" : (isEqual(currentStep, 2) ? "process" : "finish")} title="完成" />
        </Steps>
        {isEqual(currentStep, 0) && <BasicInfoConfig {...this.basicInfoProps} />}
        {isEqual(currentStep, 1) && query && query.op && isEqual(query.op, '1') ? <BasicInfoConfig {...this.basicInfoProps} /> : <ReviewConfig {...this.reviewProps} />}
        {isEqual(currentStep, 2) && <FinishConfig {...this.finishProps} />}
      </Page>
    )
  }
}

export default CreateMpw;
