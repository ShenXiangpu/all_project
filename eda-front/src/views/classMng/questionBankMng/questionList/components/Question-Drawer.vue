<template>
    <el-drawer append-to-body destroy-on-close :modal="true" @close="closeDrawer" title="我是标题" :visible.sync="drawer" :with-header="false">
        <div class="padding20 question-show">
            <question-show :questionInfo="questionInfo"></question-show>

        </div>
    </el-drawer>
</template>

<script>
import QuestionShow from '@/components/QuestionShow/index.vue'

export default {
    components: {
        QuestionShow
    },
    props: {
        questionInfo: {
            type: Object,
            default: () => {
                return {
                }
            }
        },
        drawer: {
            type: Boolean,
            default: false
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
.padding20 {
    padding: 20px;
}

.question-show {
    height: 100vh;
    overflow: auto;
}
</style>