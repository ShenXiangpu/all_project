<template>
    <el-dialog :title="textMap[dialogVisible.status]" :show-close="true" :visible="dialogVisible.visible" width="1100px"
        @closed="reset('ruleForm')" @close="handleClose">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="任务名称" prop="trialItemName">
                <el-input v-model="ruleForm.trialItemName" placeholder="请输入任务名称" show-word-limit maxlength="100"
                    class="el-input-edu-task"></el-input>
            </el-form-item>
            <el-form-item label="实验手册">
                <div class="border-container">
                    <el-form-item label="标题" prop="manualTitle" class="marginBottom20">
                        <el-input v-model="ruleForm.manualTitle" placeholder="请输入标题" show-word-limit maxlength="100"
                            class="el-input-edu-define"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" prop="manualContent">
                        <edu-tinymce ref="edu-tinymce"  class="edu-tinymce" v-model="ruleForm.manualContent"
                            :height="300" />
                    </el-form-item>
                </div>

            </el-form-item>
            <div class="flex justify-center  footer">
                <el-button size="small" class="marginRight20" @click="handleClose('ruleForm')"> 取消 </el-button>
                <el-button size="small" type="primary" @click="submitForm('ruleForm')"> {{ dialogVisible.status == 'create'
                    ? "确定" : "修改" }} </el-button>

            </div>
        </el-form>
    </el-dialog>
</template>

<script>
import { addTrialItem,modifyTrialItem } from '@/api/edu/labCenter';
import EduTinymce from '@/components/Edu-tinymce';
export default {
    name: '',
    components: {
        EduTinymce
    },
    props: {
        trialId: {
            default: '',
            type: String | Number
        },


    },
    created() {

    },
    data() {
        return {
            ruleForm: {
                trialItemName: '',
                manualTitle: '',
                manualContent: '',
            },
            trialItemId: '',
            dialogVisible: {
                visible: false,
                status: 'create'
            },
            textMap: {
                update: "修改任务",
                create: "添加任务",
            },

            rules: {
                trialItemName: [
                    { required: true, message: '请输入任务名称', trigger: 'blur' },
                    // { min: 1, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                manualTitle: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                    // { min: 1, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                manualContent: [
                    { required: true, message: '请输入实验手册内容', trigger: 'change' }
                ],
            }
        }
    },
    destroyed() {
        let ruleForm = {
            trialItemName: '',
            manualTitle: '',
            manualContent: '',
        }

        this.ruleForm = ruleForm;
    },
    methods: {
        handleClose() {
            this.dialogVisible.visible = false;
            this.$refs['ruleForm'].resetFields();
            let ruleForm = {
                trialItemName: '',
                manualTitle: '',
                manualContent: '',
            }
            this.$refs['edu-tinymce'].content = ''
            this.ruleForm = ruleForm;
        },

        reset(formName) {
            this.$refs[formName].resetFields();
            this.handleClose()
        },
        submitForm(formName) {
            let manualContent = this.$refs['edu-tinymce'].getContent()
            this.ruleForm.manualContent = manualContent
            let status = this.dialogVisible.status
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let trialId = this.trialId

                    if (status == 'create') {
                        addTrialItem({ trialId, ...this.ruleForm }).then(res => {
                            if (res && res.flag) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.dialogVisible.visible = false;
                                this.$emit('refreshList')
                            }
                        })
                    } else {
                        let id = this.trialItemId
                        modifyTrialItem({ id,trialId, ...this.ruleForm }).then(res => {
                            if (res && res.flag) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.dialogVisible.visible = false;
                                this.$emit('refreshList')
                            }
                        })
                    }

                } else {
                    return false;
                }
            });
        },
    }
}
</script>

<style lang="scss" scoped>
.border-container {
    padding: 20px 20px 20px 0;
    border: 1px solid #ddd;
}

.el-input-edu-task {
    width: 80%;
}

.el-input-edu-define {
    width: 90%;
}

.edu-tinymce {
    ::v-deep {

        .tox,
        .tox-tinymce {
            width: 90% !important;
            height: 500px !important;
        }

        .tox-tinymce-aux {
            z-index: 3000;
        }
    }
}
</style>