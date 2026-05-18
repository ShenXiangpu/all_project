<template>
  <div>
    <el-card v-loading="envLoading" class="el-card-edu" style="height: 100%">
      <el-row :gutter="20">
        <el-col :span="6" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <border-container
            class="marginBottom10"
            title="工具信息"
            :height="15"
            :isBgShow="false"
          >
            <template #content>
              <div class="padding20 left-container">
                <div
                  v-for="(item, index) in vmEnvDetail && vmEnvDetail.tools"
                  :key="item.company"
                >
                  <div class="font16 fontW7" style="color: #333">
                    {{ item.company }}
                  </div>
                  <div class="font14" v-for="i in item.edaTools" :key="i.id">
                    <div class="flex">
                      <el-tooltip
                        class="tps"
                        effect="define"
                        :content="i.toolName"
                        placement="top"
                      >
                        <div class="view-text toolName" style="">
                          {{ i.toolName }}
                        </div>
                      </el-tooltip>
                      <div class="view-text toolVersion" style="">
                        <el-tag size="mini" effect="dark">
                          {{
                            (i &&
                              i.versions &&
                              i.versions[0] &&
                              i.versions[0].toolVersion) ||
                            "暂无"
                          }}</el-tag
                        >
                      </div>
                    </div>
                  </div>
                  <el-divider
                    v-if="vmEnvDetail && vmEnvDetail.tools.length !== index + 1"
                  ></el-divider>
                </div>
              </div>
            </template>
          </border-container>
        </el-col>
        <el-col :span="18" :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
          <el-row :gutter="20">
            <el-col class="marginBottom10" :span="24">
              <border-container
                class="marginBottom10"
                title="登录信息"
                :height="15"
                :isBgShow="false"
              >
                <template #content>
                  <div class="padding20 loginInfo-container">
                    <div
                      class="flex justify-between align-center marginBottom10 font14"
                      v-for="(item, index) in vmEnvDetail.userCountsToPwd"
                      :key="item.userId"
                    >
                      <div class="flex">
                        <div class="flex">
                          <div class="detail-user-num primaryBgColor">
                            {{ index + 1 }}
                          </div>
                          <div
                            class="detail-user-name primaryColor pointer"
                            @click="showUserInfo(item.userId)"
                          >
                            {{ item.userName }}
                          </div>
                        </div>
                        <div class="marginRt20">
                          登录账号：{{ item.accountName }}
                        </div>
                        密码：<password
                          @copyPassWord="copyPassWord"
                          :password="item.accountPwd"
                        >
                        </password>
                      </div>
                      <div>
                        <!-- <el-button type="primary" class="editPrimary" size="small"
                                                    :disabled="vmEnvDetail && vmEnvDetail.powerState !== 'poweredOn'"
                                                    v-if="userRolesNames == '学生'" @click="handleAddFile">提交作业 </el-button> -->
                        <!-- <el-divider direction="vertical" v-if="userRolesNames == '学生'"></el-divider> -->
                        <restart-button
                          :powerState="vmEnvDetail.powerState"
                          @handleDeskTopReOpen="handleDeskTopReOpen(item)"
                        >
                        </restart-button>
                        <el-button
                          :disabled="
                            vmEnvDetail &&
                            vmEnvDetail.powerState !== 'poweredOn'
                          "
                          :icon="POWERSTATE[vmEnvDetail.powerState].icon"
                          :type="
                            vmEnvDetail && vmEnvDetail.powerState == 'poweredOn'
                              ? POWERSTATE[vmEnvDetail.powerState].type
                              : 'danger'
                          "
                          :class="
                            vmEnvDetail && vmEnvDetail.powerState == 'poweredOn'
                              ? POWERSTATE[vmEnvDetail.powerState].class
                              : 'editDanger'
                          "
                          size="small"
                          @click="goToNovnc(item.accountName)"
                          >进入设计云环境</el-button
                        >
                      </div>
                    </div>
                  </div>
                </template>
              </border-container>
            </el-col>

            <el-col :span="12" :xs="16" :sm="16" :md="16" :lg="12" :xl="12">
              <border-container
                class="border-container"
                title="基本信息"
                :height="15"
                :isBgShow="false"
              >
                <template #content>
                  <div class="padding20 font14 lab-container">
                    <el-row :gutter="20">
                      <el-col :span="12" :xl="12" class="marginBottom10">
                        设计云名称：{{ vmEnvDetail.vmName }}
                      </el-col>
                      <el-col :span="12" :xl="12" class="marginBottom10">
                        设计云ID：{{ vmEnvDetail.vmId }}
                      </el-col>

                      <el-col :span="12" :xl="12" class="marginBottom10">
                        IP：{{ vmEnvDetail.ip }}
                      </el-col>

                      <el-col :span="12" :xl="12" class="marginBottom10">
                        FTP：{{ vmEnvDetail.ftp || "-" }}
                        <el-tooltip
                          class="item"
                          effect="dark"
                          content="提示：FTP时选中UTF-8，否则可能会导致中文乱码"
                          placement="top-start"
                        >
                          &nbsp;<i class="el-icon-info primaryColoro"></i>
                        </el-tooltip>
                      </el-col>

                      <el-col
                        :span="12"
                        :xl="12"
                        class="marginBottom10"
                        v-if="vmEnvDetail && vmEnvDetail.password"
                      >
                        root密码：
                        <password
                          @copyPassWord="copyPassWord"
                          :password="vmEnvDetail.password"
                        >
                        </password>
                      </el-col>

                      <el-col :span="12" :xl="12" class="marginBottom10">
                        创建时间：{{ vmEnvDetail.createTime }}
                      </el-col>
                      <el-col :span="12" :xl="12" class="marginBottom10">
                        到期时间：{{ vmEnvDetail.expirationTime }}
                      </el-col>

                      <el-col :span="12" :xl="12" class="marginBottom10">
                        CPU：{{ vmEnvDetail.cpu }}核
                      </el-col>
                      <el-col :span="12" :xl="12" class="marginBottom10">
                        内存：{{ vmEnvDetail.memory / 1024 }}G
                      </el-col>
                      <el-col :span="12" :xl="12" class="marginBottom10">
                        云盘：{{ (vmEnvDetail.disk / 1024).toFixed(2) }}G
                      </el-col>
                      <el-col :span="12" :xl="12" class="marginBottom10">
                        操作系统：{{ vmEnvDetail.os }}
                      </el-col>
                    </el-row>
                  </div>
                </template>
              </border-container>
            </el-col>

            <el-col :span="8" :xs="8" :sm="8" :md="8" :lg="12" :xl="12">
              
              <el-row gutter="20">
                <el-col :span="8" :xs="8" :sm="8" :md="12" :lg="12" :xl="12">
                  <border-container
                    class="border-container"
                    title="IP信息"
                    :height="15"
                    :isBgShow="false"
                  >
                    <template #content>
                      <div class="padding20 lab-container">
                        <el-row :gutter="10">
                          <el-col class="marginBottom20 font14 " :xl="24">
                            <!-- <el-col class="marginBottom20" v-for="item in 3" :xl="6"> -->
                            <el-tooltip
                              v-for="item in vmEnvDetail.ipsInfoList"
                              :key="item.id"
                              class="item"
                              effect="define"
                              :content="item.remark"
                              :disabled="!item.remark"
                              placement="top-start"
                            >
                              <el-tag
                                style="margin: 0 20px 20px 0"
                                type="primary"
                                >{{ item.displayName }}</el-tag
                              >
                            </el-tooltip>
                          </el-col>
                        </el-row>
                      </div>
                    </template>
                  </border-container>
                </el-col>

                <el-col :span="8" :xs="8" :sm="8" :md="12" :lg="12" :xl="12">
                  <border-container
                    class="border-container"
                    title="PDK信息"
                    :height="15"
                    :isBgShow="false"
                  >
                    <template #content>
                      <div class="padding20 lab-container">
                        <el-row :gutter="10">
                          <el-col class="marginBottom20 font14" :xl="24">
                            <!-- <el-col class="marginBottom20" v-for="item in 3" :xl="6"> -->
                            <el-tooltip
                              v-for="item in vmEnvDetail.pdksInfoList"
                              :key="item.id"
                              class="item"
                              effect="define"
                              :content="item.remark"
                              :disabled="!item.remark"
                              placement="top-start"
                            >
                              <el-tag
                                style="margin: 0 20px 20px 0"
                                type="primary"
                                >{{ item.displayName }}</el-tag
                              >
                            </el-tooltip>
                          </el-col>
                        </el-row>
                      </div>
                    </template>
                  </border-container>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>

    <el-dialog
      title="提交作业"
      :visible.sync="homeworkDialog"
      @close="cancelHome"
      class="dialog"
      width="50vw"
    >
      <el-card class="content-top">
        <el-form
          :model="selectForm"
          :rules="rules"
          ref="selectRule"
          label-width="100px"
        >
          <el-form-item label="作业" prop="homeWorkDestDir">
            <el-select
              @change="handleHomeWorkId"
              v-model="selectForm.homeWorkDestDir"
              placeholder="请选择课程作业"
            >
              <el-option
                v-for="item in homeNameList"
                :key="item.id"
                :value="item.id"
                :label="item.homeworkName"
                >{{ item.homeworkName }}</el-option
              >
            </el-select>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card>
        <file-List
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
          </template>
        </file-List>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelHome">取 消</el-button>
        <el-button
          type="primary"
          :loading="commitHomeloading"
          @click="submitForm('selectRule')"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="userInfoDialogSon"
      @close="closeUserInfoDialog"
      class="dialog-info"
    >
      <div class="info-container">
        <div class="first-name">
          {{
            userInfo && userInfo.userName && userInfo.userName.substring(0, 1)
          }}
        </div>
        <div class="flex">
          <div class="username">
            姓名：{{ (userInfo && userInfo.userName) || "暂无" }}
          </div>
          <div class="role">
            <el-tag size="mini">{{
              (userInfo && userInfo.roleName) || "暂无"
            }}</el-tag>
          </div>
        </div>
        <div>
          {{ userInfo && userInfo.roleName == "学生" ? "学号：" : "工号："
          }}{{ (userInfo && userInfo.studentNum) || "暂无" }}
        </div>
        <div class="phone">
          手机：{{ (userInfo && userInfo.phone) || "暂无" }}
        </div>
        <div class="email">
          邮箱：{{ (userInfo && userInfo.email) || "暂无" }}
        </div>
      </div>
    </el-dialog>
  </div>
</template>
    
<script>
const POWERSTATE = {
  poweredOn: {
    text: "运行中",
    icon: "el-icon-success",
    color: "#319400",
    type: "success",
    class: "editSuccess",
  },
  poweredOff: {
    text: "关机",
    icon: "el-icon-remove",
    type: "danger",
    class: "editDanger",
  },
  suspended: {
    text: "挂起",
    icon: "el-icon-info",
    color: "#faad14",
    type: "warning",
    class: "editWarning",
  },
};
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';
import { mapGetters } from "vuex";
import Password from "./components/Password";
import RestartButton from "./components/RestartButton";

import copy from "copy-to-clipboard";
import FileList from "@/components/FileList";
import BorderContainer from "@/components/BorderContainer";

export default {
  //import 引入的组件需要注入到对象中才能使用
  name: "EnvDetail",
  components: {
    Password,
    RestartButton,
    FileList,
    BorderContainer,
  },
  props: {
    vmEnvDetail: {
      type: Object,
      default() {},
    },
    envLoading: {
      type: Boolean,
      default: false,
    },
    resetTLoading: {
      type: Boolean,
      default: false,
    },
    homeworkDialog: {
      type: Boolean,
      default: false,
    },
    userInfoDialog: {
      type: Boolean,
      default: false,
    },
    homeNameList: {
      type: Array,
      default: [],
    },
    filesList: {
      type: Array,
      default: [],
    },
    commitHomeloading: {
      type: Boolean,
      default: false,
    },
    vmId: {
      type: String,
      default: "",
    },
    userInfo: {
      type: Object,
      default() {},
    },
  },
  watch: {
    userInfoDialog: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.userInfoDialogSon = newVal;
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      isShow: false,
      POWERSTATE: POWERSTATE,
      selectForm: {
        homeWorkDestDir: "",
      },
      rules: {
        homeWorkDestDir: [
          {
            required: true,
            message: "请选择作业",
            trigger: "blur",
          },
        ],
      },
      homeWorkSources: [],
      userInfoDialogSon: false,
    };
  },
  computed: {
    ...mapGetters(["userRolesNames"]),
  },
  created() {},
  methods: {
    closeUserInfoDialog() {
      this.userInfoDialogSon = false;
      this.$emit("closeUserInfoDialog");
    },

    showUserInfo(id) {
      this.$emit("showUserInfo", id);
    },
    handleSelectionChange(val) {
      let homeWorkSources = [];
      val &&
        val.map((i) => {
          let vmId = this.vmId;
          const { id, dir, fileName, lastModifyTime, size } = i;
          homeWorkSources.push({
            fileName,
            filePath: id,
            isDir: dir,
            fileSize: size,
            editTime: lastModifyTime,
            vmId,
          });
        });
      this.homeWorkSources = homeWorkSources;
    },

    load(tree, treeNode, resolve) {
      this.$emit("load", { tree, treeNode, resolve });
    },

    cancelHome() {
      this.selectForm.homeWorkDestDir = "";
      this.$emit("cancelHome");
    },
    submitForm(ref) {
      this.$refs[ref].validate((valid) => {
        if (valid) {
          let homeworkId = this.homeworkId;
          let homeWorkSources = this.homeWorkSources;
          if (!(homeWorkSources && homeWorkSources.length > 0)) {
            this.$message.warning("请勾选要提交的作业");
            return;
          }
          let params = {
            homeworkId,
            homeWorkSources,
          };
          this.$message.success("作业提交中");
          this.$emit("submitFormHomeWork", params);
        }
      });
    },

    handleHomeWorkId(val) {
      this.homeNameList.map((item) => {
        if (val == item.id) {
          this.homeWorkDestDir = item.homeworkPath;
        }
      });
      this.homeworkId = val;
    },

    copyPassWord(pass) {
      copy(pass) && this.$message.success(`复制成功`);
    },
    goToNovnc(name) {
      this.$emit("goToNovnc", name);
    },
    handleAddFile() {
      this.$emit("handleAddFile");
    },
    handleDeskTopReOpen(item) {
      this.$emit("handleDeskTopReOpen", item.accountName);
    },
    showPwd() {
      return (this.isShow = !this.isShow);
    },
  },
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {},
};
</script>
<style lang='scss' scoped>
$primaryColor: #409EFF;

.toolVersion {
  width: 150px;
}

.toolName {
  text-indent: 10px;
  width: 120px;
  border-right: 1px solid #409EFF;
}

.el-tag {
  background-color: $primaryColor !important;
  color: #fff;
  padding: 0 3px;
  margin-left: 10px;
}

.el-card-edu {
  ::v-deep {
    .el-card__body {
      padding-bottom: 10px;
    }
  }
}

.left-container {
  height: 670px;
  overflow: auto;
}

.loginInfo-container {
  height: 260px;

  overflow: auto;
}

@media screen and (max-width: 1600px) {
  .left-container {
    height: 670px;
    overflow: auto;
  }

  .loginInfo-container {
    height: 260px;

    overflow: auto;
  }
}

.lab-container {
  height: 282px;
  overflow: auto;
}

//84px + 320

.detail-user-num {
  border-radius: 50%;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  margin-right: 10px;
  color: #fff;
}

.detail-user-name {
  margin-right: 10px;
}

.marginTop10 {
  margin-top: 10px;
}

.marginRt20 {
  margin-right: 20px;
}

.marginBottom20 {
  ::v-deep {
    .el-card__body {
      padding: 10px 20px;
    }
  }
}

// .el-form-item {
//     margin-bottom: 0px
// }

.dialog {
  ::v-deep {
    .el-dialog {
      height: 80vh;
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

.dialog-info {
  ::v-deep {
    .el-dialog {
      width: 400px;

      .el-dialog__header {
        display: none;
      }
    }
  }

  .info-container {
    // width: 100px;
    max-width: 200px;
    text-align: left;
    margin: 0 auto;

    .first-name {
      @extend .primaryBgColor;
      font-size: 20px;
      width: 60px;
      height: 60px;
      line-height: 60px;
      border-radius: 50%;
      margin: 0 auto;
      text-align: center;
      color: #fff;
    }

    .username {
      margin-top: 5px;
    }

    .role {
      margin-top: 5px;
      margin-left: 10px;
    }

    .phone {
      margin-top: 2px;
    }

    .email {
      margin-top: 2px;
    }
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

.marginBottom10 {
  margin-bottom: 10px;
}

.padding20 {
  padding: 20px;
}

// ::v-deep {
.el-tooltip__popper.is-light.tps {
  background: red;
}
// }
</style>
    