<template>
    <div>
        <el-card class="el-card-question">
            <template #header>
                {{ questionType[answerType - 1].typeName }}
            </template>
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <!-- <el-form-item label="标题" class="el-form-edu" prop="title">
                    <el-input placeholder="请输入标题" v-model="form.title" show-word-limit maxlength="20"
                        class="el-form-input-edu marginRight20"></el-input>
                    <span class="primaryColoro">注意：标题不是题目，尽量简短，便于区分和展示</span>
                </el-form-item> -->

                <el-form-item label="题目内容" prop="content">
                    <edu-tinymce :id="'tinymce-content'" ref="tinymce-content" :value='form.content'
                        :initConfig="tinymceConfig1" />
                </el-form-item>
                <tips-form-item class="marginBottom20" :formProp="'labelIds'" :checkTipsList="checkTipsList"
                    :tipsList="tipsList" :dialogTipsVisible="dialogTipsVisible" @closeTip="closeTip"
                    @handleChooseTips="handleChooseTips" @handleTipClick="handleTipClick" @submitTips="submitTips"
                    @handleTipsClose="handleTipsClose"></tips-form-item>
                <el-form-item label="题目图片" prop="contentPic">
                    <upload-img :fileList="fileList" :filePath="filePath" :disabled="upVideoDisabled"
                        @handleRemove="handleRemove" @doUpload="doUpload"></upload-img>
                </el-form-item>
                <el-form-item :label="questionType[answerType - 1].typeTitle" prop="answers">
                    <reference-answer ref="getAnswers" v-if="answerType == 1 || answerType == 2 || answerType == 3"
                        :type="answerType"></reference-answer>
                    <edu-tinymce v-else :id="'tinymce-answer'" ref="tinymce-answer" :value="tinymceAnswer"
                        :initConfig="tinymceConfig2" />
                </el-form-item>
                <el-form-item label="答案解析" prop="analysis">
                    <edu-tinymce :id="'tinymce-jiexi'" :value='form.analysis' ref="tinymce-jiexi"
                        :initConfig="tinymceConfig2" />
                </el-form-item>
                <div>
                    <el-form-item label="题目难度" prop="level">
                        <el-select placeholder="请选择难度" v-model="form.level">
                            <el-option label="简单" value="1"></el-option>
                            <el-option label="中等" value="2"></el-option>
                            <el-option label="困难" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <div class="footer-btn">
                      <el-form-item >
                        <el-button type="primary" @click="onSubmit">{{ id ? '立即修改' : '立即创建' }}</el-button>
                        <el-button @click="reBack">取消</el-button>
                    </el-form-item>
                    </div>

                </div>

            </el-form>
        </el-card>
    </div>
</template>

<script>
const defaultConfig = {
    width: '100%',
    height: '100%',
    menubar: true,
    language: 'zh_CN'
}
const questionType = [
    {
        typeName: '单选题',
        typeTitle: '题目答案'
    },
    {
        typeName: '多选题',
        typeTitle: '题目答案'
    },
    {
        typeName: '判断题',
        typeTitle: '题目答案'
    },
    {
        typeName: '简答题',
        typeTitle: '参考答案'
    },
    {
        typeName: '实操题',
        typeTitle: '参考代码'
    },
]
import axios from 'axios'
import plugins from './plugins'
import plugins2 from './plugins2'
import toolbar from './toolbars'
import toolbar2 from './toolbars2'
import { cloneDeep } from 'lodash'
import fontFormats from './fontFormats'
import EduTinymce from '@/components/Edu-tinymce';
import TipsFormItem from '../../components/Tips-FormItem.vue';
import ReferenceAnswer from './ReferenceAnswer';
import { uploadFile } from '@/api/edu/labCenter'
import {
    addOrUpdataQuestionItem,
    getItemById,
    getListLables
} from '@/api/edu/question'
import { getToken, getRefreshToken } from '@/utils/auth'

import VideoUpload from "@/components/VideoUpload";
import UploadImg from '../../../components/UploadImg.vue'

export default {
    name: 'QuestionTemplate',
    components: {
        EduTinymce,
        TipsFormItem,
        ReferenceAnswer,
        VideoUpload,
        UploadImg
    },
    props: {

        answerType: {
            type: Number,
            default: 0
        },
        answerBank: {
            type: Number,
            default: 0
        },
        config: {
            type: Object,
            default: () => {
                return {
                    width: '500px',
                    height: 400,
                    menubar: true,
                    language: 'zh_CN'
                }
            }
        },
        id: {
            type: Number,
            default: 0
        },
    },
    mounted() {

    },
    data() {
        return {
            tinymceAnswer: '',
            upVideoDisabled: false,
            dialogImageUrl: '',
            fileList: [],
            filePath: '',
            questionType: questionType,
            tipsList: [],
            checkTipsList: [],
            dialogTipsVisible: false,
            labelIds: '',//标签ids
            form: {
                analysis: '',
                answers: [],
                content: '',
                contentPic: '',
                labelIds: [],
                level: '',
                quBankId: '',
                quTypeId: '',
                remark: '',
                // title: ''
            },
            rules: {
                // title: [
                //     { required: true, message: '请输入标题', trigger: 'blur' },
                // ],
                content: [
                    { required: true, message: '请输入内容', }
                ],
                answers: [
                    { required: true, message: '请选择或输入答案以及答案内容', trigger: 'change' }
                ],
                // analysis: [
                //     { required: true, message: '请输入答案解析', }
                // ],
                level: [
                    { required: true, message: '请选择题目难度', }
                ],
            },
            tinymceConfig1: {
                relative_urls: false,
                remove_script_host: false,
                convert_urls: true,
                statusbar: false,
                content_style: `img {max-width:466px;height:auto;vertical-align:top}`,
                plugins,
                toolbar,
                width: Object.assign(defaultConfig, this.config).width,
                height: Object.assign(defaultConfig, this.config).height,
                menubar: Object.assign(defaultConfig, this.config).menubar,
                language_url: "/tinymce/langs/zh-Hans.js",
                language: "zh-Hans",
                font_formats: fontFormats,
                fontsize_formats: '12px 14px 16px 18px 24px 36px 48px',
                image_dimensions: false,
                images_upload_handler: async (blobInfo, successFun) => {
                    const file = blobInfo.blob()
                    const { url } = await this.uploadFiles(file, 'image')
                    console.log(url, 'url', file);
                    successFun(url)
                },
                file_picker_types: 'media',
                file_picker_callback: (callback, value, meta) => {
                    if (meta.filetype === 'media') {
                        const input = document.createElement('input')
                        input.setAttribute('type', 'file')
                        const that = this // 为 Vue 构造函数中的 this，指向 Vue 实例对象
                        input.onchange = async function () {
                            const file = this.files[0] // 为 HTMLInputElement 构造函数中的 this，指向 input 实例对象
                            const isValid = await that.validateVideo(file)

                            if (isValid) {
                                const { url } = await that.uploadFiles(file, 'video')
                                callback(url)
                            } else {
                                callback()
                            }
                        }

                        input.click()
                    }
                },

            },
            tinymceConfig2: {
                relative_urls: false,
                remove_script_host: false,
                convert_urls: true,
                statusbar: false,
                content_style: 'img {max-width:466px;height:auto;vertical-align:top}',
                plugins: plugins2,
                toolbar2,
                width: Object.assign(defaultConfig, this.config).width,
                height: Object.assign(defaultConfig, this.config).height,
                menubar: Object.assign(defaultConfig, this.config).menubar,
                language_url: "/tinymce/langs/zh-Hans.js",
                language: "zh-Hans",
                font_formats: fontFormats,
                fontsize_formats: '12px 14px 16px 18px 24px 36px 48px',
                image_dimensions: false,
                images_upload_handler: async (blobInfo, successFun) => {
                    const file = blobInfo.blob()
                    const { url } = await this.uploadFiles(file, 'image')
                    console.log(url, 'url', file);
                    successFun(url)
                },
                file_picker_types: 'media',
                file_picker_callback: (callback, value, meta) => {
                    if (meta.filetype === 'media') {
                        const input = document.createElement('input')
                        input.setAttribute('type', 'file')
                        const that = this // 为 Vue 构造函数中的 this，指向 Vue 实例对象
                        input.onchange = async function () {
                            const file = this.files[0] // 为 HTMLInputElement 构造函数中的 this，指向 input 实例对象
                            const isValid = await that.validateVideo(file)

                            if (isValid) {
                                const { url } = await that.uploadFiles(file, 'video')
                                callback(url)
                            } else {
                                callback()
                            }
                        }

                        input.click()
                    }
                },

            }
        }
    },
    computed: {},
    watch: {},
    created() {
        this.queryListLables();
    },
    methods: {
        //
        reBack() {
            this.$router.back()
        },
        // 修改查询
        queryQuestionObj(id, list) {
            getItemById({ id }).then(res => {
                if (res && res.flag) {
                    let resData = res.resData;
                    let analysis = resData && resData.analysis;
                    // let title = resData && resData.title;
                    let content = resData && resData.content;
                    let answers = resData && resData.answers;
                    let answerType = this.answerType
                    if (answerType == 1 || answerType == 2) {
                        let oanswers = this.$refs['getAnswers'].answer
                        for (let i = 0; i < answers.length; i++) {
                            oanswers[i].ansName = answers[i].content
                            oanswers[i].isCheck = answers[i].isRight == 1 ? true : false
                            oanswers[i].show = true
                        }
                        this.$refs['getAnswers'].answer = oanswers
                    } else if (answerType == 3) {
                        let oanswers = this.$refs['getAnswers'].answerP
                        for (let i = 0; i < answers.length; i++) {
                            oanswers[i].ansName = answers[i].content
                            oanswers[i].isCheck = answers[i].isRight == 1 ? true : false
                            oanswers[i].show = true
                        }
                        this.$refs['getAnswers'].answerP = oanswers
                    } else {
                        //简答题，机试题
                        // tinymceAnswer

                        this.tinymceAnswer = answers[0].content
                    }
                    let contentPic = resData.contentPic || '';
                    if (contentPic) {
                        this.upVideoDisabled = true
                        this.filePath = contentPic;
                        this.fileList = [{ contentPic }] //对象数组
                    }

                    let labelIds = resData.labelIds;
                    this.checkTipsList = this.handleReWatchTipList(labelIds, list)
                    let level = resData.level;
                    let quBankId = resData.quBankId;
                    let quTypeId = resData.quBankId;
                    let form = {
                        analysis,
                        answers,
                        content,
                        contentPic,
                        labelIds,
                        level,
                        quBankId,
                        quTypeId,
                        // title
                    }
                    this.form = form
                    // this.question = resData;

                }

            })
        },
        handleReWatchTipList(labelIds, tipsList) {
            labelIds.map(idItem => {
                tipsList && tipsList.length > 0 && tipsList.map(item => {
                    let items = item && item.children
                    items.map(_i => {
                        if (_i.id == idItem) {
                            _i.isSelect = true
                        }
                    })
                })
            })
            return tipsList
        },

        /**
         * @description 上传文件
         * @param {File} file - 要上传的文件
         * @param {string} folder - 所存放的文件夹
         * @returns {Object}
         */
        async uploadFiles(file, folder = 'images') {
            const formData = new FormData()
            formData.append('file', file)
            // 注：此为调用后端上传接口，需根据实际情况进行调整
            const { data } = await axios({
                method: 'POST',
                url: '/edu/sso-service/trial/file/uploadFile',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data', "Auth-token": getToken() }
            })
            console.log(data);
            if (data && data.flag) {
                const resData = data.resData
                return {
                    url: resData.filePath,
                    name: resData.displayName
                }
            }

        },

        showVideo() {
            this.preVideoVisible = true
        },

        deleteVideo() {
            this.form.contentPic = ''
        },

        handleRemove() {
            this.fileList = [];
            this.upVideoDisabled = false
            this.filePath = ''
            this.form.contentPic = ''
        },
        doUpload(files) {
            let file = files.file
            let FormDatas = new FormData();
            console.log(files);
            const { type } = file
            let imageTypeList = [
                'image/png',
                'image/jpeg',
                'image/jpg',
                'image/gif',
                'image/bmp',
            ]
            if (imageTypeList.indexOf(type) === -1) {
                this.fileList = []
                this.$message.error('请上传png、jpg、gif、bmp格式的图片！')
                return
            }
            FormDatas.append("file", file);
            FormDatas.append("fileRename", file.name);
            FormDatas.append("remark", '');
            console.log('FormDatas', FormDatas);
            this.upVideoDisabled = true
            uploadFile(FormDatas).then(res => {
                let resData = res.resData;
                if (res && res.flag && resData) {
                    this.$message.success("上传成功");
                    this.filePath = resData.filePath
                } else {
                    this.$message.error("上传出错");
                    this.fileList = []
                    this.upVideoDisabled = false
                }
            });
        },

        //查询标签
        queryListLables() {
            getListLables().then(res => {
                let resData = res && res.resData
                resData && resData.length > 0 && resData.map(item => {
                    let items = item && item.children
                    items.map(_i => {
                        _i.isSelect = false
                    })
                })
                this.tipsList = resData;
                if (this.id) {
                    this.queryQuestionObj(this.id, resData)
                }
            })
        },
        checkIsChecked(answers) {
            let nums = 0
            let contentNum = 0
            answers && answers.length > 0 && answers.map(i => {
                if (i.isRight == 1) {
                    nums++
                }
                if (i.content) {
                    contentNum++
                }
            })
            return (nums > 0 && contentNum == answers.length) ? true : false
        },
        /**
         * 根据试题type处理answer
         */
        queryAnswer() {
            let answerType = this.answerType
            console.log(answerType);
            let answers = []
            if (answerType == 4 || answerType == 5) {
                let content = this.$refs['tinymce-answer'].getContent()
                if ((!content) || content == '') {
                    return false
                } else {
                    let item = {
                        content,
                        isRight: 1
                    }
                    answers.push(item)
                }
                return answers
            } else {
                let getAnswers = this.$refs['getAnswers'].getAnswers()
                getAnswers && getAnswers.length > 0 && getAnswers.map(item => {
                    if (item.show) {
                        let i = {}
                        i.content = item.ansName
                        i.isRight = item.isCheck ? 1 : 0
                        answers.push(i)
                    }
                })
                const ans = this.checkIsChecked(answers)
                return ans ? answers : false
            }

        },
        onSubmit() {
            let analysis = this.$refs['tinymce-jiexi'].getContent()
            let content = this.$refs['tinymce-content'].getContent();
            let quTypeId = `${this.answerType}`;
            let quBankId = `${this.answerBank}`;
            let labelIds = this.labelIds;
            let answers = this.queryAnswer()
            if (answers) {
                this.form.answers = answers
            } else {
                this.form.answers = null
            }

            this.form.analysis = analysis
            this.form.content = content
            this.form.contentPic = this.filePath
            this.form.labelIds = labelIds
            this.form.quBankId = quBankId
            this.form.quTypeId = quTypeId
            this.form.remark = ''
            if (this.id) {
                this.form.id = this.id
            }
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    addOrUpdataQuestionItem(this.form).then(res => {
                        if (res && res.resData) {
                            this.$message.success('成功')
                            this.$router.push({
                                path: '/classMng/questionList', query: { id: this.form.quBankId }
                            })
                        }
                    })
                }
            });
        },


        //点击选择标签
        handleChooseTips() {
            let checkTipsList = this.checkTipsList
            if (checkTipsList && checkTipsList.length > 0) {
                this.tipsList = cloneDeep(checkTipsList)
            }
            this.dialogTipsVisible = true;

        },
        handleTipsClose() {
            this.dialogTipsVisible = false;
        },
        closeTip(checkTipsList) {
            this.checkTipsList = cloneDeep(checkTipsList)
            this.tipsList = cloneDeep(checkTipsList)
            let tipsListStr = this.queryTipsListStr(checkTipsList)
            this.labelIds = tipsListStr
        },

        queryTipsListStr(tipsList) {
            let tipsListStr = []
            tipsList && tipsList.length > 0 && tipsList.map(item => {
                let tips = item.children
                tips.map(i => {
                    i.isSelect && tipsListStr.push(i.id)
                })
            })
            console.log(tipsListStr.toString());
            return tipsListStr.toString()
        },

        submitTips(tipsList) {
            let num = 0
            tipsList.map(item => {
                let tips = item.children
                tips.map(i => {
                    if (i.isSelect) {
                        num++
                    }
                })
            })
            if (num > 5) {
                this.$message.error('最多选择5标签')
                return
            }
            let checkTipsList = cloneDeep(tipsList)
            this.checkTipsList = checkTipsList
            this.dialogTipsVisible = false;
            let tipsListStr = this.queryTipsListStr(tipsList)
            this.labelIds = tipsListStr
        },

        //点击选择标签
        handleTipClick(tip, name) {
            console.log(tip, name);
            let tipsList = this.tipsList;
            let nums = 0;
            let tipsListStr = []
            tipsList.map(item => {
                let tips = item.children
                tips.map(i => {
                    if (i.isSelect) {
                        nums++;

                        if (nums == 5) {
                            this.$message.error('最多选择5个标签')
                        }
                    }
                })
            })
            tipsList.map(item => {
                if (item.id == name) {
                    let tips = item.children
                    tips.map(i => {
                        if (i.id == tip.id) {
                            i.isSelect = !i.isSelect
                            if (nums == 5) {
                                i.isSelect = false
                                return
                            }
                        }
                    })
                }
            })
            this.labelIds = this.queryTipsListStr(tipsList)
        },



        //富文本初始化调接口 赋值
        ready(e) {
            if (this.$route.query.activeUuid) {
                this.getActiveDetail();
            }
        },
    },

}
</script>

<style lang="scss" scoped>
$blue: rgb(85, 155, 233);
$green: rgb(26, 217, 102);
$gray: rgb(244, 244, 244);

::v-deep {
    .el-card-question {
      padding-bottom: 60px;

        // width: 700px;
        .el-card__header {
            padding: 10px;
            font-size: 16px;
            background: $gray;
        }
    }
}

.el-form-edu {
    .el-form-input-edu {
        width: 500px;

    }
}
.footer-btn {
  position: fixed;
  bottom: 0px;
  left: 230px;
  padding: 20px 0 0 0;
  width: calc(100vw - 260px);
  z-index: 3000;
  background: #fff;
  border: 1px solid #ddd;
}
.trialVideoPath {
    width: 100px;
    height: 100px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    overflow: hidden;
    background-image: url('../../../../../../assets/upload/file-video.png');
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
</style>
