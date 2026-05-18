import React, { Component } from 'react';
import { connect } from 'dva';
import { router } from 'utils'
import { Steps, Form, message, Modal } from 'antd';
import BasicConfig from './components/BasicConfig';
import NetworkConfig from "./components/NetworkConfig";
import SystemConfig from './components/SystemConfig';
import ReviewConfig from './components/ReviewConfig';
import debounce from 'lodash/debounce';
import Bottom from './components/Bottom';
import { isEmpty, isEqual } from 'lodash';
import store from 'store';

const { Step } = Steps;

@Form.create()
@connect(({ app, vm, loading }) => ({ app, vm, loading }))
class CreateVm extends Component {
  state = {
    vmTools: [],               // 第一步：选中的“工具”
    instanceConfig: {},        // 第一步：选中的实例配置
    retentionDays: 30,         // 第一步：快照保留时间，默认30天
    instanceFilterParams: {    // 第一步：实例过滤条件
      status: 1
    },
    vmInfo: {},                // 创建VM，提交的参数
    currentItem: {},           // 创建时页面输入的值，便于回退赋值
    periodKey: undefined,      // 选中的购买时长
    isEnterpriseAdmin: false,  // 是否为企业管理员
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'vm/getToolList',
    }).then(() => {
      // 获取VM分类列表，包括机型、CPU、内存
      dispatch({
        type: 'vm/getVmTypes',
        payload: {}
      })

      // 获取规格
      dispatch({
        type: 'vm/getVmStandardList',
        payload: { status: 1 }
      })

      // 获取网络规格
      dispatch({
        type: 'vm/getNetworkList',
        payload: {}
      })
    })

    // 获取购买年限列表
    dispatch({
      type: 'vm/getRebateList',
    })

    // 获取权限内可见用户列表
    const currentUser = store.get('user') || {};
    const userInfo = currentUser && currentUser.userInfo;
    const isCompanyUser = userInfo && userInfo.companyId;
    const userRoles = userInfo && userInfo.userRoles;
    const isEnterpriseAdminArr = userRoles && userRoles.filter(item => {
      if (isEqual(item.name, 'enterpriseAdmin')) {
        return item;
      }
    })
    const isEnterpriseAdmin = isEnterpriseAdminArr && isEnterpriseAdminArr.length > 0;
    this.setState({ isEnterpriseAdmin });

    if (isEnterpriseAdmin) { // 如果是企业管理员，获取部门列表
      dispatch({
        type: 'vm/queryDeptList',
        payload: {}
      })
    } else if (!isCompanyUser) {  // 如果不是企业用户，获取群组列表
      dispatch({
        type: 'vm/queryGroupList',
        payload: {}
      })
    }

    // 获取当前用户的用户名拼音，用于系统配置的hostName默认值
    const userName = userInfo && userInfo.userName;
    if (userName) {
      dispatch({
        type: 'vm/cn2py',
        payload: {
          chinese: userName
        }
      })
    }
  }

  componentDidUpdate(preProps, preState) {
    const { dispatch, vm: { rebateList, selectedUserKeys } } = this.props;
    const { currentItem, periodKey } = this.state;
    const { currentItem: old_currentItem, periodKey: old_periodKey } = preState;
    const { selectedUserKeys: old_selectedUserKeys, rebateList: old_rebateList } = preProps;
    if ((currentItem && !isEqual(currentItem, old_currentItem))
      && (rebateList && !isEqual(rebateList, old_rebateList))
      || (periodKey && !isEqual(periodKey, old_periodKey))) {
      // || (selectedUserKeys && !isEqual(selectedUserKeys, old_selectedUserKeys))) {
      if (currentItem.instanceConfig) {
        const instanceConfig = currentItem.instanceConfig;

        let arr = rebateList.slice(0, 1);
        if (periodKey) {
          arr = rebateList.filter(item => isEqual(item.id, periodKey));
        }

        let data = {
          orderSmallType: 'vmware',
          flavorId: instanceConfig.id
        }

        if (arr && arr.length > 0) {
          data = {
            ...data,
            buyDuration: arr[0].buyDuration,
            buyUnit: arr[0].buyUnit,
            discountRate: arr[0].rebate
          }
        }

        // 群组计费
        // let userCounts = [];
        if (currentItem.groupId) {
          // userCounts = selectedUserKeys.map(item => {
          //   const newItem = {
          //     userId: item
          //   }
          //   return newItem
          // })

          data = {
            ...data,
            groupId: currentItem.groupId,
            userCounts: currentItem.userCounts
          }
        }

        // 网络带宽计费
        if (currentItem.networkFlavorId) {
          data = {
            ...data,
            networkFlavorId: currentItem.networkFlavorId
          }
        }

        dispatch({
          type: 'vm/calcVMCost',
          payload: data
        })
      }
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'vm/updateState',
      payload: {
        currentStep: 0
      }
    })
  }

  get basicConfigProps() {
    const { dispatch, vm, loading, form } = this.props
    const { toolList, vmTypes, templateList, currentStep } = vm
    const { instanceFilterParams, currentItem, vmTools } = this.state;

    return {
      vmTools,
      form,
      item: currentItem,
      toolList,
      vmTypes,
      templateList,
      setInstanceFilter: values => {
        const data = {
          ...instanceFilterParams,
          ...values
        }

        this.setState({
          instanceFilterParams: data,
          currentItem: {
            ...currentItem,
            instanceFilter: data
          }
        })

        dispatch({
          type: 'vm/getVmStandardList',
          payload: data
        })
      },
      setInstanceConfig: values => {
        const data = {
          cpuCount: values.cpu,
          memorySizeMB: values.memory * 1024
        }

        this.setState({
          instanceConfig: data,
          currentItem: {
            ...currentItem,
            instanceConfig: values
          }
        })
      },
      setVmToolsInfo: values => {
        this.setState({
          vmTools: values,
          currentItem: {
            ...currentItem,
            vmTools: values
          }
        })
      },
      setActiveDiv: values => {
        setTimeout(() => {
          this.setState({
            currentItem: {
              ...currentItem,
              activeDiv: values
            }
          })
        }, 100);

      },
      setScanDays: value => {
        this.setState({
          retentionDays: value
        })
      }
    }
  }

  get networkConfigProps() {
    const { vm } = this.props
    const { networkList } = vm;
    const { currentItem } = this.state;

    return {
      networkList,
      currentItem,
      setNetworkValue: value => {
        const arr = networkList.filter(item => item.id === value);
        if (arr && arr.length > 0) {
          this.setState({
            currentItem: {
              ...currentItem,
              networkFlavorId: value,
              networkName: arr[0].network,
              networkFlavorName: arr[0].flavorName,
            }
          })
        }
      },

    }
  }

  get systemConfigProps() {
    const { dispatch, vm, loading, form } = this.props
    const { userList, userPyList, currentUserPy, deptList, groupList, pagination, selectedUserKeys } = vm;
    const { vmInfo, currentItem, isEnterpriseAdmin } = this.state;

    return {
      isEnterpriseAdmin,
      deptList,
      groupList,
      item: currentItem,
      currentUserPy,
      userList,
      userPyList,
      form,
      onGetGroupUserList: value => {
        // 注释掉：默认给群组内所有用户创建账号，不让用户选择
        // dispatch({
        //   type: 'vm/queryGroupUserList',
        //   payload: {
        //     groupId: value
        //   },
        // })
        // dispatch({
        //   type: 'vm/updateState',
        //   payload: {
        //     selectedUserKeys: [],
        //   },
        // })

        // 设置值，便于计算价格及生成订单
        this.setState({
          currentItem: {
            ...currentItem,
            groupId: value,
          }
        })
      },
      userListProps: {
        loading: loading.effects['vm/queryGroupUserList'],
        pagination: {
          ...pagination,
          showSizeChanger: true,
        },
        onChange: (pagination, filters, sorter) => {
          this.handleTableChange(pagination, filters, sorter)
        },
        selectedRowKeys: selectedUserKeys,
        onRowChange: keys => {
          dispatch({
            type: 'vm/updateState',
            payload: {
              selectedUserKeys: keys,
            },
          })

          const userCounts = keys.map(item => {
            const newItem = {
              userId: item
            }
            return newItem
          })

          this.setState({
            currentItem: {
              ...currentItem,
              userCounts,
            }
          })
        }
      },
      onCheckVmName: (rule, value, callback) => {
        if (value) {
          dispatch({
            type: 'vm/validateVmName',
            payload: {
              vmName: value
            },
          }).then(response => {
            if (!response) {
              callback("虚拟机名称已存在，请重新输入");
            } else {
              callback()
            }
          })
          // }
        } else {
          // Note: 必须总是返回一个 callback
          callback()
        }
      },
      user2py: values => {
        dispatch({
          type: 'vm/user2py',
          payload: values
        })
      },
      onCheckHostName: (rule, value, callback) => {
        if (value) {
          dispatch({
            type: 'vm/checkHostname',
            payload: {
              hostname: value
            },
          }).then(response => {
            if (response) {
              callback(`主机名已存在，请重新输入。（推荐输入：${response}）`);
            } else {
              callback()
            }
          })
          // }
        } else {
          // Note: 必须总是返回一个 callback
          callback()
        }
      },
    }
  }

  handleTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { filterValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...filterValues,
      ...filters,
    };

    this.setState({
      filterValues: {
        ...filterValues,
        ...filters,
      }
    })

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'vm/queryGroupUserList',
      payload: params,
    });
  };

  get reviewProps() {
    const { dispatch, vm, loading, form } = this.props
    const { rebateList } = vm;
    const { vmInfo, currentItem } = this.state;
    return {
      periods: rebateList,
      form,
      vmInfo,
      item: currentItem
    }
  }

  get bottomProps() {
    const { dispatch, vm, loading, form } = this.props
    const { currentStep, calcVmPrice, rebateList, userList, selectedUserKeys } = vm;
    const { validateFieldsAndScroll, getFieldsValue } = form;
    const { vmInfo, vmTools, instanceConfig, retentionDays, randomRootPwd, currentItem, periodKey, isEnterpriseAdmin } = this.state;

    return {
      periods: rebateList,
      calcVmPrice,
      item: currentItem,
      calcLoading: loading.effects['vm/calcVMCost'],
      currentStep,
      onNext: values => {
        const step = values.currentStep;
        if (isEqual(Number(step), 1)) { // 第一步：基础配置

          if (isEmpty(vmTools)) {
            message.error('请选择工具');
            return
          }

          if (isEmpty(instanceConfig)) {
            message.error('请选择实例');
            return
          }

          validateFieldsAndScroll(['dayOfWeek', 'hours'], {
            scroll: { offsetBottom: 280 }
          }, (errors, values) => {
            if (errors) {
              return
            }

            const data = getFieldsValue();

            const scanDays = isEqual(data.retention, 'custom') ? retentionDays : '-1';
            const scanData = {
              autoSnapshotPolicy: {   // 快照策略
                dayOfWeek: data.dayOfWeek,
                hours: data.hours,
                retentionDays: scanDays
              }
            };

            const vmInfoStep1 = {
              ...vmInfo,
              ...instanceConfig,
              diskSizeMB: data.diskSizeMB * 1024,  // 单位：G 转成 M
              edaTools: vmTools,      // 选中需要挂载的工具
              ...scanData
            }

            const item = {
              ...currentItem,
              vmTools,
              diskSizeMB: data.diskSizeMB * 1024,  // 单位：G 转成 M
              ...scanData
            }

            console.log('vmInfoStep1:', vmInfoStep1);
            console.log('currentItem:', item);

            this.setState({
              vmInfo: vmInfoStep1,
              currentItem: item
            })

            dispatch({
              type: 'vm/updateState',
              payload: {
                currentStep: step
              }
            })
          })
        } else if (isEqual(Number(step), 2)) { // 第二步：网络和安全组
          dispatch({
            type: 'vm/updateState',
            payload: {
              currentStep: step
            }
          })

          this.setState({
            vmInfo: {
              ...vmInfo,
              netName: currentItem.networkName
            }
          })

        } else if (isEqual(Number(step), 3)) { // 第三步：系统配置
          validateFieldsAndScroll((errors, values) => {
            if (errors) {
              return
            }

            const data = getFieldsValue();

            // 多用户，分为：1.自定义用户，2.群组内用户
            const userCounts = [];
            if (isEqual(data.multiUser, 'customUser')) { // 1.自定义用户
              const usernames = data.usernames;
              const randomPwds = data.randomPwds;
              const passwords = data.passwords;

              const arr = [];
              usernames && usernames.map((item, index) => {
                if (!isEmpty(item)) {
                  arr.push(item);
                }
              })

              const setArr = Array.from(new Set(arr));
              if (arr.length > setArr.length) {
                message.error('多用户 VM用户名必须唯一，请重新设置');
                return;
              }

              usernames && usernames.map((item, index) => {
                if (!isEmpty(item)) {
                  let userData = {}
                  if (!isEmpty(randomPwds[index])) {
                    if (isEqual(randomPwds[index], 'autoCredential')) {
                      userData = {
                        username: item,
                        randomPwd: true
                      }
                    } else {
                      userData = {
                        username: item,
                        randomPwd: false,
                        password: passwords[index]
                      }
                    }
                    userCounts.push(userData);
                  }
                }
              })
            } else if (isEqual(data.multiUser, 'groupUser')) { // 2.群组内用户
              userList && userList.map(item => {
                if (selectedUserKeys.indexOf(item.id) > -1) {
                  const data = {
                    userId: item.id,
                    usernameZh: item.userName,
                    phone: item.phone,
                    email: item.email
                  }
                  userCounts.push(data);
                }
              })
            }

            const randomRootPwd = data.randomRootPwd;
            const randomRootPwdFlag = isEqual(randomRootPwd, 'autoCredential');
            let credential = {};
            if (randomRootPwdFlag) {
              credential = {
                randomRootPwd: true
              }
            } else {
              credential = {
                randomRootPwd: false,
                rootPwd: data.rootPwd
              }
            }

            let dataStep3 = {
              ...credential,
              vmName: data.vmName,
              hostName: data.hostName,
              annotation: data.annotation,
              sendMail: data.sendMail,
              userCounts,
            }

            if (isEqual(data.multiUser, 'groupUser')) { // 群组内用户
              const createdSharedDisk = data.createdSharedDisk && data.createdSharedDisk.length > 0 ? data.createdSharedDisk[0] : false;

              dataStep3 = {
                ...dataStep3,

                // 群组用户
                multiUser: data.multiUser,
                groupId: data.groupId,
                createdSharedDisk: createdSharedDisk   //是否为选中的群组申请共享存储空间
              }
            } else {
              dataStep3 = {
                ...dataStep3,

                // 群组用户置空
                multiUser: data.multiUser,
                groupId: null,
                createdSharedDisk: false
              }
            }

            const vmInfoStep3 = {
              ...vmInfo,
              ...dataStep3
            }

            const item = {
              ...currentItem,
              ...dataStep3
            }

            this.setState({
              vmInfo: vmInfoStep3,
              currentItem: item
            })

            console.log('vmInfoStep3:', vmInfoStep3);
            console.log('currentItem:', item);

            dispatch({
              type: 'vm/updateState',
              payload: {
                currentStep: step
              }
            })
          })

        } else if (isEqual(Number(step), 4)) {
        }
      },
      onSubmit: debounce((value, isHourChage) => { // 立即购买
        validateFieldsAndScroll(['protocol'], (errors, values) => {
          if (errors) {
            return
          }

          const createVMInfo = {
            ...vmInfo,
            ...value,
            ifDept: isEnterpriseAdmin ? 1 : 0,
          };

          let arr = rebateList.slice(0, 1);
          if (periodKey) {
            arr = rebateList.filter(item => isEqual(item.id, periodKey));
          }

          const data = {
            createVMInfo,
            flavorId: currentItem && currentItem.instanceConfig && currentItem.instanceConfig.id,
            networkFlavorId: currentItem && currentItem.networkFlavorId,
            networkName: currentItem && currentItem.networkName,
            buyDuration: isHourChage ? createVMInfo.day : arr[0].buyDuration,
            buyUnit: isHourChage ? '天' : arr[0].buyUnit,
            paymentMode: isHourChage ? 3 : 1,
            discountRate: 0,
          }

          dispatch({
            type: 'vm/createVmOrder',  // 创建订单
            payload: data
          }).then(response => {
            if (response && response.flag) {
              // this.createSuccessModal();
              this.setState({
                vmTools: [],
                instanceConfig: {},
                retentionDays: 30,
                instanceFilterParams: {
                  status: 1
                },
                randomRootPwd: true,
                vmInfo: {},
              })

              // if (isHourChage) { // 如果是机时抵扣，机时变为0
              //   store.set('machineHours', 0)
              // }

              router.push(`/account/order?from=vm&&type=vm&&orderNum=${response.resData}&&orderType=vmware`);

              // TODO 机时兑换，order页面按钮为“确认兑换”，确认兑换后，查询机时接口，机时为0

            } else if (response) {
              message.config({
                top: 100,
                duration: 2,
              });
              message.error(response.errMessage)
            }
          })
        })
      }, 1000),
      onPrevious: values => {
        dispatch({
          type: 'vm/updateState',
          payload: {
            currentStep: values.currentStep
          }
        })
      },
      onSetPeriodKey: value => { // 购买时长
        this.setState({ periodKey: value })
      }
    }
  }

  createSuccessModal = () => {
    const { dispatch, match: { params: { projectId } } } = this.props;
    let secondsToGo = 5;
    let timer, timer2;
    const modal = Modal.success({
      title: '虚拟机正在创建',
      content: (<div><p>创建虚拟机将需要些时间，请耐心等待...</p><p>将在 {secondsToGo} 秒后返回虚拟机列表页</p></div>),
      okText: '返回',
      onOk: () => {
        clearInterval(timer);
        modal.destroy();

        clearTimeout(timer2);  //停止, 清除Timeout

        router.push('/vm');

        // 设置为初始值
        dispatch({
          type: 'vm/updateState',
          payload: {
            currentStep: 0
          }
        })
      }
    });

    timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: (<div><p>创建虚拟机将需要些时间，请耐心等待...</p><p>将在 {secondsToGo} 秒后返回虚拟机列表页</p></div>),
      });
    }, 1000);

    timer2 = setTimeout(() => {
      clearInterval(timer);
      modal.destroy();

      router.push('/vm');

      // 设置为初始值
      dispatch({
        type: 'vm/updateState',
        payload: {
          currentStep: 0
        }
      })
    }, secondsToGo * 1000);
  }

  render() {
    const { currentStep } = this.props.vm;

    return (
      <div>
        <Steps size="small" current={currentStep}>
          <Step status={currentStep === 0 ? "process" : "finish"} title="基础配置" />
          <Step status={currentStep < 1 ? "wait" : (currentStep === 1 ? "process" : "finish")} title="网络" />
          <Step status={currentStep < 2 ? "wait" : (currentStep === 1 ? "process" : "finish")} title="系统配置" />
          <Step status={currentStep < 3 ? "wait" : (currentStep === 2 ? "process" : "finish")} title="确认订单" />
        </Steps>
        {currentStep === 0 && <BasicConfig {...this.basicConfigProps} />}
        {currentStep === 1 && <NetworkConfig {...this.networkConfigProps} />}
        {currentStep === 2 && <SystemConfig {...this.systemConfigProps} />}
        {currentStep === 3 && <ReviewConfig {...this.reviewProps} />}

        <Bottom {...this.bottomProps} />
      </div>
    )
  }
}

export default CreateVm;
