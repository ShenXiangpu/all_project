<template>
  <el-card>
    <template #header>
      <div class="flex justify-between">
        <div>
          <el-button type="primary" icon="el-icon-plus" @click="openFileDialog"
            >创建规则</el-button
          >
        </div>
      </div>
    </template>
    <el-table border :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column
        type="index"
        label="序号"
        width="55"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="id"
        label="规则ID"
        min-width="80"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="ruleName"
        label="规则名称"
        min-width="100"
        align="center"
        show-overflow-tooltip
      >
        <template #default="scope">
          <div
            class="primaryColorb pointer view-text"
            @click="handleLook(scope.row)"
          >
            {{ scope.row.ruleName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="linkPhone"
        label="规则内容"
        align="center"
        min-width="150"
        show-overflow-tooltip
      >
        <template #default="scope">
          <div v-if="scope.row.unFollowDay || scope.row.unConversionDay">
            <div v-if="scope.row.unFollowDay">
              {{ scope.row.unFollowDay }}天内无跟进进行回收
            </div>
            <div v-if="scope.row.unConversionDay">
              {{ scope.row.unConversionDay }}天内无转化进行回收
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="companyTypeName"
        label="生效状态"
        align="center"
        min-width="80"
        show-overflow-tooltip
      >
        <template #default="scope">
          <el-switch
            class="switchStyle"
            @change="handleStatus(scope.row)"
            v-model="scope.row.status == 1"
            active-text="启用"
            inactive-text="禁用"
            active-color="#02C733"
            inactive-color="#A6A6A6"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="updateAt"
        label="更新时间"
        align="center"
        min-width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="createByName"
        label="创建人"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="createAt"
        label="创建时间"
        align="center"
        min-width="120"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        min-width="130"
      >
        <template #default="scope">
          <div>
            <el-button
              type="danger"
              class="editDanger"
              size="mini"
              @click="handleUpdate(scope.row)"
              >编辑</el-button
            >

            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="handleDelete(scope.row)"
              onCancel=""
            >
              <el-button
                size="mini"
                type="warning"
                class="editWarning marginLeft10"
                slot="reference"
              >
                删除
              </el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-if="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="searchQuery"
    />
  </el-card>
</template>
<script>
import Pagination from "@/components/Pagination";
import { downTemplate, insertBatch } from "@/api/crm/downAndInport";
import { checkPermission } from "@/utils/validate";
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
    listQuery: {
      type: Object,
      default: () => {
        return { page: 1, limit: 10 };
      },
    },
    isDetail: {
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
      rowList: [],
      ids: [],
    };
  },
  methods: {
    handleStatus(row) {
      row.status = row.status == 1 ? 2 : 1;
      this.$emit("handleStatus", row);
    },
    handleLook(row) {
      this.$emit("handleLook", row);
    },
    handleFollow(item) {
      this.$emit("handleFollow", item);
    },
    handleCustomerInfo(row) {
      this.$emit("handleCustomerInfo", row);
    },
    checkPermission,
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
      this.$emit("delete", { ids: [row.id] });
    },
  },
};
</script>

<style lang="scss" scoped></style>
