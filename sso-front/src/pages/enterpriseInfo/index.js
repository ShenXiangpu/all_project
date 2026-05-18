import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import Page from '../../components/Page'
import styles from './index.less'
import BaseView from './components/BaseView'
import BaseInfoForm from './components/BaseInfoForm'

@connect(({ app, enterprise, loading }) => ({ app, enterprise, loading }))
class EnterpriseInfo extends PureComponent {

    get baseProps() {
        const { dispatch, enterprise, app, loading } = this.props
        const { epInfo, auditInfo } = enterprise

        return {
            baseInfo: epInfo,
            auditInfo,
            onUpdate: () => {
                dispatch({
                    type: 'enterprise/updateState',
                    payload: {
                        isUpdate: true
                    },
                })
            }
        }
    }

    get fromProps() {
        const { dispatch, enterprise, app, loading } = this.props
        const { epInfo, auditInfo, companyTypes } = enterprise

        return {
            baseInfo: epInfo,
            auditInfo,
            companyTypes,
            dispatch,
            updateLoading: loading.effects['enterprise/update'],
            onCancelUpdate: () => {
                dispatch({
                    type: 'enterprise/getEnterpriseInfo',
                    payload: {},
                })

                dispatch({
                    type: 'enterprise/updateState',
                    payload: {
                        isUpdate: false
                    },
                })
            },
            onUpdateSubmit: (values) => {
                dispatch({
                    type: 'enterprise/update',
                    payload: values,
                })
            }
        }
    }

    render() {
        const { enterprise: { isUpdate } } = this.props

        return (
            <Page inner>
                {!isUpdate ?
                    <BaseView {...this.baseProps} />
                    :
                    <BaseInfoForm {...this.fromProps} />
                }
            </Page>
        )
    }
}

EnterpriseInfo.propTypes = {
    enterprise: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}

export default EnterpriseInfo
