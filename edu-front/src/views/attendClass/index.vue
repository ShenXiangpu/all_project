<template>
  <div class="app-container">
    <border-container class="marginBottom10 border-container" :height="15" :isShowTitle="false" :isBgShow="false">
      <template #content>
        <div class="" style="padding: 10px 0 0px 10px;">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="课程名称" prop="keyWord">
              <el-input v-model="queryParams.keyWord" placeholder="请输入课程名称" clearable @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="学年" prop="year">
              <el-select v-model="queryParams.year" @change="handleQuery">
                <el-option v-for="item in schoolYears" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
              <!-- <el-input v-model="queryParams.year" placeholder="请输入开始学年" clearable @keyup.enter="handleQuery" /> -->
            </el-form-item>
            <el-form-item label="老师" prop="teacherId">
              <el-select v-model="queryParams.teacherId" placeholder="请选择老师" @change="handleQuery">
                <el-option value="">全部老师</el-option>
                <el-option v-for="item in teachersList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="success" class="editSuccess" icon="el-icon-search"  @click="handleQuery">搜索</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" class="editPrimary" icon="el-icon-refresh" @click="resetQuery('queryFormRef')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>

    </border-container>

    <div class="font16 title-decration primaryColor marginBottom10">我的课程：{{ courseList && courseList.length &&
      courseList.length }}&nbsp;门</div>

    <div>
      <el-row :gutter="10">
        <el-col class="el-row index-color" :span="12"  :xs="12" :sm="12" :md="8" :lg="6" :xl="6" v-for="item in courseList"
          :key="item.id">
          <border-container
            class="marginBottom10 border-container" :fontSize="'font16'" :isShowPopover="true" :height="15" :title="item.name" :isBgShow="false">
            <template #content>
              <div class="font14" @click="goToDetail(item.id,item.vmExist)">
                <div class="course-container" >
                  <div class="flex">
                    <span class=" title-decration2">课程ID：</span><span>{{ item.courseNum }}</span>
                  </div>
                  <div class="flex">
                    <span class=" title-decration2">学年：</span><span>{{ item.academicYear }}</span>
                  </div>
                  <div class="flex">
                    <span class=" title-decration2">老师：</span><span>{{ item.teacherName }}</span>
                  </div>
                  <div class="flex">
                    <span class=" title-decration2">课程人数：</span><span>{{ item.studentNum || 0 }}人</span>
                  </div>
                  <div class="flex">
                    <span class=" title-decration2">创建时间：</span><span>{{ item.createAt }}</span>
                  </div>
                </div>

                <div class="" style="margin-top: 10px; padding-left: 10px;">
                  <!-- <el-button :disabled="!item.vmExist" type="primary" size="small" style="display: block;"
                    @click.stop="goToEnvDetail(item.id)">实操云环境</el-button>
                  <a class="primaryColor">详情</a> -->

                  <div class="flex justify-between align-center" v-if="userRolesNames != '学校管理员'">
                    <!-- <div @click.stop="goToEnvDetail(item.id, !item.vmExist)">
                      <el-button :disabled="!item.vmExist" type="primary" size="small"
                        style="display: block;">实操云环境</el-button>
                    </div> -->
                    <div v-if="item.vmExist" @click.stop="goToEnvDetail(item.id, !item.vmExist)">
                      <el-button type="success" class="editSuccess"  size="small"
                        >实操云环境</el-button>
                    </div>
                    <div v-else @click.stop="">
                      <el-button type="info" :disabled="!item.vmExist" size="small"
                        >实操云环境</el-button>
                    </div>

                    <!-- <a class="" @click.stop="goToDetail(item.id)">详情</a> -->
                    <el-button type="primary" class="editPrimary detail-info-button" size="small" @click.stop="goToDetail(item.id,item.vmExist)"
                        >详情 <i class="iconfont icon-you1"></i></el-button>
                  </div>


                  <div v-else>
                    <el-button type="success" class="editSuccess"  size="small" style="display: block;"
                      @click.stop="goToDetail(item.id,item.vmExist)">查看详情</el-button>
                  </div>
                </div>
              </div>
            </template>

          </border-container>
        </el-col>
      </el-row>
    </div>
    <div v-show="courseList && courseList.length == 0" style="text-align: center;color: #999;">
      暂无数据
    </div>

  </div>
</template>

<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';
import Pagination from "@/components/Pagination";
import BorderContainer from "@/components/BorderContainer";

import {
  getCourseList,
  saveCourse,
  uptCourse,
  getClassesForSearch,
  getCourseDetailById,
  getRolesForSearch,
  getTeachersForSearch,
  getUsersForCourse,
  getAcademicYear
} from "@/api/edu/course";
import { checkPermission } from "@/utils/validate";
import { Message } from "element-ui";
import { mapGetters } from 'vuex'


export default {
  //import 引入的组件需要注入到对象中才能使用
  name: "courseMng",
  components: {
    BorderContainer,
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
        keyWord: '',
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
      loading: false,
      form: {
        courseName: "",
        year: '',
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

      //课程list
      courseList: [],
      teachersList: [],
      rolesList: [],
      classesList: [],
      keyWord: "",
      className: "",
      roleName: "",
      schoolYears: [],


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
      pushId: '',
      companyList: [],



      //
    };
  },
  watch: {},
  computed: {
    ...mapGetters([
      'userRolesNames',
      'isLicenseEnabled'
    ])
  },
  created() {
    this.handleQuery();
    this.queryTeachersForSearchList();
    this.querySchoolYears();
  },
  methods: {

    //获取班级列表
    async queryClassesForSearchList() {
      const res = await getClassesForSearch()
      this.classesList = res.resData
    },
    //获取角色列表
    async queryRolesForSearchList() {
      const res = await getRolesForSearch()
      this.rolesList = res.resData
    },
    //获取老师列表
    async queryTeachersForSearchList() {
      const res = await getTeachersForSearch()
      this.teachersList = res.resData
    },
    async querySchoolYears() {
      getAcademicYear().then(res => {
        this.schoolYears = res && res.resData;
      })
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
            item.userRoles = userName
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

    //点击批量添加按钮，将itemList更新（需要一个专门处理tableData的方法，去掉已经添加的列表）
    addChooseUsers() {
      let multipleSelection = this.multipleSelection;
      let itemList2 = []; //获得
      let userIds = [];
      multipleSelection &&
        multipleSelection.map((item) => {
          itemList2.push(item);
          userIds.push(
            item.id,
          );
        });
      this.form && this.form.userIds && this.form.userIds.push(...userIds); //表单提交需要的list
      this.itemList2.push(...itemList2); //表单展示的list
      this.tableData = this.getNewTableList(this.tableData, itemList2);
    },
    //添加单个
    addOneUser(tag) {
      this.form && this.form.userIds &&
        this.form.userIds.push(
          tag.id,
        ); //表单提交需要的list
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
    goToDetail(id,vmExist) {
      this.$router.push({ path: '/attendClass/courseDetail', query: { id,vmExist } });
      // router.push({ name: 'user', params: { userId: 123 }})
    },
    goToEnvDetail(id, vmExist) {
      console.log(vmExist);
      if (vmExist) {
        return
      }
      this.$router.push({ path: '/attendClass/cloudEnvDetail', query: { id } });
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
            name: this.form.courseName,
            userIds: this.form.userIds,
          }

          if (this.dialog.status == "update") {
            form.id = this.form.id
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
        year: '',
        userIds: [],
        id: '',
      };
      _this.form = form;
      _this.itemList2 = [];
      _this.tableData = [];
      _this.addOrNot = "1"; //变为未添加
      _this.lookStatus = false;
      _this.$refs.form.resetFields();


    },
    handleQuery() {
      console.log(this.queryParams);
      this.listQuery.params = this.queryParams;
      this.getList();
    },
    //重置搜索条件
    resetQuery(formName) {
      this.listQuery.params = {};
      this.listQuery.page = 1;
      this.getList();
      this.$refs[formName].resetFields();
    },
    handleAdd() {
      let _this = this;
      _this.queryUserList();
      _this.queryRolesForSearchList();
      _this.queryClassesForSearchList();
      let form = {
        courseName: "",
        year: '',
        userIds: [],
      }
      _this.form = form
      let dialog = {
        status: "create",
        visible: true,
      };
      _this.dialog = dialog;
    },

    async queryCourseDetailById(id) {
      const res = await getCourseDetailById({ id })
      if (res && res.flag) {
        let resData = res.resData;
        let userIds = []
        resData.courseUserIds.map(i => {
          userIds.push(i.id)
        })
        this.form = {
          courseName: resData.name,
          year: resData.academicYear,
          userIds,
          id
        }

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
      _this.queryCourseDetailById(row);
      _this.queryRolesForSearchList();
      _this.queryClassesForSearchList();
      let dialog = {
        status: "update",
        visible: true,
      };
      _this.dialog = dialog;
    },

    handleDelete(row) { },

  },
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {

  },

};
</script>
<style lang='scss' scoped>
.detail-info-button{
  padding: 0.09rem 0.07rem;
}
// .border-container {
//   ::v-deep {
//     .left-circle {
//       width: 16px;
//       height: 32px;
//       border-radius: 0 16px 16px 0;

//       .circle-center {
//         width: 8px;
//         height: 16px;
//         border-radius: 0 8px 8px 0;
//         top: 6px;
//       }
//     }

//     .right-circle {
//       width: 16px;
//       height: 32px;
//       border-radius: 16px 0 0 16px;
//       right: -2px;


//       .circle-center {
//         width: 8px;
//         height: 16px;
//         border-radius: 8px 0 0 8px;
//         top: 6px
//       }
//     }

//     .border-title {
//       font-weight: 700;
//       font-size: 18px;
//     }
//   }
// }

.course-container {
  padding: 0 0 0 10px;
}

.el-row {


  &:last-child {
    margin-bottom: 0;
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
    margin-bottom: 0px
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
  height: 200px;
  max-height: 30vh;
  overflow: auto;

  &-tag {
    margin-right: 5px;
  }
}
</style>
