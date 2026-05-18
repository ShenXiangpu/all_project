<template>
    <div style="overflow: hidden;">
        <div class="barder-container" style="">
            <div :class="fontSize" v-if="isShowTitle" class="title-container flex justify-center align-center">

                <el-popover v-if="isShowPopover" placement="top-start"  trigger="hover" :content="title">
                    <div slot="reference" class="border-title primaryColor view-text">{{ title }}</div>
                </el-popover>


                <div v-else  class="border-title-else primaryColorb view-text">{{ title }}</div>

            </div>
            <el-row v-if="isShowTitle">
                <el-col class="elCol flex justify-center" :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" style="">
                    <decoration></decoration>
                </el-col>
            </el-row>
            <div class="content-slot-container">
                <slot name="content"></slot>
            </div>
            <div class="left-circle circle">
                <div class="circle-center">
                </div>
            </div>

            <div class="right-circle circle">
                <div class="circle-center">
                </div>
            </div>


        </div>
    </div>
</template>

<script>
import resize from '@/components/resize'
import Decoration from './components/Decoration'

require('echarts/theme/macarons') // echarts theme
export default {
    mixins: [resize],
    name: 'BorderContainer',
    components: {
        Decoration
    },
    props: {
        title: {
            default: '',
            type: String
        },
        fontSize: {
            default: 'font20',
            type: String
        },
        height: {
            default: 25,
            type: Number,
        },
        isBgShow: {
            default: true,
            type: Boolean,
        },
        isShowTitle: {
            default: () => {
                return true
            },
            type: Boolean,
        },
        isShowPopover: {
            default: false,
            type: Boolean,
        },
        titleDeStyle: {
            default: () => {
                return {
                    height: '40px',
                    lineHeight: '40px',
                    textAlign: 'center'
                }
            },
            type: Object,
        },
        lBCircle: {
            default: () => {
                return {
                    width: '20px',
                    height: '40px',
                    borderRadius: '0 20px 20px 0'
                }
            },
            type: Object,
        },
        lSCircle: {
            default: () => {
                return {
                    width: '10px',
                    height: '20px',
                    borderRadius: '0 10px 10px 0'
                }
            },
            type: Object,
        },
        rBCircle: {
            default: () => {
                return {
                    width: '20px',
                    height: '40px',
                    borderRadius: '20px 0  0 20px'
                }
            },
            type: Object,
        },
        rSCircle: {
            default: () => {
                return {
                    width: '10px',
                    height: '20px',
                    borderRadius: '10px 0  0 10px'
                }
            },
            type: Object,
        },


    },
    data() {
        return {

        }
    },
    mounted() {

    },
    computed: {


    },
    watch: {

    },

}
</script>

<style lang="scss" scoped>
$circle-width: 20px;
$circle-height: 40px;

$circle-center-width: 10px;
$circle-center-height: 20px;
$bg: #fff;

$common-color: #409EFF;

.barder-container {
    width: 100%;
    border-radius: 14px;
    position: relative;
    padding-top: 10px;
    border: 2px solid $common-color;
    background: $bg;

    ::v-deep {
        .el-form-item {
            margin-bottom: 0 !important;
        }
    }



    .border-title {
        text-align: center;
        padding: 10px 20px;
        min-width:168px;
        max-width: 200px;
    }


    .border-title-else {
        text-align: center;
        padding: 10px 20px 20px 20px ;
        // min-width:168px;
        // max-width: 200px;
    }


    .elCol {
        padding: 0 20px 20px 20px;
        width: 100%;
    }

    .content-slot-container {
        padding: 0 20px 20px 20px;
        // width:80%;
    }



}

.title-container {
    background-color: none;

}



.left-circle {

    position: absolute;
    left: -2px;
    top: 50%;
    transform: translateY(-50%);
    width: $circle-width;
    height: $circle-height;
    background: $bg;
    border-radius: 0 $circle-width $circle-width 0;
    border: 2px solid $common-color;

    border-left: none;

    .circle-center {
        width: $circle-center-width;
        height: $circle-center-height;
        background: $common-color;
        border-radius: 0 $circle-center-width $circle-center-width 0;
        position: absolute;
        top: 8px;
    }
}



.right-circle {

    position: absolute;
    right: -2px;
    top: 50%;
    transform: translateY(-50%);
    width: $circle-width;
    height: $circle-height;
    background: $bg;
    border-radius: $circle-width 0 0 $circle-width;
    border: 2px solid $common-color;
    border-right: none;

    .circle-center {
        width: $circle-center-width;
        height: $circle-center-height;
        background: $common-color;
        border-radius: $circle-center-width 0 0 $circle-center-width ;
        position: absolute;
        top: 8px;
        right: 0px;
    }
}

// @media screen and (max-width:1900px) and (min-width:1600px) {
//     .left-circle {
//         left: -1px;
//     }

//     .right-circle {
//         right: -1px;
//     }


// }
</style>