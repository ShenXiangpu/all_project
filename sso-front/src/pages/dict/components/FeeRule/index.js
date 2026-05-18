import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import RuleList from './components/List'
import Modal from './components/Modal'
import { Button } from 'antd'

class FeeRule extends PureComponent {

  render() {
    const { listProps, modalProps, onShowModal } = this.props;

    return (
      <div style={{ width: '800px' }}>
        <Button
          style={{
            marginTop: 8,
            marginBottom: 8,
          }}
          type="primary"
          onClick={onShowModal}
          icon="plus"
        >
          新建
        </Button>

        <RuleList {...listProps} />
        <Modal {...modalProps} />
      </div>
    )
  }
}

FeeRule.propTypes = {
  FeeRule: PropTypes.object,
  loading: PropTypes.object,
}

export default FeeRule
