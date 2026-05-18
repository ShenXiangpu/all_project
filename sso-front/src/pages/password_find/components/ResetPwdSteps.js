
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './steps.less'
import { Steps } from 'antd';
const { Step } = Steps;

class ResetPwdSteps extends Component {

    render() {
        const { current } = this.props

        return (
            <div className={styles.stepsContent}>
                <Steps type="navigation" className={styles.steps} current={current}>
                    <Step status={current === 0 ? "process" : "finish"} title="验证身份" />
                    <Step status={current === 0 ? "wait" : (current === 1 ? "process" : "finish")} title="重置密码" />
                    <Step status={current === 2 ? "process" : "wait"} title="完成" />
                </Steps>
            </div>
        )
    }
}

ResetPwdSteps.propTypes = {
    current: PropTypes.number
}

export default ResetPwdSteps