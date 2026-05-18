<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
      <el-form-item label="公开课名称" prop="name">
        <el-input v-model="ruleForm.name" class="el-form-input-edu" placeholder="请输入公开课名称" maxlength="64"
          show-word-limit></el-input>
      </el-form-item>
      <tools ref="tools" :ruleForm="ruleForm" @handleArchitecture="handleArchitecture"
        @handleCompanyName="handleCompanyName" @checkThisTools="checkThisTools" />
      <el-divider></el-divider>
      <iP-and-pDK ref="ip" type="IP" @getIPAndPDK="getIP" />
      <iP-and-pDK ref="pdk" type="PDK" @getIPAndPDK="getPDK" />
      <el-form-item label="上传lab" prop="labList">
        <lab-choose :labList="ruleForm.labList" @getLabList="getLabsList" @removeLabList="getLabsList"></lab-choose>
      </el-form-item>
      <el-divider></el-divider>


      <el-form-item label="课程描述" prop="content">
        <!-- <el-input type="textarea" rows="5" class="el-form-input-edu" v-model="ruleForm.trialDescription"></el-input> -->

        <div :style="{ width: `${tinymceWidth}px` }">
          <keep-alive>
            <edu-tinymce ref="edu-tinymce-trial" :value="ruleForm.content"></edu-tinymce>
          </keep-alive>
        </div>
      </el-form-item>

      <!-- <el-form-item label="实验手册" prop="manualContent"> -->
      <!-- <el-card class="lab-manual">
          <el-form-item class="marginBottom20" label="标题" prop="manualTitle">
            <el-input v-model="ruleForm.manualTitle" :style="{ 'width': `${tinymceWidth}px` }"></el-input>
          </el-form-item> -->
      <!-- <el-form-item class="marginBottom20">
            <div :style="{ 'width': `${tinymceWidth}px` }">
              <edu-tinymce ref="edu-tinymce" :value='ruleForm.manualContent'></edu-tinymce>
            </div>
          </el-form-item> -->

      <!-- <div :style="{ 'width': `${tinymceWidth}px` }">
          <edu-tinymce ref="edu-tinymce" :value='ruleForm.manualContent'></edu-tinymce>
        </div> -->
      <!-- <el-form-item class="marginBottom20" label="富文本框宽度">
            <el-input-number style="width: 150px;"  v-model="tinymceWidth"></el-input-number >
          </el-form-item> -->
      <!-- </el-card> -->
      <!-- </el-form-item> -->
      <el-form-item>
        <el-button :loading="btnLoading" type="primary" @click="submitForm('ruleForm')">{{ trialId && trialId != 0 ?
          "立即修改" : "立即创建" }}</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="() => this.$router.back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { edaTools } from "@/api/edu/tool";
import { getVmStandards } from "@/api/edu/cloud";
import { handleTrial,  uploadFile, oneTrialTempInfo } from "@/api/edu/labCenter";
import { oneDetail } from "@/api/edu/openClass";
import { handleOpenClass } from "@/api/edu/openClass";
import { getVmByCourseId } from "@/api/edu/cloud";
import VersionSelect from "@/components/VersionSelect";
import VideoUpload from "@/components/VideoUpload";
import EduTinymce from "@/components/Edu-tinymce";
import ImgChoose from "./components/ImgChoose";
import Tools from "@/components/Tools";
import imgUrlList from "@/utils/imageurl";
import labChoose from "./components/labChoose";
import IPAndPDK from "@/components/IPAndPDK";
export default {
  components: {
    VersionSelect,
    VideoUpload,
    EduTinymce,
    ImgChoose,
    labChoose,
    Tools,
    IPAndPDK,
  },
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      edaToolsList: [],
      originEdaToolsList: [],
      toolsList: [],
      choosesEdaToolsList: [],
      chooseImgUrl: "",
      ruleForm: {
        labList: [], //lib
        tools: [], //eda 工具列表
        companyName: "",
        content: "", //实验描述
        name: "", //实验名称
        toolsList: [],
        tools: "",
        architecture: "",
        ipList: [],
        pdkList: [],
      },
      rules: {
        name: [
          { required: true, message: "请输入公开课名称", trigger: "blur" },
        ],

        tools: [{ required: true, message: "请选择工具", trigger: "blur" }],
      },
      courseList: [],
      upVideoDisabled: false,
      dialogImageUrl: "",
      fileList: [],
      filePath: "",
      trialId: 0,
      preVideoVisible: false,
      btnLoading: false,
      tinymceWidth: 800,
      tinymceWidth2: 800,
      pub: false,
      courseName: '',
    };
  },
  created() {
    this.trialId = this.$route.query.id;
    this.pub = this.$route.query.pub;
    this.courseName = this.$route.query.courseName;
  },
  mounted() {
    this.queryVmStandardsList();
    // this.queryCourses();
    if (this.trialId && this.trialId != 0) {
      if (this.pub) {
        oneTrialTempInfo(this.trialId).then((res) => {
          if (res && res.flag) {
            this.ruleForm = res && res.resData;
            this.ruleForm.coverImageDisplayAuthor =
              this.ruleForm.coverImageDisplayAuthor == "1" ? true : false;
            this.ruleForm.ofPublic = this.ruleForm.ofPublic == 1 ? true : false;
            // this.ruleForm.trialCourseRelId = this.trialId;

            // this.queryCompanyToolsList();
            this.$refs["ip"].itemList = this.ruleForm.ipList;
            this.$refs["pdk"].itemList = this.ruleForm.pdkList;
            const tools = this.$refs["tools"];
            tools.type = "lab";
            tools.labTools = this.ruleForm.tools;
            tools.queryCompanyToolsList();
            let architectureList = Object.keys(this.ruleForm.tools);
            this.choosesEdaToolsList = this.ruleForm.tools[architectureList[0]];
            // getCourseForHomeWork("").then((resp) => {
            //   let courseId = this.ruleForm.courseId;
            //   let courseList = resp && resp.resData;
            //   let courseIds = courseList.map((item) => item.id);
            //   if (!~courseIds.indexOf(courseId) && courseId) {
            //     // courseList.push({ id: courseId, name: '课程已删除'})
            //     this.$refs["ruleForm"].model.courseId = "";
            //     this.$message.error({
            //       message: "课程已删除,请重新关联！",
            //       duration: 5000,
            //     });
            //   }
            // });
          }
        });
      } else {
        oneDetail(this.trialId).then((res) => {
          if (res && res.flag) {
            this.ruleForm = res && res.resData;
            this.ruleForm.coverImageDisplayAuthor =
              this.ruleForm.coverImageDisplayAuthor == "1" ? true : false;
            this.ruleForm.ofPublic = this.ruleForm.ofPublic == 1 ? true : false;
            this.ruleForm.trialCourseRelId = this.trialId;

            // this.queryCompanyToolsList();
            this.$refs["ip"].itemList = this.ruleForm.ipList;
            this.$refs["pdk"].itemList = this.ruleForm.pdkList;
            const tools = this.$refs["tools"];
            tools.type = "lab";
            tools.labTools = this.ruleForm.tools;
            tools.queryCompanyToolsList();
            let architectureList = Object.keys(this.ruleForm.tools);
            this.choosesEdaToolsList = this.ruleForm.tools[architectureList[0]];
            // getCourseForHomeWork("").then((resp) => {
            //   let courseId = this.ruleForm.courseId;
            //   let courseList = resp && resp.resData;
            //   let courseIds = courseList.map((item) => item.id);
            //   if (!~courseIds.indexOf(courseId) && courseId) {
            //     // courseList.push({ id: courseId, name: '课程已删除'})
            //     this.$refs["ruleForm"].model.courseId = "";
            //     this.$message.error({
            //       message: "课程已删除,请重新关联！",
            //       duration: 5000,
            //     });
            //   }
            // });
          }
        });
      }
    }

    else {
      this.queryCompanyToolsList();
    }
  },
  methods: {
    getIP(itemList) {
      let ipList = itemList.map((item) => {
        return {
          pdkIpItemId: item.id,
        };
      });
      this.ruleForm.ipList = ipList;
    },
    getPDK(itemList) {
      let pdkList = itemList.map((item) => {
        return {
          pdkIpItemId: item.id,
        };
      });
      this.ruleForm.pdkList = pdkList;
    },
    handleArchitecture(ar) {
      this.ruleForm.architecture = ar;
    },

    handleCompanyName(companyName) {
      console.log(companyName);
      this.ruleForm.companyName = companyName;
    },

    checkThisTools(tools, choosesEdaToolsList) {
      this.ruleForm.tools = tools;
      this.choosesEdaToolsList = choosesEdaToolsList;
    },

    showVideo() {
      this.preVideoVisible = true;
    },

    deleteVideo() {
      this.ruleForm.trialVideoPath = "";
      this.upVideoDisabled = false;
    },
    //查询实验详情
    async queryOneDetail(id) {
      const res = await oneDetail(id);
      console.log(res);
      return res;
    },
    handleRemove() {
      this.fileList = [];
      this.dialogImageUrl = "";
      this.upVideoDisabled = false;
      this.filePath = "";
      this.ruleForm.trialVideoPath = "";
    },
    doUpload(files) {
      let file = files.file;
      let FormDatas = new FormData();
      console.log(files);
      const { type } = file;
      if (type != "video/mp4") {
        this.fileList = [];
        this.$message.error("请上传mp4格式的视频！");
        return;
      }
      FormDatas.append("file", file);
      FormDatas.append("fileRename", file.name);
      FormDatas.append("remark", "");
      console.log("FormDatas", FormDatas);
      this.upVideoDisabled = true;
      this.dialogImageUrl = require("@/assets/upload/loading.svg");
      this.$message.success("正在上传...");
      this.filePath = ""; //上传前清空以前的地址
      uploadFile(FormDatas).then((res) => {
        let resData = res.resData;
        if (res && res.flag && resData) {
          this.$message.success("上传成功");
          this.dialogImageUrl = require("@/assets/upload/file-video.png");
          this.filePath = resData.filePath;
          this.ruleForm.trialVideoPath = this.filePath;
        } else {
          this.$message.error("上传出错");
          this.fileList = [];
          this.upVideoDisabled = false;
          this.dialogImageUrl = require("@/assets/upload/file-video.png");
        }
      });
    },

    getLabsList(labList) {
      labList = labList && labList.length > 0 ? labList.map((item) => {
        return {
          id: item.labId,
          ...item,
        };
      }) : [];
      this.ruleForm.labList = labList;
    },
    async onCourseChange(val) {
      let res = await getVmByCourseId({ id: val });
      if (!(res && res.flag)) {
        this.$refs["ruleForm"].model.courseId = "";
        return;
      }
      this.ruleForm.courseId = val;
      this.handleQuery();
    },
    getContent(value) {
      console.log(value);
    },
    //
    imgClick(index) {
      console.log(index);
      this.chooseImgUrl = this.imgUrlList[index];
      this.ruleForm.coverImageStage = index;
    },
    // 实例规格
    async queryVmStandardsList() {
      const res = await getVmStandards({ status: 1 });
      let vmStandardsList = res && res.resData;
      let memoryAndCoreList = [];
      vmStandardsList.map((item) => {
        let _i = {
          id: item.id,
          memoryAndCore: `${item.cpuCoreCount}核 ${item.memorySize}G`,
        };
        memoryAndCoreList.push(_i);
      });
      this.memoryAndCoreList = memoryAndCoreList;
    },
    // checkThisTools(list) {
    //   this.toolsList = list;
    //   let edaToolsList = cloneDeep(this.edaToolsList);
    //   // let edaToolsList = this.edaToolsList
    //   let choosesEdaToolsList = this.handleToolsList(edaToolsList);
    //   this.ruleForm.tools = choosesEdaToolsList;
    // },
    //
    handleChangeToolVersion(e, index) {
      this.handleVersions(e, index);
    },
    //处理工具选择 ==> 版本选择
    handleVersions(versionName, index) {
      let toolsList = this.toolsList;
      toolsList =
        toolsList &&
        toolsList[index] &&
        toolsList[index].versions.filter((item) => {
          return versionName == item.toolVersion;
        });
      this.toolsList[index].defaultVersions = toolsList && toolsList[0];
    },

    //EDA工具列表查询接口(不包含环境变量等信息) 获取厂商和工具列表
    async queryCompanyToolsList(isReset = false) {
      this.loading = true;
      const res = await edaTools();
      let reBackToolsList = [];
      if (this.trialId && !isReset) {
        reBackToolsList = this.ruleForm.tools;
      }
      const resData = res.resData;
      let originEdaToolsList = resData;
      let edaToolsList = resData;
      //添加了状态的edaToolList
      edaToolsList && edaToolsList.length > 0 && edaToolsList.map((item) => {
        // 给每个工具初始化添加一个选中的状态
        item &&
          item.edaTools.map((_i) => {
            _i.isSelect = false;
            _i.defaultVersions =
              (_i.versions && _i.versions.length > 0 && _i.versions[0]) || null;
          });
        if (!isReset) {
          if (reBackToolsList && reBackToolsList.length > 0) {
            reBackToolsList.map((ri) => {
              if (ri.vendorCode == item.vendorCode) {
                ri &&
                  ri.edaTools.map((rii) => {
                    item &&
                      item.edaTools.map((_i) => {
                        if (rii.id == _i.id) {
                          _i.isSelect = true;
                          _i.defaultVersions =
                            (rii.versions &&
                              rii.versions.length > 0 &&
                              rii.versions[0]) ||
                            null;
                        }
                      });
                  });
              }
            });
          }
        }
        //处理回显
      });
      this.edaToolsList = edaToolsList;
      this.originEdaToolsList = originEdaToolsList;
      this.ruleForm.companyName = resData[0].company; //默认厂商
      this.toolsList = this.handleClickCompanyList(resData[0].company); //默认工具列表
      this.loading = false;
    },

    //根据厂商显示工具列表
    handleClickCompanyList(companyName) {
      let edaToolsList = this.edaToolsList;
      edaToolsList = edaToolsList.filter((item) => {
        return companyName == item.company;
      });
      // console.log(edaToolsList[]);
      let toolsList = edaToolsList[0].edaTools;

      return toolsList;
    },
    // queryToolsList() {
    //   this.toolsList = this.handleClickCompanyList(this.ruleForm.companyName);
    // },

    handleToolsList(edaToolsList) {
      let choosesEdaToolsList = [];

      edaToolsList.map((item) => {
        // 给每个工具初始化添加一个选中的状态
        let selectItem = {
          company: "",
          vendorCode: "",
          edaTools: [],
        };
        item &&
          item.edaTools.map((_i) => {
            if (_i.isSelect) {
              _i.versions = [_i.defaultVersions];
              selectItem.company = item.company;
              selectItem.vendorCode = item.vendorCode;
              selectItem.edaTools.push({
                id: _i.id,
                toolName: _i.toolName,
                versions: _i.versions,
              });
            }
          });
        if (selectItem && selectItem.edaTools.length > 0) {
          choosesEdaToolsList.push(selectItem);
        }
      });

      return choosesEdaToolsList;
    },

    submitForm(formName) {
      this.btnLoading = true;
      let choosesEdaToolsList = this.choosesEdaToolsList;
      if (choosesEdaToolsList && choosesEdaToolsList.length == 0) {
        this.$message.error("请选择工具");
        this.btnLoading = false;
        return;
      }
      this.ruleForm.content =
        this.$refs["edu-tinymce-trial"].getContent();
      let id = this.trialId;
      let text = "添加";
      let data = Object.assign({}, this.ruleForm);
      if (id && id != 0) {
        text = "修改";
        data = Object.assign(data, { id });
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          handleOpenClass(data, id && id != 0 ? 'update' : 'create')
            .then((res) => {
              if (res && res.flag) {
                this.$message.success(`公开课${text}成功`);
                this.btnLoading = false;
                this.$router.back();
              } else {
                this.$message.error(`公开课${text}失败`);
                this.btnLoading = false;
              }
            })
            .finally(() => {
              this.btnLoading = false;
            });
        } else {
          console.log("error submit!!");
          this.btnLoading = false;
          return false;
        }
      });
    },
    resetForm(formName) {
      this.queryCompanyToolsList(true); //重置工具
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .ruleForm {
    .el-form-item__label {
      width: 150px;
    }

    .el-form-input-edu {
      width: 400px;
    }

    .el-form-item__content {
      margin-left: 150px;
    }
  }

  .trialVideoPath {
    width: 100px;
    height: 100px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    overflow: hidden;
    background-image: url("../../../assets/upload/file-video.png");
    background-size: cover;

    .meng {
      width: 100%;
      height: 100%;

      i {
        display: none;
      }
    }

    .meng:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }

    .meng:hover i {
      display: inline;
      color: #fff;
    }
  }

  .el-card-lab {
    .el-card__header {
      padding: 0 20px;
      background-color: #ddd;
    }

    &-header {
      line-height: 40px;
    }

    .show-container {
      position: relative;

      .show-info {
        width: 100%;
        padding: 30px;
        position: absolute;
        left: 0px;
        top: 0px;
        font-size: 24px;
        color: #fff;

        .lab-container {
          border: 1px solid #83a5f5;
          background-color: #83a5f5;
          border-radius: 10px;
          padding: 10px 6px;
          max-width: 90%;
          width: auto !important;
        }
      }

      .show-img {
        width: 519px;
        height: 292px;
      }

      .show-text {
        position: absolute;
        bottom: 30px;
        right: 30px;
        text-align: center;
        min-width: 20%;
        width: 200px;
        height: 50px;
        line-height: 50px;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        font-size: 26px;
        padding-left: 10px;
        padding-right: 10px;
      }
    }
  }

  .editSwitchStyle {
    .el-switch__label--right {
      text-align: left;
      padding-left: 8px;
    }

    .el-switch__label--left {
      text-align: right;
      padding-right: 8px;
    }
  }

  .toolsList-container {
    //防止滚动条让页面上下跳动
    height: 150px;
  }

  .lab-manual {
    width: 980px;
  }
}
</style>
