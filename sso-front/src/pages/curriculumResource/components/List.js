import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Pagination, Row, Col } from 'antd'
import { isEqual } from 'lodash-es';
import moment from 'moment'
import styles from '../style.less'
import CourseItem from './CourseItem';
import { log } from 'lodash-decorators/utils';
class List extends PureComponent {


  onShowSizeChange = (current, pageSize) => {
    // console.log(current, pageSize);
    const { onChange } = this.props
    let pagination = {
      current: current,
      pageSize: pageSize,
    }
    onChange(pagination)
  }

  onCurrentChange = (current, pageSize) => {
    // console.log(current, pageSize);
    const { onChange } = this.props
    let pagination = {
      current: current,
      pageSize: pageSize,
    }
    onChange(pagination)
  }

  render() {

    const { sourcesList, pagination } = this.props;

    return (
      <div style={{ marginTop: '20px' }}>
        <Row gutter={[24, 16]} style={{ minHeight: '55vh' }}>
          {
            sourcesList && sourcesList.length > 0 ? sourcesList && sourcesList.length > 0 && sourcesList.map(item => {
              return (
                <Col key={item.id} xs={24} sm={24} md={12} lg={8} xl={5} style={{ minWidth: '320px' }}>
                  <CourseItem item={item} />
                </Col>
              )
            }) :
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <div style={{ margin: '40px auto',textAlign:'center', fontSize: '20px',color:'#999' }}>暂无数据</div>
              </Col>
          }
        </Row>
        <Row gutter={[48, 16]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} className={`${styles.flex} ${styles.justifyEnd}`}>
            <Pagination
              showSizeChanger
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onCurrentChange}
              defaultCurrent={1}
              current={pagination && pagination.current}
              total={pagination && pagination.total}
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default List
