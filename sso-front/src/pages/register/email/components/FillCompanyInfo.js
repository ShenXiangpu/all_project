import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Row, Input } from 'antd'
import CompanyInfoForm from './CompanyInfoForm'
import UploadImage from './UploadImage'
import styles from './FillCompanyInfo.less'


class FillCompanyInfo extends Component {


    render() {
        const { company, upload } = this.props
        return (
            <div className={styles.content}>
                <UploadImage {...upload} />
                <CompanyInfoForm {...company} />
            </div>
        )
    }
}

export default FillCompanyInfo
