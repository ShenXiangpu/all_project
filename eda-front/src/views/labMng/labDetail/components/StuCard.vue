<template>
    <div class='card-container flex flex-column justify-between align-center text-center'>
        <div class="">
            <el-avatar style="background-color: #fff;" shape="circle" class="el-avatar-edu" :size="70" :fit="fit" :src="url"></el-avatar>
        </div>
        <div class="" style="position: relative">
            <div class="status-choose" v-if="item.status == 1">
                <div class="choose-left pointer" @click="accept(item)">
                    <i class="el-icon-success font18"></i>
                    <div>接受</div>
                </div>
                <div class="choose-right pointer" @click="refuse(item)">
                    <i class="el-icon-error font18"></i>
                    <div>拒绝</div>
                </div>
            </div>

            <div v-if="item.status == 3" class="status3">离线</div>
            <div v-if="item.status == 2" class="status2">在线</div>
            <div v-if="item.status == 1" class="status1">请求协助中</div>
        </div>
        <div style="color: #333;" class="fontW7">
            {{ item.userName }}
        </div>
        <div>
            {{ item.studentNum }}
        </div>
        <div>
            {{ item.className }}
        </div>
    </div>
</template>

<script>
import {
    acceptHelp,
    rejectHelp
} from "@/api/edu/assistance";
export default {
    name: '',
    props: {
        item: {
            default: () => { },
            type: Object
        }
    },
    components: {

    },
    created() {

    },
    data() {
        return {
            fit: '',
            url: require('@/assets/img/head/head3.png')
        }
    },
    methods: {
        accept(item) {
            console.log(item);
            let studentId = item.userId;
            acceptHelp({studentId}).then(res => {
                if(res && res.flag) {
                    this.$emit('accept',studentId)
                }    
            })
        },
        refuse(item) {
            let studentId = item.userId;
            rejectHelp({studentId}).then(res => {
                if(res && res.flag) {
                    this.$$message.success("已拒绝")
                }    
            })
        },
    }
}
</script>

<style lang="scss" scoped>
$accent-color: #F56C6C;
$accent-bg-color: rgba(255, 223, 216, 0.8);

$online-color: rgb(103, 194, 58);
$online-bg-color: rgba(212, 253, 209, 0.8);

$lev-color: rgb(255, 141, 26);
$lev-bg-color: rgba(255, 232, 209, 0.8);

.card-container {
    width: 180px;
    height: 210px;
    border: 3px solid #409EFF;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;

    ::v-deep .el-avatar-edu {
        width: 70px !important;
        height: 70px !important;
        line-height: 70px !important;
    }
    .status-choose {
        position: absolute;
        display: flex;
        justify-content: space-around;
        align-items: center;
        top: -76px;
        left: 50%;
        transform: translateX(-50%);

        .choose-left,
        .choose-right {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
        }

        .choose-left {
            padding: 4px;
            width: 70px;
            height: 70px;
            color: $online-color;
            background: $online-bg-color;
            border-radius: 4px 0 0 4px;
        }

        .choose-left:hover {
            background: rgba($color: rgb(201, 253, 198), $alpha: 1);
            box-shadow: 0 0 2px $online-color;
        }

        .choose-right {
            padding: 4px;
            width: 70px;
            height: 70px;
            color: $accent-color;
            background: $accent-bg-color;
            border-radius: 0 4px 4px 0;
        }

        .choose-right:hover {
            background: rgba($color: rgb(255, 215, 206), $alpha: 1);
            box-shadow: 0 0 2px $accent-color;
        }
    }

    .status1 {
        max-width: 80px;
        display: inline-block;
        color: $accent-color;
        background: $accent-bg-color;
        padding: 0 4px;
        border-radius: 4px;
    }

    .status2 {
        max-width: 80px;
        display: inline-block;
        color: $online-color;
        background: $online-bg-color;
        padding: 0 4px;
        border-radius: 4px;
    }
    .status3 {
        max-width: 80px;
        display: inline-block;
        color: $lev-color;
        background: $lev-bg-color;
        padding: 0 4px;
        border-radius: 4px;
    }
}
</style>