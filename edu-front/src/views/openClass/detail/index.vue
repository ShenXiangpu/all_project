<template>
  <div class="app-container">
    <border-container class="marginBottom10 border-container" :isShowTitle="false" :isBgShow="false">
      <template #content>
        <div class="trialDetail-container-image flex justify-between">
          <div class="flex flex-between">
            <lab-list :detailLoading="detailLoading" class="image lab-list" :isShowUpdate="false"
              :imgUrl="imgUrlList[trialDetail.coverImageStage]" :labName="trialDetail.coverImageName"
              :coverImageDisplayAuthor="trialDetail && trialDetail.coverImageDisplayAuthor
                " :createName="trialDetail && trialDetail.createByName" :item="trialDetail" :isShowName="false">
            </lab-list>
            <div class="detail flex flex-column justify-between">
              <div class="flex  align-center">
                <div class="flex flex-start align-center">
                  <el-popover placement="top-start" trigger="hover" :content="trialDetail.name">
                    <div slot="reference" class="detail-trailName view-text marginRight10 font18 fontW7">
                      {{ trialDetail.name }}
                    </div>
                  </el-popover>
                  <el-popover placement="top-start" trigger="hover" content="修改课程">
                    <i @click.stop="handleUpdate" slot="reference"
                      class="el-icon-edit-outline pointer font18 marginRight20"></i>
                  </el-popover>
                </div>
                <div class="flex justify-start">
                  <el-popover placement="top" trigger="hover">
                    <div>
                      <tools-detail :tools="trialDetail && trialDetail.tools"></tools-detail>
                    </div>
                    <el-tag slot="reference" type="info" size="mini"
                      class="info-container marginRight10 primaryColor">工具信息</el-tag>
                  </el-popover>
                  <el-popover placement="top" trigger="hover">
                    <div>
                      <lab-detail :labList="trialDetail && trialDetail.fileList"></lab-detail>
                    </div>
                    <el-tag slot="reference" type="info" size="mini"
                      class="info-container marginRight10 primaryColor">文件信息</el-tag>
                  </el-popover>
                </div>
              </div>

            </div>

          </div>
          <div class="flex flex-column justify-center">
            <div>
              <el-button v-if="userId == trialDetail.createBy || userRolesNames == '系统最高管理员'" @click="deleteLab"
                icon="el-icon-delete" type="danger" class="editDanger" :loading="deleteLoading">删除公开课</el-button>
            </div>
          </div>
        </div>
      </template>
    </border-container>
    <div>
      <el-tabs class="el-tab-lab" v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="课程列表" name="third">
          <course-mng-com ref="course-mng-com" :courseId="trialId"></course-mng-com>
        </el-tab-pane>
        <el-tab-pane label="课程介绍" name="zero">

          <div :span="24" style="width: 50%; margin: 0 auto;">
            <div>
              <h2 class="marginBottom10">课程描述</h2>
            </div>
            <div class="el-tab-lab-container" style="border: 0">
              <edu-tinymce :disabled="true" ref="edu-tinymce" :value="trialDetail.content"
                class="marginRight20 edu-tinymce"></edu-tinymce>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import imgUrlList from "@/utils/imageurl";
import BorderContainer from "@/components/BorderContainer";
import LabList from "@/components/LabList";
import EduTinymce from "@/components/Edu-tinymce";
import IconText from "./components/IconText.vue";
import DetailTable from "./components/DetailTable.vue";
import RepDialog from "./components/RepDialog.vue";
import ToolsDetail from "../detail/components/ToolsDetail.vue";
import LabDetail from "../detail/components/LabDetail.vue";
import TaskList from "./components/TaskList.vue";
import TaskListDialog from "./components/TaskListDialog.vue";
import TaskContentDrawer from "./components/TaskContentDrawer.vue";
import StuLabForm from "./components/StuLabForm.vue";
import StuCard from "./components/StuCard.vue";
import CourseMngCom from "./components/CourseMngCom.vue";
import {
  unBind
} from "@/api/edu/labCenter";

import { oneDetail, deleteOpenClass } from "@/api/edu/openClass";

import { getStudentList } from "@/api/edu/assistance";
import { provide } from "vue";
export default {
  components: {
    LabList,
    BorderContainer,
    EduTinymce,
    IconText,
    DetailTable,
    RepDialog,
    ToolsDetail,
    LabDetail,
    TaskList,
    TaskListDialog,
    TaskContentDrawer,
    StuCard,
    StuLabForm,
    CourseMngCom
  },
  provide: {
    isOpenClass: true
  },
  data() {
    return {
      activeName: "third",
      imgUrlList: imgUrlList,
      trialDetail: {},
      trialId: "",
      percentage: 10,
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 },
      ],
      deleteLoading: false,
      reportDetail: {},
      dialogTableVisible: false,
      pub: false,
      height: "190",
      detailLoading: false,
      downLoading: false,
      taskDrawer: false,
      courseId: 0,
      //查询实验监控
      stuStatus: "",
      stuKeyword: "",
      newStudentList: [],
    };
  },
  computed: {
    ...mapGetters(["userRolesNames", "studentList", "userId"]),
  },
  watch: {

  },
  created() {
    this.trialId = this.$route.query.id;
    this.pub = this.$route.query.public || false;
  },
  destroyed() {
    this.trialDetail = {};
  },
  mounted() {
    if (this.trialId) {
      this.detailLoading = true;
      //实验关联课程Id
      oneDetail(this.trialId)
        .then((res) => {
          if (res && res.flag) {
            let trialDetail = res && res.resData;
            this.courseId = this.trialDetail && this.trialDetail.courseId;
            this.trialDetail = this.handleIPAndPdk(trialDetail);
            let taskList = this.$refs["course-mng-com"];
            taskList.queryChapterList();
            this.detailLoading = false;
          }
        })
        .finally(() => {
          this.detailLoading = false;
        });
    }
  },
  methods: {
    handleIPAndPdk(trialDetail) {
      let fileList = [];
      let labs = trialDetail.labList || [];
      let ipList = trialDetail.ipList || [];
      let pdkList = trialDetail.pdkList || [];
      if (
        (labs && labs.length > 0) ||
        (ipList && ipList.length > 0) ||
        (pdkList && pdkList.length > 0)
      ) {
        // 合并三个数组，确保每个都是数组类型
        fileList = [...labs, ...ipList, ...pdkList];
      }
      trialDetail.fileList = fileList;

      return trialDetail;
    },
    handleTabClick(tab, event) {
      let name = tab && tab.name;
      if (name == "third") {
        let taskList = this.$refs["course-mng-com"];
        taskList.queryChapterList();
      }
    },

    closeDrawer() {
      this.taskDrawer = false;
    },

    //课程下解绑
    removeLab() {
      this.deleteLoading = true;
      let str = '删除实验将删除实验的全部数据，请谨慎操作!'
      this.$confirm(str, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          unBind({ trialCourseId: this.trialDetail.trialCourseRelId })
            .then((res) => {
              if (res && res.flag) {
                this.$message.success("删除成功");
                this.$router.back();
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
    //删除
    async deleteLab() {
      //

      this.$confirm('确定删除吗？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteLoading = true;
          deleteOpenClass({ id: this.trialDetail.id })
            .then((res) => {
              if (res && res.flag) {
                this.$message.success("删除成功");
                this.$router.push({ path: "openClass" });
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
    gotoPage(index = 0, studentId = 0) {
      let trialItemList = this.$refs["task-list"].trialItemList;
      console.log(trialItemList);
      if (!(trialItemList && trialItemList.length > 0)) {
        return this.$message.warning("请添加实验任务");
      }
      let trialCourseRelId = this.trialId;
      let trialDetail = this.trialDetail;
      console.log(" =============== ", trialDetail);


      let courseId = trialDetail && trialDetail.courseId;
      let reportId = trialDetail && trialDetail.reportId;
      let trialItemId = trialDetail && trialDetail.trialId;
      let pub = this.pub;
      this.$router.push({
        path: "/lab/doLab",
        query: {
          trialCourseRelId,
          courseId,
          reportId,
          pub,
          trialItemId,
          index,
          studentId,
        },
      });
    },

    gotoPageDocker(index = 0) {
      let trialItemList = this.$refs["task-list"].trialItemList;
      console.log(trialItemList);
      if (!(trialItemList && trialItemList.length > 0)) {
        return this.$message.warning("请添加实验任务");
      }
      let trialCourseRelId = this.trialId;
      let trialDetail = this.trialDetail;
      let trialItemId = trialDetail && trialDetail.trialId;
      let pub = this.pub;
      this.$router.push({
        path: "/lab/doLabDocker",
        query: {
          trialCourseRelId,
          pub,
          trialItemId,
          index,
        },
      });
    },
    increase() {
      this.percentage += 10;
      if (this.percentage > 100) {
        this.percentage = 100;
      }
    },
    decrease() {
      this.percentage -= 10;
      if (this.percentage < 0) {
        this.percentage = 0;
      }
    },
    handleUpdate() {
      let id = this.trialDetail.id;
      this.$router.push({ path: "defineOpenClass", query: { id: id } });
    },
  },
};
</script>

<style lang="scss" scoped>
$common-color: #10abb9;

.lab-page {
  // border: 1px solid red;
  // width: 50%;
  // width: 900px;
  // padding: 20px;
  margin: 0 auto;
  // height: 700px;
  // max-height: 800px;
  overflow: auto;
  // border: 1px solid #d9d9d9;
  padding: 20px;
}

.edu-tinymce {
  ::v-deep {

    .tox,
    .tox-tinymce {
      width: 100% !important;
      height: calc(100vh - 350px) !important;
    }
  }
}

::v-deep {
  .el-tab-lab {
    #tab-zero.el-tabs__item {
      padding: 0 20px;
    }

    .el-tabs__item.is-active {
      background: $common-color;
      color: #fff;
      padding: 0 20px;
      border-radius: 4px;
    }

    .el-tabs__active-bar {
      background: $common-color;
      color: #fff;
    }

    .el-tabs__item:hover {
      color: $common-color;
    }

    .el-tabs__item.is-active:hover {
      color: #fff;
    }

    .el-tabs__nav-scroll {
      position: relative;
    }

    .el-tabs__nav {
      // position: absolute;
      left: 40%;
    }

    .el-tab-lab-container {
      border: 1px solid #d9d9d9;
      // min-height: 700px;
      // padding: 20px;
    }

    .student-container {
      // height: calc(100vh - 300px);
      overflow: auto;
      padding: 0 10px;

      .stu-lab-form {}

      .student-container-el-row {
        height: calc(100vh - 420px);
        overflow: auto;
      }
    }
  }
}

::v-deep {
  .content-slot-container {
    padding: 0 20px 10px !important;
  }
  .trialDetail-container {
    padding: 10px;

    &-image {

      .detail {
        padding: 4px;

        .detail-trailName {
          max-width: 300px;
        }

        .iconBg {
          .text {
            font-size: 14px;

            span {
              $btn-success-color: #67b87a;
              $btn-success-bg-color: #e4f9e9;
              padding: 2px;
              border-radius: 4px;
              background-color: #e4f9e9;
              color: $btn-success-color;
            }
          }
        }
      }

      .image {
        height: 70px;
        width: auto;

        .el-card {
          width: 200px;
          height: 70px;
          position: relative;

          border: none;
          box-shadow: none;
        }

        .el-card__body {
          width: 200px;
          height: 60px;

          img {
            height: 60px;
            width: 188px;
          }
        }
      }

      .lab-card-mark {
        // width: 120px;
        bottom: 20px;
        right: 20px;
        height: 30px;
        line-height: 30px;

        h2 {
          font-size: 14px;
        }
      }

      .lab-list {
        .show-info {
          font-size: 12px;
          // top: 10px;
          // left: 10px;
          height: auto;
          padding: 10px 12px;
          // width: 100%;
        }

        .info-type {
          text-indent: -5px;
        }

        .info-tools {
          padding: 0;
        }

        .lab-container {
          padding: 0px 4px !important;
          height: 22px;
          line-height: 20px;
          max-width: 80%;
          width: auto !important;
        }

        .el-popover__reference {
          height: 24px;
        }

        .lab-container {
          padding: 0;
        }
      }
    }
  }

  .el-progress-circle-edu {
    margin-right: 90px;

    .el-progress-circle {
      width: 110px !important;
      height: 110px !important;
    }

    .progress-text {
      position: absolute;
      bottom: 10px;
      font-size: 14px;
      font-weight: 700;
    }

    .val-container {
      position: absolute;
      // bottom: 10px;
      top: 50%;
      transform: translateY(-50%);
      background-color: #fff;
      padding: 4px 0;
      text-align: center;
      width: 68px;

      .val {
        font-size: 16px;
        font-weight: 700;
      }
    }
  }
}
</style>
