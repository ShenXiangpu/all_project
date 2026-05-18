<template>
    <div class='app-container '>
        <el-row :gutter="10">
            <template  v-for="(item, index) in paperItemList">
                <el-col  :key='item.id' v-if="arr.includes(item.isCorrect)" class="marginBottom10" :xs="24" :sm="12" :md="12" :lg="6" :xl="4">
                    <score  :show="show" @handleScoll="handleScoll" :scoreIndex="item.isCorrect" :id="item.id" :num="index + 1"
                        :score="item.getScore"></score>
                </el-col>
            </template>

        </el-row>
    </div>
</template>

<script>
import Score from './components/Score.vue'
export default {
    name: '',
    props: {
        paperItemList: {
            default: () => { [] },
            type: Array
        },
        arr: {
            type: Array,
            default: () => [0, 1, 3, 4,'0', '1', '3', '4', null,'']
        },
        show:{
            default: true,
            type: Boolean
        }
    },
    components: {
        Score
    },
    created() {

    },
    data() {
        return {

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

</style>