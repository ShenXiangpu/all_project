import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Select, Modal, message, Popconfirm, Button } from 'antd'
import { forIn, isEqual } from 'lodash'
const { Option } = Select

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
@Form.create()
class InfoModal extends PureComponent {
  state = {

  }



  render() {
    const { oneUserDetail, ...modalProps } = this.props
    console.log(oneUserDetail);
    let onUserList = []
    for (const key in oneUserDetail) {
      let item = {};
      item.key = key;
      item.value = oneUserDetail[key];
      onUserList.push(item)
    }

    const registration = () => {

    }
    console.log('registration', registration);



    return (
      <Modal {...modalProps}>
        {onUserList && onUserList.map(item => {
          const key = item.key
          if ((key.indexOf('id') == -1) && key.indexOf('status') == -1 ) {
            return (
              <>
                <Row>
                  <Col span={6}>{item.key}</Col>
                  <Col span={18}>{item.value}</Col>
                </Row>
              </>
            )
          }

        })}

      </Modal>



    )
  }
}



export default InfoModal
