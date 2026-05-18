<template>
  <div class="index">
    <el-container class="index">
      <el-header class="header">找回密码</el-header>
      <el-main class="section">
        <div class="form-container" v-if="active <= 0">
          <el-form :model="resetForm" ref="resetForm" label-width="100px">
            <el-form-item label="手机号" prop="username" :rules="resetRules.username">
              <el-input
                type="text"
                placeholder="请输入手机号"
                v-model="resetForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-row :gutter="20">
              <el-col :span="14">
                <el-form-item label="验证码" prop="code" :rules="resetRules.code">
                  <el-input
                    type="text"
                    v-model="resetForm.code"
                    placeholder="请输入验证码"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-image
                  style="width: 100px; height: 40px"
                  @click="getNextVer"
                  :src="imageUrl||'/edu/sso-service/sso/captcha/getVerify'"
                  fit="cover"
                ></el-image>
              </el-col>
              <el-col :span="4">
                <el-link
                  type="primary"
                  :underline="false"
                  @click="getNextVer"
                  style="line-height:40px;width:100%;text-align: right;"
                >换一张</el-link>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item>
                  <el-button style="width:100%" type="primary" @click="submitForm('resetForm')">提交</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div v-if="active > 0">
          <el-steps :active="active" simple style="margin-top: 20px" finish-status="success">
            <el-step title="验证身份"></el-step>
            <el-step title="重置密码"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
        </div>
        <div class="form-container form-margin" v-if="active === 1">
          <el-form :model="checkForm" ref="checkForm" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item
                  label="邮箱"
                  prop="phone"
                  :rules="[
                           { required: true, },
                        ]"
                >
                  <el-input
                    readonly
                    type="text"
                    placeholder="请输入邮箱"
                    v-model="checkForm.phone"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="16">
                <el-form-item label="验证码" prop="code" :rules="checkRules.code">
                  <el-input
                    type="text"
                    placeholder="邮箱验证码"
                    v-model="checkForm.code"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-button style="width:100%" type="primary" @click.prevent="sendSmsCode">{{ time }}</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item>
                  <el-button style="width:100%" type="primary" @click="checkSubForm('checkForm')">提交</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="form-container form-margin" v-if="active === 2">
          <el-form :model="resetPassForm" ref="resetPassForm" label-width="100px">
            <el-form-item label="手机号" prop="phone">
              <el-input type="text" readonly v-model="resetPassForm.phone" autocomplete="off"></el-input>
            </el-form-item>

            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="新密码" prop="pass" :rules="resetPassFormRules.pass">
                  <el-input
                    type="password"
                    v-model="resetPassForm.pass"
                    placeholder="请输入新密码"
                    autocomplete="off"
                  ></el-input>
                  <span>密码需8到30位，至少包括三项（英文、数字和特殊字符）</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="确认密码" prop="checkPass" :rules="resetPassFormRules.checkPass">
                  <el-input
                    type="password"
                    v-model="resetPassForm.checkPass"
                    placeholder="请再次输入密码"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item>
                  <el-button
                    style="width:100%"
                    type="primary"
                    @click="resetPassSubForm('resetPassForm')"
                  >提交</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="success-container" v-if="active === 3">
          <h3>重置成功</h3>
          <p>您的平台账户名称为{{resetPassForm.phone}}</p>

          <p>下次登录时请使用新密码进行登录</p>
          <el-button type="primary" @click="handleToLogin">返回，重新登录</el-button>
        </div>
      </el-main>
      <!-- <el-footer>123123</el-footer> -->
    </el-container>
  </div>
</template>

<script>
import {
  getResetSmsCode,
  modifyPassword,
  checkSmsCode,


  checkUser
} from "@/api/passwordReset";
import { Encrypt } from "@/utils/secret";
import { checkVerify } from "@/api/login";
import { Message } from "element-ui";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (
        !/^(?=.*\d)(?=.*[a-z[A-Z])(?=.*[()[\]`~!@#$%^&*-+=_|{}:;'<>,.?/]).{8,30}$/.test(
          value
        )
      ) {
        callback(new Error("请按规则输入密码"));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.resetPassForm.pass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (
        !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
          value
        )
      ) {
        return callback(new Error("请输入正确的手机号码"));
        //Message.error("请输入正确的手机号码");
      } else {
        callback();
      }
    };
    return {
      active: 0,
      resetRules: {
        code: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          }
        ],
        username: [
          { required: true, message: "登录名不能为空" },
          {
            message: "请输入正确的手机号码",
            trigger: "blur",
            validator: validatePhone
          }
        ]
      },
      checkRules: {
        code: [{ required: true, message: "短信验证码不能为空", trigger: blur }]
      },
      resetPassFormRules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      resetForm: {
        username: "",
        code: ""
      },
      checkForm: {
        phone: "",
        code: ""
      },
      //确认密码
      resetPassForm: {
        phone: "",
        pass: "",
        checkPass: ""
      },

      time: "点击获取验证码",
      isClick: true,
      imageUrl: "/edu/sso-service/sso/captcha/getVerify"
    };
  },

  components: {},

  computed: {},

  methods: {
    //获取验证码
    async sendSmsCode() {
      if (this.isClick) {
        if ( this.checkForm.phone) {
          const res = await getResetSmsCode({ email: this.checkForm.phone }); // 获取验证码接口
          if (res && res.flag) {
            Message.success("验证码发送成功！");
            this.isClick = false;
            let s = 60;
            this.time = s + "s";
            let interval = setInterval(() => {
              s--;
              this.time = s + "s";
              if (s < 0) {
                this.time = "重新获取";
                this.isClick = true;
                clearInterval(interval);
              }
            }, 1000);
          } else {
            Message.error(res.errMessage);
          }
        } else {
          // Message.error("请输入正确的手机号码");
        }
      }
    },
    checkSubForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.resetPassForm.phone = this.resetForm.username;
          this.active = 1;
          checkSmsCode({email:this.checkForm.phone,code:this.checkForm.code}).then(res => {
            if (res && res.flag) {
              this.resetPassForm.phone = this.resetForm.username;
              this.active = 2;
            } else {
              Message.error(res.errMessage);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          checkVerify(this.resetForm.code).then(res => {
            if (res && res.flag) {
              let loginName = this.resetForm.username;
              checkUser({loginName}).then(response => {
                if(response && response.flag) {
                  this.active = 1;

                  this.checkForm.phone = response &&response.resData
                }
              })
              
            } else {
              this.getNextVer();
              Message.error(res.errMessage);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetPassSubForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let param = {
            phone: this.resetPassForm.phone,
            oldPassword: Encrypt(this.resetPassForm.checkPass),
            newPassword: Encrypt(this.resetPassForm.checkPass)
          };
          modifyPassword(param).then(res => {
            if (res && res.flag) {
              Message.success("密码重置成功");
              this.active = 3;
            } else {
              Message.error(res.errMessage);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //获得验证码
    getNextVer() {
      this.imageUrl =
        "/edu/sso-service/sso/captcha/getVerify?" +
        new Date().getTime().toString(); //需要添加随机数，否则新旧图片的地址是一样的，浏览器会默认从缓存中读取数据
    },
    handleToLogin() {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
<style lang='scss' scoped>
.index {
  width: 1200px;
  min-width: 1103px;
  margin: 0 auto;
  flex: 1 1;

  .header {
    margin: 15px 0;
    height: 62px;
    padding-top: 10px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
  }

  .section {
    width: 100%;

    .form-container {
      width: 500px;
      margin: 0 auto;
    }

    .form-margin {
      margin-top: 50px;
    }

    .success-container {
      margin-top: 10px;
      width: 100%;
      height: 250px;
      padding: 20px;
      border: 1px solid #7ac23c;
      background-color: rgba(24, 144, 255, 0.1);
    }
  }
}
</style>