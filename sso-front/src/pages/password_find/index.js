import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { router } from 'utils'
import ResetPwdSteps from './components/ResetPwdSteps'
import FillAccount from './components/FillAccount'
import FillMobileCode from './components/FillMobileCode'
import ResetPassword from './components/ResetPassword'
import ResetPwdComplete from './components/ResetPwdComplete'

@connect(({ findPassword, loading }) => ({ findPassword, loading }))
class FindPassword extends PureComponent {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: 'findPassword/querySuccess',
            payload: { currentStep: -1 }
        })
    }

    get stepsProps() {
        const { loading, dispatch, findPassword } = this.props
        const { currentStep } = findPassword
        return {
            current: currentStep
        }
    }

    get fillAccountProps() {
        const { loading, dispatch, findPassword } = this.props
        const { errorMessage } = findPassword

        return {
            loading,
            errorMessage,
            onNext: (values) => {
                dispatch({
                    type: 'findPassword/checkVerigyandAccount',
                    payload: {
                        verifyInput: values.vertification,
                        loginName: values.loginName
                    }
                })
            }
        }
    }

    get fillMobileProps() {
        const { loading, dispatch, findPassword } = this.props
        const { errorMessage, currentMobile } = findPassword

        return {
            currentMobile,
            loading,
            errorMessage,
            onSendCode: data => {
                dispatch({
                    type: 'findPassword/sendMobileCode',
                    payload: data,
                })
            },
            onNext: (values) => {
                dispatch({
                    type: 'findPassword/checkMobileCode',
                    payload: values
                })
            }
        }
    }

    get resetPwdProps() {
        const { dispatch, findPassword, loading } = this.props
        const { currentMobile } = findPassword

        return {
            currentMobile,
            onNext: (values) => {
                dispatch({
                    type: 'findPassword/resetPassword',
                    payload: values
                })
            }
        }
    }

    get completeProps() {
        const { dispatch, findPassword, loading } = this.props
        const { currentMobile } = findPassword

        return {
            currentMobile,
            toLoginPage: () => {
                router.push('/login')
            }
        }
    }

    render() {
        const { findPassword: { currentStep } } = this.props

        return (
            <>
                {currentStep < 0 && <FillAccount {...this.fillAccountProps} />}
                {currentStep >= 0 && <ResetPwdSteps {...this.stepsProps} />}
                {currentStep === 0 && <FillMobileCode {...this.fillMobileProps} />}
                {currentStep === 1 && <ResetPassword {...this.resetPwdProps} />}
                {currentStep === 2 && <ResetPwdComplete {...this.completeProps} />}
            </>
        )
    }
}

FindPassword.propTypes = {
    findPassword: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}

export default FindPassword