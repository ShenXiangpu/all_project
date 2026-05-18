<template>
    <div>

        <div class="padding20 left-container">
            <div v-for="(item, index) in tools" :key="item.company">
                <div class="font16 fontW7" style="color:#333;">{{ item.company }}</div>
                <div class="font14" v-for="i in item.edaTools" :key="i.id">
                    <div class="flex">
                        <el-tooltip class="tps" effect="define" :content="i.toolName" placement="top">
                            <div class="view-text toolName" style="">
                                {{ i.toolName }}
                            </div>
                        </el-tooltip>
                        <div class="view-text toolVersion" style="">
                            <el-tag size="mini" effect="dark"> {{ i && i.versions && i.versions[0] &&
                                i.versions[0].toolVersion ||
                                '暂无'
                            }}</el-tag>
                        </div>
                    </div>
                </div>
                <el-divider v-if="tools.length !== (index + 1)"></el-divider>
            </div>

        </div>


    </div>
</template>

<script>
export default {
    props: {
        tools: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style lang="scss" scoped>
$primaryColor: #10abb9;

.toolVersion {

    // min-width: 150px;
    // overflow: auto;
}

.toolName {
    text-indent: 10px;
    width: 120px;
    border-right: 1px solid #10abb9;
}

.el-tag {
    background-color: $primaryColor !important;
    color: #fff;
    padding: 0 3px;
    margin-left: 10px;
}

.left-container {
    max-height: 300px;
    // max-width: 100px;
    overflow: auto;
}
</style>