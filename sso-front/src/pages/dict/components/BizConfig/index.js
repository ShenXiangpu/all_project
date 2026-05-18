import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import BizConfigList from './components/List'

class BizConfig extends PureComponent {

  render() {
    const { listProps } = this.props;

    return (
      <div>
        <BizConfigList {...listProps} />
      </div>
    )
  }
}

export default BizConfig
