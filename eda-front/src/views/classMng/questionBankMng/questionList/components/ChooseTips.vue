<template>
    <el-dialog append-to-body title="选择标签" class="el-dialog-edu" style="z-index: 9999;" :show-close="false" :visible="dialogVisible" width="50%"
        @close="handleClose">
        <el-collapse v-model="activeNames">
            <el-collapse-item v-for="(item, index) in tipsList" :key="index" :title="item.name" :name="item.id">
                <div class="flex justify-start" style="flex-wrap: wrap;">
                    <tips-item @handleClick="handleTipClick" v-for="i in item.children" :key="i.id" :tip="i"
                        :name="item.id"></tips-item>
                </div>
            </el-collapse-item>

        </el-collapse>
        <div class="flex justify-center  footer">
            <el-button size="small" class="marginRight20" @click="handleClose('ruleForm')"> 取消 </el-button>
            <el-button size="small" type="primary" @click="submitForm('ruleForm')"> 确定 </el-button>

        </div>
    </el-dialog>
</template>

<script>
import TipsItem from './TipsItem.vue'

export default {
    props: {
        dialogVisible: {
            default: true,
            type: Boolean
        },
        tipsList: {
            default: [],
            type: Array
        }
    },
    components: {
        TipsItem
    },
    data() {
        return {
            activeNames: [1, '2', '3', '4'],

        }
    },
    mounted() {
        // this.queryListLables()
    },
    methods: {

        handleTipClick(tip, name) {
            let tipsList = this.tipsList;
            tipsList.map(item => {
                if (item.id == name) {
                    let tips = item.children
                    tips.map(i => {
                        if (i.id == tip.id) {
                            i.isSelect = !i.isSelect
                        }
                    })
                }
            })

        },
        handleClose() {
            let _this = this;
            setTimeout(function () {
                _this.$emit('handleTipsClose')
            }, 200)
        },


        submitForm(formName) {
            let tipsList = this.tipsList;
            this.$emit('submitTips', tipsList)
        },
    }
}
</script>

<style lang="scss" scoped>


.el-dialog-edu {
    z-index: 9000 !important;
    .i-item {
        color: #858585;
        font-weight: 600;
        padding: 3px 10px;
        font-size: 16px;
        border-radius: 5px;
        background-color: rgba($color: #ddd, $alpha: 1.0);
    }

    .el-collapse {
        border: none !important;

        .el-collapse-item {
            border: 1px solid #ebeef5 !important;
            border-radius: 5px;
            margin: 0px 0 10px 0;
            padding: 0 10px;
        }

        ::v-deep {
            .el-collapse-item__header {
                border-bottom: none;
                font-weight: 600;
                font-size: 16px;
            }
        }


        .el-collapse-item__header.is-active {
            border: none !important;
        }


    }

    ::v-deep {
        .el-collapse-item.is-active {
            .el-collapse-item__wrap {
                border: none !important;
            }
        }

        .el-collapse-item__content {
            padding: 0px 0 10px 0;
        }
    }


}

::v-deep {


    .el-dialog {
        border-radius: 4px;

        .el-dialog__header {
            border-radius: 4px 4px 0 0;
            padding: 10px 20px;
            background-color: rgb(233, 233, 233);

            .el-dialog__title {
                color: #333;
            }
        }

        .el-dialog__body {
            padding: 20px;
        }
    }

    .el-radio__input.is-checked .el-radio__inner,
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        border-color: #01c037;
        background: #01c037;
    }

    .el-radio__input.is-checked+.el-radio__label {
        color: #01c037;
    }

    .el-radio__inner::after {
        background-color: #01c037;
    }
}

.footer {
    padding: 0 30px;
    margin-top: 30px;
}
</style>