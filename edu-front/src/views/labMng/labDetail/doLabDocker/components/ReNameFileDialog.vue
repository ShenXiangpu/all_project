<template>
    <el-dialog :close-on-click-modal="false" append-to-body title="文件重命名" :destroy-on-close="true" :show-close="false" :visible.sync="dialogVisible" @close="handleClose" width="30%" >
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <div v-for="(item, index) in waitUploadFileList" :key="index">
                <el-form-item v-if="!item.isMerge" :rules="rules && rules.fileName" :prop="`waitUploadFileList.${index}.fileName`" label="文件名称">
                    <el-input v-model="item.fileName">
                        <template slot="append">{{ item.fileType }}</template>
                    </el-input>
                </el-form-item>
            </div>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <!-- <el-button @click="subimt('form')">取 消</el-button> -->
            <el-button type="primary" :loading="loading"  @click="subimt('form')">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>

export default {
    name: '',
    props: {
        waitUploadFileList: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        waitUploadFileList: {
            handler(val) {
                this.form.waitUploadFileList = val
            },
            immediate: true
        }
    },
    components: {
    },
    created() {

    },
    data() {
        return {
            form: {
                waitUploadFileList:[]
            },
            rules: {
                fileName: [
                    { required: true, message: '文件名不能为空', trigger: 'blur' },
                ],
            },
            dialogVisible: false,
            loading:false,
        }
    },
    methods: {
        handleClose() {
            // this.$emit('submit', this.form.waitUploadFileList)
            this.form.waitUploadFileList = []
            this.dialogVisible = false;  
        },

        subimt(form){
            this.$refs[form].validate((valid) => {
                if (valid) {
                    console.log(this.form);
                    this.$emit('submit', this.form.waitUploadFileList)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
}
</script>

<style lang="scss" scoped></style>