import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Breadcrumb, Tabs, message } from 'antd';
import Link from 'umi/link';
import moment from 'moment';
import Page from 'components/Page';
import Detail from './Detail';
import Monitor from './Monitor';
import Snapshot from './Snapshot';
import styles from './styles.less';
import PolicyRule from './PolicyRule';
import copy from 'copy-to-clipboard';
import { debounce } from 'lodash-es';
import store from 'store';
import { isEqual } from 'lodash';
import PolicyHistory from './PolicyHistory';

const { TabPane } = Tabs;

@connect(({ vm, loading }) => ({ vm, loading }))
class VmManage extends PureComponent {

  state = {
    isCompanyNormal: undefined,   // 是否为企业普通员工，如果是，不具备操作VM的权限，只能查看
    isCompanyUser: false,         // 是否为企业管理员
    currentUserId: undefined,     // 当前用户Id

    policyHistoryFilters: {},     // 告警历史搜索条件
  }

  componentDidMount() {
    const { dispatch, match: { params: { vmId } } } = this.props
    dispatch({
      type: 'vm/getVmByVmId',
      payload: { vmId }
    }).then(() => {
      dispatch({
        type: 'vm/getNetworkList',
        payload: {}
      })
    })

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
    this.setState({
      isCompanyNormal: isCompanyNormalArr && isCompanyNormalArr.length > 0,
      isCompanyUser,
      currentUserId
    })

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

  componentDidUpdate(preProps) {
    const { dispatch, match: { params: { vmId } }, vm } = this.props
    const { vmInfo } = vm;
    const { vmInfo: old_vmInfo } = preProps.vm;
    const { currentUserId } = this.state;
    if (vmInfo && !isEqual(vmInfo, old_vmInfo)) {
      // 判断是否为Owner
      if (isEqual(Number(vmInfo.userId), currentUserId)) {
        dispatch({
          type: 'vm/getAlarmConfigsByVmId',
          payload: {
            vmId
          }
        })

        dispatch({
          type: 'vm/getIcSupportAlarmTypes'
        })

        dispatch({
          type: 'vm/queryAlarmEvent',
          payload: {
            vmId
          }
        })
      }
    }
  }

  callback = (key) => {
    const { dispatch, match: { params: { vmId } } } = this.props;
    switch (key) {
      case 'detail':
        dispatch({
          type: 'vm/getVmByVmId',
          payload: { vmId }
        })
        break;

      case 'monitor':
        dispatch({
          type: 'vm/queryVMPerformanceSummary',
          payload: { vmID: vmId }
        })

        const data = {
          vmID: vmId,
          startTime: moment().subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss'),
          endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        }

        dispatch({
          type: 'vm/queryPeriodPerformance',
          payload: data
        })
        break;
      case 'snapshot':
        dispatch({
          type: 'vm/getVMSnapshotList',
          payload: { vmID: vmId }
        })
        break;
      default:
        break;
    }
  }

  get detailProps() {
    const { dispatch, match: { params: { vmId } }, vm, loading } = this.props;
    const { vmInfo, deptList, groupList, networkList } = vm;
    const { isCompanyNormal, isCompanyUser, currentUserId } = this.state;

    return {
      isCompanyUser,
      currentUserId,
      isCompanyNormal,
      vmInfo,
      deptList,
      groupList,
      networkList,
      infoLoading: loading.effects['vm/getVmByVmId'],
      powerStatusLoading: loading.effects['vm/powerOnVM']
        || loading.effects['vm/powerOffVM']
        || loading.effects['vm/rebootVM']
        || loading.effects['vm/suspendVM'],
      powerControl: (data, type) => { // 虚拟机电源控制
        dispatch({
          type: `vm/${type}`,
          payload: data
        }).then(() => {
          dispatch({
            type: 'vm/getVmByVmId',
            payload: { vmId }
          })
        })
      },
      getRemoteUrlForUser: data => { // 获取虚拟机指定用户名的noVNC地址

        dispatch({
          type: 'vm/getConsoleForUser',
          payload: data
        }).then(response => {
          if (response.flag && response.resData) {
            copy(response.resData) && message.success(`成功获取用户 ${data.username} 远程连接地址`);
            window.open(response.resData, '_blank')
          } else {
            message.config({
              top: 100,
              duration: 2,
            });
            message.error(response.errMessage)
          }
        })
      },
      getRemoteUrl: data => { // 打开noVNC地址
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

  get monitorProps() {
    const { dispatch, match: { params: { vmId } }, vm, loading } = this.props;
    const { vmPerformanceSummary, vmChartsData } = vm;

    return {
      vmPerformanceSummary,
      vmChartsData,
      summaryLoading: loading.effects['vm/queryVMPerformanceSummary'],
      chartsLoading: loading.effects['vm/queryPeriodPerformance'],
      onSearch: values => {
        const data = {
          vmID: vmId,
          startTime: values.startTime,
          endTime: values.endTime
        }

        dispatch({
          type: 'vm/queryPeriodPerformance',
          payload: data
        })
      },
    }
  }

  get snapshotProps() {
    const { dispatch, match: { params: { vmId } }, vm, loading } = this.props;
    const { snapshotMdlVisible, snapshotList, snapshotPolicy, snapshotCfmMdlVisible, snapshotDetail, vmInfo } = vm;
    const { currentUserId } = this.state;

    return {
      isVmOwner: isEqual(Number(vmInfo.userId), currentUserId),
      onPolicyClick: () => {
        dispatch({
          type: 'vm/getPolicyByVmId',
          payload: {
            vmID: vmId
          },
        })
      },
      onDeleteAll: () => {
        dispatch({
          type: 'vm/deleteAllSnapshot',
          payload: {
            vmID: vmId
          },
        })
      },
      listProps: {
        dataSource: snapshotList,
        loading: loading.effects['vm/getVMSnapshotList'],
        onDeleteItem: (values) => {
          dispatch({
            type: 'vm/deleteSnapshot',
            payload: {
              ...values,
              vmID: vmId
            },
          }).then(() => {
            this.refreshSnapshotList()
          })
        },
        onRevertVM: (values) => {
          dispatch({
            type: 'vm/getVmInfoBySnapshotName',
            payload: values
          })
        }
      },
      modalProps: {
        snapshotPolicy,
        visible: snapshotMdlVisible,
        width: 600,
        destroyOnClose: true,
        maskClosable: false,  //点击蒙层是否允许关闭，默认 true
        confirmLoading: loading.effects['vm/updatePolicy'],
        title: '快照策略变更',
        centered: true,
        okText: '确认',
        cancelText: '取消',
        onOk: debounce(data => {
          dispatch({
            type: 'vm/updatePolicy',
            payload: {
              policy: data,
              vmId
            },
          })
        }, 500),
        onCancel() {
          dispatch({
            type: 'vm/hideSnapshotVmMdl',
          })
        },
      },
      cfmMdlProps: {
        snapshotDetail,
        visible: snapshotCfmMdlVisible,
        width: 1000,
        destroyOnClose: true,
        maskClosable: false,  //点击蒙层是否允许关闭，默认 true
        detailLoading: loading.effects['vm/getVmInfoBySnapshotName'],
        confirmLoading: loading.effects['vm/revertVM'],
        title: '回滚数据',
        centered: true,
        okText: '确认',
        cancelText: '取消',
        onOk: debounce(data => {
          dispatch({
            type: 'vm/revertVM',
            payload: {
              vmID: snapshotDetail.vmId,
              snapshotName: snapshotDetail.snapshotName
            },
          })
        }, 500),
        onCancel() {
          dispatch({
            type: 'vm/hideSnapshotCfmMdl',
          })
        },
      }
    }
  }

  refreshSnapshotList = () => {
    const { dispatch, match: { params: { vmId } } } = this.props
    dispatch({
      type: 'vm/getVMSnapshotList',
      payload: { vmID: vmId }
    })
  }

  get policyRuleProps() {
    const { dispatch, match: { params: { vmId } }, loading, vm } = this.props
    const { alarmConfigList, alarmTypes, policyMdlVisible, policyMdlType } = vm;

    return {
      onShowMdl: () => {
        dispatch({
          type: 'vm/showPolicyMdl',
          payload: {
            policyMdlType: 'create'
          }
        })
      },
      listProps: {
        dataSource: alarmConfigList,
        loading: loading.effects['vm/getAlarmConfigsByVmId'],
        pagination: false,
        onDeletePolicyRule: alarmId => {
          dispatch({
            type: 'vm/deleteAlarmConfig',
            payload: {
              vmId,
              alarmId
            },
          })
        },
        statusLoading: loading.effects['vm/addOrUpdatePolicy'],
        onChangeEnabled: values => {
          dispatch({
            type: 'vm/addOrUpdatePolicy',
            payload: {
              ...values,
              vmId
            },
          })
        }
      },
      modalProps: {
        alarmTypes,
        visible: policyMdlVisible,
        width: 800,
        destroyOnClose: true,
        maskClosable: false,  //点击蒙层是否允许关闭，默认 true
        confirmLoading: loading.effects['vm/addOrUpdatePolicy'],
        title: isEqual(policyMdlType, 'create') ? '新增告警策略' : '编辑告警策略',
        centered: true,
        okText: '确认',
        cancelText: '取消',
        onCheckPolicyName: (rule, value, callback) => {
          const { dispatch } = this.props
          if (value) {
            dispatch({
              type: 'vm/validateAlarmName',
              payload: {
                vmId,
                alarmName: value
              },
            }).then(response => {
              if (!response) {
                callback("名称已存在，请重新输入");
              } else {
                callback()
              }
            })
          } else {
            // Note: 必须总是返回一个 callback
            callback()
          }
        },
        onOk: debounce(data => {
          dispatch({
            type: 'vm/addOrUpdatePolicy',
            payload: {
              ...data,
              vmId
            },
          })
        }, 500),
        onCancel() {
          dispatch({
            type: 'vm/hidePolicyMdl',
          })
        },
      },
    }
  }

  get policyHistoryProps() {
    const { dispatch, match: { params: { vmId } }, loading, vm } = this.props
    const { alarmHistory, pagination } = vm;
    const { policyHistoryFilters } = this.state;

    return {
      filterProps: {
        filter: {
          ...policyHistoryFilters
        },
        setFormValues: values => {
          this.setState({
            policyHistoryFilters: values
          })
        },
        onSearch: values => {
          dispatch({
            type: 'vm/queryAlarmEvent',
            payload: {
              ...values,
              vmId
            },
          });
        },
      },
      listProps: {
        dataSource: alarmHistory,
        loading: loading.effects['vm/queryAlarmEvent'],
        pagination: {
          ...pagination,
          showSizeChanger: true,
        },
        onChange: (pagination, filters, sorter) => {
          this.handleTableChange(pagination, filters, sorter)
        },
      }
    }
  }

  handleTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { policyHistoryFilters } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...policyHistoryFilters,
      ...filters,
    };

    this.setState({
      filterValues: {
        ...policyHistoryFilters,
        ...filters,
      }
    })

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'vm/queryAlarmEvent',
      payload: params,
    });
  };

  render() {
    const { vmInfo } = this.props.vm;
    const { currentUserId } = this.state;
    const isVmOwner = isEqual(Number(vmInfo.userId), currentUserId);

    return (
      <Page inner className={styles.page}>
        <Breadcrumb style={{ marginBottom: '5px' }} separator=">">
          <Breadcrumb.Item>
            <Link to='/vm'>IC设计云</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>实例详情</Breadcrumb.Item>
        </Breadcrumb>

        <h2 className={styles.title}>{vmInfo && vmInfo.vmName}</h2>
        <Tabs onChange={this.callback} type="card">
          <TabPane tab="实例详情" key="detail">
            <Detail {...this.detailProps} />
          </TabPane>
          <TabPane tab="监控" key="monitor">
            <Monitor {...this.monitorProps} />
          </TabPane>
          <TabPane tab="数据快照" key="snapshot">
            <Snapshot {...this.snapshotProps} />
          </TabPane>
          {isVmOwner &&
            <TabPane tab="告警策略" key="policyRule">
              <PolicyRule {...this.policyRuleProps} />
            </TabPane>
          }
          {isVmOwner &&
            <TabPane tab="告警历史" key="policyHistory">
              <PolicyHistory {...this.policyHistoryProps} />
            </TabPane>
          }
        </Tabs>
      </Page>
    )
  }
}

export default VmManage
