<template>
    <el-dialog append-to-body  :title="`${textMap[dialogVisible.status]}${title}`" :show-close="true" :visible="dialogVisible.visible"
        width="80%" @close="handleClose">
        <square-lab  v-if="type == 'square'"  :courseId="courseId" ref="squareLab" @handleClose="handleClose" @queryList="queryList"></square-lab>
        <operation-lab v-else :showTinymce="dialogVisible.visible" :courseId="courseId" ref="operationLab"  @handleClose="handleClose" @queryList="queryList"/>
   </el-dialog>
</template>

<script>
import {
    saveChapter,
    editSectionFile
} from "@/api/edu/courseRourse";

import SquareLab from "./SquareLab"
import OperationLab from "./operationLab";
export default {
    name: '',
    components: {
        SquareLab,
        OperationLab
    },
    props: {
        courseId: {
            default: '0' | 0,
            type: String | Number
        }
    },
    created() {

    },
    data() {
        return {
            append: "",
            loading: false,
            ruleForm: {
                sectionName: '',
            },
            type:'',
            chapterItem: {},
            trialItemId: '',
            dialogVisible: {
                visible: false,
                status: 'create'
            },
            textMap: {
                update: "修改",
                create: "添加",
            },
            title: '实验',
            rules: {
                sectionName: [
                    { required: true, message: `请输入名称`, trigger: 'blur' },
                ],
            },
            fileId: ''
        }
    },
    destroyed() {

    },
    methods: {
        queryList(){
            this.handleClose()

            this.$emit('queryList')
        },
        handleOpen() {
            this.dialogVisible.visible = true;
        },
        handleClose() {
            if(this.type != 'square') {
                this.$refs['operationLab'].resetForm()
            }
            this.dialogVisible.visible = false;
            // this.$refs['ruleForm'].resetFields();
            
            

        },
    }
}
</script>

<style lang="scss" scoped></style>