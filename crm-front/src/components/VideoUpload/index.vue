<template>
    <!-- <el-upload class="upload-demo" ref="upload" :http-request="doUpload" :on-remove="handleRemove" :file-list="fileList"
        :on-preview="onPreView" :before-upload="beforeAvatarUpload" :on-change="handleChange" :auto-upload="true"
        :limit="limit">
        <el-button slot="trigger" :size="btnSize" :type="btnType" :icon="icon">{{ text }}</el-button>
    </el-upload> -->
    <div class="video-upload">
        <el-upload action="#" :http-request="doUpload" :disabled="disabled" :file-list="fileList" list-type="picture-card"
            :limit="1">
            <i slot="default" :class="!disabled ? 'el-icon-plus' : 'el-icon-circle-close'"></i>
            <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="dialogImageUrl" alt="">
                <span class="el-upload-list__item-actions">
                    <span v-if="filePath" class="el-upload-list__item-preview" @click="handlePictureCardPreview()">
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span v-if="false" class="el-upload-list__item-delete" @click="handleDownload(file)">
                        <i class="el-icon-download"></i>
                    </span>
                    <span v-if="filePath" class="el-upload-list__item-delete" @click="handleRemove(file)">
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
            </div>
        </el-upload>
        <el-dialog title="视频预览" :visible.sync="dialogVisible" @close="onclose" :close-on-click-modal="false">
            <video width="100%" height="100%" controls>
                <source :src="filePath" type="video/mp4">
                <source :src="filePath" type="video/ogg">
                <source :src="filePath" type="video/webm">
            </video>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: () => {
                return '上传文件'
            }
        },
        limit: {
            type: Number,
            default: () => {
                return 1
            }
        },

        icon: { //按钮icon
            type: String,
            default: () => {
                return 'el-icon-plus'
            }
        },
        btnType: {//按钮类型
            type: String,
            default: () => {
                return 'primary'
            }
        },
        btnSize: { //按钮大小
            type: String,
            default: () => {
                return 'small'
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        dialogImageUrl: {//按钮类型
            type: String,
            default: require('@/assets/upload/loading.svg')
        },
        filePath: {
            type: String,
            default: () => {
                return ''
            }
        },
        fileList: {//按钮类型
            type: Array,
            default: () => {
                return []
            }
        },
    },
    watch: {
        filePath(newVal, oldVal) {
            let video = document.querySelector('video')
            if (video) {
                video.load();
            }
        },
    },
    data() {
        return {
            // dialogImageUrl: '',
            dialogVisible: false,
            // disabled: false,
        }
    },
    methods: {
        onclose() {
            this.dialogVisible = false
            var video=document.querySelector('video');
            video.pause();
        },
        handleRemove(file) {
            this.$emit('handleRemove')
        },
        handlePictureCardPreview(file) {
            this.dialogVisible = true
        },
        handleDownload(file) {
            console.log(file);
        },
        doUpload(files) {

            this.$emit('doUpload', files)
        },
    }
}
</script>

<style lang="scss" scoped>
.video-upload {
    ::v-deep {
        .el-upload--picture-card {
            width: 100px;
            height: 100px;
            line-height: 100px;
            border: 1px dashed #d9d9d9;

            .el-icon-plus {
                // font-size: 57px;
                color: #8c939d;
                margin: 0 auto;
                line-height: 100px;
            }
        }

        .el-upload-list--picture-card .el-upload-list__item {
            width: 100px;
            height: 100px;
            line-height: 100px;
            // border: 1px dashed #d9d9d9;
        }
    }
}
</style>