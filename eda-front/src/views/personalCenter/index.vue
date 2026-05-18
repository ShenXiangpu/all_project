<template>
  <div class="app-container">
    <el-card style="height: 80vh">
      <el-tabs
        class="font16"
        tab-position="left"
        style="height: 100%; padding: 30px 0 0 0"
      >
        <el-tab-pane label="个人资料">
          <div
            style="font-size: 20px; font-weight: 700; margin: 10px 0 30px 22px"
          >
            个人资料
          </div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item style="width: 350px" label="用户名" prop="userName">
              <el-input
                placeholder="请输入用户名"
                v-model="ruleForm.userName"
              ></el-input>
            </el-form-item>
            <el-form-item style="width: 350px" label="手机号" prop="phone">
              <el-input
                placeholder="请输入手机号"
                v-model="ruleForm.phone"
              ></el-input>
            </el-form-item>
            <el-form-item style="width: 350px" label="邮箱" prop="email">
              <el-input
                placeholder="请输入邮箱"
                v-model="ruleForm.email"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
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
import { updUserBasicInfo, updUserPwd } from "@/api/edu/personalCenter";
import store from "@/store";
import { Encrypt } from "@/utils/secret";
export default {
  name: "personalCenter",
  data() {
    return {
      ruleForm: {
        userName: "",
        phone: "",
        studentNum: "",
        email: "",
        className: "",
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
    };
  },
  methods: {
    queryRuleFormValue() {
      let userInfo = this.$store.state.user.userInfo;
      let roleName = userInfo.roleName;
      this.id = userInfo.id;
      let ruleForm = {
        userName: userInfo.userName,
        phone: userInfo.phone,
        email: userInfo.email,
      };
      this.ruleForm = ruleForm;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid);
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
  created() {
    this.queryRuleFormValue();
  },
};
</script>

<style lang="scss" scoped></style>