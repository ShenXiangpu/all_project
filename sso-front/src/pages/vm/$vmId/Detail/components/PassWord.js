import React, { PureComponent } from 'react'
import {  Icon } from 'antd'
import styles from './styles.less'





class PassWord extends PureComponent {
    state = {
        pwdVisible: false,            // 密码是否明文显示
    }


    setPowerState = value => {
        this.setState({ powerOperate: value })
    }

    setPwdVisible = () => {
        const { pwdVisible } = this.state;
        this.setState({ pwdVisible: !pwdVisible });
    }


    render() {

        const { pwdVisible } = this.state
        const { item } = this.props
        debugger

        return (

            <div className={styles.pwdContainer}>
                <span>密码:</span>
                {
                    pwdVisible ?
                        <span className={styles.text}> {item.accountPwd} </span> :
                        <span className={styles.text}>{'******'} </span>
                }

                {/* <Icon onClick={this.passShowFor} type="eye-invisible" style={{color:'#1890ff'}} /> */}
                <a onClick={this.setPwdVisible}><Icon type={!pwdVisible ? "eye" : "eye-invisible"} /></a>

            </div>


        )
    }
}

export default PassWord
