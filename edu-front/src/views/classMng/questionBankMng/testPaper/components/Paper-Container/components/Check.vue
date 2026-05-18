<template>
    <div class="left-container" @click="checkAnswer()">
        <div v-if="!isRight" class="circle">
            <div></div>
        </div>
        <div v-else class="right-circle">
            <div class="border">
                <div class="bg"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        isRight: {
            type: Boolean,
            default: false
        },
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
        checkAnswer() {
            this.$emit('checkAnswer')
        },
    }
}
</script>

<style lang="scss" scoped>
$green: #009688;
$out-long: 16px;
$in-long: 12px;

.circle {
    padding: 4px;

    div {
        width: $out-long;
        height: $out-long;
        border-radius: 50%;
        border: 1px solid #ddd;
        background-color: #fff;
    }
}



.right-circle {
    padding: 4px;

    .border {
        width: $out-long;
        height: $out-long;
        border-radius: 50%;
        border: 1px solid $green;
        background-color: #fff;
        padding: 1px;

        .bg {
            width: $in-long;
            height: $in-long;
            border-radius: 50%;
            background-color: $green;
        }
    }
}
</style>