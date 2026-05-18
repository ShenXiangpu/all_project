import React, { PureComponent } from 'react'
import { Row, Col, Skeleton, Card, Spin, Icon, Divider, Button, Tooltip, Popconfirm } from 'antd'
import { Base64 } from 'js-base64';
import styles from './styles.less'
import router from 'umi/router'
import { stringify } from 'qs'
import RunSvg from 'assets/docker-vm/run.svg'
import StopSvg from 'assets/docker-vm/stop.svg'
import PauseSvg from 'assets/docker-vm/pause.svg'
import UpdateSvg from 'assets/docker-vm/update.svg'
import { isEqual } from 'lodash';
import GraySvg from 'assets/vm/gray.svg'
import GreenSvg from 'assets/vm/green.svg'
import YellowSvg from 'assets/vm/yellow.svg'
import RedSvg from 'assets/vm/red.svg'
import SafeSvg from 'assets/vm/safe.svg'

import PassWord from './components/PassWord'

const POWERSTATE = {
  'poweredOn': {
    text: '运行中',
    icon: 'check-circle',
    iconSvg: RunSvg,
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

const VMSTATE = {
  'gray': {
    text: '未知状态',
    iconSvg: GraySvg,
    color: '#aaaaaa'
  },
  'green': {
    text: '健康状态',
    iconSvg: GreenSvg,
    color: '#319400'
  },
  'yellow': {
    text: '亚健康状态',
    iconSvg: YellowSvg,
    color: '#faad14'
  },
  'red': {
    text: '危急状态',
    iconSvg: RedSvg,
    color: '#f5222d'
  },
}

class Detail extends PureComponent {
  state = {
    powerOperate: undefined,
    pwdVisible: false,            // 密码是否明文显示
  }

  handlePowerOn = (vmId, hostname, e) => {
    const { powerControl } = this.props;
    const data = {
      vmId,
      hostname
    }
    powerControl(data, 'powerOnVM');
    this.setPowerState('powerOnVM')
  }

  handleReboot = (vmId, e) => {
    const { powerControl } = this.props;
    const data = { vmId }
    powerControl(data, 'rebootVM');
    this.setPowerState('rebootVM')
  }

  handlePowerOff = (vmId, e) => {
    const { powerControl } = this.props;
    const data = { vmId }
    powerControl(data, 'powerOffVM');
    this.setPowerState('powerOffVM')
  }

  handleSuspend = (vmId, e) => {
    const { powerControl } = this.props;
    const data = { vmId }
    powerControl(data, 'suspendVM');
    this.setPowerState('suspendVM')
  }

  setPowerState = value => {
    this.setState({ powerOperate: value })
  }

  setPwdVisible = () => {
    const { pwdVisible } = this.state;
    this.setState({ pwdVisible: !pwdVisible });
  }

  setPwdVisible1 = (pwdVisible) => {
    pwdVisible = !pwdVisible
  }

  handleAlarmDetail = (vmId, e) => { }

  copyRemoteUrl = (name, e) => {
    const { vmInfo, getRemoteUrlForUser } = this.props;
    const vmId = vmInfo && vmInfo.vmId;

    if (vmId && name) {
      const data = {
        vmId,
        username: name,
      }
      getRemoteUrlForUser(data)
    }
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

  passShowFor = () => {

  }

  render() {
    const { vmInfo, infoLoading, powerStatusLoading, isCompanyUser, showUserInfo, currentUserId, deptList, groupList, networkList } = this.props;
    const toolsStr = vmInfo && vmInfo.tools;
    const toolInfo = toolsStr && JSON.parse(toolsStr);
    const { powerOperate, pwdVisible } = this.state;

    const userCountsToPwd = vmInfo && vmInfo.userCountsToPwd && Base64.decode(vmInfo.userCountsToPwd);
    const multiUsers = userCountsToPwd && JSON.parse(userCountsToPwd);


    // 多用户
    let MultiUserList = null;
    if (multiUsers && multiUsers.length > 0) {
      MultiUserList = multiUsers.map(item => {
        for (var key in item) {
          if (!isEqual(key, 'randomPwd') && !isEqual(key, 'userName') && !isEqual(key, 'userId')) {
            item.accountName = key;
            item.accountPwd = item[key];
          }
        }
        let pwdVisible = false

        return (
          <div key={item.accountName}>
            {item.userName &&
              <Row>
                <Col span={20} className={styles.list}>
                  <span className={styles.text}> <a href="#" onClick={e => showUserInfo(item.userId, e)}>{item.userName}</a></span>
                </Col>
              </Row>
            }
            <Row>
              <Col span={10} className={item.userName ? styles.mgleft : styles.list}>
                {/* <Icon type="user" style={{ marginRight: '2px' }} /> */}
                <span className={styles.text}>账号: {item.accountName}</span>
              </Col>
              <Col span={8}>

                <PassWord
                  item={item}
                />
              </Col>
              <Col span={6} style={{ textAlign: 'right' }}>
                <Tooltip placement="bottom" title={`复制用户 ${item.accountName} 远程连接地址并分享`}>
                  <a onClick={e => this.copyRemoteUrl(item.accountName, e)}><Icon type="copy" style={{ color: '#1890ff' }} /></a>
                </Tooltip>
              </Col>
            </Row>
          </div>
        )
      })
    }


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

    const pathname = `/vm/${vmInfo.vmId}/remoteConn`;
    // const pathname = `/vm/vm-643/remoteConn`;

    let powerOperateSpan = null;
    if (isEqual(Number(vmInfo.status), 0)) {
      if (isEqual(vmInfo.powerState, 'poweredOn')) {
        powerOperateSpan = (
          <span>
            <Popconfirm
              placement="bottomRight"
              title={<span>确定重启吗？<br />多用户使用的VM，对VM的电源操作会影响到所有用户</span>}
              okText="确定"
              cancelText="取消"
              onConfirm={e => this.handleReboot(vmInfo.vmId, e)}
            >
              <a href="#">重启</a>
            </Popconfirm>
            <Divider type="vertical" />
            <Popconfirm
              placement="bottomRight"
              title={<span>确定关机吗？<br />多用户使用的VM，对VM的电源操作会影响到所有用户</span>}
              okText="确定"
              cancelText="取消"
              onConfirm={e => this.handlePowerOff(vmInfo.vmId, e)}
            >
              <a href="#">关机</a>
            </Popconfirm>
          </span>
        )
      } else if (isEqual(vmInfo.powerState, 'poweredOff')) {
        powerOperateSpan = (
          <Popconfirm
            placement="bottomRight"
            title={<span> 确定开机吗？<br />多用户使用的VM，对VM的电源操作会影响到所有用户</span>}
            okText="确定"
            cancelText="取消"
            onConfirm={e => this.handlePowerOn(vmInfo.vmId, vmInfo.hostname, e)}
          >
            <a href="#">开机</a>
          </Popconfirm >
        )
      }
    }

    const list = isEqual(vmInfo.ifDept, 1) ? deptList : groupList;
    const arr = list.filter(item => item.id === Number(vmInfo.groupId));
    let groupName = '-';
    if (arr && arr.length > 0) {
      const item = arr[0];
      groupName = isEqual(vmInfo.ifDept, 1) ? item.deptName : item.groupName;
    }

    const networkArr = networkList.filter(item => item.id === vmInfo.netNameId);
    let networkName = '-';
    if (networkArr && networkArr.length > 0) {
      const item = networkArr[0];
      networkName = item.flavorName;
    }

    return (
      <Row>
        <Col span={6}
          className={styles.col}
        >
          <Card
            className={styles.card}
            size="small"
            title="工具信息"
          >
            <Skeleton loading={infoLoading}>
              {toolInfo && toolInfo.map(item => {
                const edaTools = item.edaTools;

                const tools = edaTools.map(ele => {
                  return (
                    <div key={ele.type}>
                      <p className={styles.name}>{ele.type}：</p>
                      {ele.tool_infos.map(t => (
                        <p className={styles.toolValue} key={t.tool_name}>{t.tool_name}[{t.tool_version}]</p>
                      ))}
                    </div>
                  )
                })

                return (
                  <div key={item.company} className={styles.toolDiv}>
                    <div className={styles.toolTitle}>
                      <span>
                        <b>{item.company}</b>
                      </span>
                    </div>

                    {tools}
                  </div>
                )
              })}
            </Skeleton>
          </Card>
        </Col>

        <Col span={12}
          className={styles.col}
        >
          <Card
            className={styles.card}
            size="small"
            title="基本信息"
            extra={isEqual(Number(vmInfo.userId), currentUserId) ? powerOperateSpan : null}
          >
            <Skeleton loading={infoLoading}>
              <div className={styles.detail}>
                <h2 className={styles.title}>
                  <span className={styles.left}>{vmInfo && vmInfo.vmName}</span>
                  {vmInfo && vmInfo.powerState &&
                    <div className={styles.right} >
                      <Spin spinning={powerStatusLoading ? true : false} tip={`正在${tip}...`}>
                        <div style={{ color: `${POWERSTATE[vmInfo.powerState].color}` }}>
                          <Icon type={POWERSTATE[vmInfo.powerState].icon} theme="filled" />
                          <span className={styles.text}>{POWERSTATE[vmInfo.powerState].text}</span>
                        </div>
                      </Spin>
                    </div>
                  }
                </h2>

                <div>
                  <Row>
                    <Col span={6}>实例ID</Col>
                    <Col span={12}>{vmInfo && vmInfo.vmId}</Col>
                    <Col span={6} style={{ textAlign: 'right' }}>
                      {/* {isEqual(Number(vmInfo.status), 0) && isEqual(vmInfo.powerState, 'poweredOn') &&
                        <Button type='primary' size="small">
                          <a href="#" onClick={e => this.remoteConnect(vmInfo.vmId, e)}>
                            远程连接
                          </a>
                        </Button>
                      }

                      {(!isEqual(Number(vmInfo.status), 0) || isEqual(vmInfo.powerState, 'poweredOff'))
                        &&
                        <Button type='primary' size="small" disabled>
                          远程连接
                        </Button>
                      } */}
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col span={6}>密码</Col>
                    <Col span={12}>
                      {pwdVisible ?
                        <span>
                          {vmInfo && vmInfo.password && Base64.decode(vmInfo.password)}
                        </span>
                        :
                        <span>{vmInfo && vmInfo.password && new Array(vmInfo.password.length).fill('*').toString().replace(/,/g, '')}</span>
                      }
                    </Col>
                    <Col span={6} style={{ textAlign: 'right' }}>
                      <a onClick={this.setPwdVisible}><Icon type={pwdVisible ? "eye" : "eye-invisible"} /></a>
                    </Col>
                  </Row> */}
                  <Row>
                    <Col span={6}>IP1</Col>
                    <Col span={12}>{vmInfo && vmInfo.ip}</Col>
                    <Col span={6} style={{ textAlign: 'right' }}></Col>
                  </Row>
                  <Row>
                    <Col span={6}>IP2</Col>
                    <Col span={12}>{vmInfo && vmInfo.ipInner}</Col>
                    <Col span={6} style={{ textAlign: 'right' }}></Col>
                  </Row>
                  <Row>
                    <Col span={6}>FTP地址</Col>
                    <Col span={12}>{vmInfo && vmInfo.ftp}</Col>
                    <Col span={6} style={{ textAlign: 'right' }}></Col>
                  </Row>
                  <Row>
                    <Col span={6}>网络带宽</Col>
                    <Col span={12}>{networkName}</Col>
                    <Col span={6} style={{ textAlign: 'right' }}></Col>
                  </Row>
                  <Row>
                    <Col span={6}>描述</Col>
                    <Col span={12}>{vmInfo && vmInfo.annotation}</Col>
                    <Col span={6} style={{ textAlign: 'right' }}></Col>
                  </Row>
                  <Row>
                    <Col span={6}>主机名</Col>
                    <Col span={12}>{vmInfo && vmInfo.hostname}</Col>
                    <Col span={6} style={{ textAlign: 'right' }}></Col>
                  </Row>
                  <Row>
                    <Col span={6}>创建时间</Col>
                    <Col span={12}>{vmInfo && vmInfo.createTime}</Col>
                    <Col span={6} style={{ textAlign: 'right' }}></Col>
                  </Row>
                  <Row>
                    <Col span={6}>到期时间</Col>
                    <Col span={12}>{vmInfo && vmInfo.expirationTime}</Col>
                    <Col span={6} style={{ textAlign: 'right' }}>
                      {/* <a>续费</a> */}
                    </Col>
                  </Row>
                  {vmInfo && isEqual(vmInfo.ifDept, 0) &&
                    <Row>
                      <Col span={6}>所属群组</Col>
                      <Col span={12}>{groupName}</Col>
                      <Col span={6} style={{ textAlign: 'right' }}></Col>
                    </Row>
                  }
                  {vmInfo && isEqual(vmInfo.ifDept, 1) &&
                    <>
                      <Row>
                        <Col span={6}>所属公司</Col>
                        <Col span={12}>{vmInfo && vmInfo.company}</Col>
                        <Col span={6} style={{ textAlign: 'right' }}></Col>
                      </Row>
                      <Row>
                        <Col span={6}>所属部门</Col>
                        <Col span={12}>{groupName}</Col>
                        <Col span={6} style={{ textAlign: 'right' }}></Col>
                      </Row>
                    </>
                  }
                  <Row>
                    <Col span={6}>创建用户</Col>
                    <Col span={12}>{vmInfo && vmInfo.user}</Col>
                    <Col span={6} style={{ textAlign: 'right' }}></Col>
                  </Row>
                  <Row>
                    <Col span={6}>多用户</Col>
                    <Col span={18} className={styles.multiUsers}>
                      {MultiUserList}
                    </Col>
                  </Row>
                </div>
                <Divider />
                <div>
                  <Row>
                    <Col span={6}>CPU</Col>
                    <Col span={12}>{vmInfo && vmInfo.cpu}  核</Col>
                    <Col span={6} style={{ textAlign: 'right' }}></Col>
                  </Row>
                  <Row>
                    <Col span={6}>内存</Col>
                    <Col span={12}>{vmInfo && vmInfo.memory && Number(vmInfo.memory / 1024)} G</Col>
                    <Col span={6} style={{ textAlign: 'right' }}></Col>
                  </Row>
                  <Row>
                    <Col span={6}>云盘</Col>
                    <Col span={12}>{vmInfo && vmInfo.disk && Number(vmInfo.disk / 1024)} G</Col>
                    <Col span={6} style={{ textAlign: 'right' }}></Col>
                  </Row>
                  <Row>
                    <Col span={6}>操作系统</Col>
                    <Col span={12}>{vmInfo && vmInfo.os}</Col>
                    <Col span={6} style={{ textAlign: 'right' }}></Col>
                  </Row>
                </div>
              </div>
            </Skeleton>
          </Card>

          <Card
            style={{ marginTop: '15px' }}
            size="small"
            title="付费信息"
            extra={
              <span>
                {/* <a href="#" >配置自动续费</a>
                <Divider type="vertical" /> */}
                {/* <a href="#" >查询消费明细</a> */}
              </span>
            }
          >
            <Skeleton loading={infoLoading}>
              <div className={styles.detail}>
                <Row>
                  <Col span={6}>付费类型</Col>
                  <Col span={12}>包年包月</Col>
                  <Col span={6} style={{ textAlign: 'right' }}></Col>
                </Row>
              </div>
            </Skeleton>
          </Card>
        </Col>

        <Col span={6}
          className={styles.col}
        >
          <Card
            size="small"
          >
            <Skeleton loading={infoLoading}>
              <div className={styles.flag}>
                <Row>
                  <Col span={12}>
                    <div style={{ marginBottom: '5px' }}><Icon component={SafeSvg} style={{ fontSize: '36px' }} /></div>
                    <span>安全防护状态</span>
                  </Col>
                  <Col span={12}>
                    {vmInfo && vmInfo.overallStatus &&
                      <div style={{ color: `${VMSTATE[vmInfo.overallStatus].color}` }}>
                        <div style={{ marginBottom: '5px' }}><Icon component={VMSTATE[vmInfo.overallStatus].iconSvg} style={{ fontSize: '36px' }} /></div>
                        <span>{VMSTATE[vmInfo.overallStatus].text}</span>
                      </div>
                    }
                  </Col>
                </Row>
              </div>
            </Skeleton>
          </Card>

          {/* 二期 */}
          {/* <Card
            style={{ marginTop: '15px' }}
            size="small"
            title="重要事件告警"
            extra={<a href="#" onClick={e => this.handleAlarmDetail(vmInfo.vmId, e)}>查看详情</a>}
          >
            <Skeleton loading={infoLoading}>
              <div className={styles.alarm}>
                <span>暂无重要事件告警信息</span>
              </div>
            </Skeleton>
          </Card> */}
        </Col>

      </Row >
    )
  }
}

export default Detail
