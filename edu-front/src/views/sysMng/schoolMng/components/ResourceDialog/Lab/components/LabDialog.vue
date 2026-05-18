<template>
  <el-dialog append-to-body title="选择Lab" :visible.sync="dialog.visible" class="el-dialog-edu" @close="handleClose">
    <el-table max-height="600" v-loading="loading" :data="orderList" :row-key="getRowKey"
      @selection-change="handleSelectionChange" ref="multipleTable">
      <el-table-column type="selection" width="55" align="center" :selectable="selectable" />
      <el-table-column label="文件名称" align="center" prop="displayName" min-width="180px" show-overflow-tooltip />
      <el-table-column label="所属高校" align="center" prop="universityName" min-width="180">
      </el-table-column>
      <el-table-column label="文件大小" align="center" min-width="120" prop="fileSize" show-overflow-tooltip />
      <el-table-column label="文件描述" align="center" min-width="80" prop="remark">
      </el-table-column>
      <el-table-column label="创建时间" align="center" min-width="120" prop="createAt" show-overflow-tooltip />
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit" :loading="loading">
        确 定
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { labListOfDistributionBySu } from "@/api/edu/school";
export default {
  name: "Dialog",
  props: {

  },
  components: {
  },
  watch: {

  },
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
      orderList: [],
      selectedIds: [],
    };
  },
  methods: {
    getList() {
      this.loading = true;
      labListOfDistributionBySu().then((response) => {
        let orderList = response.resData;
        this.orderList = this.handleIdsList(orderList); //
        this.setDefaultSelection(orderList);
        this.loading = false;
      });
    },

    handleIdsList(list) {
      //传入
      let selectedIds = this.selectedIds || [];
      if (selectedIds && selectedIds.length > 0) {
        list.forEach(item => {
          selectedIds.forEach(id => {
            if (item.id === id) {
              item.isSelected = true;
            }
          });
        });
      }
      console.log("list", list);

      return list;
    },
    getRowKey(row) {
      return row.id; // 假设数据项中有唯一标识字段 'id'
    },
    selectable(row, index) {
      // 禁止取消选择
      return !row.isSelected;
    },
    // 假设这是在获取数据后执行的方法
    setDefaultSelection(tableData) {
      // 确保在 DOM 更新后执行
      this.$nextTick(() => {
        // 遍历表格数据
        tableData && tableData.length > 0 && tableData.forEach(row => {
          console.log(row.isSelected);

          if (row.isSelected) { // 根据某个条件判断是否选中
            this.$refs['multipleTable'].toggleRowSelection(row, true); // 选中该行
          }
        });
      });
    },
    submit() {
      this.dialog.visible = false;
      this.$emit("handleSelectionChange", this.itemList);
    },
    handleSelectionChange(itemList) {
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
