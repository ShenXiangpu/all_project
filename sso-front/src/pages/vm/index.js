import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Button, message } from 'antd'
import router from 'umi/router'
import store from 'store'
import Page from 'components/Page'
import Filter from './components/Filter'
import List from './components/List'
import RemoteModal from './components/RemoteModal'
import ResetVmModal from './components/ResetVmModal'
import RechargeModal from './components/RechargeModal'
import UsersModal from './components/UsersModal'
import styles from './style.less'
import { isEmpty, isEqual } from 'lodash'
import { Base64 } from 'js-base64';

@connect(({ app, vm, loading }) => ({ app, vm, loading }))
class VM extends PureComponent {

  state = {
    formValues: {},              // 查询条件
    isCompanyNormal: undefined,   // 是否为企业非管理员角色，如果是，不具备操作VM计费相关操作权限
    isCompanyPM: undefined,       // 是否为企业项目经理，如果是，不具备操作VM计费相关操作，只能进行开机、关机、多用户管理
    isEnterpriseAdmin: undefined, // 是否为企业管理员
    isCompanyUser: false,         // 是否为企业员工，是:返回企业ID
    currentUserId: undefined,     // 当前用户Id
  }

  componentDidMount() {
    this.handleQuery();

    // 判断是否为公司普通用户（项目经理、工程师）
    const user = store.get('user');
    const userInfo = user && user.userInfo;
    const isCompanyUser = userInfo && userInfo.companyId;
    const currentUserId = userInfo && userInfo.id;
    const userRoles = userInfo && userInfo.userRoles;
    const isCompanyNormalArr = userRoles && userRoles.filter(item => {
      if (isEqual(item.name, 'admin') || isEqual(item.name, 'engineer')) {
        return item;
      }
    })
    const isCompanyPmArr = userRoles && userRoles.filter(item => {
      if (isEqual(item.name, 'admin')) {
        return item;
      }
    })

    const isEnterpriseAdminArr = userRoles && userRoles.filter(item => {
      if (isEqual(item.name, 'enterpriseAdmin')) {
        return item;
      }
    })
    const isEnterpriseAdmin = isEnterpriseAdminArr && isEnterpriseAdminArr.length > 0;

    this.setState({
      isCompanyNormal: isCompanyNormalArr && isCompanyNormalArr.length > 0,
      isCompanyPM: isCompanyPmArr && isCompanyPmArr.length > 0,
      isEnterpriseAdmin,
      isCompanyUser,
      currentUserId,
    })

    const { dispatch } = this.props;
    if (isCompanyUser) { // 如果是企业用户，获取部门列表
      dispatch({
        type: 'vm/queryDeptList',
        payload: {}
      })
    }

    // 获取群组列表
    dispatch({
      type: 'vm/queryGroupList',
      payload: {}
    })
  }

  handleQuery = (values) => {
    const { dispatch } = this.props
    const { formValues } = this.state
    dispatch({
      type: 'vm/query',
      payload: {
        ...values,
        ...formValues
      }
    })
  }

  handleRefresh = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'vm/query'
    })
  }

  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }

  get filterProps() {
    const { dispatch, loading, vm } = this.props;
    const { deptList, groupList } = vm;
    const { formValues, isCompanyUser, isCompanyNormal } = this.state

    return {
      isCompanyUser,
      isCompanyNormal,
      groupList: isCompanyUser ? deptList : groupList,
      filter: {
        ...formValues,
      },
      setFormValues: values => {
        this.setStateValue('formValues', values)
      },
      onSearch: values => {
        dispatch({
          type: 'vm/query',
          payload: {
            ...values
          }
        })
      },
      onAdd: () => {
        this.handleAddClick();
      }
    }
  }

  get listProps() {
    const { dispatch, vm, loading } = this.props
    const { list, selectedRowKeys, pagination, deptList, groupList } = vm;
    const { isCompanyNormal, isCompanyUser, currentUserId, isCompanyPM, isEnterpriseAdmin } = this.state

    return {
      // selectedRowKeys,
      isCompanyNormal,
      currentUserId,
      isCompanyUser,
      isCompanyPM,
      deptList,
      groupList,
      dataSource: list,
      powerStatusLoading: loading.effects['vm/powerOnVM']
        || loading.effects['vm/powerOffVM']
        || loading.effects['vm/rebootVM']
        || loading.effects['vm/suspendVM'],
      loading: loading.effects['vm/query'],
      // rowSelection: {
      //   selectedRowKeys,
      //   onChange: (keys, records) => {
      //     dispatch({
      //       type: 'vm/updateState',
      //       payload: {
      //         selectedRowKeys: keys,
      //       },
      //     })
      //   },
      // },
      pagination: {
        ...pagination,
        showSizeChanger: true,
      },
      onChange: (pagination, filters, sorter) => {
        this.handleTableChange(pagination, filters, sorter)
      },
      onShowRemoteModal: values => {
        const pathname = `/vm/${values.vmId}/remoteConn`;
        router.push({
          pathname,
        })
      },
      onGetDetailInfo: values => {
        const pathname = `/vm/${values.vmId}`;
        router.push({
          pathname,
        })
      },
      powerControl: (data, type) => { // 虚拟机电源控制
        dispatch({
          type: `vm/${type}`,
          payload: data
        })
      },
      getRemoteUrl: data => { // 获取虚拟机指定用户名的noVNC地址
        dispatch({
          type: 'vm/getConsoleForUser',
          payload: data
        }).then(response => {
          if (response.flag && response.resData) {
            const url = response.resData;
            // router.push(url);
            window.open(url, '_blank')
          } else {
            message.config({
              top: 100,
              duration: 2,
            });
            message.error(response.errMessage)
          }
        })
      },
      onShowResetVmModal: vmId => { // 调整配置(升降配)
        dispatch({
          type: 'vm/getVmByVmId',
          payload: {
            vmId
          }
        }).then(() => {
          dispatch({
            type: 'vm/getToolList',
            payload: {}
          })

          // 获取VM分类列表，包括机型、CPU、内存
          dispatch({
            type: 'vm/getVmTypes',
            payload: {}
          })

          dispatch({
            type: 'vm/getVmStandardList',
          }).then(() => {
            dispatch({
              type: 'vm/showResetVmModal',
              payload: {}
            })
          })

          dispatch({
            type: 'vm/getNetworkList',
          })
        })
      },
      onShowRechargeModal: vmId => { // 续费窗口
        dispatch({
          type: 'vm/getVmByVmId',
          payload: {
            vmId
          }
        }).then(() => {
          dispatch({
            type: 'vm/showRechargeMdl',
            payload: {}
          })

          dispatch({
            type: 'vm/getNetworkList',
            payload: {}
          })

          dispatch({
            type: 'vm/getRebateList',
          })
        })
      },
      onShowUsersModal: values => { // 多用户管理窗口
        dispatch({
          type: 'vm/getVmByVmId',
          payload: {
            vmId: values.vmId
          }
        }).then(() => {
          if (!isEmpty(values.groupId)) {
            if (isCompanyUser) {
              // 如果是企业用户
              if (isEnterpriseAdmin) { // 企业管理员按部门查询用户
                dispatch({
                  type: 'vm/queryEnterpriseUserList',
                  payload: {
                    companyId: isCompanyUser,
                    deptId: values.groupId,
                    pageSize: 10000
                  }
                })
              }

              if (isCompanyPM) { // 项目经理查询自己所在部门内用户
                dispatch({
                  type: 'vm/queryDeptUserList',
                  payload: {
                    pageSize: 10000
                  }
                })
              }

            } else {
              dispatch({
                type: 'vm/queryGroupUserList',
                payload: {
                  groupId: values.groupId
                }
              })
            }
          }

          dispatch({
            type: 'vm/showUsersMdl',
            payload: {}
          })
        })
      },
      showUserInfo: id => {
        dispatch({
          type: 'app/getUserInfoById',
          payload: {
            userId: id
          },
        }).then(() => {
          dispatch({
            type: 'app/showUserInfoModal'
          })
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
      type: 'vm/query',
      payload: params,
    });
  };

  get remoteModalProps() {
    const { dispatch, vm, loading } = this.props;
    const { remoteModalVisible, remoteConn } = vm;
    return {
      visible: remoteModalVisible,
      remoteConn,
      loading: loading.effects['vm/getConsole'],
      width: '60%',
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: '远程连接',
      maxmin: true,
      centered: true,
      footer: null,
      onCancel() {
        dispatch({
          type: 'vm/hideRemoteModal'
        })
      },
    }
  }

  // 调整 VM 配置窗口
  get resetVmModalProps() {
    const { dispatch, vm, loading } = this.props;
    const { resetVmMdlVisible, toolList, vmTypes, templateList, vmInfo, calcVmPrice, networkList } = vm;

    return {
      toolList,
      vmTypes,
      templateList,
      vmInfo,
      networkList,
      calcVmPrice,
      visible: resetVmMdlVisible,
      loading: loading.effects['vm/getToolList'],
      width: 1100,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: '调整资源',
      maxmin: true,
      centered: true,
      calcLoading: loading.effects['vm/calcVMCost'],
      onCancel() {
        dispatch({
          type: 'vm/hideResetVmModal',
          payload: {
            calcVmPrice: {},
            vmInfo: {}
          }
        })
      },
      onGetVmStandardList: values => {
        dispatch({
          type: 'vm/getVmStandardList',
          payload: values
        })
      },
      onCalcCost: (values) => {
        dispatch({
          type: 'vm/calcVMCost',
          payload: values
        })
      },
      openReconfigOrder: values => {
        const data = {
          ...values,
          // ...vmInfo,
          totalPrice: calcVmPrice && calcVmPrice.realPrice
        }
        store.set('vmReconfig', data);
        dispatch({
          type: 'vm/hideResetVmModal',
          payload: {
            calcVmPrice: {},
            vmInfo: {}
          }
        });

        // 打开创建升降配订单页面
        router.push('/account/order?from=vm')
      }
    }
  }

  // 续费窗口props
  get rechargeModalProps() {
    const { dispatch, vm, loading } = this.props;
    const { rechargeMdlVisible, vmInfo, calcVmPrice, rebateList, networkList } = vm;

    return {
      vmInfo,
      rechargeList: rebateList,  // 续费时长
      calcVmPrice,
      visible: rechargeMdlVisible,
      loading: loading.effects['vm/getVmByVmId'],
      width: 900,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: '续费实例',
      maxmin: true,
      centered: true,
      calcLoading: loading.effects['vm/calcVMCost'],
      onCancel() {
        dispatch({
          type: 'vm/hideRechargeMdl',
          payload: {
            calcVmPrice: {},
            vmInfo: {}
          }
        })
      },
      onCalcCost: (values) => {
        dispatch({
          type: 'vm/calcVMCost',
          payload: values
        })
      },
      openRechargeOrder: values => {
        const netArr = networkList.filter(item => item.id === vmInfo.netNameId);
        const networkFlavorName = netArr && netArr.length > 0 && netArr[0].flavorName;

        const data = {
          ...values,
          totalPrice: calcVmPrice && calcVmPrice.realPrice,
          vmIdList: [vmInfo.vmId],
          vmNames: [vmInfo.vmName],
          vmInfo,
          networkFlavorName
        }
        store.set('vmRecharge', data);
        dispatch({
          type: 'vm/hideRechargeMdl',
          payload: {
            calcVmPrice: {},
            vmInfo: {}
          }
        });

        // 打开创建VM续费订单页面
        router.push('/account/order?from=vm')
      }
    }
  }

  get usersModalProps() {
    const { dispatch, vm, loading } = this.props;
    const { usersMdlVisible, userList, userPyList, currentUserPy, vmInfo, deptList, groupList } = vm;
    const { isCompanyUser } = this.state;

    return {
      visible: usersMdlVisible,
      isCompanyUser,
      vmInfo,
      groupList: isCompanyUser ? deptList : groupList,
      currentUserPy,
      userList,
      userPyList,
      loading: loading.effects['vm/getVmByVmId'],
      confirmLoading: loading.effects['vm/changeUserCounts'],
      width: 880,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: '多用户管理',
      centered: true,
      dispatch,
      onCancel() {
        dispatch({
          type: 'vm/hideUsersMdl',
          payload: {
            userList: []
          }
        })
      },
      onOk: (values) => {
        dispatch({
          type: 'vm/changeUserCounts',
          payload: values
        });
      },
      handleName: (name) => {
        this.handleName(name)
      }
    }
  }

  handleAddClick = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'vm/getToolList',
    }).then(() => {
      dispatch({
        type: 'vm/getVmStandardList',
      })
    }).then(() => {
      const pathname = 'vm/create';
      router.push({
        pathname,
      })
    })
  }


  //转换中文名字
  handleName = (name) => {
    const { dispatch } = this.props
    dispatch({
      type: 'vm/handleNameToChinese',
      payload: {
        chinese:name
      }
    }).then((response) => {
      if(response && response.flag) {
        return response.resData
      }else {
        message.config({
          top: 100,
          duration: 2,
        });
        message.error(response.errMessage)
      }
    })
  }

  render() {

    return (
      <Page inner>
        {/* <Row style={{ marginBottom: '16px', textAlign: 'right' }}>
          <Button type="primary" onClick={this.handleAddClick}>
            立即创建
          </Button>
        </Row> */}
        <div className={styles.formFilter}>
          <Filter {...this.filterProps} />
        </div>
        <List {...this.listProps} />

        <RemoteModal {...this.remoteModalProps} />
        <ResetVmModal {...this.resetVmModalProps} />
        <RechargeModal {...this.rechargeModalProps} />
        <UsersModal {...this.usersModalProps} />
      </Page >
    )
  }
}

VM.propTypes = {
  vm: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default VM
