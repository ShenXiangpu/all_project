<template>
  <div class="container">
    
    <uploader ref="uploader" @file-removed="fileRemoved" @files-submitted="filesSubmitted" :options="options"
      :autoStart="false" :file-status-text="fileStatusText" @file-added="onFileAdded" @file-success="onFileSuccess"
      @file-error="onFileError" @file-progress="onFileProgress" @file-complete="fileComplete" class="uploader-example">
      <uploader-unsupport></uploader-unsupport>
      <uploader-drop>
        <!-- <p>拖动文件到这里上传</p> -->
        文件名称：&nbsp;<el-input class="el-input-edu-400" v-model="defineFileName" placeholder="请输入文件名称"/>
        <!-- <uploader-btn :directory="true">选择文件夹</uploader-btn> -->
      </uploader-drop>
      <uploader-drop>
        <p>注意：文件大小不能超过5G</p>
        <uploader-btn class="chooseBtn">选择文件</uploader-btn>
        <!-- <uploader-btn :directory="true">选择文件夹</uploader-btn> -->
      </uploader-drop>
      <!-- uploader-list可自定义样式 -->
      <!-- <uploader-list></uploader-list> -->
      <uploader-list>
        <div class="file-panel" :class="{ collapse: collapse }">
          <div class="file-title">
            <p class="file-list-title">文件列表</p>
            <div class="operate">
              <el-button type="text" @click="operate" :title="collapse ? '折叠' : '展开'">
                <i class="icon" :class="collapse ? 'el-icon-caret-bottom' : 'el-icon-caret-top'
                  "></i>
              </el-button>
              <!-- <el-button type="text" @click="close" title="关闭">
                <i class="icon el-icon-close"></i>
              </el-button> -->
            </div>
          </div>

          <ul class="file-list" :class="collapse ? 'uploader-list-ul-show' : 'uploader-list-ul-hidden'
            ">
            <li v-for="file in uploadFileList" :key="file.id">
              <uploader-file :class="'file_' + file.id" ref="files" :file="file" :list="true"></uploader-file>
            </li>
            <div class="no-file" v-if="!uploadFileList.length">
              <i class="icon icon-empty-file"></i> 暂无待上传文件
            </div>
          </ul>
        </div>
      </uploader-list>
      <uploader-drop>
        <el-button :disabled="!(uploadFileList && uploadFileList.length > 0)" type="primary" size="mini" class="" @click="submitUpload">开始上传</el-button>
      </uploader-drop>
    </uploader>
  </div>
</template>

<script>
import { getToken, getRefreshToken } from '@/utils/auth'
import $ from 'jquery'
window.jQuery = $;
import SparkMD5 from "spark-md5";
const FILE_UPLOAD_ID_KEY = "file_upload_id";
// 分片大小，20MB
const CHUNK_SIZE = 5 * 1024 * 1024;
export default {
  props: {
    target: {
      default: '/edu/zkxy-vmware-api/file/upload',
      type: String
    }
  },
  data() {
    const token = getToken()
    return {
      defineFileName:'',
      options: {
        // 上传地址
        target: this.target,
        // target:(file,chunk,isTest) => {
        //   console.log(file,chunk,isTest);
        // },
        // uploadMethod: 'post',
        singleFile: true,
        processParams: (params, file, chunk, isTest) => {

          return {
            index: params.chunkNumber,
            md5: params.identifier,
            fileName: params.filename,
          }
        },
        // testMethod: "post",
        headers: { 'Auth-token': token },
        // 是否开启服务器分片校验。默认为 true
        testChunks: true,
        // 真正上传的时候使用的 HTTP 方法,默认 POST
        uploadMethod: "post",
        // 分片大小
        chunkSize: CHUNK_SIZE,
        // 并发上传数，默认为 3
        simultaneousUploads: 3,
        /**
         * 判断分片是否上传，秒传和断点续传基于此方法
         * 这里根据实际业务来 用来判断哪些片已经上传过了 不用再重复上传了 [这里可以用来写断点续传！！！]
         */
        checkChunkUploadedByResponse: (chunk, message) => {
          console.log(chunk, message);
          // // message是后台返回
          // let resData = JSON.parse(message);
          // let flag = resData.flag;
          // if (dataObj.uploaded !== undefined) {
          //   return dataObj.uploaded;
          // }
          // // 判断文件或分片是否已上传，已上传返回 true
          // // 这里的 uploadedChunks 是后台返回]
          // return (dataObj.uploadedChunks || []).indexOf(chunk.offset + 1) >= 0;
        },
        parseTimeRemaining: function (timeRemaining, parsedTimeRemaining) {
          //格式化时间
          return parsedTimeRemaining
            .replace(/\syears?/, "年")
            .replace(/\days?/, "天")
            .replace(/\shours?/, "小时")
            .replace(/\sminutes?/, "分钟")
            .replace(/\sseconds?/, "秒");
        },
      },
      // 修改上传状态
      fileStatusTextObj: {
        success: "上传成功",
        error: "上传错误",
        uploading: "正在上传",
        paused: "停止上传",
        waiting: "等待中",
      },
      uploadIdInfo: null,
      uploadFileList: [],
      fileChunkList: [],
      collapse: true,
    };
  },
  created() {
    // window.open('https://view.officeapps.live.com/op/view.aspx?src='+encodeURI("https://qiniu.qkongtao.cn/2022/08/20220829082301689.pptx"))
  },
  methods: {



    async fileComplete() {
      // for (let i = 0; i < arguments[0].files.length; i++) {
      //   await https.POST(urls.sliceMerging, { folder: this.folder, ...arguments[0].files[i] });
      // }
    },
    submitUpload() {
      let self = this;
      this.$nextTick(() => {
        for (var i = 0; i < self.$refs.uploader.files.length; i++) {
          self.$refs.uploader.files[i].resume();
        }
      });
    },

    onFileAdded(file, event) {
      this.uploadFileList.push(file);
      // 有时 fileType为空，需截取字符
      console.log("文件类型：" + file.fileType);
      // 文件大小
      console.log("文件大小：" + file.size + "B");
      // 1. todo 判断文件类型是否允许上传
      // 2. 计算文件 MD5 并请求后台判断是否已上传，是则取消上传
      console.log("校验MD5");
      this.getFileMD5(file, (md5) => {
        console.log(md5, 'md5');
        if (md5 != "") {
          // 修改文件唯一标识
          file.uniqueIdentifier = md5;
          // 请求后台判断是否上传
          // 恢复上传
          // file.resume();
        }
      });
    },
    onFileSuccess(rootFile, file, response, chunk) {
      this.$emit('onFileSuccess', { rootFile, file, response, chunk,defineFileName:this.defineFileName })
    },
    onFileError(rootFile, file, message, chunk) {
      console.log("上传出错：" + message);
    },
    onFileProgress(rootFile, file, chunk) {
      console.log(rootFile, file, chunk);

      console.log(`当前进度：${Math.ceil(file._prevProgress * 100)}%`);
    },

    fileRemoved(files) {
      console.log(files);
      let uploadFileList = this.uploadFileList;
      uploadFileList = uploadFileList.filter((item) => {
        return item.id != files.id;
      })
      this.uploadFileList = uploadFileList
    },
    filesSubmitted(files, fileList, event) {

    },

    // 计算文件的MD5值
    getFileMD5(file, callback) {
      let spark = new SparkMD5.ArrayBuffer();
      let fileReader = new FileReader();
      //获取文件分片对象（注意它的兼容性，在不同浏览器的写法不同）
      let blobSlice =
        File.prototype.slice ||
        File.prototype.mozSlice ||
        File.prototype.webkitSlice;
      // 当前分片下标
      let currentChunk = 0;
      // 分片总数(向下取整)
      let chunks = Math.ceil(file.size / CHUNK_SIZE);
      // MD5加密开始时间
      let startTime = new Date().getTime();
      // 暂停上传
      file.pause();
      loadNext();
      // fileReader.readAsArrayBuffer操作会触发onload事件
      fileReader.onload = function (e) {
        console.log("currentChunk :>> ", currentChunk);
        spark.append(e.target.result);
        if (currentChunk < chunks) {
          currentChunk++;
          loadNext();
        } else {
          // 该文件的md5值
          let md5 = spark.end();
          console.log(
            `MD5计算完毕：${md5}，耗时：${new Date().getTime() - startTime} ms.`
          );
          // 回调传值md5
          callback(md5);
        }
      };
      fileReader.onerror = function () {
        this.$message.error("文件读取错误");
        file.cancel();
      };
      // 加载下一个分片
      function loadNext() {
        const start = currentChunk * CHUNK_SIZE;
        const end =
          start + CHUNK_SIZE >= file.size ? file.size : start + CHUNK_SIZE;
        // 文件分片操作，读取下一分片(fileReader.readAsArrayBuffer操作会触发onload事件)
        fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
      }
    },
    fileStatusText(status, response) {
      
      console.log(status, response);
      if (status === "md5") {
        return "校验MD5";
      } else {
        return this.fileStatusTextObj[status];
      }
    },
    /**
     * 折叠、展开面板动态切换
     */
    operate() {
      if (this.collapse === false) {
        this.collapse = true;
      } else {
        this.collapse = false;
      }
    },

    /**
     * 关闭折叠面板
     */
    close() {
      this.uploaderPanelShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.uploader-example {
  width: 880px;
  padding: 15px;
  margin: 40px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

.uploader-example .uploader-btn {
  margin-right: 4px;
}

.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}

#global-uploader {
  position: fixed;
  z-index: 20;
  right: 15px;
  bottom: 15px;
  width: 550px;
}

.file-panel {
  background-color: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 7px 7px 0 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.file-title {
  display: flex;
  // height: 40px;
  // line-height: 30px;
  padding: 0 15px;
  border-bottom: 1px solid #ddd;
}

.file-title {
  background-color: #e7ecf2;
}

.uploader-file-meta {
  display: none !important;
}

.operate {
  flex: 1;
  text-align: right;
}

.file-list {
  position: relative;
  height: 50px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #fff;
  padding: 0px;
  margin: 0 auto;
  transition: all 0.5s;
}

.uploader-file-size {
  width: 15% !important;
}

.uploader-file-status {
  width: 32.5% !important;
  text-align: center !important;
}

li {
  background-color: #fff;
  list-style-type: none;
}

.no-file {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
}

/* 隐藏上传按钮 */
.global-uploader-btn {
  display: none !important;
  clip: rect(0, 0, 0, 0);
  /* width: 100px;
  height: 50px; */
}

.file-list-title {
  line-height: 40px;
  font-size: 16px;
}

.uploader-file-name {
  width: 36% !important;
}

.uploader-file-actions {
  float: right !important;
}

.uploader-list-ul-hidden {
  height: 0px;

}

.chooseBtn {
  background: #10abb9;
  border: 1px solid #10abb9;
  color: #fff;
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 3px;
  display: inline;
  font-weight: 500;
}

.chooseBtn:hover {
  background-color: #10abb9;
}
</style>