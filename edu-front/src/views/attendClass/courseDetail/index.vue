<template>
  <div class="app-container">
    <border-container
      class="marginBottom10 border-container"
      :title="courseObj.name"
      :height="15"
      :isBgShow="false"
    >
      <template #content>
        <div class="font16 flex justify-between" style="padding: 0 10px">
          <div class="flex marginTop10" style="padding-left: 2px">
            <div class="marginRt20 title-decration2">
              课程ID：{{ courseObj.courseNum || "-" }}
            </div>
            <div class="marginRt20 title-decration2">
              学年：{{ courseObj.academicYear || "-" }}
            </div>
            <div class="marginRt20 title-decration2">
              课程人数：{{ courseObj.studentNum || 0 }}人
            </div>
            <div class="marginRt20 title-decration2">
              创建时间：{{ courseObj.createAt }}
            </div>
          </div>
        </div>
      </template>
    </border-container>

    <el-tabs v-model="activeName" class="el-tab-edu" @tab-click="handleClick">
      <el-tab-pane label="实操设计云" name="third">
        <lab-cloud-list :courseId="courseId"></lab-cloud-list>
      </el-tab-pane>
      <el-tab-pane label="课程学习" name="fourth">
        <course-mng-com
          ref="course-mng-com"
          :isStudent="true"
          :courseId="courseId"
        ></course-mng-com>
      </el-tab-pane>
      <el-tab-pane label="作业数据" name="first">
        <div v-if="activeName == 'first'">
          <border-container
            class="marginBottom10 border-container"
            :height="15"
            :isShowTitle="false"
            :isBgShow="false"
          >
            <template #content>
              <div class="" style="padding: 10px 0 0px 10px">
                <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                  <el-form-item label="作业名称" prop="homeworkName">
                    <el-input
                      v-model="queryParams.homeworkName"
                      placeholder="请输入作业名称"
                      @keyup.enter="handleHomeWorkListQuery"
                    />
                  </el-form-item>
                  <!-- <el-form-item label="评价" prop="score">
                                        <el-select style="width: 100%" v-model="queryParams.score"
                                            @change="handleHomeWorkListQuery" placeholder="请选择评价">
                                            <el-option label="全部" value=""></el-option>
                                            <el-option v-for="item in scoreLevelList" :key="item.dictionaryName"
                                                :label="item.dictionaryName" :value="item.dictionaryName"></el-option>
                                        </el-select>
                                    </el-form-item> -->
                  <el-form-item label="作业状态" prop="status">
                    <el-select
                      style="width: 100%"
                      v-model="queryParams.status"
                      @change="handleHomeWorkListQuery"
                      placeholder="请选择作业状态"
                    >
                      <el-option label="全部" value=""></el-option>
                      <el-option label="未提交" value="0"></el-option>
                      <el-option label="待批改" value="1"></el-option>
                      <el-option label="已完成" value="2"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item>
                    <el-button
                      type="success"
                      class="editSuccess"
                      icon="el-icon-search"
                      @click="handleHomeWorkListQuery"
                      >搜索</el-button
                    >
                  </el-form-item>

                  <el-form-item>
                    <el-button
                      type="primary"
                      class="editPrimary"
                      icon="el-icon-refresh"
                      @click="handleResetHomeWorkListQuery('queryFormRef')"
                      >重置</el-button
                    >
                  </el-form-item>
                </el-form>
              </div>
            </template>
          </border-container>
          <el-card class="marginTop10">
            <el-table :data="homeworksList" style="width: 100%" row-key="id">
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="55"
              >
              </el-table-column>
              <el-table-column
                prop="homeworkName"
                label="作业名称"
                align="center"
                width="200"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="title"
                label="试卷名称"
                align="center"
                width="280"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="endTime"
                label="截止日期"
                align="center"
                width="180"
              ></el-table-column>

              <el-table-column
                prop="completionStatus"
                label="作业状态"
                align="center"
                width="160"
              >
                <template #default="scope">
                  <el-tag type="danger" v-if="scope.row.completionStatus == 0"
                    >未提交</el-tag
                  >
                  <el-tag
                    type="warning"
                    v-else-if="scope.row.completionStatus == 1"
                    >待批改</el-tag
                  >
                  <el-tag type="success" v-else>已完成</el-tag>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="submitTime" label="提交时间" align="center" width="180">
                            </el-table-column> -->
              <el-table-column
                sortable
                prop="score"
                label="评分"
                align="center"
                width="120"
              >
                <template #default="scope">
                  <span v-if="scope.row.score == null">- - -</span>
                  <span v-else>{{ scope.row.score }}</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="suggestion"
                label="批改建议"
                align="center"
              ></el-table-column>

              <el-table-column label="操作" align="center" fixed="right">
                <template #default="scope">
                  <el-button
                    v-if="scope.row.completionStatus == 0"
                    type="success"
                    class="editSuccess"
                    size="small"
                    @click="gotoPage('courseDetail/doHomeWork', scope.row)"
                    >进行作答</el-button
                  >
                  <el-button
                    v-if="scope.row.completionStatus == 1"
                    type="primary"
                    size="small"
                    :disabled="true"
                    >待批改</el-button
                  >
                  <el-button
                    v-if="scope.row.completionStatus == 2"
                    type="success"
                    class="editSuccess"
                    size="small"
                    @click="openHomework(scope.row)"
                    >批改详情</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <!-- 作废 -->
            <!-- <el-dialog :title="fileDialog.title" :visible.sync="fileDialog.visible" @close="cancelfileDialog"
                            class="dialog" width="50vw">
                            <el-card>
                                <file-List :filesList="filesList" @load="load"
                                    @handleSelectionChange="handleSelectionChange" :height="400">
                                    <template slot="table-column">
                                        <el-table-column prop="fileName" label="文件名" min-width="180">
                                            <template #default="scope">
                                                <i :class="scope.row.dir ? 'el-icon-folder' : 'el-icon-document'"></i>
                                                &nbsp;{{
                                                    scope.row.fileName
                                                }}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="大小" align="center" prop="size"></el-table-column>
                                        <el-table-column label="修改时间" align="center"
                                            prop="lastModifyTime"></el-table-column>
                                    </template>
                                </file-List>
                            </el-card>
                        </el-dialog> -->

            <el-dialog
              :title="fileDialog.title"
              :visible.sync="fileDialog.visible"
              @close="cancelfileDialog"
              class="dialog"
              width="50vw"
            >
              <div class="flex justify-center marginBottom20">
                <div class="title font20 fontW7">{{ questionForm.title }}</div>
              </div>

              <div class="scoreTotal">
                <span class="font20 fontW7">{{ scoreTotal }}</span> 分
              </div>
              <div class="dialog-paper-container">
                <el-form ref="fileForm" :model="questionForm">
                  <paper-container
                    :isWatch="false"
                    :questionForm="questionForm"
                  ></paper-container>
                </el-form>
              </div>
            </el-dialog>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="实验列表" name="fifth">
        <course-lab ref="course-lab" :courseId="courseId"></course-lab>
      </el-tab-pane>
      <el-tab-pane label="课程资料" name="second">
        <div v-if="activeName == 'second'">
          <el-card>
            <el-table :data="labsList" style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="55"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="displayName"
                label="文件名称"
                min-width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="remark"
                label="描述"
                min-width="180"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="createAt"
                label="创建时间"
                align="center"
                min-width="180"
              >
              </el-table-column>
              <!-- <el-table-column prop="remark" label="备注" align="center" min-width="180">
                        </el-table-column> -->
              <el-table-column
                label="操作"
                align="center"
                min-width="180"
                fixed="right"
              >
                <template #default="scope">
                  <el-button
                    size="small"
                    type="success"
                    class="editSuccess"
                    slot="reference"
                    @click.stop="handleOpen(scope.row)"
                  >
                    查看
                  </el-button>
                  <el-divider direction="vertical"></el-divider>

                  <el-button
                    size="small"
                    type="primary"
                    class="editPrimary"
                    slot="reference"
                    @click.stop="handleDownload(scope.row)"
                  >
                    下载
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-dialog
            :title="dialogSourse.title"
            :visible.sync="dialogSourse.visible"
            @close="cancelSourse"
          >
            <iframe
              :src="pdfUrl"
              frameborder="0"
              style="z-index: 1000; height: 560px; width: 100%"
            ></iframe>
          </el-dialog>
        </div>
      </el-tab-pane>
      <el-tab-pane label="讨论区" name="six">
        <div v-if="activeName == 'six'">
          <reply :courseId="courseId" />
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      :title="textMap[dialog.status]"
      :visible.sync="dialog.visible"
      @close="cancel"
      class="dialog"
      width="500px"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="作业名称" prop="homeworkName">
          <el-input
            v-model="form.homeworkName"
            placeholder="请输入作业名称"
            style="width: 300px"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';
import BorderContainer from "@/components/BorderContainer";
import Pagination from "@/components/Pagination";
import FileList from "@/components/FileList";
import Reply from "../../classMng/courseMng/courseDetail/components/Reply"
import CourseLab from "@/views/classMng/courseMng/courseDetail/components/CourseLab";
import {
  getHomeworkByCourseId,
  listFile,
  getHomeworkContent,
} from "@/api/edu/job";
import { getHomeworkPathByid } from "@/api/edu/question";
import { getCourseDetailById, getScoreLevel } from "@/api/edu/course";
import { getClassNameForHomeWork } from "@/api/edu/courseDetail";

import {
  uploadRourse,
  getOenList,
  deleteLabById,
} from "@/api/edu/courseRourse";
import { Message } from "element-ui";
import PaperContainer from "../../classMng/courseMng/courseDetail/correctionHomeWork/components/Paper-Container";
import CourseMngCom from "@/views/classMng/courseMng/courseDetail/components/CourseMngCom.vue";
import LabCloudList from "./components/LabCloudList.vue";
export default {
  //import 引入的组件需要注入到对象中才能使用
  name: "courseMng",
  components: {
    Pagination,
    FileList,
    BorderContainer,
    PaperContainer,
    CourseMngCom,
    LabCloudList,
    CourseLab,
    Reply
  },
  props: {},
  data() {
    return {
      total: 0,
      queryEnvParams: {
        vmName: "",
      },
      courseId: "",
      queryParams: {
        homeworkName: "",
        score: "",
        status: "",
      },
      pdfUrl: "",

      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "",
        create: "创建",
      },
      loading: false,
      form: {
        homeworkName: "",
      },
      rules: {
        homeworkName: [
          {
            required: true,
            message: "请输入作业名称",
            trigger: "blur",
          },
        ],
      },
      activeName: "",

      isActive: 0,
      courseId: 0, //课程id
      vmExist: false, //是否存在
      courseObj: {},

      homeNameList: [],
      homeworksList: [],

      className: "",

      labsList: [],
      scoreLevelList: [],
      classNameList: [],

      dialogSourse: {
        visible: false,
        title: "",
      },
      filesList: [],
      fileDialog: {
        title: "",
        visible: false,
      },
      vmId: "",
      questionForm: {},
      scoreTotal: 0,
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["userRolesNames"]),
  },
  created() {
    this.courseId = this.$route.query.id;
    this.vmExist = this.$route.query.vmExist;
    this.queryCourseDetailById(this.courseId);
    this.queryHomeworkList();
    this.queryScoreLevel();
  },
  mounted() {
    this.vmExist = this.$route.query.vmExist;
    this.activeName = "third";
  },
  methods: {
    gotoPage(path, row) {
      let courseName = this.courseObj.name;
      let title = row.title;
      let endTime = row.endTime;
      let startTime = row.startTime;
      let userName = row.userName;
      let obj = {
        courseId: this.courseId,
        homeworkId: row.homeworkId,
        paperId: row.paperId,
        courseName,
        title,
        userName,
        endTime,
        startTime,
      };
      obj = JSON.stringify(obj);
      obj = encodeURI(obj);
      this.$router.push({ path, query: { obj } });
    },
    //
    handleDownload(row) {
      console.log(row);
      fetch(row.filePath)
        .then((res) => res.blob())
        .then((blob) => {
          // 将链接地址字符内容转变成blob地址
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          console.log(a.href);
          a.download = row.displayName; // 下载文件的名字
          document.body.appendChild(a);
          a.click();
        });
    },

    //打开
    handleOpen(row) {
      this.dialogSourse.visible = true;
      this.pdfUrl = row.filePath;
    },
    cancelSourse() {
      this.dialogSourse.visible = false;
      this.pdfUrl = "";
    },
    //获取班级
    async queryClassNameForHomeWork() {
      const res = await getClassNameForHomeWork();
      this.classNameList = res.resData;
    },
    //获取等级
    async queryScoreLevel() {
      const res = await getScoreLevel();
      this.scoreLevelList = res.resData;
    },

    async handleDelete(row) {
      const { id } = { ...row };
      const res = await deleteLabById({ id });
      if (res && res.flag) {
        Message.success("删除成功");
        this.handleQuery({});
      }
    },
    //

    doUpload(item) {
      console.log("item", item.file);
      let FormDatas = new FormData();
      FormDatas.append("file", item.file);
      FormDatas.append("courseId", this.courseId);
      console.log("FormDatas", FormDatas);
      uploadRourse(FormDatas).then((res) => {
        let resData = res.resData;
        if (res.flag && resData) {
          this.queryOenList();
        } else {
          this.$message.error("上传图片出错");
        }
      });
    },
    queryOenList() {
      this.loading = true;

      getOenList({ courseId: this.courseId }).then((reponse) => {
        let resData = reponse.resData;
        this.labsList = resData;
        // this.total = resData.total;
        this.loading = false;
      });
    },

    handleHomeWorkListQuery() {
      this.queryHomeworkList();
    },

    handleResetHomeWorkListQuery(formName) {
      this.$refs[formName].resetFields();
      this.queryHomeworkList();
    },

    async queryHomeworkList() {
      let courseId = this.courseId;
      getHomeworkByCourseId({ courseId, ...this.queryParams }).then((res) => {
        this.homeworksList = res && res.resData;
      });
    },

    handleClick(tab, event) {
      let activeName = tab.name;
      if (activeName === "first") {
        this.queryScoreLevel();
        this.queryClassNameForHomeWork();
      } else if (activeName === "second") {
        this.queryOenList();
      } else if (activeName === "fourth") {
        this.$refs["course-mng-com"].queryChapterList();
      } else if (activeName === "fifth") {
        let courseLab = this.$refs["course-lab"];
        courseLab.queryCourses();
        courseLab.handleQuery();
        courseLab.queryCreateBy();
      }
    },
    //
    goToDetail() {
      let courseId = this.courseId;
      this.$router.push({
        path: "/classMng/createEnvironment",
        query: {
          courseId,
        },
      });
    },

    //查询课程信息
    async queryCourseDetailById(id) {
      const res = await getCourseDetailById({ id });
      if (res && res.flag) {
        this.courseObj = res.resData;
      }
    },
    initParams() {
      let listQuery = {
        page: 1,
        limit: 10,
        params: {},
      };
      this.listQuery = listQuery;
    },
    searchQuery(e) {},

    submitForm(text) {
      this.$refs[text].validate((valid) => {
        this.form.courseId = this.courseId;
        if (valid) {
          if (this.dialog.status == "update") {
          } else if (this.dialog.status == "create") {
            addHomework(this.form).then((reponse) => {
              if (reponse && reponse.flag) {
                this.dialog.visible = false;
                this.$message.success("添加成功");
                this.queryHomeWorkList(this.courseId);
              }
            });
          }
        }
      });
    },
    cancel() {
      let _this = this;
      let dialog = {
        visible: false,
      };
      _this.dialog = dialog;

      _this.$refs.alarmRuleForm.resetFields();
    },

    //重置搜索条件
    resetQuery(formName) {
      this.$refs[formName].resetFields();
    },
    openHomework(row) {
      console.log(row);
      let dialog = {
        title: "批改详情",
        visible: true,
      };
      let paperId = row.paperId;
      let id = row.homeworkMarkId;
      this.quertHomeworkPathByid({ id, paperId });

      this.fileDialog = dialog;
    },

    quertHomeworkPathByid(data) {
      getHomeworkPathByid(data).then((res) => {
        if (res && res.flag) {
          let resData = res.resData;
          this.questionForm = resData;
          this.scoreTotal = this.queryScore();
        } else {
          this.questionForm = {};
          this.scoreTotal = "";
        }
      });
    },
    //计分问题 //需要表里数组的参数值
    queryScore() {
      let scoreTotal = 0;
      for (let i = 0; i < this.questionForm.paperItemList.length; i++) {
        if (this.questionForm.paperItemList[i].getScore) {
          scoreTotal += Number(this.questionForm.paperItemList[i].getScore);
        }
      }
      return scoreTotal;
    },
    handleSelectionChange() {},
    cancelfileDialog() {
      let _this = this;
      let dialog = {
        visible: false,
      };
      _this.fileDialog = dialog;
    },
    async load(tree, treeNode, resolve) {
      console.log(tree);
      const res = await listFile({ id: tree.vmId, path: tree.id });
      let filesList = res && res.resData;
      filesList = this.handleFilesList2(filesList);
      resolve(filesList);
    },
    handleFilesList1(filesList) {
      filesList &&
        filesList.length > 0 &&
        filesList.map((i) => {
          const {
            editTime,
            fileName,
            filePath,
            fileSize,
            homeworkMarkId,
            isDir,
            userId,
            vmId,
          } = i;
          if (isDir) {
            // i.children = [],
            i.hasChildren = true;
          }
          i.dir = isDir;
          i.currentDir = filePath.substring(0, filePath.lastIndexOf("/"));
          i.lastModifyTime = editTime;
          i.size = fileSize;
          i.id = i.filePath;
          this.vmId = vmId;
        });
      return filesList;
    },
    handleFilesList2(filesList) {
      filesList &&
        filesList.length > 0 &&
        filesList.map((i) => {
          let dir = i.dir;
          if (dir) {
            // i.children = [],
            i.hasChildren = true;
          }
          i.vmId = this.vmId;
          i.id = i.currentDir + "/" + i.fileName;
        });
      return filesList;
    },
    handleDeleteFile() {},
  },
};
</script>
<style lang="scss" scoped>
$common-color: #10abb9;

::v-deep {
  .el-tab-edu {
    margin-top: 30px;

    #tab-zero.el-tabs__item {
      padding: 0 20px;
    }
    #tab-third.el-tabs__item {
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
  }
}

.choose-container {
  margin: 0 10px;

  .choose-item {
    // width: 50px;
    text-align: center;
    border: 1px solid #ccc;
    border-right: 0;

    &-container {
      min-width: 80px;
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
    }
  }

  .choose-item:hover {
    cursor: pointer;
  }

  .is-active {
    background-color: rgb(64, 158, 255);
    min-width: 120px;

    color: #fff;

    .choose-item-container {
      min-width: 120px;
      text-align: center;
    }
  }
}

.choose-item:last-child {
  border-radius: 0 4px 4px 0;
  border-right: 1px solid #ccc;
}

.choose-item:first-child {
  border-radius: 4px 0px 0px 4px;
}

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

.el-form-item {
  margin-bottom: 0px;
}

.marginTop10 {
  ::v-deep {
    .is-active {
      width: 100px;
    }

    .el-radio-button__inner {
      width: 100%;
    }
  }
}

.dialog {
  ::v-deep {
    .el-dialog {
      max-height: 90vh;
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

  .scoreTotal {
    position: absolute;
    right: 80px;
    top: 60px;
    color: red;
  }

  .dialog-paper-container {
    height: calc(80vh - 120px);
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

::v-deep {
  .el-carousel__container {
    height: 50px;
  }
}

.i-hover:hover {
  cursor: pointer;
}
</style>
