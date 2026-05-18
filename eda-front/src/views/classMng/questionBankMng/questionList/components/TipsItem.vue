<template>
    <div>
        <div @click="handleClick(tip)" :class="tip.isSelect ? 'i-item i-item-check' : 'i-item'"
            class="marginRight10 marginBottom10">{{ tip.name }}</div>
    </div>
</template>

<script>
export default {
    props: {
        tip: {
            type: Object,
            default: () => { },
        },
        name: {
            type: Number,
            default: 0,
        },
    },
    methods: {
        handleClick(tip) {
            this.$emit('handleClick', tip, this.name)
        },
    }
}
</script>

<style lang="scss" scoped>
.i-item {
    color: #858585;
    font-weight: 600;
    padding: 3px 10px;
    font-size: 16px;
    border-radius: 5px;
    background-color: rgba($color: #ddd, $alpha: 1.0);
}

.i-item-check {
    color: #fff;
    font-weight: 600;
    padding: 3px 10px;
    font-size: 16px;
    border-radius: 5px;
    background-color: rgba($color: #409EFF, $alpha: 1.0);
}
</style>