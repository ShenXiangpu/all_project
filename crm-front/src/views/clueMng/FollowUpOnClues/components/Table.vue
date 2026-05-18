<template>
  <el-card>
    <template #header>
      <div class="flex justify-between" v-if="!isDetail">
        <div>
          <el-button
            v-if="type == 'my'"
            type="primary"
            icon="el-icon-plus"
            @click="openFileDialog"
            v-permission="[`clue:disclosureClueUserRel:addOneClue`]"
            >创建线索</el-button
          >
        </div>
        <div class="">
          <el-dropdown
            v-permission="[`clue:disclosureClueUserRel:addOneClue`]"
            split-button
            type="primary"
            @command="handleClick"
          >
            批量操作
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-permission="
                  type == 'my'
                    ? [`clue:disclosureClueUserRel:releaseMoreClue`]
                    : ['subordinate:releaseMoreClue']
                "
                command="release"
                >批量释放</el-dropdown-item
              >
              <el-dropdown-item
                v-permission="
                  type == 'my'
                    ? [`clue:disclosureClueUserRel:deleteMoreClue`]
                    : ['subordinate:deleteMoreClue']
                "
                command="delete"
                >批量删除</el-dropdown-item
              >
              <!-- <el-dropdown-item command="import" v-if="type == 'my'"
                >批量导入
              </el-dropdown-item>
              <el-dropdown-item command="export" v-if="type == 'my'"
                >批量导出</el-dropdown-item
              > -->
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
      <el-table-column
        v-if="!isDetail"
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        :prop="isDetail ? `id` : `clueId`"
        label="线索ID"
        min-width="85"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="clueName"
        label="线索名称"
        min-width="100"
        align="center"
        show-overflow-tooltip
      >
        <template #default="scope">
          <div @click="look(scope.row)" class="primaryColorb pointer view-text">
            {{ scope.row.clueName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="联系人"
        prop="linkName"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <!-- <el-table-column
        prop="linkPhone"
        label="联系电话"
        align="center"
        min-width="120"
        show-overflow-tooltip
      >
      </el-table-column> -->
      <el-table-column
        prop="companyTypeName"
        label="单位类型"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="location"
        label="所属地区"
        align="center"
        min-width="120"
        show-overflow-tooltip
      >
        <template #default="scope">
          {{ (scope.row.location && scope.row.location.split(",")[0]) || ""
          }}{{ (scope.row.location && scope.row.location.split(",")[1]) || "" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="consumerLevelName"
        label="客户级别"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="consumerIntentionName"
        label="客户意向"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="consumerSourceName"
        label="客户来源"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="cooperationAreaName"
        label="合作方向"
        align="center"
        min-width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="followUpStatusName"
        label="跟进状态"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="nextFollowUpDate"
        label="下次跟进时间"
        align="center"
        min-width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="recentFollowUpTime"
        label="最近跟进时间"
        align="center"
        min-width="160"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="跟进人"
        align="center"
        min-width="160"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        prop="createAt"
        label="创建时间"
        align="center"
        min-width="160"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        :min-width="type == 'my' ? 380 : 240"
        v-if="
          !isDetail &&
          checkPermission(
            type == 'my'
              ? [
                  `clue:disclosureClueUserRel:followUpOneClue`,
                  'customer:customerInfo:addOneFromClue',
                  'clue:disclosureClueUserRel:releaseMoreClue',
                  `clue:disclosureClueUserRel:editOneClue`,
                  `clue:disclosureClueUserRel:deleteOneClue`,
                ]
              : [
                  'subordinate:releaseMoreClue',
                  'subordinate:editOneClue',
                  'subordinate:deleteMoreClue',
                ]
          )
        "
      >
        <template #default="scope">
          <div>
            <el-button
              v-if="type == 'my'"
              v-permission="[`clue:disclosureClueUserRel:followUpOneClue`]"
              type="info"
              class="editInfo"
              size="mini"
              @click="handleFollow(scope.row)"
              >跟进</el-button
            >
            <el-button
              v-if="type == 'my'"
              type="primary"
              class="editPrimary"
              size="mini"
              v-permission="[`customer:customerInfo:addOneFromClue`]"
              @click="handleCustom(scope.row)"
              >客户</el-button
            >
            <el-tooltip content="放入公海" placement="top">
              <el-button
                type="warning"
                class="editWarning"
                size="mini"
                @click="handleClue(scope.row)"
                v-permission="
                  type == 'my'
                    ? [`clue:disclosureClueUserRel:releaseMoreClue`]
                    : ['subordinate:releaseMoreClue']
                "
                >公海</el-button
              >
            </el-tooltip>
            <el-button
              type="danger"
              class="editDanger"
              size="mini"
              v-permission="
                type == 'my'
                  ? [`clue:disclosureClueUserRel:editOneClue`]
                  : ['subordinate:editOneClue']
              "
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
                v-permission="
                  type == 'my'
                    ? [`clue:disclosureClueUserRel:deleteMoreClue`]
                    : ['subordinate:deleteMoreClue']
                "
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
      ids: [],
      rowList: [],
    };
  },
  methods: {
    checkPermission,
    //
    handleClick(e) {
      if (e == "delete") {
        if (!(this.ids && this.ids.length > 0)) {
          return this.$message.warning("请选择要删除的数据");
        }
        this.$emit("delete", this.ids, this.rowList);
        // this.$confirm("确定删除吗?", "提示", {
        //   confirmButtonText: "确定",
        //   cancelButtonText: "取消",
        //   type: "warning",
        // })
        //   .then(() => {
        //     this.$emit(`handleChooseDelete`, this.ids);
        //   })
        //   .catch(() => {
        //     console.log("取消删除");
        //   });
      } else if (e == "release") {
        //批量分配
        if (!(this.ids && this.ids.length > 0)) {
          return this.$message.warning("请选择要释放的线索");
        }
        let clue = "";
        if (this.type == "my") {
          clue = { clueId: this.ids };
        } else {
          clue = { clueUserRoleId: this.ids };
        }
        this.$emit("handleClue", clue);
      }
    },
    // 获取多删除ids
    handleSelectionChange(e) {
      let rowList = e;
      if (rowList && rowList.length > 0) {
        let ids = [];
        if (this.type == "my") {
          rowList.map((i) => {
            ids.push(i.clueId);
          });
        } else {
          rowList.map((i) => {
            ids.push(i.id);
          });
        }
        this.ids = ids;
      } else {
        this.ids = [];
      }
      this.rowList = rowList;
    },

    handleRowClick(e) {},

    searchQuery(e) {
      this.$emit("searchQuery", e);
    },
    handleUpdate(item) {
      this.$emit("handleUpdate", item);
    },
    look(item) {
      this.$emit("handleLook", item);
    },
    handleClue(item) {
      if (this.type == "my") {
        let clue = { clueId: [item.clueId] };
        this.$emit("handleClue", clue);
      } else {
        let clue = { clueUserRoleId: [item.id] };
        this.$emit("handleClue", clue);
      }
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
      this.$emit("delete", [row.clueId], [row]);
    },
  },
};
</script>

<style lang="scss" scoped></style>
