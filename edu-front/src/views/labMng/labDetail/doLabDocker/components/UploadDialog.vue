<template>
    <el-dialog class="el-dialog-edu" title="上传文件" :visible.sync="dialogVisible" :before-close="handleClose">
        <div class="marginBottom10 flex justify-between align-center">

            <div>
                虚拟机目录：
            </div>
            <div style="width: 90%;">
                <el-input v-model="uploadPath" placeholder="请选择上传文件目录"></el-input>
            </div>
        </div>
        <file-List @currentChange="currentChange" :isShow="false" ref="multipleTable" class="marginBottom20"
            :filesList="filesList" @load="load" @handleSelectionChange="handleSelectionChange" :height="200">
            <template slot="table-column">
                <el-table-column prop="fileName" label="文件名" min-width="180">
                    <template #default="scope">
                        <i :class="scope.row.dir ? 'el-icon-folder' : 'el-icon-document'"></i> &nbsp;{{
                            scope.row.fileName
                        }}
                    </template>
                </el-table-column>
            </template>
        </file-List>

        <big-file-upload ref="uploader" @removeFileDefine="removeFileDefine" @complete="complete"
            @onFileSuccess="onFileSuccess"></big-file-upload>

        <re-file-name-dialog ref="re-file-name-dialog" @submit="submitReNameFileUpload"
            :waitUploadFileList="waitUploadFileList"></re-file-name-dialog>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" :loading="uploadLoading" @click="submitFileVm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { cloneDeep } from 'lodash'
import FileList from "@/components/FileList";
import ReFileNameDialog from "./ReNameFileDialog.vue";
import UploadFileList from "@/views/classMng/questionBankMng/components/UploadFileList.vue";
import BigFileUpload from "@/components/BigFileUpload";
import {
    listFile,
    uploadFileToVM
} from '@/api/edu/cloud'
import { mergeChunkFile } from '@/api/edu/file'

export default {
    name: '',
    props: {
        vmId: {
            type: Number | String,
            default: '' | 0
        }
    },
    components: {
        FileList,
        BigFileUpload,
        ReFileNameDialog
    },
    created() {

    },
    data() {
        return {
            dialogVisible: false,
            filesList: [],
            treeObj: {},
            checkedRow: {},
            uploadPath: '',
            waitUploadFileList: [],
            noMergeWaitUploadFileList: [],//未合并的文件列表
            uploadLoading: false,
            md5List: [],
            userId: 0
        }
    },
    methods: {
        handleClose() {
            this.$refs.uploader.uploadFileList = []
            this.uploadPath = ''
            this.dialogVisible = false
            this.uploadLoading = false
        },

        removeFileDefine(file, index) {
            this.waitUploadFileList.splice(index, 1)
            this.md5List.splice(index, 1)
        },
        async submitFileVm() {
            console.log(md5List);
            let uploadPath = this.uploadPath
            if (!uploadPath) {
                return this.$message.warning(`请选择上传路径`)
            }
            let vmId = this.vmId
            let md5List = this.md5List
            let waitUploadFileList = this.waitUploadFileList
            if (!(waitUploadFileList && waitUploadFileList.length && waitUploadFileList.length > 0)) {
                return this.$message.warning(`请选择上传文件或文件上传中`)
            }
            this.uploadLoading = true
            let userId = this.userId
            const res = await uploadFileToVM({ vmId, uploadPath, md5: md5List, userId })
            if (res && res.flag) {
                this.$message.success(`文件已上传到虚拟机`)
                this.uploadLoading = false
                this.$refs.uploader.uploadFileList = []
                this.waitUploadFileList = []
                this.noMergeWaitUploadFileList = []
                this.filesList = []
                this.queryListFile()
            } else {
                this.uploadLoading = false
            }
        },
        async submitReNameFileUpload(list) {
            console.log(list);

            let md5List = []
            let count = 0
            this.$refs['re-file-name-dialog'].loading = true
            const length = list.length - 1
            list && list.length > 0 && list.forEach(async (item, index) => {
                md5List.push(item.md5)
                let fileName = item.fileName
                let fileType = item.fileType
                let md5 = item.md5
                const res = (!item.isMerge) && await mergeChunkFile({
                    fileName,
                    fileType,
                    md5
                })
                if (res && res.flag) {
                    let waitUploadFileList = this.waitUploadFileList;
                    waitUploadFileList.filter((item) =>
                        item.md5 == md5 && (item.isMerge = true)
                    );
                    this.noMergeWaitUploadFileList = waitUploadFileList;
                }

                if (count++ == length) {

                    this.$refs['re-file-name-dialog'].loading = false
                    this.$refs['re-file-name-dialog'].dialogVisible = false
                    let uploadFileList = this.$refs.uploader.uploadFileList
                    if(uploadFileList && uploadFileList[index] && uploadFileList[index].name) {
                        uploadFileList[index].name = fileName + '.' + fileType
                    }
                    // let newList =  cloneDeep(uploadFileList) //更新filelist
                    // console.log(newList,'newList');
                    this.$refs.uploader.uploadFileList = uploadFileList.reverse().reverse()
                }
            })
            this.md5List = md5List
        },

        submitUpload() {
            let uploadPath = this.uploadPath
            if (!uploadPath) {
                this.$message.warning('请选择上传路径')
                return
            }
            let self = this;
            this.$nextTick(() => {
                for (var i = 0; i < self.$refs.uploader.$refs.files.length; i++) {
                    self.$refs.uploader.$refs.files[i].resume();
                }
            });
        },

        currentChange(currentRow) {
            let dir = currentRow && currentRow.dir
            if (dir) {
                this.uploadPath = currentRow.id
            } else {
                this.uploadPath = currentRow && currentRow.currentDir
            }
        },

        async onFileSuccess(obj) {
            const { rootFile, file, response, chunk } = obj
            if (response) {
                const res = JSON.parse(response)
                if (res && res.flag) {
                    let fileName = file && file.name || ''
                    let index = fileName.lastIndexOf('.')
                    let fileType = fileName.substring(index + 1, fileName.length)
                    index >= 0 && (fileName = fileName.substring(0, index))
                    let md5 = file.uniqueIdentifier
                    this.waitUploadFileList.push({
                        fileName,
                        fileType,
                        md5,
                        isMerge: false
                    })

                    // 合并分片

                }
            }

        },
        //所有文件上传完毕触发
        complete() {
            console.log('所有文件上传完毕触发');
            this.$refs['re-file-name-dialog'].dialogVisible = true
        },
        handleSelectionChange(val) {
            console.log(val);
            let table = this.$refs.multipleTable.$children[0]
            if (val.length > 1) {

                table.clearSelection()
                table.toggleRowSelection(val.pop())
            } else if (val.length === 1) {
                this.checkedRow = val.pop()
            } else {
                table.clearSelection()
            }
        },
        async queryListFile(path) {
            const res = await listFile({ vmId: this.vmId, path, userId: this.userId })
            let filesList = res && res.resData
            filesList = this.handleFilesList(filesList)
            this.filesList = filesList
        },
        async load(tree, treeNode, resolve) {
            this.treeObj[tree.id] = { tree, treeNode, resolve }  // 将本次节点对象存储到maps对象中
            const res = await listFile({ vmId: this.vmId, path: tree.id, userId: this.userId })
            let filesList = res && res.resData
            filesList = this.handleFilesList(filesList)
            resolve(filesList)
        },
        handleFilesList(filesList) {
            filesList && filesList.length > 0 && filesList.map(i => {
                let dir = i.dir
                if (dir) {
                    // i.children = [],
                    i.hasChildren = true
                }
                i.id = i.currentDir + '/' + i.fileName
            })
            return filesList
        },
    }
}
</script>

<style lang="scss" scoped>
::v-deep.el-dialog-edu {
  z-index: 100000001 !important;
}
</style>
