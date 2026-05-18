import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { router } from 'utils'
import RegisterSteps from './components/RegisterSteps'
import FillMobile from './components/FillMobile'
import VerifyModal from './components/VerifyModal'
import FillDetailInfo from './components/FillDetailInfo'
import RegisterComplete from './components/RegisterComplete'
import debounce from 'lodash/debounce'

@connect(({ app, mobile, loading }) => ({ app, mobile, loading }))
class MobileRegister extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'mobile/querySuccess',
      payload: { currentStep: 0 }
    })
  }

  get stepsProps() {
    const { mobile } = this.props
    const { currentStep } = mobile
    return {
      current: currentStep
    }
  }

  get fillMobileProps() {
    const { loading, dispatch, mobile } = this.props
    const { errorMessage } = mobile

    return {
      loading,
      errorMessage,
      onNext: debounce(values => {
        dispatch({
          type: 'mobile/sendMobile',
          payload: {
            verifyInput: values.vertification,
            phone: values.phone
          }
        })
      }, 1000)
    }
  }

  get modalProps() {
    const { dispatch, mobile, loading } = this.props
    const { currentMobile, modalVisible, errorMessage } = mobile

    return {
      errorMessage,
      currentMobile,
      visible: modalVisible,
      destroyOnClose: true,
      maskClosable: false,  //点击蒙层是否允许关闭，默认 true
      mask: false,
      confirmLoading: loading.effects['mobile/update'],
      title: '验证手机',
      centered: true,
      onOk: data => {
        dispatch({
          type: 'mobile/checkMobileCode',
          payload: data
        })
      },
      onCancel() {
        dispatch({
          type: 'mobile/hideModal',
        })
      },
      onSendCode: debounce(data => {
        dispatch({
          type: 'mobile/sendValidate',
          payload: data,
        })
      }, 1000),
    }
  }

  get fillInfoProps() {
    const { dispatch, mobile } = this.props
    const { currentMobile } = mobile

    return {
      currentMobile,
      dispatch,
      onNext: debounce(values => {
        dispatch({
          type: 'mobile/createAccount',
          payload: values
        })
      }, 1000)
    }
  }

  get completeProps() {
    const { mobile } = this.props
    const { currentMobile } = mobile

    return {
      currentMobile,
      toLoginPage: () => {
        router.push('/login')
      }
    }
  }

  render() {
    const { mobile: { currentStep } } = this.props

    return (
      <>
        <RegisterSteps {...this.stepsProps} />
        {currentStep === 0 && <FillMobile {...this.fillMobileProps} />}
        <VerifyModal {...this.modalProps} />
        {currentStep === 1 && <FillDetailInfo {...this.fillInfoProps} />}
        {currentStep === 2 && <RegisterComplete {...this.completeProps} />}
      </>
    )
  }
}

MobileRegister.propTypes = {
  mobile: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default MobileRegister
