<template>
  <div class="app-container">
    <border-container class="marginBottom10 border-container" :height="15" :isShowTitle="false" :isBgShow="false">
      <template #content>
        <div class="" style="padding: 10px 0 0px 10px;">
          <el-form ref="queryEnvFormRef" :model="queryEnvParams" :inline="true">
            <el-form-item label="实操云名称" prop="vmName">
              <el-input v-model="queryEnvParams.vmName" id="vmName" placeholder="请输入实操云名称" clearable
                @keyup.enter="handleQuery" />
            </el-form-item>
            <get-university :queryParams="queryEnvParams"></get-university>
            <!-- <el-form-item label="所属课程" prop="groupId">
                            <el-select v-model="queryParams.groupId" placeholder="请选择课程">
                                <el-option value="">全部课程</el-option>
                                <el-option v-for="item in courseList" :key="item.id" :label="item.name"
                                    :value="item.id"></el-option>
                            </el-select>
                        </el-form-item> -->
            <el-form-item>
              <el-button type="success" class="editSuccess" icon="el-icon-search" @click="handleQuery">搜索</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" class="editPrimary" icon="el-icon-refresh"
                @click="resetQuery('queryEnvFormRef')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </border-container>
    <el-card class="marginTop10">
      <template #header>
        <el-button type="primary" icon="el-icon-plus" @click="goToDetail">创建实操云环境</el-button>
      </template>
      <el-table :data="vmsList" style="width: 100%" v-loading="loading" element-loading-text="加载中"
        element-loading-spinner="el-icon-loading">
        <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
        <el-table-column prop="vmId" label="实操云ID" min-width="100" align="center">
          <template #default="scope">
            <!-- <el-button type="primary" size="small" @click.stop="handleShowDetail(scope.row)">查看详情</el-button> -->
            <div v-if="scope.row.status == '0' || scope.row.status == '5'">
              <el-tooltip class="item" effect="dark" :content="scope.row.vmId" placement="top-start">
                <div class="view-text">{{ scope.row.vmId }}</div>
              </el-tooltip>
            </div>
            <div v-else-if="scope.row.status == '2'">
              <i style="color: rgb(24, 144, 255)" class="el-icon-loading"></i>
              创建中
            </div>
            <!-- <div v-else-if="scope.row.status == '5'">
                                    <i style=" color: rgb(24,144,255)" class="el-icon-loading"></i>
                                    配置修改中
                                </div> -->
          </template>
        </el-table-column>


        <el-table-column prop="vmName" label="实操云名称" min-width="100" align="center">
          <template #default="scope">
            <!-- <el-button type="primary" size="small" @click.stop="handleShowDetail(scope.row)">查看详情</el-button> -->
            <a v-if="scope.row.status == '0'" @click="goToEnvDetail(scope.row.vmId)" class="primaryColor">{{
              scope.row.vmName }}</a>
            <span v-else>
              {{ scope.row.vmName }}
            </span>
          </template> </el-table-column>i
        <el-table-column prop="hostname" label="主机名称" min-width="100" align="center">
        </el-table-column>
        <el-table-column v-if="userRolesNames == '系统最高管理员'" label="所属高校" prop="company" min-width="120"
          align="center"></el-table-column>
        <el-table-column prop="powerState" label="电源状态" width="160" align="center">
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
            <el-switch :disabled="scope.row.status == '2' || scope.row.status == '5'" class="switchStyle"
              @change="handlePowerStatus(scope.row)" v-model="scope.row.powerState == 'poweredOn'" active-text="开机"
              inactive-text="关机" active-color="#02C733" inactive-color="#A6A6A6">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="user" label="创建人" width="100" align="center">
        </el-table-column>
        <el-table-column label="使用人数" prop="userCount" width="100" align="center">
        </el-table-column>
        <el-table-column prop="cpuUsage" label="CPU使用" width="100" align="center">
          <template #default="scope">
            <div :class="scope.row.cpuAlarm ? scope.row.cpuAlarm == 'Warning' ? 'primaryColoro' : 'primaryColorr' : ''">
              {{ scope.row.cpuUsage }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="storageUsage" label="存储使用" width="100" align="center">
        </el-table-column>
        <el-table-column prop="memoryUsage" label="内存使用" width="100" align="center">
          <template #default="scope">
            <div
              :class="scope.row.memoryAlarm ? scope.row.memoryAlarm == 'Warning' ? 'primaryColoro' : 'primaryColorr' : ''">
              {{ scope.row.memoryUsage }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="diskUsage" label="磁盘使用" width="100" align="center">
        </el-table-column>
        <el-table-column prop="cpu" label="配置" width="100" align="center">
          <template #default="scope">
            <!-- <el-button type="primary" size="small" @click.stop="handleShowDetail(scope.row)">查看详情</el-button> -->
            <div>
              {{ `${scope.row.cpu}核 ${scope.row.memory / 1024}G` }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="150" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="300" fixed="right">
          <template #default="scope">
            <div v-if="scope.row.status == '0'">
              <!-- <el-button type="success" class="editSuccess" size="small"
                                v-if="scope.row.powerState == 'poweredOff'"
                                @click.stop="handlePoweron(scope.row)">开机</el-button>
                            <el-button size="small" type="warning" class="editWarning"
                                v-if="scope.row.powerState == 'poweredOn'" @click.stop="handleOff(scope.row)">关机</el-button>
                            <el-divider direction="vertical"></el-divider> -->

              <el-button type="info" class="editInfo" size="small" :disabled="scope.row.powerState == 'poweredOff'"
                @click.stop="reboot(scope.row)">重启</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button size="small" type="primary" class="editPrimary" slot="reference"
                @click="handleUpdate(scope.row)">修改</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-popconfirm title="确定删除吗？" @onConfirm="handleDelete(scope.row)" onCancel="">
                <el-button size="small" type="danger" class="editDanger" slot="reference">
                  删除
                </el-button>
              </el-popconfirm>
              <el-divider direction="vertical"></el-divider>
              <el-link type="primary" class="editPrimary" @click.stop="handleUserUpdate(scope.row)">多用户</el-link>
              <!-- <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link primaryColor">
                                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="{ text: 'update', value: scope.row }"
                                        @click.stop="handleUpdate(scope.row)">调整配置</el-dropdown-item>
                                    <el-dropdown-item :command="{ text: 'users', value: scope.row }"
                                        @click.stop="handleUpdate(scope.row)">多用户</el-dropdown-item>
                                    <el-dropdown-item :command="{ text: 'poweron', value: scope.row }"
                                        @click.stop="handlePoweron(scope.row)"
                                        :disabled="scope.row.powerState == 'poweredOn'">开机</el-dropdown-item>
                                    <el-dropdown-item :command="{ text: 'reboot', value: scope.row }"
                                        @click.stop="reboot(scope.row)"
                                        :disabled="scope.row.powerState == 'poweredOff'">重启</el-dropdown-item>
                                    <el-dropdown-item :command="{ text: 'handleOff', value: scope.row }"
                                        @click.stop="handleOff(scope.row)"
                                        :disabled="scope.row.powerState == 'poweredOff'">关机</el-dropdown-item>

                                </el-dropdown-menu>
                            </el-dropdown> -->
            </div>
            <div v-else-if="scope.row.status == '2'">
              <i style="color: rgb(24, 144, 255)" class="el-icon-loading"></i>
              创建中
            </div>
            <div v-else-if="scope.row.status == '5'">
              <i style="color: rgb(24, 144, 255)" class="el-icon-loading"></i>
              配置修改中
            </div>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
        @pagination="searchQuery" />
    </el-card>

    <el-dialog :title="textMap[dialog.status]" :visible.sync="dialog.visible" @close="cancel" class="dialog"
      width="50vw">
      <el-form ref="ruleForm" :model="ruleForm">
        <el-form-item label="当前实例">
          {{ vmName }}
        </el-form-item>
        <vm-user-list class="vm-user-list" :labelText="''" @clickAddUser="clickAddUser"
          :userCounts="ruleForm.userCounts" @changeRandom="changeRandom"></vm-user-list>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-loading="userLoading" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
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
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';
import Pagination from "@/components/Pagination";
import VmUserList from "@/components/VmUserList";
import BorderContainer from "@/components/BorderContainer";
import GetUniversity from "@/components/GetUniversity";
import {
  poweroff,
  poweron,
  reboot,
  suspend,
  getVmsByCurrentUserForPagelC,
  deleteVMs,
  getVmByVmId,
  changeUserCounts,
} from "@/api/edu/cloud";
import { getCourseList } from "@/api/edu/course";

import { checkPermission } from "@/utils/validate";
import { Message } from "element-ui";
import { isEqual } from "lodash";
import { Base64 } from "js-base64";
import { mapGetters } from "vuex"

export default {
  //import 引入的组件需要注入到对象中才能使用
  name: "courseMng",
  components: {
    Pagination,
    VmUserList,
    BorderContainer,
    GetUniversity
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
      queryEnvParams: {
        vmName: "",
        groupId: "",
        universityName: "",
      },
      loading: false,
      vmsList: [], //实操云列表
      isRequestVmStatus: false,
      requestTime: 30000, //时间周期30s
      setInter: null,
      POWERSTATE: POWERSTATE,
      courseList: [],
      textMap: {
        update: `多用户管理`,
        create: `添加`,
        look: "查看",
        // look: "查看告警推送规则",
      },
      dialog: {
        visible: false,
        status: "",
      },
      ruleForm: {
        userCounts: [],
      },
      vmId: "",
      vmName: "",
      userLoading: false,
    };
  },
  watch: {
    isRequestVmStatus: {
      handler(newValue, oldValue) {
        console.log("isRequestVmStatus", newValue, "触发");
        //状态为true时，开始计时，判断计时器，是否需要取消
        if (newValue) {
          this.watchVmStatusAndRequest();
        }
      },
    },
  },
  computed: {
    ...mapGetters(['userRolesNames'])
  },
  created() {
    this.getList();
  },
  methods: {
    //监测实操云创建状态
    watchVmStatusAndRequest() {
      var time = setTimeout(() => {
        if (time) {
          clearTimeout(time);
        }
        this.isRequestVmStatus = false;
        this.getList(); //计时开始
      }, this.requestTime);
    },
    //
    changeRandom(arr) {
      this.ruleForm.userCounts = arr;
    },
    clickAddUser(arr) {
      this.ruleForm.userCounts = arr;
    },

    cancel() {
      let _this = this;
      _this.dialog.visible = false;

      // _this.dialog = dialog;
      _this.$refs.ruleForm.resetFields();
    },

    async queryVmByVmId(id) {
      const res = await getVmByVmId({ id: id });
      const vmInfo = res && res.resData;
      const userCountsToPwd =
        vmInfo &&
        vmInfo.userCountsToPwd &&
        Base64.decode(vmInfo.userCountsToPwd);
      const multiUsers = userCountsToPwd && JSON.parse(userCountsToPwd);
      const arr = [];
      if (multiUsers && multiUsers.length > 0) {
        multiUsers.map((item) => {
          let data = {};
          for (var key in item) {
            if (
              !isEqual(key, "randomPwd") &&
              !isEqual(key, "userName") &&
              !isEqual(key, "userId")
            ) {
              data = {
                username: key,
                password: item[key],
              };
            }
          }
          // data.randomPwd = item.randomPwd;
          data.randomPwd = false;
          arr.push(data);
        });
      }
      this.ruleForm.userCounts = arr;
      this.dialog.visible = true;
      this.dialog.status = "update";
    },

    handleUserUpdate(row) {
      this.queryVmByVmId(row.vmId);
      this.vmId = row.vmId;
      this.vmName = row.vmName;
    },
    handleCommand(command) {
      console.log(command);
      const { text, value } = (command && command) || "";
      if (text == "update") {
        this.handleUpdate(value);
      } else if (text == "poweron") {
        this.handlePoweron(value);
      } else if (text == "reboot") {
        this.reboot(value);
      } else if (text == "handleOff") {
        this.handleOff(value);
      } else if (text == "users") {
        this.queryVmByVmId(value.vmId);
        this.vmId = value.vmId;
        this.vmName = value.vmName;
      }
    },
    handlePowerStatus(row) {
      console.log(row.powerState);
      if (row.powerState == "poweredOn") {
        this.handleOff(row);
      } else {
        this.handlePoweron(row);
      }
    },
    handlePoweron(row) {
      let data = {
        id: row.vmId,
        hostName: row.hostName,
      };
      this.$confirm(
        "多用户使用的云服务器，对云服务器的电源操作会影响到所有用户<br/><span style='color:red;'>*开机时间较长，请稍等</span>",
        "确定开机吗？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
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
        .catch(() => { });
    },
    reboot(row) {
      let vmID = row.vmId;
      this.$confirm(
        "多用户使用的云服务器，对云服务器的电源操作会影响到所有用户<br/><span style='color:red;'>*重启时间较长，请稍等</span>",
        "确定重启吗？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
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
        .catch(() => { });
    },
    handleOff(row) {
      let vmID = row.vmId;

      this.$confirm(
        "多用户使用的云服务器，对云服务器的电源操作会影响到所有用户<br/><span style='color:red;'>*关机时间较长，请稍等</span>",
        "确定关机吗？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
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
        .catch(() => { });
    },

    goToEnvDetail(id) {
      this.$router.push({
        path: "/cloudEnvironment/cloudEnvDetail",
        query: { id, str: "list" },
      });
    },

    goToDetail(id) {
      let isLicenseEnabled = this.$store.state.user.isLicenseEnabled;
      if (!isLicenseEnabled) {
        this.$message.warning("抱歉，系统已过期，需联系官方工作人员续费");
        return;
      }
      this.$router.push({ path: "/cloudEnvironment/createEnvironment" });
    },
    async queryCourseList() { },
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
    async getList() {
      this.loading = true;
      const reponse = await getVmsByCurrentUserForPagelC(this.listQuery);
      let resData = reponse.resData;
      let vmsList = resData.result;
      vmsList.map((item) => {
        const userCountsToPwd =
          item && item.userCountsToPwd && Base64.decode(item.userCountsToPwd);
        const multiUsers = userCountsToPwd && JSON.parse(userCountsToPwd);
        item.userCount = (multiUsers && multiUsers.length) || 0;

        //item.status 为 2或者5 需要请求
        let status = item.status;
        let setInter = this.setInter;
        let isRequestVmStatus = this.isRequestVmStatus;
        console.log("status", isRequestVmStatus);
        if ((status == "2" || status == "5") && !isRequestVmStatus) {
          this.isRequestVmStatus = true;
        }
      });
      this.vmsList = vmsList;
      this.total = resData.total;
      this.loading = false;
    },

    checkoutUserName(userCounts) {
      let nameList = [];
      console.log(userCounts);
      userCounts &&
        userCounts.length > 0 &&
        userCounts.map((item) => {
          nameList.push(item.username);
        });
      return nameList;
    },

    submitForm() {
      let vmId = this.vmId;
      let userCounts = this.ruleForm.userCounts;
      let nameList = this.checkoutUserName(userCounts);
      const setArr = Array.from(new Set(nameList));
      if (nameList.length > setArr.length) {
        this.$message.error("多用户 VM用户名必须唯一，请重新设置");
        return;
      }
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.userLoading = true;
          changeUserCounts({ vmId, userCounts })
            .then((res) => {
              if (res && res.flag) {
                this.$message.success("多用户修改成功");
                this.dialog.visible = false;
                this.$refs["ruleForm"].resetFields();
                this.userLoading = false;
              } else {
                this.userLoading = false;
              }
            })
            .finally(() => {
              this.userLoading = false;
            });
        }
      });
    },
    handleQuery() {
      this.listQuery.page = 1;
      this.listQuery.params = this.queryEnvParams;
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
      let dialog = {
        status: "create",
        visible: true,
      };
      _this.dialog = dialog;
    },

    handleUpdate(row) {
      let id = row.vmId;
      this.$router.push({
        path: "/cloudEnvironment/createEnvironment",
        query: { id },
      });
    },

    async handleDelete(row) {
      const { vmId } = { ...row };
      this.$confirm(
        "删除实操云会同步删除该实操云中的所有数据，无法恢复，请慎重选择！",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
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
        .catch(() => { });
    },
  },
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() { },
};
</script>
<style lang="scss" scoped>
.marginTop10 {
  margin-top: 10px;
}

.vm-user-list {
  ::v-deep {
    .el-form-item__content {
      margin-left: 0;
    }
  }
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
//         top: 6px;
//       }
//     }
//   }
// }

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
