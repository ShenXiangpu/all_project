<template>
    <div class='app-container-paper'>
        <rep-table v-if="isWatch && questionForm.paperItemList" :obj="obj" :scoreTotal="scoreTotal" :report="questionForm"></rep-table>
        <div v-for="(item, index) in questionForm.paperItemList" :key="item.id">
            <div style="border: 1px dotted #ddd;padding: 10px;" class="marginBottom10">
                <short-answer ref="short-answer" :isWatch="isWatch" @inputGetScore="inputGetScore" @chooseImage="chooseImage" @checkSingleAnswer="checkSingleAnswer" @checkNoSingleAnswer="checkNoSingleAnswer"
                    :isShow="isShow"  :questionRules="questionRules"
                    @inputScore="inputScore" :index="Number(index)" :item="item"></short-answer>
            </div>
        </div>
    </div>
</template>

<script>
import ShortAnswer from './components/Short-Answer'
import RepTable from '../RepTable'

export default {
    name: '',
    props: {
        questionRules: {
            type: Object,
            default: () => { }
        },
        questionForm: {
            type: Object,
            default: () => { }
        },
        obj: {
            type: Object,
            default: () => { }
        },
        scoreTotal: {
            type: Number,
            default: 0
        },
        isShow: {
            type: Boolean,
            default: true
        },
        isWatch:{
            type: Boolean,
            default: true
        },
    },
    components: {
        ShortAnswer,
        RepTable
    },
    created() {

    },
    data() {
        return {

        }
    },
    methods: {
        inputGetScore(score,index){
            this.$emit('inputGetScore', score,index)
        },
        chooseImage(num,index) {
            this.$emit('chooseImage', num,index)
        },
        checkSingleAnswer(answer) {
            this.$emit('checkSingleAnswer', answer)
        },

        checkNoSingleAnswer(answer) {
            this.$emit('checkNoSingleAnswer', answer)
        },
        inputScore(e, id) {
            this.$emit('inputScore', e, id)
        },

        removeQuestion(index) {
            this.$emit('removeQuestion', index)
        },

        move(num, index) {
            this.$emit('move', num, index)
        },
    }
}
</script>

<style lang="scss" scoped>
.app-container-paper {
    padding: 20px;
    // width: 600px;
    // margin: 0 auto;
    overflow: auto;
    border: 1px solid #ddd;
    height: calc(100vh - 300px);
}
</style>