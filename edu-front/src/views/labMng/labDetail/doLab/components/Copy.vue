<template>
    <div class="flex copy-container">
        <div>
            <div class="fontW7 title">{{ title }}：</div>
        </div>
        <div class="flex">
            <div class="marginRight10">{{ content }}</div>
            <div>
                <i class="el-icon-document-copy primaryColor pointer" @click="copy(content)"></i>
            </div>
        </div>
    </div>
</template>

<script>
import _copy from 'copy-to-clipboard';
export default {
    name: '',
    props: {
        content: {
            default: '',
            type: String
        },
        title: {
            default: '',
            type: String
        },
    },
    components: {

    },
    created() {

    },
    data() {
        return {
            
        }
    },
    methods: {
        copy(content) {
            _copy(content) &&
                this.$message.success(`复制成功`);
        },
    }
}
</script>

<style lang="scss" scoped>
.copy-container {
    height: 30px;
    line-height: 30px;

    .title {
        width: 70px;
        text-align: right;
    }
}
</style>