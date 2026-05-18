<template>
    <el-card>
        <el-table ref="multipleTable" :data="questionList" border tooltip-effect="dark" style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="55" align="center">
            </el-table-column>
            <el-table-column prop="title" label="题目" align="left" header-align="center" class="question-name"  min-width="100"
                show-overflow-tooltip>
                <template #default="scope">
                    <span class="pointer primaryColorb" @click="queryQuestion(scope.row.id)">

                        <el-tag size="mini" class="el-tag-edu" type="primary">{{ scope.row.quTypeName }}</el-tag>
                        {{ scope.row.content }}

                    </span>


                </template>
            </el-table-column>

            <el-table-column prop="level" label="难度" min-width="40" align="center">
                <template #default="scope">
                    <span v-if="scope.row.level == '简单' || scope.row.level == 1" class="primaryColorg">简单</span>
                    <span v-if="scope.row.level == '中等' || scope.row.level == 2" class="primaryColory">中等</span>
                    <span v-if="scope.row.level == '困难' || scope.row.level == 3" class="primaryColoro">困难</span>
                </template>
            </el-table-column>

            <el-table-column prop="correctRate" label="通过率" min-width="50" align="center">
            </el-table-column>
            <el-table-column prop="createByName" label="创建人" align="center" min-width="50">
            </el-table-column>

            <el-table-column prop="createdAt" label="创建时间" align="center" min-width="80">
            </el-table-column>

            <el-table-column v-if="userDialogVisible" prop="address" label="操作" align="center" min-width="90">
                <template #default="scope">
                    <el-button type="primary" class="editPrimary" size="mini"
                        @click="queryQuestion(scope.row.id)">查看</el-button>
                    <el-button type="warning" class="editWarning" size="mini"
                        @click="editQuestion(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
            @pagination="searchQuery" />
    </el-card>
</template>

<script>
import { getItemListByBankId } from '@/api/edu/question'
import Pagination from "@/components/Pagination";
export default {
    props: {
        userDialogVisible: {
            type: Boolean,
            default: true
        },
        questionList: {
            type: Array,
            default: []
        },
        total: {
            type: Number,
            default: 0
        },
        listQuery: {
            type: Object,
            default: {}
        },
        tableHeight: {
            type: String,
            default: 'calc(100vh - 445px)'
        }
    },
    components: { Pagination },
    data() {
        return {

        }
    },
    methods: {
        searchQuery(e) {
            this.$emit('searchQuery', e)
        },
        queryQuestion(id) {
            this.$emit('queryQuestion', id)
        },
        editQuestion(row) {
            console.log(row);
            let userId = this.$store.state.user.userInfo.userName
            if (userId != row.createByName) {
                this.$message.warning("无权修改非本人创建的试题")
                return
            }
            let id = row && row.id
            let quTypeId = row && row.quTypeId

            this.$emit('editQuestion', id, quTypeId)
        },
        // 表格多选
        handleSelectionChange(val) {
            this.$emit('handleSelectionChange', val)
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep {
    // .el-table_1_column_3.is-center {
    //     .cell {
    //         text-align: left;
    //     }
    // }

    .el-tag-edu.el-tag {
        background: #409EFF !important;
        color: #fff;
        border: none;
    }

    .el-tag-edu.el-tag--mini {
        height: 20px !important;
        line-height: 20px !important;
    }

    .question-content {
        height: 20px;
        width: 100%;
        margin-left: 15px;
    }
}
</style>