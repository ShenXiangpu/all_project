<template>
    <el-dialog :title="title" :show-close="true" destroy-on-close :visible.sync="dialogVisible.visible" width="800px"
        style="height: 100vh;overflow: auto;padding: 20px;" @close="handleClose('ruleForm')">
        <div>
            <el-input v-model="input" placeholder="请输入内容"></el-input> 
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
            input: '',
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
        handleOpen() {
            this.dialogVisible.visible = true;   
        },
        handleClose() {
            this.dialogVisible.visible = false;
        },


    }
}
</script>

<style lang="scss" scoped></style>