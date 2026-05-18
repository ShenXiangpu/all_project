<template>
    <el-dialog :title="title" :show-close="true" destroy-on-close :visible.sync="dialogVisible.visible" width="700px"
        style="height: 100vh;overflow: auto;padding: 20px;" @closed="reset('ruleForm')" @close="handleClose('ruleForm')">
        <el-input style="width:400px" class="marginBottom10" placeholder="请输入内容" v-model="input3">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <div class="color9 marginBottom10">注意：项目编号是项目的唯一标识，请向项目创建人或项目成员索要项目编号</div>

        <div class="flex justify-between" style="border:1px solid #ddd;border-radius:6px;padding:10px">
            <div class="flex justify-between">
                <el-image class="marginRight10"></el-image>
                <div>
                    <div>AAAAAAAAAAA</div>
                    <div>创建人：<span>sxp</span> </div>
                    <div>项目介绍：<span>sdsfasdfadfadfa</span></div>
                </div>
            </div>

            <div>
                <el-button type="success" size="mini" icon="el-icon-plus">加入项目</el-button>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import {
    getSectionFileStreamById
} from "@/api/edu/course";
import {
    updateFileLearnRate
} from "@/api/edu/courseRourse";
import { mapGetters } from "vuex"

export default {
    name: '',
    components: {
        // VuePpt,

    },
    props: {

    },
    watch: {

    },
    computed: {
        ...mapGetters(['userRolesNames',])
    },
    created() {
    },
    mounted() {
        // 获取视频总时长
    },
    data() {
        return {

            dialogVisible: {
                visible: false,
                status: 'create'
            },
            textMap: {
                update: "修改",
                create: "申请加入项目",
            },
            title: '申请加入项目',
            url: '',
            fileId: '',
            fileType: '',
            completed: 0
        }
    },
    destroyed() {

    },
    methods: {
        rendered() {
            console.log("渲染完成")

        },
        renderedHandler() {
            console.log("渲染完成")
        },
        errorHandler() {
            console.log("渲染失败")
        },

        querySectionFileStreamById() {
            getSectionFileStreamById({ id: this.fileId }).then(res => {
                const blob = new Blob([res], {
                    type: "application/vnd.ms-docx;charset=utf-8"
                });
                let fileReader = new FileReader()
                fileReader.readAsArrayBuffer(blob)
                fileReader.onload = () => {
                    this.url = fileReader.result
                }
            })
        },
        handleOpen() {
            this.dialogVisible.visible = true;
            let userRolesNames = this.$store.state.user.userRolesNames
            let completed = this.completed
            if (userRolesNames == '学生' && completed != 1) { //学士才调用
                let fileId = this.fileId
                let stuRate = 100
                let data = {
                    fileId,
                    stuRate
                }
                updateFileLearnRate(data)
                this.$emit("queryList")
            }
        },
        handleClose() {
            this.url = ''
            this.dialogVisible.visible = false;

        },

        reset(formName) {
            this.handleClose()
        },
        submitForm(formName) {
            this.handleClose();

        },
    }
}
</script>

<style lang="scss" scoped></style>