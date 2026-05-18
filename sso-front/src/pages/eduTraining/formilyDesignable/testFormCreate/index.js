import React, { PureComponent } from 'react';
import { connect } from 'dva';
import Page from '../../../../components/Page'
import { Steps, Form, Button, Card, Row, Col } from 'antd';
import styles from '../index.less'

import { LeggoForm } from './components/Engine';
import VideoModal from './components/VideoModal';

const { Step } = Steps;
@Form.create()
@connect(({ app, formilyDesignable, eduTraining, loading }) => ({ app, formilyDesignable, eduTraining, loading }))
class TestFormCreate extends PureComponent {
    state = {
        activeSchema: '',
        setForceRender: 0,
        id: '',//trainId
    }
    //获取trainid,然后用于获取json
    componentDidMount() {
        const { dispatch } = this.props
        const search = location.search;
        const id = search.split('=')[1]; //详情id
        this.setStateValue('id', id);
        dispatch({
            type: 'formilyDesignable/queryOneTrainDetailById',
            payload: {
                trainId: id
            }
        })

        dispatch({
            type: 'formilyDesignable/attendForm2',
            payload: {
                trainId: id
            }
        })



    }
    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch({
            type: 'formilyDesignable/updateState',
            payload: {
                schemaModel: {},
            }
        })
        dispatch({
            type: 'eduTraining/updateState',
            payload: {
                currentItem: {}
            }
        })

    }

    setStateValue = (field, value) => {
        console.log(field);
        this.setState({
            [`${field}`]: value
        })
    }

    showModal = () => {
        const { dispatch } = this.props
        dispatch({
            type: 'formilyDesignable/updateStateShowEduModal',
        })
    }

    get eduModalProps() {
        const { dispatch, formilyDesignable } = this.props
        const { modalVisible, trainDetail } = formilyDesignable

        return {
            currentItem: trainDetail,
            visible: modalVisible,
            destroyOnClose: true,
            maskClosable: false,  //点击蒙层是否允许关闭，默认 true
            title: '课程资料',
            width: '60vw',
            centered: true,
            // okText: '确认',
            // cancelText: '取消',
            footer: null,
            onCancel() {
                dispatch({
                    type: 'formilyDesignable/updateStateHiddenEduModal',
                })
            },
        }
    }

    render() {
        const { formilyDesignable, eduTraining, form } = this.props
        const { schemaModel, trainDetail } = formilyDesignable
        const leggo = LeggoForm.useLeggo(schemaModel, null, {
            test: true,
            func: () => false,
        })
        return (
            <Page inner>
                <Row gutter={20} style={{ marginBottom: '20px' }}>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Card title="课程介绍" bordered={true} style={{ width: '100%' }}>
                            <div style={{
                                fontSize: '16px',
                                textAlign: 'center',
                                marginBottom: '20px',

                            }} className={styles.flex}>
                                <div>课程名称：</div>
                                <div>{trainDetail.name}</div>
                            </div>
                            <div style={{
                                fontSize: '16px',
                                textAlign: 'center',
                                marginBottom: '20px',
                            }} className={styles.flex}>
                                <div>课程形式：</div>
                                <div>{trainDetail.trainingFormatName}</div>
                            </div>

                            <div style={{
                                fontSize: '16px',
                                textAlign: 'center',
                                marginBottom: '20px',
                            }} className={styles.flex}>
                                <div>课程描述：</div>
                                <div>{trainDetail.remarks}</div>
                            </div>
                            {
                                trainDetail && trainDetail.linkVideoPath &&

                                <div style={{
                                    fontSize: '16px',
                                    textAlign: 'center',
                                    marginBottom: '20px',
                                }} className={styles.flex}>
                                    <div>课程资料：</div>
                                    <Button type="primary" size='small' style={{
                                        fontSize: '12px',
                                    }} onClick={this.showModal}>查看资料</Button>
                                </div>
                            }

                        </Card>



                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={8}></Col>
                    {
                        leggo ? <Col span={8}>
                            <LeggoForm schemaModel={schemaModel} leggo={leggo} form={form} />
                        </Col> : ''
                    }
                </Row>
                <VideoModal {...this.eduModalProps} />
            </Page>
        )
    }
}

export default TestFormCreate;
