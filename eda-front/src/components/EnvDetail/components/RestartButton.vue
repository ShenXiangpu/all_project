<template>
    <span>
        <el-popconfirm title="确定要重启桌面吗？" @onConfirm="handleDeskTopReOpen()" confirmButtonText="立即重启">
            <el-button icon="el-icon-refresh" :loading="resetTLoading" :disabled="powerState !== 'poweredOn'" slot="reference" type="primary" class="editPrimary" size="small">重启桌面
            </el-button>
        </el-popconfirm>


        <el-divider direction="vertical"></el-divider>
    </span>
</template>
    
<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';


export default {
    //import 引入的组件需要注入到对象中才能使用
    name: "RestartButton",
    props: {
        password: {
            type: String,
            default: ''
        },
        powerState: {
            type: String,
            default: ''
        },
    },
    watch: {


    },
    data() {
        return {
            isShow: false,
            resetTLoading:false
        };
    },
    computed: {

    },
    created() {

    },
    methods: {
        handleDeskTopReOpen(){
            this.resetTLoading = true
            this.$emit('handleDeskTopReOpen')
            setTimeout(() => {
                this.resetTLoading = false
            }, 1000);
        },
        showPwd() {
            return this.isShow = !this.isShow
        },
    },
    //生命周期 - 挂载完成（可以访问 DOM 元素）
    mounted() {

    },

};
</script>
<style lang='scss' scoped></style>
    