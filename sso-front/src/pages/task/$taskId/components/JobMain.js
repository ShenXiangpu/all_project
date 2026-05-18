import React, { PureComponent } from 'react';
import { Empty, Spin } from 'antd'
import JobList from './JobList';
import InOutMain from './InOutMain';
import styles from './JobMain.less'
import { isEqual } from 'lodash';

class JobMain extends PureComponent {
  state = {
    selectedRecord: {},
    tabActiveKey: 'subTask'
  };

  componentDidMount() {
    const { dataSource, onGetSubTask, onSetTaskVersion, jobId } = this.props.listProps;
    if (dataSource && dataSource.length > 0) {
      const item = dataSource[0];
      if (!isEqual(item.jobId, jobId)) {
        const data = {
          taskId: item.taskId,
          jobId: item.jobId
        }
        onGetSubTask(data);
        this.setState({ selectedRecord: item })
        onSetTaskVersion(item.jobId);
      }
    }
  }

  componentDidUpdate(preProps) {
    const { dataSource, onGetSubTask, onGetLog, onGetOuts, onGetIns, onSetTaskVersion, jobId } = this.props.listProps;
    const { dataSource: old_dataSource } = preProps.listProps;
    if (dataSource && dataSource.length > 0 && !isEqual(dataSource, old_dataSource)) {
      const item = dataSource[0];
      if (!isEqual(item.jobId, jobId)) {
        const data = {
          taskId: item.taskId,
          jobId: item.jobId
        }
        onGetSubTask(data);
        this.setState({ selectedRecord: item })

        // onGetIns(data);
        // onGetLog(data);
        onSetTaskVersion(item.jobId);
      }
    }
  }

  onSetSelectedRecord = item => {
    const { onSetTaskVersion } = this.props.listProps;
    this.setState({ selectedRecord: item })
    onSetTaskVersion(item.jobId);
    this.setState({ tabActiveKey: 'subTask' })
  }

  setActiveTabKey = key => {
    this.setState({ tabActiveKey: key })
  }

  render() {
    const { listProps, resultProps } = this.props
    const { dataSource, versionLoading } = listProps;
    const { selectedRecord, tabActiveKey } = this.state;

    return (
      <Spin spinning={versionLoading}>
        {dataSource && dataSource.length > 0 ?
          <div className={styles.vMain}>
            <div className={styles.left}>
              <JobList {...listProps} selectedRecord={selectedRecord} onSetSelectedRecord={this.onSetSelectedRecord} />
            </div>
            <div className={styles.right}>
              <InOutMain {...resultProps} tabActiveKey={tabActiveKey} setActiveTabKey={this.setActiveTabKey} />
            </div>
          </div>
          :
          <Empty description="暂无执行记录" />
        }
      </Spin>
    )
  }
}

export default JobMain
