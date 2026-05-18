<template>
  <div class="app-container">
    <border-container
      class="marginBottom10 border-container"
      :height="15"
      :isShowTitle="false"
      :isBgShow="false"
    >
      <template #content>
        <div  class="" style="padding: 20px 0 10px 10px">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="课程名称" prop="keyWord">
              <el-input
                v-model="queryParams.keyWord"
                id="keyWord"
                name="keyWord"
                placeholder="请输入课程名称"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <el-form-item label="学年" prop="year">
              <el-select v-model="queryParams.year" placeholder="请选择学年">
                <el-option
                  v-for="item in academicYears"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="开始学年" prop="year">
              <el-input v-model="queryParams.year" id="year" placeholder="请输入课程开始学年" clearable
                @keyup.enter="handleQuery" />
            </el-form-item> -->
            <el-form-item
              v-if="
                userRolesNames == '系统最高管理员' ||
                userRolesNames == '学校管理员'
              "
              label="老师"
              prop="teacherId"
            >
              <el-select
                v-model="queryParams.teacherId"
                id="teacherId"
                placeholder="请选择老师"
              >
                <el-option value="">全部老师</el-option>
                <el-option
                  v-for="item in teachersList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="success"
                class="editSuccess"
                icon="el-icon-search"
                @click="handleQuery"
                >搜索</el-button
              >
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                class="editPrimary"
                icon="el-icon-refresh"
                @click="resetQuery('queryFormRef')"
                >重置</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </template>
    </border-container>
    <el-card>
      <template #header>
        <div class="flex justify-between">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="handleAdd(isLicenseEnabled)"
            >创建课程</el-button
          >
          <el-button icon="el-icon-plus" @click="applyToJoin"
            >申请加入</el-button
          >
        </div>
      </template>
      <div>
        <el-table :data="courseList" style="width: 100%">
          <el-table-column prop="date" label="项目编号" width="180">
          </el-table-column>
          <el-table-column prop="name" label="项目名称" width="180">
          </el-table-column>
          <el-table-column prop="name" label="成员数量" width="180">
          </el-table-column>
          <el-table-column prop="name" label="项目描述" width="180">
          </el-table-column>
          <el-table-column prop="name" label="创建人" width="180">
          </el-table-column>
          <el-table-column prop="name" label="开始日期" width="180">
          </el-table-column>
          <el-table-column prop="address" label="结束日期"> </el-table-column>

          <el-table-column prop="address" label="操作">
            <template #default="scope">
              <el-button
                type="primary"
                class="editPrimary detail-info-button"
                size="small"
                @click.stop="goToDetail(scope.row.id)"
                >详情 <i class="iconfont icon-you1"></i
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
        @pagination="searchQuery" /> -->

    <el-dialog
      :title="textMap[dialog.status]"
      :visible.sync="dialog.visible"
      @close="cancel"
      class="dialog"
      width="80vw"
    >
      <el-row :gutter="20">
        <el-col :span="6" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form
            class="dialog-form"
            :model="form"
            :rules="rules"
            ref="form"
            label-width="100px"
          >
            <el-form-item class="endInput" label="项目名称" prop="courseName">
              <el-input
                class="el-input"
                :readonly="lookStatus"
                v-model="form.courseName"
                id="courseName"
                maxlength="32"
                placeholder="请输入课程名称"
                show-word-limit
              ></el-input>
            </el-form-item>
            <el-form-item label="起止日期" prop="year">
              <el-date-picker
                style="width: 100%"
                v-model="value2"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="项目描述" prop="year">
              <el-input
                type="textarea"
                maxlength="99"
                show-word-limit
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入内容"
                v-model="textarea2"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              style="position: relative"
              label="学生"
              prop="userIds"
              id="userIds"
            >
              <div class="dialog-userContainer">
                <el-tag
                  class="dialog-userContainer-tag"
                  :key="item.id"
                  @close="handleUserList(item)"
                  v-for="item in itemList2"
                  :closable="!lookStatus"
                  >{{ item.userName }}</el-tag
                >
              </div>
            </el-form-item>
            <el-form-item>
              <div class="flex justify-between align-center">
                <list-num
                  :num="`已添加 ${itemList2 && itemList2.length} 人`"
                ></list-num>
                <div>
                  <el-button
                    type="danger"
                    size="small"
                    class="editDanger"
                    :disabled="lookStatus"
                    @click="toggleSelection()"
                    >批量删除</el-button
                  >
                </div>
              </div>
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="14" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-card style="padding-bottom: 10px" class="marginBottom10">
            <el-col
              style="margin-bottom: 10px"
              :span="8"
              :xs="24"
              :sm="24"
              :md="24"
              :lg="8"
              :xl="8"
            >
              <el-input
                style="width: 100%"
                placeholder="请输入姓名"
                id="keyWords"
                clearable
                v-model="keyWord"
                class="input-with-select"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="queryUserListBySome"
                ></el-button>
              </el-input>
            </el-col>
            <el-col
              style="margin-bottom: 10px; text-align: center"
              :span="8"
              :xs="24"
              :sm="24"
              :md="24"
              :lg="8"
              :xl="8"
            >
              <el-select
                v-model="className"
                placeholder="请选择班级"
                id="className"
                @change="queryUserListBySome"
              >
                <el-option value="">全部班级</el-option>
                <el-option
                  v-for="item in classesList"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-col>
            <!-- <el-col style="margin-bottom: 10px; text-align: center" :span="8" :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
              <el-select v-model="roleName" placeholder="请选择角色" @change="queryUserListBySome">
                <el-option value="">全部角色</el-option>
                <el-option v-for="item in rolesList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-col> -->
            <el-col
              style="margin-bottom: 10px; text-align: center"
              :span="8"
              :xs="24"
              :sm="24"
              :md="24"
              :lg="8"
              :xl="8"
            >
              <el-select
                style="width: 98%"
                v-model="addOrNot"
                id="addOrNot"
                @change="queryChooseList"
                placeholder="请选择列表"
              >
                <el-option label="未添加" value="1"> </el-option>
                <el-option label="已添加" value="2"> </el-option>
              </el-select>
            </el-col>
          </el-card>
          <el-card>
            <template #header>
              <div class="flex justify-between align-center">
                <div class="primaryColor">
                  已选择 {{ multipleSelection.length }} 人
                </div>

                <div>
                  <el-button
                    type="primary"
                    size="small"
                    class="editPrimary"
                    :disabled="lookStatus"
                    @click="addChooseUsers"
                    >批量添加
                  </el-button>
                </div>
              </div>
            </template>
            <el-table
              border
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
              height="340"
              max-height="340"
            >
              <el-table-column
                type="selection"
                width="55"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="userName"
                label="姓名"
                width="120"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="studentNum"
                label="学号"
                width="120"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="grade"
                label="入学年份"
                width="120"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="className"
                label="班级"
                width="120"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <!-- <el-table-column prop="roleName" label="角色" width="120" align="center" show-overflow-tooltip>
              </el-table-column> -->
              <el-table-column
                v-if="!lookStatus"
                prop="address"
                label="操作"
                align="center"
                min-width="120"
                show-overflow-tooltip
              >
                <template #default="scope">
                  <el-button
                    size="small"
                    v-if="addOrNot == '1'"
                    type="success"
                    class="editSuccess"
                    @click.stop="addOneUser(scope.row)"
                    >添加</el-button
                  >

                  <el-button
                    size="small"
                    type="danger"
                    class="editDanger"
                    v-if="addOrNot == '2'"
                    @click.stop="handleUserList(scope.row)"
                    >移除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
    <project-dialog ref="project-dialog"></project-dialog>
  </div>
</template>
  
<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';
import Pagination from "@/components/Pagination";
import ListNum from "@/components/Listnum";
import BorderContainer from "@/components/BorderContainer";
import ProjectDialog from "./components/ProjectDialog.vue";
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
} from "@/api/edu/course";
import { checkPermission } from "@/utils/validate";
import { Message } from "element-ui";
import { mapGetters } from "vuex";
export default {
  //import 引入的组件需要注入到对象中才能使用
  name: "courseMng",
  components: {
    // Pagination,
    ListNum,
    BorderContainer,
    ProjectDialog,
  },
  props: {},
  data() {
    return {
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        params: "",
      },
      queryParams: {
        keyWord: "",
        year: "",
        teacherId: "",
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
      academicYears: [],

      loading: false,
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
            trigger: "change",
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
      schoolYears: [],
      defaultSchoolYear: "",
      //课程list
      courseList: [],
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

      ruleId: "",
      pushId: "",
      companyList: [],

      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: "",
      //
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["userRolesNames", "isLicenseEnabled"]),
  },
  created() {
    this.handleQuery();
    //this.initSchoolYear();  //创建课程使用
    this.getSchoolYearList(); //查询条件
    let userRolesNames = this.$store.state.user.userRolesNames;
    if (userRolesNames == "系统最高管理员" || userRolesNames == "学校管理员") {
      this.queryTeachersForSearchList();
    }
  },
  methods: {
    //申请加入
    applyToJoin() {
      this.$refs["project-dialog"].dialogVisible.visible = true;
    },

    //获取学年列表
    getSchoolYearList() {
      getAcademicYear().then((res) => {
        this.academicYears = res && res.resData;
      });
    },
    //获取班级列表
    async queryClassesForSearchList() {
      const res = await getClassesForSearch();
      this.classesList = res.resData;
    },
    //获取角色列表
    async queryRolesForSearchList() {
      const res = await getRolesForSearch();
      this.rolesList = res.resData;
    },
    //获取老师列表
    async queryTeachersForSearchList() {
      const res = await getTeachersForSearch();
      this.teachersList = res.resData;
    },
    //列表取消添加的用户，利用最原始的列表,进行双向数组的添加和减少
    handleUserList(tag) {
      // 表单提交列表更新
      this.form.userIds =
        this.form.userIds &&
        this.form.userIds.filter((item) => {
          return item !== tag.id;
        });
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
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
      //批量移除，itemList置空,展示itemList2置空，table
      this.form.userIds = []; //表单提交需要的list
      this.itemList2 = []; //表单展示的list
      if (this.addOrNot == 1) {
        this.tableData = this.getNewTableList(this.tableOrignList, []);
      } else {
        //如果是已添加，则置空
        this.tableData = this.itemList2;
      }
    },

    //获取选的用户信息
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //查询用户列表
    async queryUserList(data) {
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
    },

    //根据条件查询
    queryUserListBySome() {
      let data = {
        keyWord: this.keyWord,
        className: this.className,
        roleName: this.roleName,
      };
      this.queryUserList(data);
    },

    //查询已添加或者未添加列表
    queryChooseList() {
      if (this.addOrNot == 2) {
        this.tableData = this.itemList2;
      } else {
        this.tableData = this.getNewTableList(
          this.tableOrignList,
          this.itemList2
        );
      }
    },

    //点击批量添加按钮，将itemList更新（需要一个专门处理tableData的方法，去掉已经添加的列表）
    addChooseUsers() {
      let multipleSelection = this.multipleSelection;
      let itemList2 = []; //获得
      let userIds = [];
      multipleSelection &&
        multipleSelection.map((item) => {
          itemList2.push(item);
          userIds.push(item.id);
        });
      this.form && this.form.userIds && this.form.userIds.push(...userIds); //表单提交需要的list
      this.itemList2.push(...itemList2); //表单展示的list
      this.tableData = this.getNewTableList(this.tableData, itemList2);
    },
    //添加单个
    addOneUser(tag) {
      this.form && this.form.userIds && this.form.userIds.push(tag.id); //表单提交需要的list
      console.log("this.form", this.form);
      this.itemList2.push(tag); //表单展示的list
      this.tableData = this.getNewTableList(this.tableData, [tag]);
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

    //对比已添加列表，获得筛选list
    getNewItemsList(arr, ids) {
      let newArr = [];
      ids &&
        ids.map((itemId) => {
          arr &&
            arr.map((item) => {
              if (item.id == itemId.id) {
                newArr.push(item);
              }
            });
        });
      return newArr;
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

    //
    goToDetail(id) {
      this.$router.push({ path: "/classMng/courseDetail", query: { id } });
      // router.push({ name: 'user', params: { userId: 123 }})
    },
    goToEnvDetail(id, vmExist) {
      if (vmExist) {
        return;
      }
      this.$router.push({ path: "/classMng/cloudEnvDetail", query: { id } });
    },

    initParams() {
      let listQuery = {
        page: 1,
        limit: 10,
        params: "",
      };
      this.listQuery = listQuery;
    },
    searchQuery(e) {
      this.listQuery.page = e.page;
      this.listQuery.limit = e.limit;
      this.getList();
    },
    getList() {
      this.loading = true;
      getCourseList(this.listQuery).then((reponse) => {
        let resData = reponse.resData;
        this.courseList = resData;
        // this.total = resData.total;
        this.loading = false;
      });
    },
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let form = {
            academicYear: this.form.year,
            name: this.form.courseName.trim(),
            userIds: this.form.userIds,
          };

          if (this.dialog.status == "update") {
            form.id = this.form.id;
            uptCourse(form).then((reponse) => {
              if (reponse && reponse.flag) {
                this.dialog.visible = false;
                this.$message.success("修改成功");
                this.getList();
              }
            });
          } else if (this.dialog.status == "create") {
            saveCourse(form).then((reponse) => {
              if (reponse && reponse.flag) {
                this.dialog.visible = false;
                this.$message.success("添加成功");
                this.getList();
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

      let form = {
        courseName: "",
        year: "",
        userIds: [],
        id: "",
      };
      _this.form = form;
      _this.itemList2 = [];
      _this.tableData = [];
      _this.addOrNot = "1"; //变为未添加
      _this.lookStatus = false;
      _this.$refs.form.resetFields();
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
    handleAdd(isLicenseEnabled) {
      if (!isLicenseEnabled) {
        this.$message.warning("抱歉，系统已过期，需联系官方工作人员续费");
        return;
      }
      let _this = this;
      _this.queryUserList();
      _this.queryRolesForSearchList();
      _this.queryClassesForSearchList();
      let form = {
        courseName: "",
        year: "",
        userIds: [],
      };
      _this.form = form;
      let dialog = {
        status: "create",
        visible: true,
      };
      this.initSchoolYear();
      _this.dialog = dialog;
    },

    async queryCourseDetailById(id) {
      const res = await getCourseDetailById({ id });
      if (res && res.flag) {
        let resData = res.resData;
        let userIds = [];
        resData.courseUserIds.map((i) => {
          userIds.push(i.id);
        });
        this.form = {
          courseName: resData.name,
          year: resData.academicYear,
          userIds,
          id,
        };

        let itemList2 = this.handleItemUserList(resData.courseUserIds); // 添加的
        this.itemList2 = itemList2;

        this.queryUserList();
      }
    },

    handleItemUserList(list) {
      list &&
        list.map((item) => {
          if (item && item.userRoles) {
            let userRoles = item.userRoles;
            userRoles = JSON.parse(userRoles);
            item.userRoles = userRoles[0] && userRoles[0].cnName;
            item.id = item.userId;
          }
        });
      return list;
    },

    handleUpdate(row) {
      let _this = this;
      _this.initSchoolYear();
      _this.queryCourseDetailById(row);
      _this.queryRolesForSearchList();
      _this.queryClassesForSearchList();
      let dialog = {
        status: "update",
        visible: true,
      };
      _this.dialog = dialog;
    },

    handleDelete(row) {},
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
        this.form.year = currentYear + " ~ " + (currentYear + 1) + " 第二学期";
      } else {
        this.form.year = currentYear + " ~ " + (currentYear + 1) + " 第一学期";
      }

      this.schoolYears = schoolYears;
    },
  },
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {},
};
</script>
<style>
.el-popover {
  min-width: 100px;
}
</style>
<style lang='scss' scoped>
.endItem ::v-deep .el-input__inner {
  padding-right: 45px;
}

.detail-info-button {
  padding: 0.09rem 0.07rem;
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

.course-container {
  padding: 0 0 0 10px;
}

.el-row {
  // margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  .edit {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}

.menu-container {
  margin: 30px;
}

.el-divider {
  background: none;
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
  max-height: 30vh;
  overflow: auto;
  position: relative;

  &-tag {
    margin-right: 5px;
  }
}
</style>
  