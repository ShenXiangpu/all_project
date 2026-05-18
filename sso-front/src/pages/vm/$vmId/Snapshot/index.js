import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm, message } from 'antd'
import Page from 'components/Page'
import List from './components/List'
import Modal from './components/Modal'
import ConfirmModal from './components/ConfirmModal'
import debounce from 'lodash/debounce'

class Snapshot extends PureComponent {

  render() {
    const { onPolicyClick, onDeleteAll, modalProps, listProps, cfmMdlProps, isVmOwner } = this.props;

    return (
      <div>
        {isVmOwner &&
          <Row style={{ marginBottom: '16px', textAlign: 'right' }}>
            <Button type="primary" onClick={onPolicyClick} style={{ marginRight: '16px' }}>
              快照策略变更
            </Button>

            <Button type="danger" ghost onClick={onDeleteAll}>
              删除全部快照
            </Button>
          </Row>
        }
        <List isVmOwner={isVmOwner} {...listProps} />
        <Modal {...modalProps} />
        <ConfirmModal {...cfmMdlProps} />
      </div>
    )
  }
}

Snapshot.propTypes = {
  group: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Snapshot
