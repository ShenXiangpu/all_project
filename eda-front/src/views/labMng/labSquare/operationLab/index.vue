<template>
  <div class="app-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
      <el-form-item label="实验名称" prop="trialName">
        <el-input v-model="ruleForm.trialName" class="el-form-input-edu"></el-input>
      </el-form-item>
      <el-form-item label="关联课程" prop="courseId">
        <el-select @change="onCourseChange" class="el-form-input-edu" v-model="ruleForm.courseId">
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
      <el-form-item prop="toolsList">
        <version-select id="toolsList" @handleChangeToolVersion="handleChangeToolVersion" :toolsList="toolsList"
          @checkThisTools="checkThisTools"></version-select>
      </el-form-item>
      <el-form-item label="推荐配置" prop="recommendStandard">
        <el-select v-model="ruleForm.recommendStandard" class="el-form-input-edu" placeholder="请选择配置">
          <el-option v-for="item in memoryAndCoreList" :key="item.id" :label="item.memoryAndCore"
            :value="item.memoryAndCore"></el-option>

        </el-select>
      </el-form-item>
      <el-form-item label="是否公开" prop="ofPublic">
        <!-- <el-radio-group v-model="ruleForm.ofPublic">
          <el-radio label="公开"></el-radio>
          <el-radio label="不公开"></el-radio>
        </el-radio-group> -->
        <el-switch v-if="this.ruleForm.courseId" class="switchStyle" v-model="ruleForm.ofPublic" active-text="公开"
          inactive-text="不公开" active-color="#02C733" inactive-color="#A6A6A6">
        </el-switch>
        <span v-else class="primaryColor">未关联课程，默认选择公开</span>

      </el-form-item>
      <div class="flex">
        <el-form-item label="实验描述" prop="trialDescription">
          <el-input type="textarea" rows="5" class="el-form-input-edu" v-model="ruleForm.trialDescription"></el-input>
        </el-form-item>
        <el-form-item label="实验视频" prop="trialVideoPath">
          <video-upload @handleRemove="handleRemove" @doUpload="doUpload" :disabled="upVideoDisabled"
            :dialogImageUrl="dialogImageUrl" :filePath="filePath" :fileList="fileList"></video-upload>
        </el-form-item>
      </div>
      <div class="flex">
        <el-form-item label="图片上传">
          <el-card class="el-card-lab">
            <div slot="header" class="clearfix">
              <span>生成图片</span>
            </div>
            <div>
              <el-form-item label="实验标题" prop="coverImageName">
                <el-input v-model="ruleForm.coverImageName" class="el-form-input-edu"></el-input>
              </el-form-item>
              <el-form-item label="展示作者" prop="coverImageDisplayAuthor">
                <el-switch class="switchStyle" v-model="ruleForm.coverImageDisplayAuthor" active-text="是"
                  inactive-text="否" active-color="#02C733" inactive-color="#A6A6A6">
                </el-switch>
              </el-form-item>
              <el-form-item label="选择图片" prop="coverImageStage">
                <img-choose @imgClick="imgClick"></img-choose>
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
              <div class="show-text">
                <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
                  <div class="view-text">{{ ruleForm.coverImageName }}</div>
                </el-tooltip>

              </div>
            </div>
          </el-card>
        </div>
      </div>

      <el-form-item label="上传lab" prop="labList">
        <lab-choose @getLabList="getLabsList" @removeLabList="getLabsList"></lab-choose>
      </el-form-item>
      <el-form-item label="实验手册">
        <el-card>
          <el-form-item class="marginBottom20" label="标题" prop="manualTitle">
            <el-input v-model="ruleForm.manualTitle" class="el-form-input-edu"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="manualContent">
            <div style="width: 800px;">
              <edu-tinymce ref="edu-tinymce" value=''></edu-tinymce>
            </div>

          </el-form-item>
        </el-card>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  edaTools,
} from "@/api/edu/tool";
import {
  getVmStandards,
  getVmByVmId,
  getPolicyByVmId,
} from '@/api/edu/cloud'
import {
  uploadLab,
} from "@/api/edu/lab";

import {
  handleTrial,
} from "@/api/edu/labCenter";

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
        manualContent: '',//实验手册内容
        manualTitle: '',//实验手册标题
        ofPublic: true, //是否公开 1-公开 0-不公开
        recommendStandard: '',//推荐配置
        tools: [],//eda 工具列表
        companyName: '',
        trialDescription: '',//实验描述
        trialName: '',//实验名称
        trialVideoPath: '',//实验视频的链接
        toolsList: []
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
        manualTitle: [
          { required: true, message: '请输入实验手册标题', trigger: 'blur' }
        ],
        manualContent: [
          { required: true, message: '请输入实验手册内容', trigger: 'blur' }
        ],


        coverImageName: [
          { required: true, message: '请输入实验描述', trigger: 'blur' }
        ],
        coverImageDisplayAuthor: [
          { required: true, }
        ],
        coverImageStage: [
          { required: true, message: '请输入实验手册内容', trigger: 'blur' }
        ],
      },
      courseList: [],
      upVideoDisabled: false,
      dialogImageUrl: '',
      fileList: [],
      filePath: ''
    };
  },
  mounted() {
    this.queryCompanyToolsList();
    this.queryVmStandardsList();
    this.queryCourses();
  },
  methods: {
    handleRemove() {

      this.fileList = [];
      this.dialogImageUrl = '';
      this.upVideoDisabled = false
      this.filePath = ''
      this.ruleForm.trialVideoPath = ''
    },
    doUpload(FormDatas) {
      this.upVideoDisabled = true
      this.dialogImageUrl = require('@/assets/upload/loading.svg');
      uploadLab(FormDatas).then(res => {
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
      let labsList = labList.map(iterator => {
        return {
          labId: iterator.id,
          realName: iterator.realName,
          displayName: iterator.displayName,
          filePath: iterator.filePath,
          fileSize: iterator.fileSize
        }
      })
      console.log(labsList);

      this.ruleForm.labList = labsList
    },
    onCourseChange(val) {
      this.ruleForm.courseId = val;
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
      if (this.vmId) {
        const res = await getVmByVmId({ id: this.vmId })
        const res1 = await getPolicyByVmId({ id: this.vmId })

        let vmObj = res.resData
        let policyObj = res1.resData
        this.reBackVmDetail(vmObj, policyObj)
        reBackToolsList = JSON.parse(vmObj.tools)
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

      // if (this.vmId) {
      //     this.queryVmDetailById(this.vmId)
      // }
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
    submitForm(formName) {

      let edaToolsList = this.edaToolsList
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
      if (choosesEdaToolsList && choosesEdaToolsList.length == 0) {
        this.$message.error('请选择工具')
        return
      }
      this.choosesEdaToolsList = choosesEdaToolsList

      this.ruleForm.manualContent = this.$refs['edu-tinymce'].getContent()
      this.ruleForm.tools = choosesEdaToolsList

      /**
       * 
       * 1. 课程id不为空，则判断实验是否公开
       * 2. 课程id为空，则默认公开
       */


      let method = 'post'
      this.$refs[formName].validate((valid) => {

        if (valid) {
          if (this.ruleForm.courseId) {
            let ofPublic = this.ruleForm.ofPublic
            this.ruleForm.ofPublic = ofPublic ? 1 : 0
          } else {
            this.ruleForm.ofPublic = 1
          }

          let coverImageDisplayAuthor = this.ruleForm.coverImageDisplayAuthor
          this.ruleForm.coverImageDisplayAuthor = coverImageDisplayAuthor ? 1 : 0
          
          let data = {
            params: this.ruleForm,
            method,
          }
          handleTrial(data).then(res => {
            if (res && res.flag) {
              this.$message.success('实验添加成功')
              this.$router.push('/lab')
            } else {
              this.$message.success('实验添加失败')
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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


      .show-img {
        width: 300px;
        height: 188;
      }

      .show-text {
        position: absolute;
        top: 30px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        font-size: 16px;
        padding-left: 10px;
        padding-right: 10px;
      }

    }



  }

}
</style>