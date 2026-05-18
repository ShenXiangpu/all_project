<template>
  <div>
    <el-card class="card-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="实例ID" prop="keyWord">
          <el-input class="inputClass" v-model="queryParams.keyWord" placeholder="请输入实例ID" clearable
            @keyup.enter="handleQuery" />
        </el-form-item>
        <get-university v-if="userRolesNames === '系统最高管理员'" :queryParams="queryParams" />
        <el-form-item prop="courseId" label="关联课程">
          <el-select class="inputClass" v-model="queryParams.courseId" @change="handleQueryInitPage"
            placeholder="请选择关联课程">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in courseList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="type" label="告警类型">
          <el-select class="inputClass" v-model="queryParams.type" @change="handleQueryInitPage" placeholder="请选择告警类型">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in alarmTypeList" :key="item.value" :label="item.label"
              :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="isCanceled" label="解除状态">
          <el-select class="inputClass" v-model="queryParams.isCanceled" @change="handleQueryInitPage"
            placeholder="请选择解除状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="持续" value="false"></el-option>
            <el-option label="恢复正常" value="true"></el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="日期" prop="msgTitle">
          <el-date-picker
            v-model="queryParams.value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item> -->

        <el-form-item>
          <el-button type="success" class="editSuccess" icon="el-icon-search" @click="handleQuery">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="editPrimary" icon="el-icon-refresh"
            @click="resetQuery('queryFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="marginTop10">
      <el-table ref="filterTable" border :data="alarmHistoryList" v-loading="loading" style="width: 100%">
        <el-table-column prop="vmId" label="实例ID" min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="schoolName" label="所属高校" min-width="100" align="center"
          v-if="userRolesNames === '系统最高管理员'">
        </el-table-column>
        <el-table-column prop="courseName" label="关联课程" min-width="100" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="alarmName" label="策略名称" min-width="120" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="type" label="策略类型" min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="level" label="告警等级" width="100" align="center">
          <template #default="scope">
            <div class="primaryColoro" v-if="scope.row.level == 'Warning'">
              Warning
            </div>
            <div class="primaryColorr" v-if="scope.row.level == 'Critical'">
              Critical
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="isCanceled" label="告警状态" width="100" align="center">
          <template #default="scope">
            <div class="primaryColor" v-if="scope.row.isCanceled">
              恢复正常
            </div>
            <div class="primaryColorr" v-else>
              持续
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="eventMessage" label="警报事件信息" min-width="380" show-overflow-tooltip
          align="center"></el-table-column>
        <el-table-column prop="triggerTime" label="告警时间" min-width="120" align="center"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" min-width="120">
          <template #default="scope">
            <el-popconfirm title="确定删除吗？" @onConfirm="handleDeleteAlarm(scope.row)">
              <el-button size="small" type="danger" class="editDanger" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
        @pagination="searchQuery" />
    </el-card>
  </div>
</template>

<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';
import Pagination from "@/components/Pagination";
import { queryAlarmEvent, deleteAlarmEvent } from "@/api/edu/alarm";
import { getCourseForHomeWork } from "@/api/edu/course";
import { mapGetters } from "vuex";
import GetUniversity from "@/components/GetUniversity";
export default {
  //import 引入的组件需要注入到对象中才能使用
  name: "courseMng",
  components: {
    Pagination,
    GetUniversity
  },
  computed: {
    ...mapGetters(["userRolesNames"]),
  },
  props: {},
  data() {
    return {
      alarmTypeList: [
        { value: "CPU", label: "CPU告警" },
        { value: "MEMORY", label: "内存告警" },
        { value: "DISK", label: "磁盘告警" }
      ],
      loading: false,

      queryParams: {
        courseId: "",
        universityName: "",
        keyWord: "",
        isCanceled: "",
        type: "",
      },
      alarmHistoryList: [],
      listQuery: {
        page: 1,
        limit: 10,
        params: "",
      },
      total: 0,
      courseList: [],
    };
  },
  created() {
    this.handleQuery();
    this.queryCourseForHomeWork();
  },
  methods: {
    handleDeleteAlarm(item) {
      const { id } = item;
      deleteAlarmEvent({ id }).then((res) => {
        if (res && res.flag) {
          this.$message.success("告警历史删除成功");
          this.handleQuery();
        } else {
          this.$message.error("告警策略历史失败");
        }
      });
    },
    queryCourseForHomeWork() {
      getCourseForHomeWork("").then((res) => {
        this.courseList = res && res.resData;
      });
    },
    initParams() {
      let listQuery = {
        page: 1,
        limit: 10,
        params: {},
      };
      this.listQuery = listQuery;
    },
    getList() {
      this.loading = true;
      queryAlarmEvent(this.listQuery)
        .then((reponse) => {
          let resData = reponse.resData;
          this.alarmHistoryList = resData && resData.result;
          this.total = resData.total;
          this.loading = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    handleQueryInitPage() {
      this.getList();
    },

    searchQuery(e) {
      this.listQuery.page = e.page;
      this.listQuery.limit = e.limit;

      this.listQuery.params = this.queryParams;

      this.getList();
    },

    handle(queryParams) {
      let date =
        (queryParams &&
          queryParams.value1 &&
          queryParams.value1.length > 0 &&
          queryParams.value1) ||
        null;
      if (date) {
        let startTime = date[0];
        let endTime = date[1];
        startTime = this.$moment(startTime).format("YYYY-MM-DD HH:mm:ss");
        endTime = this.$moment(endTime).format("YYYY-MM-DD HH:mm:ss");
        return { startTime, endTime };
      } else {
        return { startTime: "", endTime: "" };
      }
    },
    handleQuery() {
      // const params = this.handle(this.queryParams);
      // if (params && params.startTime && params.endTime) {
      //   this.listQuery.params = params;
      // } else {
      //   this.listQuery.params = {};
      // }
      this.listQuery.params = this.queryParams;
      this.getList();
    },
    //重置搜索条件
    resetQuery(formName) {
      this.queryParams = {
        courseId: "",
        keyWord: "",
        isCanceled: "",
        type: "",
      };
      this.listQuery.params = this.queryParams;
      this.listQuery.page = 1;
      this.listQuery.params = {};
      this.listQuery.page = 1;
      this.getList();
    },
  },
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() { },
};
</script>
<style lang="scss" scoped>
.marginTop10 {
  margin-top: 10px;
}

.marginRt20 {
  margin-right: 20px;
}

.search {
  padding: 18px 0 0 10px;
  margin-bottom: 10px;
  border-radius: 2px;
  /* border: 1px solid var(--el-card-border-color); */
}

.card-container {
  .el-form-item {
    margin-bottom: 0px;
  }
}

.dialog {
  ::v-deep {
    .el-dialog {
      max-height: 80vh;
      overflow: auto;
    }

    // .el-dialog__footer {
    //   position: absolute;
    //   bottom: 0px;
    //   right: 0px
    // }
  }

  &-form {
    width: 50%;
  }
}

.dialog-form {
  width: 100%;
}

.dialog-userContainer {
  border: 1px solid #ccc;
  padding: 10px;
  height: 200px;
  max-height: 30vh;
  overflow: auto;

  &-tag {
    margin-right: 5px;
  }
}

.card-container {
  .el-form-item {
    margin-bottom: 0px;
  }
}

.inputClass {
  width: 180px;
}
</style>
