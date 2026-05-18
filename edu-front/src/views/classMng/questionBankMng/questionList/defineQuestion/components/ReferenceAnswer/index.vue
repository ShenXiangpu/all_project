<template>
    <div>
        <!-- 单选 -->
        <div v-if="type == '1'">
            <answer-item v-for="(item, index) in answer" :index="index" :answerItem="item" :key="item.id"
                @deleteAnswer="deleteAnswer" @inputAnswer="inputAnswer" @checkAnswer="checkSingleAnswer"
                :nums="nums"></answer-item>
            <div class="add-more-answer"> <el-button type="primary" @click="addAnswer"
                    v-if="nums != answer.length">添加更多选项</el-button></div>
        </div>
        <!-- 多选 -->
        <div v-if="type == '2'">
            <answer-item v-for="(item, index) in answer" :index="index" :answerItem="item" :key="item.id"
                @deleteAnswer="deleteAnswer" @inputAnswer="inputAnswer" @checkAnswer="checkNoSingleAnswer"
                :nums="nums"></answer-item>
            <div class="add-more-answer"><el-button @click="addAnswer" type="primary"
                    v-if="nums != answer.length">添加更多选项</el-button></div>
        </div>


        <div v-if="type == '3'">
            <answer-item v-for="(item, index) in answerP" :read-only="true" :index="index" :answerItem="item" :key="item.id"
                 @checkAnswer="checkSingleAnswerP"
                ></answer-item>
        </div>
    </div>
</template>

<script>
import AnswerItem from './components/Answer-Item.vue';
export default {
    components: {
        AnswerItem
    },
    props: {
        type: {
            type: Number,
            default: 3
        }
    },
    data() {
        return {
            // 答案
            answer: [
                { id: 1, name: 'A', ansName: '', isCheck: false, show: true },
                { id: 2, name: 'B', ansName: '', isCheck: false, show: true },
                { id: 3, name: 'C', ansName: '', isCheck: false, show: true },
                { id: 4, name: 'D', ansName: '', isCheck: false, show: true },
                { id: 5, name: 'E', ansName: '', isCheck: false, show: false },
                { id: 6, name: 'F', ansName: '', isCheck: false, show: false }
            ],
            answerP: [
                { id: 1, name: '', ansName: '正确', isCheck: false, show: true },
                { id: 2, name: '', ansName: '错误', isCheck: false, show: true },
            ],
            nums: 0
        }
    },
    methods: {
        getAnswers(){
            if(this.type == 3) {
                return this.answerP
            }else if(this.type == 1 || this.type == 2){
                return this.answer
            }
            
        },
        // 单选
        checkSingleAnswer(item) {
            // 判断是否选中
            let answer = this.answer;
            answer.map(i => {
                if (i.id == item.id) {
                    i.isCheck = !i.isCheck;
                } else {
                    i.isCheck = false;
                }
            })
        },
        checkNoSingleAnswer(item) {
            // 判断是否选中
            let answer = this.answer;
            answer.map(i => {
                if (i.id == item.id) {
                    i.isCheck = !i.isCheck;
                }
            })
        },
        //判断
        checkSingleAnswerP(item) {
            // 判断是否选中
            let answer = this.answerP;
            answer.map(i => {
                if (i.id == item.id) {
                    i.isCheck = !i.isCheck;
                } else {
                    i.isCheck = false;
                }
            })
        },



        inputAnswer(e, item) {
            let answer = this.answer;
            answer.map(i => {
                if (i.id == item.id) {
                    i.ansName = e;
                }
            })
        },
        queryAnswerNums() {
            let answer = this.answer;
            let nums = 0;
            answer.map(item => {
                if (item.show) {
                    nums++;
                }
            })
            this.nums = nums;
            return nums;
        },
        //添加选项
        addAnswer() {
            let nums = this.queryAnswerNums()
            this.answer[nums].show = true
            this.queryAnswerNums()
        },
        deleteAnswer(index) {
            let nums = this.queryAnswerNums()
            this.answer[index].ansName = ''
            this.answer[index].isCheck = false
            if (nums <= 2) {
                this.$message.warning('至少保留2个选项')
                return
            }
            this.answer[nums - 1].show = false
            this.queryAnswerNums()
        }

    }
}
</script>

<style lang="scss" scoped>
.add-more-answer {
    width: 900px;
    button {
        display: block;
        margin: 20px auto;
        width: 450px;
    }
}
</style>