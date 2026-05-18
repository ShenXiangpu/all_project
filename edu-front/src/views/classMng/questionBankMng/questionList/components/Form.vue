<template>
    <div class="">
        <el-row class="form-container">
            <!-- 表单 -->
            <el-form ref="form" :model="form">
                <el-col :span="5" class="marginBottom10">
                    <el-form-item label="题库" prop="quBankId">
                        <el-select class="el-form-input-edu" @change="selectBank" v-model="form.quBankId"
                            placeholder="请选择题库">
                            <!-- <el-option label="" value="">全部</el-option> -->
                            <el-option v-for="item in questionBankList" :key="item.id" :label="item.name"
                                :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5" class="marginBottom10">
                    <el-form-item label="题目难度" prop="level">
                        <el-select class="el-form-input-edu" @change="selectLevel" placeholder="请选择难度" v-model="form.level">
                            <el-option label="简单" value="1"></el-option>
                            <el-option label="中等" value="2"></el-option>
                            <el-option label="困难" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="14" class="marginBottom10">
                    <el-form-item>
                        <el-button type="primary" class="primaryBgColoro" style="border: none;"
                            @click="submit">重置选项</el-button>
                    </el-form-item>
                </el-col>
                <el-col :span="24" class="marginBottom10">
                    <el-form-item label="题型" prop="quTypeId">
                        <el-checkbox-group v-model="form.quTypeId" @change="changeType">
                            <el-checkbox v-for="item in questionTypeList" :key="item.id" name="type" :label="item.name"
                                :value="item.id"></el-checkbox>

                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <tips-form-item ref="tips-form-item" :formProp="'labelIds'" :checkTipsList="checkTipsList"
                        :tipsList="tipsList" :dialogTipsVisible="dialogTipsVisible" @closeTip="closeTip"
                        @handleChooseTips="handleChooseTips" @submitTips="submitTips"
                        @handleTipsClose="handleTipsClose"></tips-form-item>
                </el-col>
            </el-form>
        </el-row>
        <div class="flex justify-between marginBottom20">
            <div>
                <el-input @clear="searchBank" clearable placeholder="请输入题目名称" v-model="form.keyWord" class=""
                    style="width: 400px;">
                    <el-button @click="searchBank" slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div v-if="userDialogVisible">
                <el-button type="primary" class="marginRight20" @click="handleAddQuestion">新建题目</el-button>
                <el-dropdown @command="handleCommand">
                    <el-button type="primary">
                        批量操作
                        <i class="el-icon-caret-bottom"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">批量删除</el-dropdown-item>
                        <el-dropdown-item command="b">批量导出</el-dropdown-item>
                        <el-dropdown-item command="c">批量添加标签</el-dropdown-item>
                        <el-dropdown-item command="d">批量移除标签</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

            </div>
        </div>

    </div>
</template>

<script>
import ChooseTips from './ChooseTips.vue'
import TipsFormItem from './Tips-FormItem.vue';
import { cloneDeep } from "lodash"
import {
    getListLables
} from '@/api/edu/question'
export default {
    components: { ChooseTips, TipsFormItem },
    props: {
        questionBankList: {
            default: () => { return [] },
            type: Array
        },
        questionTypeList: {
            default: () => { return [] },
            type: Array
        },
        bankId: {
            default: 0 | '',
            type: Number | String
        },
        userDialogVisible: {
            default: true,
            type: Boolean
        },

    },

    data() {
        return {
            dialogTipsVisible: false,
            form: {
                quBankId: Number(this.bankId) || '',
                quTypeId: ['全部'],
                level: '',
                label: '',
                keyWord: ''
            },
            //用于显示标签的数组
            tipsListShow: [],
            labelIds: '',//选择的标签
            checkTipsList: [],
            tipsList: []
        }
    },
    created() {
        this.queryListLables()
    },
    methods: {
        searchBank() {
            console.log(this.form);
            this.$emit('queryQuestionList', this.form)
        },
        selectBank() {

            this.$emit('queryQuestionList', this.form)
        },
        selectLevel() { this.$emit('queryQuestionList', this.form) },
        changeType(e) {
            let { quTypeId } = this.form
            if (e.length == 0) {
                this.form.quTypeId = ['全部']
            } else if (e.length > 1 && quTypeId.indexOf('全部') == 0) {
                quTypeId.splice(0, 1)
                this.form.quTypeId = quTypeId
            } else if (e.length > 1 && e.indexOf('全部') > -1) {
                this.form.quTypeId = ['全部']
            }
            this.$emit('queryQuestionList', this.form)
        },
        //
        handleAddQuestion() {
            let questionBankList = this.questionBankList
            let isCanAdd = true
            questionBankList.map(item => {
                if (this.form.quBankId == item.id) {
                    let userId = this.$store.state.user.userInfo.id
                    if (userId != item.createBy) {
                        isCanAdd = false
                        return
                    }
                }
            })
            this.isCanAdd = isCanAdd
            if (!isCanAdd) {
                this.$message.warning("无权修改非本人创建的题库")
                return
            }

            let quId = this.form.quBankId || ''
            this.$router.push({
                path: '/classMng/defineQuestion',
                query: {
                    quId
                },
            })
        },
        //dropdown
        handleCommand(command) {

            if (command == 'a') {


                let questionBankList = this.questionBankList
                let isCanAdd = true
                questionBankList.map(item => {
                    if (this.form.quBankId == item.id) {
                        let userId = this.$store.state.user.userInfo.id
                        if (userId != item.createBy) {
                            isCanAdd = false
                            return
                        }
                    }
                })
                this.isCanAdd = isCanAdd
                if (!isCanAdd) {
                    this.$message.warning("无权修改非本人创建的题库")
                    return
                }
            }
            this.$emit("handleCommand", command)
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
            this.form.label = tipsListStr
            this.$emit('queryQuestionList', this.form)
        },
        queryTipsListStr(tipsList) {
            let tipsListStr = []
            tipsList && tipsList.length > 0 && tipsList.map(item => {
                let tips = item.children
                tips.map(i => {
                    i.isSelect && tipsListStr.push(i.id)
                })
            })
            return tipsListStr.toString()
        },
        submitTips(tipsList) {
            let checkTipsList = cloneDeep(tipsList)
            this.checkTipsList = checkTipsList
            this.dialogTipsVisible = false;
            let tipsListStr = this.queryTipsListStr(tipsList)
            this.form.label = tipsListStr
            this.$emit('queryQuestionList', this.form)
        },


        submit() {
            this.$refs.form.resetFields()
            let tipsList = this.tipsList
            tipsList && tipsList.length > 0 && tipsList.map(item => {
                let tips = item.children
                tips.map(i => {
                    i.isSelect = false
                })
            })
            this.checkTipsList = cloneDeep(tipsList)
            this.tipsList = cloneDeep(tipsList)
            let tipsListStr = this.queryTipsListStr(this.checkTipsList)
            this.form.label = tipsListStr
            this.$emit('queryQuestionList', this.form)
        },

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
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.form-container {
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding: 20px;
    margin: 0 0 20px 0;

    .el-form-item {
        margin-bottom: 0;
    }

    ::v-deep {
        .el-form-item__label {
            width: 80px;
        }

        .el-form-input-edu {
            width: 200px;
        }

        .el-form-item__content {
            margin-left: 80px;
        }
    }
}
</style>