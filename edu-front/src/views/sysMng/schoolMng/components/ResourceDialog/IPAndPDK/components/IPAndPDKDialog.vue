<template>
  <el-dialog append-to-body :title="`${textMap[dialog.status]}${type}`" :visible.sync="dialog.visible"
    class="el-dialog-edu" @close="handleClose">
    <dialog-table ref="dialogTable" :type="type" :selectedIds="selectedIds" @handleSelectionChange="handleSelectionChange" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit" :loading="loading">
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import DialogTable from "./DialogTable";
import { addIP, modifyIp } from "@/api/edu/ip";
import { pdkList, iPList } from "@/api/edu/ipAndPdk";
export default {
  name: "Dialog",
  props: {
    type: {
      type: String,
      default: "IP",
    },
  },
  components: {
    DialogTable,
  },
  watch: {},
  data() {
    return {
      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "修改",
        create: "添加",
        look: "",
      },
      loading: false,
      itemList: [],
      selectedIds: []
    };
  },
  methods: {
    submit() {
      this.dialog.visible = false;
      console.log('itemListSubmit', this.itemList);
      this.$emit("handleSelectionChange", this.itemList);
    },
    handleSelectionChange(itemList) {
      console.log('itemList111', itemList);
      this.itemList = itemList;
    },
    handleOpen() {
      this.dialog.visible = true;
    },
    handleClose() {
      this.dialog.visible = false;
    },
    queryTableList() {
      let dialogTable = this.$refs["dialogTable"];
      let setInter = null;
      if (!dialogTable) {
        setInter = setInterval(() => {
          dialogTable = this.$refs["dialogTable"];
          dialogTable && dialogTable.getList();
          if (dialogTable) {
            clearInterval(setInter);
          }
        }, 100);
      } else {
        dialogTable && dialogTable.getList();
      }
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
