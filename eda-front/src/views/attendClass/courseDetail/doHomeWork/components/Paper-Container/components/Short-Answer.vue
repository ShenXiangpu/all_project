<template>
    <div ref="Short-Answer" class="short-answer font16 marginBottom20">
        <div class="flex marginBottom10">
            <el-form-item :prop="`paperItemList.${index}.id`" style="display: none;">
                <el-input v-model="item.id"></el-input>
            </el-form-item>

            <el-form-item class="el-form-item-edu" :prop="`paperItemList.${index}.score`"
                :rules="questionRules && questionRules.score">
                <div class="font16" style="line-height: 30px;">
                    <span class="marginRight10" style="font-weight: 600;">
                        {{ index + 1 }}、【{{ questionType[Number(item.quTypeId) - 1] }}】
                    </span>

                    <span style="color: #999;" class="marginRight20">
                        <div style="display: inline-block;">
                            分值：<span>{{ item.score }}</span>分
                        </div>
                    </span>
                    <div style="text-indent: 30px;" v-html="item.content"></div>

                    <!--  -->
                </div>
            </el-form-item>
        </div>
        <div class="marginLeft10" v-if="item.contentPic">
            <el-image style="width: 100px; height: auto" :src="item.contentPic" :preview-src-list="[item.contentPic]">
            </el-image>
        </div>

        <el-form-item :prop="`paperItemList.${index}.isRight`" :rules="questionRules && questionRules.isRight">
            <div v-if="item.quTypeId == 1 || item.quTypeId == 2 || item.quTypeId == 3">
                <div v-for="(i, index) in item.answers" :key="i.id">

                    <div v-if="item.quTypeId == 2" class="marginBottom10 flex align-center">
                        <check @checkAnswer="checkNoSingleAnswer(i.id)" class="" :isRight="i.isRight == 1 ? true : false">

                            <span>{{
                                chooseText[index]
                            }}、{{ i.content }}</span>
                        </check>
                    </div>

                    <div v-else class="marginBottom10 flex align-center">
                        <check @checkAnswer="checkSingleAnswer(i.id)" class="" :isRight="i.isRight == 1 ? true : false">
                            <span>{{
                                chooseText[index]
                            }}、{{ i.content }}</span>
                        </check>

                    </div>

                </div>
            </div>

            <div v-if="item.quTypeId == 4 || item.quTypeId == 5" class="analysis-content">
                <div v-for="(i) in item.answers" :key="i.id">
                    <edu-tinymce class="edu-tinymce" :ref="`tinymce${index}`" />
                </div>
            </div>
        </el-form-item>
    </div>
</template>

<script>
import EduTinymce from '@/components/Edu-tinymce';
import Check from './Check.vue';

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
        }
    },
    components: {
        Check,
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
        }
    },
    methods: {

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
}

.edu-tinymce {
    ::v-deep {

        .tox,
        .tox-tinymce {
            height: calc(100vh - 400px) !important;
            width: 100% !important;
        }
    }
}
</style>