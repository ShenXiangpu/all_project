<template>
  <el-card>
    <template #header>
      <div class="flex justify-between">
        <div>
          <el-button type="primary" icon="el-icon-plus" @click="openFileDialog"
            v-permission="['message:broadcastNotification:addOne']"
            >添加广播</el-button
          >
        </div>
      </div>
    </template>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column align="center" type="selection" width="55">
      </el-table-column>

      <el-table-column
        prop="title"
        label="消息标题"
        min-width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="content"
        label="消息内容"
        min-width="200"
        align="center"
      >
      </el-table-column>

      <!-- <el-table-column  label="操作" min-width="100" align="center">
                    <template #default="scope">
                        <el-popconfirm title="确定删除吗？" @onConfirm.stop.native="handleDelete(scope.row)" onCancel="">
                            <el-button size="small" type="danger" slot="reference">
                                删除
                            </el-button>
                        </el-popconfirm>
                    </template>

                </el-table-column> -->
      <!-- <el-table-column prop="remark" label="备注" align="center" min-width="180">
        </el-table-column> -->
      <el-table-column label="消息状态" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.messageStatus == 0" type="info"
            >未开始</el-tag
          >
          <el-tag v-else-if="scope.row.messageStatus == 1" type=""
            >已开始</el-tag
          >
          <el-tag v-else-if="scope.row.messageStatus == 2" type="danger"
            >已结束</el-tag
          >
          <el-tag v-else type="danger">--</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="推送状态" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.publishStatus == 0" type="info">待发布</el-tag>
          <el-tag v-if="scope.row.publishStatus == 1" type="">已开始</el-tag>
          <el-tag v-if="scope.row.publishStatus == 2" type="danger">已撤销</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="messageTitle"
        label="起止时间"
        min-width="200"
        align="center"
      >
        <template #default="scope">
          {{
            (scope.row.startTime &&
              $moment(scope.row.startTime).format(
                "YYYY-MM-DD HH:mm:ss"
              )) ||
            ""
          }}
          -
          {{
            (scope.row.endTime &&
              $moment(scope.row.endTime).format("YYYY-MM-DD HH:mm:ss")) ||
            ""
          }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        min-width="200"
      >
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            class="editPrimary"
            v-if="scope.row.publishStatus == 0 || scope.row.publishStatus == 2"
            @click.stop="handlePush(scope.row)"
          >
            推送广播
          </el-button>
          <el-button
            size="small"
            type="primary"
            class="editPrimary"
            v-if="scope.row.publishStatus == 1"
            @click.stop="handleStop(scope.row)"
          >
            停止广播
          </el-button>
          <el-button
            size="small"
            type="primary"
            class="editPrimary marginRight10"
            :disabled="scope.row.publishStatus == 1"
            @click.stop="handleUpdate(scope.row)"
          >
            修改
          </el-button>

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
              :disabled="scope.row.publishStatus == 1"
            >
              删除
            </el-button>
          </el-popconfirm>
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
    <add-dialog ref="add-dialog" @getList="getList" />
    <push-time-dialog ref="push-time-dialog" @getList="getList" />
  </el-card>
</template>

<script>
import Pagination from "@/components/Pagination";
import AddDialog from "./AddDialog.vue";
import PushTimeDialog from "./PushTimeDialog.vue";
// import VersionDialog from "./VersionDialog";
import { deleteFanout } from "@/api/crm/newAndBroadcast";
import { mapGetters } from "vuex";
export default {
  name: "mytable",
  props: {
    type: {
      type: String,
      default: "EDA",
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
    AddDialog,
    PushTimeDialog,
  },
  computed: {
    ...mapGetters(["roleId", "roleType"]),
  },
  created() {},
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
    handleSelectionChange() {},

    searchQuery(e) {
      this.$emit("searchQuery", e);
    },
    //handleVersion
    handlePush(row) {
      //打开dialog展示版本信息
      const id = row.id;
      const version = this.$refs["push-time-dialog"];
      version.dialog.status = "create";
      version.dialog.visible = true;
      version.id = id;
    },

    handleStop(row) {
      this.$emit("handleStop", row);
    },
    handleUpdate(item) {
      const add = this.$refs["add-dialog"];
      add.dialog.visible = true;
      add.dialog.status = "update";
      let form = {
        title: item.title,
        content: item.content,
        id: item.id,
      };
      add.form = form;
    },
    //
    openFileDialog() {
      const add = this.$refs["add-dialog"];
      add.dialog.visible = true;
      add.dialog.status = "create";
      let form = {
        title: "",
        content: "",
      };
      add.form = form;
    },

    getList() {
      this.$emit("getList");
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
    //重置搜索条件
    resetQuery(formName) {
      this.listQuery.params = [];
      this.listQuery.page = 1;
      this.getList();

      this.$refs[formName].resetFields();
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
      const { id } = { ...row };
      const res = await deleteFanout({ id });
      if (res && res.flag) {
        this.$message.success("删除成功");
        this.getList();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
