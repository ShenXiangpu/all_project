<template>
    <el-drawer append-to-body destroy-on-close @close="closeDrawer" title="我是标题" :visible="drawer" :with-header="false">
        <div class="padding20 ">
            <el-card class="marginBottom20 el-card-question">
                <template #header>

                    <div style="position: relative;">
                        <span>{{ questionForm.title }}</span>
                        <span class="font14 primaryColoro fontW7" style="position: absolute;right: 10px;">试题分数：{{ questionForm.score }}分</span>
                    </div>
                    
                </template>
                <div>
                    {{ questionForm.descriptions }}
                </div>
            </el-card>
            <stu-info></stu-info>
            <div class="paper-container">
                <el-form :model="questionForm">
                    <paper-container class="marginBottom20" :isShow="false" :questionForm="questionForm"></paper-container>
                </el-form>
            </div>

        </div>
    </el-drawer>
</template>
<script>

import StuInfo from '../testPaper/components/StuInfo';
import PaperContainer from '../testPaper/components/Paper-Container';
export default {
    components: {
        StuInfo,
        PaperContainer

    },
    props: {
        drawer: {
            type: Boolean,
            default: false
        },
        questionForm: {
            type: Object,
            default: () => { }
        }
    },
    methods: {
        closeDrawer() {
            this.$emit('closeDrawer')
        }
    }
}
</script>

<style lang="scss" scoped>
$blue: #409eff;

.paper-container {
    width: 100%;
    height: calc(100vh - 280px);
    overflow: auto;
}

.padding20 {
    padding: 20px;
    padding-bottom: 40px;
}

::v-deep {
    .el-card-question {
        .el-card__header {
            padding: 10px;
            font-size: 16px;
            background: $blue;
            color: #fff;
            text-align: center;
        }


        img {
            max-width: 100%;
        }

    }

}
</style>