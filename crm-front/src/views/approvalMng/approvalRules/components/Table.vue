<template>
  <el-card>
    <template #header>
      <div class="flex justify-between">
        <div>
          <el-button type="primary" icon="el-icon-plus" @click="openFileDialog"
            >添加规则</el-button
          >
        </div>
      </div>
    </template>
    <el-table border :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column
        label="序号"
        type="index"
        width="55"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="规则ID"
        prop="id"
        min-width="120"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="procName"
        label="规则名称"
        min-width="100"
        align="center"
        show-overflow-tooltip
      >
        <template #default="scope">
          <div
            class="primaryColorb pointer view-text"
            @click="showApproInfo(scope.row)"
          >
            {{ scope.row.procName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="startUsersStr"
        label="发起人范围"
        align="center"
        min-width="180"
        show-overflow-tooltip
        :formatter="formatter"
      >
        <template #default="scope">
          <el-popover
            placement="top"
            min-width="200"
            trigger="click"
            v-if="scope.row.startUsers"
          >
            <div class="flex">
              <div v-for="(item, index) in scope.row.startUsers" :key="index">
                <div class="flex justify-start marginRight10">
                  <span>{{ item }}</span>
                </div>
              </div>
            </div>
            <div class="primaryColorb pointer view-text" slot="reference">
              {{ scope.row.startUsersStr }}
            </div>
          </el-popover>
          <div v-else>
            {{ scope.row.startUsersStr }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="规则介绍"
        align="center"
        min-width="180"
        show-overflow-tooltip
        :formatter="reMarkFormatter"
      >
      </el-table-column>
      <el-table-column
        prop="location"
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
        prop="updateTime"
        label="更新时间"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="createUserName"
        label="创建人"
        align="center"
        min-width="80"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center"
        min-width="120"
        show-overflow-tooltip
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
import { editStatus } from "@/api/crm/approval";
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
      default: () => {},
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
    };
  },
  methods: {
    reMarkFormatter(row, column) {
      return row.remark || "--";
    },
    formatter(row, column) {
      let startUsers = row.startUsers;
      if (startUsers && startUsers.length > 3) {
        return (
          startUsers?.slice(0, 3).join(",") + "等" + startUsers.length + "人"
        );
      } else {
        return startUsers?.join(",");
      }
    },

    handleStatus(row) {
      editStatus({
        id: row.id,
        status: row.status == "1" ? "0" : "1",
      }).then((res) => {
        if (res && res.flag) {
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 1000,
          });
          this.$emit("queryList");
        }
      });
    },
    showApproInfo(row) {
      this.$emit("showApproInfo", row);
    },
    showApproNameList(row) {},
    checkPermission,
    searchQuery(e) {
      this.$emit("searchQuery", e);
    },

    handleUpdate(item) {
      this.$emit("handleUpdate", item);
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
