import React, { PureComponent } from 'react'
import { Button, Icon, Tooltip, message } from 'antd'
import classnames from 'classnames'
import { connect } from 'dva';
import { isEqual } from 'lodash';
import copy from 'copy-to-clipboard';
import styles from './remoteConn.less';

const WMKS = window.WMKS;

let wmks;
@connect(({ app, vm, loading }) => ({ app, vm, loading }))
class RemoteConnection extends PureComponent {

  state = {
    isFullScreen: false,
  };

  constructor(props) {
    super(props);
    this.wmksContainer = React.createRef();
  }

  componentDidMount() {
    const { dispatch, match: { params: { vmId } } } = this.props
    dispatch({
      type: 'vm/getConsole',
      payload: { vmID: vmId }
    })
  }

  handleShare = () => {
    const url = window.location.href;
    copy(url) && message.success('获取分享地址成功');
  }

  changeSize = () => {
    const { isFullScreen } = this.state;
    if (wmks.canFullScreen()) {
      // const isFullScreen = wmks.isFullScreen();
      if (isFullScreen) {
        wmks.exitFullScreen();  // F11 全屏
      } else {
        wmks.enterFullScreen(); // 退出全屏
      }

      this.setState({
        isFullScreen: !isFullScreen,
      })

    } else {
      message.error('不支持全屏模式');
    }
  }

  componentDidUpdate(preProps) {
    const { remoteConn } = this.props.vm;
    const { remoteConn: old_remoteConn } = preProps.vm;

    if (remoteConn && !isEqual(remoteConn, old_remoteConn)) {
      const divNode = this.wmksContainer.current;
      console.log(WMKS);
      if (divNode) {
        wmks = WMKS.createWMKS("wmksContainer", {
          retryConnectionInterval: 300,  // 重新尝试连接的间隔（毫秒）
        }).register(WMKS.CONST.Events.CONNECTION_STATE_CHANGE,
          function (event, data) {
            if (data.state == WMKS.CONST.ConnectionState.CONNECTED) {
              console.log("connection state change : connected");
            }
          });

        // 内网
        // const url = `wss://${remoteConn.host}:${remoteConn.port}/ticket/${remoteConn.ticket}`;

        // 外网
        const host = remoteConn.host;
        const url = `wss://dev.chip-cloud.com:30500/wss/${host}/${remoteConn.ticket}`;

        wmks.connect(url);
        const isFullScreen = wmks.isFullScreen();
        this.setState({
          isFullScreen
        })
      }
    }
  }

  render() {
    const { isFullScreen } = this.state;

    return (
      <div
        id="wmksContainer"
        ref={this.wmksContainer}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      >
        <div className={classnames(styles.logControl, styles.logTopControl)}>
          <Button type="ghost"
            onClick={this.changeSize}
          >
            {isFullScreen ? '退出全屏' : '全屏'}
            <Icon type={isFullScreen ? 'fullscreen-exit' : 'fullscreen'} />
          </Button>

          {/* <Tooltip placement="bottom" title='复制远程连接地址进行分享'>
            <Button type="ghost"
              onClick={this.handleShare}
              style={{ marginLeft: 10 }}
            >
              分享
              <Icon type="share-alt" />
            </Button>
          </Tooltip> */}
        </div>
      </div >
    )
  }
}

export default RemoteConnection
