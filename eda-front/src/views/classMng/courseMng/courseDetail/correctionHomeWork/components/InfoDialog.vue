<template>
    <el-dialog :title="textMap[dialogVisible.status]" :show-close="true" :visible="dialogVisible.visible" width="700px"
        @closed="reset('ruleForm')" @close="handleClose">
        <div v-if="!isFinish && type == 'save'"  class="app-container font16">老师您好，以下题目还未评分，请判分后保存</div>
        <div v-if="!isFinish && (type == 'last' || type == 'next')"  class="app-container font16">老师您好，以下题目还未评分，请判分后保存</div>
        <div v-if="isFinish" class="app-container font16">老师您好，当前试卷未进行保存，请确认是否保存</div>

        <div v-if="!isFinish" class="score-container ">
            <score-container :show="false" :arr="[4,'4',null]" :paperItemList="paperItemList"></score-container>
        </div>

        <span v-if="type == 'save'" slot="footer" class="dialog-footer">
            <!-- <el-button @click="dialogVisible.visible = false">取 消</el-button> -->
            <el-button type="primary" @click="continueMark">确定</el-button>
        </span>
        <!--已完成，下一个或上一个-->
        <span v-if="!isFinish && (type == 'last' || type == 'next')" slot="footer" class="dialog-footer">
            <el-button @click="continueMark">继续评分</el-button>
            <el-button type="primary" @click="continueNotMark">{{ type == 'next'?'下一位':'上一位' }}</el-button>
        </span>
        <!-- 未完成，下一个或上一个 -->
        <span v-if="isFinish && (type == 'last' || type == 'next')" slot="footer" class="dialog-footer">

            <el-button @click="noSave">不保存</el-button>
            <el-button type="primary" @click="saveAndNext">保存并继续</el-button>



        </span>

    </el-dialog>
</template>

<script>
import ScoreContainer from './Score-Container';
export default {
    name: '',
    components: {
        ScoreContainer
    },
    props: {


    },
    created() {

    },
    data() {
        return {
            dialogVisible: {
                visible: false,
                status: 'create'
            },
            textMap: {
                update: "修改任务",
                create: "提示",
            },
            paperItemList: [],
            type: 'save',
            isFinish: false
        }
    },
    destroyed() {

    },
    methods: {
        continueMark(){
            this.$emit('continueMark',this.type)
            this.dialogVisible.visible = false
        },
        continueNotMark(){
            this.$emit('continueNotMark',this.type)
            this.dialogVisible.visible = false
        },
        noSave() {
            this.dialogVisible.visible = false
            this.$emit('noSave',this.type)
        },
        saveAndNext() {
            this.dialogVisible.visible = false
            this.$emit('saveAndNext',this.type)
        },
        handleClose() {

            this.dialogVisible.visible = false;
            this.type = 'save'
        },

        reset(formName) {
            this.handleClose()
        },

    }
}
</script>

<style lang="scss" scoped>
.score-container {
    // width: 50%;
    margin: 0 auto;



}
</style>