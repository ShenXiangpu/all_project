<template>
  <el-card>
    <template #header>
      <div class="flex justify-between">
        <div>
          共计 <span class="primaryColor">{{ tableData && tableData.length || 0 }}</span> 条数据
        </div>
      </div>
    </template>
    <el-table border :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
      <el-table-column label="基本信息" align="center">
        <el-table-column prop="universityName" label="高校名称" min-width="90" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="primaryColorb pointer" @click="handleDetail(scope.row)">{{ scope.row.universityName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="高校类型" min-width="90" align="center">
        </el-table-column>
        <el-table-column label="人数" prop="userNum" align="center" min-width="70">

        </el-table-column>
        <el-table-column prop="courseNum" label="课程数据" align="center" min-width="90">
        </el-table-column>
        <el-table-column prop="vmNum" label="虚拟机数量" align="center" min-width="90">
        </el-table-column>
      </el-table-column>
      <el-table-column label="平台登录次数/人数" align="center">
        <el-table-column label="累计登录" align="center" min-width="0">
          <template slot-scope="scope">
            <div class="">{{ scope.row.loginTimes || 0 }}次 / {{
              scope.row.userLoginCount || 0 }}人</div>
          </template>
        </el-table-column>
        <el-table-column label="近一个月登录" align="center" min-width="90">
          <template slot-scope="scope">
            <div class="">{{ scope.row.monthlyLoginTimes || 0 }}次 / {{
              scope.row.monthlyUserLoginCount || 0 }}人</div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="createAt" label="实操云登录次数/人数" align="center">
        <el-table-column prop="process" label="累计登录" align="center" min-width="90">
          <template slot-scope="scope">
            <div class="">{{ scope.row.vmLoginTimes || 0 }}次 / {{
              scope.row.vmUserLoginCount || 0 }}人</div>
          </template>
        </el-table-column>
        <el-table-column prop="process" label="近一个月登录" align="center" min-width="90">
          <template slot-scope="scope">
            <div class="">{{ scope.row.vmMonthlyLoginTimes || 0 }}次 / {{
              scope.row.vmMonthlyUserLoginCount || 0 }}人</div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="资源消耗" align="center">
        <el-table-column prop="cpu" label="CPU使用率" align="center" min-width="80">
        </el-table-column>
        <el-table-column prop="disk" label="存储使用率" align="center" min-width="80">
        </el-table-column>
        <el-table-column prop="memory" label="内存使用率" align="center" min-width="80">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="lastLoginTime" label="上次登陆时间" align="center" min-width="80">
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" min-width="80">
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" min-width="100">
        <template #default="scope">
          <el-button size="small" type="primary" class="editPrimary marginRight10"
            @click.stop="handleOpen(scope.row)">
            操作日志
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
      @pagination="searchQuery" />

      <log-dialog ref="logDialog" />
  </el-card>
</template>

<script>
import Pagination from "@/components/Pagination";
import { mapGetters } from "vuex";
import LogDialog from "./Log/LogDialog.vue";
export default {
  name: "mytable",
  props: {
    total: {
      type: Number,
      default: 0,
    },
    tableData: {
      type: Array,
      default: () => [{
        name: "xxx",
      }],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Pagination,
    LogDialog
  },
  computed: {
  },
  created() { },
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

      labsList: [],
      fileDialogVisible: false,
      fileUpLoading: false,
      dialogStatus: "create",
      updateFileInfo: {},
      ipSupplierList: [],
    };
  },
  methods: {
    handleDetail(row) {
      let rowStr = JSON.stringify(row);
      let encodeRow = encodeURIComponent(rowStr);
      this.$emit('handleDetail', encodeRow);
    },

    handleOpen(row) {
      let log = this.$refs['logDialog'];
      log.dialog.visible = true;
      log.dialog.status = 'update';
      log.queryUserOperateType();
      log.listQuery.universityName = row.universityName;
      log.handleQuery();
    },

    handleSelectionChange() { },
    // 申请发布
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
    //
    openFileDialog() {
      this.$emit("openFileDialog");
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
      this.$emit("delete", row);
    },
  },
};
</script>

<style lang="scss" scoped></style>
