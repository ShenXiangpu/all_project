<template>
  <el-dialog
    append-to-body
    :title="`${textMap[dialog.status]}`"
    :visible.sync="dialog.visible"
    class="el-dialog-edu"
    @close="handleClose"
  >
    <user-table :tableData="tableData" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit" :loading="exportLoading">
        下 载
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { exportUserExcel } from "@/api/system";
import UserTable from "./UserTable.vue";
export default {
  name: "ShowUserDialog",
  props: {
    type: {
      type: String,
      default: "IP",
    },
  },
  components: {
    UserTable,
  },
  watch: {},
  data() {
    return {
      dialog: {
        visible: false,
        status: "create",
      },
      textMap: {
        update: "修改",
        create: "导入信息异常列表",
        look: "",
      },
      loading: false,
      tableData: [],
      exportLoading: false,
    };
  },
  methods: {
    submit() {
      let tableData = this.tableData;
      this.exportLoading = true;
      exportUserExcel(tableData)
        .then((res) => {
          if (res && res.size === 0) {
            this.$message.success("当前数据为空");
            this.exportLoading = false;
            return;
          }
          const blob = new Blob([res.data], {
            type: "application/vnd.ms-excel;charset=utf-8",
          }); // 构造一个blob对象来处理数据，并设置文件类型

          let fileName = decodeURI(res.headers["content-disposition"]);

          if (fileName) {
            fileName = fileName.substring(fileName.indexOf("=") + 1);
          }
          const href = URL.createObjectURL(blob); //创建新的URL表示指定的blob对象
          const a = document.createElement("a"); //创建a标签
          a.style.display = "none";
          a.href = href; // 指定下载链接
          a.download = fileName; //指定下载文件名
          document.body.appendChild(a);
          a.click(); //触发下载
          URL.revokeObjectURL(a.href); //释放URL对象
          document.body.removeChild(a);
          this.$message.success("下载成功");
          this.exportLoading = false;
        })
        .finally((res) => {
          this.exportLoading = false;
        });
    },
    handleSelectionChange(itemList) {
      console.log("itemList111", itemList);
      this.itemList = itemList;
    },
    handleOpen() {
      this.dialog.visible = true;
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
      width: 、1000px;
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
