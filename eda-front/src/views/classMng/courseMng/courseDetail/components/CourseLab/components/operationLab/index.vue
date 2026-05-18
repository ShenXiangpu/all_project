<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
      <el-form-item label="实验名称" prop="trialName">
        <el-input v-model="ruleForm.trialName" class="el-form-input-edu" placeholder="请输入实验名称" maxlength="64"
          show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="关联课程" prop="courseId">
        <el-select disabled @change="onCourseChange" class="el-form-input-edu" v-model="courseId">
          <el-option label="" value="">请选择</el-option>
          <el-option v-for="item in courseList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工具选择" prop="companyName">
        <el-radio-group v-model="ruleForm.companyName" @change="queryToolsList">
          <el-radio-button v-for="(item, index) in edaToolsList" :id="item.company" :key="index" :label="item.company">{{
            item.company }}</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="toolsList" class="toolsList-container">
        <version-select id="toolsList" @handleChangeToolVersion="handleChangeToolVersion" :toolsList="toolsList"
          @checkThisTools="checkThisTools"></version-select>
      </el-form-item>
      <el-form-item label="计算资源" prop="recommendStandard">
        <el-select v-model="ruleForm.recommendStandard" class="el-form-input-edu" placeholder="请选择计算资源">
          <el-option v-for="item in memoryAndCoreList" :key="item.id" :label="item.memoryAndCore"
            :value="item.memoryAndCore"></el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="是否公开" prop="ofPublic">
        <el-switch class="switchStyle editSwitchStyle" v-model="ruleForm.ofPublic" active-text="是" inactive-text="否"
          active-color="#10abb9" inactive-color="#A6A6A6">
        </el-switch>
      </el-form-item>
      <div class="flex">
        <el-form-item label="实验描述" prop="trialDescription">
          <!-- <el-input type="textarea" rows="5" class="el-form-input-edu" v-model="ruleForm.trialDescription"></el-input> -->

          <div v-if="showTinymce" :style="{ 'width': `${tinymceWidth}px` }">

            <edu-tinymce ref="edu-tinymce-trial" :value='ruleForm.trialDescription'></edu-tinymce>
          </div>
        </el-form-item>
        <el-form-item label="实验视频" prop="trialVideoPath">
          <div class="trialVideoPath" v-if="trialId && ruleForm.trialVideoPath">
            <div class="meng flex justify-center align-center font20">
              <i class="el-icon-zoom-in marginRight10 pointer" @click="showVideo"></i>
              <i class="el-icon-delete pointer" @click="deleteVideo"></i>
            </div>
          </div>
          <div v-else>
            <video-upload @handleRemove="handleRemove" @doUpload="doUpload" :disabled="upVideoDisabled"
              :dialogImageUrl="dialogImageUrl" :filePath="filePath" :fileList="fileList"></video-upload>
          </div>

        </el-form-item>
      </div>
      <el-dialog :visible.sync="preVideoVisible">
        <video width="100%" height="100%" controls>
          <source :src="ruleForm.trialVideoPath" type="video/mp4">
          <source :src="ruleForm.trialVideoPath" type="video/ogg">
          <source :src="ruleForm.trialVideoPath" type="video/webm">
        </video>
      </el-dialog>
      <div class="flex">
        <el-form-item label="图片上传">
          <el-card class="el-card-lab">
            <div slot="header" class="clearfix">
              <span>生成图片</span>
            </div>
            <div>
              <el-form-item class="marginBottom20" label="实验类型" prop="coverImageTrialTypeName">
                <el-radio-group v-model="ruleForm.coverImageTrialTypeName">
                  <el-radio label="数字IC设计"></el-radio>
                  <el-radio label="模拟IC设计"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item class="marginBottom20" label="Lab名称" prop="coverImageLabName">
                <el-input v-model="ruleForm.coverImageLabName" placeholder="请输入Lab名称"
                  class="el-form-input-edu"></el-input>
              </el-form-item>
              <!-- <el-form-item class="marginBottom20" label="任务名称" prop="coverImageTaskName">
                <el-input v-model="ruleForm.coverImageTaskName" placeholder="请输入任务名称"
                  class="el-form-input-edu"></el-input>
              </el-form-item> -->
              <el-form-item class="marginBottom20" label="展示作者" prop="coverImageDisplayAuthor">
                <el-switch class="switchStyle editSwitchStyle" v-model="ruleForm.coverImageDisplayAuthor" active-text="是"
                  inactive-text="否" active-color="#10abb9" inactive-color="#A6A6A6">
                </el-switch>
              </el-form-item>
              <el-form-item label="选择图片" prop="coverImageStage">
                <img-choose :coverImageStage="ruleForm && ruleForm.coverImageStage" @imgClick="imgClick"></img-choose>
              </el-form-item>
            </div>
          </el-card>
        </el-form-item>
        <div v-if="chooseImgUrl">
          <el-card class="el-card-lab">
            <div slot="header" class="clearfix el-card-lab-header">
              <span>预览</span>
            </div>
            <div class="show-container">
              <el-image class="show-img" :src="chooseImgUrl" fit="fill"></el-image>
              <!-- <div class="show-text">
                <el-tooltip class="item" effect="dark" :content="ruleForm.coverImageName" placement="top">
                  <div class="view-text">{{ ruleForm.coverImageName }}</div>
                </el-tooltip>
              </div> -->
              <div class="show-info">
                <div class="marginBottom20" style="text-indent: -12px;" v-if="ruleForm.coverImageTrialTypeName">【{{
                  ruleForm.coverImageTrialTypeName }}】</div>
                <el-popover placement="top" trigger="hover">
                  <div
                    v-if="ruleForm && ruleForm.tools && ruleForm.tools[0] && ruleForm.tools[0].edaTools && ruleForm.tools[0].edaTools[0].toolName">
                    {{ ruleForm && ruleForm.tools && ruleForm.tools[0] && ruleForm.tools[0].edaTools &&
                      ruleForm.tools[0].edaTools[0].toolName }}
                  </div>
                  <div slot="reference" class="view-text marginBottom20" style="display: block;width: 90%;"
                    v-if="ruleForm && ruleForm.tools && ruleForm.tools[0] && ruleForm.tools[0].edaTools && ruleForm.tools[0].edaTools[0].toolName">
                    工具：{{ ruleForm && ruleForm.tools && ruleForm.tools[0] && ruleForm.tools[0].edaTools &&
                      ruleForm.tools[0].edaTools[0].toolName }}</div>
                </el-popover>
                <el-popover v-if="ruleForm.coverImageLabName" placement="top" trigger="hover">
                  <div>
                    {{ ruleForm.coverImageLabName }}
                  </div>
                  <div v-if="ruleForm.coverImageLabName" slot="reference" class="view-text lab-container marginBottom20">
                    {{ ruleForm.coverImageLabName }}</div>
                </el-popover>
                <el-popover v-if="ruleForm.coverImageTaskName" placement="top" trigger="hover">
                  <div>
                    {{ ruleForm.coverImageTaskName }}
                  </div>
                  <div v-if="ruleForm.coverImageTaskName" slot="reference" class="primaryColory view-text"
                    style="width: 90%;">{{ ruleForm.coverImageTaskName
                    }}</div>
                </el-popover>

              </div>

              <div v-if="ruleForm.coverImageDisplayAuthor" class="show-text">导师：{{ ruleForm.createByName || name }}</div>
            </div>
          </el-card>
        </div>
      </div>

      <el-form-item label="上传lab" prop="labList">
        <lab-choose :labList="ruleForm.labList" @getLabList="getLabsList" @removeLabList="getLabsList"></lab-choose>
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
          '立即修改' : '立即创建'
        }}</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash'
import { mapGetters } from 'vuex'
import {
  edaTools,
} from "@/api/edu/tool";
import {
  getVmStandards,
} from '@/api/edu/cloud'
import {
  handleTrial,
  oneDetail,
  uploadFile
} from "@/api/edu/labCenter";
import {
  getVmByCourseId,
} from '@/api/edu/cloud'
import VersionSelect from "@/components/VersionSelect";
import VideoUpload from "@/components/VideoUpload";
import EduTinymce from "@/components/Edu-tinymce";
import ImgChoose from './components/ImgChoose'
import imgUrlList from '@/utils/imageurl';
import labChoose from './components/labChoose'
import { getCourseForHomeWork } from "@/api/edu/course"
export default {
  components: {
    VersionSelect,
    VideoUpload,
    EduTinymce,
    ImgChoose,
    labChoose
  },
  props: {
    courseId: {
      default: '0' | 0,
      type: String | Number
    },
    showTinymce: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapGetters([
      'name',
    ])
  },
  data() {
    return {
      edaToolsList: [],
      originEdaToolsList: [],
      toolsList: [],

      imgUrlList: imgUrlList,
      chooseImgUrl: '',
      memoryAndCoreList: [],
      ruleForm: {
        courseId: '', //课程id
        coverImageDisplayAuthor: true,//封面图：是否展示作者 1-展示 0-否
        coverImageName: '',//封面图展示的实验名称
        coverImageStage: '',//封面图展示的实验名称
        labList: [],//lib
        // manualContent: '',//实验手册内容
        // manualTitle: '',//实验手册标题
        ofPublic: true, //是否公开 1-公开 0-不公开
        recommendStandard: '',//推荐配置
        tools: [],//eda 工具列表
        companyName: '',
        trialDescription: '',//实验描述
        trialName: '',//实验名称
        trialVideoPath: '',//实验视频的链接
        toolsList: [],
        coverImageTrialTypeName: '',
        coverImageLabName: '',
        coverImageTaskName: '',

      },
      rules: {
        trialName: [
          { required: true, message: '请输入实验名称', trigger: 'blur' }
        ],
        companyName: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        tools: [
          { required: true, message: '请选择工具', trigger: 'blur' }
        ],
        recommendStandard: [
          { required: true, message: '请选择推荐配置', trigger: 'blur' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        ofPublic: [
          { required: true, }
        ],
        trialDescription: [
          { required: true, message: '请输入实验描述', trigger: 'blur' }
        ],
        // manualTitle: [
        //   { required: true, message: '请输入实验手册标题', trigger: 'blur' }
        // ],
        // manualContent: [
        //   { required: true, message: '请输入实验手册内容', trigger: 'blur' }
        // ],
        coverImageTrialTypeName: [
          { required: true, message: '请选择实验类型', trigger: 'blur' }
        ],


        // coverImageName: [
        //   { required: true, message: '请输入实验描述', trigger: 'blur' }
        // ],
        coverImageDisplayAuthor: [
          { required: true, }
        ],
        coverImageStage: [
          { required: true, message: '请选择图片', trigger: 'blur' }
        ],
      },
      courseList: [],
      upVideoDisabled: false,
      dialogImageUrl: '',
      fileList: [],
      filePath: '',
      trialId: 0,
      preVideoVisible: false,
      btnLoading: false,
      tinymceWidth: 800,
      tinymceWidth2: 800

    };
  },
  created() {
    // this.trialId = this.$route.query.id
    this.ruleForm.courseId = this.courseId
  },
  mounted() {
    this.queryVmStandardsList();
    this.queryCourses();
    if (this.trialId) {
      oneDetail(this.trialId).then(res => {
        if (res && res.flag) {
          this.ruleForm = res && res.resData
          this.ruleForm.coverImageDisplayAuthor = this.ruleForm.coverImageDisplayAuthor == '1' ? true : false
          this.ruleForm.ofPublic = this.ruleForm.ofPublic == 1 ? true : false
          this.ruleForm.trialCourseRelId = this.trialId
          this.queryCompanyToolsList();
          getCourseForHomeWork('').then(resp => {
            let courseId = this.courseId
            let courseList = resp && resp.resData;
            let courseIds = courseList.map(item => item.id)
            if (!~courseIds.indexOf(courseId) && courseId) {
              // courseList.push({ id: courseId, name: '课程已删除'})
              this.$refs['ruleForm'].model.courseId = ''
              this.$message.error({ message: '课程已删除,请重新关联！', duration: 5000 })
            }
          })
        }
      })
    } else {
      this.queryCompanyToolsList();
    }
  },
  methods: {


    showVideo() {
      this.preVideoVisible = true
    },

    deleteVideo() {
      this.ruleForm.trialVideoPath = ''
    },
    //查询实验详情
    async queryOneDetail(id) {
      const res = await oneDetail(id)
      console.log(res);
      return res
    },
    handleRemove() {

      this.fileList = [];
      this.dialogImageUrl = '';
      this.upVideoDisabled = false
      this.filePath = ''
      this.ruleForm.trialVideoPath = ''
    },
    doUpload(files) {
      let file = files.file
      let FormDatas = new FormData();
      console.log(files);
      const { type } = file
      if (type != 'video/mp4') {
        this.fileList = []
        this.$message.error('请上传mp4格式的视频！')
        return
      }
      FormDatas.append("file", file);
      FormDatas.append("fileRename", file.name);
      FormDatas.append("remark", '');
      console.log('FormDatas', FormDatas);
      this.upVideoDisabled = true
      this.dialogImageUrl = require('@/assets/upload/loading.svg');
      this.$message.success("正在上传...");
      uploadFile(FormDatas).then(res => {
        let resData = res.resData;
        if (res && res.flag && resData) {
          this.$message.success("上传成功");
          this.dialogImageUrl = require('@/assets/upload/file-video.png');
          this.filePath = resData.filePath
          this.ruleForm.trialVideoPath = this.filePath
        } else {
          this.$message.error("上传出错");
          this.fileList = []
          this.upVideoDisabled = false
          this.dialogImageUrl = require('@/assets/upload/file-video.png');
        }
      });
    },





    getLabsList(labList) {
      this.ruleForm.labList = labList
    },
    async onCourseChange(val) {
      let res = await getVmByCourseId({ id: val })
      if (!(res && res.flag)) {
        this.$refs['ruleForm'].model.courseId = ''
        return
      }
      this.ruleForm.courseId = val;
      this.handleQuery()
    },
    queryCourses() {
      getCourseForHomeWork('').then(res => {
        this.courseList = res && res.resData;
      })
    },


    getContent(value) {
      console.log(value);
    },
    //
    imgClick(index) {
      console.log(index);
      this.chooseImgUrl = this.imgUrlList[index];
      this.ruleForm.coverImageStage = index
    },
    // 实例规格
    async queryVmStandardsList() {
      const res = await getVmStandards({ status: 1 })
      let vmStandardsList = res && res.resData;
      let memoryAndCoreList = []
      vmStandardsList.map(item => {
        let _i = {
          id: item.id,
          memoryAndCore: `${item.cpuCoreCount}核 ${item.memorySize}G`
        }
        memoryAndCoreList.push(_i)
      })
      this.memoryAndCoreList = memoryAndCoreList
    },
    checkThisTools(list) {
      this.toolsList = list
      let edaToolsList = cloneDeep(this.edaToolsList)
      // let edaToolsList = this.edaToolsList
      let choosesEdaToolsList = this.handleToolsList(edaToolsList)
      this.ruleForm.tools = choosesEdaToolsList
    },
    //
    handleChangeToolVersion(e, index) {
      this.handleVersions(e, index)
    },
    //处理工具选择 ==> 版本选择
    handleVersions(versionName, index) {
      let toolsList = this.toolsList
      toolsList = toolsList && toolsList[index] && toolsList[index].versions.filter(item => {
        return versionName == item.toolVersion
      })
      this.toolsList[index].defaultVersions = toolsList && toolsList[0]
    },

    //EDA工具列表查询接口(不包含环境变量等信息) 获取厂商和工具列表
    async queryCompanyToolsList() {
      this.loading = true
      const res = await edaTools();
      let reBackToolsList = []
      if (this.trialId) {
        reBackToolsList = this.ruleForm.tools
      }
      const resData = res.resData;
      let originEdaToolsList = resData
      let edaToolsList = resData
      //添加了状态的edaToolList
      edaToolsList.map(item => {
        // 给每个工具初始化添加一个选中的状态
        item && item.edaTools.map(_i => {
          _i.isSelect = false
          _i.defaultVersions = _i.versions && _i.versions.length > 0 && _i.versions[0] || null
        })
        //处理回显
        if (reBackToolsList && reBackToolsList.length > 0) {
          reBackToolsList.map(ri => {
            if (ri.vendorCode == item.vendorCode) {
              ri && ri.edaTools.map(rii => {
                item && item.edaTools.map(_i => {
                  if (rii.id == _i.id) {
                    _i.isSelect = true
                    _i.defaultVersions = rii.versions && rii.versions.length > 0 && rii.versions[0] || null
                  }
                })
              })
            }
          })
        }
      })
      this.edaToolsList = edaToolsList
      this.originEdaToolsList = originEdaToolsList
      this.ruleForm.companyName = resData[0].company //默认厂商
      this.toolsList = this.handleClickCompanyList(resData[0].company) //默认工具列表
      this.loading = false
    },

    //根据厂商显示工具列表
    handleClickCompanyList(companyName) {
      let edaToolsList = this.edaToolsList;
      edaToolsList = edaToolsList.filter(item => {
        return companyName == item.company
      })
      // console.log(edaToolsList[]);
      let toolsList = edaToolsList[0].edaTools

      return toolsList
    },
    queryToolsList() {
      this.toolsList = this.handleClickCompanyList(this.ruleForm.companyName)
    },

    handleToolsList(edaToolsList) {
      let choosesEdaToolsList = []

      edaToolsList.map(item => {
        // 给每个工具初始化添加一个选中的状态
        let selectItem = {
          company: '',
          vendorCode: '',
          edaTools: []
        }
        item && item.edaTools.map(_i => {
          if (_i.isSelect) {
            _i.versions = [_i.defaultVersions]
            selectItem.company = item.company
            selectItem.vendorCode = item.vendorCode
            selectItem.edaTools.push({
              id: _i.id,
              toolName: _i.toolName,
              versions: _i.versions,
            })
          }
        })
        if (selectItem && selectItem.edaTools.length > 0) {
          choosesEdaToolsList.push(selectItem)
        }
      })

      return choosesEdaToolsList
    },

    submitForm(formName) {

      this.btnLoading = true;

      let edaToolsList = this.edaToolsList
      let choosesEdaToolsList = this.handleToolsList(edaToolsList)

      if (choosesEdaToolsList && choosesEdaToolsList.length == 0) {
        this.$message.error('请选择工具')
        this.btnLoading = false;
        return
      }
      this.choosesEdaToolsList = choosesEdaToolsList
      // this.ruleForm.manualContent = this.$refs['edu-tinymce'].getContent()

      this.ruleForm.trialDescription = this.$refs['edu-tinymce-trial'].getContent()
      this.ruleForm.tools = choosesEdaToolsList

      let trialId = this.trialId
      let method = 'post'
      let text = '添加'
      if (trialId && trialId != 0) {
        method = 'put'
        text = '修改'
      } else {

      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let coverImageDisplayAuthor = this.ruleForm.coverImageDisplayAuthor
          this.ruleForm.coverImageDisplayAuthor = coverImageDisplayAuthor ? 1 : 0
          /**
           * 
           * 1. 课程id不为空，则判断实验是否公开
           * 2. 课程id为空，则默认公开
           */
          if (this.ruleForm.courseId) {
            let ofPublic = this.ruleForm.ofPublic
            this.ruleForm.ofPublic = ofPublic ? 1 : 0
          } else {
            this.ruleForm.ofPublic = 1
          }
          let data = {
            params: this.ruleForm,
            method,
          }
          handleTrial(data).then(res => {
            if (res && res.flag) {
              this.$message.success(`实验${text}成功`)
              this.btnLoading = false;
              this.$emit('handleClose')

              this.$emit('queryList')
            } else {
              // this.$message.error(`实验${text}失败`)
              this.btnLoading = false;
            }
          }).finally(() => {
            this.btnLoading = false;
          })
        } else {
          console.log('error submit!!');
          this.btnLoading = false;
          return false;
        }
      });
    },
    resetForm() {
      this.$refs['ruleForm'].resetFields();
      this.$refs['edu-tinymce-trial'].content = '' //置空富文本
      this.queryCompanyToolsList();
    }
  }
}
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
    background-image: url('../../../../../../../../assets/upload/file-video.png');
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