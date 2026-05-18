<template>
  <el-card>
    <template #header v-if="type == 'my'">
      <div class="flex justify-end">
        <!-- <div>
          <el-button type="primary" icon="el-icon-plus" @click="openFileDialog"
            >创建线索</el-button
          >
        </div> -->
        <div>
          <el-dropdown split-button type="primary" @command="handleClick">
            批量操作
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="edit">批量领取 </el-dropdown-item>
              <el-dropdown-item command="edit">批量分配</el-dropdown-item>
              <el-dropdown-item command="edit">批量删除</el-dropdown-item>
              <el-dropdown-item command="edit">批量导入 </el-dropdown-item>
              <el-dropdown-item command="edit">批量导出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </template>
    <el-table
      border
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        prop="contract.contractNo"
        label="合同编号"
        min-width="120"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="contract.contractName"
        label="合同名称"
        min-width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="customerName" label="客户名称" align="center" min-width="100">
      </el-table-column>
      <el-table-column
        prop="consumerTypeName"
        label="客户类型"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="cooperationAreaName"
        label="合作方向"
        align="center"
        min-width="100"
      >
      </el-table-column>
      <el-table-column
        prop="contractStatus"
        label="合同状态"
        align="center"
        min-width="80"
      >
      </el-table-column>
      <el-table-column
        prop="paymentStatusName"
        label="付款状态"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="contract.contractAmount"
        label="成交金额"
        align="center"
        min-width="80"
      >
      </el-table-column>
      <el-table-column
        prop="contract.startTime"
        label="服务生效时间"
        align="center"
        min-width="160"
      >
      </el-table-column>
      <el-table-column
        prop="contract.endTime"
        label="服务结束时间"
        align="center"
        min-width="80"
      >
      </el-table-column>
      <el-table-column
        prop="paymentTime"
        label="付款时间"
        align="center"
        min-width="80"
      >
      </el-table-column>
      <el-table-column
        prop="createAt"
        label="创建时间"
        align="center"
        min-width="80"
      >
      </el-table-column>
      <el-table-column
        prop="createByName"
        label="跟进人"
        align="center"
        min-width="80"
      >
      </el-table-column>
      <el-table-column
        prop="contactDepName"
        label="所属部门"
        align="center"
        min-width="80"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        min-width="320"
      >
        <template #default="scope">
          <div>
            <el-button type="info" class="editInfo" size="mini">合同</el-button>
            <el-button type="primary" class="editPrimary" size="mini"
              >其他文件</el-button
            >
            <el-button
              type="danger"
              class="editDanger"
              size="mini"
              @click="handleUpdate(scope.row)"
              >编辑</el-button
            >

            <el-button size="mini" type="warning" class="editWarning">
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="searchQuery"
    />
  </el-card>
</template>
<script>
import Pagination from "@/components/Pagination";
export default {
  name: "mytable",
  props: {
    type: {
      type: String,
      default: "my",
    },
    total: {
      type: Number,
      default: 0,
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Pagination,
  },
  created() {},
  computed: {},
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        params: "",
      },

      dialog: {
        visible: false,
        status: "",
      },
      textValue: "license",

      fileDialogVisible: false,
      fileUpLoading: false,
      dialogStatus: "create",
      updateFileInfo: {},
      ipSupplierList: [],
    };
  },
  methods: {
    // 获取多删除ids
    handleSelectionChange(e) {
      let rowList = e;
      if (rowList && rowList.length > 0) {
        let ids = [];
        rowList.map((i) => {
          ids.push(i.id);
        });
        this.ids = ids;
      } else {
        this.ids = [];
      }
    },

    handleRowClick(e) {},
    handleCommand(row) {
      Object.keys(row).forEach((key) => {
        if (key == "edit") {
          this.$emit("handleUpdate", row[key]);
        }
        if (key == "delete") {
          this.$confirm("确定删除吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$emit(`${key}`, row[key]);
            })
            .catch(() => {
              console.log("取消删除");
            });
        }
        //驳回
        if (key == "reject") {
          this.$emit(`${key}`, row[key].id);
        }
      });
    },
    handleSelectionChange() {},
    // 申请发布
    applyRelease(id) {
      this.$emit("applyRelease", id);
    },
    release(id) {
      this.$emit("release", id);
    },
    revoke(id) {
      this.$emit("revoke", id);
    },
    searchQuery(e) {
      this.$emit("searchQuery", e);
    },

    //querysearchKey
    querySearchKey() {
      searchKey().then((res) => {
        if (res && res.flag) {
          let resData = res.resData;
          this.ipSupplierList = resData.ipSupplier;
        }
      });
    },
    //handleVersion
    handleVersion(row) {
      //打开dialog展示版本信息
      this.$emit("handleVersion", row.id);
    },
    handleUpdate(item) {
      this.$emit("handleUpdate", item);
    },
    handleFollow(item) {
      this.$emit("handleFollow", item);
    },
    handleCustom(item) {
      this.$emit("handleCustom", item);
    },
    //
    openFileDialog() {
      this.$emit("openFileDialog");
    },
    handleAssign(row) {
      this.$emit("handleAssign", row);
    },

    initParams() {
      let listQuery = {
        page: 1,
        limit: 10,
        params: "",
      };
      this.listQuery = listQuery;
    },

    cancel() {
      let _this = this;
      _this.dialog.visible = false;
      // _this.dialog = dialog;
      _this.$refs.alarmRuleForm.resetFields();
    },
    handleQuery() {
      this.listQuery.params = this.queryParams;
      this.getList();
    },

    handleAdd(value) {
      let _this = this;
      this.textValue = value;
      let dialog = {
        status: "create",
        visible: true,
      };
      _this.dialog = dialog;
    },

    async handleDelete(row) {
      this.$emit("delete", row);
    },
  },
};
</script>

<style lang="scss" scoped></style>
