import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Row, Col, Skeleton, Card, List, Icon } from 'antd'
import withRouter from 'umi/withRouter';
import styles from './styles.less'
import router from 'umi/router'
import { stringify } from 'qs'
import RunSvg from 'assets/docker-vm/run.svg'
import StopSvg from 'assets/docker-vm/stop.svg'
import PauseSvg from 'assets/docker-vm/pause.svg'
import UpdateSvg from 'assets/docker-vm/update.svg'
import { isEqual } from 'lodash';
import Filter from './components/Filter'
import Charts from './components/Charts'
import moment from 'moment'
import RemoteModal from '../../components/RemoteModal'

const statusMap = [
  {
    status: 'active',
    icon: RunSvg,
    value: '运行中'
  },
  {
    status: 'inactive',
    icon: PauseSvg,
    value: '暂停'
  },
  {
    status: 'updating',
    icon: UpdateSvg,
    value: '更新中'
  }
];

@withRouter
@connect(({ dockerVm, loading }) => ({ dockerVm, loading }))
class Detail extends PureComponent {
  state = {
    vmInfos: {}
  }

  componentDidMount() {
    const { dispatch, location: { query }, dockerVm: { dockerVmInfo } } = this.props;

    //根据ID获取虚拟机信息，然后获取监控数据
    dispatch({
      type: 'dockerVm/getDockerInfoById',
      payload: {
        workloadId: query.workloadId
      }
    }).then(res => {
      if (res.flag) { //获取监控数据
        this.setStateValue(res.resData);

        const data = {
          fromTime: moment().subtract(1, 'hours').format('x'),
          toTime: moment().format('x'),
          workloadId: query.workloadId,
          projectId: res.resData.projectId
        }

        dispatch({
          type: 'dockerVm/getResourceUsage',
          payload: data
        })
      }
    })
  }

  setStateValue = (dockerVmInfo) => {
    const toolsStr = dockerVmInfo.containers[0].environment.TOOLS;
    const tools = toolsStr && JSON.parse(toolsStr);

    const toolInfo = tools;

    const vmInfo = [
      {
        key: 'id',
        name: 'ID',
        value: dockerVmInfo.id
      },
      {
        key: 'cpu',
        name: 'CPU',
        value: dockerVmInfo.containers[0].resources.requests.cpu
      },
      {
        key: 'memory',
        name: '内存',
        value: dockerVmInfo.containers[0].resources.requests.memory
      },
      {
        key: 'ssd',
        name: 'SSD',
        value: dockerVmInfo.containers[0].environment.HARDDISK
      },
      {
        key: 'network',
        name: '网络',
        value: dockerVmInfo.containers[0].environment.NETWORK
      }
    ];

    let portsValue = '';
    dockerVmInfo.containers[0].ports.map((element, index) => {
      if (index > 0) {
        portsValue = portsValue + element.containerPort + ':' + dockerVmInfo.publicEndpoints[index].port + '，'
      }
      return null;
    })

    const connectInfo = [
      {
        key: 'name',
        name: '主机名称',
        value: dockerVmInfo.name
      },
      {
        key: 'ip',
        name: 'IP',
        value: dockerVmInfo.publicEndpoints[0].addresses[0]
      },
      {
        key: '端口',
        name: 'ports',
        value: portsValue && portsValue.substring(0, portsValue.length - 1)
      },
    ]

    this.setState({
      vmInfos: {
        toolInfo,
        vmInfo,
        connectInfo
      }
    })
  }

  componentDidUpdate(preProps) {
    const { dockerVm: { dockerVmInfo: old_dockerVmInfo } } = preProps;
    const { dockerVm: { dockerVmInfo } } = this.props;

    if (dockerVmInfo && !isEqual(old_dockerVmInfo, dockerVmInfo)) {
      this.setStateValue(dockerVmInfo);
    }
  }

  onSearch = values => {
    const { dispatch, dockerVm: { dockerVmInfo } } = this.props;

    const data = {
      workloadId: dockerVmInfo.id,
      projectId: dockerVmInfo.projectId,
      fromTime: values.fromTime,
      toTime: values.toTime
    }

    dispatch({
      type: 'dockerVm/getResourceUsage',
      payload: data
    })
  }

  handleResourceClick = () => {
    const { dispatch, dockerVm: { dockerVmInfo }, location: { pathname } } = this.props;

    const data = {
      workloadId: dockerVmInfo.id,
      projectId: dockerVmInfo.projectId,
      timeSpan: '5m',  //初始默认值
    }
    dispatch({
      type: 'dockerVm/getResourceUsage',
      payload: data
    }).then(() => {
      const name = dockerVmInfo.containers && dockerVmInfo.containers.length > 0 ? dockerVmInfo.containers[0].name : '';
      const routerPath = `/docker-vm/${name}`;
      const params = stringify({
        workloadId: dockerVmInfo.id,
        projectId: dockerVmInfo.projectId,
      });

      const url = routerPath + '?' + params;
      const win = window.open(url, '_blank');
      win.focus();
    })
  }

  handleRemoteClick = () => {
    const { dispatch, dockerVm: { dockerVmInfo } } = this.props;
    const data = {
      workloadId: dockerVmInfo.id,
      projectId: dockerVmInfo.projectId
    }

    dispatch({
      type: 'dockerVm/getConsoleUrl',
      payload: data
    }).then((res) => {
      // if (res.flag) {
      //   const url = 'http://' + res.resData[0];
      //   window.open(url)
      // }

      dispatch({
        type: 'dockerVm/showRemoteModal',
        payload: {},
      })
    })
  }

  get remoteModalProps() {
    const { dispatch, dockerVm, loading } = this.props;
    const { remoteModalVisible, consoleUrl } = dockerVm;
    return {
      visible: remoteModalVisible,
      consoleUrl,
      loading: loading.effects['dockerVm/getConsoleUrl'],
      width: '60%',
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: '远程连接',
      maxmin: true,
      centered: true,
      footer: null,
      onCancel() {
        dispatch({
          type: 'dockerVm/hideRemoteModal'
        })
      },
    }
  }

  render() {
    const { loading, dockerVm: { dockerVmInfo, chartsData } } = this.props;
    const { vmInfos } = this.state;
    let listLoading = loading.effects['dockerVm/getDockerInfoById'];

    const status = dockerVmInfo && dockerVmInfo.state;
    const matchStatus = statusMap.filter(item => isEqual(item.status, status));

    return (
      <Row>
        <Col span={7}
          className={styles.col}
        >
          <Card
            type="inner"
            size="small"
            title="工具信息"
            extra={<a href="#" onClick={this.handleRemoteClick}>远程连接</a>}
          >
            <Skeleton loading={listLoading}>
              {vmInfos.toolInfo && vmInfos.toolInfo.map(item => {
                const edaTools = item.edaTools;

                const factoryImg = (company) => {
                  switch (company) {
                    case 'empyrean':
                      return <img src={require('assets/factory/huada.png')} alt="华大九天" style={{ height: '42px' }} />;
                    case 'synopsys':
                      return <img src={require('assets/factory/Synopsys.png')} alt="Synopsys" />;
                    case 'candence':
                      return <img src={require('assets/factory/Candence.png')} alt="Candence" />;
                    case 'mentor':
                      return <img src={require('assets/factory/mentor.png')} alt="Mentor" />;
                    default:
                      return null;
                  }
                }

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
                    <div style={{ marginBottom: '10px' }}>
                      <span>
                        {/* {factoryImg(item.company)} */}
                        <b>{item.company}</b>
                      </span>
                    </div>

                    {tools}
                  </div>
                )
              })}
            </Skeleton>
          </Card>

          <Card
            type="inner"
            size="small"
            title="虚拟机信息"
            style={{ marginTop: '10px' }}
          >
            <Skeleton loading={listLoading}>
              <List
                size="small"
                dataSource={vmInfos.vmInfo}
                renderItem={item =>
                  <List.Item>
                    <span className={styles.name}>{item.name}：</span>
                    <span>{item.value}</span>
                  </List.Item>
                }
              />
            </Skeleton>
          </Card>

          <Card
            type="inner"
            size="small"
            title="连接信息"
            style={{ marginTop: '10px' }}
          >
            <Skeleton loading={listLoading}>
              <List
                size="small"
                dataSource={vmInfos.connectInfo}
                renderItem={item =>
                  <List.Item>
                    <span className={styles.name}>{item.name}：</span>
                    <span>{item.value}</span>
                  </List.Item>
                }
              />
            </Skeleton>
          </Card>

        </Col>
        <Col span={17}>
          <Row>
            <Col span={14} className={styles.statusCol}>
              <Skeleton avatar paragraph={{ rows: 3 }} loading={listLoading}>
                <div className={styles.status}>
                  {matchStatus && matchStatus.length > 0 &&
                    <span className={styles.iconSpan}>
                      <Icon component={matchStatus[0].icon} style={{ fontSize: '48px' }} />
                      <span>{matchStatus[0].value}</span>
                    </span>
                  }
                </div>

                <div className={styles.otherInfo}>
                  <p>
                    <span className={styles.name}>网络类型：</span>
                    <span>专有网络</span>
                  </p>
                  <p>
                    <span className={styles.name}>付费方式：</span>
                    <span>包年包月</span>
                  </p>
                  <p>
                    <span className={styles.name}>到期时间：</span>
                    <span>2022年6月21日 23:59 到期</span>
                  </p>
                </div>
              </Skeleton>
            </Col>
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Col span={24}>
              <Filter onSearch={this.onSearch} handleResourceClick={this.handleResourceClick} />

              {chartsData && chartsData.length === 0 ?
                <p className={styles.description}>没有足够的数据绘制图表</p> :
                <Charts chartsData={chartsData} />
              }
            </Col>
          </Row>
        </Col>
        <RemoteModal {...this.remoteModalProps} />
      </Row>
    );
  }
}

export default Detail;
