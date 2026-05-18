<template>
    <div class="app-container">
        <el-card>
            <template #header>
                <div class="font16">
                    <el-tag :type="msgInfo.msgType == 0 ? 'warning' : 'danger'">{{ msgInfo.msgTitle }}</el-tag>
                </div>
            </template>
            <div class="flex justify-between">
                <div>{{ msgInfo.msgInfo }}</div>
                <div>{{ msgInfo.createTime }}</div>
            </div>

        </el-card>
    </div>
</template>

<script>
import {
    queryOneMsgInfo,
    updateBatch
} from "@/api/crm/news";
import { isEqual } from 'lodash'
export default {
    name: 'newsDetail',
    created() {
        const id = this.$route.query.id
        this.id = id;
        this.queryDetailById(id)
    },
    data() {
        return {
            msgInfo: {},
            id: ''
        }
    },
    watch: {
        'id': function (newId, oldId) {
            console.log(newId, oldId);
            if (newId, oldId) {

            }
        },
        
    },
    methods: {
        queryDetailById(id) {
            queryOneMsgInfo({ id }).then(res => {
                if (res && res.flag) {
                    let resData = res && res.resData
                    this.msgInfo = resData[0]
                    updateBatch([{ id, msgStatus: '1' }]).then(() => {
                        this.$store.dispatch('ws/connectWSAndGetInfo', {})
                    
                    })
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped></style>