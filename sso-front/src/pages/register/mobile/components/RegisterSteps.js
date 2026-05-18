
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './steps.less'
import { Steps } from 'antd';
const { Step } = Steps;

class RegisterSteps extends Component {

    render() {
        const { current } = this.props

        return (
            <div className={styles.stepsContent}>
                <Steps type="navigation" className={styles.steps} current={current}>
                    <Step status={current === 0 ? "process" : "finish"} title="设置用户名" />
                    <Step status={current === 0 ? "wait" : (current === 1 ? "process" : "finish")} title="填写账号信息" />
                    <Step status={current === 2 ? "process" : "wait"} title="注册成功" />
                </Steps>
            </div>
        )
    }
}

RegisterSteps.propTypes = {
    current: PropTypes.number
}

export default RegisterSteps