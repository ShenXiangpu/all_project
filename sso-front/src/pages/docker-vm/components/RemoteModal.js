import React, { PureComponent } from 'react'
import { Modal, Button, Tooltip, Icon, Spin } from 'antd'
import classnames from 'classnames'
import styles from './RemoteModal.less'

class RemoteModal extends PureComponent {

  state = {
    max: false,
  };

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
    const { consoleUrl, loading, ...modalProps } = this.props
    const { max } = this.state

    const url = 'http://' + consoleUrl;

    return (
      <Modal
        {...modalProps}
        className={styles.modal}
        title={this.titleRender()}
        getContainer={
          (document.querySelector(
            '.ant-tabs-tabpane.ant-tabs-tabpane-active',
          ))}
      >
        <Spin spinning={loading}>
          <div className={max ? classnames(styles.iframeContainer, styles.showMax) : styles.iframeContainer}>
            <iframe
              title="remote"
              src={url}
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="auto"
              leftmargin="0"
              topmargin="0">
            </iframe>
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
