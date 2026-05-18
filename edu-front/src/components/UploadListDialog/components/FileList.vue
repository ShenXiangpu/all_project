<template>
    <div>
        <div class="filePanel">
            <!-- <h2>文件列表</h2>  -->
            <div class="fileList">
                <div v-for="(item) in fileList" :key="item.id">
                    <ul class="fileItem">
                        <li class="fileType">
                            <svg-icon
                                :icon-class="fileCategory(item && item.ext.toLowerCase()) ? fileSvg[fileCategory(item && item.ext.toLowerCase())] : 'white'"
                                class="svg" />
                        </li>
                        <li class="fileName">
                            <el-tooltip effect="dark" :content="item.name" placement="left-end">
                                {{ item.name }}
                            </el-tooltip>
                        </li>
                        <li class="fileSize">{{ fileSize(item.size) }}</li>
                        <li class="fileStatus" :style="item.uploadStatus === 'error' ? { color: 'red' } : {}">
                            <!-- {statusIcon(uploadStatus, size)} -->
                            <status-icon :uploadStatus="item.uploadStatus" :size="item.size"
                                :percentage="percentage"></status-icon>
                        </li>
                        <li class="progress" :style="{ 'width': `${item.percentage * 100}%` }"></li>
                        {{ item.uploadStatus }}
                    </ul>
                </div>
                <div v-if="fileList && fileList.length === 0" class="noFile"> 暂无待上传文件</div>
            </div>
        </div>
    </div>
</template>

<script>
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
import SvgIcon from '@/components/SvgIcon'
import StatusIcon from './StatusIcon.vue'
const WebUploader = require('webuploader');
export default {
    components: {
        SvgIcon,
        StatusIcon
    },
    data() {
        return {
            fileSvg: fileSvg
        }
    },
    props: {
        file: {
            type: Object,
            default: () => {
                return {}
            }
        },
        fileList: {
            type: Array,
            default: () => {
                return []
            }
        },
        percentage: {
            type: Number,
            default: 0
        },
    },
    watch: {
        percentage: {
            handler(val) {
                console.log(val);
                if (val) {
                    this.percentage = val;
                }
            },
            deep: true
        }
    },
    methods: {
        fileSize(size) {
            const formatSize = WebUploader.Base.formatSize(size);
            return formatSize;
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
        }

    }
}
</script>

<style lang="scss" scoped>
$mainColor: #108ee9;
$mainTextSize: 12px;
$bottonTextSize: 12px;
$errorColor: red;
$h-row: 45px;

.icon {
    display: inline-block;
    // float: left;
    height: 100%;
    margin-right: 5px;
    margin-top: 0;
    line-height: 80px;
    font-size: 62px;
    vertical-align: middle;
    box-sizing: border-box;
}

.fileItem {
    position: relative;
    height: $h-row;
    line-height: $h-row;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    z-index: 1;
    margin-bottom: 0;

    >li {
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}

.fileType {
    width: 32px;
    line-height: 32px;
}

.svg {
    font-size: 24px;
}

.fileName {
    width: 42%;
}

.fileSize {
    width: 20%;
    margin-left: 10px;
}

.fileStatus {
    width: 20%;
}

.fileOperate {
    width: 15%;

    >a {
        padding: 10px 5px;
        cursor: pointer;
        color: #666;
        opacity: 0.8;
        font-size: 12px;

        &:hover {
            color: #1890ff;
        }
    }
}

.fileType {
    &text {
        background: url('../../../assets/upload/file-text.png');
    }

    &video {
        background: url('../../../assets/upload/file-video.png');
    }

    &image {
        background: url('../../../assets/upload/file-image.png');
    }

    &zip {
        background: url('../../../assets/upload/file-zip.png');
    }

    &config {
        background: url('../../../assets/upload/file-config.png');
    }
}

.progress {
    position: absolute;
    top: 0;
    left: 0;
    height: $h-row - 1;
    width: 0;
    background-color: #e2edfe;
    z-index: -1;
}
</style>