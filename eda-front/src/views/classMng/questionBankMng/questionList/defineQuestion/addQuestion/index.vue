<template>
    <div class="app-container">
        <question-template  :id="quId" :answerType="type" :answerBank="bank"></question-template>
    </div>
</template>

<script>
import QuestionTemplate from '../components/QuestionTemplate'
import {

    getItemById
} from '@/api/edu/question'
export default {
    components: {
        QuestionTemplate
    },
    created() {
        this.type = Number(this.$route.query.type)
        this.bank = Number(this.$route.query.bank)
        this.quId = Number(this.$route.query.quId)
    },
    data() {
        return {
            type: 0,
            bank: 0,
            quId: 0,
            questionInfo:{},
        }
    },
    methods: {
        // 返回上一页
        back() {
            this.$router.go(-1)
        },

        
    }
}
</script>

<style lang="scss" scoped></style>