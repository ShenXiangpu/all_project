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
              <el-dropdown-item command="download">报告下载</el-dropdown-item>
              <el-dropdown-item command="export">
                批量导出
              </el-dropdown-item>
              <!-- <el-dropdown-item command="export">批量导出</el-dropdown-item> -->

              <el-dropdown-item command="dels">批量删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </template>
    <el-table border :data="tableData" style="width: 100%" v-loading="loading" @selection-change="handleSelectionChange"
      @row-click="handleRowClick">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="" label="学生姓名/学号" min-width="120" align="center" show-overflow-tooltip>
        <template #default="scope">
          <div v-html="`<div>${scope.row.userName}</div><div>${scope.row.studentNum}</div>`"></div>
        </template>
      </el-table-column>
      <el-table-column v-if="userRolesNames == '系统最高管理员'" label="所属高校" prop="universityName" min-width="120" align="center"></el-table-column>

      <el-table-column prop="className" label="班级" min-width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="grade" label="年级" min-width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="academicYear" label="学年" align="center" min-width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="courseName" label="课程" align="center" min-width="80" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="平台登录" align="center" show-overflow-tooltip>
        <el-table-column prop="loginNum" label="次数" align="center" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="loginRank" label="名次" align="center" show-overflow-tooltip>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="companyTypeName" label="实操云登录" align="center" min-width="80" show-overflow-tooltip>
        <el-table-column prop="vmLoginNum" label="次数" align="center" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="vmLoginNumRank" label="名次" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="vmLoginTime" label="时长(h)" align="center" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="vmLoginTimeRank" label="名次" align="center" show-overflow-tooltip>
        </el-table-column>
      </el-table-column>
      <el-table-column label="作业分数" align="center" min-width="120" show-overflow-tooltip>
        <el-table-column prop="homeworkScore" label="平均分" align="center" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="homeworkScoreRank" label="名次" align="center" show-overflow-tooltip>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="cooperationAreaName" label="实验分数" align="center" min-width="120" show-overflow-tooltip>
        <el-table-column prop="trialScore" label="分数" align="center" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="trialScoreRank" label="名次" align="center" show-overflow-tooltip>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="cooperationAreaName" label="理论课完成" align="center" min-width="120" show-overflow-tooltip>
        <el-table-column prop="courseRead" min-width="90" label="完成率(%)" align="center" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="courseReadRank" label="名次" align="center" show-overflow-tooltip>
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
            <el-button type="info" class="editInfo" :disabled="scope.row.reportStatus == 0" size="mini"
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
import { mapGetters } from "vuex";
import Pagination from "@/components/Pagination";
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
      const { courseId, userId } = row;
      this.$emit("handleReport", courseId, userId);
    },
    downLoadFile() {
      downUserTemplate().then((res) => {
        if (res && res.size === 0) {
          this.$message.success("当前数据为空");
          return;
        }
        const blob = new Blob([res.data], {
          type: "application/vnd.ms-excel;charset=utf-8",
        }); // 构造一个blob对象来处理数据，并设置文件类型

        let fileName = decodeURI(res.headers["content-disposition"]);

        if (fileName) {
          fileName = fileName.substring(fileName.indexOf("=") + 1);
        }
        const href = URL.createObjectURL(blob); //创建新的URL表示指定的blob对象
        const a = document.createElement("a"); //创建a标签
        a.style.display = "none";
        a.href = href; // 指定下载链接
        a.download = fileName; //指定下载文件名
        document.body.appendChild(a);
        a.click(); //触发下载
        URL.revokeObjectURL(a.href); //释放URL对象
        document.body.removeChild(a);
        this.$message.success("下载成功");
      });
    },
    beforeAvatarUpload(file) {
      return true;
    },
    doUpload(item) {
      let FormDatas = new FormData();
      FormDatas.append("file", item.file);
      this.insertLoading = true;
      this.$message.success("正在导入");
      insertUserBatch(FormDatas)
        .then((res) => {
          console.log(res);
          if (res && res.flag) {
            if (res.resData.length == 0) {
              this.$emit("queryList");
              this.insertLoading = false;
              this.$message.success("导入成功");
            } else {
              let resData = res.resData;
              let itemHtml = "";
              resData &&
                resData.forEach((item, index) => {
                  itemHtml += `<div style="margin-bottom:2px;color:red"><span>${index + 1
                    }、</span> ${item}</div>`;
                });
              this.$alert(itemHtml, "提示", {
                dangerouslyUseHTMLString: true,
              });
            }
          } else {
            // this.$message.error("上传出错");
            this.insertLoading = false;
          }
        })
        .finally(() => {
          this.insertLoading = false;
        });
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
        this.$emit("delete", this.ids, this.rowList);
      }
    },
    handleCustomerInfo(row) {
      this.$emit("handleCustomerInfo", row);
    }, // 获取多删除ids
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
    handleCommand(row) {
      Object.keys(row).forEach((key) => {
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
      });
    },
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
      console.log(e);
      console.log("searchQuery", this.listQuery);
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
    handleContract(item) {
      this.$emit("handleContract", item);
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


    async handleDelete(row) {
      this.$emit("delete", [row.contractId], [row]);
    },
  },
};
</script>

<style lang="scss" scoped></style>
