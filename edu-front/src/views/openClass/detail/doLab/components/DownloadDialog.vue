<template>
    <el-dialog title="下载文件" :visible.sync="dialogVisible"  :before-close="handleClose">
        <div class="marginBottom10 flex justify-between align-center">
            <div>
                下载文件路径：
            </div>
            <div style="width: 80%;">
                <el-input v-model="uploadFilePath" readonly placeholder="请选择需要下载的文件"></el-input>
            </div>
        </div>
        <file-List @currentChange="currentChange" :isShow="false" ref="multipleTable" class="marginBottom20"
            :filesList="filesList" @load="load" :height="400">
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
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" :loading="downLoading" @click="downLoad">下载</el-button>
        </span>
    </el-dialog>
</template>

<script>
import FileList from "@/components/FileList";
import {
    listFile,

} from '@/api/edu/cloud'
import { downloadFile } from '@/api/edu/file'
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
    },
    created() {

    },
    computed: {
        uploadFilePath() {
            if (this.fileName) {
                return this.uploadPath + '/' + this.fileName
            } else {
                return ''
            }
        }
    },
    data() {
        return {
            dialogVisible: false,
            filesList: [],
            treeObj: {},
            checkedRow: {},
            uploadPath: '',
            waitUploadFileList: [],
            downLoading: false,
            md5List: [],
            fileName: '',
            userId:'',

        }
    },
    methods: {
        handleClose() {
            // this.$refs.uploader.uploadFileList = []
            this.dialogVisible = false
            this.uploadLoading = false
        },
        currentChange(currentRow) {
            console.log(currentRow);
            let dir = currentRow && currentRow.dir
            if (dir) {
                this.uploadPath = currentRow.id
                this.fileName = ''
            } else {
                this.uploadPath = currentRow && currentRow.currentDir
                this.fileName = currentRow && currentRow.fileName
            }
        },
        downLoad() {
            if (this.fileName) {
                let vmId = this.vmId
                let fileName = this.fileName
                let currentDir = this.uploadPath
                this.downLoading = true
                let userId = this.userId
                downloadFile({ vmId, currentDir, fileName,userId }).then(res => {

                    // const blob = new Blob([res.data], {
                    //     type:'application/json'
                    // }); // 构造一个blob对象来处理数据，并设置文件类型

                   let resData = res.resData
                    // const href = URL.createObjectURL(blob); //创建新的URL表示指定的blob对象
                    const a = document.createElement("a"); //创建a标签
                    a.style.display = "none";
                    a.href = resData; // 指定下载链接
                    a.download = fileName; //指定下载文件名
                    document.body.appendChild(a);
                    a.click(); //触发下载
                    URL.revokeObjectURL(a.href); //释放URL对象
                    document.body.removeChild(a);
                    this.$message.success("下载成功");
                    this.downLoading = false

                }).finally(() => {
                    this.downLoading = false
                })
            } else {
                this.$message.warning('请选择文件')
                return
            }
        },
        async queryListFile(path) {
            const res = await listFile({ vmId: this.vmId, path, userId:this.userId  })
            let filesList = res && res.resData
            filesList = this.handleFilesList(filesList)
            this.filesList = filesList
        },
        async load(tree, treeNode, resolve) {
            this.treeObj[tree.id] = { tree, treeNode, resolve }  // 将本次节点对象存储到maps对象中
            const res = await listFile({ vmId: this.vmId, path: tree.id,userId:this.userId  })
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

<style lang="scss" scoped></style>