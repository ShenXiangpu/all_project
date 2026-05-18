<template>
    <div class="circle-container" :style="bgStyle">
        <div class="content-container" >
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CircleContainer',
    props: {
        // 是否显示
        bgStyle: {
            type: String,
            default: ''
        },
        // 是否显示

    }

}


</script>

<style lang="scss" scoped>
.circle-container {
    width: 140px;
    height: 90px;
    border-radius: 10px;
    font-family: '黑体';
    font-weight: 400;
    color: #000;
}


@media screen and (max-width:1300px) {
    .circle-container {
        width: 140px;
        height: 100px;
        // padding-top: 10px;
    }
}
</style>