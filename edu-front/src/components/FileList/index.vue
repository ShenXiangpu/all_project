<template>
    <el-table highlight-current-row @current-change="currentChange" :data="filesList"  style="width: 100%" row-key="id" border lazy :load="load"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" :height="height"
        @selection-change="handleSelectionChange" @expand-change="hanleExpandChange">
        <el-table-column v-if="isShow" type="selection"  width="55">
        </el-table-column>
        <slot name="table-column"></slot>
    </el-table>
</template>
  
<script>


export default {
    name: 'Patch',
    props: {
        filesList: {
            type: Array,
            default: function () {
                return []
            }
        },
        height: {
            type: Number,
            default: 200
        },
        isShow: {
            type: Boolean,
            default: true
        },

    },
    watch: {
        filesList: function (newData, oldData) {
            this.filesList = newData;
        },
        // filesList: {
        //     deep: true,
        //     immediate: true,
        //     handler(val) {
        //        console.log(val);
        //     }
        // },
    },
    computed: {

    },
    methods: {
        handleSizeChange(val) {
            this.$emit('pagination', { page: this.currentPage, limit: val })
            if (this.autoScroll) {
                scrollTo(0, 800)
            }
        },

        handleSelectionChange(val) {
            this.$emit('handleSelectionChange', val)
        },
        hanleExpandChange(row, expanded) {
            this.$emit('hanleExpandChange', row, expanded)
        },
        load(tree, treeNode, resolve) {
            this.$emit('load', tree, treeNode, resolve)
        },

        currentChange(currentRow,oldCurrentRow){
            this.$emit('currentChange',currentRow)
        },
    }
}
</script>
  
<style scoped></style>
  