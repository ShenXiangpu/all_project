/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Icon, Modal } from 'antd'
import styles from './Filter.less'
import router from 'umi/router';

const { Search } = Input;
const { confirm } = Modal;

class Filter extends Component {

  handleSubmit = (value) => {
    const { onSearch, setFormValues } = this.props;
    const data = {
      keyWord: value
    }
    setFormValues(data);
    onSearch(data);
  }

  handleDownload = e => {
    e.preventDefault();
    const { onDownloadTemplate } = this.props;
    onDownloadTemplate();
  }

  handleShowExlModal = e => {
    e.preventDefault();
    const { onShowExlModal } = this.props;
    onShowExlModal();
  }

  // 账号相关操作
  handleAccount = (key, e) => {
    const { vmIds, onReleaseAll, onRelease, onShowRechargeModal, selectedUserKeys, onToCreateVM, selectedUsers } = this.props;
    e.preventDefault();
    if (vmIds && vmIds.length > 0) {
      switch (key) {
        case 'releaseAll': //一键注销
          confirm({
            title: '确定一键注销？',
            content: '一键注销后群组内所有用户关联的IC设计云服务器账号将被移除。',
            width: 500,
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
              onReleaseAll();
            }
          });
          break;
        case 'release':
          if (selectedUserKeys && selectedUserKeys.length > 0) {
            const arr = [];
            selectedUsers.map(item => {
              arr.push(item.userName);
            })

            const tip = (
              <div>
                <p>当前所选用户：{arr.join(' ')}</p>
                <p>注意：注销后所选用户关联的IC设计云服务器账号将被移除。</p>
              </div>
            )

            confirm({
              title: '确定注销所选用户的IC设计云服务器账号？',
              content: tip,
              width: 500,
              okText: '确认',
              cancelText: '取消',
              onOk: () => {
                onRelease();
              }
            });
          } else {
            Modal.info({
              title: '请选择用户',
            });
          }
          break;
        case 'addAccount':
          if (selectedUserKeys && selectedUserKeys.length > 0) {
            this.handleAdd();
          } else {
            Modal.info({
              title: '请选择用户',
            });
          }
          break;
        case 'accountDelay':
          if (selectedUserKeys && selectedUserKeys.length > 0) {
            onShowRechargeModal();
          } else {
            Modal.info({
              title: '请选择用户',
            });
          }
          break;
      }
    } else {
      confirm({
        title: '当前群组下尚未创建IC设计云服务器',
        content: '由于当前群组尚未创建IC设计云服务器，群组内成员并未关联服务器账号。',
        width: 500,
        okText: '立即创建IC设计云服务器',
        cancelText: '取消',
        onOk: () => {
          onToCreateVM();
        }
      });
    }
  }

  handleAdd = () => {
    const { onAddUserCounts, selectedUsers } = this.props;
    const arr = [];
    selectedUsers.map(item => {
      arr.push(item.userName);
    })

    const tip = (
      <div>
        <p>当前所选用户：{arr.join(' ')}</p>
        <div style={{ fontSize: 12 }}>
          <p style={{ marginBottom: 0 }}>注意：</p>
          <p style={{ marginBottom: 0 }}>1. 如果当前群组内尚未创建IC设计云服务器，则无法关联服务器进行创建账号。</p>
          <p style={{ marginBottom: 0 }}>2. 如果所选用户已存在IC设计云账号，不会重复创建。</p>
          <p>3. 如果所有IC设计云服务器账号已满，需要再次创建服务器添加账号。</p>
        </div>
      </div>
    );

    confirm({
      title: '确定为所选用户创建IC设计云账号？',
      content: tip,
      okText: '确定',
      cancelText: '取消',
      width: 560,
      onOk: () => {
        onAddUserCounts();
      },
    })
  }

  render() {
    const { addUserCountsLoading, onAdd, selectedUserKeys, releaseAllLoading, releaseLoading } = this.props

    return (
      <div style={{ marginBottom: 2 }}>
        <p>
          <Search
            placeholder="请输入关键字进行查询"
            onSearch={this.handleSubmit}
            enterButton="查询"
            style={{ width: '400px' }}
          />
          <Button
            type="primary"
            onClick={onAdd}
            style={{ marginLeft: 16 }}
            icon="user-add"
            className={styles.btn}
          >
            添加用户
          </Button>
          <Button
            type="danger"
            style={{ float: 'right' }}
            onClick={e => this.handleAccount('releaseAll', e)}
            loading={releaseAllLoading}
          >
            一键注销
          </Button>
        </p>
        <p>
          <Button
            type="primary"
            ghost
            onClick={e => this.handleAccount('addAccount', e)}
            loading={addUserCountsLoading}
          >
            创建账号
          </Button>
          <Button
            type="primary"
            ghost
            style={{ marginLeft: 16 }}
            onClick={e => this.handleAccount('accountDelay', e)}
          >
            账号延期
          </Button>
          <Button
            type="danger"
            ghost
            style={{ marginLeft: 16 }}
            onClick={e => this.handleAccount('release', e)}
            loading={releaseLoading}
          >
            注销账号
          </Button>
        </p>
        <div className={styles.excelP}>
          <span className={styles.left}>
            <Icon type="info-circle" />新用户默认初始密码为：123456abc!
          </span>
          <span className={styles.right}>
            <a href='#' onClick={e => this.handleDownload(e)}>下载Excel模板</a>
            <a href='#' style={{ marginLeft: 10 }} onClick={e => this.handleShowExlModal(e)}>Excel导入成员</a>
          </span>
        </div>
      </div>
    )
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  setFormValues: PropTypes.func,
  onSearch: PropTypes.func,
}

export default Filter
