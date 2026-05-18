<template>
    <div class="img-container flex flex-wrap">
        <div class="img-item-container" v-for="(item, index) in imgUrlList" :key="item" @click="handleImgClick(index)">
            <el-image class="img-item pointer" :src="item" fit="fill"></el-image>
            <div class="choose" :class="active == index ? 'choosed' : ''"></div>
        </div>

    </div>
</template>

<script>
import imgUrlList from '@/utils/imageurl';
export default {
    data() {
        return {
            active: undefined, //
            imgUrlList: imgUrlList,
        }
    },
    props: {
        coverImageStage: {
            type: String | Number,
            default: '' || 0
        }
    },

    watch: {
        coverImageStage(newVal, oldVal) {
            if (newVal == 'cover') {
                this.active = 0;
            } else {
                this.active = newVal;
            }
        },
    },
    computed: {
        // 计算属性
    },
    methods: {
        // 图片点击事件
        handleImgClick(index) {
            console.log(index);
            this.active = index;
            this.$emit('imgClick', index);
        },
    },
    mounted() {
        // console.log(this.imgUrlList);
    },
}
</script>

<style lang="scss" scoped>
.img-container {
    border: 1px solid #ccc;
    width: 374px;
    // height: 500px;
    overflow: auto;
    padding: 20px;
    padding-right: 5px;
    padding-bottom: 5px;
    align-content: flex-start;

    // position: relative;
    .img-item-container {
        width: 100px;
        height: 56px;
        position: relative;
        margin: 0 15px 15px 0;

    }

    .img-item {
        width: 100px;
        height: 56px;
    }

    .img-item::after {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(255, 255, 255, 0.2);
    }

    .choose {
        position: absolute;
        bottom: 10px;
        right: 10px;
        width: 12px;
        height: 12px;
        padding: 5px;
        background: #fff;
        border-radius: 50%;
        cursor: pointer;
        z-index: 1000;
    }

    .choosed {
        background: green;
    }

}
</style>