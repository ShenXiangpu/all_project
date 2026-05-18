import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'antd'
import styles from './resetPwdComplete.less'

class ResetPwdComplete extends PureComponent {
    handleClick = (e) => {
        e.preventDefault();
        const { toLoginPage } = this.props;
        toLoginPage();
    }

    render() {
        const { currentMobile } = this.props

        return (
            <div className={styles.wrap}>
                <h1><Icon type="check-circle" theme="filled" /><label>重置成功</label></h1>
                <div className={styles.des}>
                    <p>您的高性能EDA平台账户名为<label>{currentMobile}</label>，</p>
                    <p>下次登录时请使用新密码进行登录。</p>
                    <p>
                        <Button type="primary" onClick={this.handleClick}>返回，重新登录</Button>
                    </p>
                </div>
            </div>
        )
    }
}

ResetPwdComplete.propTypes = {
    currentMobile: PropTypes.string
}

export default ResetPwdComplete
