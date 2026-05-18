import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import withRouter from 'umi/withRouter';
// import Page from '../../components/Page/Page'
import BaseView from './components/BaseView'
import store from 'store'
import debounce from 'lodash/debounce'

@withRouter
@connect(({ app, baseInfo, loading }) => ({ app, baseInfo, loading }))
class UserBaseInfo extends PureComponent {

  get baseProps() {
    const { dispatch, baseInfo, app, loading } = this.props
    const { cropperModalVisible } = baseInfo
    const user = store.get('user') || {}

    return {
      currentUser: user.userInfo,
      dispatch,
      onUpdateInfo: (values) => {
        dispatch({
          type: 'app/updateCurrentUser',
          payload: values
        })
      },
      onOpenModal: () => {
        dispatch({
          type: 'baseInfo/showCropperModal',
          payload: {}
        })
      },
      modalProps: {
        visible: cropperModalVisible,
        destroyOnClose: true,
        maskClosable: false,  //点击蒙层是否允许关闭，默认 true
        confirmLoading: loading.effects['baseInfo/uploadHeadImg'],
        title: '上传头像',
        centered: true,
        okText: '上传',
        cancelText: '取消',
        onOk: debounce(data => {
          dispatch({
            type: 'baseInfo/uploadHeadImg',
            payload: data,
          }).then(() => {
            // 重新获取用户信息
            dispatch({
              type: 'app/queryCurrentUser',
              payload: {},
            })

            //关闭弹窗
            dispatch({
              type: 'baseInfo/hideCropperModal',
            })
          })
        }, 1000),
        onCancel() {
          dispatch({
            type: 'baseInfo/hideCropperModal',
          })
        },
      }
    }
  }


  render() {

    return (
      <BaseView {...this.baseProps} />
    )
  }
}

export default UserBaseInfo
