<template>
    <div>
        <div v-if="size > 0">
            <div v-if="uploadStatus === 'init'">
                <span>正在上传...</span>
            </div>

            <div v-else-if="uploadStatus === 'process'">
                <span>{{ percentage ? ((percentage * 100).toFixed(2) + '%') : '正在上传...' }}</span>
            </div>

            <div v-else-if="uploadStatus === 'done'">
                <span><i class="el-icon-circle-check" style="color:green"></i></span>
            </div>

            <div v-else-if="uploadStatus === 'error'">
                <span><i class="el-icon-circle-close" style="color:red"></i></span>
            </div>
        </div>
        <div v-if="size === 0">
            <span style="color:#ff436a"> <i class="el-icon-circle-close" style="color:red"></i> 文件大小为空</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        percentage: {
            type: Number,
            default: 0
        },
        uploadStatus: {
            type: String,
            default: ''
        },
        size: {
            type: Number,
            default: 1
        }
    },
    watch: {
        percentage: {
            handler(val) {
                console.log(val);
                if (val) {
                    this.percentage = val;
                }
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>

</style>