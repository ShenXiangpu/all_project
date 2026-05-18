<template>
    <el-dialog title="答题情况" :visible.sync="centerDialogVisible" width="30%" center>
        <div class="flex flex-wrap marginBottom20" style="width: 100%;">
            <paper-item-container class="marginRight10 marginBottom10" v-for=" i in paperAns" :key="i.index"
                :paperIndex="i.index" :isFill="i.isFill"></paper-item-container>
        </div>
        <div>
            <i class="el-icon-s-flag" style="color: #f00;"></i> 已答题 <br/>
            <i class="el-icon-s-flag" style="color: #999;"></i> 未答题
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import PaperItemContainer from './PaperItemContainer.vue'
export default {
    name: '',
    components: {
        PaperItemContainer
    },
    props: {
        paperAns: {
            type: Array,
            default: () => []
        }
    },
    created() {

    },
    data() {
        return {
            centerDialogVisible: false
        }
    },
    methods: {
        submit() {
            this.$emit('submitPaper')
        },
    }
}
</script>

<style lang="scss" scoped>
i {
    flex-wrap: wrap;
}
</style>