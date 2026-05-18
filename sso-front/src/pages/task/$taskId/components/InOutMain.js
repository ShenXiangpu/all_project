import React, { PureComponent } from 'react';
import { Tabs, Button } from 'antd';
import isEqual from 'lodash.isequal';
import SubTaskList from './SubTaskList';
import ConsoleLog from './ConsoleLog';
import styles from './InOutMain.less'

const { TabPane } = Tabs;

class InOutMain extends PureComponent {

  handleTabChange = key => {
    const { logProps: { onGetTaskJobLog, closeLogConnect }, setActiveTabKey } = this.props;
    setActiveTabKey(key);
    if (isEqual(key, 'log')) {
      // 查看主任务日志 job
      onGetTaskJobLog();
    } else {
      // 断开主任务日志ws 连接
      closeLogConnect();
    }
  }

  render() {
    const { version, tabActiveKey, subTaskListProps, logProps, currentJob, cancelBtnLoading, onCancelJob, outProps, inProps } = this.props;

    const operations = currentJob && (isEqual(currentJob.jobStatus, 'RUNNING') || isEqual(currentJob.jobStatus, 'PENDING')) ?
      <Button type="primary" ghost loading={cancelBtnLoading} onClick={onCancelJob}> 取消执行</Button > : null;

    return (
      <>
        <h3>版本：#{version}</h3>
        <Tabs
          defaultActiveKey="subTask"
          activeKey={tabActiveKey}
          className={styles.tab}
          type="card"
          tabBarExtraContent={operations}
          onChange={this.handleTabChange}
        >
          <TabPane tab="子任务列表" key="subTask">
            <SubTaskList {...subTaskListProps} />
          </TabPane>
          <TabPane tab="主任务日志" key="log">
            <ConsoleLog {...logProps} />
          </TabPane>
          {/* <TabPane tab="输出" key="out">
            <OutList {...outProps} />
          </TabPane>
          <TabPane tab="输入" key="in">
            <p style={{ backgroundColor: '#f0f8ff', padding: '3px' }}>支持编辑后重新提交任务,并再次执行。</p>
            <InList {...inProps} />
          </TabPane> */}
        </Tabs>
      </>
    )
  }
}

export default InOutMain
