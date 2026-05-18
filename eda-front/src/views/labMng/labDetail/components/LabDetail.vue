<template>
    <div>
        <div class="padding20 lab-container">
            <div v-if="labList && labList.length" class="marginBottom20  font14 item">
                <!-- <el-col class="marginBottom20" v-for="item in 3" :xl="6"> -->
                <div v-for="item in labList" :key="item.id" class="item" effect="define" :content="item.remark"
                    :disabled="!item.remark" placement="top-start">
                    <el-tag type="primary" class="el-tab-lab">{{ item.displayName
                    }}</el-tag>
                </div>

            </div>
            <div v-else class="marginBottom20  font14">
                未添加Lab
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        labList: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.lab-container {
    max-height: 300px;
    // max-width: 100px;
    overflow: auto;

    .item {
        // width: 20px;
        
    }

    .el-tab-lab {
        margin: 2px;
    }
}
</style>