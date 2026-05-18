

<script>
export default {
    name: '',
    components: {

    },
    props: {
        iconClass: {
            type: String,
            default: 'el-icon-download'
        },
        title: {
            type: String,
            default: '下载'
        }
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
<template>
    <div class='tips-container pointer'>
        <i :class="iconClass" class="iconClass"></i>
        <span>{{ title }}</span>
    </div>
</template>
<style lang="scss" scoped>
.tips-container {
    background-color: #fa0a0a;
    display: inline-block;
    border-radius: 10px 0 0px 15px;
    padding: 0px 5px 0 5px;


    position: absolute;
    right: 0;

    .iconClass {
        margin-right: 10px;
    }
}
.tips-container:hover {
    transform: translateX(-10px);
    // animation: trans 1s linear 0 iteration-count direction fill-mode;
}



</style>