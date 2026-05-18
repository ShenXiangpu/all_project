<template>
  <el-card>
    <template #header>
      <div class="flex justify-between">
        <div>
          <el-button
            v-permission="['system:dept:saveDept']"
            type="primary"
            icon="el-icon-plus"
            @click="openFileDialog"
            >添加部门</el-button
          >
        </div>
      </div>
    </template>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="uid"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        prop="name"
        label="部门名称"
        align="center"
        sortable
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="postName"
        label="职位名称"
        align="center"
        sortable
        width="180"
      >
      </el-table-column>
      <el-table-column prop="userNum" label="人数" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        v-if="
          checkPermission([
            'system:post:savePost',
            'system:post:updPost',
            'system:post:delPost',
            'system:dept:delPost',
            'system:post:distributeMenu',
            'system:post:distributeDataScope',
          ])
        "
      >
        <template
          #default="scope">
          <div class="flex justify-end">
            <el-button
              v-if="scope.row.postName"
              type="primary"
              size="mini"
              @click="handleMenuPermit(scope.row)"
              v-permission="['system:post:distributeMenu']"
              >菜单权限</el-button
            >
            <el-button
              type="primary"
              class="editPrimary"
              size="mini"
              v-if="!scope.row.postName"
              v-permission="['system:post:savePost']"
              @click="handleAddPosition(scope.row)"
              >添加职位</el-button
            >
            <el-button
              type="primary"
              class="editPrimary"
              size="mini"
              v-if="scope.row.postName"
              v-permission="['system:post:distributeDataScope']"
              @click="handleAddDataPermit(scope.row)"
              >数据权限</el-button
            >
            <el-button
              type="warning"
              class="editWarning"
              size="mini"
              v-permission="
                scope.row.postName
                  ? ['system:post:updPost']
                  : ['system:dept:updDept']
              "
              @click="handleUpdate(scope.row)"
              >修改</el-button
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
                  scope.row.postName
                    ? ['system:post:delPost']
                    : ['system:dept:delDept']
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
import { mapGetters } from "vuex";
import { checkPermission } from "@/utils/validate";
export default {
  name: "mytable",
  props: {
    total: {
      type: Number,
      default: 0,
    },

    loading: {
      type: Boolean,
      default: false,
    },
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Pagination,
  },
  created() {},
  computed: {
    ...mapGetters(["roleId", "roleType", "userId"]),
  },
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
    };
  },
  methods: {
    checkPermission,
    handleAddDataPermit(row) {
      this.$emit("handleAddDataPermit", row);
    },
    handleMenuPermit(row) {
      this.$emit("handleMenuPermit", row);
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
    },

    handleRowClick(e) {},
    handleSelectionChange() {},
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
    handleAddPosition(row) {
      this.$emit("handleAddPosition", row);
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
