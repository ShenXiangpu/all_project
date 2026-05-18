<template>
  <el-dialog
    append-to-body
    :title="textMap[dialog.status]"
    :visible.sync="dialog.visible"
    class="el-dialog-edu"
    @close="handleClose"
  >
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="90" align="center">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="学生姓名"
        min-width="80"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="className"
        label="班级"
        min-width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="studentNum"
        label="学号"
        min-width="100"
        align="center"
      >
      </el-table-column>
    </el-table>
    <div class="marginBottom20"></div>
  </el-dialog>
</template>

<script>
import { mergeChunkFile } from "@/api/edu/file";

export default {
  name: "StudentListDialog",
  props: {
    tableData: {
      default: () => {
        return [];
      },
      type: Array,
    },
  },
  components: {},
  watch: {},
  data() {
    return {
      dialog: {
        visible: false,
        status: "create",
      },
      textMap: {
        update: "学生列表",
        create: "学生列表",
        look: "学生列表",
      },
    };
  },
  methods: {
    handleClose() {
      this.dialog.visible = false;
    },

    handleOpen() {
      this.dialog.visible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dialog-edu {
  ::v-deep {
    .el-dialog {
      width: 800px;
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
      width: 500px;
    }
    .el-form-item__error {
      margin-left: 120px;
    }
  }
  .el-tag-edu {
    margin-left: 120px;
  }
}
</style>
