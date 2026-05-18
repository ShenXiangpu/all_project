<template>
    <div class='tree-container'>
        <!-- 树形结构 -->

        <div class="tree-item flex justify-between align-center">
            <!-- icon -->

            <div >
                <icon-define :item="item" @openTreeItem="openTreeItem(item)"></icon-define>
                <span @click="openTreeItem(item)" class="pointer">{{ item.sectionName }} </span>
            </div>
            <div>
                <span class=" marginRight10">
                    <el-tag class="detail-bg-color check-detail">{{ item.stuRate }}</el-tag>
                </span>
                <span v-if="!isStudent" class="pointer check-detail" @click="queryDetail(item)">
                    查看详情 <i class="el-icon-d-arrow-right"></i>
                </span>

                <el-divider direction="vertical" v-if="!isStudent"></el-divider>
                <span class="pointer marginRight10" v-if="item.level == 1 && !isStudent">
                    <el-tag @click="addSubsection(item)">添加子章节</el-tag>
                </span>
                <span class="pointer marginRight10" v-if="!isStudent">
                    <el-tag type="success" @click="uploadFile(item)">
                        上传文件
                    </el-tag>
                </span>
                <span class="pointer marginRight10" v-if="!isStudent">
                    <el-tag type="warning" @click="editSubsection(item)">
                        修改
                    </el-tag>
                </span>
                <span class="pointer" v-if="!isStudent">
                    <el-popconfirm title="确定删除吗？" @onConfirm="delChapterOrFile(item)">
                        <el-tag type="danger" slot="reference">
                            删除
                        </el-tag>
                    </el-popconfirm>
                </span>
            </div>
        </div>

        <div class="item-container" v-if="item && item && item.isOpen && item.files">
            <!-- icon -->
            <!-- <icon-define :item="item"  @openTreeItem="openTreeItem(item)"></icon-define> -->

            <div class="tree-item flex justify-between align-center" v-for="res in item.files" :key="res.id">
                <span class="pointer primaryColorb" @click="watchFiles(res)">
                    <svg-icon
                        :icon-class="fileCategory(res && res.fileType.toLowerCase()) ? fileSvg[fileCategory(res && res.fileType.toLowerCase())] : 'white'"
                        class="svg" /> {{ res.name }}.{{ res.fileType }}


                </span>
                <div>
                    <span v-if="res.completed == 0" class=" marginRight10">
                        <el-tag type="danger">待开始</el-tag>
                    </span>
                    <span v-if="res.completed == 1" class=" marginRight10">
                        <el-tag>已完成</el-tag>
                    </span>
                    <span v-if="res.completed == 2 || userRolesNames != '学生'" class=" check-detail marginRight10">
                        <el-tag class="detail-bg-color check-detail">{{ res.stuRate }}</el-tag>
                    </span>
                    <span class="pointer check-detail" @click="queryDetail(res)" v-if="!isStudent">
                        查看详情 <i class="el-icon-d-arrow-right"></i>
                    </span>

                    <el-divider direction="vertical" v-if="!isStudent"></el-divider>


                    <span class="pointer marginRight10" @click="editFileName(res)" v-if="!isStudent">
                        <el-tag type="warning">
                            修改
                        </el-tag>
                    </span>
                    <span class="pointer" v-if="!isStudent">

                        <el-popconfirm title="确定删除吗？" @onConfirm="delChapterOrFile(res)">
                            <el-tag type="danger" slot="reference">
                                删除
                            </el-tag>
                        </el-popconfirm>

                    </span>
                </div>
            </div>
        </div>

        <!-- 树形子结构 -->
        <div v-if="item && item.isOpen && item && item.children && item.children.length > 0" class="item-container">
            <div v-for="items in item.children" :key="items.id">
                <s-x-tree :isStudent="isStudent" :item="items" v-on="$listeners"></s-x-tree>
            </div>
        </div>

        <!-- <el-dialog :title="dialogSourse.title" :visible.sync="dialogSourse.visible" @close="cancelSourse">
                        <iframe :src="pdfUrl" frameborder="0" style="z-index: 1000;height:560px;width:100%"></iframe>
                    </el-dialog> -->
        <video-dialog ref="video-dialog" @queryList="queryList"></video-dialog>
        <file-dialog ref="file-dialog" @queryList="queryList"></file-dialog>

        <el-image-viewer v-show="isShowPre" ref="el-images" style="" :src="imageUrl" :url-list="srcList"
            :on-close="closeViewer">
        </el-image-viewer>
    </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon'
import StatusIcon from './components/StatusIcon.vue'
import IconDefine from './components/IconDefine'
import VideoDialog from '../VideoDialog'
import FileDialog from '../FileDialog'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
import { mapGetters } from 'vuex'
import {
    getSectionFileStreamById
} from "@/api/edu/course";
import {
    updateFileLearnRate
} from "@/api/edu/courseRourse";
const fileSvg = {
    image: 'jpg',
    video: 'video',
    text: 'txt',
    zip: 'zip',
    pdf: 'pdf',
    word: 'word',
    excel: 'excel',
    ppt: 'ppt',
    html: 'html'
}
export default {
    name: 's-x-tree',
    components: {
        IconDefine,
        StatusIcon,
        SvgIcon,
        VideoDialog,
        FileDialog,
        ElImageViewer
    },
    created() {

    },
    computed: {
        ...mapGetters([
            'userRolesNames',
        ])
    },
    props: {
        item: {
            default: {},
            type: Object
        },
        iconClass: {
            default: 'el-icon-arrow-right',
            type: String
        },
        isStudent: {
            default: false,
            type: Boolean
        },
    },
    data() {
        return {
            fileSvg: fileSvg,
            isShowPre: false,
            imageUrl: '',
            srcList: []
        }
    },
    methods: {
        /**
         * 更新列表
         */

        /**
         * 
         */
        queryList() {
            this.$emit('queryList')
        },
        fileCategory(ext) {
            let type = '';
            const typeMap = {
                image: ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'],
                video: ['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'],
                text: ['txt', 'pages', 'epub', 'numbers', 'csv', 'keynote'],
                zip: ['rar', 'zip', 'tar', 'gzip', '7-zip'],
                pdf: ['pdf'],
                word: ['doc', 'docx'],
                excel: ['xls', 'xlsx'],
                ppt: ['ppt', 'pptx'],
                html: ['html']
            };
            Object.keys(typeMap).forEach((_type) => {
                const extensions = typeMap[_type];
                if (extensions.indexOf(ext) > -1) {
                    type = _type
                }
            });
            return type
        },

        queryDetail(item) {
            this.$emit('queryDetail', item)
        },

        delChapterOrFile(item) {
            //判断是否是文件
            this.$emit('delChapterOrFile', item)
        },
        openTreeItem(item) {
            // 展开或关闭
            this.$emit('openTreeItem', item)
        },

        addSubsection(item) {
            this.$emit('addSubsection', item)
        },

        editSubsection(item) {
            console.log('editSubsection', item);
            this.$emit('editSubsection', item)
        },
        editFileName(item) {
            console.log(item, 'file');
            this.$emit('editFileName', item)
        },
        uploadFile(item) {
            this.$emit('uploadFile', item)
        },
        closeViewer() {
            this.isShowPre = false
        },
        watchFiles(item) {
            console.log(item);
            let type = this.fileCategory(item.fileType)

            if (type == "video") {

                let video = this.$refs['video-dialog']


                let videoUrl = item.filePath
                video.url = videoUrl
                video.title = item.name
                video.fileId = item.id
                video.completed = item.completed
                video.handleOpen()
                // video.getVideo()
            } else {
                this.$refs['file-dialog'].fileType = type

                if (type == "pdf" || type == 'text' || type == "word" || type == "excel") {
                    this.$refs['file-dialog'].title = item.name
                    this.$refs['file-dialog'].fileId = item.id
                    this.$refs['file-dialog'].url = item.filePath
                    this.$refs['file-dialog'].completed = item.completed
                    this.$refs['file-dialog'].handleOpen()

                } else if (type == 'image') {
                    this.imageUrl = item.filePath
                    this.srcList = [item.filePath]
                    setTimeout(() => {
                        this.isShowPre = true
                    }, 100)

                    let userRolesNames = this.$store.state.user.userRolesNames
                    let completed = item.completed
                    if (userRolesNames == '学生' && completed != 1) { //学士才调用
                        let fileId = item.id
                        let stuRate = 100
                        let data = {
                            fileId,
                            stuRate
                        }
                        updateFileLearnRate(data)
                        this.queryList()
                    }
                } else {
                    this.$message.warning("文件不支持预览");
                    const a = document.createElement("a"); //创建a标签
                    a.style.display = "none";
                    a.href = item.filePath; // 指定下载链接
                    a.download = item.name; //指定下载文件名
                    document.body.appendChild(a);
                    a.click(); //触发下载
                    document.body.removeChild(a);
                    this.$message.success("下载成功");

                    let fileId = item.id
                    let stuRate = 100
                    let data = {
                        fileId,
                        stuRate
                    }
                    updateFileLearnRate(data)
                    this.queryList()
                }
            }

        },

    }
}
</script>

<style lang="scss" scoped>
.tree-container {
    .tree-item {
        width: 100%;
        height: 50px;
        display: flex;
        // justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #666;
        font-weight: 700;
        border-bottom: 1px solid #e2dfdf;
        background-color: rgb(247, 249, 250);
        margin-bottom: 6px;
        padding: 0 6px 0 6px;

        &:hover {
            background-color: #eeeaea;
        }


        .detail-color {
            color: rgb(84, 33, 204);

        }

        .detail-bg-color {
            background-color: rgb(226, 215, 251);
        }


        .check-detail {
            @extend .detail-color;

        }

        .check-detail.el-tag {
            @extend .detail-bg-color;

        }


    }

    .item-container {
        padding-left: 10px;
    }
}

::v-deep {
    .el-icon-circle-close:before {
        color: #fff !important;
    }
}
</style>