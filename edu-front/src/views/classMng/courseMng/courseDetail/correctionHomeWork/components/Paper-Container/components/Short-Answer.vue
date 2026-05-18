<template>
    <div ref="Short-Answer" class="short-answer font16 marginBottom20">
        <div :id="`Number${item.id}`" class="flex marginBottom10">
            <el-form-item :prop="`paperItemList.${index}.id`" style="display: none;">
                <el-input v-model="item.id"></el-input>
            </el-form-item>


            <div class="font16" style="line-height: 30px;">
                <span class="marginRight10" style="font-weight: 600;">
                    {{ index + 1 }}、【{{ questionType[Number(item.quTypeId) - 1] }}】
                </span>

                <span>
                    <el-image v-if="item.isCorrect == 1" class="marginRight10"
                        style="width: 20px; height: 20px;vertical-align: middle;" :src="questionImg[0]">
                    </el-image>
                    <el-image v-if="item.isCorrect == 0" class="marginRight10"
                        style="width: 20px; height: 20px;vertical-align: middle;" :src="questionImg[1]">
                    </el-image>
                    <el-image v-if="item.isCorrect == 3" class="marginRight10"
                        style="width: 20px; height: 20px;vertical-align: middle;" :src="questionImg[2]">
                    </el-image>
                    <el-image v-if="item.isCorrect == 4 || item.isCorrect == null" class="marginRight10"
                        style="width: 20px; height: 20px;vertical-align: middle;" :src="questionImg[3]">
                    </el-image>
                </span>
                <span style="color: #999;" class="marginRight20">
                    <div style="display: inline-block;">
                        分值：<span>{{ item.score }}</span>分
                    </div>
                </span>


                <span v-if="isWatch" style="color: #999;" class="marginRight20">
                    <span style="display: inline-block;">
                        <el-form-item class="el-form-item-edu" :prop="`paperItemList.${index}.getScore`"
                            :rules="questionRules && questionRules.getScore">
                            得分：<el-input @change="inputGetScore" style="width: 50px;" v-model="item.getScore"></el-input> 分
                        </el-form-item>
                    </span>
                </span>

                <span v-if="!isWatch" style="color: #999;" class="marginRight20">
                    <span style="display: inline-block;">
                        <el-form-item class="el-form-item-edu" :prop="`paperItemList.${index}.getScore`"
                            :rules="questionRules && questionRules.getScore">
                            得分：{{ item.getScore }}分
                        </el-form-item>
                    </span>
                </span>

                <div style="text-indent: 30px;margin-top: 10px;" v-html="item.content"></div>

                <!--  -->
            </div>
        </div>
        <div class="marginLeft10" v-if="item.contentPic">
            <el-image style="width: 100px; height: auto" :src="item.contentPic" :preview-src-list="[item.contentPic]">
            </el-image>
        </div>

        <el-form-item :prop="`paperItemList.${index}.isRight`" :rules="questionRules && questionRules.isRight">
            <div v-if="item.quTypeId == 1 || item.quTypeId == 2 || item.quTypeId == 3">
                <div v-for="(i, index) in item.answers" :key="i.id">

                    <div v-if="item.quTypeId == 2" class="marginBottom10 flex align-center">
                        <check class="" :isRight="i.isChoose == 1 ? true : false">
                            <span>{{
                                chooseText[index]
                            }}、{{ i.content }}</span>
                        </check>
                    </div>

                    <div v-else class="marginBottom10 flex align-center">
                        <check class="" :isRight="i.isChoose == 1 ? true : false">
                            <span>{{
                                chooseText[index]
                            }}、{{ i.content }}</span>
                        </check>

                    </div>

                </div>
            </div>

            <div v-if="item.quTypeId == 4 || item.quTypeId == 5" class="analysis-content">
                <edu-tinymce :value="item.answer" class="edu-tinymce" :ref="`tinymce${index}`" />
            </div>
        </el-form-item>

        <div v-if="item.isCorrect == 1" class="marginBottom10"
            style="border-radius: 3px;color: #6ad46a; background-color: #eee;padding: 2px;">
            <i class="el-icon-success marginRight10"></i>答题正确
        </div>
        <div v-if="item.isCorrect == 0 || item.isCorrect == 3">
            <div style="border-radius: 3px;color: rgb(236, 69, 69); background-color: #eee;padding: 2px;"
                class="marginBottom10"><i class="el-icon-error marginRight10"></i>答题错误</div>

        </div>
        <div v-if="item.isCorrect == 0 || item.isCorrect == 3 || item.quTypeId == 4 || item.quTypeId == 5"
            style="border-radius: 7px;background-color: #eee;padding: 20px;" class="marginBottom10">
            <div style="color: #6ad46a; background-color: #eee;" class="marginBottom10">正确答案：</div>
            <span v-for="(i, index) in item.answers" :key="i.id">
                <span class="marginRight10"
                    v-if="i.isRight == 1 && (item.quTypeId == 1 || item.quTypeId == 2 || item.quTypeId == 3)">
                    {{ chooseText[index] }}
                </span>
                <span v-if="i.isRight == 1 && (item.quTypeId == 4 || item.quTypeId == 5)">
                    <!-- {{ i.content }} -->
                    <span v-html="i.content"></span>
                </span>
            </span>
        </div>
        <div style="border-radius: 7px;background-color: #eee;padding: 20px;">
            <div style="color: #333; background-color: #eee;" class="marginBottom10">答案解析</div>
            <div class="v-html-container" v-html="item.analysis"></div>
        </div>

        <handle-answers v-if="isWatch" class="handle" @chooseImage="chooseImage"></handle-answers>


    </div>
</template>

<script>
import { isEqual } from 'lodash';
import EduTinymce from '@/components/Edu-tinymce';
import HandleAnswers from './Handle-Answers.vue';

import Check from './Check.vue';
const questionImg = [
    require('@/assets/img/question/right.png'),
    require('@/assets/img/question/wrong.png'),
    require('@/assets/img/question/half-pair.png'),
    require('@/assets/img/question/question.png'),

]
const chooseText = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
}
const questionType = [
    '单选题',
    '多选题',
    '判断题',
    '简答题',
    '实操题',
]
export default {
    name: '',
    props: {
        questionRules: {
            type: Object,
            default: () => { }
        },
        index: {
            type: Number,
            default: 0
        },
        item: {
            type: Object,
            default: () => { }
        },
        isShow: {
            type: Boolean,
            default: true
        },
        isWatch: {
            type: Boolean,
            default: true
        },
    },
    components: {
        Check,
        HandleAnswers,
        EduTinymce
    },
    watch: {
        item: {
            handler(val) {
                this.input = val[`score`];
            },
            deep: true
        },
    },
    created() {

    },
    computed: {

    },
    data() {
        return {
            input: this.item.score,
            url: '',
            srcList: [],
            textarea: '',
            questionType: questionType,
            chooseText: chooseText,

            content: '',
            questionImg: questionImg
        }
    },
    methods: {
        //
        inputGetScore(score) {
            this.$emit('inputGetScore', score, this.index)
        },

        //

        chooseImage(num) {
            this.$emit('chooseImage', num, this.index)
        },
        // 单选
        checkSingleAnswer(iId) {
            // 判断是否选中
            let answers = this.item.answers;
            answers.map(i => {
                if (i.id == iId) {
                    i.isRight = 1;
                } else {
                    i.isRight = null;
                }
            });

            this.$emit('checkSingleAnswer', answers)
        },
        checkNoSingleAnswer(iId) {
            // 判断是否选中
            let answers = this.item.answers;
            answers.map(i => {
                if (i.id == iId) {
                    if (i.isRight == 1) {
                        i.isRight = null
                    } else {
                        i.isRight = 1
                    }
                }
            })
            this.$emit('checkNoSingleAnswer', answers)
        },
        inputScore(e, id) {
            this.$emit('inputScore', e, id)
        },




    }
}
</script>

<style lang="scss" scoped>
.short-answer {
    position: relative;

    ::v-deep {
        .el-input__inner {
            height: 26px;
            padding: 0 2px;
            text-align: center;
        }
    }

    .handle {
        display: none;
    }

    .textarea {
        width: 700px;
    }
}

.short-answer:hover {
    .handle {
        display: block;
    }
}

.analysis-content {
    border-radius: 10px;
    overflow: auto;
    padding: 20px;
}

.marginLeft10 {
    margin-left: 30px;
}

.el-form-item-edu {
    margin-bottom: 0;

    ::v-deep {
        .el-form-item__error {
            top:90%;
            left: 40px ;
        }
    }


}

.v-html-container {
    // width: 100px;
    overflow: auto;

    ::v-deep {
        p {
            img {
                max-width: 100%;
            }
        }
    }


}

.edu-tinymce {
    ::v-deep {

        .tox,
        .tox-tinymce {
            height: calc(100vh - 400px) !important;
            width: 720px !important;



        }
    }
}
</style>