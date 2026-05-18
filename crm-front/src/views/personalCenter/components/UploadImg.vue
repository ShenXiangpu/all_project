<template>
  <div>
    <el-upload
      :limit="1"
      action="#"
      :disabled="disabled"
      list-type="picture-card"
      :file-list="fileList"
      :http-request="doUpload"
    >
      <i
        slot="default"
        :class="!disabled ? 'el-icon-plus' : 'el-icon-circle-close'"
      ></i>
      <div slot="file" slot-scope="{ file }" class="">
        <img class="el-upload-list__item-thumbnail" :src="filePath" alt="" />
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>

          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog
      title="头像预览"
      :visible.sync="dialogVisible"
      class="el-dialog-edu--"
    >
      <div>
        <div>
          <el-image
            class="el-avatar-edu"
            :fit="'contain'"
            :src="filePath"
          ></el-image>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { string } from "clipboard";
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    filePath: {
      type: String,
      default: () => {
        return "";
      },
    },
    fileList: {
      //按钮类型
      type: Array | String,
      default: () => {
        return [];
      },
    },
  },
  watch: {
    filePath(newVal, oldVal) {
      console.log(newVal);
    },
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    handleRemove(file) {
      console.log(this.filePath);
      this.$emit("handleRemove");
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    doUpload(files) {
      console.log(files);
      this.$emit("doUpload", files);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-avatar-edu.el-avatar {
  width: 100px;
  height: 100px;
}

.el-dialog-edu-- {
  ::v-deep {
    .el-dialog {
      width: 300px;
      .el-dialog__header {
        height: 45px;
        line-height: 25px;
      }
      .el-dialog__title {
        line-height: 15px;
      }
      .el-dialog__body {
        height: 150px;
      }
    }
  }
  ::v-deep .el-image.el-avatar-edu {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
  ::v-deep .el-image__inner {
    width: 100px;
    height: 100px;
    border: 2px solid #ccc;
    border-radius: 50%;
  }
}
</style>