<template>
  <div>
    <el-form-item :label="`${type}选择`" :prop="types">
      <el-button
        type="primary"
        icon="el-icon-plus"
        class="marginBottom20"
        @click="openDialog"
        >添加{{ type }}</el-button
      ><span class="primaryColoro" v-if="isShowText"> (文件在/home目录下)</span>
      <el-table
        :data="itemList"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        max-height="500px"
      >
        <el-table-column
          type="index"
          label="序号"
          min-width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          :label="`${type}名称`"
          min-width="180"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="version"
          label="版本名称"
          min-width="180"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="supplier"
          label="供应商"
          min-width="180"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="process"
          label="工艺制程"
          min-width="80"
          align="center"
        >
          <template slot-scope="scope"> {{ scope.row.process }}nm </template>
        </el-table-column>
        <el-table-column :label="`${type}大小`" align="center" width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.fileSize">
              {{ (Number(scope.row.fileSize) / 1024 / 1024).toFixed(2) + "MB" }}
            </div>
            <div v-else>{{ "-----------" }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          min-width="120"
          align="center"
        >
          <template slot-scope="scope">
            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="handleDelete(scope.row)"
              onCancel=""
            >
              <el-button
                size="small"
                type="danger"
                class="editDanger"
                slot="reference"
              >
                删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <iP-and-pDK-dialog
      ref="iP-and-pDK-dialog"
      :type="type"
      @handleSelectionChange="handleSelectionChange"
    />
  </div>
</template>

<script>
import IPAndPDKDialog from "./components/IPAndPDKDialog.vue";
export default {
  name: "",
  props: {
    type: {
      type: String,
      default: "IP",
    },
    isShowText: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    IPAndPDKDialog,
  },
  computed: {
    types: {
      get() {
        let type = this.type;
        type = type.toLowerCase() + "s";
        return type;
      },
      set(val) {},
    },
  },
  created() {},
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
      const dia = this.$refs["iP-and-pDK-dialog"];
      dia.dialog.visible = true;
      dia.dialog.status = "create";
      dia.queryTableList();
    },
  },
};
</script>

<style lang="scss" scoped></style>
