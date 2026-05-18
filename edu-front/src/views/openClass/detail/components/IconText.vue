<template>
    <div class="font16">
        <i :class="iconClass" class="marginRight10"></i><span class="text"><span>{{ text }}</span> </span>
    </div>
</template>

<script>
export default {
    name: 'IconText',
    props: {
        iconClass: {
            type: String,
            default: 'el-icon-success'
        },
        text: {
            type: String,
            default: '文字内容'
        },
    }
}
</script>

<style lang="scss" scoped>
.text {
    display: inline-block;
    min-width: 70px;
}
</style>