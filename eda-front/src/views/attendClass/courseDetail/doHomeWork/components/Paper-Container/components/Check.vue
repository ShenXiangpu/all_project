<template>
    <div class="left-container flex align-center" @click="checkAnswer()">
        <div v-if="!isRight" class="circle marginRight10">
            <div></div>
        </div>
        <div v-else class="right-circle marginRight10">
            <div class="border">
                <div class="bg"></div>
            </div>
        </div>
        <div>
            <slot></slot>
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
    position: relative;

    .border {
        width: $out-long;
        height: $out-long;
        border-radius: 50%;
        border: 1px solid $green;
        background-color: #fff;
        // padding: 1px;
        position: relative;

        // background-color: $green;
        .bg {
            width: $in-long;
            height: $in-long;
            border-radius: 50%;
            background-color: $green;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
</style>