<template>
  <el-dialog
    append-to-body
    :title="textMap[dialog.status]"
    :visible.sync="dialog.visible"
    class="el-dialog-edu"
    @close="handleClose"
    :close-on-click-modal="false"
  >
    <div class="flex justify-center marginBottom20" style="position: relative">
      <div class="font20 fontW7 text-center">{{reportObj.userName}}的学情分析报告</div>
      <div
        style="position: absolute; right: 0px; bottom: -2px"
        class="text-right"
      >
        生成：{{ reportObj.createTime }}
      </div>
    </div>
    <report-info :reportObj="reportObj"></report-info>
    <div class="flex justify-center footer">
      <el-button size="small" class="marginRight20"  @click="handleClose"> 取消 </el-button>
      <el-button size="small" type="primary" class="editPrimary" @click="downloadDynamicContent" :loading="loading">
        下载
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import ReportInfo from "./ReportInfo/index.vue";

export default {
  name: "AddDialog",
  props: {},
  components: { ReportInfo },
  computed: {},
  watch: {
    reportObj: {
      handler(val) {
        this.reportObj = val;
      },
      immediate: true,
    },
  },
  data() {
    return {
      reportObj: {
      },
      dialog: {
        visible: false,
        status: "",
      },
      loading: false,
      textMap: {
        update: "",
        create: "",
        look: "",
      },
    };
  },
  methods: {
    downloadDynamicContent() {
      // 动态生成内容
      let fileUrl = this.reportObj.reportFileUrl
      if(fileUrl === null || fileUrl === '' || fileUrl === undefined) {
        return this.$message.error('报告生成失败')
      }
      let fileName = fileUrl.split('/').pop();
      const link = document.createElement('a');
      link.target = 'block'
      link.href = fileUrl;
      link.download = fileName; // 覆盖服务器返回的文件名
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    handleOpen() {
      this.dialog.visible = true;
      this.dialog.status = "create";
    },

    handleClose() {
      this.dialog.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dialog-edu {
  ::v-deep {
    .el-dialog {
      width: 1000px;
    }
    .el-dialog__body {
      padding-top: 20px;
      padding-bottom: 10px;
    }

    .el-dialog__headerbtn {
      top: 12px;
    }
  }
}

.el-form-edu {
  ::v-deep {
    .el-form-item__label {
      width: 120px;
    }
    .el-input-edu {
      width: 300px;
    }
    .el-form-item__error {
      margin-left: 120px;
    }

    .el-radio__input.is-checked .el-radio__inner,
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      border-color: var(--color) !important;
      background-color: var(--color) !important;
    }
  }
  .el-tag-edu {
    margin-left: 120px;
  }
}
</style>
