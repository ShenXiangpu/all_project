/* eslint-disable no-console */
/* eslint-disable valid-jsdoc */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import WebUploader from 'webuploader'
import 'webuploader/css/webuploader.css'
import styles from './upload.less'
import $ from 'jquery';
import store from 'store'

window.jQuery = $;
// const WebUploader = require('webuploader');

/**
 * 参考：
 * 1. WebUploader: http://fex.baidu.com/webuploader/
 * 2. react-large-uploader: https://github.com/sunyongjian/react-large-uploader
 * 3. 在React中使用WebUploader实现大文件分片上传的踩坑日记！：https://www.cnblogs.com/AIonTheRoad/p/11252253.html
 * 4. webuploader 断点续传: https://www.cnblogs.com/mywebnumber/p/5953398.html
 */
const currying = (fn, ...ahead) => (...behind) => fn(...ahead, ...behind);

const options = {
    chunked: false,               // 是否要分片处理大文件上传。
    chunkSize: 1 * 1024 * 1024,  // 如果要分片，分多大一片？ 默认大小为5M.
    chunkRetry: 3,               // 如果某个分片由于网络问题出错，允许自动重传的次数
    threads: 3,                  // 上传并发数。允许同时最大上传进程数。
    fileSizeLimit: 24 * 1024 * 1024 * 1024,          // 24G,验证文件总大小是否超出限制, 超出则不允许加入队列。
    fileSingleSizeLimit: 12 * 1024 * 1024 * 1024,    // 12G,验证单个文件大小是否超出限制, 超出则不允许加入队列。
    duplicate: true,             // 去重， 根据文件名字、文件大小和最后修改时间来生成hash Key.
    prepareNextFile: true,       // 是否允许在文件传输时提前把下一个文件准备好。 对于一个文件的准备工作比较耗时，比如图片压缩，md5序列化。 如果能提前在当前文件传输期处理，可以节省总体耗时。
    resize: false,
    auto: true,                  // 选择文件后是否自动上传, 设置为 true 后，不需要手动调用上传，有文件选择即开始上传。
}

class FileUpload extends React.Component {

    componentDidMount() {
        // console.log(WebUploader.Uploader.support());
        if (!WebUploader.Uploader.support()) {
            alert('Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
            throw new Error('WebUploader does not support the browser you are using.');
        } else {

            // this.initWebUploaderHook();
            this.createWebUploaderInterface();
            this.bindWebUploaderEvent();
        }
    }

    initWebUploaderHook() {
        const { md5CheckUrl, chunkCheckUrl, rootPath } = this.props

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
                    const { ext, fileMd5 } = file;
                    // 做文件整体md5验证
                    $.ajax({
                        type: "POST",
                        url: md5CheckUrl,
                        headers: {      //请求头
                            "Auth-token": store.get('Token')
                        },
                        data: {
                            fileMd5: val,
                            // path: rootPath,
                        },
                        cache: false,
                        timeout: 1000, //todo 超时的话，只能认为该文件不曾上传过
                        dataType: "json"
                    }).then(function (data, textStatus, jqXHR) {
                        //console.log(data);
                        if (data.resData.uploaded) {   // 若存在，这返回失败给WebUploader，表明该文件不需要上传
                            dfd.reject();
                            this.uploader.skipFile(file);  // 跳过一个文件上传，直接标记指定文件为已上传状态。

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
                console.log('beforeSend>>>>>>>');
                var dfd = new WebUploader.Deferred();
                const { file: { fileMd5, size, ext }, chunks, chunk, end, start } = block;
                console.log('beforeSend >>>>>>', block);
                const { chunkSize } = options;
                const chunkTotal = Math.ceil(size / chunkSize);
                console.log('chunkTotal:', chunkTotal);


                $.ajax({
                    type: "POST",
                    url: chunkCheckUrl,
                    headers: {      //请求头
                        "Auth-token": store.get('Token')
                    },
                    data: {
                        fileMd5: fileMd5,
                        // fileType: ext,
                        chunkIndex: chunk + 1,
                        // chunkTotal: chunks,
                        // sizeOfPerChunk: end - start,
                        // file
                    },
                    cache: false,
                    timeout: 1000, //todo 超时的话，只能认为该分片未上传过
                    dataType: "json"
                }).then(function (data, textStatus, jqXHR) {
                    const chunkUploadedFlag = data.resData.chunkUploadedFlag;
                    if (chunkUploadedFlag) {   //若存在，返回失败给WebUploader，表明该分块不需要上传
                        dfd.reject();    // 分片存在，跳过
                    } else {
                        dfd.resolve();   // 分块不存在或不完整，重新发送该分块内容
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
            afterSendFile: function (file) {
                console.log('afterSendFile >>>>>>');

                const { chunkSize } = options;
                var chunksTotal = 0;
                if ((chunksTotal = Math.ceil(file.size / chunkSize)) > 1) {
                    //合并请求
                    var dfd = new WebUploader.Deferred();
                    $.ajax({
                        type: "POST",
                        // url: backEndUrl,
                        data: {
                            status: "merge",
                            chunkTotal: chunksTotal,
                            ext: file.ext,
                            fileMd5: file.fileMd5
                        },
                        cache: false,
                        dataType: "json"
                    }).then(function (data, textStatus, jqXHR) {
                        const isUploadSuccess = data.resData.uploadSuccess;
                        if (isUploadSuccess) {
                            // 检查响应是否正常
                            dfd.resolve();
                            file.path = data.path;
                            // 修改文件状态，上传完成
                            this.setUploadStatus('done', file.id).then(() => {
                                this.props.onChange(file, this.state.fileList);
                            });
                        } else {
                            dfd.reject();
                        }
                    }, function (jqXHR, textStatus, errorThrown) {
                        dfd.reject();
                    });
                    return dfd.promise();
                } else {
                    // 修改文件状态，上传完成
                    this.setUploadStatus('done', file.id).then(() => {
                        this.props.onChange(file, this.state.fileList);
                    });
                }
            }
        });
    }

    createWebUploaderInterface() {
        // console.log('createWebUploaderInterface >>>>>> create');
        const { uploadUrl, formData, accept, pickerId, isDirectory } = this.props;
        this.uploader = WebUploader.create({
            server: uploadUrl,
            formData,
            accept,
            webkitdirectory: !!isDirectory,
            pick: `#${pickerId}`,
            ...options
        });
    }

    bindWebUploaderEvent() {
        this.uploader
            .on('beforeFileQueued', this.handleBeforeFileQueued)  // 当文件被加入队列之前触发。
            .on('fileQueued', this.handleFileQueued)              // 当文件被加入队列以后触发。
            .on('uploadBeforeSend', this.handleBeforeSend)        // 当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开启分片上传的前提下此事件可能会触发多次。
            .on('uploadProgress', this.handleUploadProgress)      // 上传过程中触发，携带上传进度。
            .on('uploadAccept', this.handleUploadAccept)          // 当某个文件上传到服务端响应后，会派送此事件来询问服务端响应是否有效。如果此事件handler返回值为false, 则此文件将派送server类型的uploadError事件。
            .on('uploadError', this.handleUploadError)            // 当文件上传出错时触发。
            .on('uploadSuccess', this.handleUploadSuccess)        // 当文件上传成功时触发。
            .on('uploadComplete', this.handleuploadComplete);     // 完成上传完了，成功或者失败，先删除进度条。
    }

    // 根据 id 筛选出 file ，然后设置 file 的 key-value 值
    setFileItem = (key, value, id) => {
        const { onSetFileList, fileList } = this.props
        return new Promise((resolve) => {
            // const { fileList } = this.state;
            const copy = [...fileList];
            const result = copy.filter(item => item.id === id);
            if (result.length) {
                result[0][key] = value;
                onSetFileList(copy)
                resolve();
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
        const { onShowModal, beforeFileQueued } = this.props;

        // 弹出框展示上传列表
        onShowModal(this.uploader);

        return beforeFileQueued(file);
    }

    /**
     * 当文件被加入队列以后触发。
     */
    handleFileQueued = file => {
        // console.log('handleFileQueued >>>>>>', file);
        const { onSetFileList, fileList } = this.props;
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
                }
            });

        onSetFileList([...fileList, file])
    }

    /**
     * 当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开启分片上传的前提下此事件可能会触发多次。
     * ？？？
     */
    handleBeforeSend = (block, data, headers) => {
        console.log('uploadBeforeSend 日志:');
        const { rootPath, pickerId, isDirectory, currentPathId } = this.props;

        // 上传文件夹时：
        console.log(block);//打印此对象，可以查看webkitRelativePath值
        if(isDirectory) {
          data.pathName = block.file.source.source.webkitRelativePath ? "/" + block.file.source.source.webkitRelativePath : '';
          console.log("webkitRelativePath:" + data.pathName);
        }

        headers['Auth-token'] = store.get('Token');   // 添加token拦截

        const { file: { id } } = block;
        data.currentPath = rootPath;
        data.currentPathId = currentPathId;
        data.isPublic = false;          //是否共享

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
        console.log('handleUploadProgress >>>>>> file: ', file);
        console.log('percentage:', percentage);
        this.setFileItem('percentage', percentage, file.id);
    }

    /**
     * 当某个文件上传到服务端响应后，会派送此事件来询问服务端响应是否有效。如果此事件handler返回值为false, 则此文件将派送server类型的uploadError事件。
     */
    handleUploadAccept = (file, ret) => {
        console.log('*** handleUploadAccept >>>>>> file:', file);
        console.log('ret:', ret);
        const {refreshList} = this.props;
        if (ret.flag) {
            refreshList();
        }
        return ret.flag;
    }

    /**
     * 当文件上传出错时触发。
     */
    handleUploadError = (file, reason) => {
        console.log('handleUploadError >>>>>> file:', file);
        console.log('reason:', reason);
        file.error = reason;
        this.setUploadStatus('error', file.id).then(() => {
            this.props.onChange(file, this.props.fileList);
        });
    }

    /**
     * 当文件上传成功时触发。
     */
    handleUploadSuccess = (file, res) => {
        console.log('handleUploadSuccess >>>>>> file:', file);
        console.log('res:', res);
        file.response = res._raw;
        this.setUploadStatus('done', file.id).then(() => {
            this.props.onChange(file, this.props.fileList);
        });
    }

    /**
     * 完成上传完了，成功或者失败，先删除进度条。
     */
    handleuploadComplete = file => {
        console.log('handleuploadComplete >>>>>> file:', file);
        // 删除进度条
    }

    render() {
        const { pickerId, isTaskUploader } = this.props;

        return (
            <div className={isTaskUploader ? styles.taskUploader : styles.largeUploader}>
                {pickerId === 'filePicker' ?
                    <div id={pickerId} style={{ marginRight: '16px'}}><Icon type="cloud-upload" />上传文件 </div> :
                    <div id={pickerId}><Icon type="folder" />上传文件夹</div>
                }
            </div>
        );
    }
}

FileUpload.propTypes = {
    // options: PropTypes.object,
    fileList: PropTypes.array,           // 正在上传的文件列表
    md5CheckUrl: PropTypes.string,       // 后台接口
    chunkCheckUrl: PropTypes.string,     // 后台接口
    uploadUrl: PropTypes.string,         // 后台接口
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

FileUpload.defaultProps = {
    // options: {},
    // backEndUrl: '/upload',
    formData: {},
    accept: {},
    isDirectory: false,
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

export default FileUpload;
