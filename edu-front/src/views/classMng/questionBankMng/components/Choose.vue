<template>
    <div class="flex justify-start align-center font14">
        <div v-if="title">{{ title }}：</div>
        <div>
            <div @click="handleClick('all', '全部')" :class="clickIndex === 'all' ? 'click-style' : ''"
                class="name-item marginRight10">
                全部
            </div>
            <div @click="handleClick(Number(index + 1), item)" :class="clickIndex === (index + 1) ? 'click-style' : ''"
                class="name-item marginRight10" v-for="(item, index) in directionList" :key="item.id">{{ item.name }}</div>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '测试',
        },
        directionList: {
            type: Array,
            default: () => {
                return [];
            }
        },

    },
    data() {
        return {
            clickIndex: 'all'
        }
    },
    created() {

    },
    methods: {
        handleClick(id, item) {
            console.log(id,item);
            this.clickIndex = id
            this.$emit('handleClick', id, item);
        }
    },
    computed: {

    },
    watch: {
    }
}
</script>

<style lang="scss" scoped>
.name-item {
    cursor: pointer;
    display: inline-block;
    padding: 4px;
    font-family: "PingFang SC";
}

.click-style {
    color: #409eff;
    border-radius: 4px;
    background: rgb(210, 226, 246);
}
</style>