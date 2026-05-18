<template>
    <div class='app-container'>
        <rep-table :obj="obj"></rep-table>
        <div v-for="(item, index) in questionForm.paperItemList" :key="item.id">
            <div style="border: 1px dotted #ddd;padding: 10px;" class="marginBottom10">
                <short-answer ref="short-answer" @checkSingleAnswer="checkSingleAnswer" @checkNoSingleAnswer="checkNoSingleAnswer"
                    :isShow="isShow" @move="move" @removeQuestion="removeQuestion" :questionRules="questionRules"
                    @inputScore="inputScore" :index="Number(index)" :item="item"></short-answer>
            </div>


        </div>
    </div>
</template>

<script>
import RepTable from '../RepTable.vue'
import ShortAnswer from './components/Short-Answer'

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
        isShow: {
            type: Boolean,
            default: true
        }
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
.app-container {
    padding: 20px;
    // width: 600px;
    // margin: 0 auto;
    overflow: auto;
    border: 1px solid #ddd;
    height: calc(100vh - 130px);
}
</style>