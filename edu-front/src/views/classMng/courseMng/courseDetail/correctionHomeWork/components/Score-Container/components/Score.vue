<template>
    <div class='app-container flex flex-column justify-center align-center' @click="handleScoll(id)">
        <div class="font16" :class="show ? 'marginBottom10' : ''">第{{ num }}题</div>
        <el-image v-if="show" class="pointer" style="width: 20px; height: 20px;"
            :src="questionImg[score ? scoreIndex : score == 0 && score !== '' ? 0 : 2] || questionImg[2]">
        </el-image>
        <!-- <div>
            {{ score }}
        </div> -->
    </div>
</template>

<script>
const questionImg = [
    require('@/assets/img/question/wrong.png'),
    require('@/assets/img/question/right.png'),
    require('@/assets/img/question/question.png'),
    require('@/assets/img/question/half-pair.png'),
]
export default {
    name: '',
    props: {
        id: {
            default: 0,
            type: String | Number
        },
        scoreIndex: {
            default: 2 | '2',
            type: String | Number
        },
        num: {
            default: 0,
            type: String | Number
        },
        score: {
            default: null,
            type: String | Number
        },
        show: {
            default: true,
            type: Boolean
        }
    },
    watch: {
        scoreIndex: {
            handler(newVal, oldVal) {
                console.log('new', newVal)
            },
            deep: true
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
        handleScoll(id) {
            this.$emit('handleScoll', id)
        },
    }
}
</script>

<style lang="scss" scoped>
.app-container {
    box-shadow: 0 0 5px #ccc;
}
</style>