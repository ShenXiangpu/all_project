<template>
    <div class="single-choice font16 marginBottom20">
        <div class="flex marginBottom10">
            <el-form-item :prop="`paperItemList.${index}.id`" style="display: none;">
                <el-input v-model="item.id"></el-input>
            </el-form-item>
            <el-form-item :prop="`paperItemList.${index}.score`" :rules="questionRules.score">
                <div class="flex" style="line-height: 30px;">
                    {{ index + 1 }}、<span class="marginRight20" v-html="item.content"></span>
                    <span style="color: #999;">分值：<el-input @change="event => inputScore(event, index)"
                            v-model.number="input" style="width: 50px;"></el-input>分</span>
                    <!--  -->
                </div>
            </el-form-item>
        </div>
        <div class="" v-if="item.contentPic">
            <el-image style="width: 100px; height: 100px" :src="item.contentPic" :preview-src-list="[item.contentPic]">
            </el-image>
        </div>
        <div class="flex align-center">
        </div>

        <div v-for="(i, index) in item.answers" :key="i.id">
            <div>
                <div class="marginBottom10 flex align-center">
                    <check class="marginRight10" :isRight="i.isRight == 1 ? true : false"></check>{{ chooseText[index] }}、{{
                        i.content }}
                </div>
            </div>
        </div>
        <handle-question @move="move" @removeQuestion="removeQuestion" class="handle" :id="item.id"></handle-question>
    </div>
</template>

<script>
let chooseText = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
}
import Check from './Check';
import HandleQuestion from './Handle-Question';
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
        }
    },
    watch: {
        item: {
            handler(val) {
                this.input = val[`score`];
                console.log(val);
            },
            deep: true
        }
    },
    components: {
        Check,
        HandleQuestion
    },
    created() {

    },
    data() {
        return {
            anc: 10,
            input: '',
            url: '',
            srcList: [],
            chooseText: chooseText
        }
    },
    methods: {
        inputScore(e, index) {
            this.$emit('inputScore', e, index)
        },

        removeQuestion() {
            this.$emit('removeQuestion',this.index)
        },

        move(num){
            this.$emit('move',num,this.index) 
        },

    }
}
</script>

<style lang="scss" scoped>
.single-choice {
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
}

.single-choice:hover {
    .handle {
        display: block;
    }
}
</style>