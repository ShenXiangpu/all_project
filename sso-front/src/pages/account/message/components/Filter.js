/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Row, Col, Input, message } from 'antd'
import { isEqual } from 'lodash-es';

const { Search } = Input;

class Filter extends Component {

  handleUpdate = (e, status) => {
    e.preventDefault();
    const { selectedRows, onMultiUpdate } = this.props;
    if (!selectedRows || selectedRows.length === 0) {
      message.info('没有选中任何消息，请重新选择');
    } else {
      onMultiUpdate(status);
    }
  }

  handleAllRead = () => {
    const { list, onReadAll } = this.props;
    if (!list || list.length === 0) {
      message.info('当前没有任何消息');
    } else {
      onReadAll();
    }
  }

  handleSearch = (value) => {
    const { onSearch, setFilterValues } = this.props
    setFilterValues(value);
    onSearch(value);
  }

  render() {

    return (
      <Row gutter={24} style={{ marginBottom: 12 }}>
        <Col span={18}>
          <Button
            type="primary"
            ghost
            onClick={e => this.handleUpdate(e, '2')}
          >
            删除
          </Button>
          <Button
            type="primary"
            ghost
            style={{ marginLeft: 10, marginRight: 10 }}
            onClick={e => this.handleUpdate(e, '1')}
          >
            标记为已读
          </Button>
          <Button
            type="primary"
            ghost
            onClick={this.handleAllRead}
          >
            全部标记为已读
          </Button>
        </Col>

        <Col span={6} style={{ textAlign: 'right' }}>
          <Search
            placeholder="请输入消息标题"
            onSearch={this.handleSearch}
          />
        </Col>
      </Row >
    )
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter
