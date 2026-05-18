<template>
  <div :style="{ '--color': defaultTheme }">
    <el-form ref="form" label-width="80px" class="form-box">
      <el-form-item label="导航样式">
        <el-radio-group v-model="type" @change="changeSidebarType">
          <el-radio label="1">纯色</el-radio>
          <el-radio label="2">渐变</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="主题颜色">
        <el-radio-group
          v-model="theme"
          @change="themeChange"
          class="el-radio-group-edu"
        >
          <el-radio label="#10abb9">
            <span class="el-radio-span" style="background: #10abb9"> 绿色</span>
          </el-radio>
          <el-radio label="#409EFF">
            <span class="el-radio-span" style="background: #409eff">蓝色</span>
          </el-radio>
          <el-radio label="#6959CD">
            <span class="el-radio-span" style="background: #6959cd">紫色</span>
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="头像" class="head-form-item">
        <upload-img
          class="upload-img-logo"
          :fileList="fileList"
          :filePath="logoUrl"
          :disabled="upVideoDisabled"
          @handleRemove="handleRemove"
          @doUpload="doUpload"
        ></upload-img>
        <div>
          <div>上传格式：png、jpeg、jpg、gif、 bmp</div>
          <div class="primaryColoro">
            * logo大小不能超过5MB <br />
            * logo尺寸最佳比例为宽高比2:1
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const version = require("element-ui/package.json").version; // element-ui version from node_modules
const ORIGINAL_THEME = "#10abb9"; // default color
import store from "@/store";
import UploadImg from "@/views/personalCenter/components/UploadImg.vue";
export default {
  name: "ThemePickerDefine",
  data() {
    return {
      chalk: "", // content of theme-chalk css
      theme: localStorage.getItem("theme") || ORIGINAL_THEME,
      type: localStorage.getItem("style") || "1",
      logoUrl: localStorage.getItem("logoUrl") || "",
      fileList: [],
      upVideoDisabled: false,
    };
  },
  computed: {
    defaultTheme() {
      return this.$store.state.settings.theme.color;
    },
  },
  components: {
    UploadImg,
  },
  watch: {
    logoUrl: {
      handler: function (val, oldVal) {
        if (val) {
          this.fileList = [{ val }];
          this.upVideoDisabled = true;
        }
      },
      immediate: true,
    },
    defaultTheme: {
      handler: function (val, oldVal) {
        this.theme = val;
      },
      immediate: true,
    },
    theme: {
      handler(val) {
        const oldVal = this.chalk ? this.theme : ORIGINAL_THEME;
        if (typeof val !== "string") return;
        const themeCluster = this.getThemeCluster(val.replace("#", ""));
        const originalCluster = this.getThemeCluster(oldVal.replace("#", ""));
        console.log(themeCluster, originalCluster);
        const getHandler = (variable, id) => {
          return () => {
            const originalCluster = this.getThemeCluster(
              ORIGINAL_THEME.replace("#", "")
            );
            const newStyle = this.updateStyle(
              this[variable],
              originalCluster,
              themeCluster
            );

            let styleTag = document.getElementById(id);
            if (!styleTag) {
              styleTag = document.createElement("style");
              styleTag.setAttribute("id", id);
              document.head.appendChild(styleTag);
            }
            styleTag.innerText = newStyle;
          };
        };

        // if (!this.chalk) {
        //   // const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
        //   // await this.getCSSString(url, 'chalk')
        //   this.chalk = chalkCss.replace(/@font-face{[^}]+}/, '') // 本地缓存，如果需要获取线上的就用上面那种方式，优点：切换无延迟，缺点：需要手动维护 css string
        // }

        const chalkHandler = getHandler("chalk", "chalk-style");

        chalkHandler();

        const styles = [].slice
          .call(document.querySelectorAll("style"))
          .filter((style) => {
            const text = style.innerText;
            return (
              new RegExp(oldVal, "i").test(text) &&
              !/Chalk Variables/.test(text)
            );
          });
        styles.forEach((style) => {
          const { innerText } = style;
          if (typeof innerText !== "string") return;
          style.innerText = this.updateStyle(
            innerText,
            originalCluster,
            themeCluster
          );
        });
      },
      immediate: true,
    },
  },
  mounted() {
    // this.queryTheme();
  },
  methods: {
    handleRemove() {
      this.fileList = [];
      this.upVideoDisabled = false;
      this.logoUrl = "";
      this.$emit("change", {
        color: this.theme,
        style: this.type,
        logoUrl: "",
      });
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
      console.log("FormDatas", FormDatas);
      let uploadObj = {
        fileRename: name,
        file: FormDatas,
      };
      this.upVideoDisabled = true;
      uploadSmallFile(uploadObj).then((res) => {
        let resData = res.resData;
        if (res && res.flag && resData) {
          this.$message.success("上传成功");
          let logoUrl = resData;
          this.logoUrl = logoUrl;
          this.$emit("change", {
            color: this.theme,
            style: this.type,
            logoUrl,
          });
          this.fileList = [{ logoUrl }];
        } else {
          this.$message.error("上传出错");
          this.fileList = [];
          this.upVideoDisabled = false;
        }
      });
    },
    async queryTheme() {
      const data = await store.dispatch("settings/getTheme");
      this.theme = (data && data.color) || ORIGINAL_THEME;
      this.type = (data && data.style) || "1";
      this.logoUrl = (data && data.logoUrl) || "";
    },
    themeChange() {
      this.$emit("change", { color: this.theme, style: this.type });
    },
    changeSidebarType() {
      this.$emit("change", { color: this.theme, style: this.type });
    },
    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style;
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, "ig"), newCluster[index]);
      });
      return newStyle;
    },

    getCSSString(url, variable) {
      return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, "");
            resolve();
          }
        };
        xhr.open("GET", url);
        xhr.send();
      });
    },

    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        if (tint === 0) {
          // when primary color is in its rgb space
          return [red, green, blue].join(",");
        } else {
          red += Math.round(tint * (255 - red));
          green += Math.round(tint * (255 - green));
          blue += Math.round(tint * (255 - blue));

          red = red.toString(16);
          green = green.toString(16);
          blue = blue.toString(16);

          return `#${red}${green}${blue}`;
        }
      };

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);

        red = Math.round((1 - shade) * red);
        green = Math.round((1 - shade) * green);
        blue = Math.round((1 - shade) * blue);

        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);

        return `#${red}${green}${blue}`;
      };

      const clusters = [theme];
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
      }
      clusters.push(shadeColor(theme, 0.1));
      return clusters;
    },
  },
};
</script>
<style>
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}
</style>
<style scoped lang="scss">
.upload-img-logo {
  ::v-deep {
    .el-upload-list--picture-card .el-upload-list__item {
      width: 100px;
      height: 50px;
    }
    .el-upload--picture-card {
      width: 100px;
      height: 50px;

      line-height: 50px;
      i {
        font-size: 20px;
      }
    }
  }
}
.theme-picker .el-color-picker__trigger {
  vertical-align: middle;
}

.el-color-dropdown__link-btn {
  display: none;
}

.el-radio-span {
  width: 30px;
  height: 14px;
  color: #fff;
  padding: 4px;
  border-radius: 2px;
}

.form-box {
  ::v-deep {
    .el-radio__input.is-checked .el-radio__inner {
      border-color: var(--color) !important;
      background-color: var(--color) !important;
    }
  }
}
</style>
