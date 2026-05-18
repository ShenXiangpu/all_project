<template>
  <div class="app-container">
    <border-container class="marginBottom10 border-container" :isShowTitle="false" :isBgShow="false">
      <template #content>
        <div class="trialDetail-container-image flex justify-between">
          <div class="flex flex-start">
            <lab-list :detailLoading="detailLoading" class="image lab-list" :isShowUpdate="false"
              :imgUrl="imgUrlList[trialDetail.coverImageStage]" :labName="trialDetail.coverImageName"
              :coverImageDisplayAuthor="trialDetail && trialDetail.coverImageDisplayAuthor
                " :createName="trialDetail && trialDetail.createByName" :item="trialDetail" :isShowName="false">
            </lab-list>
            <div class="detail flex flex-column justify-between">
              <div class="flex  align-center">
                <div class="flex flex-start align-center">
                  <el-popover placement="top-start" trigger="hover" :content="trialDetail.trialName">
                    <div slot="reference" class="detail-trailName view-text marginRight10 font18 fontW7">
                      {{ trialDetail.trialName }}
                    </div>
                  </el-popover>

                  <el-popover placement="top-start" trigger="hover" content="修改实验">
                    <i v-if="trialDetail.createBy == userId" @click.stop="handleUpdate" slot="reference"
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
                  <el-popover placement="top" trigger="hover" v-if="trialDetail && trialDetail.labList">
                    <div>
                      <lab-detail v-if="trialDetail && trialDetail.labList"
                        :labList="trialDetail && trialDetail.labList"></lab-detail>
                    </div>
                    <el-tag slot="reference" type="info" size="mini"
                      class="info-container marginRight10 primaryColor">文件信息</el-tag>
                  </el-popover>
                </div>
              </div>
              <div class="flex flex-start fontW7" style="color: rgb(153, 98, 98)">
                <icon-text :iconClass="`el-icon-s-custom`" class="marginRight20" :text="trialDetail.createByName" />
                <icon-text :iconClass="`el-icon-s-operation`" :text="trialDetail.recommendStandard"
                  class="marginRight20" />
                <icon-text :iconClass="`el-icon-view`" :text="trialDetail.ofPublic == 1 ? '公开' : '不公开'"
                  class="marginRight20 iconBg" />
                <icon-text v-if="!pub" :iconClass="`el-icon-s-opportunity`" :text="trialDetail.courseName || '未关联课程'" />
              </div>
              <div class="flex flex-start fontW7" style="color: rgb(153, 98, 98)">
                <icon-text v-if="userRolesNames != '老师' && !pub" :iconClass="`el-icon-s-check`" class="marginRight20"
                  :text="`${(trialDetail &&
                    trialDetail.userCountInfo &&
                    trialDetail.userCountInfo.oneCourseTotal) ||
                    0
                    }` + '人'
                    " />
                <icon-text :iconClass="`el-icon-setting`" :text="`${(trialDetail &&
                  trialDetail.userCountInfo &&
                  trialDetail.userCountInfo.oneTrialAllCourseFinish) ||
                  0
                  }` + '次'
                  " class="marginRight20" />

                <icon-text :iconClass="`el-icon-time`" :text="trialDetail.createAt" />
              </div>
            </div>
          </div>
          <div class="flex">
            <div v-if="userRolesNames != '学生' && !pub"
              class="el-progress-circle-edu marginRight20 flex flex-column align-center">
              <el-progress type="dashboard" :show-text="true" :stroke-width="20"
                :percentage="trialDetail.finishPer"></el-progress>
              <div class="progress-text">实验报告提交</div>
              <div class="val-container">
                <span class="val primaryColoro" v-if="trialDetail && trialDetail.userCountInfo">{{
                  Number(trialDetail.userCountInfo.oneCourseCorrect) +
                  Number(trialDetail.userCountInfo.oneCourseFinish)
                  }}</span>
                <span v-else class="val primaryColoro">0</span>
                /
                {{
                  (trialDetail &&
                    trialDetail.userCountInfo &&
                    trialDetail.userCountInfo.oneCourseTotal) ||
                  0
                }}
              </div>
            </div>
            <div v-if="userRolesNames != '学生' && !pub"
              class="el-progress-circle-edu marginRight20 flex flex-column align-center">
              <el-progress type="dashboard" :stroke-width="20" :percentage="trialDetail.correctPer"></el-progress>
              <div class="progress-text">实验批改数量</div>
              <div class="val-container">
                <span class="val primaryColoro">{{
                  (trialDetail &&
                    trialDetail.userCountInfo &&
                    trialDetail.userCountInfo.oneCourseCorrect) ||
                  0
                }}</span>
                /
                {{
                  (trialDetail &&
                    trialDetail.userCountInfo &&
                    trialDetail.userCountInfo.oneCourseTotal) ||
                  0
                }}
              </div>
            </div>
            <div class="flex flex-column justify-between">
              <div>
                <el-button v-if="!pub" @click="gotoPage(0)" icon="el-icon-monitor" type="success"
                  class="editSuccess">去做实验</el-button>

                <el-button v-if="pub" @click="gotoPageDocker(0)" icon="el-icon-monitor" type="success"
                  class="editSuccess">去做实验</el-button>
              </div>
              <div v-if="pub">
                <el-button v-if="userId == trialDetail.createBy || userRolesNames == '系统最高管理员'" @click="deleteLab" icon="el-icon-delete" type="danger"
                  class="editDanger" :loading="deleteLoading">删除实验</el-button>
              </div>
              <div v-else>
                <el-button v-if="userRolesNames != '学生'" @click="removeLab" icon="el-icon-delete" type="danger"
                  class="editDanger" :loading="deleteLoading">删除实验</el-button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </border-container>
    <div>
      <el-tabs class="el-tab-lab" v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="任务列表" name="third">
          <el-card>
            <template #header v-if="userRolesNames != '学生'">
              <el-button icon="el-icon-plus" type="primary" @click="addTaskList">添加任务</el-button>
            </template>
            <task-list ref="task-list" :pub="pub" :trialId="trialDetail.trialId" @editTask="editTask"
              @openDrawer="openDrawer" @doLab="doLab"></task-list>
          </el-card>
          <task-list-dialog @refreshList="refreshTaskList" :trialId="trialDetail.trialId"
            ref="task-list-dialog"></task-list-dialog>
          <task-content-drawer ref="task-content-drawer" @closeDrawer="closeDrawer"
            :drawer="taskDrawer"></task-content-drawer>
        </el-tab-pane>
        <el-tab-pane label="实验介绍" name="zero">
          <el-row :gutter="20">
            <el-col :span="12">
              <div>
                <h2 class="marginBottom20">实验描述</h2>
              </div>
              <div class="el-tab-lab-container" style="border: 0">
                <edu-tinymce :disabled="true" ref="edu-tinymce" :value="trialDetail.trialDescription"
                  class="marginRight20 edu-tinymce"></edu-tinymce>
              </div>
              <!-- {{ trialDetail.trialDescription }} -->
              <!-- </div> -->
            </el-col>
            <el-col :span="12">
              <div>
                <!-- v-if="trialVideoPath" -->
                <h2 class="marginBottom20">实验视频</h2>
                <div class="flex flex-column justify-center el-tab-lab-container padding20">
                  <video v-if="trialDetail && trialDetail.trialVideoPath" id="video" width="100%" height="100%"
                    controls>
                    <source :src="trialDetail && trialDetail.trialVideoPath" type="video/mp4" />
                    <source :src="trialDetail && trialDetail.trialVideoPath" type="video/ogg" />
                    <source :src="trialDetail && trialDetail.trialVideoPath" type="video/webm" />
                  </video>
                </div>
              </div>
            </el-col>
          </el-row>
          <div></div>
        </el-tab-pane>
        <el-tab-pane v-if="userRolesNames != '学生' && courseId && !pub" label="实验监控" name="first">
          <!-- <div class="v-html-width lab-page" style="">
                        <div class="v-html-width" v-html="trialDetail.manualContent"></div>
                    </div> -->

          <!-- <div class="lab-page flex justify-center">
                        <edu-tinymce :disabled="true" ref="edu-tinymce" :value='trialDetail.manualContent'
                            class="marginRight20"></edu-tinymce>
                        <div>
                            <el-button :loading="downLoading" type="primary" class="editPriamry"
                                @click="downLoadBook()">下载手册</el-button>
                        </div>

                    </div> -->
          <div class="student-container">
            <stu-lab-form class="stu-lab-form" @handleQueryStu="handleQueryStu" />
            <el-row v-if="newStudentList && newStudentList.length > 0" :gutter="10" class="student-container-el-row">
              <el-col class="marginBottom20" v-for="(item, index) in newStudentList" :key="index" :xs="4" :sm="4"
                :md="4" :lg="4" :xl="3">
                <stu-card @accept="accept" style="margin: 0 auto" :item="item"></stu-card>
              </el-col>
              <el-col></el-col>
            </el-row>
            <div v-else style="text-align: center" class="align-center font18 padding20 color9">
              暂无数据
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="!pub" label="实验报告" name="second">
          <detail-table ref="detail-table" @handleCorrention="handleCorrention" @queryTrialReport="queryTrialReport"
            :trialCourseId="Number(trialId)"></detail-table>
          <rep-dialog :tableHeight="height" @cancel="cancelRepDia" :dialogTableVisible="dialogTableVisible"
            :reportDetail="reportDetail"></rep-dialog>
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
import ToolsDetail from "../labDetail/components/ToolsDetail.vue";
import LabDetail from "../labDetail/components/LabDetail.vue";
import TaskList from "./components/TaskList.vue";
import TaskListDialog from "./components/TaskListDialog.vue";
import TaskContentDrawer from "./components/TaskContentDrawer.vue";
import StuLabForm from "./components/StuLabForm.vue";
import StuCard from "./components/StuCard.vue";
import {
  oneDetail,
  deleteOneRel,
  getTrialReportById,
  oneTrialTempInfo,
  manualPDF,
  createContainerByExp,
  getRelTrialCourseList,
  unBind
} from "@/api/edu/labCenter";

import { getStudentList } from "@/api/edu/assistance";
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
    studentList: function (newVal, oldVal) {
      if (newVal.length > 0) {
        this.newStudentList = this.queryStudentList(
          newVal,
          this.stuStatus,
          this.stuKeyword
        );
      }
    },
  },
  created() {
    this.trialId = this.$route.query.id;
    this.pub = this.$route.query.public;
  },
  destroyed() {
    this.trialDetail = {};
  },
  mounted() {
    if (this.trialId) {
      if (this.pub) {
        this.detailLoading = true;
        //实验Id
        oneTrialTempInfo(this.trialId)
          .then((res) => {
            if (res && res.flag) {
              let trialDetail = res && res.resData;

              this.trialDetail = this.getNewTrialDetail(trialDetail);
              this.courseId = this.trialDetail && this.trialDetail.courseId;
              this.trialDetail = this.handleIPAndPdk(this.trialDetail);
              let video = document.querySelector("video");
              if (video) {
                video.load();
              }
              this.detailLoading = false;
            }
          })
          .finally(() => {
            this.detailLoading = false;
          });
      } else {
        this.detailLoading = true;
        //实验关联课程Id
        oneDetail(this.trialId)
          .then((res) => {
            if (res && res.flag) {
              let trialDetail = res && res.resData;

              this.trialDetail = this.getNewTrialDetail(trialDetail);
              this.courseId = this.trialDetail && this.trialDetail.courseId;
              getStudentList({ courseId: this.courseId });
              this.trialDetail = this.handleIPAndPdk(this.trialDetail);
              let video = document.querySelector("video");
              if (video) {
                video.load();
              }
              this.detailLoading = false;
            }
          })
          .finally(() => {
            this.detailLoading = false;
          });
      }
    }
  },
  methods: {
    doLab(index) {
      this.pub ? this.gotoPageDocker(index) : this.gotoPage(index);
    },
    goToLab() {
      let id = this.trialDetail.trialId;
      let edaTools = this.trialDetail.tools;
      let eduLibs = this.trialDetail.labList || [];
      let ipsInfoList = this.trialDetail.ipList || [];
      let pdksInfoList = this.trialDetail.pdkList || [];

      let item = {
        id,
        edaTools,
        eduLibs,
        ipsInfoList,
        pdksInfoList,
      };
      createContainerByExp(item).then((res) => {
        if (res && res.flag) {
          this.$confirm("实操云密码为 zkxy@123", "立即跳转？", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              let isLicenseEnabled = this.$store.state.user.isLicenseEnabled;
              if (!isLicenseEnabled) {
                this.$message.warning(
                  "抱歉，系统已过期，需联系官方工作人员续费"
                );
                return;
              }
              window.open(res.resData, "_blank");
            })
            .catch(() => { });
        }
      });
    },
    handleIPAndPdk(trialDetail) {
      let labList = trialDetail.labList;
      let ipList = trialDetail.ipList;
      let pdkList = trialDetail.pdkList;
      if ((ipList && ipList.length > 0) || (pdkList && pdkList.length > 0)) {
        labList = labList.concat(ipList).concat(pdkList);
        trialDetail.labList = labList;
      }
      return trialDetail;
    },
    queryStudentList(list, status, keyword) {
      return (
        list &&
        list.filter((item) => {
          console.log(item);
          let name =
            item && `${item.userName}${item.className}${item.studentNum}`;
          if (status && keyword && name) {
            return item.status == status && name && name.indexOf(keyword) > -1;
          } else if (status) {
            return item.status == status;
          } else if (keyword && name) {
            return name.indexOf(keyword) > -1;
          }
          return item;
        })
      );
    },
    handleQueryStu(param) {
      const status = param && param.status;
      const keyword = param && param.keyword;
      this.stuStatus = status;
      this.stuKeyword = keyword;
      let studentList = this.studentList;
      this.newStudentList = this.queryStudentList(
        studentList,
        this.stuStatus,
        this.stuKeyword
      );
      // this.newStudentList = stuList
      // console.log(stuList);
    },
    accept(studentId) {
      this.gotoPage(0, studentId);
    },
    handleTabClick(tab, event) {
      let name = tab && tab.name;
      if (name === "first") {
        if (this.courseId) {
          this.$store.dispatch("ws/connectWSAndGetAssisance", {});
          getStudentList({ courseId: this.courseId });
        }
      } else if (name == "third") {
        let taskList = this.$refs["task-list"];
        taskList.getList();
      } else if (name == "second") {
        let table = this.$refs["detail-table"];
        table.handleQuery();
        table.queryClassesForSearch();
      }
    },
    refreshTaskList() {
      let taskList = this.$refs["task-list"];
      taskList.getList();
    },
    editTask(row) {
      let taskListDialog = this.$refs["task-list-dialog"];
      taskListDialog.dialogVisible = {
        visible: true,
        status: "update",
      };
      taskListDialog.ruleForm = {
        trialItemName: row.trialItemName,
        manualTitle: row.manualTitle,
        manualContent: row.manualContent,
      };
      taskListDialog.trialItemId = row.id;
    },
    closeDrawer() {
      this.taskDrawer = false;
    },
    openDrawer(row) {
      let taskContentDrawer = this.$refs["task-content-drawer"];
      taskContentDrawer.manualTitle = row.manualTitle;
      taskContentDrawer.manualContent = row.manualContent;

      console.log(taskContentDrawer);
      this.taskDrawer = true;
    },
    addTaskList() {
      console.log(this.$refs["task-list-dialog"]);
      this.$refs["task-list-dialog"].dialogVisible = {
        visible: true,
        status: "create",
      };
    },

    getNewTrialDetail(trialDetail) {
      let userCountInfo = trialDetail && trialDetail.userCountInfo;
      let oneCourseCorrect = userCountInfo && userCountInfo.oneCourseCorrect;
      let oneCourseFinish = userCountInfo && userCountInfo.oneCourseFinish;
      let oneCourseTotal = userCountInfo && userCountInfo.oneCourseTotal;
      let finishPer = Math.floor(
        ((oneCourseCorrect - 0 + oneCourseFinish) / oneCourseTotal) * 100
      );
      let correctPer = Math.floor((oneCourseCorrect / oneCourseTotal) * 100);
      trialDetail.correctPer = correctPer;
      trialDetail.finishPer = finishPer;
      return trialDetail;
    },
    downLoadBook() {
      let pub = this.pub;
      if (pub) {
        let trialId = this.trialId;
        this.downLoadPDF({ trialId });
      } else {
        let trialCourseId = this.trialId;
        this.downLoadPDF({ trialCourseId });
      }
    },
    downLoadPDF(data) {
      this.downLoading = true;
      manualPDF(data).then((res) => {
        let type = "application/pdf;charset=utf-8";
        const blob = new Blob([res.data], {
          type,
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
        this.downLoading = false;
      });
    },
    handleCorrention(obj) {
      let objs = JSON.stringify(obj);
      objs = encodeURI(objs);
      this.$router.push({
        path: "/lab/correctionExperiment",
        query: { obj: objs },
      });
    },
    cancelRepDia() {
      this.dialogTableVisible = false;
    },
    queryTrialReport(id) {
      getTrialReportById({ id }).then((res) => {
        if (res && res.flag) {
          this.reportDetail = res.resData;
          this.dialogTableVisible = true;
        }
      });
    },
    open() { },

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
      const res = await getRelTrialCourseList({
        trialId: this.trialDetail.trialId, trialCourseId: this.trialDetail.trialCourseRelId
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
            deleteOneRel({ id: this.trialDetail.trialId })
              .then((res) => {
                if (res && res.flag) {
                  this.$message.success("删除成功");
                  this.$router.push({ path: "/lab/lab" });
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
      }

    },
    gotoPage(index = 0, studentId = 0) {
      let trialItemList = this.$refs["task-list"].trialItemList;
      console.log(trialItemList);
      if (!(trialItemList && trialItemList.length > 0)) {
        return this.$message.warning("请添加实验任务");
      }
      let trialCourseRelId = this.trialId;
      let trialDetail = this.trialDetail;
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
      let id = this.pub ? this.trialDetail.trialId : this.trialDetail.trialCourseRelId;
      let courseName = this.trialDetail.courseName;
      this.$router.push({ path: "/lab/operationLab", query: { id: id, pub: this.pub, courseName } });
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
      min-height: 700px;
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
  .trialDetail-container {
    border: 1px solid #ddd;
    padding: 20px;

    &-image {
      margin-top: 10px;

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
        height: auto;
        width: auto;

        .el-card {
          width: 200px;
          height: 112px;
          position: relative;

          border: none;
          box-shadow: none;
        }

        .el-card__body {
          width: 200px;
          height: 112px;

          img {
            height: 100px;
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
