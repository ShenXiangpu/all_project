<template>
    <el-select :id="versionsVal.toolName"  style="width: 100%;" :value="versionsVal && versionsVal.toolVersion" placeholder="请选择"
        @change="handleChangeToolVersion($event)">
        <el-option v-for="item in versionsList" :key="item.id" :label="item.toolVersion" :value="item.toolVersion">
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
        // 'versionsList': {
        //     handler(newVal, oldVal) {
        //         this.toolVersion = newVal[0].toolVersion || oldVal[0].toolVersion 
        //     }
        // }
    },
    data() {
        return {
            toolVersion: '',
        }
    },

    destroyed() {
        // this.versionsList = []
        // this.toolVersion = ''
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
  