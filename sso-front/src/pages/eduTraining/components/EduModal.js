import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select, Modal, message, Popconfirm, Button } from 'antd'
import ModalFilter from './ModalFilter'
import ModalTable from './ModalTable'
import AuditModal from './AuditModal'
import { connect } from 'dva'
import { isEqual } from 'lodash'
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
class EduModal extends PureComponent {
  state = {
    formValues: {},
    auditModalVisible: false,
    auditId: '',//审核id
  }



  setStateValue = (field, value) => {
    this.setState({
      [`${field}`]: value
    })
  }
  get eduModalListProps() {
    const { dispatch, loading, formFillList, pagination1 } = this.props
    return {
      loading: loading.effects['eduTraining/oneFormFillList'],
      pagination: pagination1,
      formFillList,
      onChange: (pagination, filters, sorter) => {
        this.handleTableChange(pagination, filters, sorter)
      },
      onWatchList: (id) => {
        this.handleModalShow(id)
      },
      auditConfirm: (id, status) => {
        if (isEqual(status, '1')) {
          dispatch({
            type: 'eduTraining/userFillFormAudit',
            payload: {
              id,
              status
            }
          }).then(response => {
            if (response && response.flag) {
              message.success('审核成功');
              dispatch({
                type: 'eduTraining/oneFormFillList',
              })
            } else {
              message.config({
                top: 100,
                duration: 2,
              });
              message.error(response.errMessage)
            }
          })
        } else {
          this.setStateValue('auditModalVisible', true)
        }
        this.setStateValue('auditId', id)
      },
    }
  }


  get auditModalProps() {
    const { dispatch, eduTraining, loading,trainId } = this.props
    const { auditModalVisible, auditId } = this.state

    return {
      visible: auditModalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      title: '审核意见',
      width: '30vw',
      centered: true,
      okText: '确认',
      cancelText: '取消',
      onOk: (data) => {
        console.log(data);
        dispatch({
          type: 'eduTraining/userFillFormAudit',
          payload: {
            ...data,
            id: auditId
          }
        }).then(response => {
          if (response && response.flag) {
            message.success('审核成功');
            this.setStateValue('auditModalVisible', false)

            dispatch({
              type: 'eduTraining/oneFormFillList',
              payload : {
                trainId
              }
            })
          } else {
            message.config({
              top: 100,
              duration: 2,
            });
            message.error(response.errMessage)
          }

        })
      },
      onCancel: () => {
        this.setStateValue('auditModalVisible', false)
      },
    }
  }



  handleTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});
    const params = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };

    this.setState({
      formValues: {
        ...formValues,
        ...filters,
      }
    })

    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'eduTraining/queryEduList',
      payload: params,
    });
  };

  get filterModalProps() {
    const { dispatch, loading, trainId } = this.props;
    const { formValues } = this.state
    return {
      filter: {
        ...formValues,
      },

      setFormValues: values => {
        this.setStateValue('formValues', values)
      },
      onSearch: values => {
        dispatch({
          type: 'eduTraining/oneFormFillList',
          payload: {
            ...values,
            trainId
          }
        })
      },
      onHandleExportTable:() => {
        dispatch({
          type: 'eduTraining/downloadTemplate',
          payload: {
            status:formValues.status,
            trainId
          }
        })
      }
    }
  }




  render() {
    const { item = {}, onOk, form, ...modalProps } = this.props
    const { getFieldDecorator, getFieldValue } = form

    return (
      <Modal {...modalProps}>
        <div>
          <ModalFilter {...this.filterModalProps} />
        </div>
        <div>
          <ModalTable {...this.eduModalListProps} />
        </div>
        <div>
          <AuditModal {...this.auditModalProps} />
        </div>
      </Modal>



    )
  }
}



export default EduModal
