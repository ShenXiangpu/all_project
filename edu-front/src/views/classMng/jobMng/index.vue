<template>
  <div class="app-container">
    <border-container class="marginBottom10 border-container"  :height="15" :isShowTitle="false" :isBgShow="false">
      <template #content>
        <div class="" style="padding: 10px 0 0px 10px;">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="学年" prop="schoolYear">
              <el-select v-model="queryParams.schoolYear" @change="schoolYearChange">
                <el-option v-for="item in schoolYears" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关联课程" prop="courseId">
              <el-select v-model="queryParams.courseId">
                <el-option v-for="item in courseList" :key="item.name" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="success" class="editSuccess" icon="el-icon-search" @click="handleQuery">搜索</el-button>
              <el-button type="primary" class="editPrimary" icon="el-icon-refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>

    </border-container>

    <el-card>
      <template #header>
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">添加作业</el-button>
      </template>
      <el-table ref="dataTableRef" v-loading="loading" :data="homeworkList">
        <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
        <el-table-column label="作业名称" prop="homeworkName" min-width="180" align="center" show-overflow-tooltip />
        <el-table-column label="课程名称" prop="courseName" min-width="120" align="center" show-overflow-tooltip />
        <el-table-column label="学年" prop="academicYear" min-width="180" align="center">
        </el-table-column>
        <el-table-column label="作业数据" prop="" min-width="120" align="center">
          <template #default="scope">
            <el-button size="mini" type="success" class="editSuccess" @click="openHomework(scope.row)">打开</el-button>
          </template>
        </el-table-column>
        <el-table-column  label="作业要求" prop="description" align="center" min-width="200">
          <template #default="scope">
            <el-popover placement="bottom" title="作业要求" min-width="200" trigger="hover" :content="scope.row.description">
              <div slot="reference" class="tip-homework-description">{{ scope.row.description }}</div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="截止日期" prop="endTime" min-width="150" align="center" />

        <el-table-column label="操作" align="center" min-width="180" fixed="right">
          <template #default="scope">
            <el-divider direction="vertical"></el-divider>
            <el-button size="small" type="primary" class="editPrimary" @click.stop="handleUpdate(scope.row)">
              修改
            </el-button>
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm title="确定删除吗？" @onConfirm="handleDelete(scope.row)" onCancel="">
              <el-button size="small" type="danger" class="editDanger" slot="reference">
                删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="textMap[dialog.status]" :visible.sync="dialog.visible" @close="cancel" class="dialog-jobs">
      <el-form ref="homeworkForm" :model="homeworkForm" :rules="homeworkRules">
        <el-form-item label="作业名称" prop="homeworkName">
          <el-input class="el-form-input-edu" v-model="homeworkForm.homeworkName" placeholder="请输入作业名称"></el-input>
        </el-form-item>
        <el-form-item label="关联课程" prop="courseId">
          <el-select class="el-form-input-edu" v-model="homeworkForm.courseId">
            <el-option v-for="item in courseList1" :key="item.name" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="截止日期" prop="endTime">
          <el-date-picker class="el-form-input-edu" v-model="homeworkForm.endTime" value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="作业要求" prop="description">
          <el-input class="el-form-input-edu" type="textarea" v-model="homeworkForm.description"
            placeholder="请输入作业要求"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" :loading="addHomeworkLoading" @click="submitForm('homeworkForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="fileDialog.title" :visible.sync="fileDialog.visible" @close="cancelfileDialog" class="dialog"
      width="50vw">
      <el-card>
        <file-List ref="fileTable" :isShow="false" :filesList="filesList" @load="load"
          @hanleExpandChange="hanleExpandChange" @handleSelectionChange="handleSelectionChange" :height="400">
          <template slot="table-column">
            <el-table-column prop="fileName" label="文件名" min-width="180">
              <template #default="scope">
                <i :class="scope.row.dir ? 'el-icon-folder' : 'el-icon-document'"></i> &nbsp;{{
                  scope.row.fileName
                }}
              </template>
            </el-table-column>
            <el-table-column label="大小" align="center" prop="size"></el-table-column>
            <el-table-column label="修改时间" align="center" prop="lastModifyTime"></el-table-column>
            <el-table-column label="操作" align="center" fixed="right" min-width="180">
              <template #default="scope">
                <el-popconfirm title="确定删除吗？" @onConfirm="handleDeleteFile(scope.row)">
                  <el-button size="small" type="danger" slot="reference">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </template>
        </file-List>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';
import FileList from "@/components/FileList";
import BorderContainer from "@/components/BorderContainer";
import { addHomework, getHomework, listFile, getHomeworksList, deleteFiles, editHomework, deleteHomework } from "@/api/edu/job";
import { getAcademicYear, getCourseForHomeWork } from "@/api/edu/course"

export default {
  //import 引入的组件需要注入到对象中才能使用
  name: "job",
  components: {
    FileList,
    BorderContainer
  },
  props: {},
  data() {
    return {
      queryParams: {
        schoolYear: '',
        courseId: "",
      },
      schoolYears: [],
      courseList: [],
      vmId: '',
      loading: false,
      filesList: [],
      multipleSelection: [],
      academicYears: [],
      courseList1: [],
      homeworkList: [],
      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "修改作业",
        create: "添加作业",
      },
      loading: false,
      homeworkForm: {
        id: '',
        homeworkName: "",
        academicYear: '',
        courseId: "",
        endTime: "",
        description: ""
      },
      homeworkRules: {
        homeworkName: [{ required: true, message: "请输入作业名称", trigger: "blur", }],
        courseId: [{ required: true, message: "请指定所属课程", trigger: "blur", }],
        endTime: [{ required: true, message: "请指定作业提交截止日期", trigger: "blur", }],
      },
      isReadOnly: false,
      fileDialog: {
        title: '',
        visible: false
      },
      currentDir: '',
      mapstableTree: new Map(),
      tableTreeRefreshTool: {},
      treeObj: {},
      homeworkPath: '',
      addHomeworkLoading:false,
    };
  },
  watch: {
    // 'homeworkForm.courseId': {
    //   handler(newVal, oldValue) {
    //     delete this.homeworkForm.courseId
    //     if (newVal) {
    //       this.homeworkForm.courseId = newVal
    //     }
    //   }
    // }
  },
  computed: {
    // ...mapGetters([
    //   'userRolesNames',
    // ])
  },
  methods: {

    handleQuery() {
      this.queryHomeworkList()
    },
    resetQuery() {
      this.$refs["queryFormRef"].resetFields();
      this.schoolYearChange();
      this.queryHomeworkList();
    },
    getHomeworkFile(courseId) {
      getHomework(courseId).then(res => {
        const { vmId, homeworkPath } = res.resData;
        this.vmId = vmId;
        if (homeworkPath && homeworkPath != "") {
          let path = homeworkPath.substring(0, homeworkPath.lastIndexOf("/"));
          listFile({ id: vmId, path }).then(res => {
            let fileList = res && res.resData;
            this.filesList = this.handleFilesList(fileList);
          })
        }
      })
    },
    //**查询学年 */
    querySchoolYears() {
      getAcademicYear().then(res => {
        this.schoolYears = res && res.resData;
      })
    },
    /**查询当前老师的课程 */
    queryCourses() {
      getCourseForHomeWork(this.queryParams.schoolYear).then(res => {
        this.courseList = res && res.resData;
      })
    },
    queryHomeworkList() {
      getHomeworksList(this.queryParams).then(res => {
        this.homeworkList = res && res.resData;
      })
    },

    handleFilesList(filesList) {
      filesList && filesList.length > 0 && filesList.map(i => {
        let dir = i.dir
        if (dir) {
          // i.children = [],
          i.hasChildren = true
        }
        i.id = i.currentDir + '/' + i.fileName
      })
      return filesList
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async schoolYearChange() {
      this.queryParams.courseId = '';
      const res = await getCourseForHomeWork(this.queryParams.schoolYear);
      this.courseList = res && res.resData;
    },
    handleAdd() {
      let isLicenseEnabled = this.$store.state.user.isLicenseEnabled
      if (!isLicenseEnabled) {
        this.$message.warning('抱歉，系统已过期，需联系官方工作人员续费')
        return
      }
      let _this = this;
      let dialog = {
        status: "create",
        visible: true,
      };
      _this.homeworkForm = {}
      this.initCourse()
      _this.isReadOnly = false;
      _this.dialog = dialog;
    },
    initCourse() {
      getAcademicYear().then(res => {
        this.academicYears = res && res.resData;
      })
      getCourseForHomeWork('').then(res => {
        this.courseList1 = res && res.resData;
      })
    },
    handleUpdate(row) {
      let _this = this;
      let dialog = {
        status: "update",
        visible: true
      };
      _this.dialog = dialog;
      _this.isReadOnly = true;
      this.initCourse()
      _this.homeworkForm = Object.assign({}, row);
    },
    cancel() {
      let _this = this;
      let dialog = {
        visible: false,
      };
      _this.dialog = dialog;

      _this.$refs.homeworkForm.resetFields();
    },
    submitForm(text) {
      this.$refs[text].validate((valid) => {
        if (valid) {
          this.addHomeworkLoading = true
          this.homeworkForm.homeworkName = this.homeworkForm.homeworkName.trim();
          if (this.dialog.status == "update") {
            editHomework(this.homeworkForm).then(reponse => {
              if (reponse && reponse.flag) {
                this.dialog.visible = false;
                this.$message.success("修改成功");
                this.queryHomeworkList()
                this.addHomeworkLoading = false
              }
            }).finally(() => {
              this.addHomeworkLoading = false
            })
          } else if (this.dialog.status == "create") {
            addHomework(this.homeworkForm).then((reponse) => {
              if (reponse && reponse.flag) {
                this.dialog.visible = false;
                this.$message.success("添加成功");
                this.queryHomeworkList()
                this.addHomeworkLoading = false
              }
            }).finally(() => {
              this.addHomeworkLoading = false
            })
          }
        }
      });
    },
    handleDelete(row) {
      deleteHomework(row.id).then(res => {
        if (res && res.flag) {
          this.$message.success("删除成功");
          this.queryHomeworkList();
        }
      })
    },
    openHomework(row) {
      let _this = this;
      let dialog = {
        title: "作业数据",
        visible: true,
      };
      _this.filesList = [];
      _this.vmId = row.vmId;
      _this.currentDir = row.homeworkPath;
      _this.homeworkPath = row.homeworkPath
      listFile({ id: row.vmId, path: row.homeworkPath }).then(res => {
        let filesList = res && res.resData;
        _this.filesList = _this.handleFilesList(filesList);
      })
      _this.fileDialog = dialog;
    },
    cancelfileDialog() {
      let _this = this;
      let dialog = {
        visible: false,
      };
      _this.fileDialog = dialog;
    },
    handleSelectionChange() {

    },

    async hanleExpandChange(row, expanded) {
    },

    async load(tree, treeNode, resolve) {
      this.treeObj[tree.id] = { tree, treeNode, resolve }  // 将本次节点对象存储到maps对象中
      const res = await listFile({ id: this.vmId, path: tree.id })
      let filesList = res && res.resData
      filesList = this.handleFilesList(filesList)
      resolve(filesList)
    },
    handleFilesList(filesList) {
      filesList && filesList.length > 0 && filesList.map(i => {
        let dir = i.dir
        if (dir) {
          // i.children = [],
          i.hasChildren = true
        }
        i.id = i.currentDir + '/' + i.fileName
      })
      return filesList
    },

    //点击删除按钮的删除方法item为行数据
    handleDeleteFile(row) {
      let param = { vmId: this.vmId, filePathList: [row.id] };
      this.$message.success("正在删除，请稍后")
      deleteFiles(param).then(res => {
        // 根据我们声明的maps对象，拿到父节点。然后手动进行接口请求，重新进行数据渲染。
        //删除第一级菜单只需要重新查即可，删除二级以下菜单需要查询上一级菜单并强制更新
        if (this.treeObj[row.currentDir]) {
          const { tree, treeNode, resolve } = this.treeObj[row.currentDir]
          this.loadTable(tree.id, treeNode, resolve)
        } else {
          listFile({ id: this.vmId, path: this.homeworkPath }).then(res => {
            let filesList = res && res.resData
            filesList = this.handleFilesList(filesList)
            this.filesList = filesList
          })
        }
        this.$message.success("删除成功")
      });

    },


    async loadTable(id, treeNode, resolve) {  // 表格懒加载方法
      const res = await listFile({ id: this.vmId, path: id })
      let filesList = res && res.resData
      filesList = this.handleFilesList(filesList)
      this.$set(
        this.$refs.fileTable.$children[0].store.states.lazyTreeNodeMap,
        id,
        filesList
      )
    },
  },
  //生命周期 - 创建完成（可以访问当前 this 实例）
  created() {
    this.querySchoolYears();
    this.queryCourses('');
    this.queryHomeworkList();
  },
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {
    // const isHas = checkPermission([
    //   "alarmPushRule:modifyOne",
    //   "alarmPushRule:delOne",
    //   "alarmPushRule:getOne",
    // ]);
    // this.isHas = isHas;
  },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { }, //如果页面有 keep-alive 缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
::v-deep {
  .dialog-jobs {
    .el-dialog {
      width: 600px;
    }


    .el-form-item__label {
      width: 150px;
    }

    .el-form-input-edu {
      width: 300px;
    }

    .el-form-item__content {
      margin-left: 150px;
    }
  }

}

.content-top {
  .el-form-item {
    margin-bottom: 0px
  }

  margin-bottom: 10px;
}

.menu-container {
  margin: 30px;
}

.el-divider {
  background: none;
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



.tip-homework-description {
  // margin: 0px 5px 0px 10px;
  width: 100%;
  //color: red;
  // height: 70px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

@media screen and (max-width: 1466px) {


  .tip-homework-description {
    // margin: 0px 5px 0px 10px;
    width: 90%;
    //color: red;
    // height: 70px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
}
</style>




