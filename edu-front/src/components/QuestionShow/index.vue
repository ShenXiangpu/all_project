<template>
    <div>
        <!-- <div class="title marginBottom20">{{ questionInfo.title }}</div> -->
        <el-card class="el-card-question marginBottom20">
            <template #header>
                题目内容
            </template>
            <div>
                <div class="content" v-html="questionInfo.content"></div>
                <!-- <div class="content">{{ questionInfo.content }}</div> -->

                <div v-if="questionInfo.contentPic">
                    <el-image style="width: 200px; height: auto" :src="questionInfo.contentPic"
                        :preview-src-list="[questionInfo.contentPic]">
                    </el-image>
                </div>
            </div>
        </el-card>
        <div>
            <question-radio :trust="questionInfo.trust" :radioList="questionInfo.answers" :type="questionInfo.quTypeId" v-if="questionInfo.quTypeId == '1' || questionInfo.quTypeId == '2' || questionInfo.quTypeId == '3'" />

            <question-short-answer :answers="questionInfo.answers" :type="questionInfo.quTypeId" v-else />
        </div>
        <el-card class="el-card-question marginBottom20">
            <template #header>
                答案解析
            </template>
            <div v-html="questionInfo.analysis"></div>
        </el-card>
    </div>
</template>

<script>
import QuestionRadio from './components/Question-Radio'
import QuestionShortAnswer from './components/Question-Short-Answer.vue';

export default {
    components: { QuestionRadio, QuestionShortAnswer },
    name: 'Question-show',
    props: {
        questionInfo: {
            // \*题目信息*\
            type: Object,
            default: () => { }
        },
        title: {
            type: String,
            default: '标题'
        }
    },
}
</script>

<style lang="scss" scoped>
$blue: rgb(85, 155, 233);
$green: rgb(26, 217, 102);
$gray: rgb(244, 244, 244);

.title {
    color: #fff;
    padding: 10px;
    text-align: center;
    background: $blue;
    border-radius: 4px 4px 0 0;
}

::v-deep {
    .el-card-question {
        .el-card__header {
            padding: 10px;
            font-size: 16px;
            background: $gray;
        }


        img {
            max-width: 100%;
        }

    }

}
</style>