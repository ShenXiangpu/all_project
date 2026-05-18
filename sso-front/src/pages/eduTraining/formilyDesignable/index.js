import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { router } from 'utils'
import { Steps, Form, message, Button } from 'antd';
import Page from '../../../components/Page'
import Left from './components/Left'
import Middle from './components/Middle'
import Right from './components/Right'
import debounce from 'lodash/debounce';
import { isEmpty, isEqual } from 'lodash';
import store from 'store';
import styles from './index.less'

const { Step } = Steps;

@connect(({ app, formilyDesignable,eduTraining, loading }) => ({ app, formilyDesignable,eduTraining, loading }))
class FormilyDesignable extends PureComponent {
    state = {
        setForceRender: 0,
        // contextValue: {
        //     activeSchema:'',
        //     schemaList,
        //     schemaListOptions: [],
        //     setSchemaList,
        //     onGetSchemaModel,
        //     forceRender: () => setForceRender(pre => pre + 1),
        // }
        itemPropsEntries: [],
        inputPropsEntries: [],
        extraEntries: [],
        newContextValue: [],
        activeSchema: {},
        id: ''
    }

    componentDidMount() {
        const search = location.search;
        const id = search.split('=')[1]; //详情id
        this.setStateValue('id', id)
    }

    componentDidUpdate(prevProps, prevState) {
        const { formilyDesignable, dispatch } = this.props
        const { schemaList } = formilyDesignable
        const { activeSchema } = this.state
        if (prevProps.schemaList !== schemaList && prevState.activeSchema !== activeSchema) {
            this.updateRightProps(activeSchema, schemaList)
        }
    }

    toPage = () => {
        const { activeSchema, id } = this.state
        const pathname = `/eduTraining/formilyDesignable/testFormCreate?id=${id}`;
        router.push(
            pathname,
        )
    }

    setStateValue = (field, value) => {
        console.log(field);
        this.setState({
            [`${field}`]: value
        })
    }

    get middleProps() {
        const { formilyDesignable, dispatch } = this.props
        const { schemaList } = formilyDesignable
        const { activeSchema, id } = this.state
        return {
            id, //教学id
            activeSchema,
            schemaList,
            setSchemaList(schemaList) {
                dispatch({
                    type: 'formilyDesignable/updateState',
                    payload: {
                        schemaList
                    }
                })
            },
            setActiveSchema: (activeSchema) => {
                this.setStateValue('activeSchema', activeSchema)
                this.updateRightProps(activeSchema, schemaList)


            },
            setForceRender: (forceRender) => {
                this.setStateValue('forceRender', forceRender)
            },
            forceRender: 0,
            updateRightProps: () => {
                dispatch({
                    type: 'formilyDesignable/updateState',
                    payload: {
                        schemaList
                    }
                })
                this.setStateValue('activeSchema', activeSchema)
            },
            onHandleSubmit: (values) => {
                dispatch({
                    type: 'formilyDesignable/attendForm',
                    payload: {
                        ...values
                    }
                }).then(() => {
                    const pathname = `/eduTraining`;
                    router.push({
                        pathname
                    })
                })
            },
            onCancleRetrun: () => {
                const pathname = `/eduTraining`;
                router.push(
                    pathname,
                )
            }

        }
    }
    // 更新 itemPropsEntries inputPropsEntries extraEntries newContextValue

    updateRightProps = (activeSchema, schemaList) => {
        // debugger
        const { configs } = activeSchema.current || {}
        const { itemProps, inputProps, extra } = configs || {}

        const itemPropsEntries = Object.entries(itemProps || {})
        const inputPropsEntries = Object.entries(inputProps || {})
        const extraEntries = Object.entries(extra || {})
        const newContextValue = () => {
            const schemaListOptions = [{
                label: '公共状态 - publicStates',
                value: 'publicStates',
            }].concat(schemaList.map(schema => {
                const { label, name } = schema.configs.itemProps
                return {
                    label: `${label} - ${String(name)}`,
                    value: String(name),
                }
            }))
            return {
                ...this.props,
                schemaListOptions,
            }
        }
        this.setStateValue('itemPropsEntries', itemPropsEntries)
        this.setStateValue('inputPropsEntries', inputPropsEntries)
        this.setStateValue('extraEntries', extraEntries)
        this.setStateValue('newContextValue', newContextValue)
    }

    get rightProps() {
        const { formilyDesignable, dispatch } = this.props
        const { schemaList } = formilyDesignable
        const { itemPropsEntries, inputPropsEntries, extraEntries, activeSchema } = this.state
        return {
            itemPropsEntries,
            inputPropsEntries,
            extraEntries,
            activeSchema,
            schemaList,
            updateRightProps: () => {
                dispatch({
                    type: 'formilyDesignable/updateState',
                    payload: {
                        schemaList
                    }
                })
                this.setStateValue('activeSchema', activeSchema)
            },
            setActiveSchema: (activeSchema) => {
                this.setStateValue('activeSchema', activeSchema)
            },
        }
    }





    render() {
        const { location } = this.props
        const { query } = location
        return (
            <Page inner>
                {/* <div style={{marginBottom:'20px'}}><Button type='primary' onClick={this.toPage}>查看模板</Button></div> */}
                <div className={styles.leggoConfigs}>
                    <Left></Left>
                    <Middle {...this.middleProps} ></Middle>
                    <Right {...this.rightProps}></Right>
                </div>
            </Page>
        )
    }
}

export default FormilyDesignable;
