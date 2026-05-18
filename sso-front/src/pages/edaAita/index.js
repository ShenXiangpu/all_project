import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { Button, Tooltip } from 'antd'
import styles from './style.less'

/**
 * EDA远程可视化
 */
class RemoteVisualization extends PureComponent {

  state = {
    max: false,
  };

  changeSize = () => {
    this.setState({
      max: !this.state.max,
    })
  }

  render() {
    const { max } = this.state

    return (
      <div className={max ? classnames(styles.iframeContainer, styles.showMax) : styles.iframeContainer}>
        <iframe
          title="remote"
          src="https://eda.aita.fun/"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="Auto"
          leftmargin="0"
          topmargin="0">
        </iframe>
        <div className={classnames(styles.logControl, styles.logTopControl)}>
          <Tooltip placement="bottom" title={max ? '退出全屏' : '全屏'}>
            <Button type="ghost"
              onClick={this.changeSize}
              style={{ marginLeft: '20px' }}
              icon={max ? 'fullscreen-exit' : 'fullscreen'}
            />
          </Tooltip>
        </div>
      </div>
    )
  }
}

export default RemoteVisualization
