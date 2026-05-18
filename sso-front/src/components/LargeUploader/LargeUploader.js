import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Tooltip, Modal } from 'antd';
import 'webuploader/css/webuploader.css'
import styles from './upload.less'
import $ from 'jquery';
import PlaySvg from '../../assets/upload/play.svg'
import PauseSvg from '../../assets/upload/pause.svg'
import CrossSvg from '../../assets/upload/cross.svg'
import store from 'store'

window.jQuery = $;
const WebUploader = require('webuploader');

/**
 * 参考：
 * 1. WebUploader: http://fex.baidu.com/webuploader/
 * 2. react-large-uploader: https://github.com/sunyongjian/react-large-uploader
 * 3. 在React中使用WebUploader实现大文件分片上传的踩坑日记！：https://www.cnblogs.com/AIonTheRoad/p/11252253.html
 * 4. webuploader 断点续传: https://www.cnblogs.com/mywebnumber/p/5953398.html
 */
const currying = (fn, ...ahead) => (...behind) => fn(...ahead, ...behind);

const options = {
    pick: '#picker',             // 指定选择文件的按钮容器，支持：id, class, dom节点
    chunked: true,               // 是否要分片处理大文件上传。
    chunkSize: 5 * 1024 * 1024,  // 如果要分片，分多大一片？ 默认大小为5M.
    chunkRetry: 3,               // 如果某个分片由于网络问题出错，允许自动重传的次数
    threads: 3,                  // 上传并发数。允许同时最大上传进程数。
    fileSizeLimit: 24 * 1024 * 1024 * 1024,          // 24G,验证文件总大小是否超出限制, 超出则不允许加入队列。
    fileSingleSizeLimit: 12 * 1024 * 1024 * 1024,    // 12G,验证单个文件大小是否超出限制, 超出则不允许加入队列。
    duplicate: true,             // 去重， 根据文件名字、文件大小和最后修改时间来生成hash Key.
    prepareNextFile: true,       // 是否允许在文件传输时提前把下一个文件准备好。 对于一个文件的准备工作比较耗时，比如图片压缩，md5序列化。 如果能提前在当前文件传输期处理，可以节省总体耗时。
    resize: false,
    auto: true,                  // 选择文件后是否自动上传, 设置为 true 后，不需要手动调用上传，有文件选择即开始上传。
}

export default class LargeUploader extends React.Component {
    constructor() {
        super();
        this.state = {
            fileList: [],
        };
    }

    componentDidMount() {
        this.initWebUploaderHook();
        this.createWebUploaderInterface();
        this.bindWebUploaderEvent();
    }

    initWebUploaderHook() {
        const { backEndUrl, rootPath } = this.props

        /**
         * Uploader.regeister方法用来说明，该widget要响应哪些命令，并指定由什么方法来响应。
         * 同一个命令，可以指定多次handler, 各个handler会按添加顺序依次执行，且后续的handler，不能被前面的handler截断。
         * 监听分块上传过程中的三个时间点:
         */
        WebUploader.Uploader.register({
            "before-send-file": "beforeSendFile",   // 整个文件上传前调用
            "before-send": "beforeSend",            // 每个分片上传前调用
            "after-send-file": "afterSendFile"      // 分片上传完毕
        }, {
            /**
             * 在文件发送之前request，此时还没有分片（如果配置了分片的话），可以用来做文件整体md5验证。
             * @param {*} file File 对象
             */
            beforeSendFile: function (file) {
                //秒传验证
                var dfd = new WebUploader.Deferred();
                var start = new Date().getTime();
                const { chunkSize } = options;
                // 计算文件的唯一标记，用于断点续传
                (new WebUploader.Uploader()).md5File(file, 0, chunkSize).progress(function (percentage) {
                    console.log('file percentage:', percentage);
                }).then(function (val) { // md5计算完成
                    // console.log("beforeSendFile >>>>>> 总耗时: " + ((new Date().getTime()) - start) / 1000);
                    file.fileMd5 = val;
                    // file.uid = WebUploader.Base.guid();
                    const { size, ext, name, uid, fileMd5 } = file;
                    // 做文件整体md5验证
                    $.ajax({
                        type: "POST",
                        url: backEndUrl,
                        headers: {      //请求头
                            "Auth-token": store.get('Token')
                        },
                        data: {
                            oprType: "md5Check",
                            fileMd5: fileMd5,
                            fileType: ext,
                            // fileSize: size,
                            path: rootPath,
                            // file
                        },
                        cache: false,
                        timeout: 1000, //todo 超时的话，只能认为该文件不曾上传过
                        dataType: "json"
                    }).then(function (data, textStatus, jqXHR) {
                        //console.log(data);
                        if (data.resData.isCompleteFlag) {   // 若存在，这返回失败给WebUploader，表明该文件不需要上传
                            dfd.reject();
                            uploader.skipFile(file);  // 跳过一个文件上传，直接标记指定文件为已上传状态。

                            // 修改文件状态，上传完成
                            this.setUploadStatus('done', file.id).then(() => {
                                this.props.onChange(file, this.state.fileList);
                            });
                        } else {
                            dfd.resolve();
                            // 约定文件唯一标记，拿到上传文件的唯一名称，用于断点续传
                            // fileMd5 = val;
                        }
                    }, function (jqXHR, textStatus, errorThrown) {    //任何形式的验证失败，都触发重新上传
                        dfd.resolve();
                        // 拿到上传文件的唯一名称，用于断点续传
                        // fileMd5 = val;
                    });
                });
                return dfd.promise();
            },
            /**
             * 在分片发送之前request，可以用来做分片验证，如果此分片已经上传成功了，可返回一个rejected promise来跳过此分片上传
             * @param {*} block 分片对象
             */
            beforeSend: function (block) {
                //分片验证是否已传过，用于断点续传
                var dfd = new WebUploader.Deferred();
                const { file: { fileMd5, size, ext }, chunks, chunk, end, start } = block;
                console.log('beforeSend >>>>>>', block);
                const { chunkSize } = options;
                const chunkTotal = Math.ceil(size / chunkSize);
                console.log('chunkTotal:', chunkTotal);


                $.ajax({
                    type: "POST",
                    url: backEndUrl,
                    headers: {      //请求头
                        "Auth-token": store.get('Token')
                    },
                    data: {
                        oprType: "chunkCheck",
                        path: rootPath,
                        fileMd5: fileMd5,
                        fileType: ext,
                        chunkIndex: chunk + 1,
                        chunkTotal: chunks,
                        sizeOfPerChunk: end - start,
                        // file
                    },
                    cache: false,
                    timeout: 1000, //todo 超时的话，只能认为该分片未上传过
                    dataType: "json"
                }).then(function (data, textStatus, jqXHR) {
                    const isCompleteFlag = data.resData.isCompleteFlag;
                    const isChunkUploadedFlag = data.resData.isChunkUploadedFlag;
                    if (!isCompleteFlag) {
                        if (isChunkUploadedFlag) {   //若存在，返回失败给WebUploader，表明该分块不需要上传
                            dfd.reject();    // 分片存在，跳过
                        } else {
                            dfd.resolve();   // 分块不存在或不完整，重新发送该分块内容  
                        }
                    } else {
                        dfd.reject();

                        this.setUploadStatus('done', file.id).then(() => {
                            this.props.onChange(file, this.state.fileList);
                        });
                    }
                }, function (jqXHR, textStatus, errorThrown) {    //任何形式的验证失败，都触发重新上传
                    dfd.resolve();
                });
                return dfd.promise();
            },
            /**
             * 	在所有分片都上传完毕后，且没有错误后request，用来做分片验证，此时如果promise被reject，当前文件上传会触发错误。
             * @param {*} file File对象
             */
            // afterSendFile: function (file) {
            //     // console.log('afterSendFile >>>>>>');

            //     const { chunkSize } = options;
            //     var chunksTotal = 0;
            //     if ((chunksTotal = Math.ceil(file.size / chunkSize)) > 1) {
            //         //合并请求
            //         var dfd = new WebUploader.Deferred();
            //         $.ajax({
            //             type: "PUT",
            //             url: backEndUrl,
            //             data: {
            //                 status: "chunksMerge",
            //                 chunkTotal: chunksTotal,
            //                 ext: file.ext,
            //                 fileMd5: file.fileMd5
            //             },
            //             cache: false,
            //             dataType: "json"
            //         }).then(function (data, textStatus, jqXHR) {
            //             //TODO 检查响应是否正常
            //             dfd.resolve();
            //             file.path = data.path;
            //             // 修改文件状态，上传完成
            //             this.setUploadStatus('done', file.id).then(() => {
            //                 this.props.onChange(file, this.state.fileList);
            //             });
            //         }, function (jqXHR, textStatus, errorThrown) {
            //             dfd.reject();
            //         });
            //         return dfd.promise();
            //     } else {
            //         // 修改文件状态，上传完成
            //         this.setUploadStatus('done', file.id).then(() => {
            //             this.props.onChange(file, this.state.fileList);
            //         });
            //     }
            // }
        });
    }

    createWebUploaderInterface() {
        // console.log('createWebUploaderInterface >>>>>> create');
        const { backEndUrl, formData, accept } = this.props;
        this.uploader = WebUploader.create({
            server: backEndUrl,
            formData,
            accept,
            ...options
        });
    }

    bindWebUploaderEvent() {
        this.uploader
            .on('beforeFileQueued', this.handleBeforeFileQueued)  // 当文件被加入队列之前触发。
            .on('fileQueued', this.handleFileQueued)              // 当文件被加入队列以后触发。
            .on('uploadBeforeSend', this.handleBeforeSend)        // 当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开起分片上传的前提下此事件可能会触发多次。
            .on('uploadProgress', this.handleUploadProgress)      // 上传过程中触发，携带上传进度。
            .on('uploadAccept', this.handleUploadAccept)          // 当某个文件上传到服务端响应后，会派送此事件来询问服务端响应是否有效。如果此事件handler返回值为false, 则此文件将派送server类型的uploadError事件。
            .on('uploadError', this.handleUploadError)            // 当文件上传出错时触发。
            .on('uploadSuccess', this.handleUploadSuccess)        // 当文件上传成功时触发。
            .on('uploadComplete', this.handleuploadComplete);     // 完成上传完了，成功或者失败，先删除进度条。
    }

    // 根据 id 筛选出 file ，然后设置 file 的 key-value 值
    setFileItem = (key, value, id) => {
        return new Promise((resolve) => {
            const { fileList } = this.state;
            const copy = [...fileList];
            const result = copy.filter(item => item.id === id);
            if (result.length) {
                result[0][key] = value;
                this.setState({
                    fileList: copy,
                }, () => { resolve(); });
            }
        });
    }

    // 设置 file 的 uploadStatus 值
    setUploadStatus = currying(this.setFileItem, 'uploadStatus')

    /**
     * 当文件被加入队列之前触发
     * 可用来判断所上传的文件类型是否符合要求
     * TODO 还可以用来判断用户是否有上传权限
     */
    handleBeforeFileQueued = file => {
        // console.log('handleBeforeFileQueued >>>>>>');
        const { beforeFileQueued } = this.props;
        return beforeFileQueued(file);
    }

    /**
     * 当文件被加入队列以后触发。
     */
    handleFileQueued = file => {
        // console.log('handleFileQueued >>>>>>', file);
        const { onShowModal } = this.props;
        const { fileList } = this.state;
        const { auto } = options;
        file.percentage = 0;
        file.uploadStatus = 'pretreatment';

        // 计算文件 md5 值，返回一个 promise 对象，可以监听 progress 进度。
        this.uploader.md5File(file)
            .progress((percentage) => {  // 及时显示进度
                // console.log('Percentage:', percentage);
                this.setUploadStatus('pretreatment', file.id);
            })
            .then((val) => {  // 完成
                this.setUploadStatus('init', file.id);
                this.setFileItem('fileMd5', val, file.id);
                if (auto && file.uploadStatus !== 'done') {
                    this.uploader.upload(file, file.id);
                    // 弹出框展示上传列表
                    onShowModal();
                }
            });

        this.setState({
            fileList: [...fileList, file],
        });
    }

    /**
     * 当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开启分片上传的前提下此事件可能会触发多次。
     * ？？？
     */
    handleBeforeSend = (block, data, headers) => {
        console.log('data', data);

        headers['Auth-token'] = store.get('Token');   // 添加token拦截

        const { file: { fileMd5, id, ext }, chunks, chunk, end, start } = block;
        const { fillDataBeforeSend, rootPath } = this.props;
        // const v = fillDataBeforeSend();
        // Object.assign(data, v);
        data.path = rootPath;
        data.fileMd5 = fileMd5 || '';    // data 中 加入 md5 值
        data.fileType = ext;
        if (chunks === 1) { // 未切片的加入默认值
            data.chunkTotal = 1;
            data.chunkIndex = 1;
        }
        data.chunkTotal = chunks;
        data.chunkIndex = chunk + 1;
        data.sizeOfPerChunk = end - start;
        data.oprType = "chunkCheck";
        delete data.id;
        delete data.name;
        delete data.type;
        delete data.lastModifiedDate;
        delete data.size;
        this.setUploadStatus('process', id);
    }

    /**
     * 上传过程中触发，携带上传进度。
     */
    handleUploadProgress = (file, percentage) => {
        // console.log('handleUploadProgress >>>>>>', file, '---', percentage);
        this.setFileItem('percentage', percentage, file.id);
    }

    /**
     * 当某个文件上传到服务端响应后，会派送此事件来询问服务端响应是否有效。如果此事件handler返回值为false, 则此文件将派送server类型的uploadError事件。
     */
    handleUploadAccept = (file, ret) => {
        // console.log('handleUploadAccept >>>>>>', file, '---', ret);
        const { uploadResponse } = this.props;
        return uploadResponse(file, ret);
    }

    /**
     * 当文件上传出错时触发。
     */
    handleUploadError = (file, reason) => {
        // console.log('handleUploadError >>>>>>', file, '---', reason);
        file.error = reason;
        this.setUploadStatus('error', file.id).then(() => {
            this.props.onChange(file, this.state.fileList);
        });
    }

    /**
     * 当文件上传成功时触发。
     */
    handleUploadSuccess = (file, res) => {
        // console.log('handleUploadSuccess >>>>>>', file, '---', res);
        file.response = res._raw;
        this.setUploadStatus('done', file.id).then(() => {
            this.props.onChange(file, this.state.fileList);
        });
    }

    /**
     * 完成上传完了，成功或者失败，先删除进度条。
     */
    handleuploadComplete = file => {
        // console.log('handleuploadComplete >>>>>>', file);
        // TODO 删除进度条
    }

    /**
     * 开始上传。此方法可以从初始状态调用开始上传流程，也可以从暂停状态调用，继续上传流程。
     * 可以指定开始某一个文件。
     */
    upload = (id) => {
        // console.log('upload >>>>>>', id);
        this.uploader.upload(id);
    }

    /**
     * 重试上传，重试指定文件，或者从出错的文件开始重新上传。
     */
    retry = (id) => {
        // console.log('retry >>>>>>', id);
        this.uploader.retry(this.uploader.getFile(id));
        this.setUploadStatus('process', id);
    }

    /**
     * 暂停上传
     */
    pause = id => {
        // console.log('pause >>>>>>', id);
        const { fileList } = this.state;
        const index = fileList.findIndex((item) => item.id === id);
        const currentFile = fileList[index];
        // console.log('pause currentFile >>>>>>', currentFile);
        // console.log('pause currentFile >>>>>>', this.uploader.getFile(id));

        // 此处为第一个坑，在API里暂停是调用stop方法，此处想要暂停指定文件，显然应该用stop(file)方法，
        // 然而实践之后发现调用stop(file)方法会报错 “Cannot read property 'file' of undefined”,
        // 之后再点击继续发现无法继续上传，没有发出请求。
        // 后来经过各种尝试后采用了cancelFile方法，可以暂停并继续，但此方法会标记文件为已取消状态，可以再次手动选择添加进队列，从而不触发文件重复的error监听。
        // this.uploader.stop(currentFile);   
        this.uploader.cancelFile(currentFile);

        // TODO 隐藏暂停icon，显示继续上传icon
        this.setUploadStatus('pause', id);
    }

    /**
     * 继续上传
     */
    resume = id => {
        // console.log('resume >>>>>>', id);
        const { fileList } = this.state;
        const index = fileList.findIndex((item) => item.id === id);
        const currentFile = fileList[index];
        this.uploader.upload(currentFile);

        // TODO 隐藏继续上传icon，显示暂停icon
    }

    /**
     * 取消上传
     * 移除某一文件
     */
    remove = (id) => {
        // console.log('remove >>>>>>', id);
        const { fileList } = this.state;
        const index = fileList.findIndex((item) => item.id === id);
        const currentFile = fileList[index];
        fileList.splice(index, 1);
        this.setState({
            fileList,
        }, () => {
            this.props.onChange(currentFile, this.state.fileList);
        });

        //移除某一文件, 默认只会标记文件状态为已取消，如果第二个参数为 true 则会从 queue 中移除。
        this.uploader.removeFile(this.uploader.getFile(id, true));
    }

    fileCategory(ext) {
        let type = '';
        const typeMap = {
            image: ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'],
            video: ['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'],
            text: ['doc', 'txt', 'docx', 'pages', 'epub', 'pdf', 'numbers', 'csv', 'xls', 'xlsx', 'keynote', 'ppt', 'pptx'],
            zip: ['rar', 'zip'],
            config: ['cvs', 'IP', 'IO', 'STD', 'cnfg']
        };
        Object.keys(typeMap).forEach((_type) => {
            const extensions = typeMap[_type];
            if (extensions.indexOf(ext) > -1) {
                type = _type
            }
        });
        return type
    }

    fileSize(size) {
        const formatSize = WebUploader.Base.formatSize(size);
        return formatSize;
    }

    renderFileList2(fileList) {
        // console.log('renderFileList22222 >>>>>>', fileList);

        const list = fileList.map((file) => {
            const { id, name, ext, size, percentage, uploadStatus } = file;
            const cn = 'fileType' + this.fileCategory(ext);

            return (
                <ul className={styles.fileItem} key={id}>
                    <li className={styles.fileName}>
                        <Tooltip placement="bottomLeft" title={name}>
                            {name}
                        </Tooltip>
                    </li>
                    <li className={styles.fileSize}>{this.fileSize(size)}</li>
                    <li className={styles.fileStatus} style={uploadStatus === 'error' ? { color: 'red' } : {}}>
                        {uploadStatus === 'process' ? ((percentage * 100).toFixed(2) + '%') : uploadStatus}
                    </li>
                    <li className={styles.fileOperate}>
                        <a title="开始" onClick={() => this.resume(id)}><Icon component={PauseSvg} /></a>
                        <a title="暂停" onClick={() => this.pause(id)}><Icon component={PlaySvg} /></a>
                        <a title="移除" onClick={() => this.remove(id)} ><Icon component={CrossSvg} /></a >
                    </li >
                    <li className={styles.progress} style={{ width: `${percentage * 100}%` }}></li>
                </ul>
            )
        })

        return (
            <div className={styles.filePanel}>
                {/* <h2>文件列表</h2> */}
                <div className={styles.fileList}>
                    {list}
                    {fileList && fileList.length === 0 && <div className={styles.noFile}> 暂无待上传文件</div>}
                </div >
            </div >
        )
    }

    onCancelClick = (e, fileList) => {
        e.preventDefault();
        const { modalProps: { onhandleCancelClick } } = this.props;
        onhandleCancelClick(fileList);
    }

    render() {
        const { modalProps } = this.props;
        const { fileList } = this.state;

        return (
            <div className={styles.largeUploader}>
                <div id="picker"><Icon type="cloud-upload" />上传</div>
                <Modal className={styles.modal} {...modalProps} onCancel={e => this.onCancelClick(e, fileList)}>
                    {this.renderFileList2(fileList)}
                </Modal>
            </div>
        );
    }
}

LargeUploader.propTypes = {
    // options: PropTypes.object,
    backEndUrl: PropTypes.string,        // 后台接口
    rootPath: PropTypes.string,          // 指定上传路径
    formData: PropTypes.object,
    accept: PropTypes.object,
    onChange: PropTypes.func,            // 当文件上传成功、失败或者删除文件的时候调用。
    width: PropTypes.string,
    border: PropTypes.bool,
    children: PropTypes.element,
    beforeFileQueued: PropTypes.func,    // 文件加入队列之前的回调，可以在这里做文件的校验，拦截。
    fillDataBeforeSend: PropTypes.func,  // 用于 uploader 自动发送请求之前，填充 data 对象。
    uploadResponse: PropTypes.func,      // 注册上传操作收到 response 的函数，用于判断是否上传成功。
    onShowModal: PropTypes.func
}

LargeUploader.defaultProps = {
    // options: {},
    // backEndUrl: '/upload',
    formData: {},
    accept: {},
    onChange: () => { },
    width: '100%',
    border: true,
    beforeFileQueued: () => true,
    // fillDataBeforeSend: () => ({ fileType: '1' }),
    uploadResponse: (file, ret) => {
        const { code } = ret;
        return code === 0;
    },
}