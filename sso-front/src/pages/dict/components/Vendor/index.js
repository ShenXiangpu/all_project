import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import List from './components/List'
import Modal from './components/Modal'
import { Button } from 'antd'

class Vendor extends PureComponent {

  render() {
    const { listProps, modalProps, onShowModal } = this.props;

    return (
      <div>
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

        <List {...listProps} />
        <Modal {...modalProps} />
      </div>
    )
  }
}

Vendor.propTypes = {
  nodes: PropTypes.object,
  loading: PropTypes.object,
}

export default Vendor
