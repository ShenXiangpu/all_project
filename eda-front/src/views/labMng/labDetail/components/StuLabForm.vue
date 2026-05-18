<template>
    <border-container class="marginBottom10 border-container" :height="15" :isShowTitle="false" :isBgShow="false">
        <template #content>
            <div class="" style="padding: 20px 0 10px 10px;">
                <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                    <el-form-item label="关键字" prop="keyword">
                        <el-input v-model="queryParams.keyword"  placeholder="请输入姓名/学号/班级"
                            clearable @keyup.enter="handleQuery" />
                    </el-form-item>


                    <el-form-item label="状态" prop="status">
                        <el-select v-model="queryParams.status" placeholder="请选择状态">
                            <el-option label="" value="">全部</el-option>
                            <el-option label="在线" value="2"></el-option>
                            <el-option label="离线" value="3"></el-option>
                            <el-option label="请求协助中" value="1"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="success" class="editSuccess" icon="el-icon-search"
                            @click="handleQuery">搜索</el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" class="editPrimary" icon="el-icon-refresh"
                            @click="resetQuery('queryFormRef')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </template>

    </border-container>
</template>

<script>
import BorderContainer from "@/components/BorderContainer";
export default {
    name: '',
    components: {
        BorderContainer
    },
    created() {

    },
    data() {
        return {
            queryParams: {
                status: '',
                keyword: ''
            },
        }
    },
    methods: {
        resetQuery(queryFormRef) {
            this.$refs['queryFormRef'].resetFields();
            this.handleQuery()
        },
        handleQuery() {
            console.log(this.queryParams);
            this.$emit('handleQueryStu', this.queryParams)
        },
    }
}
</script>

<style lang="scss" scoped></style>