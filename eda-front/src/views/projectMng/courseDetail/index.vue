<template>
  <div class="app-container">
    <el-card>
      <div class="flex justify-between">
        <div class="flex justify-between align-center">
          <i class="el-icon-s-custom marginRight10 head primaryColorb"></i>
          <div class="font16">
            <div class="marginBottom10">{{ courseObj.projectName }}</div>
            <div class="flex font14">
              <div class="marginRight20">
                项目编号：<span class="">{{ courseObj.projectNumber }}</span>
              </div>
              <div class="marginRight20">
                创建人：<span class="">{{ courseObj.ownerName }}</span>
              </div>
              <div class="marginRight20">
                成员数量：<span>{{ courseObj.userCount }}</span>
              </div>
              <div class="marginRight20">
                创建时间：<span>{{ courseObj.createdAt || "-" }}</span>
              </div>
            </div>
            <div class="font14">
              项目介绍：<span>{{ courseObj.description || "-" }}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-column justify-between">
          <div>
            <el-button
              v-permission="['sso:project:update']"
              type="warning"
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit"
              >修改信息</el-button
            >
          </div>
          <div>
            <el-button
              v-permission="['sso:project:delete']"
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="handleDeleteProject"
              >删除项目</el-button
            >
          </div>
        </div>
      </div>
    </el-card>
    <el-tabs class="el-tab-edu" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="成员管理" name="zero">
        <div v-if="activeName == 'zero'">
          <student-list
            ref="student-list"
            :applyCount="courseObj.applyCount"
            :listQuery="listStuQuery"
            @exportStu="exportStu"
            @submitFormStudent="submitFormStudent"
            @resetQuery="resetStuQuery"
            @searchQuery="searchStuQuery"
            @handleQuery="handleStuQuery"
            :total="stutotal"
            :studentList="studentList"
            :courseId="courseId"
            :stuDialog="stuDialog"
            @cancel="cancelStu"
            @handleAdd="handleAddStu"
            @handleDelete="handleDeleteStu"
            :exportloading="exportloading"
          ></student-list>
        </div>
      </el-tab-pane>
      <el-tab-pane label="IC设计云" name="first">
        <div v-if="activeName == 'first'">
          <el-card
            class="marginBottom10"
            v-if="checkPermission(['vm:getVmsByCurrentUserForPage'])"
          >
            <div class="" style="padding: 10px 0 0px 10px">
              <el-form
                ref="queryEnvFormRef"
                :model="queryEnvParams"
                :inline="true"
              >
                <el-form-item label="设计云名称" prop="vmName">
                  <el-input
                    v-model="queryEnvParams.vmName"
                    id="vmName"
                    placeholder="请输入设计云名称"
                    clearable
                    @keyup.enter="handleQuery"
                  />
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
                    @click="resetQuery('queryEnvFormRef')"
                    >重置</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
          </el-card>

          <el-card class="marginTop10">
            <template #header>
              <el-button
                v-permission="['project:vm:createVM']"
                :disabled="vmsList && vmsList.length > 0"
                type="primary"
                icon="el-icon-plus"
                @click="goToDetail"
                >创建设计云环境</el-button
              >
              &nbsp;<el-button
                v-permission="['project:vm:createVM']"
                :disabled="!(vmsList && vmsList.length > 0)"
                type="primary"
                icon="el-icon-plus"
                @click="handleAddUser"
                >手动创建</el-button
              >
              <el-button
                v-permission="['project:vm:deleteVMs']"
                style="float: right"
                :disabled="
                  !(multipleVmSelection && multipleVmSelection.length > 0)
                "
                type="primary"
                icon="el-icon-edit"
                @click="handleVms"
                >批量修改</el-button
              >
            </template>
            <el-table
              :data="vmsList"
              style="width: 100%"
              v-loading="loading"
              @selection-change="handleVmSelectionChange"
            >
              <el-table-column type="selection" width="55" align="center">
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                width="55"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="vmId"
                label="设计云ID"
                width="100"
                align="center"
              >
                <template #default="scope">
                  <!-- <el-button type="primary" size="small" @click.stop="handleShowDetail(scope.row)">查看详情</el-button> -->
                  <div
                    v-if="scope.row.status == '0' || scope.row.status == '5'"
                  >
                    {{ scope.row.vmId }}
                  </div>
                  <div v-else-if="scope.row.status == '2'">
                    <i
                      style="color: rgb(24, 144, 255)"
                      class="el-icon-loading"
                    ></i>
                    创建中
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="vmName"
                label="设计云名称"
                min-width="180"
                align="center"
              >
                <template #default="scope">
                  <!-- <el-button type="primary" size="small" @click.stop="handleShowDetail(scope.row)">查看详情</el-button> -->
                  <a
                    v-if="scope.row.status == '0'"
                    @click="goToEnvDetail(scope.row.vmId)"
                    class="primaryColor"
                    >{{ scope.row.vmName }}

                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="您在这"
                      placement="right"
                    >
                      <i
                        v-if="scope.row.isTeacher != -1"
                        class="el-icon-s-custom"
                      ></i>
                    </el-tooltip>
                  </a>
                  <span v-else>
                    {{ scope.row.vmName }}
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="您在这"
                      placement="right"
                    >
                      <i
                        v-if="scope.row.isTeacher != -1"
                        class="el-icon-s-custom"
                      ></i>
                    </el-tooltip>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="hostname"
                label="主机名称"
                min-width="180"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="powerState"
                label="电源状态"
                width="180"
                align="center"
              >
                <!-- <template #default="scope">
                                    <div v-if="scope.row.powerState">
                                        <i :style="{ color: POWERSTATE[scope.row.powerState].color }"
                                            :class="POWERSTATE[scope.row.powerState].icon"></i>
                                        {{ POWERSTATE[scope.row.powerState].text }}
                                    </div>
                                    <div v-else>
                                        -
                                    </div>
                                </template> -->
                <template #default="scope">
                  <el-switch
                    :disabled="
                      scope.row.status == '2' || scope.row.status == '5'
                    "
                    class="switchStyle"
                    @change="handlePowerStatus(scope.row)"
                    v-model="scope.row.powerState == 'poweredOn'"
                    active-text="开机"
                    inactive-text="关机"
                    active-color="#02C733"
                    inactive-color="#A6A6A6"
                  >
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column
                prop="cpu"
                label="配置"
                width="100"
                align="center"
              >
                <template #default="scope">
                  <!-- <el-button type="primary" size="small" @click.stop="handleShowDetail(scope.row)">查看详情</el-button> -->
                  <div>
                    {{ `${scope.row.cpu}核 ${scope.row.memory / 1024}G` }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="user"
                label="创建人"
                width="100"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="userCountsIds"
                label="使用人数"
                width="100"
                align="center"
              >
                <template #default="scope">
                  <div>
                    {{
                      scope.row.userCountsIds &&
                      scope.row.userCountsIds.split(",").length
                    }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间"
                min-width="150"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                min-width="300"
                fixed="right"
              >
                <template #default="scope">
                  <div v-if="scope.row.status == '0'">
                    <el-button
                      v-permission="['project:power:reboot']"
                      type="info"
                      class="editInfo"
                      size="small"
                      v-if="scope.row.powerState == 'poweredOn'"
                      @click.stop="reboot(scope.row)"
                      plain
                      >重启</el-button
                    >
                    <el-button
                      v-permission="['project:power:reboot']"
                      :disabled="true"
                      class="editInfo"
                      type="info"
                      size="small"
                      v-if="scope.row.powerState == 'poweredOff'"
                      @click.stop=""
                      plain
                      >重启</el-button
                    >

                    <el-button
                      v-permission="['project:vm:reConfig']"
                      size="small"
                      type="primary marginRight10"
                      slot="reference"
                      @click="handleUpdate(scope.row)"
                      class="editPrimary"
                      >修改</el-button
                    >

                    <el-popconfirm
                      title="确定删除吗？"
                      @onConfirm="handleDelete(scope.row)"
                      onCancel=""
                    >
                      <el-button
                        v-permission="['project:vm:deleteVMs']"
                        size="small"
                        type="danger"
                        class="editDanger marginRight10"
                        slot="reference"
                        plain
                      >
                        删除
                      </el-button>
                    </el-popconfirm>
                    <el-button
                      type="info"
                      class="editInfo"
                      size="small"
                      @click.stop="handleFileMng(scope.row)"
                      >文件管理</el-button
                    >
                  </div>
                  <div v-else-if="scope.row.status == '2'">
                    <i
                      style="color: rgb(24, 144, 255)"
                      class="el-icon-loading"
                    ></i>
                    创建中
                  </div>
                  <div v-else-if="scope.row.status == '5'">
                    <i
                      style="color: rgb(24, 144, 255)"
                      class="el-icon-loading"
                    ></i>
                    配置修改中
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <pagination
              v-show="total > 0"
              :total="total"
              :page.sync="listQuery.page"
              :limit.sync="listQuery.limit"
              @pagination="searchQuery"
            />
          </el-card>
        </div>
      </el-tab-pane>

      <el-tab-pane label="项目资料" name="second">
        <div v-if="activeName == 'second'">
          <el-card>
            <template #header>
              <el-button
                v-permission="['file:projectResource:uploadOne']"
                type="primary"
                icon="el-icon-plus"
                @click="openFileDialog"
                >上传文件</el-button
              >
            </template>
            <el-table :data="labsList" style="width: 100%" height="550">
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
                    :disabled="!isfileTypesCanShow[scope.row.fileSuffix]"
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
                    v-permission="['file:projectResource:modifyRemark']"
                    size="small"
                    type="primary"
                    class="editPrimary"
                    slot="reference"
                    @click.stop="handleUpdateResourse(scope.row)"
                  >
                    修改
                  </el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-button
                    v-permission="['file:projectResource:download']"
                    size="small"
                    type="info"
                    class="editInfo"
                    slot="reference"
                    @click.stop="handleDownload(scope.row)"
                  >
                    下载
                  </el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-popconfirm
                    title="确定删除吗？"
                    @onConfirm="handleDeleteCourseSource(scope.row)"
                    onCancel=""
                  >
                    <el-button
                      v-permission="['sso:file:projectResource:delOne']"
                      size="small"
                      type="danger"
                      class="editDanger"
                      slot="reference"
                    >
                      删除
                    </el-button>
                  </el-popconfirm>
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

          <upload-file-dialog
            :updateFileInfo="updateFileInfo"
            :dialogStatus="dialogStatus"
            :loadding="fileUpLoading"
            ref="upload-file-dialog"
            @doUpload="doUpload"
            @handleClose="handleClose"
            :fileDialogVisible="fileDialogVisible"
          />
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      :title="fileDialog.title"
      :visible.sync="fileDialog.visible"
      @close="cancelfileDialog"
      class="dialog"
      width="50vw"
    >
      <el-card>
        <file-List
          ref="fileTable"
          :isShow="false"
          :filesList="filesList"
          @load="load"
          @handleSelectionChange="handleSelectionChange"
          :height="400"
        >
          <template slot="table-column">
            <el-table-column prop="fileName" label="文件名" min-width="180">
              <template #default="scope">
                <i
                  :class="scope.row.dir ? 'el-icon-folder' : 'el-icon-document'"
                ></i>
                &nbsp;{{ scope.row.fileName }}
              </template>
            </el-table-column>
            <el-table-column
              label="大小"
              align="center"
              prop="size"
            ></el-table-column>
            <el-table-column
              label="修改时间"
              align="center"
              prop="lastModifyTime"
            ></el-table-column>
            <el-table-column
              label="操作"
              align="center"
              fixed="right"
              min-width="180"
            >
              <template #default="scope">
                <el-popconfirm
                  title="确定删除吗？"
                  @onConfirm="handleDeleteFile(scope.row)"
                >
                  <el-button size="small" type="danger" slot="reference"
                    >删除</el-button
                  >
                </el-popconfirm>
              </template>
            </el-table-column>
          </template>
        </file-List>
      </el-card>
    </el-dialog>
    <el-dialog
      title="手动创建"
      :visible.sync="userDialog.visible"
      @close="cancelAddUser"
      class="dialog"
      width="50vw"
    >
      <el-card class="searchBarCard">
        <el-form ref="queryKeyFormRef" :model="queryKeyParams" :inline="true">
          <el-form-item label="" prop="keyWord">
            <el-input
              v-model="queryKeyParams.keyWord"
              id="keyWord"
              placeholder="请输入姓名或者学号"
              clearable
              @keyup.enter="queryUncheckedUserByKeyWord"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              type="success"
              class="editSuccess"
              icon="el-icon-search"
              @click="queryUncheckedUserByKeyWord"
              >搜索</el-button
            >
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              class="editPrimary"
              icon="el-icon-search"
              @click="resetKeyQuery('queryKeyFormRef')"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
      <el-card>
        <el-table
          border
          class="el-table-edu"
          :data="unCheckList"
          style="width: 100%"
          height="300"
          @selection-change="handleUnCheckSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column
            prop="userName"
            label="用户名"
            align="center"
            min-width="180"
          >
          </el-table-column>
          <el-table-column
            prop="id"
            align="center"
            label="用户ID"
            min-width="180"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            align="center"
            label="手机号"
            min-width="180"
          >
          </el-table-column>
        </el-table>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddUser">取 消</el-button>
        <el-button type="primary" @click="submitAdd()" :loading="createLoadding"
          >创建</el-button
        >
      </span>
    </el-dialog>

    <project-iNfo-dialog
      @update="updateProjectInfo"
      ref="project-iNfo-dialog"
    />
  </div>
</template>
    
<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';
import Pagination from "@/components/Pagination";
import FileList from "@/components/FileList";
import StudentList from "./components/StudentList";
import BorderContainer from "@/components/BorderContainer";
import isfileTypesCanShow from "@/utils/filesTyps";
import UploadFileDialog from "@/components/UploadFileDialog";
import CourseLab from "./components/CourseLab/index.vue";

import {
  getProjectById,
  getCourseUserPage,
  getOenList,
  uploadRourse,
  updateResource,
  addUser2Project,
  deleteProject,
  removeStudent,
  getCourseUserNoVm,
  addUserCounts,
  delCourseRourceById,
} from "@/api/edu/projectMng.js";
import { maxFileUploadSize } from "@/api/edu/pdk.js";
import {
  addHomework,
  getAllHomeworks,
  mark,
  submitHomework,
  listFile,
  deleteFiles,
  getHomeworkStatistics,
  exportHomeworkList,
  deleteHomework,
  editHomework,
} from "@/api/edu/job";

import {
  getCourseList,
  getHomeworkList,
  getScoreLevel,
} from "@/api/edu/course";

import { exportStudentExcel } from "@/api/edu/student";
import { getClassNameForHomeWork, delCourse } from "@/api/edu/courseDetail";
import {
  poweroff,
  poweron,
  reboot,
  suspend,
  getVmsByCurrentUserForPage,
  deleteVMs,
} from "@/api/edu/cloud";

import {
  // uploadRourse,
  // updateResource,
  // maxFileUploadSize,
  deleteLabById,
} from "@/api/edu/courseRourse";

const POWERSTATE = {
  poweredOn: {
    text: "运行中",
    icon: "el-icon-success",
    color: "#319400",
  },
  poweredOff: {
    text: "关机",
    icon: "el-icon-remove",
    color: "#f5222d",
  },
  suspended: {
    text: "挂起",
    icon: "el-icon-info",
    color: "#faad14",
  },
};
import { checkPermission } from "@/utils/validate";
import HomeWorkDialog from "./components/HomeWorkDialog.vue";
import CourseMngCom from "./components/CourseMngCom.vue";
import ProjectINfoDialog from "./components/ProjectINfoDialog.vue";
export default {
  //import 引入的组件需要注入到对象中才能使用
  name: "courseMng",
  components: {
    Pagination,
    FileList,
    StudentList,
    BorderContainer,
    UploadFileDialog,
    HomeWorkDialog,
    CourseMngCom,
    CourseLab,
    ProjectINfoDialog,
  },
  props: {},
  data() {
    return {
      checkPermission: checkPermission,
      vmsList: [], //设计云列表
      POWERSTATE: POWERSTATE,
      isfileTypesCanShow: isfileTypesCanShow,
      courseList: [],
      total: 0,
      homewrkTotal: 0,
      listQuery: {
        page: 1,
        limit: 10,
        params: "",
      },

      queryEnvParams: {
        vmName: "",
      },
      listHomeworkQuery: {
        page: 1,
        limit: 10,
        params: "",
      },
      queryParams: {
        keyword: "",
        score: "",
        className: "",
        status: "",
      },
      queryKeyParams: {
        keyWord: "",
      },
      pdfUrl: "",
      dialog: {
        visible: false,
        status: "create",
      },
      userDialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "",
        create: "创建",
        look: "查看告警推送规则",
      },
      loading: false,

      activeName: "zero",

      isActive: 0,
      courseId: 0, //课程id
      courseObj: {},

      homeNameList: [],
      cyrrentHomework: "",
      homeworksList: [],
      homeWorkParams: {
        homeworkId: "",
        page: "",
        limit: "",
        keyword: "",
        score: "",
        className: "",
        status: "",
      },
      workHomeStatistics: {},
      className: "",

      labsList: [],
      scoreLevelList: [],
      classNameList: [],

      dialogSourse: {
        visible: false,
        title: "",
      },
      homeworkDialog: {
        visible: false,
      },
      homeworkForm: {
        homeworkMarkId: "",
        score: "",
        suggestion: "",
      },
      homeworkRules: {
        score: [{ required: true, message: "请选择等级", trigger: "blur" }],
      },
      filesList: [],
      fileDialog: {
        title: "",
        visible: false,
      },
      unCheckList: [],
      unCkeckUserInfo: [],
      createLoadding: false,
      deleteLoading: false,

      stutotal: 0,
      studentList: [],
      listStuQuery: {
        page: 1,
        limit: 10,
        params: "",
      },

      stuDialog: false,
      treeObj: {},
      homeworkPath: "",

      homeworkLoading: false,
      homeworkSubLoading: false,
      exportloading: false,

      fileDialogVisible: false,
      fileUpLoading: false,
      dialogStatus: "create",
      updateFileInfo: {},

      multipleVmSelection: [],
      maxUserCounts: 0,
      maxDisk: 0,

      isStatus: true, //是否可以批量修改

      homeworkId: "",
    };
  },
  watch: {},
  computed: {},
  created() {
    this.homeworkId = this.$route.query.homeworkId;
    this.courseId = Number(this.$route.query.id);
    this.queryCourseDetailById(this.courseId);
    this.initParams();
    this.getList();
    this.handleStuQuery();
  },
  methods: {
    //文件管理
    handleFileMng(row) {
      this.$router.push({
        path: "/projectMng/fileMng",
        query: {
          id: row.vmId,
        },
      });
    },
    handleEdit() {
      let projectEdit = this.$refs["project-iNfo-dialog"];
      projectEdit.handleUpdate(this.courseId);
    },
    updateProjectInfo() {
      this.queryCourseDetailById(this.courseId);
    },
    handleDeleteProject() {
      this.$confirm("此操作将永久删除该项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let id = this.courseId;
          deleteProject({ id }).then((res) => {
            if (res && res.flag) {
              this.$message.success("删除成功");
              this.$router.push("/projectMng/projectMng");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //批量修改
    handleVmSelectionChange(val) {
      let maxCounts = 0;
      let maxDisk = 0;
      let vmIds = [];
      let isStatus = true;
      val &&
        val.length > 0 &&
        val.map((item) => {
          if (item.maxUserCounts > maxCounts) {
            maxCounts = item.maxUserCounts;
          }

          if (item.disk > maxDisk) {
            maxDisk = Number(item.disk / 1024);
          }
          vmIds.push(item.vmId);

          if (item.status != 0) {
            isStatus = false;
            this.isStatus = isStatus;
            return;
          }
        });

      this.maxUserCounts = maxCounts;
      this.maxDisk = maxDisk;
      this.multipleVmSelection = vmIds;
    },

    //批量修改
    handleVms() {
      if (!this.isStatus) {
        this.$message.error("设计云环境配置未完成");
        return;
      }
      this.$router.push({
        path: "courseDetail/createEnvironment",
        query: {
          maxDisk: this.maxDisk,
          maxUserCounts: this.maxUserCounts,
          courseId: this.courseId,
          vmIds: this.multipleVmSelection,
        },
      });
    },

    /**
     * 删除作业
     */
    deleteHomework(item) {
      deleteHomework(item.id).then((res) => {
        if (res && res.flag) {
          this.$message.success("删除成功");
          this.homeworkId = "";
          this.queryHomeWorksNum();
        }
      });
    },

    /**
     * 修改作业
     */

    editHomework(item) {
      this.homeworkId = item && item.id;
      this.dialog = {
        visible: true,
        status: "update",
      };
      this.$refs["home-work-dialog"].form = {
        type: item.type,
        time: [item.startTime, item.endTime],
        homeworkName: item.homeworkName,
      };
    },

    handleDownload() {
      if (this.dateTime == null) {
        this.initTime();
      }
      let params = {
        sensorId: this.sensorId,
        startTime: this.dateTime[0],
        endTime: this.dateTime[1],
      };
      this.$message("数据正在下载");
    },

    exportStu(queryParams) {
      let courseId = this.courseId;
      let data = {
        courseId,
        ...queryParams,
      };
      this.exportloading = true;
      exportStudentExcel(data)
        .then((res) => {
          if (res && res.size === 0) {
            this.$message.success("当前数据为空");
            return;
          }
          const blob = new Blob([res.data], {
            type: "application/vnd.ms-excel;charset=utf-8",
          }); // 构造一个blob对象来处理数据，并设置文件类型

          let fileName = decodeURI(res.headers["content-disposition"]);

          if (fileName) {
            fileName = fileName.substring(fileName.indexOf("=") + 8);
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
          setTimeout(() => {
            this.exportloading = false;
          }, 2000);
        })
        .finally(() => {
          this.exportloading = false;
        });
    },
    //删除课程
    handleDeleteCourse() {
      let id = this.courseId;

      this.$confirm(
        "删除课程后会同步删除设计云环境及其所有数据，无法恢复，请慎重选择！",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$message.success("课程删除中，请稍后");
          this.deleteLoading = true;
          delCourse({ id })
            .then((res) => {
              if (res && res.flag) {
                this.$message.success("删除成功");
                this.deleteLoading = false;
                this.$router.back();
              }
            })
            .finally(() => {
              this.deleteLoading = false;
            });
        })
        .catch(() => {});
    },

    submitAdd() {
      let userCounts = this.unCkeckUserInfo;
      // let userIds = []
      // userCounts.map(item => {
      //   userIds.push(item.userId)
      // })
      let courseId = this.courseId;
      let params = {
        userCounts,
        courseId,
      };
      this.createLoadding = true;
      addUserCounts(params)
        .then((res) => {
          if (res && res.flag) {
            this.createLoadding = false;
            this.$message.success("手动创建成功");
            this.userDialog.visible = false;
            this.getList();
          }
        })
        .finally(() => {
          this.createLoadding = false;
        });
    },
    //选择未添加的用户，创建设计云
    handleUnCheckSelectionChange(row) {
      let userInfo = [];
      row.map((i) => {
        const { id, userName, phone } = i;
        let item = {
          userId: id,
          usernameZh: userName,
          phone: phone,
        };
        userInfo.push(item);
      });
      this.unCkeckUserInfo = userInfo;
    },
    cancelAddUser() {
      let _this = this;
      let dialog = {
        visible: false,
      };
      _this.userDialog = dialog;
      _this.unCheckList = [];
      _this.$refs.queryKeyFormRef.resetFields();
    },
    queryUncheckedUserByKeyWord() {
      let keyWord = this.queryKeyParams.keyWord;
      this.queryUncheckedUser(keyWord);
    },
    resetKeyQuery(formName) {
      this.queryUncheckedUser();
      this.$refs[formName].resetFields();
    },
    //
    async queryUncheckedUser(keyWord) {
      let courseId = this.courseId;
      const res = await getCourseUserNoVm({ courseId, keyWord });
      let resData = res && res.resData;
      this.unCheckList = resData;
    },
    //
    handleAddUser() {
      let isLicenseEnabled = this.$store.state.user.isLicenseEnabled;
      if (!isLicenseEnabled) {
        this.$message.warning("抱歉，系统已过期，需联系官方工作人员续费");
        return;
      }
      let _this = this;
      let dialog = {
        visible: true,
      };
      _this.userDialog = dialog;
      _this.queryUncheckedUser();
    },
    //
    handleDownload(row) {
      fetch(row.filePath)
        .then((res) => res.blob())
        .then((blob) => {
          // 将链接地址字符内容转变成blob地址
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = row.displayName; // 下载文件的名字
          // a.download = row.fileName;  // 下载文件的名字
          document.body.appendChild(a);
          a.click();
        });
    },

    goToEnvDetail(id) {
      this.$router.push({ path: "courseDetail/cloudEnvDetail", query: { id } });
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

    async handleDeleteCourseSource(row) {
      let id = row && row.id;
      const res = await delCourseRourceById({ id });
      if (res && res.flag) {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.queryOenList();
      } else {
        this.$message({
          type: "error",
          message: "删除失败!",
        });
      }
    },
    //获取班级
    async queryClassNameForHomeWork() {
      const res = await getClassNameForHomeWork();
      this.classNameList = res.resData;
    },
    //获取等级
    async queryScoreLevel() {
      const res = await getScoreLevel();
      this.scoreLevelList = res && res.resData;
    },

    async handleDelete(row) {
      const { vmId, userCountsIds } = { ...row };
      const userId = this.$store.state.user.userId;
      let userList = [];
      let index = userCountsIds.indexOf(",");
      let msg =
        "删除设计云会同步删除该设计云中的所有数据，无法恢复，请慎重选择！";
      if (index != -1) {
        userList = userCountsIds && userCountsIds.split(",");
        userList &&
          userList.length > 0 &&
          userList.map((i) => {
            if (userId == i) {
              msg =
                "该设计云包含当前创建人账号，若删除该设计云，该设计云中的所有数据将全部删除，无法恢复，请慎重选择！";
              return;
            }
          });
      }

      this.$confirm(msg, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          deleteVMs([vmId]).then((res) => {
            if (res && res.flag) {
              setTimeout(() => {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.loading = false;
                this.handleQuery({});
              }, 3000);
            } else {
              this.loading = false;
            }
          });
        })
        .catch(() => {});
    },
    //

    handleUpdateResourse(item) {
      let updateFileInfo = {
        id: item.id,
        displayName: item.displayName,
        remark: item.remark,
      };
      this.updateFileInfo = updateFileInfo;
      this.dialogStatus = "update";
      this.fileDialogVisible = true;
    },
    //
    openFileDialog() {
      this.dialogStatus = "create";
      this.fileDialogVisible = true;
    },
    handleClose() {
      this.fileDialogVisible = false;
      this.fileUpLoading = false;
      let updateFileInfo = {
        id: "",
        displayName: "",
        remark: "",
      };
      this.updateFileInfo = updateFileInfo;
    },

    async doUpload(form) {
      this.fileUpLoading = true;
      let dialogStatus = this.dialogStatus;
      if (dialogStatus == "create") {
        const isLt5M = form && form.file && form.file.size / 1024 / 1024;
        const res = await maxFileUploadSize();
        if (res && res.flag) {
          let resData = res && res.resData;
          let resDataMb = resData && resData.MB;
          if (resDataMb < isLt5M) {
            this.$message.error(`上传文件大小不能超过 ${resDataMb}MB!`);
          } else {
            let FormDatas = new FormData();
            FormDatas.append("file", form.file);
            uploadRourse({
              FormDatas,
              courseId: this.courseId,
              fileRename: form.fileRename,
              remark: form.remark,
            }).then((res) => {
              let resData = res.resData;
              if (res && res.flag && resData) {
                this.$message.success("上传成功");
                this.handleClose();
                this.queryOenList();
              } else {
                this.$message.error("上传出错");
              }
            });
          }
        } else {
          return false;
        }
      } else {
        const { id } = this.updateFileInfo;
        const { fileRename, remark } = form;
        let data = {
          id,
          fileRename: fileRename,
          remark: remark,
        };
        updateResource(data).then((res) => {
          if (res && res.flag) {
            this.$message.success("修改成功");
            this.handleClose();
            this.queryOenList();
          } else {
            this.$message.error("修改失败");
          }
        });
      }
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
      this.listHomeworkQuery.page = 1;
      this.queryHomeworkList();
    },
    handleExportHomeWork(formName) {
      let homeworkId = this.homeworkId;
      this.homeWorkParams = { homeworkId, ...this.queryParams };
      exportHomeworkList(this.homeWorkParams).then((res) => {
        if (res && res.size === 0) {
          this.$message.success("当前数据为空");
          return;
        }
        const blob = new Blob([res.data], {
          type: "application/vnd.ms-excel;charset=utf-8",
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
      });
    },
    // initParams() {
    //     let listQuery = {
    //         page: 1,
    //         limit: 10,
    //         params: {},
    //     };
    //     this.listQuery = listQuery;
    // },
    // searchQuery(e) {
    //     this.listQuery.page = e.page;
    //     this.listQuery.limit = e.limit;
    //     this.getList();
    // },
    //
    searchHomeoworkQuery(e) {
      this.listHomeworkQuery.page = e.page;
      this.listHomeworkQuery.limit = e.limit;
      this.queryHomeworkList();
    },
    async queryHomeworkList() {
      let homeworkId = this.homeworkId;
      //this.homeWorkParams = { homeworkId, ...this.queryParams }
      this.listHomeworkQuery.params = { homeworkId, ...this.queryParams };
      this.homeworkLoading = true;
      const res1 = await getHomeworkList(this.listHomeworkQuery); //查询初始作业列表
      this.homeworksList = res1.resData.list;
      this.homeworkLoading = false;
      this.homewrkTotal = res1 && res1.resData.total;
      // const { className } = this.queryParams
      // if (className) {
      //     let data = {
      //         className,
      //         homeworkId,
      //         courseId: this.courseId
      //     }
      //     this.className = className
      //     const res = await getHomeworkStatistics(data)
      //     this.workHomeStatistics = res.resData

      // } else {
      //     this.className = ''
      // }
    },
    //
    async queryHomeworksStatuistics(homeworkId, className) {
      let data = {
        courseId: this.courseId,
        homeworkId,
        className,
      };
      await getHomeworkStatistics(data);
    },
    //
    handleClick(tab, event) {
      let activeName = tab.name;
      if (activeName === "first") {
        this.initParams();
        this.getList();
      } else if (activeName === "second") {
        this.queryOenList();
      } else if (activeName === "third") {
      } else if (activeName === "zero") {
        this.handleStuQuery();
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
      let isLicenseEnabled = this.$store.state.user.isLicenseEnabled;
      console.log("isLicenseEnabled", isLicenseEnabled);
      if (!isLicenseEnabled) {
        this.$message.warning("抱歉，系统已过期，需联系官方工作人员续费");
        return;
      }
      let courseId = this.courseId;
      this.$router.push({
        path: "courseDetail/createEnvironment",
        query: {
          courseId,
        },
      });
    },
    //根据课程id获取作业数
    async queryHomeWorksNum() {
      let courseId = this.courseId;
      let homeworkId = this.homeworkId;
      const res = await getAllHomeworks({ courseId });
      let resData = res.resData;
      if (!homeworkId) {
        this.isActive = 0;
        homeworkId = resData && resData[0] && resData[0].id;
      } else {
        resData &&
          resData.length > 0 &&
          resData.map((item, index) => {
            if (item.id == homeworkId) {
              this.isActive = index;
            }
          });
      }

      if (!homeworkId) {
        this.homeworkId = "";
        this.listHomeworkQuery.params = { homeworkId };
        const res2 = await getHomeworkList(this.listHomeworkQuery); //查询初始作业列表
        this.homeworksList = res2 && res2.resData && res2.resData.list;
        this.homewrkTotal = res2 && res2.resData.total;
        this.workHomeStatistics = {};
        this.homeNameList = resData;
        return;
      } else {
        this.homeworkId = homeworkId;
        this.listHomeworkQuery.params = { homeworkId };
        const res2 = await getHomeworkList(this.listHomeworkQuery); //查询初始作业列表
        this.homeworksList = res2 && res2.resData && res2.resData.list;
        this.homewrkTotal = res2 && res2.resData.total;
        const res1 = await getHomeworkStatistics({ courseId, homeworkId });
        this.workHomeStatistics = res2 && res1 && res1.resData;
        this.homeNameList = resData;
      }
    },
    //查询课程信息
    async queryCourseDetailById(id) {
      const res = await getProjectById({ id });
      if (res && res.flag) {
        this.courseObj = res.resData;
      }
    },
    test(e) {
      console.log(e.target.scrollLeft);
    },

    createVm() {
      let courseId = this.courseId;
      this.$router.push({
        path: "courseDetail/createEnvironment",
        query: { courseId },
      });
    },

    // 点击切换作业次数
    radioChange(e) {},
    //homenamelist

    handleHomeNameListItem(index) {
      let homeNameList = this.homeNameList;
      return (homeNameList && homeNameList[index].id) || 0;
    },
    async handleDoM(e, index) {
      // 父级元素滚动距离 判断当前元素位置，是不是在容器的1/2
      // 几个元素 6*80 + 120
      // 距离左边的距离为 index * 80 + 60 - 200
      this.isActive = index;
      // console.log(e.target.parentNode.parentNode.parentNode.scrollLeft = index * 80 + 60 - 200);
      this.homeworkId = this.handleHomeNameListItem(index);
      let courseId = this.courseId;
      const res1 = await getHomeworkStatistics({
        courseId,
        homeworkId: this.homeworkId,
      });
      this.workHomeStatistics = res1.resData;
      this.handleHomeWorkListQuery();
      let node = document.getElementById("container");
      node.parentNode.scrollLeft = index * 80 + 100 - 200;
    },
    async handleLRArrow(str) {
      let index = this.isActive;
      let node = document.getElementById("container");
      node.parentNode.scrollLeft = index * 80 + 120 - 200;
      if (str == "left") {
        if (index > 0) {
          this.isActive--;
        } else {
          return;
        }
      } else {
        let length = this.homeNameList && this.homeNameList.length - 1;
        if (index < length) {
          this.isActive++;
        } else {
          return;
        }
      }
      this.homeworkId = this.handleHomeNameListItem(this.isActive);
      let courseId = this.courseId;
      const res1 = await getHomeworkStatistics({
        courseId,
        homeworkId: this.homeworkId,
      });
      this.workHomeStatistics = res1.resData;
      this.handleHomeWorkListQuery();
    },
    //修改课程
    updataCourse() {
      let _this = this;

      let dialog = {
        status: "update",
        visible: true,
      };
      _this.dialog = dialog;
    },

    initParams() {
      let listQuery = {
        page: 1,
        limit: 10,
        params: {},
      };
      this.listQuery = listQuery;
    },
    searchQuery(e) {
      this.listQuery.page = e.page;
      this.listQuery.limit = e.limit;
      this.getList();
    },
    async getList() {
      this.loading = true;
      let listQuery = this.listQuery;
      listQuery.params.groupId = this.courseId;
      const reponse = await getVmsByCurrentUserForPage(listQuery);

      //   const res = await getCourseList(this.listQuery);
      //   let courseList = res.resData;
      let resData = reponse.resData;
      let vmsList = resData.result;
      vmsList.map((item) => {
        const userCountsIds = item.userCountsIds.split(",");
        item.isTeacher = userCountsIds.indexOf(item.userId);
      });

      // this.courseList = courseList;
      this.vmsList = vmsList;
      this.total = resData.total;
      this.loading = false;
    },
    submitFormHomeWork(form) {
      this.homeworkSubLoading = true;
      form.courseId = this.courseId;
      if (this.dialog.status == "update") {
        form.id = this.homeworkId;
        editHomework(form)
          .then((reponse) => {
            if (reponse && reponse.flag) {
              this.dialog.visible = false;
              this.$message.success("修改成功");
              this.queryHomeWorksNum();
              this.homeworkSubLoading = false;
              this.$refs["home-work-dialog"].initForm();
            }
          })
          .finally(() => {
            this.homeworkSubLoading = false;
          });
      } else {
        addHomework(form)
          .then((reponse) => {
            if (reponse && reponse.flag) {
              this.dialog.visible = false;
              this.$message.success("添加成功");
              this.queryHomeWorksNum();
              this.homeworkSubLoading = false;
              this.$refs["home-work-dialog"].initForm();
            }
          })
          .finally(() => {
            this.homeworkSubLoading = false;
          });
      }
    },
    submitForm(text) {
      this.$refs[text].validate((valid) => {
        this.form.courseId = this.courseId;
        this.form.homeworkName = this.form.homeworkName.trim();
        if (valid) {
          if (this.dialog.status == "update") {
          } else if (this.dialog.status == "create") {
            this.homeworkSubLoading = true;
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
      _this.$refs["home-work-dialog"].initForm();
      // _this.$refs['home-work-dialog'].form.resetFields();
      // console.log(_this.$refs['home-work-dialog']);
    },
    handleQuery() {
      this.listQuery.params = this.queryEnvParams;
      this.getList();
    },
    //重置搜索条件
    resetQuery(formName) {
      this.getList();
      this.listQuery.page = 1;
      this.$refs[formName].resetFields();
    },
    handleAdd() {
      let isLicenseEnabled = this.$store.state.user.isLicenseEnabled;
      if (!isLicenseEnabled) {
        this.$message.warning("抱歉，系统已过期，需联系官方工作人员续费");
        return;
      }
      let _this = this;

      let dialog = {
        status: "create",
        visible: true,
      };
      _this.dialog = dialog;
      this.$refs["home-work-dialog"].getList();
      // _this.queryHomeWorksNum()
    },

    handleUpdate(row) {
      let id = row.vmId;
      this.$router.push({
        path: "courseDetail/createEnvironment",
        query: { id },
      });
    },

    handlePowerStatus(row) {
      if (row.powerState == "poweredOn") {
        this.handleOff(row);
      } else {
        this.handlePoweron(row);
      }
    },
    //    poweroff,
    // poweron,
    // reboot,
    handlePoweron(row) {
      let data = {
        id: row.vmId,
        hostName: row.hostName,
      };
      this.$confirm(
        "多用户使用的云服务器，对云服务器的电源操作会影响到所有用户",
        "确定开机吗？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.loading = true;
          poweron(data).then((res) => {
            if (res && res.flag) {
              this.$message({
                type: "success",
                message: "云服务器已开机!",
              });
              this.getList();
            } else {
              this.loading = false;
            }
          });
        })
        .catch(() => {});
    },
    reboot(row) {
      let vmID = row.vmId;
      this.$confirm(
        "多用户使用的云服务器，对云服务器的电源操作会影响到所有用户",
        "确定重启吗？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.loading = true;
          reboot({ id: vmID }).then((res) => {
            if (res && res.flag) {
              this.$message({
                type: "success",
                message: "云服务器正在重启!",
              });
              this.getList();
            } else {
              this.loading = false;
            }
          });
        })
        .catch(() => {});
    },
    handleOff(row) {
      let vmID = row.vmId;

      this.$confirm(
        "多用户使用的云服务器，对云服务器的电源操作会影响到所有用户",
        "确定关机吗？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.loading = true;
          poweroff({ id: vmID }).then((res) => {
            if (res && res.flag) {
              this.$message({
                type: "success",
                message: "云服务器已关机!",
              });
              this.getList();
            } else {
              this.loading = false;
            }
          });
        })
        .catch(() => {});
    },
    cancelHomework() {
      let _this = this;
      let dialog = {
        visible: false,
      };
      _this.homeworkDialog = dialog;
      this.homeworkForm.homeworkMarkId = "";
    },
    handleHomework(row) {
      let _this = this;
      let dialog = {
        visible: true,
      };
      _this.homeworkDialog = dialog;
      this.homeworkForm = Object.assign({}, row);
      this.homeworkForm.homeworkMarkId = row.id;
    },

    handleCorrention(obj) {
      const courseName = this.courseObj.name;
      let { $index } = obj;
      const homeworkId = this.homeworkId;
      const {
        id,
        paperId,
        userId,
        userName,
        className,
        userAccount,
        startTime,
        endTime,
      } = obj && obj.row;
      const { page, limit } = this.listHomeworkQuery;
      let total = this.homewrkTotal;
      $index = $index + 1;
      let courseId = this.courseId;
      let objs = {
        $index,
        page,
        limit,
        total,
        id,
        paperId,
        userId,
        userName,
        homeworkId,
        courseId,
        courseName,
        className,
        userAccount,
        startTime,
        endTime,
      };

      objs = JSON.stringify(objs);
      objs = encodeURI(objs);
      this.$router.push({
        path: "/classMng/correctionHomeWork",
        query: { obj: objs },
      });
    },
    submitHomeworkForm(text) {
      this.$refs[text].validate((valid) => {
        if (valid) {
          mark(this.homeworkForm).then((reponse) => {
            if (reponse && reponse.flag) {
              this.homeworkDialog.visible = false;
              this.$message.success("批改成功");
              this.queryHomeworkList();
            }
          });
        }
      });
    },
    openHomework(row) {
      let _this = this;
      let dialog = {
        title: `${row.userName}的作业`,
        visible: true,
      };
      _this.filesList = [];
      let works = this.homeNameList;
      let vmId = "";
      works.map((item) => {
        if (this.homeworkId == item.id) {
          vmId = item.vmId;
          this.vmId = vmId;
        }
      });
      this.homeworkPath = row.homeworkPath;
      listFile({ id: vmId, path: row.homeworkPath }).then((res) => {
        let filesList = res && res.resData;
        this.filesList = this.handleFilesList(filesList);
      });
      _this.fileDialog = dialog;
    },
    cancelfileDialog() {
      let _this = this;
      let dialog = {
        visible: false,
      };
      _this.fileDialog = dialog;
    },
    handleSelectionChange() {},

    hanleExpandChange(row, expanded) {},
    async load(tree, treeNode, resolve) {
      this.treeObj[tree.id] = { tree, treeNode, resolve }; // 将本次节点对象存储到maps对象中

      const res = await listFile({ id: this.vmId, path: tree.id });
      let filesList = res && res.resData;
      filesList = this.handleFilesList(filesList);
      resolve(filesList);
    },
    handleFilesList(filesList) {
      filesList &&
        filesList.length > 0 &&
        filesList.map((i) => {
          let dir = i.dir;
          if (dir) {
            // i.children = [],
            i.hasChildren = true;
          }
          i.id = i.currentDir + "/" + i.fileName;
        });
      return filesList;
    },

    //点击删除按钮的删除方法item为行数据
    handleDeleteFile(row) {
      let param = { vmId: this.vmId, filePathList: [row.id] };
      this.$message.success("正在删除，请稍后");
      deleteFiles(param).then((res) => {
        // 根据我们声明的maps对象，拿到父节点。然后手动进行接口请求，重新进行数据渲染。
        //删除第一级菜单只需要重新查即可，删除二级以下菜单需要查询上一级菜单并强制更新
        if (this.treeObj[row.currentDir]) {
          const { tree, treeNode, resolve } = this.treeObj[row.currentDir];
          this.loadTable(tree.id, treeNode, resolve);
        } else {
          listFile({ id: this.vmId, path: this.homeworkPath }).then((res) => {
            let filesList = res && res.resData;
            filesList = this.handleFilesList(filesList);
            this.filesList = filesList;
          });
        }
        this.$message.success("删除成功");
      });
    },

    async loadTable(id, treeNode, resolve) {
      // 表格懒加载方法
      const res = await listFile({ id: this.vmId, path: id });
      let filesList = res && res.resData;
      filesList = this.handleFilesList(filesList);
      this.$set(
        this.$refs.fileTable.$children[0].store.states.lazyTreeNodeMap,
        id,
        filesList
      );
    },

    /**
     * 学生列表
     */

    /**
     * student
     */
    submitFormStudent(e) {
      addUser2Project(e).then((reponse) => {
        if (reponse && reponse.flag) {
          this.stuDialog = false;
          this.$message.success("添加成功");
          this.getStuList();
        }
      });
    },
    /**
     *
     */
    initStuParams() {
      let listQuery = {
        page: 1,
        limit: 10,
        params: "",
      };
      this.listStuQuery = listQuery;
    },
    searchStuQuery(e) {
      this.listStuQuery.page = e.page;
      this.listStuQuery.limit = e.limit;
      this.getStuList();
    },
    getStuList() {
      this.loading = true;
      let courseId = this.courseId;
      getCourseUserPage({ courseId, ...this.listStuQuery }).then((reponse) => {
        let resData = reponse.resData;
        // this.studentList = resData && resData.list;
        this.studentList = resData && resData;
        this.stutotal = resData.total;
        this.loading = false;
      });
    },
    handleStuQuery(e) {
      this.listStuQuery.page = 1;
      this.listStuQuery.params = e;
      this.getStuList();
    },
    resetStuQuery() {
      this.listStuQuery.params = {};
      this.listStuQuery.page = 1;
      this.getStuList();
    },

    cancelStu() {
      this.stuDialog = false;
    },

    handleAddStu() {
      this.stuDialog = true;
    },
    handleDeleteStu(e) {
      let courseId = this.courseId;
      let userId = e && e.id;
      removeStudent({ userId, courseId }).then((res) => {
        if (res && res.flag && res.resData) {
          this.$message.success("删除成功");
          this.getStuList();
        }
      });
    },
  },
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {},
};
</script>

<style lang='scss' scoped>
$common-color: #409eff;
.head {
  font-size: 55px;
}
::v-deep {
  .el-tab-edu {
    margin-top: 30px;

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
  }
}

// .el-table {
//     height: 300px !important;
// }

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

.delete-el {
  position: absolute;
  right: 25px;
  top: 20px;
}

.choose-container {
  max-width: 700px;
  overflow: auto;

  .choose-item {
    // width: 50px;
    text-align: center;
    border: 1px solid $common-color;
    border-right: 0;

    // border-radius: 8px;
  }

  .no-active {
    .choose-item-container {
      width: 80px;
      // padding: 5px 10px;
      // height: 40px;
      // line-height: 40px;
      position: relative;

      .item-text-container {
        display: flex;
        flex-direction: column;
        align-items: center;

        .container-text {
          height: 48px;
          line-height: 40px;
          font-size: 20px;
          // color: #10abb9;
          line-height: 48px;
        }
      }
    }
  }

  .choose-item:hover {
    cursor: pointer;
  }

  .is-active {
    // background-color: $common-color;
    min-width: 200px;

    color: #fff;

    .choose-item-container {
      min-width: 200px;
      // text-align: center;
      padding: 4px 20px 4px 0px;
      // height: 50px;
      font-size: 12px;
      position: relative;

      .item-text-container {
        .container-text {
          height: 20px;
          // line-height: 20px;
          width: 200px;
          position: relative;
        }
      }
    }
  }

  .edit {
    position: absolute;
    right: 4px;
    top: 0;
  }

  .delete {
    position: absolute;
    right: 4px;
    bottom: 0;
  }
}

@media screen and (max-width: 1440px) {
  .choose-container {
    max-width: 700px;
    overflow: auto;

    .choose-item {
      // width: 50px;
      text-align: center;
      border: 1px solid $common-color;
      border-right: 0;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      // border-radius: 8px;
    }

    .no-active {
      .choose-item-container {
        width: 80px;
        // padding: 5px 10px;
        // height: 40px;
        // line-height: 40px;

        .item-text-container {
          .container-text {
            height: 60px;
            font-size: 20px;
            color: #10abb9;
            line-height: 60px;
          }
        }
      }
    }

    .choose-item:hover {
      cursor: pointer;
    }

    .is-active {
      background-color: $common-color;
      min-width: 200px;

      color: #fff;

      .choose-item-container {
        min-width: 200px;
        // text-align: center;
        padding: 4px 10px;
        // height: 50px;
        font-size: 12px;
        display: flex;

        flex-direction: column;
        align-items: center;
        justify-content: center;

        .item-text-container {
          .container-text {
            height: 20px;
            // line-height: 20px;
            width: 200px;
          }
        }
      }

      .edit {
        position: absolute;
        right: 4px;
        top: 0;
      }

      .delete {
        position: absolute;
        right: 4px;
        bottom: 0;
      }
    }
  }
}

.choose-item:last-child {
  border-radius: 0 4px 4px 0;
  border-right: 1px solid $common-color;
}

.choose-item:first-child {
  border-radius: 4px 0px 0px 4px;
}

.color333 {
  color: #999;
}

.marginTop10 {
  margin-top: 10px;
}

.marginRt20 {
  margin-right: 20px;
}

.marginRt30 {
  margin-right: 35px;
}

.search {
  padding: 18px 0 0 10px;
  margin-bottom: 10px;
  border-radius: 2px;
  /* border: 1px solid var(--el-card-border-color); */
}

.searchBarCard .el-form-item {
  margin-bottom: 0px;
}

.marginTRL {
  margin: 20px 0px 10px 10px;

  .el-input-edu {
    width: 180px;
  }

  .width {
    width: 100px;
  }
}

.marginTop10 {
  ::v-deep {
    // .is-active {
    //     width: 100px;
    // }

    .el-radio-button__inner {
      width: 100%;
    }
  }
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

::v-deep {
  .el-carousel__container {
    height: 50px;
  }
}

::v-deep {
  .el-input__count {
    right: 15px;
  }
}

.i-hover:hover {
  cursor: pointer;
}

.i-hoverD:hover {
  cursor: default;
}

.data-count {
  width: 160px;
  height: 80px;
  color: #000;
  font-weight: 700;
  border-radius: 10px;

  .data-count-num {
    font-size: 20px;
  }
}

.bg1 {
  color: rgb(29, 45, 133);
  background-image: linear-gradient(
    45deg,
    rgb(235, 237, 255),
    rgb(247, 247, 255),
    rgb(235, 237, 255)
  );
}

.bg2 {
  color: rgb(24, 73, 98);
  background-image: linear-gradient(
    45deg,
    rgb(232, 247, 254),
    rgb(235, 248, 254),
    rgb(221, 241, 253)
  );
}

.bg3 {
  color: rgb(16, 71, 62);
  background-image: linear-gradient(
    45deg,
    rgb(234, 252, 253),
    rgb(241, 254, 252),
    rgb(224, 251, 253)
  );
}

.bg4 {
  color: rgb(11, 65, 9);
  background-image: linear-gradient(
    45deg,
    rgb(230, 250, 234),
    rgb(235, 251, 233),
    rgb(219, 247, 233)
  );
}

// @media screen and (max-width: 1200px) {
//     .course-detail {
//         display: block;
//     }

//     .homework-header {
//         display: flex;
//         flex-direction: column;
//         align-items: center;

//         ::v-deep {
//             .el-form-item__label {
//                 width: 80px;
//             }
//         }

//         .homework-num {
//             margin: 10px 0;
//         }

//         .homework-detail {
//             display: flex;
//             justify-content: flex-start;
//         }
//     }

// }

// @media screen and (min-width:1200px) {
//     .homework-header {
//         display: block;

//         .homework-num {
//             margin-left: 60px;
//             margin-top: 5px;
//         }

//         ::v-deep {
//             .el-form-item__label {
//                 width: 80px;
//             }
//         }

//     }
// }
</style>
    