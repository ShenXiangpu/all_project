<template>
    <div>
        <el-form-item class="el-form-item-edu" label="标签" :prop="`${formProp}`">
            <el-button  class="marginRight20" size="small" type="primary" @click="handleChooseTips">选择标签</el-button>
            <div style="display:inline-block" v-for="item in checkTipsList" :key="item.id">
                <span v-for="i in item.children" :key="i.id">
                    <el-tag size="small" class="marginRight10" @close="closeTip(i, item)" closable type="info"
                        v-if="i.isSelect">
                        {{ i.name }}
                    </el-tag>
                </span>
            </div>
        </el-form-item>
        <choose-tips :tipsList="tipsList" :dialogVisible="dialogTipsVisible"
            @submitTips="submitTips" @handleTipsClose="handleTipsClose"></choose-tips>
    </div>
</template>

<script>
import ChooseTips from './ChooseTips.vue'
import { cloneDeep } from "lodash"
export default {
    props: {
        formProp: {
            default: '',
            type: String
        },
        checkTipsList:{
            default: () => [],
            type: Array
        },
        tipsList: {
            default: () => [],
            type: Array
        },
        dialogTipsVisible: {
            default: false,
            type: Boolean
        },
    },
    watch: {

    },
    components: { ChooseTips },
    data() {
        return {
            labelIds: '',
        }
    },
    created() {
    },
    methods: {
        //
        // 选择标签
        handleChooseTips() {
            this.$emit('handleChooseTips')
        },

        closeTip(i, ite) {
            let tipsList = this.checkTipsList;
            tipsList.map(item => {
                if (item.id == ite.id) {
                    let tips = item.children
                    tips.map(it => {
                        if (it.id == i.id) {
                            it.isSelect = !it.isSelect
                        }
                    })
                }
            })
            this.$emit('closeTip', tipsList)
        },

        handleTipsClose() {
            this.$emit('handleTipsClose')
        },
        submitTips(tipsList) {
            this.$emit('submitTips', tipsList)
        },

    }
}
</script>

<style lang="scss" scoped>
.el-form-item-edu.el-form-item {
    margin-bottom: 0;
}
</style>