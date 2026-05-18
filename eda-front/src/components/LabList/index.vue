<template>
    <div>
        <el-card class="lab-card" v-loading="detailLoading">

            <div class="show-info" @click.stop="handleDetail">
                <div class="info-type" v-if="item.coverImageTrialTypeName">【{{ item.coverImageTrialTypeName }}】</div>
                <el-popover placement="top" trigger="hover" popper-class="popper-class">
                    <div style="max-width: 400px;min-width:50px;"
                        v-if="item && item.tools && item.tools[0] && item.tools[0].edaTools && item.tools[0].edaTools[0]">
                        {{ item.tools[0].edaTools[0].toolName }}
                    </div>
                    <div slot="reference">
                        <div class="info-tools view-text"
                            v-if="item && item.tools && item.tools[0] && item.tools[0].edaTools && item.tools[0].edaTools[0]">
                            工具：{{
                                item.tools[0].edaTools[0].toolName }}</div>
                    </div>
                </el-popover>
                <el-popover v-if="item.coverImageLabName" placement="top" trigger="hover">
                    <div v-if="item.coverImageLabName" style="max-width: 400px;min-width:100px ;">
                        {{ item.coverImageLabName }}
                    </div>
                    <div v-if="item.coverImageLabName" slot="reference">
                        <div class="lab-container  view-text" style="width: 60%;" v-if="item.coverImageLabName">{{
                            item.coverImageLabName }}</div>
                    </div>
                </el-popover>


                <!-- <el-popover v-if="item.coverImageTaskName" placement="top" trigger="hover">
                    <div v-if="item.coverImageTaskName" style="max-width: 400px;min-width:100px ;">
                        {{ item.coverImageTaskName }}
                    </div>
                    <div slot="reference" class="primaryColory view-text task-container" style="width: 80%;"
                        v-if="item.coverImageTaskName">{{ item.coverImageTaskName }}</div>

                </el-popover> -->


            </div>
            <div v-if="coverImageDisplayAuthor == '1' && isShowName" class="lab-card-mark show-text">
                <div>导师：{{ createName }}</div>
            </div>

            <img :src="imgUrl" class="image" @click.stop="handleDetail">
            <slot name="lab-description"></slot>

        </el-card>

    </div>
</template>
    
<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';
import BorderContainer from "@/components/BorderContainer";

import { checkPermission } from "@/utils/validate";
import { Message } from "element-ui";


export default {
    //import 引入的组件需要注入到对象中才能使用
    name: "courseMng",
    components: {
        BorderContainer
    },
    props: {
        isShowName: {
            default: true,
            type: Boolean
        },
        item: {
            type: Object,
            default: () => {
                return {}
            }

        },
        detailLoading: {
            default: false,
            type: Boolean
        },
        coverImageDisplayAuthor: {
            type: String,
            default: '0'
        },
        createName: {
            type: String,
            default: ""
        },
        labName: {
            type: String,
            default: "lab"
        },
        imgUrl: {
            default: require('@/assets/img/lab/1.png'),
            type: String
        },
        isShowUpdate: {
            default: true,
            type: Boolean
        },

    },
    data() {
        return {

        };
    },
    watch: {},
    computed: {

    },
    created() {
    },
    methods: {
        handleUpdate() {
            this.$emit('handleUpdate')
        },
        handleDetail() {
            this.$emit('handleDetail')
        },
    },
    //生命周期 - 挂载完成（可以访问 DOM 元素）
    mounted() {

    },

};
</script>
<style></style>
<style lang='scss' scoped>
.border-container {
    ::v-deep {
        .left-circle {
            width: 16px;
            height: 32px;
            border-radius: 0 16px 16px 0;

            .circle-center {
                width: 8px;
                height: 16px;
                border-radius: 0 8px 8px 0;
                top: 6px;
            }
        }

        .right-circle {
            width: 16px;
            height: 32px;
            border-radius: 16px 0 0 16px;
            right: -2px;


            .circle-center {
                width: 8px;
                height: 16px;
                border-radius: 8px 0 0 8px;
                top: 6px
            }
        }
    }
}


.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.lab-card {
    //padding: 5px;
    position: relative;
    height: 302px;
    max-width: 345px;

    ::v-deep {
        .el-card__body {
            padding: 5px;
        }
    }

    .show-info {
        position: absolute;
        // height: 187px;
        width: 100%;
        left: 0px;
        top: 0px;
        padding: 30px 20px;
        font-size: 16px;
        color: #fff;

        .info-type {
            text-indent: -8px;
        }

        .info-tools {
            padding: 4px 0;
            width: 100%;
        }



        .lab-container {
            border: 1px solid #8aa8f0;
            background-color: #8aa8f0;
            border-radius: 5px;
            padding: 2px 4px;
            width: auto !important;
            max-width: 100% !important;
        }

        .el-popover__reference {
            height: 30px;
        }

        @media screen and (max-width: 1200px) {
            .el-popover__reference {
                height: 24px;
            }
        }
    }

    .edit {
        position: absolute;
        right: 15px;
        top: 10px;
        border-radius: 2px;
        background: #ddd;

    }

}

.lab-card-mark {
    position: absolute;
    // left: 30px;
    right: 10px;
    bottom: 116px;
    //font-size: 22px;
}

.show-text {

    // width: 50px;
    height: 30px;
    line-height: 30px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;


}

.image {
    width: 100%;
    height: 187px;
    max-width: 333px;
    display: block;
}
</style>
    