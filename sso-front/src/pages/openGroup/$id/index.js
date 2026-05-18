import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Breadcrumb, Tabs, message, Modal, Icon, Button, Row, Col } from 'antd';
import Link from 'umi/link';
import store from 'store';
import Page from 'components/Page';
import List from './components/List'
import Filter from './components/Filter'
import UserModal from './components/Modal'
import ApplyList from './components/ApplyList';
import AuditModal from './components/AuditModal';
import ImportExcelModal from './components/ImportExcelModal';
import UserRechargeModal from './components/UserRechargeModal';
import VMList from './components/VM/List';
import { debounce } from 'lodash-es';
import { isEmpty, isEqual } from 'lodash'
import styles from './style.less'
import router from 'umi/router';
import CreateResultModal from './components/VM/CreateResultModal';
import ResetVmModal from './components/VM//ResetVmModal';
import RechargeModal from './components/VM/RechargeModal';

const { TabPane } = Tabs;
const { confirm } = Modal;

const user = store.get('user') || {};
const userId = user && user.userInfo && user.userInfo.id;
const userGroups = user && user.userInfo && user.userInfo.userGroups;

@connect(({ openGroup, loading }) => ({ openGroup, loading }))
class OpenGroupUser extends PureComponent {
  state = {
    formValues: {},     // 查询条件
    isOwner: false,     // 当前用户是否是当前群组的群主，默认false
    tabKey: 'members',  // 当前选中的tab页面，默认成员
  };

  componentDidMount() {
    const { dispatch, match: { params: { id } } } = this.props;
    const currentGroup = userGroups && userGroups.filter(item => isEqual(Number(item.id), Number(id)));
    if (currentGroup && currentGroup.length > 0 && isEqual(currentGroup[0].groupOwnerId, userId)) {
      dispatch({
        type: 'openGroup/queryGroupUserList',
        payload: {
          params: { groupId: id }
        }
      })

      dispatch({
        type: 'openGroup/getVmIdsByGroupId',
        payload: {
          groupId: id,
        }
      })

      this.setState({
        formValues: {
          groupId: id,
        },
        isOwner: true,
      })

    } else {
      this.setState({
        isOwner: false
      })
    }
  }

  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }

  handleQuery = (values) => {
    const { dispatch, match: { params: { id } } } = this.props
    const { formValues } = this.state
    dispatch({
      type: 'openGroup/queryGroupUserList',
      payload: {
        params: {
          ...formValues,
          ...values,
          groupId: id
        },
        selectedUserKeys: [],
        selectedUsers: [],
      }
    })
  }

  // 根据群组及关键字查询
  get filterProps() {
    const { dispatch, openGroup, loading, match: { params: { id } } } = this.props
    const { enterpriseGroupList, vmIds, selectedUserKeys, selectedUsers } = openGroup
    const { formValues } = this.state

    return {
      vmIds,
      selectedUsers,
      selectedUserKeys,
      filter: {
        enterpriseGroupList,
        ...formValues
      },
      setFormValues: values => {
        this.setStateValue('formValues', values)
      },
      onSearch: values => {
        this.handleQuery(values);
      },
      onAdd() {
        dispatch({
          type: 'openGroup/showUserModal',
          payload: {
            userModalType: 'create',
          },
        })
      },
      onDownloadTemplate: () => {
        dispatch({
          type: 'openGroup/downloadTemplate',
          payload: {},
        })
      },
      onShowExlModal: () => {
        dispatch({
          type: 'openGroup/showImportExlModal',
          payload: {},
        })
      },
      releaseAllLoading: loading.effects['openGroup/releaseVmsByGroupIds'],
      onReleaseAll() { // 一键注销该群组下的所有VM及对应账号
        const groupId = id.toString();

        dispatch({
          type: 'openGroup/releaseVmsByGroupIds',
          payload: {
            groupIds: [groupId]
          },
        })
      },
      addUserCountsLoading: loading.effects['openGroup/addUserCounts'],
      onAddUserCounts: () => {
        const arr = selectedUsers.map(item => {
          const newItem = {
            userId: item.id,
            usernameZh: item.userName,
            email: item.email,
            phone: item.phone
          }
          return newItem
        })
        const data = {
          groupId: id,
          userCounts: arr
        }

        const that = this;
        return new Promise(function (reslove, reject) {
          dispatch({
            type: 'openGroup/addUserCounts',
            payload: data,
          }).then(res => {
            if (res && res.flag) {
              that.handleQuery();

              const succeedUsers = res.resData.succeedUsers;
              const failedUsers = res.resData.failedUsers;

              if (failedUsers) {
                if (failedUsers.length > 0) {
                  //提示创建失败的原因
                  const tip = (
                    <div style={{ fontSize: 12 }}>
                      <p>
                        {
                          failedUsers.map(item => {
                            return (
                              <span
                                key={item.id}
                                style={{ marginRight: 6, color: '#1890ff' }}
                              >
                                {item.username}
                              </span>
                            )
                          })
                        }
                      </p>
                      <p style={{ marginBottom: 0 }}>失败原因如下：</p>
                      <p style={{ marginBottom: 0 }}>1. 当前群组内尚未创建IC设计云服务器。</p>
                      <p style={{ marginBottom: 0 }}>2. 当前群组内的所有IC设计云服务器账号已满，需要重新创建并关联多用户账号。</p>
                    </div>
                  );

                  confirm({
                    title: '以下用户IC设计云服务器账号创建失败',
                    content: tip,
                    icon: <Icon type="close-circle" style={{ color: '#f52222' }} />,
                    width: 500,
                    okText: '立即创建IC设计云服务器',
                    cancelText: '知道了',
                    onOk: () => {
                      that.handleCreateVM();
                    }
                  });
                } else if (failedUsers.length === 0) {
                  if (succeedUsers) {
                    if (succeedUsers.length === 0) {
                      message.success("选中的所有用户账号已存在请勿重复创建！");
                    } else if (succeedUsers.length > 0) {
                      message.success("选中的所有用户IC设计云服务器账号创建成功！");
                    }
                  }
                }
              }

              reslove(res.flag);
            } else {
              message.config({
                top: 100,
                duration: 2,
              });
              message.error(res.errMessage);
              t
              reject();
            }
          })
        })
      },
      releaseLoading: loading.effects['openGroup/releaseUserCounts'],
      onRelease: () => {
        const arr = selectedUsers.map(item => {
          const newItem = {
            userId: item.id,
            usernameZh: item.userName,
            email: item.email,
            phone: item.phone
          }
          return newItem
        })
        const data = {
          groupId: id,
          userCounts: arr
        }

        const that = this;
        dispatch({
          type: 'openGroup/releaseUserCounts',
          payload: data,
        }).then(() => {
          that.handleQuery();
        })
      },
      onShowRechargeModal: () => {
        // 判断选中的用户是否关联VM，如果都未关联则无法续费
        let existVmAccount = false;
        selectedUsers && selectedUsers.map(item => {
          if (item.vmInfos && item.vmInfos.length > 0) {
            existVmAccount = true;
          }
        })

        if (existVmAccount) {
          dispatch({
            type: 'openGroup/showUserRechargeMdl',
            payload: {},
          })

          dispatch({
            type: 'openGroup/getRebateList',
          })
        } else {
          confirm({
            title: '请先为选择的用户创建IC设计云服务器账号',
            okText: '知道了',
            cancelText: '取消',
          });
        }
      },
      onToCreateVM: () => {
        this.handleCreateVM();
      }
    }
  }

  onShowUserInfo = (e, id) => {
    const { dispatch } = this.props
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
  }

  // 账号延期窗口props
  get userRechargeModalProps() {
    const { dispatch, openGroup, loading, lodation } = this.props;
    const { userRechargeMdlVisible, calcVmPrice, rebateList, selectedUserKeys, selectedUsers } = openGroup;

    return {
      selectedUsers,
      rechargeList: rebateList,  // 续费时长
      calcVmPrice,
      visible: userRechargeMdlVisible,
      width: 1000,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: '账号延期',
      maxmin: true,
      centered: true,
      calcLoading: loading.effects['openGroup/calcVMCost'],
      onCancel() {
        dispatch({
          type: 'openGroup/hideUserRechargeMdl',
          payload: {
            calcVmPrice: {},
          }
        })
      },
      onCalcCost: (values) => {
        dispatch({
          type: 'openGroup/calcVMCost',
          payload: values
        })
      },
      openRechargeOrder: values => {
        const data = {
          ...values,
          totalPrice: calcVmPrice && calcVmPrice.realPrice,
        }
        store.set('vmRecharge', data);
        dispatch({
          type: 'openGroup/hideUserRechargeMdl',
          payload: {
            calcVmPrice: {},
          }
        });

        // 打开创建VM续费订单页面
        router.push(`/account/order?from=${location.pathname}`)
      }
    }
  }

  get listProps() {
    const { dispatch, openGroup, loading, match: { params: { id } } } = this.props
    const { userList, pagination, selectedUserKeys, selectedUsers } = openGroup

    return {
      dataSource: userList,
      loading: loading.effects['openGroup/queryGroupUserList'],
      pagination,
      onChange: (pagination, filters, sorter) => {
        this.handleTableChange(pagination, filters, sorter, 'groupUser')
      },
      onRemoveUser: values => {
        const that = this;
        dispatch({
          type: 'openGroup/removeUser',
          payload: {
            userId: values.id,
            groupId: id
          },
        }).then(() => {
          that.handleQuery();
        })
      },
      selectedRowKeys: selectedUserKeys,
      onRowChange: (keys, rows) => {
        dispatch({
          type: 'openGroup/updateState',
          payload: {
            selectedUserKeys: keys,
            selectedUsers: rows
          },
        })
      },
    }
  }

  handleTableChange = (pagination, filtersArg, sorter, type) => {
    const { dispatch, match: { params: { id } } } = this.props;
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

    let order;
    if (sorter.order === 'ascend') {
      order = 'asc';
    } else if (sorter.order === 'descend') {
      order = 'desc'
    }

    if (sorter.field) {
      params.sorter = `${sorter.field}_${order}`;
    }

    if (isEqual(type, 'groupUser')) {
      const { openGroup: { selectedUserKeys, selectedUsers } } = this.props;

      dispatch({
        type: 'openGroup/queryGroupUserList',
        payload: {
          params,
          selectedUserKeys,
          selectedUsers
        },
      });
    } else if (isEqual(type, 'vm')) {
      this.handleVmQuery(params);
    }
  };

  handleVmQuery = values => {
    const { dispatch, match: { params: { id } } } = this.props;
    dispatch({
      type: 'openGroup/queryVmPagedList',
      payload: {
        ...values,
        groupId: id,
      },
    });
  }


  get modalProps() {
    const { dispatch, openGroup, loading, match: { params: { id } } } = this.props
    const { currentUserItem, userModalVisible } = openGroup

    return {
      dispatch,
      item: currentUserItem,
      visible: userModalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects[`openGroup/createUser`],
      title: '添加用户',
      centered: true,
      okText: '添加',
      cancelText: '取消',
      onOk: debounce(data => {
        dispatch({
          type: `openGroup/createUser`,
          payload: {
            ...data,
            groupId: id,
          },
        }).then(() => {
          this.handleQuery()
        })
      }, 1000),
      onCancel() {
        dispatch({
          type: 'openGroup/hideUserModal',
        })
      },
    }
  }

  get applyListProps() {
    const { dispatch, openGroup, loading, match: { params: { id } } } = this.props
    const { applyList } = openGroup

    return {
      dataSource: applyList,
      loading: loading.effects['openGroup/getApplyList'],
      onAudit: values => {
        dispatch({
          type: 'openGroup/verify',
          payload: {
            params: values,
            groupId: id
          }
        })
      },
      showAuditMdl: applyId => {
        dispatch({
          type: 'openGroup/showAuditModal',
          payload: {
            currentAuditId: applyId
          },
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
      }
    }
  }

  get auditMdlProps() {
    const { dispatch, openGroup, loading, match: { params: { id } } } = this.props
    const { auditMdlVisible, currentAuditId } = openGroup

    return {
      visible: auditMdlVisible,
      width: 400,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      confirmLoading: loading.effects['openGroup/verify'],
      title: '审核不通过',
      centered: true,
      okText: '确定',
      cancelText: '取消',
      onOk: debounce(values => {
        dispatch({
          type: 'openGroup/verify',
          payload: {
            params: {
              ...values,
              applyId: currentAuditId,
              status: 2  // 不通过
            },
            groupId: id
          },
        })
      }, 1000),
      onCancel() {
        dispatch({
          type: 'openGroup/hideAuditModal',
        })
      },
    }
  }

  get exlMdlProps() {
    const { dispatch, openGroup, loading, match: { params: { id } } } = this.props
    const { importExlMdlVisible } = openGroup

    return {
      visible: importExlMdlVisible,
      width: 400,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      loading: loading.effects['openGroup/importExcel'],
      title: '成员信息批量导入',
      centered: true,
      onUpload: values => {
        const that = this;
        return new Promise(function (reslove, reject) {
          dispatch({
            type: 'openGroup/importExcel',
            payload: {
              file: values.file,
              groupId: id
            },
          }).then(res => {
            if (res && res.flag) {
              that.handleQuery();
              message.success('上传成功！');

              reslove(res.flag);

              dispatch({
                type: 'openGroup/hideImportExlModal',
                payload: {},
              })

            } else {
              message.config({
                top: 100,
                duration: 2,
              });
              message.error(res.errMessage);

              reject();
            }
          })
        })
      },
      onCancel() {
        dispatch({
          type: 'openGroup/hideImportExlModal',
        })
      },
    }
  }

  get vmListProps() {
    const { dispatch, loading, openGroup, match: { params: { id } } } = this.props;
    const { vmList, pagination } = openGroup;
    const { isOwner } = this.state;
    return {
      dataSource: vmList,
      loading: loading.effects['openGroup/queryVmPagedList'],
      pagination: {
        ...pagination,
        showSizeChanger: true,
      },
      onChange: (pagination, filters, sorter) => {
        this.handleTableChange(pagination, filters, sorter, 'vm')
      },
      isOwner,
      powerStatusLoading: loading.effects['openGroup/powerOnVM']
        || loading.effects['openGroup/powerOffVM']
        || loading.effects['openGroup/rebootVM']
        || loading.effects['openGroup/suspendVM'],
      powerControl: (data, type) => { // 虚拟机电源控制
        dispatch({
          type: `openGroup/${type}`,
          payload: {
            ...data,
            groupId: id,
          }
        })
      },
      onShowRechargeModal: values => { // 续费窗口
        dispatch({
          type: 'openGroup/showRechargeMdl',
          payload: {
            vmInfo: values
          }
        })

        dispatch({
          type: 'openGroup/getNetworkList',
          payload: {}
        })

        dispatch({
          type: 'openGroup/getRebateList',
        })
      },
    }
  }

  get createResultProps() {
    const { dispatch, openGroup, location } = this.props;
    const { createResultMdlVisible } = openGroup;
    const { tabKey } = this.state;

    return {
      visible: createResultMdlVisible,
      destroyOnClose: true,
      width: 500,
      centered: true,
      closable: true,
      maskClosable: false,
      onCancel: () => {
        dispatch({
          type: 'openGroup/hideCreateResultModal',
          payload: {},
        })
      },
      checkCreateComplete: () => {
        if (isEqual('members', tabKey)) {
          // 重新刷新用户列表
          this.handleQuery();
        } else if (isEqual('vm', tabKey)) {
          // 重新刷新VM列表
          this.handleVmQuery();
        }

        dispatch({
          type: 'openGroup/hideCreateResultModal',
          payload: {},
        })
      }
    }
  }

  callback = (key) => {
    const { dispatch, match: { params: { id } } } = this.props;
    if (key) {
      this.setState({ tabKey: key })
    }

    switch (key) {
      case 'members':
        this.handleQuery();
        break;
      case 'applyCheck':
        dispatch({
          type: 'openGroup/getApplyList',
          payload: {
            groupId: id,
          }
        })
        break;
      case 'vm':
        this.handleVmQuery();
        break;
      default:
        break;
    }
  }

  handleCreateVM = () => {
    const { openGroup, dispatch, match: { params: { id } } } = this.props;
    const { vmIds } = openGroup;
    if (vmIds && vmIds.length > 0) {
      // 如果已存在机器，新建从VM需要跟之前的VM环境保持一致

      // 创建结果确认窗口
      dispatch({
        type: 'openGroup/showCreateResultModal',
        payload: {},
      })

      // 创建VM页面
      window.open(`/openGroup/${id}/createvm`, '_blank');
    } else {
      // 如果尚未创建VM，则可以任意指定环境

      // 创建结果确认窗口
      dispatch({
        type: 'openGroup/showCreateResultModal',
        payload: {},
      })

      // 创建VM页面
      window.open('/vm/create', '_blank');
    }
  }

  onShowResetVmModal = (e) => {
    const { dispatch, openGroup } = this.props;
    const { vmList } = openGroup;

    if (vmList && vmList.length > 0) {


      dispatch({
        type: 'openGroup/getToolList',
        payload: {}
      })

      // 获取VM分类列表，包括机型、CPU、内存
      dispatch({
        type: 'openGroup/getVmTypes',
        payload: {}
      })


      dispatch({
        type: 'openGroup/getNetworkList',
      })

      dispatch({
        type: 'openGroup/getVmStandardList',
      }).then(() => {
        dispatch({
          type: 'openGroup/showResetVmModal',
          payload: {}
        })
      })


    } else {
      confirm({
        title: '当前群组下尚未创建IC设计云服务器',
        width: 500,
        okText: '立即创建IC设计云服务器',
        cancelText: '取消',
        onOk: () => {
          this.handleCreateVM();
        }
      });
    }
  }

  // 调整 VM 配置窗口
  get resetVmModalProps() {
    const { dispatch, openGroup, loading, location } = this.props;
    const { resetVmMdlVisible, toolList, vmTypes, templateList, vmList, calcVmPrice, networkList } = openGroup;

    return {
      toolList,
      vmTypes,
      templateList,
      vmList,
      calcVmPrice,
      networkList,
      visible: resetVmMdlVisible,
      loading: loading.effects['openGroup/getToolList'],
      width: 1100,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: '调整资源',
      maxmin: true,
      centered: true,
      calcLoading: loading.effects['openGroup/calcVMCost'],
      onCancel() {
        dispatch({
          type: 'openGroup/hideResetVmModal',
          payload: {
            calcVmPrice: {},
          }
        })
      },
      onGetVmStandardList: values => {
        dispatch({
          type: 'openGroup/getVmStandardList',
          payload: values
        })
      },
      onCalcCost: (values) => {
        dispatch({
          type: 'openGroup/calcVMCost',
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
          type: 'openGroup/hideResetVmModal',
          payload: {
            calcVmPrice: {},
          }
        });

        // 打开创建升降配订单页面
        router.push(`/account/order?from=${location.pathname}`)
      }
    }
  }

  onShowRechargeVmModal = e => {
    const { dispatch, openGroup } = this.props;
    const { vmList } = openGroup;

    if (vmList && vmList.length > 0) {
      dispatch({
        type: 'openGroup/getRebateList',
        payload: {}
      })

      dispatch({
        type: 'openGroup/getNetworkList',
        payload: {}
      })

      dispatch({
        type: 'openGroup/showRechargeMdl',
        payload: {}
      })

    } else {
      confirm({
        title: '当前群组下尚未创建IC设计云服务器',
        width: 500,
        okText: '立即创建IC设计云服务器',
        cancelText: '取消',
        onOk: () => {
          // 创建VM页面
          window.open('/vm/create', '_blank');

          // 创建结果确认窗口
          dispatch({
            type: 'openGroup/showCreateResultModal',
            payload: {},
          })
        }
      });
    }
  }

  // 续费窗口props
  get rechargeModalProps() {
    const { dispatch, openGroup, loading, location } = this.props;
    const { rechargeMdlVisible, vmInfo, calcVmPrice, rebateList, vmList, networkList } = openGroup;

    return {
      vmList: vmInfo && !isEmpty(vmInfo) ? [vmInfo] : vmList,
      rechargeList: rebateList,  // 续费时长
      calcVmPrice,
      visible: rechargeMdlVisible,
      width: 900,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: '续费实例',
      maxmin: true,
      centered: true,
      calcLoading: loading.effects['openGroup/calcVMCost'],
      onCancel() {
        dispatch({
          type: 'openGroup/hideRechargeMdl',
          payload: {
            calcVmPrice: {},
            vmInfo: {}
          }
        })
      },
      onCalcCost: (values) => {
        dispatch({
          type: 'openGroup/calcVMCost',
          payload: values
        })
      },
      openRechargeOrder: values => {

        // 判断是单个续费，还是一键续费
        let vmIdList = [];
        let vmNames = [];
        let netNameId = 0;
        if (vmInfo && !isEmpty(vmInfo)) { // 单个续费
          vmIdList = [vmInfo.vmId];
          vmNames = [vmInfo.vmName];

          netNameId = vmInfo.netNameId;
        } else { // 一键续费
          vmList.map(item => {
            vmIdList.push(item.vmId);
            vmNames.push(item.vmName);
          })
          if (vmList && vmList.length > 0) {
            netNameId = vmList[0].netNameId;
          }
        }

        const netArr = networkList.filter(item => item.id === netNameId);
        const networkFlavorName = netArr && netArr.length > 0 && netArr[0].flavorName;

        const data = {
          ...values,
          totalPrice: calcVmPrice && calcVmPrice.realPrice,
          vmIdList,
          vmNames,
          vmInfo,
          networkFlavorName
        }
        store.set('vmRecharge', data);
        dispatch({
          type: 'openGroup/hideRechargeMdl',
          payload: {
            calcVmPrice: {},
            vmInfo: {}
          }
        });

        // 打开创建VM续费订单页面
        router.push(`/account/order?from=${location.pathname}`)
      }
    }
  }

  render() {
    const { isOwner } = this.state;

    return (
      <Page inner>
        <Breadcrumb style={{ marginBottom: '5px' }} separator=">">
          <Breadcrumb.Item>
            <Link to='/openGroup'>群组</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>成员管理</Breadcrumb.Item>
        </Breadcrumb>

        <h2 style={{ marginTop: '24px' }}>群组成员</h2>

        {isOwner &&
          <>
            <Tabs onChange={this.callback} type="card" >
              <TabPane tab="群组成员" key="members">
                <div className={styles.formFilter}>
                  <Filter {...this.filterProps} />
                </div>
                <List {...this.listProps} />
                <UserModal {...this.modalProps} />
                <ImportExcelModal {...this.exlMdlProps} />
                <UserRechargeModal {...this.userRechargeModalProps} />
              </TabPane>
              <TabPane tab="入群申请审核" key="applyCheck">
                <ApplyList {...this.applyListProps} />
                <AuditModal {...this.auditMdlProps} />
              </TabPane>
              <TabPane tab="IC设计云服务器" key="vm">
                <Row style={{ marginBottom: 16 }}>
                  <Col span={12}>
                    <Button
                      type="primary"
                      ghost
                      onClick={this.onShowResetVmModal}
                    >
                      一键调整配置
                    </Button>
                    <Button
                      style={{ marginLeft: 15 }}
                      type="primary"
                      ghost
                      onClick={this.onShowRechargeVmModal}
                    >
                      一键续费
                    </Button>
                  </Col>
                  <Col span={12} align="right">
                    <Button
                      type="primary"
                      className={styles.sureBtn}
                      onClick={this.handleCreateVM}
                    >
                      立即创建
                    </Button>
                  </Col>
                </Row>
                <VMList {...this.vmListProps} />
                <ResetVmModal {...this.resetVmModalProps} />
                <RechargeModal  {...this.rechargeModalProps} />
              </TabPane>
            </Tabs>
            <CreateResultModal {...this.createResultProps} />
          </>
        }
      </Page>
    )
  }
}

export default OpenGroupUser
