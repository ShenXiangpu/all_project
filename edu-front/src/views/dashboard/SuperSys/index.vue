<template>
  <div class="app-container">
    <border-container class="marginBottom10 border-container-circle" :height="15" :title="'数据统计'">
      <template slot="content">
        <el-row class="data-statistics marginBottom10">
          <el-col v-for="(item, index)  in dataTotalListSys" :key="index" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <div class="flex flex-column align-center  justify-center">
              <circle-container style="margin: 5px auto;" :bgStyle="item.bgStyle">
                <template #content>
                  <div class="flex flex-column align-center  justify-center circle-height">
                    <div class="font14 marginBottom10">{{ item.title }}</div>
                    <div class="dv-digital-flop font20 fontW7">{{ item.count }}</div>
                  </div>
                </template>
              </circle-container>
            </div>
          </el-col>
        </el-row>
      </template>

    </border-container>

    <border-container class="marginBottom10 border-container" :height="15" :isShowTitle="false" :isBgShow="false">
      <template slot="content">
        <div class="" style="padding: 20px 0 10px 10px;">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="课程名称" prop="keyWord">
              <el-input v-model="queryParams.keyWord" id="keyWord" name="keyWord" placeholder="请输入课程名称" clearable
                @keyup.enter="handleQuery" />
            </el-form-item>
            <el-form-item label="学年" prop="year">
              <el-select v-model="queryParams.year" placeholder="请选择学年" @keyup.enter="handleQuery">
                <el-option v-for="item in schoolYears" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="老师" prop="teacherId">
              <el-select v-model="queryParams.teacherId" id="teacherId" placeholder="请选择老师">
                <el-option value="">全部老师</el-option>
                <el-option v-for="item in teachersList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="success" class="editSuccess" icon="el-icon-search" @click="handleQuery">搜索</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" class="editPrimary" icon="el-icon-search" @click="resetQuery('queryFormRef')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>

      </template>
    </border-container>

    <div>
      <el-row :gutter="10">
        <el-col class="el-row" :span="12" :xs="12" :sm="12" :md="8" :lg="6" :xl="6" v-for="item in courseList"
          :key="item.id">
          <border-container class="marginBottom10 border-container" :fontSize="'font16'" :isShowPopover="true" :titleDeStyle="titleDeStyle"
            :height="15" :title="item.name" :isBgShow="false">
            <template slot="content">
              <div class="font14" @click="goToDetail(item.id)">

                <div class="course-container">
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

                <div class="flex justify-between search">
                  <el-button type="success" class="editSuccess" size="small" style="display: block;"
                    @click.stop="goToDetail(item.id)">查看详情</el-button>
                  <!-- <a class="primaryColor">详情</a> -->
                </div>
              </div>
            </template><template slot="content"></template>
          </border-container>
        </el-col>
      </el-row>
    </div>
    <div v-show="courseList && courseList.length == 0" style="text-align: center;color: #999;">
      暂无数据
    </div>
    <!-- <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
          @pagination="searchQuery" /> -->


  </div>
</template>

<script>
// import DeviceItem from './components/deviceItem'
function formatter(number) {
  const numbers = number.toString().split('').reverse()
  const segs = []
  while (numbers.length) segs.push(numbers.splice(0, 3).join(''))
  return segs.join(',').split('').reverse().join('')
}
import CircleContainer from '@/components/CircleContainer'
import BorderContainer from '@/components/BorderContainer'
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
import {
  getCourseInfoForIndex
} from "@/api/dashboard";
import router from '@/router'
import chartsColor from '@/utils/color.js'
import html2canvas from "html2canvas"

export default {
  name: 'Dashboard',
  components: {
    CircleContainer,
    BorderContainer
  },
  created() {
    this.handleQuery();
    this.queryTeachersForSearchList();
    this.querySchoolYears()
    this.queryDataTotal()
  },
  computed: {

  },
  props: {
  },
  mounted() {


  },
  destroyed() {

  }, //生命周期 - 销毁完成
  data() {
    return {
      chartsColor: chartsColor,
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
      schoolYears: [],
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
      pushId: '',
      companyList: [],

      titleDeStyle: {
        height: '40px',
        lineHeight: '40px',
        textAlign: 'center',
      },
      lBCircle: {
        width: '16px',
        height: '32px',
        borderRadius: '0 16px 16px 0',

      },
      lSCircle: {
        width: '8px',
        height: '16px',
        borderRadius: '0 8px 8px 0',
        top: '6px'
      },
      rBCircle: {
        width: '16px',
        height: '32px',
        borderRadius: '16px 0  0 16px',
        right: '3px'
      },
      rSCircle: {
        width: '8px',
        height: '16px',
        borderRadius: '8px 0  0 8px',
        top: '6px'
      },
      dataTotalListSys: [],
      dataTotalList: []
    }
  },
  methods: {

    async queryDataTotal() {
      const res = await getCourseInfoForIndex();
      let resData = res && res.resData;
      let courseNum = resData && Number(resData.courseNum) || 0
      let studentNum = resData && Number(resData.studentNum) || 0
      let homeworkNum = resData && Number(resData.homeworkNum) || 0
      let checkedHomeworkNum = resData && Number(resData.checkedHomeworkNum) || 0
      let unCheckedHomeworkNum = resData && Number(resData.unCheckedHomeworkNum) || 0
      let checkedPercent = parseInt(resData.checkedPercent)

      let style = {
        fill: '#10abb9',
        fontWeight: 700
      }
      let dataTotalList = [
        {
          title: '课程数量',
          // count: `${courseNum}个`,
          count: {
            number: [courseNum],
            style,
            content: '{nt}'
          }
        },
        {
          title: '学生数量',
          // count: `${studentNum}个`,
          count: {
            number: [studentNum],
            style,
            content: '{nt}'
          }
        },
        {
          title: '作业布置',
          // count: `${homeworkNum}个`,
          count: {
            number: [homeworkNum],
            style,
            content: '{nt}'
          }
        },
        {
          title: '作业批改',
          // count: `${checkedHomeworkNum}份`,
          count: {
            number: [checkedHomeworkNum],
            style,
            content: '{nt}'
          }
        },
        {
          title: '待批作业',
          // count: `${unCheckedHomeworkNum}份`,
          count: {
            number: [unCheckedHomeworkNum],
            style,
            content: '{nt}'
          }
        },

      ]

      let dataTotalList1 = [
        {
          title: '课程数量(个)',
          count: courseNum,
          bgStyle: 'color:rgb(29,45,133);background-image: linear-gradient(45deg, rgb(235, 237, 255), rgb(247, 247, 255), rgb(235, 237, 255));'
        },
        {
          title: '学生数量(人)',
          count: studentNum,
          bgStyle: 'color:rgb(24,73,98);background-image: linear-gradient(45deg, rgb(232, 247, 254), rgb(235, 248, 254), rgb(221, 241, 253));'

        },
        {
          title: '作业布置(次)',
          count: homeworkNum,
          bgStyle: 'color:rgb(16,71,62);background-image: linear-gradient(45deg, rgb(234, 252, 253),  rgb(241, 254, 252), rgb(224, 251, 253));'

        },
        {
          title: '作业批改率(%)',
          count: `${checkedPercent}`,
          bgStyle: 'color:rgb(11,65,9);background-image: linear-gradient(45deg, rgb(230, 250, 234), rgb(235, 251, 233), rgb(219, 247, 233));'

        },
      ]

      this.dataTotalListSys = dataTotalList1
      this.dataTotalList = dataTotalList
    },

    /**
     * 课程管理
     */
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
    /**
     * 查询学年
     */
    querySchoolYears() {
      getAcademicYear().then(res => {
        this.schoolYears = res && res.resData;
      })
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
    goToDetail(id) {
      this.$router.push({ path: '/classMng/courseDetail', query: { id } });
      // router.push({ name: 'user', params: { userId: 123 }})
    },
    goToEnvDetail(id) {
      this.$router.push({ path: '/classMng/cloudEnvDetail', query: { id } });
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








  }
}
</script>
<style></style>

<style lang="scss" scoped>
.border-container {
  ::v-deep {
    .left-circle {
      width: 16px;
      height: 32px;
      border-radius: 0 16px 16px 0;
      left: -2px;

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
        top: 6px
      }
    }
  }
}

.data-statistics {
    height: 130px;
    margin-top: 10px;

    .el-col-xl-4 {
        width: 20% !important;
    }

    .el-avatar {
        background: none;
    }

    .circle-container {
        position: relative;
    }


    .dv-digital-flop {
        font-family:'楷体';
        font-size: 26px;
    }
    .circle-height {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        transform: translate(-50%, -50%);
    }
}




.course-container {
  padding: 0 0 0 10px;
}



.search {
  margin-top: 10px;
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

    .border-title {
      font-weight: 700;
      font-size: 18px;
    }
  }


}
</style>

