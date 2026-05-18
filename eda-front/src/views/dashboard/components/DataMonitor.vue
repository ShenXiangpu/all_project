<template>
    <el-card>
        <div slot="header" class="clearfix">
            <span>平台数据监控</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <div>
            <data-monitor-circle></data-monitor-circle>
        </div>
    </el-card>
</template>

<script>
import DataMonitorCircle from './DataMonitorCircle.vue'
export default {
    name: '',
    components: {
        DataMonitorCircle
    },
    created() {

    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped></style>