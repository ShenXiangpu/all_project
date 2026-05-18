import React, { PureComponent } from 'react'
import { Modal, Button, Tooltip, Icon, Spin, Input } from 'antd'
import classnames from 'classnames'
import styles from './RemoteModal.less'
import { isEqual } from 'lodash';

const WMKS = window.WMKS;

class RemoteModal extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      max: false,
    };
    this.wmksContainer = React.createRef();
  }

  componentDidUpdate(preProps) {
    const { visible, remoteConn } = this.props;
    const { visible: old_visible } = preProps;

    if (remoteConn && visible && !isEqual(visible, old_visible)) {
      const divNode = this.wmksContainer.current;
      if (divNode) {
        const wmks = WMKS.createWMKS("wmksContainer", {}).register(WMKS.CONST.Events.CONNECTION_STATE_CHANGE,
          function (event, data) {
            if (data.state == WMKS.CONST.ConnectionState.CONNECTED) {
              console.log("connection state change : connected");
            }
          });
        const url = `wss://${remoteConn.host}:${remoteConn.port}/ticket/${remoteConn.ticket}`
        wmks.connect(url);
      }
    }
  }

  changeSize = () => {
    this.setState({
      max: !this.state.max,
    })
  }

  titleRender = () => {
    const { title, maxmin } = this.props;
    const { max } = this.state;

    return (
      <>
        {title}
        {maxmin && (
          <button
            type="button"
            className="ant-modal-close"
            style={{ right: 42 }}
            onClick={this.changeSize}
          >
            <span className="ant-modal-close-x">
              <Icon className="ant-modal-close-icon" type={max ? 'shrink' : 'arrows-alt'} />
            </span>
          </button>
        )}
      </>
    );
  };

  render() {
    const { loading, ...modalProps } = this.props
    const { max } = this.state

    return (
      <Modal
        {...modalProps}
        forceRender={true}  // 强制渲染，解决取 ref 或 dom 值为 null 的问题
        className={styles.modal}
        title={this.titleRender()}
        getContainer={
          (document.querySelector(
            '.ant-tabs-tabpane.ant-tabs-tabpane-active',
          ))}
      >

        <Spin spinning={loading}>
          <div className={max ? classnames(styles.iframeContainer, styles.showMax) : styles.iframeContainer}>
            <div
              id="wmksContainer"
              ref={this.wmksContainer}
            // style={{ position: 'absolute', width: '100%', height: '300px' }}
            >
            </div>

            {max && <div className={classnames(styles.logControl, styles.logTopControl)}>
              <Tooltip placement="bottom" title={max ? '退出全屏' : '全屏'}>
                <Button type="ghost"
                  onClick={this.changeSize}
                  style={{ marginLeft: '20px' }}
                  icon={max ? 'fullscreen-exit' : 'fullscreen'}
                />
              </Tooltip>
            </div>}
          </div>
        </Spin>
      </Modal >
    )
  }
}

export default RemoteModal
