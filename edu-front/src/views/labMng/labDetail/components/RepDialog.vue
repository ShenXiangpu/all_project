<template>
    <div class="el-dialog-edu">
        <el-dialog :visible.sync="dialogTableVisible" @close="cancel">
            <rep-table :report="reportDetail"></rep-table>
        </el-dialog>
    </div>
</template>

<script>
import RepTable from './RepTable.vue';
export default {
    name: 'RepDialog',
    components: { RepTable },
    props: {
        reportDetail: {
            type: Object,
            default: () => {
                return {}
            }
        },
        dialogTableVisible: {
            type: Boolean,
            default: () => {
                return false
            }
        }
    },
    data() {
        return {

        }
    },
    methods: {
        /**
         * 取消
         */
        cancel() {
            this.$emit('cancel');
        }
    }
}
</script>

<style lang="scss" scoped>
.el-dialog-edu {
    ::v-deep {
        .el-dialog {
            width: 900px;
            height: 90vh;
            margin-top: 5vh !important;
        }
    }

}
</style>