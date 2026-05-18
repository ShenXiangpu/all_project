<template>
    <div class="flex" style="overflow: auto;">
        <div v-for="(item, index) in toolsList" :key="item.company" @click="checkThisTools(item)">
            <div class="function-container" :class="item.isSelect ? 'check' : ''">
                <div class="font16">{{ item.toolName }}</div>
                <div style="margin-top: 20px;">
                    <Select @handleChangeToolVersion="handleChangeToolVersion($event, index)" :versionsList="item.versions"
                        :versionsVal="item.defaultVersions"></Select>
                </div>
            </div>

        </div>
    </div>
</template>
  
<script>
import Select from "./Select.vue";

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
.function-container {
    width: 300px;
    height: 150px;
    padding: 0 30px;
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
    width: 16px;
    height: 16px;
    background-image: url('../../../assets/img/shopcart.png');
    background-position: 86.69% 56.64%;
    background-size: 1837.5% 1700%;
    background-repeat: no-repeat;
}

.check {
    border: 1px solid rgb(64, 158, 255);
}
</style>
  