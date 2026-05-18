<template>
    <div v-if="dialogVisible">
        <xterms :serveParam="{ hostname: vmEnvDetail.hostname, host: vmEnvDetail.ip, userCounts:vmEnvDetail.userCountsToPwd && vmEnvDetail.userCountsToPwd[0] }"></xterms>
    </div>
</template>

<script>
import Xterms from './Xterms.vue'
export default {
    name: '',
    components: {
        Xterms
    },
    props: {
        vmEnvDetail: {
            default: () => { },
            type: Object
        }
    },
    created() {

    },
    data() {
        return {
            dialogVisible: false
        }
    },
    methods: {
        handleClose() {
            this.dialogVisible = false
        },
        handleOpen() {
            this.dialogVisible = true
        }
    }
}
</script>

<style lang="scss" scoped></style>