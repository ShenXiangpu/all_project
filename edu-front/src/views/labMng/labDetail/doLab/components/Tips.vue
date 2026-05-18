

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
        click(){
            this.$emit('click')
        },
    }
}
</script>
<template>
    <div class='tips pointer' @click="click">
        <i :class="iconClass" class="iconClass font14"></i>
        <span class="font14">{{ title }}</span>
    </div>
</template>
<style lang="scss" scoped>
.tips {
    background-color: #fff;
    display: inline-block;
    border-radius: 15px 0 0px 15px;
    padding: 0px 5px 0 15px;
    height: 30px;
    line-height: 30px;
    width: 75px;
    position: absolute;
    right: -35px;
    display: block;
    // transform: translate(40px);
    margin-bottom: 10px;
    .iconClass {
        margin-right: 10px;
    }
}
.tips:hover {
    transform: translateX(0px);
    // animation: trans 1s linear 0 iteration-count direction fill-mode;
}



</style>