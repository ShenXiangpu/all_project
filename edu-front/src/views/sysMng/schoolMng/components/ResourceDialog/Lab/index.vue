<template>
  <div>
    <el-form-item label="Lab选择" prop="labIds">
      <el-button type="primary" icon="el-icon-plus" class="marginBottom20 marginRight20"
        @click="openDialog">添加Lab</el-button><span class="">已添加</span><span class="primaryColor"> {{ itemList &&
          itemList.length || 0 }}个</span>
      <el-table :data="itemList" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all
        max-height="500px">
        <el-table-column type="index" label="序号" min-width="80" align="center">
        </el-table-column>
        <el-table-column label="文件名称" align="center" prop="displayName" min-width="180px" show-overflow-tooltip />
        <el-table-column label="所属高校" align="center" prop="universityName" min-width="180">
        </el-table-column>
        <el-table-column label="文件大小" align="center" min-width="120" prop="fileSize" show-overflow-tooltip />
        <el-table-column label="文件描述" align="center" min-width="80" prop="remark">
        </el-table-column>
        <el-table-column label="创建时间" align="center" min-width="120" prop="createAt" show-overflow-tooltip />
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
import LabDialog from "./components/LabDialog.vue";
export default {
  name: "ExpCase",
  props: {


  },
  components: {
    LabDialog,
  },
  computed: {
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
      let itemList = this.itemList || [];
      let idList = itemList && itemList.length > 0 && itemList.map(i => {
        return i.id
      });
      const dia = this.$refs["lab-dialog"];
      dia.dialog.visible = true;
      dia.dialog.status = "create";
      dia.selectedIds = idList || [];
      dia.getList();
    },
  },
};
</script>

<style lang="scss" scoped></style>
