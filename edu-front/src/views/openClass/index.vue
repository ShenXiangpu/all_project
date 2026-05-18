<template>
  <div class="app-container">
    <border-container class="marginBottom10 border-container" :height="15" :isShowTitle="false" :isBgShow="false">
      <template #content>
        <div class="" style="padding: 10px 0 0px 10px;">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="公开课名称" prop="name">
              <el-input v-model="queryParams.name" id="keyword" name="name" placeholder="请输入公开课名称" clearable
                @keyup.enter="handleQuery" />
            </el-form-item>


            <el-form-item>
              <el-button type="success" class="editSuccess" icon="el-icon-search" @click="handleQuery">搜索</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" class="editPrimary" icon="el-icon-refresh"
                @click="resetQuery('queryFormRef')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </border-container>
    <el-card class="my-lab-card-body" v-loading="loading">
      <template #header v-if="userRolesNames === '系统最高管理员'">
        <div class="flex justify-between">
          <el-button type="primary" @click="handleAdd('defineOpenClass')" icon="el-icon-plus">添加公开课</el-button>
        </div>
      </template>
      <el-table border :data="labList" style="width: 100%" v-loading="loading">
        <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
        <el-table-column label="公开课名称" align="center">
          <template slot-scope="scope">
            <div class="primaryColorb pointer" @click.stop="handleDetail(scope.row.id)">{{ scope.row.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="academicYear" label="工具" align="center" min-width="90">
          <template slot-scope="scope">
            <el-popover placement="top" trigger="hover">
              <div>
                <tools-detail :tools="scope && scope.row.tools"></tools-detail>
              </div>
              <el-tag slot="reference" type="info" size="mini" class="info-container marginRight10 primaryColor">
                {{
                  scope.row.tools[Object.keys(scope && scope.row.tools)[0]][0].edaTools[0].toolName
                }} ...
              </el-tag>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="文件" align="center" min-width="90">
          <template slot-scope="scope">
            <el-popover placement="top" trigger="hover">
              <div>
                <lab-detail :labList="scope.row.fileList"></lab-detail>
              </div>
              <el-tag slot="reference" type="info" size="mini" class="info-container marginRight10 primaryColor">
                {{ getFileDisplayName(scope.row) }} ...
              </el-tag>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="课程描述" align="center" min-width="90">
          <template slot-scope="scope">
            <el-tag slot="reference" @click="courseDetail(scope.row.content)" type="info" size="mini"
              class="info-container pointer marginRight10 primaryColor">
              课程描述
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createByName" label="创建人" align="center" min-width="0">
        </el-table-column>
        <el-table-column prop="createAt" label="创建时间" align="center" min-width="90">
        </el-table-column>
        <el-table-column v-if="userRolesNames === '系统最高管理员'" label="操作" fixed="right" align="center" min-width="180">
          <template #default="scope">
            <el-button type="primary" class="editPrimary marginRight10" size="small"
              @click.stop="handleUpdate(scope.row.id)">修改</el-button>

            <el-popconfirm title="确定删除实验吗？" @onConfirm="deleteLab(scope.row)">
              <el-button size="mini" type="danger" class="editDanger" slot="reference"
                :loading="deleteLoading">删除</el-button>
              <!-- <i class="el-icon-delete font20 pointer" style="color: #f56c6c;" slot="reference"></i> -->
            </el-popconfirm>
          </template>
        </el-table-column>

      </el-table>




      <pagination v-if="total > 0" :total="total" :page.sync="queryParams.page" :limit.sync="queryParams.limit"
        @pagination="searchQuery" />

    </el-card>
    <course-drawer ref="course-drawer" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';

import LabList from "@/components/LabList";
import BorderContainer from "@/components/BorderContainer";
import { getCourseForHomeWork } from "@/api/edu/course";
import Pagination from "@/components/Pagination";
import imgUrlList from "@/utils/imageurl";
import { mapGetters } from "vuex";
import ToolsDetail from "./detail/components/ToolsDetail.vue";
import LabDetail from "./detail/components/LabDetail.vue";
import GetUniversity from "@/components/GetUniversity";
import CourseDrawer from '@/views/classMng/courseMng/courseDetail/components/CourseDrawer.vue';
import {
  getMyTrialList, createBy,
  deleteOpenClass,
} from "@/api/edu/openClass.js";
export default {
  //import 引入的组件需要注入到对象中才能使用
  name: "OpenClass",
  components: {
    BorderContainer,
    LabList,
    Pagination,
    ToolsDetail,
    LabDetail,
    GetUniversity,
    CourseDrawer
  },
  props: {},
  computed: {
    ...mapGetters(["userRolesNames"]),
    getFileDisplayName() {
      return (row) => {
        return row.fileList && row.fileList.length > 0
          ? (row.fileList[0].displayName || '暂无文件名')
          : '暂无文件';
      };
    }
  },
  data() {
    return {
      imgUrlList: imgUrlList,
      deleteLoading: false,
      queryParams: {
        name: '',
        page: 1,
        limit: 10,
      },
      userList: [],
      courseList: [],
      total: 0,
      loading: false,
      //实验list
      labList: [],
      createByList: [],

      //
    };
  },
  watch: {},
  created() {
    //this.handleQuery();
    this.queryCourses();
    this.handleQuery();
    this.queryCreateBy();
  },
  methods: {
    courseDetail(content) {
      this.$refs['course-drawer'].drawer = true;
      this.$refs['course-drawer'].title = "课程描述";
      this.$refs['course-drawer'].manualContent = content || '';
    },
    handleUpdate(id) {
      this.$router.push({ path: "defineOpenClass", query: { id: id } });
    },
    handleUpdate2(row) {
      let id = row.trialId
      let courseName = row.courseName;
      this.$router.push({ path: "defineOpenClass", query: { id: id, pub: true, courseName } });
    },


    async deleteLab(row) {
      //

      this.$confirm('确定删除吗？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteLoading = true;
          deleteOpenClass({ id: row.id })
            .then((res) => {
              if (res && res.flag) {
                this.$message.success("删除成功");
                this.handleQuery();
                this.deleteLoading = false;
              }
            })
            .finally(() => {
              this.deleteLoading = false;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
          this.deleteLoading = false;
        });


    },

    handleDetail(id) {
      this.$router.push({ path: "detail", query: { id: id } });
    },

    queryCreateBy() {
      let userRolesNames = this.$store.state.user.userRolesNames;
      let self = userRolesNames == "学生" ? 1 : 1;
      createBy({ self }).then((res) => {
        this.createByList = res && res.resData;
      });
    },
    handleAdd(path) {
      this.$router.push(path);
    },
    queryCourses() {
      getCourseForHomeWork("").then((res) => {
        this.courseList = res && res.resData;
      });
    },
    handleQueryInitPage() {
      this.queryParams.page = 1;
      // this.queryParams.limit = 10;
      this.handleQuery();
    },

    //重置，初始换条件和查询
    resetQuery() {
      this.$refs.queryFormRef.resetFields();
      //this.initQueryParams();
      this.queryParams.page = 1;
      console.log(this.queryParams);
      this.handleQuery();
    },

    //查询我的实验列表
    async handleQuery() {
      const params = this.queryParams;
      this.loading = true;
      const res = await getMyTrialList(params);
      if (res && res.flag) {
        this.loading = false;
        const resData = res.resData;
        let labList = resData;
        labList &&
          labList.length > 0 &&
          labList.map((item) => {
            let labs = item.labList || [];
            let ipList = item.ipList || [];
            let pdkList = item.pdkList || [];
            if (
              (labs && labs.length > 0) ||
              (ipList && ipList.length > 0) ||
              (pdkList && pdkList.length > 0)
            ) {
              // 合并三个数组，确保每个都是数组类型
              item.fileList = [...labs, ...ipList, ...pdkList];
            }
          });
        console.log("labList", labList);
        this.labList = labList;
        this.total = resData.total;
        this.page = resData.pageNum;
      } else {
        this.loading = false;
      }
    },
    searchQuery(e) {
      this.queryParams.page = e.page;
      this.queryParams.limit = e.limit;
      this.handleQuery();
    },
  },
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() { },
};
</script>
<style></style>
<style lang="scss" scoped>
@media only screen and (min-width: 1920px) {
  .el-col-xl-5 {
    width: 20%;
  }
}

@media only screen and (max-width: 1300px) {
  .el-col-xl-5 {
    width: 20%;
  }
}

@media only screen and (max-width: 1100px) {
  .el-col-xl-5 {
    width: 20%;
  }

  .el-col-xs-8 {
    width: 25%;
  }

  .el-col-sm-8 {
    width: 25%;
  }

  .el-col-md-8 {
    width: 25%;
  }
}

@media only screen and (max-width: 900px) {
  .el-col-xl-5 {
    width: 20%;
  }

  .el-col-xs-8 {
    width: 25%;
  }
}

::v-deep {
  .el-tag-lab-squareLab {
    background-color: rgb(249, 242, 171) !important;
    color: rgb(253, 206, 45);
  }

  .el-tag-lab-my {
    background-color: rgb(228, 249, 233) !important;
    color: rgb(123, 193, 139);
  }
}

.border-container {
  ::v-deep {
    .left-circle {
      width: 16px;
      height: 32px;
      border-radius: 0 16px 16px 0;

      .circle-center {
        width: 8px;
        height: 16px;
        border-radius: 0 8px 8px 0;
        top: 6px;
      }
    }

    .right-circle {
      width: 16px;
      height: 32px;
      border-radius: 16px 0 0 16px;
      right: -2px;

      .circle-center {
        width: 8px;
        height: 16px;
        border-radius: 8px 0 0 8px;
        top: 6px;
      }
    }
  }
}

.online::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin: 0 1px;
  background: linear-gradient(90deg,
      rgb(243, 247, 244) 0%,
      rgb(32, 249, 104) 0%,
      rgb(33, 241, 33) 100%,
      rgb(243, 245, 242) 100%);
  box-shadow: 0px 0 10px rgb(32, 249, 86);
}

.outline::before,
.outline::after {
  content: "";
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  // background: linear-gradient(90deg, rgb(177, 180, 178) 0%, rgb(186, 187, 186) 0%,rgb(182, 184, 182) 100%, rgb(205, 206, 204) 100%);
}

.el-row {
  margin-bottom: 20px;

  ::v-deep .lab-card {
    height: 280px !important;
  }

  &:last-child {
    margin-bottom: 0;
  }

  .description-container {
    padding: 5px;
    margin-top: 5px;

    .info-container {
      padding: 2px;
    }

    .trialName {
      width: 200px;
    }
  }

  .show-text {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 16px;
    padding-left: 10px;
    padding-right: 10px;
  }
}

.menu-container {
  margin: 30px;
}

.el-divider {
  background: none;
}

.my-lab-card-body .el-card__body {
  ::v-deep {
    padding: 0px;
  }
}

@media screen and (max-width: 1200px) {
  .info-tools {
    padding: 4px 0 2px 0;
    width: 100%;
  }

  .show-info .el-popover__reference {
    height: 26px !important;
  }
}

.lab-list {
  .show-info {
    .popper-class {
      height: 300px;
    }
  }
}

.content-top {
  .el-form-item {
    margin-bottom: 0px;
  }

  margin-bottom: 10px;
}

.search {
  padding: 18px 0 0 10px;
  margin-bottom: 10px;
  border-radius: 2px;
  /* border: 1px solid var(--el-card-border-color); */
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
  height: 400px;
  max-height: 80vh;
  overflow: auto;

  &-tag {
    margin-right: 5px;
  }
}
</style>
