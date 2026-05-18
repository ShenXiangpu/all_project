import React, { PureComponent } from 'react'
import { Collapse, Icon, Table } from 'antd'
import styles from './CollapsePanel.less'

const { Panel } = Collapse;

class CollapsePanel extends PureComponent {


  render() {
    const { title, style, ...tableProps } = this.props;

    return (
      <Collapse
        bordered={false}
        expandIconPosition="right"
        expandIcon={({ isActive }) => <Icon type="caret-right" style={{ fontSize: 18 }} rotate={isActive ? 90 : 0} />}
        className={styles.collapse}
        style={style}
        defaultActiveKey={['1']}
      >
        <Panel header={title} key="1">
          <Table
            size="small"
            pagination={false}
            bordered={false}
            showHeader={false}
            {...tableProps}
          />
        </Panel>
      </Collapse>
    )
  }
}

export default CollapsePanel
