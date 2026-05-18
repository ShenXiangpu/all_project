<template>
    <div :class="`bg${index}`" class="data-count marginRight10 flex flex-column align-center justify-center" style="">
        <div class="marginBottom10">{{ title }}</div>

        <div class="data-count-num">{{ count }}</div>
    </div>
</template>

<script>
export default {
    name: '',
    components: {

    },
    props: {
        title: {
            type: String,
            default: ''
        },
        index: {
            type: Number | String,
            default: 0 | '0'
        },
        count: {
            type: Number | String,
            default: 0 | '0'
        }
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
.data-count {
    width: 160px;
    height: 80px;
    color: #000;
    font-weight: 700;
    border-radius: 10px;

    .data-count-num {
        font-size: 20px;
    }
}

.bg1 {
    color: rgb(29, 45, 133);
    background-image: linear-gradient(45deg, rgb(235, 237, 255), rgb(247, 247, 255), rgb(235, 237, 255));
}

.bg2 {
    color: rgb(24, 73, 98);
    background-image: linear-gradient(45deg, rgb(232, 247, 254), rgb(235, 248, 254), rgb(221, 241, 253));
}

.bg3 {
    color: rgb(16, 71, 62);
    background-image: linear-gradient(45deg, rgb(234, 252, 253), rgb(241, 254, 252), rgb(224, 251, 253));
}

.bg4 {
    color: rgb(11, 65, 9);
    background-image: linear-gradient(45deg, rgb(230, 250, 234), rgb(235, 251, 233), rgb(219, 247, 233));
}
</style>