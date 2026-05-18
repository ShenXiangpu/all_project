<template>
    <div>
        <div class="" >
            <div></div>
            <div class="marginBottom10 flex justify-flex font14" v-for="(item, index) in radioList" :key="index">
                <div v-if="!item.isRight" class="circle marginRight10">
                    <div></div>
                </div>
                <div v-else class="right-circle marginRight10">
                    <div class="border">
                        <div class="bg"></div>
                    </div>
                </div>
                <div>{{item.choose}}、</div>
                <div class="padding4 line-height15" v-html="item.content"></div>
            </div>
        </div>
        <div class="trust marginBottom20 font16">
            正确答案：{{ trust }}
        </div>
    </div>
</template>

<script>
export default {
    props:{
        radioList:{
            type:Array,
            default:[]
        },
        trust:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            radio: 1,

        }
    },
    methods: {
        
        queryTrust() {
            let radioList = this.radioList
            let trust = radioList.filter(i => i.isRight == 1).join(',')
            this.trust = trust
        },
    }
}
</script>

<style lang="scss" scoped>
$green: rgb(26, 217, 102);

.circle {
    padding: 4px;

    div {
        width: 13px;
        height: 13px;
        border-radius: 50%;
        border: 1px solid #333;
        background-color: #fff;
    }
}

.right-circle {
    padding: 4px;

    .border {
        width: 13px;
        height: 13px;
        border-radius: 50%;
        border: 1px solid $green;
        background-color: #fff;
        padding: 1px;
        .bg {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background-color: $green;
        }
    }
}

.padding4 {
    padding: 4px;
}

.line-height15 {
    line-height: 15px;
}

.trust {
    background-color: $green;
    padding: 10px;
    border-radius: 4px;
    color: #fff;
}
</style>