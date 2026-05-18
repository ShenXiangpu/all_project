import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { router } from 'utils'
import { stringify } from 'qs'
import { message, Icon } from 'antd'
import Page from '../../../components/Page/Page'
// import ShowPDF from '../../../../components/ShowPDF/ShowPDF'
import styles from '../style.less'
import debounce from 'lodash/debounce';
import { isEqual } from 'lodash'
import { func } from 'prop-types'

@connect(({ app, curriculumResource, loading }) => ({ app, curriculumResource, loading }))
class ResourceDetail extends PureComponent {
    state = {

    }

    componentDidMount() {

        const { dispatch, curriculumResource, match: { params: { courseId } } } = this.props
        const { sourcesDetail } = curriculumResource
        const { fileTypeTag = {} } = sourcesDetail
        dispatch({
            type: 'curriculumResource/queryResourcebyCourseId',
            payload: {
                courseId
            }
        }).then(() => {
            if (fileTypeTag && !isEqual(fileTypeTag, 'PDF')) {
                let video = document.querySelector('video')
                if (video) {
                    video.load();
                }
            }

        })

        // this.handleDom()
    }

    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch({
            type: 'curriculumResource/updateState',
            payload: {
                sourcesDetail: {}
            }
        })
    }

    handleDom() {
        var demo = window.frames["pdfIframe"].document.getElementsByTagName('body')
        console.log(demo[0].style);
        demo[0].addEventListener('click', function () {
            alert(123)
        }, false);


        // demo.oncontextmenu = () => {
        //     return false
        // }
    }


    setStateValue = (field, value) => {
        this.setState({
            [`${field}`]: value
        })
    }

    get filterProps() {
        const { app, curriculumResource, dispatch } = this.props
        const { pagination } = curriculumResource

        return {
            directionList,
            typeList,
            directionTitle: '课程方向',
            typeTitle: '课程分类',
            dispatch,
            onSearch: debounce(data => {
                this.setState({
                    name: data,
                })
                this.handleQuery({
                    name: data,
                    courseDirectionId,
                    courseClassificationId,
                    ...pagination
                })
            }, 300),

        }
    }


    goBack = () => {
        router.push('/curriculumResource')
    }



    render() {
        const { curriculumResource } = this.props
        const { sourcesDetail = {} } = curriculumResource
        const { filePath = {}, fileTypeTag = {} } = sourcesDetail


        const videoRender = (filePath) => {
            console.log('filePath', filePath);
            setTimeout(() => {
                let jzVideo = document.getElementById("video");
                if (jzVideo) {
                    jzVideo.oncontextmenu = function (e) {
                        return false
                    }
                }
            }, 500);
            return (
                filePath ?
                    <div>
                        <div style={{ width: '100%' }}>
                            <video controlsList='nodownload noremoteplayback noplaybackrate' preload="meta" id='video' controls width="100%" height='660px'>
                                <source src={filePath} type="video/mp4" />
                                您的浏览器不支持 HTML5 video 标签。
                            </video>
                        </div>
                    </div> : null
            )
        }

        return (
            <Page inner style={{ overflow: 'hidden' }} >
                <div onClick={this.goBack} style={{ marginBottom: '20px', fontSize: '16px', cursor: 'pointer' }} ><Icon type="arrow-left" /> 返回上一级</div>

                {!isEqual(fileTypeTag, 'PDF') && filePath ?
                    videoRender(filePath) :
                    <div style={{ width: '100%' }}>
                        <iframe name='pdfIframe' id='#abc' src={`${filePath}`} frameborder="0" style={{ zIndex: 1000, minHeight: '660px', width: '100%' }}></iframe>
                    </div>

                }
                {/* <div style={{ width: '100%' }}>
                    <video controls width="100%" height='660px'>
                        <source src={`${filePath}`} type="video/mp4" />
                    </video>
                </div> */}

            </Page>
        )
    }
}

export default ResourceDetail
