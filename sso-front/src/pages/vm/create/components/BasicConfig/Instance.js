import React, { PureComponent } from 'react'
import InstanceFilter from "./InstanceFilter";
import InstanceList from "./InstanceList";

class Instance extends PureComponent {
  render() {
    const { filterProps, listProps } = this.props;

    return (
      <>
        <InstanceFilter {...filterProps} />
        <InstanceList {...listProps} />
      </>
    )
  }
}
export default Instance
