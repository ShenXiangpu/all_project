<template>
  <el-dialog
    title="提示"
    :visible.sync="uploadFileDialogVisible"
    width="30%"
    center
    :close-on-click-modal="false"
  >
    <file-list :fileList="fileList" :percentage="percentage"></file-list>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel">取 消</el-button>
      <el-button type="primary" @click="uploadFileDialogVisible"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
const WebUploader = require("webuploader");

const currying =
  (fn, ...ahead) =>
  (...behind) =>
    fn(...ahead, ...behind);
import FileList from "./components/FileList.vue";
export default {
  components: {
    FileList,
  },
  props: {
    fileList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    percentage: {
      type: Number,
      default: 0,
    },
    webUploader: {
      type: Object,
      default: () => {
        return {};
      },
    },
    uploadFileDialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      setUploadStatus: {},
    };
  },
  mounted() {
    this.setUploadStatus = currying(this.setFileItem, "uploadStatus");
  },

  methods: {
    //取消dialog
    onCancel() {
      this.$emit("onCancel", false);
    },
    onConfirm() {
      this.$emit("onConfirm", false);
    },
    // 根据 id 筛选出 file ，然后设置 file 的 key-value 值
    setFileItem(key, value, id) {
      return new Promise((resolve) => {
        const copy = [...this.fileList];
        const result = copy.filter((item) => item.id === id);
        if (result.length) {
          result[0][key] = value;
          this.$emit("onSetFileList", copy);
          resolve();
        }
      });
    },
    // 设置 file 的 uploadStatus 值
    // setUploadStatus(obj, str) {
    //     currying(this.setFileItem, 'uploadStatus')
    // },

    /**
     * 开始上传。此方法可以从初始状态调用开始上传流程，也可以从暂停状态调用，继续上传流程。
     * 可以指定开始某一个文件。
     */
    upload(id) {
      // console.log('upload >>>>>>', id);
      this.webUploader.upload(id);
    },
    /**
     * 重试上传，重试指定文件，或者从出错的文件开始重新上传。
     */
    retry(id) {
      this.webUploader.retry(this.webUploader.getFile(id));
      this.setUploadStatus("process", id);
    },
    /**
     * 暂停上传
     */
    pause(id) {
      // console.log('pause >>>>>>', id);
      const fileList = this.fileList;
      const webUploader = this.webUploader;
      const index = fileList.findIndex((item) => item.id === id);
      const currentFile = fileList[index];
      // console.log('pause currentFile >>>>>>', currentFile);
      // console.log('pause currentFile >>>>>>', webUploader.getFile(id));

      // 此处为第一个坑，在API里暂停是调用stop方法，此处想要暂停指定文件，显然应该用stop(file)方法，
      // 然而实践之后发现调用stop(file)方法会报错 “Cannot read property 'file' of undefined”,
      // 之后再点击继续发现无法继续上传，没有发出请求。
      // 后来经过各种尝试后采用了cancelFile方法，可以暂停并继续，但此方法会标记文件为已取消状态，可以再次手动选择添加进队列，从而不触发文件重复的error监听。
      // webUploader.stop(currentFile);
      webUploader.cancelFile(currentFile);

      // TODO 隐藏暂停icon，显示继续上传icon
      this.setUploadStatus("pause", id);
    },
    /**
     * 继续上传
     */
    resume(id) {
      // console.log('resume >>>>>>', id);
      const fileList = this.fileList;
      const webUploader = this.webUploader;

      const index = fileList.findIndex((item) => item.id === id);
      const currentFile = fileList[index];
      webUploader.upload(currentFile);

      // TODO 隐藏继续上传icon，显示暂停icon
    },
    /**
     * 取消上传
     * 移除某一文件
     */
    remove(id) {
      const fileList = this.fileList;
      const webUploader = this.webUploader;
      const index = fileList.findIndex((item) => item.id === id);
      const currentFile = fileList[index];
      fileList.splice(index, 1);

      this.$emit("onSetFileList", fileList);
      console.log("webUploader:", webUploader);
      //移除某一文件, 默认只会标记文件状态为已取消，如果第二个参数为 true 则会从 queue 中移除。
      webUploader.removeFile(webUploader.getFile(id, true));
    },

    fileCategory(ext) {
      let type = "";
      const typeMap = {
        image: ["gif", "jpg", "jpeg", "png", "bmp", "webp"],
        video: ["mp4", "m3u8", "rmvb", "avi", "swf", "3gp", "mkv", "flv"],
        text: ["txt", "pages", "epub", "numbers", "csv", "keynote"],
        zip: ["rar", "zip", "tar", "gzip", "7-zip"],
        pdf: ["pdf"],
        word: ["doc", "docx"],
        excel: ["xls", "xlsx"],
        ppt: ["ppt", "pptx"],
        html: ["html"],
      };
      Object.keys(typeMap).forEach((_type) => {
        const extensions = typeMap[_type];
        if (extensions.indexOf(ext) > -1) {
          type = _type;
        }
      });
      return type;
    },
    fileSize(size) {
      const formatSize = WebUploader.Base.formatSize(size);
      return formatSize;
    },
    onCancelClick(e, fileList) {
      e.preventDefault();
      this.$emit("onhandleCancelClick", fileList);
    },
  },
};
</script>

<style lang="scss" scoped>
$mainColor: #108ee9;
$mainTextSize: 12px;
$bottonTextSize: 12px;
$errorColor: red;

$h-row: 45px;

.filePanel {
  width: 100%;
  box-shadow: 0 2px 12px 1px rgba(0, 0, 0, 0.1);

  > h2 {
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
    border-radius: 4px 4px 0 0;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    font-size: 14px;
    margin-bottom: 0;
  }

  .fileList {
    position: relative;
    height: 360px;
    overflow-y: auto;
    background-color: rgb(250, 250, 250);
  }

  .fileItem {
    position: relative;
    height: $h-row;
    line-height: $h-row;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    z-index: 1;
    margin-bottom: 0;

    > li {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .fileType {
    width: 32px;
    line-height: 32px;
  }

  .svg {
    font-size: 24px;
  }

  .fileName {
    width: 42%;
  }

  .fileSize {
    width: 20%;
    margin-left: 10px;
  }

  .fileStatus {
    width: 20%;
  }

  .fileOperate {
    width: 15%;

    > a {
      padding: 10px 5px;
      cursor: pointer;
      color: #666;
      opacity: 0.8;
      font-size: 12px;

      &:hover {
        color: #1890ff;
      }
    }
  }

  .fileType {
    &text {
      background: url("../../assets/upload/file-text.png");
    }

    &video {
      background: url("../../assets/upload/file-video.png");
    }

    &image {
      background: url("../../assets/upload/file-image.png");
    }

    &zip {
      background: url("../../assets/upload/file-zip.png");
    }

    &config {
      background: url("../../assets/upload/file-config.png");
    }
  }

  .progress {
    position: absolute;
    top: 0;
    left: 0;
    height: $h-row - 1;
    width: 0;
    background-color: #e2edfe;
    z-index: -1;
  }

  .noFile {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
  }
}

.modal {
  :global {
    .ant-modal-body {
      padding: 0;
    }

    .ant-modal-header {
      padding: 0;
      height: 50px;

      .ant-modal-title {
        width: 92.5%;
        height: 100%;
        line-height: 50px;

        label {
          margin-left: 10px;
        }

        span {
          height: 100%;
          right: 0;
          color: rgba(0, 0, 0, 0.45);
          width: 30px;
          text-align: center;
          float: right;
          cursor: pointer;
        }
      }
    }

    .ant-modal-close-x {
      width: 40px;
    }
  }
}
</style>
