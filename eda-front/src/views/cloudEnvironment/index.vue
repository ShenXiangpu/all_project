<template>
  <div class="app-container">
    <border-container
      
      class="marginBottom10 border-container"
      :height="15"
      :isShowTitle="false"
      :isBgShow="false"
    >
      <template #content>
        <div class="" style="padding: 20px 0 10px 10px">
          <el-form ref="queryEnvFormRef" :model="queryEnvParams" :inline="true">
            <el-form-item label="设计云名称" prop="vmName">
              <el-input
                v-model="queryEnvParams.vmName"
                id="vmName"
                placeholder="请输入设计云名称"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>
            <!-- <el-form-item label="所属课程" prop="groupId">
                            <el-select v-model="queryParams.groupId" placeholder="请选择课程">
                                <el-option value="">全部课程</el-option>
                                <el-option v-for="item in courseList" :key="item.id" :label="item.name"
                                    :value="item.id"></el-option>
                            </el-select>
                        </el-form-item> -->
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
      </template>
    </border-container>

    <el-card class="marginTop10">
      <template #header>
        <el-button type="primary" icon="el-icon-plus" @click="goToDetail"
          >创建IC设计云</el-button
        >
      </template>
      <el-table :data="vmsList" style="width: 100%" v-loading="loading">
        <el-table-column
          type="index"
          label="序号"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="vmId"
          label="设计云ID"
          min-width="100"
          align="center"
        >
          <template #default="scope">
            <!-- <el-button type="primary" size="small" @click.stop="handleShowDetail(scope.row)">查看详情</el-button> -->
            <div v-if="scope.row.status == '0' || scope.row.status == '5'">
              {{ scope.row.vmId }}
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
        <el-table-column
          prop="vmName"
          label="IC设计云名称"
          min-width="100"
          align="center"
        >
          <template #default="scope">
            <!-- <el-button type="primary" size="small" @click.stop="handleShowDetail(scope.row)">查看详情</el-button> -->
            <a
              v-if="scope.row.status == '0'"
              @click="goToEnvDetail(scope.row.vmId)"
              class="primaryColor"
              >{{ scope.row.vmName }}</a
            >
            <span v-else>
              {{ scope.row.vmName }}
            </span>
          </template> </el-table-column
        >i
        <el-table-column
          prop="hostname"
          label="主机名称"
          min-width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="powerState"
          label="电源状态"
          width="160"
          align="center"
        >
          <template #default="scope">
            <el-switch
              :disabled="scope.row.status == '2' || scope.row.status == '5'"
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
        <el-table-column prop="cpu" label="配置" width="100" align="center">
          <template #default="scope">
            <!-- <el-button type="primary" size="small" @click.stop="handleShowDetail(scope.row)">查看详情</el-button> -->
            <div>{{ `${scope.row.cpu}核 ${scope.row.memory / 1024}G` }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="user" label="创建人" width="100" align="center">
        </el-table-column>
        <!-- <el-table-column
          label="使用人数"
          prop="userCount"
          width="100"
          align="center"
        >
        </el-table-column> -->
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
                type="info"
                class="editInfo"
                size="small"
                
                :disabled="scope.row.powerState == 'poweredOff'"
                @click.stop="reboot(scope.row)"
                >重启</el-button
              >
              <el-button
                size="small"
                type="primary"
                class="editPrimary marginRight10" 
                slot="reference"
                @click="handleUpdate(scope.row)"
                >修改</el-button
              >
              <el-popconfirm
                title="确定删除吗？"
                @onConfirm="handleDelete(scope.row)"
                onCancel=""
              >
                <el-button
                  size="small"
                  type="danger"
                  class="editDanger marginRight10"
                  slot="reference"
                >
                  删除
                </el-button>
              </el-popconfirm>
              <el-button
                type="info"
                class="editInfo marginRight10"
                size="small"
                @click.stop="handleFileMng(scope.row)"
                >文件管理</el-button
              >
              <!-- <el-divider direction="vertical"></el-divider>
              <el-link
                type="primary"
                class="editPrimary"
                @click.stop="handleUserUpdate(scope.row)"
                >多用户</el-link
              > -->
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

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="searchQuery"
      />
    </el-card>

    <el-dialog
      :title="textMap[dialog.status]"
      :visible.sync="dialog.visible"
      @close="cancel"
      class="dialog"
      width="50vw"
    >
      <el-form ref="ruleForm" :model="ruleForm">
        <el-form-item label="当前实例">
          {{ vmName }}
        </el-form-item>
        <vm-user-list
          class="vm-user-list"
          :labelText="''"
          @clickAddUser="clickAddUser"
          :userCounts="ruleForm.userCounts"
          @changeRandom="changeRandom"
        ></vm-user-list>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-loading="userLoading" @click="submitForm"
          >确 定</el-button
        >
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

export default {
  //import 引入的组件需要注入到对象中才能使用
  name: "courseMng",
  components: {
    Pagination,
    VmUserList,
    BorderContainer,
  },
  props: {},
  data() {
    return {
      checkPermission,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        params: "",
      },
      queryEnvParams: {
        vmName: "",
        groupId: "",
      },
      loading: false,
      vmsList: [], //设计云列表
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
  watch: {},
  computed: {},
  created() {
    this.getList();
  },
  methods: {
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
    //文件管理
    handleFileMng(row) {
      this.$router.push({
        path: "/classMng/fileMng",
        query: {
          id: row.vmId,
        },
      });
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

    goToEnvDetail(id) {
      this.$router.push({
        path: "/classMng/cloudEnvDetail",
        query: { id },
      });
    },

    goToDetail(id) {
      let isLicenseEnabled = this.$store.state.user.isLicenseEnabled;
      console.log(isLicenseEnabled);
      if (!isLicenseEnabled) {
        this.$message.warning("抱歉，系统已过期，需联系官方工作人员续费");
        return;
      }
      this.$router.push({ path: "/classMng/createEnvironment" });
    },
    async queryCourseList() {},
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
      // const res = await getCourseList(this.listQuery);
      // let courseList = res.resData;
      let resData = reponse.resData;
      let vmsList = resData.result;
      vmsList.map((item) => {
        const userCountsToPwd =
          item && item.userCountsToPwd && Base64.decode(item.userCountsToPwd);
        const multiUsers = userCountsToPwd && JSON.parse(userCountsToPwd);
        item.userCount = (multiUsers && multiUsers.length) || 0;
        // courseList.map((i) => {
        //   if (i.id == item.groupId) {
        //     item.groupName = i.name;
        //   }
        // });
      });

      // this.courseList = courseList;
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
        path: "/classMng/createEnvironment",
        query: { id },
      });
    },

    async handleDelete(row) {
      const { vmId } = { ...row };
      this.$confirm(
        "删除设计云会同步删除该设计云中的所有数据，无法恢复，请慎重选择！",
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
        .catch(() => {});
    },
  },
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {},
};
</script>
<style lang='scss' scoped>
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
    