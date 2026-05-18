import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Steps, Form, message, Modal, Row, Col, Card, Button } from 'antd';
import debounce from 'lodash/debounce';
import { isEmpty, isEqual } from 'lodash';
import store from 'store';
import { LeggoForm } from './components/Engine';
import VideoModal from './components/VideoModal';

import { router } from 'umi'
import styles from './index.less'
const ColProps = {
    xs: 24,
    sm: 24,
    xl: 8,
    md: 8,
    lg: 8
}

const { Step } = Steps;
@Form.create()
@connect(({ app, eduTrainingRegistration, loading }) => ({ app, eduTrainingRegistration, loading }))
class TestFormCreate extends PureComponent {
    state = {
        activeSchema: '',
        setForceRender: 0,
        id: '',//trainInfoId
    }
    //获取trainid,然后用于获取json
    componentDidMount() {
        const { dispatch } = this.props
        const search = location.search;
        const id = search.split('=')[1]; //详情id
        this.setStateValue('id', id);

        if(search) {
            dispatch({
                type: 'eduTrainingRegistration/queryOneTrainDetailById',
                payload: {
                    trainId: id
                }
            })
    
            dispatch({
                type: 'eduTrainingRegistration/attendForm2',
                payload: {
                    trainId: id
                }
            })
        }
       
    }
    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch({
            type: 'eduTrainingRegistration/updateState',
            payload: {
                schemaModel: {},
                isShowQCode: false
            }
        })
    }

    setStateValue = (field, value) => {
        console.log(field);
        this.setState({
            [`${field}`]: value
        })
    }

    onHandleSubmit = debounce((values) => {
        const { id } = this.state
        const { dispatch, eduTrainingRegistration } = this.props
        const { schemaModel, trainInfoId } = eduTrainingRegistration

        dispatch({
            type: 'eduTrainingRegistration/userFillForm',
            payload: {
                trainInfoId,
                formJson: JSON.stringify(schemaModel),
                formUserFillItemList: values
            }
        }).then(response => {
            if (response && response.flag) {
                message.success('报名成功')
                dispatch({
                    type: 'eduTrainingRegistration/updateState',
                    payload: {
                        isShowQCode: true
                    }
                })
            } else {
                message.config({
                    top: 100,
                    duration: 2,
                });
                message.error(response.errMessage)
            }
        })
    }, 200)

    rebackLast = () => {

        const { dispatch } = this.props
        dispatch({
            type: 'eduTrainingRegistration/updateState',
            payload: {
                isShowQCode: false
            }
        })

        router.push({
            pathname: '../eduTrainingRegistration'
        })
    }

    get eduModalProps() {
        const { dispatch, eduTrainingRegistration } = this.props
        const { modalVisible } = eduTrainingRegistration
        const { trainDetail } = eduTrainingRegistration
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
                    type: 'eduTrainingRegistration/updateStateHiddenEduModal',
                })
            },
        }
    }

    showModal = () => {
        const { dispatch } = this.props
        dispatch({
            type: 'eduTrainingRegistration/updateStateShowEduModal',
        })
    }

    render() {
        const { eduTrainingRegistration, form } = this.props
        const { schemaModel, trainDetail, isShowQCode } = eduTrainingRegistration

        const leggo = LeggoForm.useLeggo(schemaModel, null, {
            test: true,
            func: () => false,
        })
        return (
            <div className={styles.pages}>
                {

                    !isShowQCode ?
                        <div>

                            <Row gutter={20} style={{ marginBottom: '20px' }}>
                                <Col  {...ColProps}></Col>
                                <Col  {...ColProps}>
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
                                        {trainDetail && trainDetail.linkVideoPath &&
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
                            <Row>
                                <Col {...ColProps}>
                                </Col>
                                {
                                    leggo ? <Col   {...ColProps}>
                                        <LeggoForm leggo={leggo} eduTraining={eduTrainingRegistration} onHandleSubmit={this.onHandleSubmit} form={form} />
                                    </Col> : ''
                                }

                            </Row>
                        </div>


                        :
                        <Row>
                            <Col  {...ColProps}>
                                <Card
                                    hoverable
                                    style={{ width: '100%', margin: '30px auto' }}
                                    cover={<img alt="example" src={require('assets/eduTrain/qrcode.jpg')} />}
                                >
                                    <Card.Meta title="" description={
                                        <div>
                                            <div >恭喜，提交成功！请添加李老师微信加入培训群!</div>
                                            <Button style={{ width: '150px', margin: '0px auto', marginTop: "20px", display: 'block' }} type='primary' onClick={this.rebackLast}>返回</Button>
                                        </div>
                                    } />
                                </Card>
                            </Col>

                        </Row>


                }

                <VideoModal {...this.eduModalProps} />

            </div>
        )
    }
}

export default TestFormCreate;
