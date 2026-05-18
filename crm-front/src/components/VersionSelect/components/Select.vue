<template>
    <el-select :id="versionsVal.toolName"  style="width: 100%;"  :value="versionsVal && versionsVal.toolVersion"  placeholder="请选择"
        @change="handleChangeToolVersion($event)">
        <el-option v-for="item in versionsList" :key="item.id" :label="item && item.toolVersion" :value="item && item.toolVersion">
        </el-option>
    </el-select>
</template>
  
<script>

export default {
    name: 'Select',
    props: {
        versionsList: {
            require: true,
            type: Array,
            default: []
        },
        versionsVal: {
            require: true,
            type: Object,
            default: {}
        },
    },

    watch: {

    },
    data() {
        return {
            toolVersion: '',
        }
    },

    destroyed() {
       
    },
    computed: {

    },
    methods: {

        selectedIcon(name) {
            this.$emit('selected', name)
            document.body.click()
        },

        handleChangeToolVersion(versionVal) {
            this.$emit('handleChangeToolVersion', versionVal)
        }

    }
}
</script>
  
<style rel="stylesheet/scss" lang="scss" scoped></style>
  