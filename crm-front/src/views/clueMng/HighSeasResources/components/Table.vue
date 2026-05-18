<template>
  <el-card>
    <template #header v-if="!isDetail">
      <div class="flex justify-between">
        <div>
          <el-button
            v-permission="['clue:disclosureClue:addOneClue']"
            type="primary"
            icon="el-icon-plus"
            @click="openFileDialog"
            >创建线索</el-button
          >
        </div>
        <div>
          <el-dropdown
            v-permission="[
              'clue:disclosureClueUserRel:addMoreRel',
              'clue:disclosureClueUserRel:distribute',
              'clue:disclosureClue:clueList',
            ]"
            split-button
            type="primary"
            @command="handleClick"
          >
            批量操作
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                command="receive"
                v-permission="['clue:disclosureClueUserRel:addMoreRel']"
                >批量领取
              </el-dropdown-item>
              <el-dropdown-item
                command="allocation"
                v-permission="['clue:disclosureClueUserRel:distribute']"
                >批量分配</el-dropdown-item
              >
              <el-dropdown-item
                command="delete"
                v-permission="['clue:disclosureClue:clueList']"
                >批量删除</el-dropdown-item
              >
              <!-- <el-dropdown-item command="import">批量导入 </el-dropdown-item>
              <el-dropdown-item command="export">批量导出</el-dropdown-item> -->
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
      <el-table-column type="selection" width="55" align="center" v-if="!isDetail" />
      <el-table-column
        prop="id"
        label="线索ID"
        min-width="120"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="clueName"
        label="线索名称"
        min-width="100"
        align="center"
      >
        <template #default="scope">
          <div @click="look(scope.row)" class="primaryColorb pointer view-text">
            {{ scope.row.clueName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="联系人"
        align="center"
        min-width="120"
        prop="linkName"
        show-overflow-tooltip
      ></el-table-column>
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
      >
      </el-table-column>
      <el-table-column
        prop="location"
        label="所属地区"
        align="center"
        min-width="100"
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
        min-width="100"
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
        prop="recentFollowUpTime"
        label="最近跟进时间"
        align="center"
        min-width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="createByName"
        label="创建人"
        align="center"
        min-width="80"
      >
      </el-table-column>
      <el-table-column
        prop="createAt"
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
        min-width="300"
        v-if="
          (!isDetail) && checkPermission([
            'clue:disclosureClueUserRel:addMoreRel',
            'clue:disclosureClue:editOneClue',
            'clue:disclosureClue:clueList',
            'clue:disclosureClueUserRel:distribute',
          ])
        "
      >
        <template #default="scope">
          <div>
            <el-popconfirm
              title="确定领取吗？"
              @onConfirm="receive(scope.row)"
              onCancel=""
            >
              <el-button
                slot="reference"
                type="primary"
                class="editPrimary marginRight10"
                size="mini"
                v-permission="['clue:disclosureClueUserRel:addMoreRel']"
                >领取</el-button
              >
            </el-popconfirm>
            <el-button
              type="info"
              class="editInfo"
              size="mini"
              @click="handleAssign(scope.row)"
              v-permission="['clue:disclosureClueUserRel:distribute']"
              >分配</el-button
            >
            <el-button
              type="danger"
              class="editDanger marginRight10"
              size="mini"
              @click="handleUpdate(scope.row)"
              v-permission="['clue:disclosureClue:editOneClue']"
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
                class="editWarning"
                slot="reference"
                v-permission="['clue:disclosureClue:clueList']"
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
import { mapGetters, mapState } from "vuex";
import { addMoreRel } from "@/api/crm/highSeasResources";
import { checkPermission } from "@/utils/validate";
export default {
  name: "mytable",
  props: {
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
  computed: {
    ...mapGetters(["userId"]),
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
      dialogStatus: "create",
      ids: [],
      rowList: [],
    };
  },
  methods: {
    checkPermission,
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
      } else if (e == "receive") {
        if (!(this.ids && this.ids.length > 0)) {
          return this.$message.warning("请选择要领取的线索");
        }
        //批量领取
        this.$confirm("确定批量领取吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            const userId = this.$store.state.user.userId;
            addMoreRel({ userId: [userId], clueId: this.ids }).then((res) => {
              if (res && res.flag) {
                this.$message({
                  message: "批量领取成功",
                  type: "success",
                });
                this.$emit("queryList");
              }
            });
          })
          .catch(() => {
            console.log("取消删除");
          });
      } else if (e == "allocation") {
        //批量分配
        if (!(this.ids && this.ids.length > 0)) {
          return this.$message.warning("请选择要分配的线索");
        }
        this.$emit("allocation", this.ids);
      }
    },
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
      this.rowList = rowList;
    },

    handleRowClick(e) {},
    handleCommand(row) {
      Object.keys(row).forEach((key) => {
        if (key == "edit") {
          this.$emit("handleUpdate", row[key]);
        }
        if (key == "delete") {
          if (!(this.ids && this.ids.length > 0)) {
            return this.$message.warning("请选择要删除的数据");
          }
          this.$emit("delete", this.ids, this.rowList);
        }
        //驳回
        if (key == "reject") {
          this.$emit(`${key}`, row[key].id);
        }
      });
    },
    searchQuery(e) {
      this.$emit("searchQuery", e);
    },
    //handleVersion
    handleVersion(row) {
      //打开dialog展示版本信息
      this.$emit("handleVersion", row.id);
    },
    handleUpdate(item) {
      this.$emit("handleUpdate", item);
    },
    look(item) {
      this.$emit("handlelook", item);
    },
    //
    openFileDialog() {
      this.$emit("openFileDialog");
    },
    handleAssign(row) {
      this.$emit("handleAssign", row);
    },
    receive(row) {
      const userId = this.$store.state.user.userId;
      let obj = {
        clueId: [row.id],
        userId: [userId],
      };
      this.$emit("receive", obj);
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
      this.$emit("delete", [row.id], [row]);
    },
  },
};
</script>

<style lang="scss" scoped></style>
