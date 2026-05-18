import React, { PureComponent } from 'react'
import { Table, Badge, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import styles from './JobList.less'
import isEqual from 'lodash.isequal';

const STATUS = {
  'FAILED': 'error',
  'COMPLETED': 'success',
  'RUNNING': 'processing',
  'PENDING': 'warning',
  'CANCELLED':'default'
}

class JobList extends PureComponent {
  state = {
    searchText: '',
  };

  handleRowClick = (e, record) => {
    e.preventDefault();
    const { onGetSubTask, onGetLog, onGetOuts, onGetIns, onSetSelectedRecord, jobId } = this.props;
    if (record.jobId !== jobId) {
      const data = {
        taskId: record.taskId,
        jobId: record.jobId
      }

      onGetSubTask(data);

      // if (record && record.jobName && record.jobName.startsWith('zkxy')) {
      //   const taskPathData = {
      //     taskPathId: record.taskOutput
      //   }
      //   onGetOuts(taskPathData, 1);  // 云平台
      // } else if (record && record.jobId) {
      //   const jobId = {
      //     jobId: record.jobId
      //   }
      //   onGetOuts(jobId, 2);  // 超算
      // }

      // onGetIns(data);
      // onGetLog(data);
      onSetSelectedRecord(record);
    }
  }

  getColumnSearchProps = () => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder='根据版本查询'
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          查询
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          重置
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record.version
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
    (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  columns = [
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
      width: '30%',
      ...this.getColumnSearchProps(),
      render: (text, record) => (
        <a href="#" title={record.jobStatus}>
          <Badge className={styles.badge} status={STATUS[record.jobStatus]} />
          #{text}
        </a>
      )
    },
    {
      title: '时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: text => <span className={styles.time}>{text}</span>
    }
  ]

  render() {
    const { versionLoading, dataSource } = this.props;
    const { selectedRecord } = this.props;

    return (
      <div id='tb'>
        <Table
          size="small"
          dataSource={dataSource}
          loading={versionLoading}
          columns={this.columns}
          pagination={false}
          rowKey={record => record.id}
          scroll={{ y: 560 }}
          getPopupContainer={() => document.getElementById('tb')}
          onRow={record => {
            return {
              onClick: event => this.handleRowClick(event, record), // 点击行
            };
          }}
          rowClassName={(record, rowIndex) => (record.version === selectedRecord.version ? 'ant-table-row-selected' : '')}
        />
      </div>
    )
  }
}

export default JobList
