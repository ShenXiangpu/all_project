<template>
    <el-card>
        <el-table ref="multipleTable" :data="testPaperList" :loading="loading" border tooltip-effect="dark"
            style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="55" align="center">
            </el-table-column>
            <el-table-column prop="title" label="试题名称" min-width="180" align="center">
                <template #default="scope">
                    <span class="pointer primaryColor" @click="queryQuestion(scope.row.id)">{{ scope.row.title }}</span>
                </template>
            </el-table-column>

            <el-table-column label="公开范围" min-width="60" align="center">
                <template #default="scope">
                    <span v-if="scope.row.ofPublic == 1" class="primaryColorg">仅自己</span>
                    <span v-if="scope.row.ofPublic == 2" class="primaryColory">所有老师</span>
                    <!-- <span v-if="scope.row.ofPublic == 3" class="primaryColoro">全部用户</span> -->
                </template>
            </el-table-column>
            <el-table-column label="试题分值" align="center" min-width="180">
                <template #default="scope">
                    <span class="primaryColorg">{{ scope.row.score }}分</span>
                </template>
            </el-table-column>
            <el-table-column prop="usage" label="使用次数" min-width="50" align="center">
            </el-table-column>
            <el-table-column prop="createdAt" label="创建时间" align="center" min-width="150">
            </el-table-column>

            <el-table-column prop="address" label="操作" align="center" min-width="120">
                <template #default="scope">

                    <el-button type="warning" class="editWarning marginRight10" size="mini"
                        @click="editQuestion(scope.row)">修改</el-button>



                    <el-popconfirm title="确定删除吗？" @onConfirm="deleteQuestion(scope.row)">
                        <el-button slot="reference" type="danger" class="editDanger" size="mini">删除</el-button>
                    </el-popconfirm>
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
        testPaperList: {
            type: Array,
            default: []
        },
        total: {
            type: Number,
            default: 0
        },
        loading: {
            type: Boolean,
            default: false
        }

    },
    components: { Pagination },
    data() {
        return {
            listQuery: {
                page: 1,
                limit: 10,
            }
        }
    },
    methods: {
        searchQuery(e) {
            this.$emit('searchQuery', e)
        },
        queryQuestion(id) {
            this.$emit('queryTestPaperById', id)
        },

        deleteQuestion(row) {
            let userId = this.$store.state.user.userInfo.id
            if (userId != row.createBy) {
                this.$message.warning("无权删除非本人创建的试题")
                return
            }
            this.$emit('deleteQuestion', row.id)
        },
        editQuestion(row) {
            let userId = this.$store.state.user.userInfo.id
            if (userId != row.createBy) {
                this.$message.warning("无权修改非本人创建的试题")
                return
            }
            this.$emit('editTestPaperById', row.id)
        },
        // 表格多选
        handleSelectionChange(val) {
            let testPaperIds = []
            val.map(item => {
                testPaperIds.push(item.id)
            })
            this.$emit('handleSelectionChange', testPaperIds)
        }
    }
}
</script>

<style lang="scss" scoped></style>