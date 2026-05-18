<template>
  <div>
    <el-form-item label="题库资源" prop="questionBankIds">
      <el-button type="primary" icon="el-icon-plus" class="marginBottom20 marginRight20"
        @click="openDialog">添加题库</el-button><span class="">已添加</span><span class="primaryColor"> {{ itemList &&
          itemList.length || 0 }}个</span>
      <el-table :data="itemList" style="width: 100%; margin-bottom: 20px" border default-expand-all max-height="500px">
        <el-table-column type="index" label="序号" min-width="80" align="center">
        </el-table-column>
        <el-table-column prop="name" label="题库名称" min-width="90" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="directionName" label="方向" min-width="90" align="center">
        </el-table-column>
        <el-table-column prop="universityName" label="所属高校" align="center" min-width="70">
        </el-table-column>
        <el-table-column prop="num" label="题目数量(个)" align="center" min-width="90">
        </el-table-column>

        <el-table-column prop="createName" label="创建人" align="center" min-width="90">
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="address" label="操作" min-width="120" align="center">
          <template #default="scope">
            <el-popconfirm title="确定删除吗？" @onConfirm="handleDelete(scope.row)" onCancel="">
              <el-button size="small" type="danger" class="editDanger" slot="reference">
                删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <lab-dialog ref="lab-dialog" @handleSelectionChange="handleSelectionChange" />
  </div>
</template>

<script>
import LabDialog from "./components/QuesDialog.vue";
export default {
  name: "ExpCase",
  props: {
    ruleForm: {
      type: Object,
      default: () => ({}),
    },

  },
  components: {
    LabDialog,
  },
  computed: {
  },
  watch: {
    'ruleForm.quBanks': {
      handler(newVal) {
        if (newVal && newVal.length > 0) {
          this.itemList = this.ruleForm.quBanks;
          this.$emit("getIPAndPDK", this.itemList);
        } else {
          this.itemList = [];
        }
      },
      immediate: true,
      deep: true,
    },
  },
  created() { },
  data() {
    return {
      tableData: [],
      itemList: [],
    };
  },
  methods: {
    handleDelete(row) {
      let itemList = this.itemList;
      itemList = itemList.filter((i) => {
        return row.id !== i.id;
      });
      this.itemList = itemList;
      this.$emit("getIPAndPDK", itemList);
    },
    handleSelectionChange(itemList) {
      this.itemList = itemList;
      this.$emit("getIPAndPDK", itemList);
    },
    openDialog() {
      const dia = this.$refs["lab-dialog"];
      dia.dialog.visible = true;
      dia.dialog.status = "create";

      let itemList = this.itemList || [];
      let idList = itemList && itemList.length > 0 && itemList.map(i => {
        return i.id
      });
      dia.selectedIds = idList || [];
      dia.getList();
    },
  },
};
</script>

<style lang="scss" scoped></style>
