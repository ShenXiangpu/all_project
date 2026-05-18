<template>
    <el-table :data="vmlist" border style="width: 100%">
        <el-table-column label="序号" type="index" width="55" align="center">
        </el-table-column>
        <el-table-column prop="vmId" label="实操云ID" width="180" align="center">
        </el-table-column>
        <el-table-column prop="vmName" label="实操云名称" width="180" align="center">
            <template #default="scope">
                <div @click="goToEnvDetail(id)" v-if="scope.row.status == '0' || scope.row.status == '5'">
                    <span class="pointer primaryColorb">{{ scope.row.vmName }}</span>
                </div>
                <div v-else-if="scope.row.status == '2'">
                    <i style=" color: rgb(24,144,255)" class="el-icon-loading"></i>
                    创建中
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="hostname" label="主机名称" width="180" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="powerState" label="电源状态" align="center">
            <template #default="scope">
                <div v-if="scope.row.powerState">
                    <i :style="{ color: POWERSTATE[scope.row.powerState].color }"
                        :class="POWERSTATE[scope.row.powerState].icon"></i>
                    {{ POWERSTATE[scope.row.powerState].text }}
                </div>
                <div v-else>
                    -
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="cpuAndMemory" label="配置" align="center">
        </el-table-column>
        <el-table-column prop="user" label="创建人" align="center">
        </el-table-column>
        <el-table-column prop="userCountsIds" label="使用人数" align="center">
            <template #default="scope">
                <div>{{ scope.row.userCountsIds && scope.row.userCountsIds.split(",").length }}</div>
            </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center">
        </el-table-column>
    </el-table>
</template>

<script>
const POWERSTATE = {
    'poweredOn': {
        text: '开机',
        icon: 'el-icon-success',
        color: '#319400'
    },
    'poweredOff': {
        text: '关机',
        icon: 'el-icon-remove',
        color: '#f5222d'
    },
    'suspended': {
        text: '挂起',
        icon: 'el-icon-info',
        color: '#faad14'
    },
}
import { number } from 'echarts'
import { getVmByCourseId } from '@/api/edu/cloud'
export default {
    name: '',
    props: {
        courseId: {
            type: String | Number,
            default: '' | 0
        },
    },
    components: {

    },
    created() {
        this.queryVmInfo()
    },
    data() {
        return {
            POWERSTATE: POWERSTATE,
            vmlist: []
        }
    },
    methods: {
        goToEnvDetail() {
            let id = this.courseId
            this.$router.push({ path: '/attendClass/cloudEnvDetail', query: { id } });
        },
        queryVmInfo() {
            getVmByCourseId({ id: this.courseId }).then(res => {
                if (res && res.flag) {
                    let vmObj = res.resData
                    let vmId = vmObj.vmId
                    let vmName = vmObj.vmName
                    let hostname = vmObj.hostname
                    let powerState = vmObj.powerState
                    let cpu = vmObj.cpu
                    let memory = vmObj.memory / 1024
                    let cpuAndMemory = cpu + '核' + memory + 'G'
                    let user = vmObj.user
                    let createTime = vmObj.createTime
                    let status = vmObj.status
                    let userCountsIds = vmObj.userCountsIds
                    let vmlist = [
                        {
                            vmId,
                            vmName,
                            hostname,
                            powerState,
                            cpuAndMemory,
                            user,
                            createTime,
                            status,
                            userCountsIds
                        }
                    ]

                    this.vmlist = vmlist

                }
            })
        }
    }
}
</script>

<style lang="scss" scoped></style>