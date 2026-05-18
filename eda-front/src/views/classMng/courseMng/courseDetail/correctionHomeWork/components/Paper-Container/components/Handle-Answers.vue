<template>
    <div class="handle-container primaryBorder">
        <span class="marginRight20" @click="chooseImage('1')">
            <el-image class="marginRight10 pointer"
                style="width: 20px; height: 20px;vertical-align: middle;" :src="questionImg[0]">
            </el-image>
        </span>
        <span class="marginRight20">
            <el-image class="marginRight10 pointer"  @click="chooseImage('0')"
                style="width: 20px; height: 20px;vertical-align: middle;" :src="questionImg[1]">
            </el-image>
        </span>
        <span>
            <el-image  class="marginRight10 pointer"  @click="chooseImage('3')"
                style="width: 20px; height: 20px;vertical-align: middle;" :src="questionImg[2]">
            </el-image>
        </span>
    </div>
</template>

<script>
const questionImg = [
    require('@/assets/img/question/right.png'),
    require('@/assets/img/question/wrong.png'),
    require('@/assets/img/question/half-pair.png'),
]
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
            questionImg: questionImg
        }
    },
    methods: {
        chooseImage(number){
            this.$emit('chooseImage', number)
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