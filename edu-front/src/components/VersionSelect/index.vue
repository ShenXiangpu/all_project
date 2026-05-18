<template>
    <div class="flex" style="overflow: auto;">
        <div v-for="(item, index) in toolsList" :key="item.company" @click="checkThisTools(item)">
            <div class="function-container" :class="item.isSelect ? 'check' : ''">
                <el-popover placement="top-start" :title="item.toolName" min-width="150" trigger="hover"
                    :content="item.description">
                    <div  slot="reference" class="font14 fontW7 primaryColor view-text">{{ item.toolName }}</div>
                </el-popover>
                <div v-if="item.defaultVersions">
                    <Select @handleChangeToolVersion="handleChangeToolVersion($event, index)" :versionsList="item.versions"
                        :versionsVal="item.defaultVersions"></Select>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import Select from "./components/Select.vue";

export default {
    name: 'VersionSelect',
    components: {
        Select
    },
    props: {
        toolsList: {
            required: true,
            type: Array,
            default: []
        },
    },
    created() {

    },
    watch: {

    },
    data() {
        return {
            toolsLists: []
        }
    },
    methods: {
        checkThisTools(item) {
            let toolsList = this.toolsList
            toolsList.map(items => {
                if (item.toolName == items.toolName) {
                    item.isSelect = !items.isSelect
                }
            })
            this.toolsList = toolsList
            this.$emit('checkThisTools', toolsList)
        },
        handleChangeToolVersion(e, index) {
            this.$emit('handleChangeToolVersion', e, index)
        }

    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$primaryColor: #10abb9;
.function-container {
    width: 220px;
    height: 120px;
    padding: 0 20px;
    margin: 0 10px 10px 10px;
    border: 1px solid #ddd;
    text-align: center;
    position: relative;

    &:first-child {
        margin-left: 0px;
    }

    &:hover {
        cursor: pointer;
    }
}

.check::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    width: 40px;
    height: 40px;
    background-image: url('../../assets/img/shopcart.png');
    // background-position: 86.69% 56.64%;
    // background-size: 1837.5% 1700%;
    background-size: 114% 114%;
    background-repeat: no-repeat;
}

.check {
    border: 1px solid $primaryColor;
}
</style>
