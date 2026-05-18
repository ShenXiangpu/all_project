import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { router } from 'utils'
import RegisterSteps from './components/RegisterSteps'
import FillEmail from './components/FillEmail'
import SendSuccess from './components/SendSuccess'
import FillContactInfo from './components/FillContactInfo'
import FillCompanyInfo from './components/FillCompanyInfo'
import RegisterComplete from './components/RegisterComplete'

@connect(({ email, loading }) => ({ email, loading }))
class EmailRegister extends PureComponent {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: 'email/querySuccess',
            payload: { currentStep: 0 }
        })
    }

    get stepsProps() {
        const { email } = this.props
        const { currentStep } = email
        return {
            current: currentStep
        }
    }

    get fillEmailProps() {
        const { loading, dispatch, email } = this.props
        const { errorMessage } = email

        return {
            loading,
            errorMessage,
            onNext: (values) => {
                dispatch({
                    type: 'email/checkAndSendEmail',
                    payload: {
                        verifyInput: values.vertification,
                        email: values.email
                    }
                })
            }
        }
    }

    get sentProps() {
        const { dispatch, email } = this.props
        const { currentEmail } = email

        return {
            currentEmail,
            sendEmail: (value) => {
                dispatch({
                    type: 'email/sendEmail',
                    payload: {
                        email: value
                    }
                })
            }
        }
    }

    get fillInfoProps() {
        const { dispatch, email } = this.props
        const { currentEmail } = email

        return {
            currentEmail,
            dispatch,
            onNext: (values) => {
                dispatch({
                    type: 'email/updateState',
                    payload: {
                        contactInfos: values,
                        currentStep: 2
                    }
                })
            }
        }
    }

    get companyProps() {
        const { dispatch, email, loading } = this.props
        const { companyTypes, contactInfos, licenseUrl } = email

        return {
            company: {
                companyTypes,
                contactInfos,
                loading,
                licenseUrl,
                dispatch,
                onNext: (values) => {
                    dispatch({
                        type: 'email/createAccount',
                        payload: {
                            ...values
                        }
                    })
                }
            },
            upload: {
                saveUploadUrl: url => {
                    dispatch({
                        type: 'email/updateState',
                        payload: {
                            licenseUrl: url
                        }
                    })
                }
            }
        }
    }

    get completeProps() {
        const { dispatch, email } = this.props
        const { currentEmail } = email

        return {
            currentEmail,
            toLoginPage: () => {
                dispatch({
                    type: 'email/updateState',
                    payload: {
                        currentStep: 0
                    }
                })

                router.push('/login')
            }
        }
    }

    render() {
        const { email: { currentStep, isSent } } = this.props

        return (
            <>
                <RegisterSteps {...this.stepsProps} />
                {currentStep === 0 && !isSent && <FillEmail {...this.fillEmailProps} />}
                {currentStep === 0 && isSent && <SendSuccess {...this.sentProps} />}
                {currentStep === 1 && <FillContactInfo {...this.fillInfoProps} />}
                {currentStep === 2 && <FillCompanyInfo {...this.companyProps} />}
                {currentStep === 3 && <RegisterComplete {...this.completeProps} />}
                {/* <FillCompanyInfo {...this.companyProps} /> */}
            </>
        )
    }
}

EmailRegister.propTypes = {
    email: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}

export default EmailRegister
