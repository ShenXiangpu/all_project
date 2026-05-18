<template>
    <div>
        <el-upload :limit="1" action="#" :disabled="disabled" list-type="picture-card" :file-list="fileList"
            :http-request="doUpload">
            <i slot="default" :class="!disabled ? 'el-icon-plus' : 'el-icon-circle-close'"></i>
            <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="filePath" alt="">
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                    </span>

                    <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
            </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="filePath" alt="">
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
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
    watch:{
        filePath(newVal,oldVal){
            console.log(newVal);
        }
    },
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
        };
    },
    methods: {
        handleRemove(file) {
            console.log(this.filePath);
            this.$emit('handleRemove')
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log(file);
        },
        doUpload(files) {
            console.log(files);
            this.$emit('doUpload', files)
        },
    }
}
</script>

<style lang="scss" scoped></style>