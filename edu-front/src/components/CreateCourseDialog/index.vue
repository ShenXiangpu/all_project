<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="9" :xs="24" :sm="24" :md="24" :lg="9" :xl="9">
        <el-form class="dialog-form" :model="form" :rules="rules" ref="form">
          <el-form-item class="endInput" label="课程名称" prop="courseName">
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
          <el-form-item label="学年" prop="year">
            <el-select
              class="el-input"
              v-model="form.year"
              placeholder="请选择学年"
            >
              <el-option
                v-for="item in schoolYears"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年级" prop="grade">
            <el-select
              class="el-input"
              v-model="form.grade"
              placeholder="请选择年级"
            >
              <el-option
                v-for="item in gradeList"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
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
            <div class="addRemove flex justify-between align-center">
              <list-num
                :num="`已添加 ${itemList2 && itemList2.length} 人`"
              ></list-num>
              <el-button
                type="warning"
                class="editWarning"
                :disabled="lookStatus"
                @click="toggleSelection()"
                >批量移除
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="15" :xs="24" :sm="24" :md="24" :lg="15" :xl="15">
        <el-card class="marginBottom10 el-card-form">
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
              <div style="text-align: right" class="primaryColor">
                已选择 {{ multipleSelection.length }} 人
              </div>
              <div>
                <el-button
                  type="info"
                  class="editInfo el-button-info"
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
            @selection-change="handleSelectionChange"
            width="100%"
            height="3.2rem"
          >
            <el-table-column
              type="selection"
              width="55"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="userName"
              label="姓名"
              min-width="120"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="studentNum"
              label="学号"
              min-width="120"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="grade"
              label="入学年份"
              min-width="90"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="className"
              label="班级"
              min-width="100"
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
              min-width="90"
              fixed="right"
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
      <el-button @click="cancel" class="marginRight20">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </span>
  </div>
</template>

<script>
import ListNum from "@/components/Listnum";

export default {
  name: "CreateCourseDialog",
  props: {
    src: {
      type: String,
      // default: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    },
    count: {
      type: String,
      default: "123个",
    },
    lookStatus: {
      type: Boolean,
      default: false,
    },
    tableData: {
      type: Array,
      default: [],
    },
    classesList: {
      type: Array,
      default: [],
    },
    tableLoading: {
      type: Boolean,
      default: false,
    },
    itemList2: {
      type: Array,
      default: [],
    },
    schoolYears: {
      type: Array,
      default: [],
    },
    gradeList: {
      type: Array,
      default: [],
    },
    defaultSchoolYear: {
      type: String,
      default: "",
    },
  },
  components: {
    ListNum,
  },
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
      addOrNot: "1",
      loading: false,
      form: {
        courseName: "",
        year: this.defaultSchoolYear,
        userIds: [],
        grade:"",
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
        grade: [
          {
            required: true,
            message: "请选择年级",
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
      keyWord: "",
      className: "",
      roleName: "",

      isHas: false,

      multipleSelection: [],

      openOrCls: false,

      itemList1: [], // 未添加列表
      tableOrignList: [],

      alarmPushList: [],

      dialogVisible: false, //确认框

      ruleId: "",
      pushId: "",
      companyList: [],
    };
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
  },
  methods: {

    cancel() {
      this.addOrNot = "1"; //变为未添加
      this.$refs["form"].resetFields();
      this.$emit("cancel");
    },
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let form = {
            academicYear: this.form.year,
            name: this.form.courseName.trim(),
            userIds: this.form.userIds,
            grade: this.form.grade,
          };

          this.$emit("submitForm", form);
        }
      });
    },
    handleSizeChange(val) {
      this.$emit("pagination", { page: this.currentPage, limit: val });
    },

    queryChooseList(val) {
      this.addOrNot = val;
      this.$emit("queryChooseList", val);
    },

    queryUserListBySome() {
      let data = {
        keyWord: this.keyWord,
        className: this.className,
        roleName: this.roleName,
      };
      this.$emit("queryUserListBySome", data);
    },

    handleUserList(tag) {
      this.$emit("handleUserList", tag);
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

      this.$emit("toggleSelection");
    },
    //获取选的用户信息
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
      this.$emit("addChooseUsers", itemList2);

      // this.itemList2.push(...itemList2); //表单展示的list
      // this.tableData = this.getNewTableList(this.tableData, itemList2);
    },
    //添加单个
    addOneUser(tag) {
      this.form && this.form.userIds && this.form.userIds.push(tag.id); //表单提交需要的list

      this.$emit("addOneUser", tag);
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
  },
};
</script>

<style scoped lang="scss">
.el-card-form {
  padding: 20px 0px 10px 0;
}
.addRemove {
  padding-left: 100px;
  width: 453px;
}
.el-table-edu {
  //   height: 345px;
  width: 100%;

  ::v-deep {
    .el-table__body-wrapper {
      height: calc(100vh - 700px);
      overflow-y: auto;
      min-height: 200px;
    }
  }
}
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
      width: 1300;
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

  .el-input {
    width: 353px;
  }
  ::v-deep {
    .el-form-item__label {
      width: 100px;
    }
    .el-form-item__error {
      margin-left: 100px;
    }
  }
}

.dialog-userContainer {
  border: 1px solid #ccc;
  padding: 10px;
  height: 260px;
  width: 353px;
  overflow: auto;
  position: relative;

  &-tag {
    margin-right: 5px;
  }
}

.dialog-footer {
  display: flex;
  justify-content: right;
  margin-top: 30px;
}
::v-deep {
  .el-button-info {
    span {
      font-weight: 400 !important;
      font-size: 14px !important;
    }
  }
}
</style>
