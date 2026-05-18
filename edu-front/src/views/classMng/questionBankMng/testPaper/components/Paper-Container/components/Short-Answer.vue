<template>
    <div class="short-answer font16 marginBottom20">
        <div class="flex marginBottom10">
            <el-form-item :prop="`paperItemList.${index}.id`" style="display: none;">
                <el-input v-model="item.id"></el-input>
            </el-form-item>
            <el-form-item :prop="`paperItemList.${index}.score`" :rules="questionRules && questionRules.score">
                <div class="font16  " style="line-height: 30px;">

                    <span class="marginRight10" style="font-weight: 600;">
                        {{ index + 1 }}、【{{ questionType[Number(item.quTypeId) - 1] }}】
                    </span>

                    <span style="color: #999;">
                        <div style="display: inline-block;">
                            分值：
                            <el-input v-if="isShow" @change="event => inputScore(event, index)" v-model.number="input"
                                style="width: 50px;" class="marginRight10"></el-input>
                            <span v-else>
                                {{ item.score }}
                            </span>分
                        </div>

                    </span>

                    <div style="text-indent: 30px;" v-html="item.content">

                    </div>

                    <!--  -->
                </div>
            </el-form-item>
        </div>
        <div class="marginBottom20 marginLeft10" v-if="item.contentPic">
            <el-image style="width: 100px; height: auto" :src="item.contentPic" :preview-src-list="[item.contentPic]">
            </el-image>
        </div>
        <div class="flex align-center">
        </div>

        <div v-if="item.quTypeId == 1 || item.quTypeId == 2 || item.quTypeId == 3">
            <div v-for="(i, index) in item.answers" :key="i.id">
                <div>
                    <div class="marginBottom10 flex align-center">
                        <check class="marginRight10" :isRight="i.isRight == 1 ? true : false"></check>{{
                            chooseText[index]
                        }}、{{ i.content }}
                    </div>
                </div>
            </div>
        </div>

        <div v-if="item.quTypeId == 4 || item.quTypeId == 5" class="analysis-content" v-html="item && item.answers[0] && item.answers[0].content">

        </div>
        <handle-question v-if="isShow" class="handle" @move="move" @removeQuestion="removeQuestion"></handle-question>
    </div>
</template>

<script>
import Check from './Check.vue';
import HandleQuestion from './Handle-Question.vue';
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
        HandleQuestion
    },
    watch: {
        item: {
            handler(val) {
                this.input = val[`score`];
            },
            deep: true
        }
    },
    created() {

    },
    data() {
        return {
            input: this.item.score,
            url: '',
            srcList: [],
            textarea: '',
            questionType: questionType,
            chooseText: chooseText,
        }
    },
    methods: {
        inputScore(e, id) {
            this.$emit('inputScore', e, id)
        },

        removeQuestion() {
            this.$emit('removeQuestion', this.index)
        },

        move(num) {
            this.$emit('move', num, this.index)
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
    border: 1px solid #ddd;
    border-radius: 10px;
    min-height: 200px;
    max-height: 300px;
    overflow: auto;
    padding: 20px;
}

.marginLeft10 {
    margin-left: 30px;
}
</style>