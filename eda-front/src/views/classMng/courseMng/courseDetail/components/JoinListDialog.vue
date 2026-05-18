<template>
    <el-dialog :title="title" :show-close="true" destroy-on-close :visible.sync="dialogVisible.visible" width="800px"
        style="height: 100vh;overflow: auto;padding: 20px;" @closed="reset('ruleForm')" @close="handleClose('ruleForm')">
        <div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" label="序号" width="55" align="center">
                </el-table-column>
                <el-table-column prop="name" label="用户名" min-width="80" align="center">
                </el-table-column>
                <el-table-column prop="name" label="手机号" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="date" label="申请时间" min-width="100"  align="center">
                </el-table-column>
                <el-table-column prop="name" label="操作" width="120" align="center">
                    <template slot-scope="scope">
                        <div class="flex justify-around">
                            <el-tag class="marginRight20">通过</el-tag>
                            <el-tag>拒绝</el-tag>
                        </div>

                    </template>
                </el-table-column>
            </el-table>
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
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            dialogVisible: {
                visible: false,
                status: 'create'
            },
            textMap: {
                update: "修改",
                create: "申请加入项目",
            },
            title: '申请列表',
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