<template>
  <el-card class="el-card-eda">
    <div slot="header" class="clearfix">
      <span
        >{{ userRolesNames == "老师" ? "快捷操作" : "资源告警" }}
        <i
          v-if="userRolesNames != '老师'"
          class="el-icon-message-solid primaryColorr"
        ></i
      ></span>
      <div
        @click="goToPageParam('/alarmMng', { type: 'AlarmList' })"
        v-if="userRolesNames != '老师'"
        style="float: right; padding: 3px 0"
        class="primaryColorb pointer"
        type="text"
      >
        查看更多 <i class="el-icon-d-arrow-right"></i>
      </div>
    </div>
    <el-row v-if="userRolesNames == '老师'" :gutter="10" style="height: 208px">
      <el-col :xs="8" :sm="6" :md="4" :lg="12" :xl="12" class="marginTop20">
        <div
          class="flex flex-column align-center pointer"
          @click="goToPage('/cloudEnvironment')"
        >
          <div class="qaItemContainer primaryBgColorb primaryColorw">
            实操云环境
          </div>
        </div>
      </el-col>

      <el-col :xs="8" :sm="6" :md="4" :lg="12" :xl="12" class="marginTop20">
        <div
          class="flex flex-column align-center pointer"
          @click="handleAdd(isLicenseEnabled)"
        >
          <div class="qaItemContainer primaryBgColoro primaryColorw">
            创建课程
          </div>
        </div>
      </el-col>

      <el-col :xs="8" :sm="6" :md="4" :lg="12" :xl="12" class="marginTop20">
        <div
          class="flex flex-column align-center pointer"
          @click="handleAddHomeWork()"
        >
          <div class="qaItemContainer primaryBgColory primaryColorw">
            创建作业
          </div>
        </div>
      </el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="12" :xl="12" class="marginTop20">
        <div
          class="flex flex-column align-center pointer"
          @click="
            goToPageParam('classMng/questionBankMng', { from: 'dashboard' })
          "
        >
          <div class="qaItemContainer primaryBgColorp primaryColorw">
            创建试题
          </div>
        </div>
      </el-col>
    </el-row>
    <resource-alarm v-else></resource-alarm>

    <el-dialog
      :title="textMap[dialog.status]"
      :visible.sync="dialog.visible"
      @close="cancel"
      class="dialog"
    >
      <create-course-dialog
        ref="forms"
        :addOrNot="addOrNot"
        :itemList2="itemList2"
        :tableLoading="tableLoading"
        @toggleSelection="toggleSelection"
        @addChooseUsers="addChooseUsers"
        @addOneUser="addOneUser"
        @queryChooseList="queryChooseList"
        :classesList="classesList"
        :lookStatus="lookStatus"
        :schoolYears="schoolYears"
        :gradeList="gradeList"
        :defaultSchoolYear="defaultSchoolYear"
        @queryUserListBySome="queryUserListBySome"
        @handleUserList="handleUserList"
        :tableData="tableData"
        @submitForm="submitForm"
        @cancel="cancel"
      ></create-course-dialog>
    </el-dialog>

    <el-dialog
      title="添加作业"
      :visible.sync="homeworksVisible"
      @close="cancelHomeWorksDialog"
      class="dialog-jobs"
      width="80vw"
    >
      <el-form
        ref="homeworkForm"
        :model="homeworkForm"
        :rules="homeworkRules"
        label-width="80px"
      >
        <el-form-item label="作业类型" prop="type">
          <el-radio-group v-model="homeworkForm.type">
            <el-radio :label="0">普通作业</el-radio>
            <el-radio :label="1">考试作业</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="作业名称" prop="homeworkName">
          <el-input
            class="el-form-input-edu"
            v-model="homeworkForm.homeworkName"
            placeholder="请输入作业名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="关联课程" prop="courseId">
          <el-select class="el-form-input-edu" v-model="homeworkForm.courseId">
            <el-option
              v-for="item in courseList1"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作业时间" prop="time">
          <el-date-picker
            class="el-form-input-edu"
            v-model="homeworkForm.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="选择试卷" prop="paperId">
          <div class="form-container marginBottom20">
            <el-form
              :inline="true"
              :model="searchForm"
              ref="searchForm"
              class="demo-form-inline"
            >
              <el-form-item label="试题名称" prop="title" class="marginRight20">
                <el-input
                  clearable
                  placeholder="请输入试题名称"
                  v-model="searchForm.title"
                  class=""
                  style="width: 200px"
                >
                  <!-- <el-button slot="append" icon="el-icon-search" @click="handleQueryList"></el-button> -->
                </el-input>
              </el-form-item>
              <el-form-item
                label="公开范围"
                prop="ofPublic"
                class="marginRight20"
              >
                <el-select
                  v-model="searchForm.ofPublic"
                  placeholder="请选择试题公开范围"
                >
                  <el-option label="全部" value=""></el-option>
                  <el-option label="仅自己" value="1"></el-option>
                  <el-option label="所有老师" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="success"
                  class="editSuccess"
                  icon="el-icon-search"
                  @click="onSubmit('searchForm')"
                  >搜索</el-button
                >
                <el-button
                  type="primary"
                  class="editPrimary"
                  icon="el-icon-refresh"
                  @click="onCancel('searchForm')"
                  >重置</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <div>
            <el-table
              ref="multipleTable"
              height="30vh"
              :data="testPaperList"
              :loading="loading"
              border
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionHomeworkChange"
            >
              <el-table-column label="选择" width="55" align="center">
                <template slot-scope="scope">
                  <el-radio
                    v-model="tableRadio"
                    :label="scope.row.id"
                    @change="getTableItem"
                    >{{ "" }}</el-radio
                  >
                </template>
              </el-table-column>

              <el-table-column
                prop="title"
                label="试题名称"
                min-width="180"
                align="center"
              >
                <template #default="scope">
                  <span
                    class="pointer primaryColor"
                    @click="queryTestPaperById(scope.row.id)"
                    >{{ scope.row.title }}</span
                  >
                </template>
              </el-table-column>

              <el-table-column label="公开范围" min-width="60" align="center">
                <template #default="scope">
                  <span v-if="scope.row.ofPublic == 1" class="primaryColorg"
                    >仅自己</span
                  >
                  <span v-if="scope.row.ofPublic == 2" class="primaryColory"
                    >所有老师</span
                  >
                  <!-- <span v-if="scope.row.ofPublic == 3" class="primaryColoro">全部用户</span> -->
                </template>
              </el-table-column>
              <el-table-column label="试题分值" align="center" min-width="180">
                <template #default="scope">
                  <span class="primaryColorg">{{ scope.row.score }}分</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="usage"
                label="使用次数"
                min-width="50"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="createdAt"
                label="创建时间"
                align="center"
                min-width="150"
              >
              </el-table-column>
            </el-table>
            <pagination
              v-show="homeTotal > 0"
              :total="homeTotal"
              :page.sync="listQueryHomework.page"
              :limit.sync="listQueryHomework.limit"
              @pagination="searchQueryHomework"
            />
          </div>
        </el-form-item>
      </el-form>
      <question-mng-drawer
        @closeDrawer="closeDrawer"
        :drawer="drawer"
        :questionForm="questionForm"
      ></question-mng-drawer>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelHomeWorksDialog">取 消</el-button>
        <el-button
          type="primary"
          :loading="homeworkLoading"
          @click="submitHomeWorkForm('homeworkForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { mapGetters } from "vuex";
import ResourceAlarm from "./ResourceAlarm.vue";
import QuestionMngDrawer from "../../../classMng/questionBankMng/components/QuestionMng-Drawer.vue";
import CircleContainer from "@/components/CircleContainer";
import BorderContainer from "@/components/BorderContainer";
// import Course from "./components/Course.vue";
// import HomeworkCorrection from "./components/HomeworkCorrection.vue";
// import JobList from "./components/JobList.vue";
import router from "@/router";
import CreateCourseDialog from "@/components/CreateCourseDialog";
import UploadFileDialog from "@/components/UploadFileDialog";

import {
  getHomeworkMarkForIndex,
  getHomeworkMarkForIndexDown,
} from "@/api/dashboard";
import {
  getCourseList,
  saveCourse,
  uptCourse,
  getClassesForSearch,
  getCourseDetailById,
  getRolesForSearch,
  getTeachersForSearch,
  getUsersForCourse,
  getAcademicYear,
  getCourseForHomeWork,
} from "@/api/edu/course";
import { addHomework } from "@/api/edu/job";
import { uploadLab, maxFileUploadSize } from "@/api/edu/lab";

import { uploadRourse } from "@/api/edu/courseRourse";
import { getTestPaperList, getTestPaperDetailById } from "@/api/edu/question";

export default {
  name: "",
  components: {
    ResourceAlarm,
    CreateCourseDialog,
    QuestionMngDrawer,
  },
  created() {
    this.queryHomeworkMarkForIndex();
    this.queryHomeworkMarkForIndexDown({});
    // this.queryCourseList();
    // this.querySchoolYears();
    // this.queryCourses('');
    // this.queryHomeworkList();
  },
  computed: {
    ...mapGetters(["userRolesNames"]),
    ...mapGetters(["isLicenseEnabled"]),
  },
  data() {
    return {
      tableRadio: "",
      homeTotal: 0,
      listQueryHomework: {
        page: 1,
        limit: 10,
        params: {},
      },
      searchForm: {
        title: "",
        ofPublic: "",
      },
      testPaperList: [],
      loading: false,
      questionForm: {
        ofPublic: "",
        title: "",
        descriptions: "",
        paperItemList: [],
      },
      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "修改课程",
        create: "创建课程",
        look: "查看告警推送规则",
      },
      form: {
        courseName: "",
        year: "",
        userIds: [],
      },
      rules: {
        courseName: [
          {
            required: true,
            message: "请输入课程名称",
            trigger: "blur",
          },
        ],
        year: [
          {
            required: true,
            message: "请选择学年",
            trigger: "blur",
          },
        ],
        userIds: [
          {
            required: true,
            message: "请选择学生",
            trigger: "blur",
          },
        ],
      },

      homeworkForm: {
        id: "",
        type: 0,
        homeworkName: "",
        schoolYear: "",
        courseId: "",
        time: "",
        description: "",
        paperId: "",
      },
      homeworkRules: {
        type: [{ required: true, message: "请选择作业类型", trigger: "blur" }],
        homeworkName: [
          { required: true, message: "请输入作业名称", trigger: "blur" },
        ],
        courseId: [
          { required: true, message: "请指定所属课程", trigger: "blur" },
        ],
        time: [
          { required: true, message: "请选择作业起止日期", trigger: "blur" },
        ],
      },

      //课程list
      courseIndexList: [],
      courseVisible: false,
      courseForm: {
        courseId: "",
        file: "",
      },
      courseFormRules: {
        courseId: [
          { required: true, message: "请选择所属课程", trigger: "blur" },
        ],
        file: [{ required: true, message: "请上传课件", trigger: "blur" }],
      },

      teachersList: [],
      rolesList: [],
      classesList: [],
      keyWord: "",
      className: "",
      roleName: "",

      isHas: false,

      tableData: [],
      multipleSelection: [],

      addOrNot: "1",

      openOrCls: false,

      itemList1: [], // 未添加列表
      itemList2: [], // 添加列表
      tableOrignList: [],

      alarmPushList: [],

      dialogVisible: false, //确认框
      //查看时禁止修改
      lookStatus: false,
      tableLoading: false,
      ruleId: "",
      pushId: "",
      companyList: [],
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      // url: [
      //   require("../.././../../assets/img/index/course-red.png"),
      //   require("../.././../../assets/img/index/cloud-yellow.png"),
      //   require("../.././../../assets/img/index/job-red.png"),
      //   require("../.././../../assets/img/index/lab-yellow.png"),
      //   require("../.././../../assets/img/index/source-red.png"),
      // ],
      listQuery: {
        page: 1,
        limit: 10,
        params: "",
      },
      total: 0,
      homeworksVisible: false,
      homeworkLoading: false,
      courseList: [],
      schoolYears: [],
      defaultSchoolYear: "",
      courseList1: [],
      queryHomeworkMark: {
        page: 1,
        limit: 10,
      },
      homeWorkList: [],
      homeWorkTotal: 0,

      homeWorkDownList: [],
      homeWorkDownTotal: 0,

      queryHomeworkMarkDown: {
        page: 1,
        limit: 10,
        params: "",
      },
      unStuList: [],

      courseParamList: [],
      dataTotalList: [],

      fileDialogVisible: false,
      fileUpLoading: false,
      dialogStatus: "create",
      updateFileInfo: {},
      questionForm: {},
      drawer: false,
      gradeList:[]
    };
  },
  methods: {
    getTableItem(e) {
      this.homeworkForm.paperId = e;
    },
    //handleHomeWorkListQuery
    handleHomeWorkListQuery(params) {
      this.queryHomeworkMarkForIndexDown(params);
    },
    /**查询作业批改 */
    async queryHomeworkMarkForIndexDown(params) {
      getHomeworkMarkForIndexDown(params).then((res) => {
        if (res && res.flag) {
          let resData = res && res.resData;
          let homeWorkDownList = resData && resData.records;
          this.homeWorkDownList = homeWorkDownList;
          this.homeWorkDownTotal = resData && resData.total;
          console.log(this.homeWorkDownTotal);
        }
      });
    },

    async queryHomeworkMarkForIndex() {
      getHomeworkMarkForIndex(this.queryHomeworkMark).then((res) => {
        if (res && res.flag) {
          let resData = res && res.resData;
          let homeWorkList = resData && resData.records;
          this.homeWorkList = homeWorkList;
          this.homeWorkTotal = resData && resData.total;
        }
      });
    },

    queryHomeWorkByPage(e) {
      this.queryHomeworkMark.page = e.page;
      this.queryHomeworkMark.limit = e.limit;
      this.queryHomeworkMarkForIndex();
    },

    //添加作业
    submitHomeWorkForm(text) {
      let form = this.homeworkForm;
      let time = form && form.time;
      let startTime = time && time[0];
      let endTime = time && time[1];
      let courseId = form.courseId;
      startTime = this.$moment(startTime).format("YYYY-MM-DD HH:mm:ss");
      endTime = this.$moment(endTime).format("YYYY-MM-DD HH:mm:ss");
      let homeworkName = form.homeworkName;
      let paperId = form.paperId;
      if (!paperId) {
        this.$message.warning("请选择试卷");
        return;
      }
      let formItem = {
        courseId,
        homeworkName,
        startTime,
        endTime,
        paperId,
        type: form.type,
      };
      this.$refs[text].validate((valid) => {
        if (valid) {
          this.homeworkLoading = true;
          addHomework(formItem)
            .then((reponse) => {
              if (reponse && reponse.flag) {
                this.dialog.visible = false;
                this.$message.success("添加成功");
                // this.getHomeworkFile(this.queryParams.courseId)
                this.queryHomeworkMarkForIndex();
                this.cancelHomeWorksDialog();
                this.$emit("queryHomeworkListIndex", courseId);
                this.homeworkLoading = false;
              }
            })
            .finally(() => {
              this.homeworkLoading = false;
            });
        }
      });
    },

    onSubmit(form) {
      let searchForm = this[form];
      console.log(searchForm);
      this.listQueryHomework.params = searchForm;
      this.getList();
    },
    onCancel(form) {
      this.$refs[form].resetFields();
      let searchForm = this[form];
      this.listQueryHomework.params = searchForm;
      this.getList();
    },
    closeDrawer() {
      this.drawer = false;
    },

    queryTestPaperById(id) {
      getTestPaperDetailById({ id }).then((res) => {
        if (res && res.flag) {
          this.questionForm = res.resData;
          this.drawer = true;
        }
      });
    },
    searchQueryHomework(e) {
      this.listQuery.page = e.page;
      this.listQuery.limit = e.limit;
      this.getList();
    },

    getList() {
      this.loading = true;

      getTestPaperList(this.listQueryHomework).then((reponse) => {
        let resData = reponse.resData;
        this.testPaperList = resData.records;
        this.homeTotal = resData.total;
        this.loading = false;
      });
    },

    handleAddHomeWork() {
      let isLicenseEnabled = this.$store.state.user.isLicenseEnabled;
      if (!isLicenseEnabled) {
        this.$message.warning("抱歉，系统已过期，需联系官方工作人员续费");
        return;
      }
      let _this = this;
      _this.homeworksVisible = true;
      _this.homeworkForm = {
        id: "",
        type: 0,
        homeworkName: "",
        schoolYear: "",
        courseId: "",
        time: "",
        description: "",
        paperId: "",
      };
      _this.initCourse();
      _this.getList();
    },
    initCourse() {
      getCourseForHomeWork("").then((res) => {
        this.courseList1 = res && res.resData;
      });
    },

    cancelHomeWorksDialog() {
      let _this = this;
      _this.homeworksVisible = false;

      _this.$refs.homeworkForm.resetFields();
    },
    handleSelectionHomeworkChange() {},
    cancel() {
      let _this = this;
      let dialog = {
        visible: false,
      };
      _this.dialog = dialog;
      _this.itemList2 = [];
      _this.tableData = [];
      _this.addOrNot = "1"; //变为未添加
      _this.lookStatus = false;
      _this.$refs["forms"].$children[0].$children[0].$children[0].resetFields();
    },
    //根据条件查询
    queryUserListBySome(data) {
      this.queryUserList(data);
    },
    //添加单个
    addOneUser(tag) {
      this.itemList2.push(tag); //表单展示的list
      this.tableData = this.getNewTableList(this.tableData, [tag]);
    },
    //点击批量添加按钮，将itemList更新（需要一个专门处理tableData的方法，去掉已经添加的列表）
    addChooseUsers(data) {
      let itemList2 = data;
      this.itemList2.push(...itemList2); //表单展示的list
      this.tableData = this.getNewTableList(this.tableData, itemList2);
    },

    //查询已添加或者未添加列表
    queryChooseList(addOrNot) {
      this.addOrNot = addOrNot;
      if (addOrNot == 2) {
        this.tableData = this.itemList2;
      } else {
        // if (this.dialog.status == 'look') {
        // 	this.tableData = this.itemList1
        // } else {
        // 	this.tableData = this.getNewTableList(this.tableOrignList, this.itemList2);
        // }

        this.tableData = this.getNewTableList(
          this.tableOrignList,
          this.itemList2
        );
      }
    },

    //列表取消添加的用户，利用最原始的列表,进行双向数组的添加和减少
    handleUserList(tag) {
      //展示列表更新
      this.itemList2.splice(this.itemList2.indexOf(tag), 1);
      // 表格列表更新
      if (this.addOrNot == 1) {
        this.tableData = this.getNewTableList(
          this.tableOrignList,
          this.itemList2
        );
      } else {
        this.tableData = this.itemList2;
      }
    },
    toggleSelection() {
      this.itemList2 = []; //表单展示的list
      if (this.addOrNot == 1) {
        this.tableData = this.getNewTableList(this.tableOrignList, []);
      } else {
        //如果是已添加，则置空
        this.tableData = this.itemList2;
      }
    },

    submitForm(form) {
      // console.log();
      if (this.dialog.status == "update") {
        form.id = this.form.id;
        uptCourse(form).then((reponse) => {
          if (reponse && reponse.flag) {
            this.dialog.visible = false;
            this.$message.success("课程修改成功");
          }
        });
      } else if (this.dialog.status == "create") {
        saveCourse(form).then((reponse) => {
          if (reponse && reponse.flag) {
            this.dialog.visible = false;
            this.$message.success("课程创建成功");
            this.$emit("queryCourseList");
          }
        });
      }
    },
    initGrade() {
      const date = new Date();
      let currentYear = parseInt(date.getFullYear());
      let gradeList = [];
      const level = 5;
      for (var i = 0; i < level; i++) {
        let beginTime = currentYear - level + i + 1;
        gradeList.push(beginTime);
      }
      this.gradeList = gradeList;
    },

    //创建课程
    handleAdd(isLicenseEnabled) {
      if (!isLicenseEnabled) {
        this.$message.warning("抱歉，系统已过期，需联系官方工作人员续费");
        return;
      }
      let _this = this;
      _this.queryUserList();
      _this.queryRolesForSearchList();
      _this.queryClassesForSearchList();
      _this.initSchoolYear();
      _this.initGrade();
      let form = {
        courseName: "",
        year: "",
        userIds: [],
        grade: "",
      };
      _this.form = form;
      let dialog = {
        status: "create",
        visible: true,
      };
      _this.dialog = dialog;
    },
    //获取角色列表
    async queryRolesForSearchList() {
      const res = await getRolesForSearch();
      this.rolesList = res.resData;
    },
    //获取班级列表
    async queryClassesForSearchList() {
      const res = await getClassesForSearch();
      this.classesList = res.resData;
    },
    //**查询学年 */
    // querySchoolYears() {
    //     getAcademicYear().then(res => {
    //         this.schoolYears = res && res.resData;
    //     })
    // },
    initSchoolYear() {
      const date = new Date();
      let currentMonth = date.getMonth() + 1;
      let currentYear = parseInt(date.getFullYear());
      let schoolYears = [];
      const level = 4;
      for (var i = 0; i < level; i++) {
        let beginTime = currentYear - level / 2 + i;
        schoolYears.push(beginTime + " ~ " + (beginTime + 1) + " 第一学期");
        schoolYears.push(beginTime + " ~ " + (beginTime + 1) + " 第二学期");
      }
      if (currentMonth >= 9) {
        this.defaultSchoolYear =
          currentYear + " ~ " + (currentYear + 1) + " 第二学期";
      } else {
        this.defaultSchoolYear =
          currentYear + " ~ " + (currentYear + 1) + " 第一学期";
      }

      this.schoolYears = schoolYears;
    },

    //查询用户列表
    async queryUserList(data) {
      this.tableLoading = true;
      const res = await getUsersForCourse(data);
      if (res && res.flag) {
        let tableData = res.resData;
        tableData &&
          tableData.map((item) => {
            let userName = item.userName;
            item.userRoles = userName;
          });
        //用户处理原始数据的列表
        this.tableOrignList = tableData;
        //去掉已经选择的itemList2
        let itemList2 = this.itemList2;
        //用于展示的列表
        let addOrNot = this.addOrNot;

        this.tableData = this.getTableList(
          addOrNot,
          itemList2,
          this.tableOrignList
        );
      }
      this.tableLoading = false;
    },
    /**
     *
     */
    getTableList(addOrNot, itemList2, tableOrignList) {
      //筛选已添加列表，获得未添加原始列表
      let tableData = [];
      if (itemList2 && itemList2.length > 0) {
        tableData = this.getNewTableList(tableOrignList, itemList2);
      } else {
        tableData = tableOrignList;
      }
      // 如果选了已添加查询，从已添加列表中筛选
      if (addOrNot == "2") {
        tableData = this.getNewItemsList(tableOrignList, itemList2);
      }
      return tableData;
    },

    //列表去掉已经添加的list
    getNewTableList(arr, ids) {
      let newArr = arr;
      ids &&
        ids.map((itemId) => {
          newArr =
            newArr &&
            newArr.filter((item) => {
              return item.id != itemId.id;
            });
        });
      return newArr;
    },

    goToPage(path) {
      this.$router.push(path);
    },
    goToPageParam(path, query) {
      this.$router.push({
        path,
        query,
      });
    },
    // 'dashboard'
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .dialog-jobs {
    .el-dialog {
      // width: 600px;
    }

    // .el-form-item__label {
    //     width: 150px;
    // }

    // .el-form-item__content {
    //     margin-left: 150px;
    // }

    .el-form-input-edu {
      width: 500px;
    }
  }
}
.form-container {
  border: 1px solid #dcdfe6;
  padding: 20px;
  border-radius: 6px;
}

.qaItemContainer {
  width: 80%;
  font-size: 20px;
  text-align: center;
  height: 80px;
  line-height: 80px;
  border-radius: 10px;
}
.el-card-eda {

}
.dialog {
  ::v-deep {
    .el-dialog {
      max-height: 80vh;
      overflow: auto;
      width: 1300px;
    }

    .el-dialog__footer {
      position: absolute;
      bottom: 0px;
      right: 0px;
    }
  }

  &-form {
    width: 50%;
  }
}
</style>
