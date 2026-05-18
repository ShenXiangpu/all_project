<template>
  <div class="app-container">
    <el-card class="el-card-edu">
      <el-tabs class="font16 el-tabs-edu" tab-position="left" style="">
        <el-tab-pane label="个人资料">
          <div class="font20 fontW7" style="margin: 10px 0 30px 22px">
            个人资料
          </div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="userName">
              <el-input
                class="el-input-edu"
                placeholder="请输入用户名"
                v-model="ruleForm.userName"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item prop="deptId" label="所属部门/职位">
              <el-cascader
                clearable
                class="el-input-edu"
                placeholder="请选择"
                v-model="ruleForm.deptAndPostId"
                :options="allDeptList"
                @change="OptionChange"
              ></el-cascader>
            </el-form-item>

            <el-form-item prop="leaderId" label="直属上级">
              <el-select
                filterable
                clearable
                class="el-input-edu"
                v-model="ruleForm.leaderId"
                id="roleId"
                placeholder="请选择直属上级(支持输入查询)"
              >
                <el-option
                  v-for="item in allUsersList"
                  :key="item.id"
                  :label="item.userName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item> -->

            <el-form-item label="手机号" prop="phone">
              <el-input
                class="el-input-edu"
                placeholder="请输入手机号"
                v-model="ruleForm.phone"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input
                class="el-input-edu"
                placeholder="请输入邮箱"
                v-model="ruleForm.email"
              ></el-input>
            </el-form-item>

            <el-form-item label="头像" class="head-form-item flex">
              <upload-img
                :fileList="fileList"
                :filePath="filePath"
                :disabled="upVideoDisabled"
                @handleRemove="handleRemove"
                @doUpload="doUpload"
              ></upload-img>
              <div>
                <div>上传格式：png、jpeg、jpg、gif、 bmp</div>
                <div class="primaryColoro">* 头像大小不能超过5MB</div>
              </div>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                class="save"
                @click="submitForm('ruleForm')"
                >保存修改</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="密码修改">
          <div
            style="font-size: 20px; font-weight: 700; margin: 10px 0 30px 22px"
          >
            密码修改
          </div>
          <el-form
            :model="sRuleForm"
            :rules="sRules"
            ref="sRuleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              style="width: 350px"
              label="当前密码"
              prop="oldPassword"
            >
              <el-input
                placeholder="请输入当前的密码"
                show-password
                v-model="sRuleForm.oldPassword"
              ></el-input>
            </el-form-item>
            <el-form-item
              style="width: 350px"
              label="新密码"
              prop="newPassword"
            >
              <el-input
                placeholder="请输入新密码"
                show-password
                v-model="sRuleForm.newPassword"
              >
              </el-input>
            </el-form-item>
            <div
              style="
                margin-left: 100px;
                margin-bottom: 10px;
                font-size: 12px;
                color: #999;
              "
            >
              密码需8到30位，至少包括三项（英文、数字和特殊字符）
            </div>
            <el-form-item
              style="width: 350px"
              label="确认密码"
              prop="cnewPassword"
            >
              <el-input
                placeholder="请再次输入以确认新密码"
                show-password
                v-model="sRuleForm.cnewPassword"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="ssubmitForm('sRuleForm')"
                >修改</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { updUserBasicInfo, updUserPwd } from "@/api/crm/personalCenter";
import { getAllUserSelect } from "@/api/crm/user";
import { subordinateList } from "@/api/crm/organization";
import { uploadSmallFile } from "@/api/crm/file";
import store from "@/store";
import { Encrypt } from "@/utils/secret";
import UploadImg from "./components/UploadImg.vue";
export default {
  name: "personalCenter",
  components: { UploadImg },
  data() {
    return {
      fileList: [],
      filePath: "",
      upVideoDisabled: false,
      ruleForm: {
        userName: "",
        phone: "",
        deptId: "",
        postId: "",
        deptAndPostId: [],
        email: "",
        leaderId: "",
        headUrl: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          // {
          //     pattern: /^(?=[\S]{2,80}$)([\w\.:-]|[\u4e00-\u9fa5])+$/,
          //     message: '请按规则重新设置实例名称'
          // },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          // {
          //     pattern: /^(?=[\S]{2,80}$)([\w\.:-]|[\u4e00-\u9fa5])+$/,
          //     message: '请按规则重新设置实例名称'
          // },
        ],

        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          // {
          //     pattern: /^(?=[\S]{2,80}$)([\w\.:-]|[\u4e00-\u9fa5])+$/,
          //     message: '请按规则重新设置实例名称'
          // },
        ],
      },
      sRuleForm: {
        oldPassword: "",
        newPassword: "",
        cnewPassword: "",
      },
      sRules: {
        oldPassword: [
          {
            required: true,
            message: "请输入当前的密码",
            trigger: "blur",
          },
          // {
          //     pattern: /^(?=[\S]{2,80}$)([\w\.:-]|[\u4e00-\u9fa5])+$/,
          //     message: '请按规则重新设置实例名称'
          // },
        ],
        newPassword: [
          {
            required: true,
            message: "请输入新密码",
            trigger: "blur",
          },
          {
            pattern:
              /^(?=.*\d)(?=.*[a-z[A-Z])(?=.*[()[\]`~!@#$%^&*-+=_|{}:;'<>,.?/]).{8,30}$/,
            message: "请按规则重新设置密码",
          },
        ],

        cnewPassword: [
          {
            required: true,
            message: "请再次输入以确认新密码",
            trigger: "blur",
          },
          {
            validator: (rule, value, callback) => {
              let newPassword = this.sRuleForm.newPassword;
              if (value && value !== newPassword) {
                callback("您输入的密码不一致，请再次输入");
              }
              // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
              callback();
            },
            trigger: "blur",
          },
        ],
      },
      id: 0,
      allDeptList: [],
      allUsersList: [],
    };
  },
  created() {
    this.queryRuleFormValue();
    this.handleDeptQuery();
    this.queryAllUserSelect();
  },
  methods: {
    //直属上级
    queryAllUserSelect() {
      getAllUserSelect().then((res) => {
        if (res && res.flag) {
          this.allUsersList = res.resData;
        }
      });
    },
    OptionChange(e) {
      let deptId = e[0];
      let postId = e[1];
      this.formData.deptId = deptId;
      this.formData.postId = postId;
    },
    //查询级联菜单
    async handleDeptQuery() {
      let listQuery = {
        page: 1,
        limit: 500,
        params: {},
      };
      const res = await subordinateList(listQuery);
      if (res && res.flag) {
        let resData = res.resData;
        let allDeptList = [];
        let records = resData.records;
        records.map((item) => {
          let obj = {
            value: item.id,
            label: item.name,
          };
          let postList = item && item.postList;
          let children = [];
          if (postList && postList.length > 0 && Array.isArray(postList)) {
            postList.map((postItem) => {
              let pObj = {
                value: postItem.id,
                label: postItem.postName,
              };
              children.push(pObj);
            });
          }
          obj.children = children;
          allDeptList.push(obj);
        });
        console.log(allDeptList);
        this.allDeptList = allDeptList;
      } else {
      }
    },
    handleRemove() {
      this.fileList = [];
      this.upVideoDisabled = false;
      this.filePath = "";
      this.ruleForm.headUrl = "";
    },
    doUpload(files) {
      let file = files.file;
      let FormDatas = new FormData();
      console.log(files);
      const { type, name, size } = file;
      let imageTypeList = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
        "image/bmp",
      ];
      if (imageTypeList.indexOf(type) === -1) {
        this.fileList = [];
        this.$message.error("请上传png、jpg、gif、bmp格式的图片！");
        return;
      }
      if (size > 1024 * 1024 * 5) {
        this.fileList = [];
        this.$message.error("上传图片大小不能超过 5MB!");
        return;
      }
      FormDatas.append("file", file);
      let uploadObj = {
        // fileRename: name,
        file: FormDatas,
      };
      this.upVideoDisabled = true;
      uploadSmallFile(uploadObj).then((res) => {
        let resData = res.resData;
        if (res && res.flag && resData) {
          this.$message.success("上传成功");
          let filePath = resData.url;
          this.filePath = filePath;
          this.ruleForm.headUrl = this.filePath;
          this.fileList = [{ filePath }];
        } else {
          this.$message.error("上传出错");
          this.fileList = [];
          this.upVideoDisabled = false;
        }
      });
    },
    queryRuleFormValue() {
      let userInfo = this.$store.state.user.userInfo;
      let headUrl = userInfo && userInfo.headUrl;
      this.id = userInfo.id;
      let ruleForm = {
        userName: userInfo.userName,
        phone: userInfo.phone,
        email: userInfo.email,
        headUrl: headUrl,
      };

      this.ruleForm = ruleForm;

      if (headUrl) {
        this.upVideoDisabled = true;
        this.filePath = headUrl;
        this.fileList = [{ headUrl }];
      } else {
        this.filePath = "";
        this.fileList = [];
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let id = this.id;
          updUserBasicInfo({ id, ...this.ruleForm }).then((reponse) => {
            if (reponse && reponse.flag) {
              this.$message.success("修改成功");
              location.reload();
            }
          });
        }
      });
    },
    resetForm() {},

    async ssubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let oldPassword = Encrypt(this.sRuleForm.oldPassword);
          let newPassword = Encrypt(this.sRuleForm.newPassword);
          updUserPwd({ oldPassword, newPassword }).then((reponse) => {
            if (reponse && reponse.flag) {
              this.$message.success("修改成功");
              this.confirm();
            }
          });
        }
      });
    },

    confirm() {
      var secondsToGo = 5;

      var timer = setInterval(() => {
        secondsToGo -= 1;
        if (secondsToGo == 0) {
          clearInterval(timer);
          this.$router.push(`/login`);
          this.$store.dispatch("user/logout").then(() => {
            location.reload(); //刷新页面
          });
        }
      }, 1000);
      this.$confirm(
        `将在 ${secondsToGo} 秒后跳转登录页，请重新登录`,
        "密码修改成功",
        {
          confirmButtonText: "重新登录",
          // cancelButtonText: '取消',
          type: "warning",
        }
      ).then(() => {
        clearInterval(timer);
        this.$router.push(`/login`);
        this.$store.dispatch("user/logout").then(() => {
          location.reload(); //刷新页面
        });
      });
    },
  },
  computed: {
    ...mapGetters(["userInfo", "userRolesNames"]),
  },
};
</script>

<style lang="scss" scoped>
.el-tabs-edu {
  height: 100%;
  padding: 30px 0 0 0;
}
.el-card-edu {
  height: calc(100vh - 100px);
  overflow: auto;
}
.el-input-edu {
  width: 350px;
}
.head-form-item {
  width: 450px;
}

.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.demo-ruleForm {
  ::v-deep .el-form-item__label {
    width: 100px;
  }
  .save {
    margin-left: 100px;
  }
  ::v-deep .el-upload-list__item-name {
    margin-left: 100px;
  }
}
</style>
