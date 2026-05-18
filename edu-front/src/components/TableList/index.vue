<template>
    <div>
        <el-table :data="tableData" style="width: 100%" row-key="size" border lazy :load="load"
        :tree-props="{ children: 'children', hasChildren: 'subChildNums' }">

            <!-- <el-table-column type="index" :index="indexMethod">
            </el-table-column> -->
            <el-table-column label="操作" align="center" fixed="right" min-width="180">
                <template #default="scope">
                    <!-- <el-button type="primary" size="small" @click.stop="handleShowDetail(scope.row)">查看详情</el-button> -->
                    <el-button size="small" type="primary">
                        修改</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-popconfirm title="确定删除吗？">
                        <el-button size="small" type="danger" slot="reference">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
  
<script>

export default {
    name: 'TableList',
    props: {
        tableData: {
            type: Array,
            default: function () {
                return null
            }
        },
        vmId:{
            type: String,
            require: true
        }

    },
    data() {
        return {
            
        }
    },
    computed: {

    },
    methods: {
        handleSizeChange(val) {
            this.$emit('pagination', { page: this.currentPage, limit: val })
            if (this.autoScroll) {
                scrollTo(0, 800)
            }
        }
    }
}
</script>
  
<style scoped></style>
  