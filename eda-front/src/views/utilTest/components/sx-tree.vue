<template>
    <div class='tree-container'>
        <!-- 树形结构 -->

        <div class="tree-item">
            <!-- icon -->
            <icon-define :item="item" @openTreeItem="openTreeItem(item)"></icon-define>
            <span>{{ item.title }}</span>
        </div>

        <div class="tree-item" v-if="item && item && item.isOpen && item.file">
            <!-- icon -->
            <!-- <icon-define :item="item"  @openTreeItem="openTreeItem(item)"></icon-define> -->
            <span>{{ item.file }}</span>
        </div>

        <!-- 树形子结构 -->
        <div v-if="item && item.isOpen && item && item.children && item.children.length > 0" class="item-container">
            <div v-for="items in item.children" :key="items.id">
                <sx-tree @openTreeItem="openTreeItem(items)" :item="items"></sx-tree>
            </div>
        </div>



    </div>
</template>

<script>

import IconDefine from './components/IconDefine'
export default {
    name: 'sxTree',
    components: {
        IconDefine
    },
    created() {

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
    data() {
        return {

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
.tree-container {
    .tree-item {
        width: 100%;
        height: 50px;
        display: flex;
        // justify-content: center;
        align-items: center;
        font-size: 14px;
        color: #666;
        font-weight: 700;
        border-bottom: 1px solid #e2dfdf;
        background-color: rgb(247, 249, 250);
        margin-bottom: 6px;
        padding: 0 0 0 6px;

        &:hover {
            background-color: #dad6d6;
        }






    }

    .item-container {
        padding-left: 10px;
    }
}
</style>