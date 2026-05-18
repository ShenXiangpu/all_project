<template>
    <div class="handle-container primaryBorder">
        <el-button size="mini" type="primary" @click="removeQuestion">删除</el-button>
        <el-button size="mini" type="primary" @click="move(-1)">上移</el-button>
        <el-button size="mini" type="primary" @click="move(1)">下移</el-button>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        id: {
            type: Number | String,
            default: 0
        }
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
        removeQuestion() {
            this.$emit('removeQuestion')
        },
        move(num){
            this.$emit('move',num)
        },
    }
}
</script>

<style lang="scss" scoped>
.handle-container {
    padding: 10px;
    display: inline-block;
    border-radius: 4px;

    position: absolute;
    right: 0px;
    top: 20px;
}
</style>