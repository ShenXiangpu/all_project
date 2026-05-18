<template>
  <div>
    <border-container class="marginBottom10 border-container" :height="15" :isShowTitle="false" :isBgShow="false">
      <template #content>
        <div class="" style="padding: 10px 0 0px 10px;">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="实验名称" prop="trialName">
              <el-input v-model="queryParams.trialName" id="keyword" name="keyword" placeholder="请输入实验名称" clearable
                @keyup.enter="handleQuery" />
            </el-form-item>

            <el-form-item label="创建人" prop="createBy">
              <el-select v-model="queryParams.createBy" placeholder="请选择创建人">
                <el-option v-for="item in createByList" :key="item.id" :label="item.userName" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <get-university v-if="userRolesNames == '系统最高管理员'" :queryParams="queryParams"></get-university>
            <el-form-item v-if="!(userRolesNames == '学生')" label="是否公开" prop="ofPublic">
              <el-select v-model="queryParams.ofPublic" placeholder="请选择状态">
                <el-option label="" value="">全部</el-option>
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="关联课程" prop="courseId">
              <el-select
                placeholder="请选择课程"
                v-model="queryParams.courseId"
              >
                <el-option label="" value="">请选择</el-option>
                <el-option
                  v-for="item in courseList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item> -->
            <!-- <el-form-item
              v-if="userRolesNames == '学生'"
              label="练习状态"
              prop="studentStatus"
            >
              <el-select
                placeholder="请选择练习状态"
                v-model="queryParams.studentStatus"
              >
                <el-option label="" value="">请选择</el-option>
                <el-option label="未完成" :value="0"></el-option>
                <el-option label="待批改" :value="1"></el-option>
                <el-option label="已批改" :value="2"></el-option>
              </el-select>
            </el-form-item> -->
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
      <template #header>
        <div v-if="userRolesNames !== '学生'" class="flex justify-between">
          <el-button type="primary" @click="handleAdd('/lab/operationLab')" icon="el-icon-plus">添加实验</el-button>
        </div>
      </template>
      <template v-if="userRolesNames == '系统最高管理员'">
        <el-table border :data="labList" style="width: 100%" v-loading="loading">
          <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
          <el-table-column label="实验名称" align="center">
            <template slot-scope="scope">
              <div class="primaryColorb pointer" @click.stop="handleDetail(scope.row.trialId)">{{ scope.row.trialName }}
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="coverImageTrialTypeName" label="实验类型" min-width="90" align="center">
          </el-table-column>
          <el-table-column prop="universityName" label="所属高校" align="center" min-width="70">

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
          <el-table-column prop="recommendStandard" label="推荐配置" align="center" min-width="90">
          </el-table-column>
          <el-table-column prop="ofPublic" label="公开状态" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.ofPublic == 1" size="mini" type="success">公开</el-tag>
              <el-tag v-else type="danger" size="mini">不公开</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createByName" label="创建人" align="center" min-width="0">
          </el-table-column>
          <el-table-column prop="createAt" label="创建时间" align="center" min-width="90">
          </el-table-column>
          <el-table-column label="操作" fixed="right" align="center" min-width="180">
            <template #default="scope">
              <el-button type="primary" class="editPrimary marginRight10" size="small"
                @click.stop="handleUpdate2(scope.row)">修改</el-button>

              <el-popconfirm title="确定删除实验吗？" @onConfirm="deleteLab(scope.row)">
                <el-button size="mini" type="danger" class="editDanger" slot="reference"
                  :loading="deleteLoading">删除</el-button>
                <!-- <i class="el-icon-delete font20 pointer" style="color: #f56c6c;" slot="reference"></i> -->
              </el-popconfirm>
            </template>
          </el-table-column>

        </el-table>
      </template>
      <template v-else>
        <el-row :gutter="10">
          <el-col class="el-row index-color pointer" :xs="8" :sm="8" :md="8" :lg="6" :xl="5" v-for="item in labList"
            :key="item.id">
            <lab-list class="lab-list" @handleDetail="handleDetail(item.trialId)"
              @handleUpdate="handleUpdate(item.trialId)" :imgUrl="imgUrlList[item.coverImageStage]"
              :labName="item.coverImageName" :coverImageDisplayAuthor="item && item.coverImageDisplayAuthor"
              :createName="item && item.createByName" :item="item">
              <template #lab-description>
                <div @click="handleDetail(item.trialId)" style="" class="description-container">
                  <div class="flex justify-between">
                    <el-popover placement="top" trigger="hover">
                      <div style="max-width: 400px; min-width: 200px">
                        {{ item.trialName }}
                      </div>
                      <div slot="reference">
                        <h2 class="view-text trialName">{{ item.trialName }}</h2>
                      </div>
                    </el-popover>
                    <div v-if="item.tag" class="lab-card-bottom " style="width: 20%; text-align: right">
                      <el-tag class="el-tag-lab-squareLab" type="info" size="mini">{{ item.ofPublic == 1 ? '公开' : '不公开'
                      }}</el-tag>
                    </div>
                  </div>
                  <div class="marginTop10">
                    <div class="flex justify-between">
                      <div style="width: 40%" class="flex justify-start">
                        <el-popover placement="top" trigger="hover">
                          <div>
                            <tools-detail :tools="item && item.tools"></tools-detail>
                          </div>
                          <el-tag slot="reference" type="info" size="mini"
                            class="info-container marginRight10 primaryColor">工具信息</el-tag>
                        </el-popover>
                        <el-popover placement="top" trigger="hover" v-if="item && item.labList">
                          <div class="labList-popover">
                            <lab-detail :labList="item && item.labList"></lab-detail>
                          </div>
                          <el-tag slot="reference" type="info" size="mini"
                            class="info-container marginRight10 primaryColor">文件信息</el-tag>
                        </el-popover>
                      </div>
                      <div class="lab-card-bottom" style="width: 40%; text-align: right">
                        <span><i class="el-icon-s-flag"></i>
                          {{
                            `${(item &&
                              item.userCountInfo &&
                              item.userCountInfo.oneTrialAllCourseFinish) ||
                            0
                            }` + "次"
                          }}</span>
                      </div>
                    </div>

                  </div>
                </div>
              </template>
            </lab-list>
          </el-col>
          <div class="text-center" v-if="!(labList && labList.length > 0)">
            <span class="color9">暂无数据</span>
          </div>
        </el-row>
      </template>


      <pagination v-if="total > 0" :total="total" :page.sync="queryParams.page" :limit.sync="queryParams.limit"
        @pagination="searchQuery" />
    </el-card>
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
import ToolsDetail from "../labDetail/components/ToolsDetail.vue";
import LabDetail from "../labDetail/components/LabDetail.vue";
import { getCourseList } from "@/api/edu/course";
import GetUniversity from "@/components/GetUniversity";
import {
  getMyTrialList, createBy,
  deleteOneRel,
  getRelTrialCourseList,
} from "@/api/edu/labCenter";

import { checkPermission } from "@/utils/validate";
import { Message } from "element-ui";
import { get } from "jquery";

export default {
  //import 引入的组件需要注入到对象中才能使用
  name: "myLab",
  components: {
    BorderContainer,
    LabList,
    Pagination,
    ToolsDetail,
    LabDetail,
    GetUniversity
  },
  props: {},
  computed: {
    ...mapGetters(["userRolesNames"]),
  },
  data() {
    return {
      imgUrlList: imgUrlList,
      deleteLoading: false,
      queryParams: {
        universityName: "",
        trialName: "",
        createByName: "",
        ofPublic: "",
        courseId: "",
        studentStatus: "",
        createBy: "",
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
    handleUpdate(id) {
      this.$router.push({ path: "/lab/operationLab", query: { id: id } });
    },
    handleUpdate2(row) {
      let id = row.trialId
      let courseName = row.courseName;
      this.$router.push({ path: "/lab/operationLab", query: { id: id, pub: true, courseName } });
    },


    async deleteLab(row) {
      const res = await getRelTrialCourseList({
        trialId: row.trialId, trialCourseId: row.trialCourseRelId
      });
      if (!(res && res.flag)) {
        return this.$message.error("删除失败");
      } else {
        let resData = res.resData;
        let str = null
        if (resData && resData.length > 0) {
          let courseList = '';
          resData.forEach((item) => {
            courseList += item.courseName + ","
          })
          str = `删除实验将删除实验的全部数据，请谨慎操作! 该实验关联了${courseList}共${resData.length}个课程，是否继续？`
        } else {
          str = '删除实验将删除实验的全部数据，请谨慎操作!'
        }

        this.$confirm(str, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.deleteLoading = true;
            deleteOneRel({ id: row.trialId })
              .then((res) => {
                if (res && res.flag) {
                  this.$message.success("删除成功");
                  this.deleteLoading = false;
                  this.handleQuery();
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
      }

    },

    handleDetail(id) {
      this.$router.push({ path: "/lab/labDetail", query: { id: id, public: true } });
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
        let labList = resData.records;
        labList &&
          labList.length > 0 &&
          labList.map((item) => {
            let labs = item.labList;
            let ipList = item.ipList;
            let pdkList = item.pdkList;
            if (
              (ipList && ipList.length > 0) ||
              (pdkList && pdkList.length > 0)
            ) {
              item.labList = labs.concat(item.ipList).concat(item.pdkList);
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
