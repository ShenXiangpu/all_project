<template>
    <div class='app-container'>
        <div v-for="(item, index) in questionForm.paperItemList" :key="item.id">
            <div style="border: 1px dotted #ddd;padding: 10px;" class="marginBottom10">
                <!-- <div v-if="item.quTypeId == 1 || item.quTypeId == 2 || item.quTypeId == 3">
                    <single-choice @move="move" @removeQuestion="removeQuestion" :questionRules="questionRules"
                        @inputScore="inputScore" :index="Number(index)" :item="item"></single-choice>
                </div>
                <div v-if="item.quTypeId == 4 || item.quTypeId == 5">
                    <short-answer @move="move" @removeQuestion="removeQuestion" :questionRules="questionRules"
                        @inputScore="inputScore" :index="Number(index)" :item="item"></short-answer>
                </div> -->

                <short-answer :isShow="isShow" @move="move" @removeQuestion="removeQuestion" :questionRules="questionRules"
                        @inputScore="inputScore" :index="Number(index)" :item="item"></short-answer>
            </div>


        </div>
    </div>
</template>

<script>
import SingleChoice from './components/Single-Choice'
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
        isShow:{
            type: Boolean,
            default: true
        }
    },
    components: {
        ShortAnswer,
        SingleChoice
    },
    created() {

    },
    data() {
        return {

        }
    },
    methods: {
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
    border: 1px solid #ccc;
}
</style>