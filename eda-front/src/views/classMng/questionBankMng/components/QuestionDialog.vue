<template>
    <el-dialog :title="textMap[status]" :show-close="false" :visible="dialogVisible" width="30%" @closed="reset('ruleForm')"
        @close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="题库名称" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入题库名称" show-word-limit maxlength="20"  class="el-input-edu-400"></el-input>
            </el-form-item>
            <el-form-item label="教学方向" prop="directionId">
                <el-select v-model="ruleForm.directionId" placeholder="请选择教学方向" class="el-input-edu-400">
                    <el-option label="" value="">请选择</el-option>
                    <el-option :label="item.name" :value="item.id" v-for="(item) in directionList"
                        :key="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="可见范围" prop="isPublic">
                <el-radio-group v-model="ruleForm.isPublic">
                    <el-radio :label="1">公开</el-radio>
                    <el-radio :label="0">仅自己</el-radio>
                </el-radio-group>
            </el-form-item>

            <div class="flex justify-center  footer">
                <el-button size="small" class="marginRight20" @click="handleClose('ruleForm')"> 取消 </el-button>
                <el-button size="small" type="primary" @click="submitForm('ruleForm')"> 确定 </el-button>

            </div>
        </el-form>
    </el-dialog>
</template>

<script>
export default {
    props: {
        ruleForm: {
            default: () => {
                return {
                    name: '',
                    directionId: '',
                    isPublic: 1
                };
            },
            type: Object
        },
        status: {
            default: 'create',
            type: String
        },
        dialogVisible: {
            default: false,
            type: Boolean
        },
        directionList: {
            default: [],
            type: Array
        }
    },

    data() {
        return {
            textMap: {
                update: "修改题库",
                create: "添加题库",
            },

            rules: {
                name: [
                    { required: true, message: '请输入题库名称', trigger: 'blur' },
                    // { min: 1, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                directionId: [
                    { required: true, message: '请选择教学方向', trigger: 'change' }
                ],
                isPublic: [
                    { required: true, message: '请选择可见范围' }
                ],

            }
        }
    },
    methods: {
        handleClose(formName) {
            this.$emit('handleClose', false)
        },

        reset(formName) {
            this.$refs[formName].resetFields();
            this.handleClose()
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('submitQuestion', this.ruleForm)
                } else {
                    return false;
                }
            });
        },
    }
}
</script>

<style lang="scss" scoped>
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