<template>
    <i v-if="item && item.children && item.children.length > 0" @click="openTreeItem(item)"
        :class="!item.isOpen ? `${iconClass} tree-item-open` : `${iconClass} tree-item-close`"
        class="pointer fontW7 marginRight10"></i>
</template>

<script>
export default {
    name: '',
    components: {

    },
    props: {
        item: {
            default: {},
            type: Object
        },
        iconClass: {
            default: 'el-icon-arrow-right',
            type: String
        }
    },
    created() {

    },
    data() {
        return {
            // iconClass: 'el-icon-arrow-right'

        }
    },
    methods: {
        openTreeItem(item) {
            
            // 展开或关闭
            this.$emit('openTreeItem', item)
        },
    }
}
</script>

<style lang="scss" scoped>
.tree-item-open {
    transform: rotate(0deg);
    transition: all .3s;
}

.tree-item-close {
    transform: rotate(90deg);
    transition: all .3s;
}
</style>