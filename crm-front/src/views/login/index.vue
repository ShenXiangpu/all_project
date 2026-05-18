<template>
  <div class="container">
    <div class="login-container">
      <div class="login-container-left">
        <div class="login-container-left-image">
        </div>
      </div>
      <div class="login-container-right">
        <el-form v-if="!isShowPhoneLogin" ref="loginForm" :rules="loginRules" :model="loginForm" class="login-form"
          auto-complete="on" label-position="left">
          <div class="title-container">
            <div class="iot-logo">{{ title || '中科客户管理平台' }}</div>
            <h3 class="title">账号密码登录</h3>
          </div>

          <!-- 账号密码登录 -->

          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input v-model="loginForm.username" placeholder="请输入手机号"  auto-complete="on"
              name="username" tabindex="1"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input v-model="loginForm.password" :type="passwordType" auto-complete="new-password" placeholder="请输入密码"
              name="password" tabindex="2" @keyup.enter.native="handleLogin"></el-input>
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>

          <!-- <el-form-item prop="verifyInput">
            <span class="svg-container">
              <svg-icon icon-class="phone" />
            </span>
            <el-input :key="passwordType" v-model="loginForm.verifyInput" auto-complete="off" placeholder="请输入验证码"
              name="password" tabindex="2" @keyup.enter.native="handleLogin" />
            <span class="show-pwd ver" @click="getNextVer">
              <el-image style="width: 100%; height: 100%" :src="imageUrl || '/edu/sso-service/sso/captcha/getVerify'"
                fit="cover">
              </el-image>
            </span>
          </el-form-item> -->
          <el-button class="loginBtn" v-if="!isShowPhoneLogin" :loading="loading" type="primary"
            @click.native.prevent="handleLogin">登录</el-button>

          <div class="handle">
            <!-- <el-link :underline="false" @click="changeLoginType" type="primary">验证码登录</el-link> -->
            <!-- <el-link :underline="false" @click="resetPassword" type="primary">忘记密码</el-link> -->
            <el-checkbox type="primary" v-model="checked" @change="rememberPassword">记住密码</el-checkbox>
          </div>


          <div class="tips">
            <el-alert title="初始密码为手机号后四位，登录后请点击右上角头像进入个人中心立即修改密码" type="warning" :closable="false">
            </el-alert>
          </div>
        </el-form>

        <el-form v-if="isShowPhoneLogin" ref="loginFormByCode" :model="loginFormByCode" :rules="loginByPhoneRules"
          class="login-form" auto-complete="on" label-position="left">
          <div class="title-container">
            <h3 class="title">验证码登录</h3>
          </div>
          <!-- 验证码登录 -->
          <div>
            <el-form-item prop="phone">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input v-model="loginFormByCode.phone" placeholder="手机号" name="phone" type="text" tabindex="1" />
            </el-form-item>

            <el-form-item prop="sms">
              <div class="code-container">
                <div class="code-container-left">
                  <span class="svg-container">
                    <svg-icon icon-class="message" />
                  </span>
                  <el-input v-model="loginFormByCode.sms" placeholder="验证码" name="sms" tabindex="2"
                    @keyup.enter.native="handleLogin">
                  </el-input>
                </div>
                <div class="code-container-right">
                  <el-button type="primary" @click.prevent="sendSmsCode">{{
                    time
                  }}</el-button>
                </div>
              </div>
            </el-form-item>
          </div>
          <el-button v-if="isShowPhoneLogin" :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px"
            @click.native.prevent="handleLoginByCode">登录</el-button>

          <div class="handle">
            <el-link :underline="false" @click="changeLoginType" type="primary">账号密码登录</el-link>
          </div>
        </el-form>
      </div>


      <!-- <vue-particles color="#6495ED" :particleOpacity="0.7" :particlesNumber="100" shapeType="circle" :particleSize="4"
      linesColor="#6495ED" :linesWidth="1" :lineLinked="true" :lineOpacity="0.6" :linesDistance="150" :moveSpeed="3"
      :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
    </vue-particles> -->

      <!-- <bgAnimation /> -->
    </div>
    <!-- <div class="copyright">
      <p>版权所有：&copy;中科芯云微电子科技有限公司/青岛EDA中心</p>
      <p>鲁ICP备19031309号-1</p>
    </div> -->
  </div>
</template>

<script>
import { getSmsCode } from "@/api/login";
import { Message } from "element-ui";
import {  isEqual } from "lodash";
import { Encrypt, Decrypt } from "@/utils/secret";
import Cookies from "js-cookie";
import settings from '@/settings.js'
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value == 0) {
        // callback(new Error('Please enter the correct user name'))
        Message.error("用户名不能为空");
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value < 6) {
        // callback(new Error('The password can not be less than 6 digits'))
        Message.error("密码不能小于六位");
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
        // callback()
        Message.error("请输入正确的手机号码");
      } else {
        callback();
      }
    };
    const validateSms = (rule, value, callback) => {
      if (!isEqual(value.length, 6)) {
        // callback(new Error('请输入6位验证码'))
        Message.error("请输入6位验证码");
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        verifyInput: "",
      },
      checked: true, // 是否记住密码
      loginFormByCode: {
        phone: "",
        sms: "",
      },
      time: "发送验证码",
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" },
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
        verifyInput: [
          { required: true, trigger: "blur", message: "请输入验证码" },
        ],
      },

      loginByPhoneRules: {
        phone: [{ required: true, trigger: "blur", message: "请输入手机号" }],
        sms: [{ required: true, trigger: "blur", message: "请输入验证码" }],
      },
      loading: false,
      passwordType: "password",
      redirect: '',
      isShowPhoneLogin: false,
      isClick: true,
      imageUrl: "",
      title: settings.title
    };
  },
  watch: {
    // $route: {
    //   handler: function (route) {
    //     let redirect =
    //       route && route.fullPath && route.fullPath.split("?redirect=")[1] || '';
    //     redirect = decodeURI(redirect);
    //     redirect =
    //       redirect &&
    //       redirect
    //         .replaceAll("%2F", "/")
    //         .replaceAll("%3A", ":")
    //         .replaceAll("%3F", "?")
    //         .replaceAll("%3D", "=")
    //         .replaceAll("%26", "&");
    //     let userRoles = store.getters.userRolesNames
    //     let url = '/dashboard'
    //     if (userRoles == '学生') {
    //       url = '/attendClass/attendClass'
    //     }
    //     this.redirect = redirect || url;
    //   },
    //   immediate: true,
    // },
  },
  created() {
    // this.getNextVer();
  },
  mounted() {
    const loginInfo = Cookies.get("passObj");
    if (loginInfo) {
      let password = loginInfo.password;
      let loginForm = {
        username: loginInfo.username,
        password: Decrypt(password),
      };
      this.loginForm = loginForm;
    }
  },
  methods: {
    checkoutLoginIn(redirect) {
      this.$router.push({
        path: redirect,
      });
    },
    //是否记住密码
    rememberPassword(e) {
      this.checked = e;
    },
    //获得验证码
    // getNextVer() {
    //   this.imageUrl =
    //     "/edu/sso-service/sso/captcha/getVerify?" +
    //     new Date().getTime().toString(); //需要添加随机数，否则新旧图片的地址是一样的，浏览器会默认从缓存中读取数据
    // },
    resetPassword() {
      let routeData = this.$router.resolve({
        path: "/passwordReset",
      });
      window.open(routeData.href, "_blank");
    },
    // 获取验证码
    async sendSmsCode() {
      if (this.isClick) {
        if (
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
            this.loginFormByCode.phone
          )
        ) {
          const res = await getSmsCode({ phone: this.loginFormByCode.phone }); // 获取验证码接口 es7
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
          Message.error("请输入正确的手机号码");
        }
      }
    },

    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          // const res = await checkVerify(this.loginForm.verifyInput);
          if (true) {
            this.loading = true;
            if (this.checked) {
              //将密码加密
              let username = this.loginForm.username;
              let password = this.loginForm.password;
              let loginForm = {
                username,
                password: Encrypt(password),
              };
              Cookies.set("passObj", loginForm, { expires: 7 });
            } else {
              Cookies.set("passObj", "", -1);
            }
            this.$store
              .dispatch("user/login", this.loginForm)
              .then(() => {
                this.$router.push({
                  path: '/',
                });
                this.loading = false;

              })
              .catch(() => {
                this.loading = false;

              });
          } else {

          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleLoginByCode() {
      // debugger
      this.$refs.loginFormByCode.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/loginByPhone", this.loginFormByCode)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changeLoginType() {
      this.isShowPhoneLogin = !this.isShowPhoneLogin;

      if (this.isShowPhoneLogin) {
        //验证码登录
        this.$refs.loginForm.clearValidate([]);
      } else {
        //密码登录
        this.$refs.loginFormByCode.clearValidate([]);
      }

      //
      //
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #fff;
$light_gray: #fff;
$cursor: #333;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.iot-title {
  width: 200px;
  height: 100px;
  position: absolute;
  left: 200px;
  top: 0;
  z-index: 0;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: #fff;
  background-position: 0px 20px;
  background-image: url("../../assets/img/loginbg/logo1.png");
}


.login-container {


  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #333;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-button--primary {
    background: #409EFF;
    border: none;
    color: #fff;
  }


  .el-input__inner::placeholder {
    color: #999 !important;
  }

  .el-form-item {
    border: 1px solid #ccc;
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 0px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;

$dark_gray: #889aa4;
$light_gray: #eee;
$light_primary: rgb(77, 102, 240);

::v-deep {
  .el-alert__content {
    padding: 0;
  }
}

@media screen and (min-width: 1000px) {
  .container {
    height: 100%;
    background-image: url("../../assets/img/loginbg/login_back.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #333;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    min-height: 900px;
    background-position: 100%;
    // overflow: auto;
  }

  .login-container {
    // border: 1px solid red;
    background: none;
    height: 640px;
    min-height: 640px;
    min-width: 1122px;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    top: 50%;
    margin: -300px auto 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-container-left {
      width: 720px;
      height: 640px;
      background: #f1f5ff;
      padding: 60px;

      &-image {
        width: 600px;
        height: 520px;
        background-image: url("../../assets/img/loginbg/illustration.png");
        background-repeat: no-repeat;
        background-size: contain;
      }

      &-image:after {
        content: '';
        display: block;
        width: 184px;
        height: 64px;
        position: absolute;
        left: 10px;
        top: 10px;
        background-image: url("../../assets/img/logo/logo2.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }

    .login-container-right {
      // width: 720px;
      height: 640px;
      background: #fff;
    }

    .login-form {
      width: 400px;
      max-width: 100%;
      padding: 50px 35px 50px;
      // margin: 0 auto;
      overflow: auto;
      border-radius: 0px;
      background-color: rgba($color: #fff, $alpha: 1);
      // box-shadow: inset 0px 0px 10px $bg;

      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0 1000px rgba(58, 72, 107, 0.8) inset !important;
        /* -webkit-text-fill-color: #fff; */
        -webkit-transition-delay: 99999s;
        -webkit-transition: color 99999s ease-out,
          background-color 99999s ease-out;
      }
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 22px;
        color: rgb(102, 177, 255);
        margin: 0px auto 30px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 7px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .ver {
      width: 120px;
      height: 38px;
    }

    .code-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.375rem 0 0;
    }

    .handle {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 10px;

      ::v-deep {

        .el-checkbox__label {
          // color: #409EFF;
        }

        // .el-checkbox__input.is-checked+.el-checkbox__label {
        //   color: #409EFF;
        // }

        // .el-radio__input.is-checked+.el-radio__label {
        //   color: #409EFF;
        // }

        // .el-checkbox__inner:hover {
        //   border-color: #409EFF;
        // }

        // .el-checkbox .el-checkbox__inner.is-focus {
        //   border-color: #409EFF;
        // }

        // .el-input-number .focusing {
        //   border-color: #409EFF;

        // }

        // .el-radio__input.is-checked .el-radio__inner,
        // .el-checkbox__input.is-checked .el-checkbox__inner,
        // .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        //   border-color: #409EFF;
        //   background: #409EFF;
        // }

      }
    }

    .loginBtn {
      width: 100%;
      margin-bottom: 10px;
    }

    .tips {
      margin-top: 20px;
    }
  }

  .copyright {
    display: block;
    width: 100%;
    font-size: 12px;
    margin-top: 40px;
    text-align: center;
    color: #cccccc;
    z-index: 12;
    position: fixed;
    bottom: 14px;
  }

  input {
    background-color: rgba(255, 255, 255, 0) !important;
  }

  input:-webkit-autofill {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: #fff !important;
  }

  input:-webkit-autofill:focus {
    -webkit-text-fill-color: rgb(241, 235, 235) !important;
  }

  .iot-logo {
    width: 100%;
    height: 100px;
    line-height: 100px;
    background: none;
    font-size: 30px;
    text-align: center;
    font-weight: 550;
    color: rgb(45, 148, 252);
    text-shadow: 0px 2px 3px rgb(86, 168, 250);

  }

}

@media screen and (max-width: 1000px) {
  .container {
    width: 100vw;
    height: 100vh;
  }

  .login-container {
    height: 100%;
    width: 100vw;
    overflow: hidden;
    position: relative;

    &-left {
      display: none;
    }

    .login-form {
      // height: 100%;
      // width: 100vw;
      padding: 10px 35px 50px;
      // margin: 0 auto;
      overflow: auto;
      border-radius: 0px;
      background-color: rgba($color: #fff, $alpha: 1);
      // box-shadow: inset 0px 0px 10px $bg;

      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0 1000px rgba(58, 72, 107, 0.8) inset !important;
        /* -webkit-text-fill-color: #fff; */
        -webkit-transition-delay: 99999s;
        -webkit-transition: color 99999s ease-out,
          background-color 99999s ease-out;
      }
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      &::before {
        content: '';
        display: block;
        width: 100%;
        height: 100px;
        background-size: contain;
        background-position: 50%;
        background-repeat: no-repeat;
        // background-image: url("../../assets/img/loginbg/logo1.png");
      }

      .title {
        font-size: 22px;
        color: rgb(102, 177, 255);
        margin: 0px auto 30px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 7px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .ver {
      width: 120px;
      height: 38px;
    }

    .code-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.375rem 0 0;
    }

    .handle {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      // ::v-deep {

      //   .el-checkbox__label {
      //     // color: #409EFF;
      //   }

      //   .el-checkbox__input.is-checked+.el-checkbox__label {
      //     color: #409EFF;
      //   }

      //   .el-radio__input.is-checked+.el-radio__label {
      //     color: #409EFF;
      //   }

      //   .el-checkbox__inner:hover {
      //     border-color: #409EFF;
      //   }

      //   .el-checkbox .el-checkbox__inner.is-focus {
      //     border-color: #409EFF;
      //   }

      //   .el-input-number .focusing {
      //     border-color: #409EFF;

      //   }

      //   .el-radio__input.is-checked .el-radio__inner,
      //   .el-checkbox__input.is-checked .el-checkbox__inner,
      //   .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      //     border-color: #409EFF;
      //     background: #409EFF;
      //   }

      // }
    }

    .iot-logo {
      width: 100%;
      height: 80px;
      text-align: center;
      line-height: 50px;
      font-size: 30px;
      margin: 0 auto;
      display: block;
    }
  }

  .iot-title {
    display: none;
  }



  .copyright {
    display: none;
  }


}
</style>
