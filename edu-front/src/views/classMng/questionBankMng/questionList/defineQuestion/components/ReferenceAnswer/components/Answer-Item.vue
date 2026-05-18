<template>
    <div>
        <div class="font14" v-if="answerItem.show">
            <div>选项{{ answerItem.name }}</div>
            <div class="flex">
                <el-form-item :rules="[
                    { required: true, message: '请输入内容' },
                ]">
                    <el-input :readonly="readOnly" placeholder="请输入内容" v-model="answerItem.ansName" @input="inputAnswer"
                        class="marginRight10 el-input-edu">
                        <div class="left-container" slot="prepend" @click="checkAnswer()">
                            <div v-if="!answerItem.isCheck" class="circle">
                                <div></div>
                            </div>
                            <div v-else class="right-circle">
                                <div class="border">
                                    <div class="bg"></div>
                                </div>
                            </div>
                        </div>
                    </el-input>
                </el-form-item>

                <span v-if="!readOnly" class="pointer primaryColoro" @click="deleteAnswer(index)">删除</span>
            </div>


        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "选项A"
        },
        isCheck: {
            type: Boolean,
            default: false
        },
        index: {
            type: Number,
            default: 0
        },
        answerItem: {
            type: Object,
            default: () => {
                return {
                    id: 0,
                    isCheck: false,
                    answerName: ""
                }
            }
        },
        readOnly: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            input3: ""
        }
    },
    watch: {
        input3(newVal, oldVal) {
            // console.log(newVal, oldVal)
        },

    },
    methods: {
        //选中或者反选
        checkAnswer() {
            // console.log(answerItem)
            this.$emit("checkAnswer", this.answerItem)
        },
        inputAnswer(e) {
            this.$emit("inputAnswer", e, this.answerItem)
        },
        deleteAnswer(index) {
            this.$emit("deleteAnswer", index)
        }
    }
}   
</script>

<style lang="scss" scoped>
$green: #409EFF;

.circle {
    padding: 4px;

    div {
        width: 13px;
        height: 13px;
        border-radius: 50%;
        border: 1px solid #ddd;
        background-color: #fff;
    }
}

.right-circle {
    padding: 4px;

    .border {
        width: 13px;
        height: 13px;
        border-radius: 50%;
        border: 1px solid $green;
        background-color: #fff;
        padding: 1px;

        .bg {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background-color: $green;
        }
    }
}

.padding4 {
    padding: 4px;
}

.line-height15 {
    line-height: 15px;
}

.el-input-edu {
    width: 900px;

    ::v-deep {

        .el-input-group__append,
        .el-input-group__prepend {
            background-color: #fff;
            padding: 0 10px;
        }
    }
}

.trust {
    background-color: $green;
    padding: 10px;
    border-radius: 4px;
    color: #fff;
}
</style>