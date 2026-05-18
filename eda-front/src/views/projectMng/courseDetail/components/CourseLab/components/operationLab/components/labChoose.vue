<template>
    <div>
        <el-button size="small" type="primary" @click="handleAdd">选择lab</el-button>
        <div>
            <el-tag @close="removeLabList(tag)" style="margin-right:10px" v-for="tag in eduLibs" :key="tag.id" closable>
                {{ tag.displayName }}
            </el-tag>
        </div>


        <el-dialog append-to-body :title="textMap[dialog.status]" :visible.sync="dialog.visible" @close="cancel" class="dialog"
            width="60vw">

            <el-table border :data="labsList" ref="multipleTable" @selection-change="handleSelectionLab" style="width: 100%"
                height="320">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="displayName" label="文件名称" min-width="180" align="center">
                </el-table-column>
                <el-table-column prop="fileSize" label="文件大小" min-width="180" align="center">
                </el-table-column>
                <el-table-column  label="文件描述" min-width="180" align="center">
                    <template  slot-scope="scope">
                        {{ scope.row.remark }}
                    </template>
                </el-table-column>
                <el-table-column prop="createAt" label="创建时间" align="center" min-width="180">
                </el-table-column>

            </el-table>


            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="getLabList">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {
    getOenList,
} from "@/api/edu/lab";
export default {
    name: 'labChoose',
    props: {
        labList: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    watch: {
        labList: {
            handler(val) {
                if (val) {
                    this.eduLibs = val;
                    console.log('val', val);
                }
            },
            deep: true
        }
    },
    data() {
        return {
            dialog: {
                visible: false,
                status: "",
            },
            labsList: [],
            textMap: {
                update: "",
                create: "添加Lab",
                look: "",
            },
            labSelectList: [],
            eduLibs: []
        }
    },
    methods: {
        //打开lab列表去掉已选lab即可
        handleAdd() {
            let _this = this;
            getOenList({}).then((reponse) => {
                let resData = reponse.resData;
                let eduLibs = _this.eduLibs;
                resData = resData.map(iterator => {
                    return {
                        labId: iterator.id,
                        realName: iterator.realName,
                        displayName: iterator.displayName,
                        filePath: iterator.filePath,
                        fileSize: iterator.fileSize,
                        remark: iterator.remark,
                        createAt: iterator.createAt,
                    }
                })
                eduLibs.map(i => {
                    resData = resData.filter(item => {
                        return item.labId != i.labId
                    })
                })
                
                _this.labsList = resData;
            });
            let dialog = {
                status: "create",
                visible: true,
            };
            _this.dialog = dialog;
        },
        handleSelectionLab(row) {
            this.labSelectList = row
        },
        //添加lab要push
        getLabList() {
            let labSelectList = this.labSelectList;
            let eduLibs = this.eduLibs
            eduLibs.push(...labSelectList)
            this.eduLibs = eduLibs
            this.$emit('getLabList', eduLibs);
            this.cancel();
        },

        removeLabList(item) {
            let eduLibs = this.eduLibs
            let list = eduLibs.filter(i => {
                return item.labId != i.labId
            })
            this.eduLibs = list;
            this.$emit('removeLabList', list)
        },

        cancel() {
            let _this = this;
            let dialog = {
                visible: false,
            };
            _this.labSelectList = []
            _this.dialog = dialog;
        },
    }
}
</script>

<style lang="scss" scoped></style>