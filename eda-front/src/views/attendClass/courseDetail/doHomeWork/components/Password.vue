<template>
    <span>
        <span v-if="!isShow">*********** <i class="el-icon-lock primaryColor" @click="showPwd"></i></span>
        <span v-else>{{ password }}
            &nbsp;<el-tooltip class="item" effect="dark" content="复制" placement="top-start">
                <i class="el-icon-document-copy primaryColor" @click="copy(password)"></i>
            </el-tooltip>&nbsp;
            <i class="el-icon-unlock primaryColor" @click="showPwd"></i>

        </span>
    </span>
</template>
    
<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';

import _copy from 'copy-to-clipboard';
export default {
    //import 引入的组件需要注入到对象中才能使用
    name: "Password",
    props: {
        password: {
            type: String,
            default: ''
        },
    },
    watch: {


    },
    data() {
        return {
            isShow: false
        };
    },
    computed: {

    },
    created() {

    },
    methods: {
        copy(password) {
            _copy(password) &&
                this.$message.success(`复制成功`);
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
    