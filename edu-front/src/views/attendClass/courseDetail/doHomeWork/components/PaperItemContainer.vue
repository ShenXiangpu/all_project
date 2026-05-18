<template>
    <div class="paper-ans">
        <div class="ans-index">{{ paperIndex }}</div>
        <div class="ans-isFill"><i v-if="isFill" class="el-icon-s-flag"></i> <i v-else class="el-icon-s-flag"
                style="color: #999;"></i></div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        paperIndex: {
            type: Number,
            default: 0
        },
        isFill: {
            type: Boolean,
            default: false
        }
    },
    components: {

    },
    created() {

    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.paper-ans {

    .ans-index {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: aliceblue;
        margin-bottom: 3px;
        border-radius: 4px;
    }

    .ans-isFill {
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: aliceblue;
        border-radius: 4px;

        i {
            color: #f00;
            font-size: 20px;
        }
    }
}
</style>