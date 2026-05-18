<template>
    <div class='course-container'>
        <el-card>
            <template v-if="!isStudent" #header>
                <el-button type="primary" @click="addChapter">添加章节</el-button>
            </template>

            <div v-for="item in chapterList" :key="item.id">
                <s-x-tree :isStudent="isStudent" :iconClass="iconClass" :item="item" @addSubsection="addSubsection"
                    @openTreeItem="openTreeItem" @editSubsection="editSubsection" @delChapterOrFile="delChapterOrFile"
                    @uploadFile="uploadFile" @queryDetail="queryDetail" @editFileName="editFileName"
                    @queryList="queryChapterList"></s-x-tree>
            </div>
            <div v-if="!(chapterList && chapterList.length > 0)" class="text-center" style="color: #999;">
                暂无数据
            </div>
        </el-card>
        <chapter-dialog  @openChapter='openChapter' @queryChapterList="queryChapterList" :courseId="courseId" ref="chapter-dialog"></chapter-dialog>
        <upload-dialog  @openChapter='openChapter' :sectionId="sectionId" @getFileList="queryChapterList" ref="upload-dialog"></upload-dialog>
        <detail-drawer :complete="complete" :inComplete="inComplete" ref="detail-drawer"></detail-drawer>
    </div>
</template>

<script>
import SXTree from './SXTree/index.vue';
import ChapterDialog from './ChapterDialog.vue'
import UploadDialog from './UploadDialog.vue'
import DetailDrawer from './DetailDrawer.vue'

import {
    listSections,
    delChapterOrFile,
    getStudentLearnDetail
} from "@/api/edu/courseRourse";

export default {
    name: '',
    components: {
        SXTree, ChapterDialog, UploadDialog, DetailDrawer
    },
    props: {
        courseId: {
            default: '0' | 0,
            type: String | Number
        },
        isStudent: {
            default: false,
            type: Boolean
        },
    },
    created() {

    },
    mounted() {
        // this.queryChapterList()
    },
    data() {
        return {
            iconClass: "iconClass",
            chapterList: [

            ],
            sectionId: '',
            complete: [],
            inComplete: [],
            statusObj: {}
        }
    },
    destroyed() {
        console.log("触发");
    },
    methods: {
        queryDetail(item) {
            let sectionId = item.id
            let isSection = item && item.fileType ? false : true
            this.complete = []
            this.inComplete = []
            this.$refs['detail-drawer'].tableData = []

            getStudentLearnDetail({ sectionId, isSection }).then(res => {
                if (res && res.flag) {
                    let resData = res.resData;
                    let complete = resData.complete
                    let inComplete = resData.incomplete
                    this.complete = complete
                    this.inComplete = inComplete
                    this.$refs['detail-drawer'].title = isSection ? item.sectionName : item.name
                    this.$refs['detail-drawer'].chapterId = sectionId
                    this.$refs['detail-drawer'].isSection = isSection
                    this.$refs['detail-drawer'].index = 1
                    this.$refs['detail-drawer'].tableData = complete
                    this.$refs['detail-drawer'].handleOpen()
                }
            })
        },
        uploadFile(item) {
            this.sectionId = item.id
            this.$refs['upload-dialog'].title = ''
            this.$refs['upload-dialog'].handleOpen()
        },
        delChapterOrFile(item) {
            console.log(item);
            let id = item.id
            let isSection = item && item.fileType ? false : true
            delChapterOrFile({
                id,
                isSection
            }).then(res => {
                if (res && res.flag) {
                    this.$message.success('删除成功')
                    this.queryChapterList()
                }
            })
        },
        // 添加章节
        addChapter() {
            this.$refs['chapter-dialog'].title = "章节"
            this.$refs['chapter-dialog'].chapterItem = {}
            this.$refs['chapter-dialog'].handleOpen()
        },
        //查询章节及文件list
        queryChapterList() {
            listSections({ courseId: this.courseId }).then(res => {
                if (res && res.flag) {
                    // 处理章节列表，根据章节列表造一个对应是否展开的
                    this.chapterList = this.handleList(res.resData)
                }
            })
        },
        //handleListIsOpen 处理列表展开收起
        handleList(list) {
            let sObj = this.statusObj
            list && list.length > 0 && list.map(res => {
                res.isOpen = sObj[res.id] || false
                if (res && res.children && res.children.length > 0) {
                    this.handleList(res.children)
                }
            })
            return list
        },
        handleListIsOpen(list, id) {
            list && list.length > 0 && list.forEach(item => {
                if (item.id === id) {
                    item.isOpen = !item.isOpen
                    return
                }

                if (item.children && item.children.length > 0) {
                    this.handleListIsOpen(item.children, id)
                }
                //存储状态到数组中，请求接口后回显到列表中

            })
            let statusObj = {}
            statusObj = this.chapterOpenStatus(list, statusObj)
            console.log(statusObj);
            this.statusObj = statusObj

        },
        chapterOpenStatus(list, statusObj) {
            list && list.length > 0 && list.forEach(item => {
                let id = item.id
                let isOpen = item.isOpen
                statusObj[id] = isOpen
                if (item.children && item.children.length > 0) {
                   
                    this.chapterOpenStatus(item.children, statusObj)
                }
            })

            return statusObj
        },
        openChapter(id){
            this.statusObj[id] = true
            this.queryChapterList()
        },

        openTreeItem(item) {
            this.handleListIsOpen(this.chapterList, item.id)
        },

        addSubsection(item) {
            this.$refs['chapter-dialog'].chapterItem = item
            this.$refs['chapter-dialog'].title = "子章节"
            this.$refs['chapter-dialog'].ruleForm.sectionName = ''
            this.$refs['chapter-dialog'].handleOpen();
            this.$refs['chapter-dialog'].dialogVisible.status = 'create'

        },

        editFileName(item) {
            console.log(item);
            this.$refs['chapter-dialog'].title = "文件"
            this.$refs['chapter-dialog'].handleOpen();
            this.$refs['chapter-dialog'].dialogVisible.status = 'update'
            let name = item.name
            let fileName = name
            let append = item.fileType
            this.$refs['chapter-dialog'].ruleForm.sectionName = fileName
            this.$refs['chapter-dialog'].append = append
            this.$refs['chapter-dialog'].fileId = item.id
        },
        editSubsection(item) {
            let level = item.level
            this.$refs['chapter-dialog'].dialogVisible.status = 'update'
            this.$refs['chapter-dialog'].chapterItem = item
            this.$refs['chapter-dialog'].ruleForm.sectionName = item.sectionName
            this.$refs['chapter-dialog'].title = level == 1 ? "章节" : "子章节"
            this.$refs['chapter-dialog'].handleOpen()

        },
    }
}
</script>

<style lang="scss" scoped></style>