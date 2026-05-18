<template>
  <el-card>
    <template #header>
      <div class="flex justify-between" v-if="userInfo.roleId != '10'">
        <div>

        </div>

        <div>
          <el-dropdown split-button type="primary" @command="handleClick">
            批量操作
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item command="{ edit }">批量领取 </el-dropdown-item>
              <el-dropdown-item command="{ edit }">批量分配</el-dropdown-item>-->
              <el-dropdown-item command="download">报告下载</el-dropdown-item>
              <el-dropdown-item command="export">
                批量导出
              </el-dropdown-item>
              <el-dropdown-item command="dels">批量删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </template>
    <el-table border :data="tableData" style="width: 100%" v-loading="loading" @selection-change="handleSelectionChange"
      @row-click="handleRowClick">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="" label="课程名称/ID" min-width="180" align="center" show-overflow-tooltip>
        <template #default="scope">
          <div v-html="`<div>${scope.row.courseName}</div><div>${scope.row.courseNum}</div>`"></div>
        </template>
      </el-table-column>
      <el-table-column v-if="userRolesNames == '系统最高管理员'" label="所属高校" prop="universityName" min-width="120" align="center"></el-table-column>
      <el-table-column prop="stuNum" label="人数" min-width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="userName" label="老师" min-width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="grade" label="年级" align="center" min-width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="academicYear" label="学年" align="center" min-width="80" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="" label="教师表现" align="center" show-overflow-tooltip min-width="480">
        <el-table-column prop="loginNum" label="平台登录次数" align="center" min-width="120" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="vmLoginNum" label="实操云登录次数" align="center" min-width="120" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="vmLoginTime" label="实操云登录时长" align="center" min-width="120" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="homeworkMarkRate" label="作业批改率(%)" align="center" min-width="120" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="trialMarkRate" label="实操批改率(%)" align="center" min-width="120" show-overflow-tooltip>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="" label="资源配置" align="center" min-width="80" show-overflow-tooltip>
        <el-table-column prop="cpu" label="CPU(核)" min-width="90" align="center" show-overflow-tooltip>
        </el-table-column>

        <el-table-column min-width="80" prop="memory" label="内存(GB)" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column min-width="80" prop="disk" label="存储(GB)" align="center" show-overflow-tooltip>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="reportStatus" label="报告生成" align="center" min-width="80" show-overflow-tooltip>
        <template #default="scope">
          <div>{{ scope.row.reportStatus == 1 ? "已生成" : "未生成" }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="reportCreateTime" label="生成时间" align="center" min-width="80" show-overflow-tooltip>
      </el-table-column>

      <el-table-column label="操作" fixed="right" align="center" min-width="180">
        <template #default="scope">
          <div>
            <el-button type="info" class="editInfo" size="mini" :disabled="scope.row.reportStatus == 0"
              @click="handleReport(scope.row)">查看报告</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
      @pagination="searchQuery" />
  </el-card>
</template>
<script>
import Pagination from "@/components/Pagination";
import { mapGetters } from "vuex";
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
  },
  components: {
    Pagination,
  },
  created() { },
  computed: {
    ...mapGetters(["userInfo", "userRolesNames"]),
  },
  data() {
    return {
      dialog: {
        visible: false,
        status: "",
      },
      textValue: "license",
      insertLoading: false,
      fileDialogVisible: false,
      fileUpLoading: false,
      dialogStatus: "create",
      updateFileInfo: {},
      ipSupplierList: [],
      rowList: [], //删除审批中需要展示的列表
    };
  },
  methods: {
    handleReport(row) {
      const { courseId } = row;
      this.$emit("handleReport", courseId);
    },
    handleClick(e) {
      if (e == "download") {
        if (!(this.ids && this.ids.length > 0)) {
          this.$message.warning("请选择要下载的数据");
          return;
        }
        this.$emit("download", this.ids);
      }
      if (e == "export") {
        if (!(this.ids && this.ids.length > 0)) {
          this.$message.warning("请选择要导出的数据");
          return;
        }
        this.$emit("export", this.ids);
      }
      if (e == "dels") {
        if (!(this.ids && this.ids.length > 0)) {
          this.$message.warning("请选择要删除的数据");
          return;
        }

        this.$confirm("确定删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$emit(`delete`, this.ids);
          })
          .catch(() => {
            console.log("取消删除");
          });
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

    handleRowClick(e) { },

    searchQuery(e) {
      this.$emit("searchQuery", e);
    },
  },
};
</script>

<style lang="scss" scoped></style>
