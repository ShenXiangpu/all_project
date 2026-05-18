import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import FlavorList from './components/List'
import Modal from './components/Modal'
import { Button } from 'antd'

class Flavor extends PureComponent {

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

        <FlavorList {...listProps} />
        <Modal {...modalProps} />
      </div>
    )
  }
}

export default Flavor
