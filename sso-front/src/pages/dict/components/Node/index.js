import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import NodeList from './components/List'
import Modal from './components/Modal'
import { Button } from 'antd'

class Nodes extends PureComponent {

  render() {
    const { listProps, modalProps, onShowModal } = this.props;

    return (
      <div style={{ width: '400px' }}>
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

        <NodeList {...listProps} />
        <Modal {...modalProps} />
      </div>
    )
  }
}

Nodes.propTypes = {
  nodes: PropTypes.object,
  loading: PropTypes.object,
}

export default Nodes
