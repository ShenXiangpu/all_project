<template>
    <el-dialog :title="title" :show-close="true" destroy-on-close :visible.sync="dialogVisible.visible" width="80%"
        style="height: 100vh;overflow: auto;padding: 20px;" @closed="reset('ruleForm')" @close="handleClose('ruleForm')">
        <iframe v-if="fileType == 'pdf' || fileType == 'text'" style="width: 100%;height: 700px;" :src="`${url}`"
            frameborder="0"></iframe>

        <vue-office-docx v-if="fileType == 'word'" :src="url" style="height: 700px;" @rendered="rendered" />
        <vue-office-excel v-if="fileType == 'excel'" :src="url" style="height: 700px;" @rendered="rendered" />
        <!-- <vue-office-pdf v-if="fileType == 'pdf'" :src="url" @rendered="renderedHandler" @error="errorHandler" /> -->
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
import VueOfficeDocx from '@vue-office/docx'
import '@vue-office/docx/lib/index.css'
import VueOfficeExcel from '@vue-office/excel'
import '@vue-office/excel/lib/index.css'
import VueOfficePdf from '@vue-office/pdf'
export default {
    name: '',
    components: {
        // VuePpt,
        VueOfficeDocx,
        VueOfficeExcel,
        VueOfficePdf
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
                create: "文件上传",
            },
            title: '文件',
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