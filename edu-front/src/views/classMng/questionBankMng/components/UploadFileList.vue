<template>
    <div>
        <div class="marginBottom20">
            <el-upload class="upload-demo" ref="upload" multiple :show-file-list="false" action :http-request="doUpload"
                :on-preview="handlePreview" :on-remove="handleRemove" :auto-upload="true">
                <el-button  class="marginRight20" slot="trigger" type="primary">选取文件</el-button>
                <span style="color:#f00">注意：文件大小不能超过5G</span>
            </el-upload>
        </div>
        <div class="marginBottom20">
            <el-table class="el-table-edu" maxHeight="500" :data="fileList" border style="width: 100%;">
                <el-table-column type="index" label="序号" width="55">
                </el-table-column>
                <el-table-column prop="name" label="文件名" min-width="180">
                </el-table-column>
                <el-table-column prop="name" label="大小" width="180">
                    <template #default="scope">
                        {{ `${(scope.row.size / 1024).toFixed(2)}KB ` }}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态">
                </el-table-column>
                <el-table-column prop="address" label="操作">
                    <template #default="scope">
                        <el-button size="small" type="danger" @click="removeFile(scope)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div>
            <el-button :loading="loading" @click="submitUpload" type="success"
                class="marginRight20">开始上传</el-button>
            <span class=" primaryColoro">注意：一定要点击【开始上传】，不然文件一直是 “等待上传”</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        limitSize: {
            type: Number,
            default: 5
        }
    },
    data() {
        return {
            fileList: [],
            tableData: []
        }
    },
    methods: {
        doUpload(file) {
            console.log(file);
            let fileItem = file.file
            console.log('file',fileItem);
            let fileSize = fileItem.size / 1024 / 1024 / 1024; // 文件大小，单位为MB
            console.log('file',fileSize);
            if(fileSize > this.limitSize) {
                return this.$message.error('文件大小不能大于5G');
            }
            fileItem.status = '等待上传'
            this.fileList = [fileItem];
            this.$emit('doUploadPre', fileItem);
        },
        removeFile(scope) {
            let $index = scope.$index;
            console.log($index);
            this.fileList.splice($index, 1);
        },
        submitUpload() {
            this.$emit('submitUpload', this.fileList[0]);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {

        }

    }
}
</script>

<style lang="scss" scoped></style>
