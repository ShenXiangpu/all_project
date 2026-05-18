import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Divider, Icon, Spin, Popconfirm, Modal, message, Menu, Dropdown } from 'antd'
import Link from 'umi/link';
import styles from './List.less'
import { isEmpty, isEqual } from 'lodash';
import copy from 'copy-to-clipboard';
import classNames from 'classnames';

const { confirm } = Modal;

const POWERSTATE = {
  'poweredOn': {
    text: '运行中',
    icon: 'check-circle',
    color: '#319400'
  },
  'poweredOff': {
    text: '关机',
    icon: 'minus-circle',
    color: '#f5222d'
  },
  'suspended': {
    text: '挂起',
    icon: 'pause-circle',
    color: '#faad14'
  },
}

class List extends PureComponent {
  state = {
    powerOperate: undefined,
    vmId: undefined
  }

  handleDetailClick = (vmId, e) => {
    const { onGetDetailInfo } = this.props;
    const data = { vmId }
    onGetDetailInfo(data);
  }

  handleRemoteClick = (vmId, e) => {
    const { onShowRemoteModal } = this.props;
    const data = {
      vmID: vmId
    }
    onShowRemoteModal(data);
  }

  handlePowerOn = (vmId, hostname, e) => {
    confirm({
      title: '确定开机吗？',
      content: '多用户使用的云服务器，对云服务器的电源操作会影响到所有用户',
      onOk: () => {
        const { powerControl } = this.props;
        const data = {
          vmId,
          hostname
        }
        powerControl(data, 'powerOnVM');
        this.setPowerState('powerOnVM', vmId);
      },
    });
  }

  handleReboot = (vmId, e) => {
    confirm({
      title: '确定重启吗？',
      content: '多用户使用的云服务器，对云服务器的电源操作会影响到所有用户',
      onOk: () => {
        const { powerControl } = this.props;
        const data = { vmId }
        powerControl(data, 'rebootVM');
        this.setPowerState('rebootVM', vmId);
      },
    });
  }

  handlePowerOff = (vmId, e) => {
    confirm({
      title: '确定关机吗？',
      content: '多用户使用的云服务器，对云服务器的电源操作会影响到所有用户',
      onOk: () => {
        const { powerControl } = this.props;
        const data = { vmId }
        powerControl(data, 'powerOffVM');
        this.setPowerState('powerOffVM', vmId);
      },
    });
  }

  handleSuspend = (vmId, e) => {
    const { powerControl } = this.props;
    const data = { vmId }
    powerControl(data, 'suspendVM');
    this.setPowerState('suspendVM', vmId)
  }

  setPowerState = (value, id) => {
    this.setState({
      powerOperate: value,
      vmId: id
    })
  }

  handleShare = (vmId, e) => {
    const pathname = `/vm/${vmId}/remoteConn`;
    const origin = window.location.origin;
    const url = origin + pathname;
    copy(url) && message.success('获取分享地址成功');
  }

  remoteConnect = (vmId, e) => {
    const { getRemoteUrl } = this.props;
    if (vmId) {
      const data = {
        vmId,
        username: 'root',
      }
      getRemoteUrl(data)
    }
  }

  handleResetClick = (vmId, e) => {
    const { onShowResetVmModal } = this.props;
    onShowResetVmModal(vmId);
  }

  handleRechargeClick = (vmId, e) => {
    e.preventDefault();
    const { onShowRechargeModal } = this.props;
    onShowRechargeModal(vmId);
  }

  handleUsersClick = (record, e) => {
    e.preventDefault();
    const { onShowUsersModal } = this.props;
    const data = {
      groupId: record.groupId,
      vmId: record.vmId
    }
    onShowUsersModal(data);
  }

  render() {
    const { powerStatusLoading, isCompanyNormal, isCompanyUser, isCompanyPM, groupList, deptList, showUserInfo, currentUserId, ...tableProps } = this.props;
    const { powerOperate, vmId } = this.state;

    let tip = undefined;
    if (isEqual(powerOperate, 'powerOnVM')) {
      tip = '开机';
    } else if (isEqual(powerOperate, 'powerOffVM')) {
      tip = '关机';
    } else if (isEqual(powerOperate, 'rebootVM')) {
      tip = '重启';
    } else if (isEqual(powerOperate, 'suspendVM')) {
      tip = '挂起';
    }

    const columns = [
      {
        title: '实例ID',
        dataIndex: 'vmId',
        key: 'vmId',
        render: (text, record) => {
          // status 0:正常，1：已删除，2：创建中，3：创建失败，4：已到期，5：升降配中
          if (isEqual(Number(record.status), 2)) {
            return <span style={{ color: '#aaa' }}><Icon type="loading" style={{ marginRight: '2px' }} />创建中...</span>
          } else if (isEqual(Number(record.status), 5)) {
            return <span style={{ color: '#aaa' }}><Icon type="loading" style={{ marginRight: '2px' }} />调整配置中...</span>
          } else if (isEqual(Number(record.status), 3)) {
            return <span style={{ color: '#f5222d' }}>创建失败</span>
          } else if (isEqual(Number(record.status), 4)) {
            return (
              <span>
                <span>{text}</span>
                <label className={classNames(styles.lb, styles.orgColor)}>已到期</label>
              </span >
            );
          } else if (isEqual(Number(record.status), 6)) {
            return (
              <span>
                <span>{text}</span>
                <label className={styles.lb}>License 禁用中</label>
              </span>
            );
          } else if (isEqual(Number(record.status), 0)) {
            return text;
          }
        }
      },
      {
        title: '实例名称',
        dataIndex: 'vmName',
        key: 'vmName',
        render: (text, record) => {
          if (isEqual(Number(record.status), 2)) {
            return text;
          } else {
            return <a href="#" onClick={e => this.handleDetailClick(record.vmId, e)}>{text}</a>
          }
        }
      },
      {
        title: '主机名称',
        dataIndex: 'hostname',
        key: 'hostname',
      },
      {
        title: '电源状态',
        dataIndex: 'powerState',
        key: 'powerState',
        render: (text, record) => {
          if (powerStatusLoading && isEqual(record.vmId, vmId)) {
            return (
              <Spin spinning={powerStatusLoading ? true : false} tip={`正在${tip}...`}>
                <div style={{ color: `${POWERSTATE[text].color}` }}>
                  <Icon type={POWERSTATE[text].icon} theme="filled" />
                  <span style={{ marginLeft: '5px' }}>{POWERSTATE[text].text}</span>
                </div>
              </Spin>
            )
          } else if (text) {
            return (
              <div style={{ color: `${POWERSTATE[text].color}` }}>
                <Icon type={POWERSTATE[text].icon} theme="filled" />
                <span style={{ marginLeft: '5px' }}>{POWERSTATE[text].text}</span>
              </div>
            )
          } else {
            return text;
          }
        }
      },
      {
        title: '配置',
        dataIndex: 'cpu',
        key: 'cpu',
        render: (text, record) => <span>{record.cpu}核 {parseInt(record.memory / 1024)}G</span>
      },
      {
        title: '创建人',
        dataIndex: 'user',
        key: 'user',
        render: (text, record) => <a href="#" onClick={e => showUserInfo(record.userId, e)}>{text}</a>
      },
      {
        title: isCompanyUser ? '所属部门(群组)' : '所属群组',
        dataIndex: 'groupId',
        key: 'groupId',
        render: (text, record) => {
          const list = isEqual(record.ifDept, 1) ? deptList : groupList;
          const arr = list.filter(item => item.id === Number(text));
          let name = '-';
          if (arr && arr.length > 0) {
            const item = arr[0];
            name = isEqual(record.ifDept, 1) ? item.deptName : item.groupName;
          }
          return name;
        }
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '操作',
        key: 'operation',
        width: 90,
        render: (text, record) => {
          if (isEqual(Number(record.status), 2)) {
            return null;
          } else {
            const isOwner = isEqual(Number(record.userId), currentUserId);

            const menu = (
              <Menu>
                <Menu.Item>
                  {(isEqual(Number(record.status), 0) || isEqual(Number(record.status), 6)) && isEqual(record.powerState, 'poweredOn') ?
                    <a href="#" onClick={e => this.handleReboot(record.vmId, e)}>重启</a>
                    :
                    <span className={styles.notAllowed}>重启</span>
                  }
                </Menu.Item>
                <Menu.Item>
                  {(isEqual(Number(record.status), 0) || isEqual(Number(record.status), 6)) && isEqual(record.powerState, 'poweredOff') ?
                    <a href="#" onClick={e => this.handlePowerOn(record.vmId, record.hostname, e)}>开机</a>
                    :
                    <span className={styles.notAllowed}>开机</span>
                  }
                </Menu.Item>
                <Menu.Item>
                  {(isEqual(Number(record.status), 0) || isEqual(Number(record.status), 6)) && isEqual(record.powerState, 'poweredOn') ?
                    <a href="#" onClick={e => this.handlePowerOff(record.vmId, e)}>关机</a>
                    :
                    <span className={styles.notAllowed}>关机</span>
                  }
                </Menu.Item>
                <Menu.Item>
                  {isEqual(Number(record.status), 0) && (record.ifDept === 0 ? isEmpty(record.groupId) : isOwner) ?
                    <a href="#" onClick={e => this.handleResetClick(record.vmId, e)}>调整配置</a>
                    :
                    <span className={styles.notAllowed}>调整配置</span>
                  }
                </Menu.Item>
                <Menu.Item>
                  {(isEqual(Number(record.status), 0) || isEqual(Number(record.status), 6)) ?
                    <a href="#" onClick={e => this.handleUsersClick(record, e)}>多用户</a>
                    :
                    <span className={styles.notAllowed}>多用户</span>
                  }
                </Menu.Item>
              </Menu>
            )


            const ListOptions = (
              <div id={record.vmId}>
                {/* {
                  isEqual(Number(record.status), 0) && isEqual(record.powerState, 'poweredOn') &&
                  <span>
                    <a href="#" onClick={e => this.remoteConnect(record.vmId, e)}>
                      远程连接
                    </a>
                    <Divider type="vertical" />
                  </span>
                } */}

                {
                  (!isEqual(Number(record.status), 0) && !isEqual(Number(record.status), 4) && !isEqual(Number(record.status), 6) || isCompanyPM)
                  &&
                  <span>
                    <span className={styles.notAllowed}>
                      续费
                    </span>
                    <Divider type="vertical" />
                  </span>
                }

                {(isEqual(Number(record.status), 0) || isEqual(Number(record.status), 4) || isEqual(Number(record.status), 6)) && !isCompanyPM &&
                  <span>
                    <a href="#" onClick={e => this.handleRechargeClick(record.vmId, e)}>
                      续费
                    </a>
                    <Divider type="vertical" />
                  </span>
                }

                <Dropdown
                  overlay={menu}
                  getPopupContainer={() => document.getElementById(record.vmId)}
                >
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    更多 <Icon type="down" />
                  </a>
                </Dropdown>
              </div >
            );

            return isOwner || (isEqual(record.ifDept, 1) && isCompanyPM) ? ListOptions : '-';
          }
        },
      },
    ]

    if (isCompanyNormal && !isCompanyPM) {
      columns.splice(columns.length - 1, 1);
    }

    return (
      <Table
        {...tableProps}
        className={styles.table}
        bordered
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
