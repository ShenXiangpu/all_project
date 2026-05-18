<template>
    <div class="app-container">
        <cloud-detail :id="courseId"></cloud-detail>
    </div>
</template>
    
<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';
import CloudDetail from "@/components/CloudDetail";


export default {
    //import 引入的组件需要注入到对象中才能使用
    name: "cloudEnvDetail1",
    components: {
        CloudDetail
    },
    props: {},
    data() {
        return {
            courseId:''
        };
    },
    watch: {},
    computed: {

    },
    created() {
        this.courseId = this.$route.query.id
    },
    methods: {
        

    },
    //生命周期 - 挂载完成（可以访问 DOM 元素）
    mounted() {

    },

};
</script>
<style lang='scss' scoped>
.marginTop10 {
    margin-top: 10px;
}

.marginRt20 {
    margin-right: 20px;
}

.marginBottom20 {
    ::v-deep {
        .el-card__body {
            padding: 10px 20px;
        }
    }

}

.el-form-item {
    margin-bottom: 0px
}

.dialog {
    ::v-deep {
        .el-dialog {
            max-height: 80vh;
            overflow: auto;
        }

        // .el-dialog__footer {
        //   position: absolute;
        //   bottom: 0px;
        //   right: 0px
        // }
    }

    &-form {
        width: 50%;
    }
}

.dialog-form {
    width: 100%;
}

.dialog-userContainer {
    border: 1px solid #ccc;
    padding: 10px;
    height: 200px;
    max-height: 30vh;
    overflow: auto;

    &-tag {
        margin-right: 5px;
    }
}

.marginBottom10 {
    margin-bottom: 10px;
}
</style>
    