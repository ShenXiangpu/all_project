<template>
    <div>
        <el-card>
            <template #header>
                <el-button @click="updateSnapshot" type="primary" class="marginRight20">快照策略变更</el-button>
                <el-popconfirm title="确定全部删除吗？" @onConfirm="handleDeleteAll()">
                    <el-button type="danger" slot="reference"
                        :disabled="!(dataSnapshotList && dataSnapshotList.length > 0)">删除全部快照</el-button>
                </el-popconfirm>
            </template>
            <el-table :data="dataSnapshotList" border style="width: 100%">
                <el-table-column prop="id" label="快照ID" width="100">
                </el-table-column>
                <el-table-column prop="name" label="快照名称" min-width="280">
                </el-table-column>
                <el-table-column prop="createTime" label="快照创建时间" min-width="280">
                </el-table-column>
                <el-table-column prop="expiryTime" label="快照到期时间" min-width="280">
                </el-table-column>
                <el-table-column label="操作" min-width="180">
                    <template #default="scope">
                        <el-button size="small" class="marginRight20 editPrimary" type="primary"
                            @click="handleReback(scope.row)">回滚</el-button>
                        <el-popconfirm title="确定删除吗？" @onConfirm="handleDelete(scope.row)">
                            <el-button size="small" type="danger" class="editDanger" slot="reference">删除</el-button>
                        </el-popconfirm>

                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog title="快照策略变更" :visible.sync="dialogFormVisible" @close="close" :close-on-click-modal="false"
            :destroy-on-close="true">
            <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
                <el-form-item label="备份日期" prop="dayOfWeek">
                    <el-checkbox-group id="dayOfWeek" v-model="ruleForm.dayOfWeek">
                        <el-checkbox v-for="item in weekOptions" :key="item.value" :label="item.value" name="type">{{
                            item.label }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="备份时间点" prop="hours">
                    <el-checkbox-group id="hours" v-model="ruleForm.hours">
                        <el-checkbox v-for="item in hourOptions" :key="item.value" :label="item.value" name="type">{{
                            item.label }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="快照保留时间" prop="region">
                    保留<el-input-number id="region" v-model="ruleForm.retentionDays" style="width:120px;margin:0 10px"
                        controls-position="right" @change="handleRetentionDaysChange" :min="1"
                        :max="7"></el-input-number>天后自动删除
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="回滚数据" :visible.sync="dialogRebackVisible" @close="rebackClose" :close-on-click-modal="false"
            :destroy-on-close="true">
            <div class="font16" style="margin:0 0 10px 0px">快照：{{ vmEnvDetail.snapshotName }}</div>
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="基本信息" name="1">
                    <div class="info-container">
                        <el-row :gutter="20">
                            <el-col :xl="12" class="marginBottom10">
                                设计云IP：{{ vmEnvDetail.ip }}
                            </el-col>
                            <el-col :xl="12" class="marginBottom10">
                                主机名：{{ vmEnvDetail.hostname }}
                            </el-col>

                            <!-- <el-col :xl="12" class="marginBottom10">
                                            
                                        </el-col> -->
                            <el-col :xl="12" class="marginBottom10">
                                CPU：{{ vmEnvDetail.cpu }}核
                            </el-col>
                            <el-col :xl="12" class="marginBottom10">
                                内存：{{ vmEnvDetail.memory / 1024 }}G
                            </el-col>
                            <el-col :xl="12" class="marginBottom10">
                                系统盘：{{ (vmEnvDetail.disk / 1024).toFixed(2) }}G
                            </el-col>
                            <el-col :xl="12" class="marginBottom10">
                                操作系统：{{ vmEnvDetail.os }}
                            </el-col>
                            <el-col :xl="24"
                                style="padding:10px 0 0 0;border:1px solid #ddd;border-left:0;border-right:0;border-bottom:0"
                                class="flex align-center">
                                <el-col :xl="2" style="">
                                    多用户：
                                </el-col>
                                <el-col :xl="22">
                                    <el-col v-for="(item, index) in vmEnvDetail.userCountsToPwd" :key="index" :xl="20">
                                        <el-col :xl="20" class="text-left">
                                            用户名：{{ item.accountName }}
                                        </el-col>
                                        <el-col :xl="20" class="view-text">
                                            <el-popover placement="top-start" title="密码" width="300" trigger="hover"
                                                :content="item.accountPwd">
                                                <span slot="reference"> 密码：{{ item.accountPwd }}</span>
                                            </el-popover>

                                        </el-col>
                                    </el-col>
                                </el-col>
                            </el-col>
                        </el-row>

                    </div>
                </el-collapse-item>
                <el-collapse-item title="EDA工具配置" name="2">

                    <div style="overflow:auto;max-height:540px;padding:0 10px 0 0">
                        <div v-for="item in vmEnvDetail && vmEnvDetail.tools" :key="item.company">
                            <el-card>
                                <template #header>
                                    <div class="font14" style="color:#333;">{{ item.company }}</div>
                                </template>
                                <div v-for="i in item.edaTools" :key="i.id">
                                    {{ i.toolName }}[{{ i && i.versions && i.versions[0] && i.versions[0].toolVersion ||
                                        ''
                                    }}]
                                </div>
                            </el-card>
                            <el-divider v-if="vmEnvDetail && vmEnvDetail.tools && vmEnvDetail.tools > 1"></el-divider>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>

            <div style="margin:20px 0 0 0">
                <el-tag type="warning" style="width:100%;display:block;font-size:16px"><i class="el-icon-info"></i>
                    数据将回滚到 {{ vmEnvDetail.date }} 此时刻之后的数据将被清除，请谨慎操作！</el-tag>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button @click="rebackClose">取 消</el-button>
                <el-button type="primary" @click="commitReback" :loading="rebackLoading">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
const weekOptions = [
    { label: '每周日', value: 1 },
    { label: '每周一', value: 2 },
    { label: '每周二', value: 3 },
    { label: '每周三', value: 4 },
    { label: '每周四', value: 5 },
    { label: '每周五', value: 6 },
    { label: '每周六', value: 7 },
];

const hourOptions = [
    { label: '00:00', value: 0 },
    // { label: '01:00', value: 1 },
    // { label: '02:00', value: 2 },
    // { label: '03:00', value: 3 },
    { label: '04:00', value: 4 },
    // { label: '05:00', value: 5 },
    // { label: '06:00', value: 6 },
    // { label: '07:00', value: 7 },
    { label: '08:00', value: 8 },
    // { label: '09:00', value: 9 },
    // { label: '10:00', value: 10 },
    // { label: '11:00', value: 11 },
    { label: '12:00', value: 12 },
    // { label: '13:00', value: 13 },
    // { label: '14:00', value: 14 },
    // { label: '15:00', value: 15 },
    { label: '16:00', value: 16 },
    // { label: '17:00', value: 17 },
    // { label: '18:00', value: 18 },
    // { label: '19:00', value: 19 },
    { label: '20:00', value: 20 },
    // { label: '21:00', value: 21 },
    // { label: '22:00', value: 22 },
    // { label: '23:00', value: 23 },
];
export default {
    props: {
        dataSnapshotList: {
            default: [],
            type: Array
        },
        ruleForm: {
            default: {},
            type: Object
        },
        dialogFormVisible: {
            default: false,
            type: Boolean
        },
        dialogRebackVisible: {
            default: false,
            type: Boolean
        },
        vmEnvDetail: {
            default: {},
            type: Object
        },
        rebackLoading: {
            default: false,
            type: Boolean
        },
    },
    data() {
        return {
            weekOptions: weekOptions,
            hourOptions: hourOptions,
            activeNames: ['1'],
            snapshotName: "",
        }
    },
    methods: {
        handleChange(val) {
            console.log(val);
        },

        commitReback() {
            let name = this.snapshotName
            this.$emit('commitReback', name)
        },
        rebackClose() {
            this.$emit('rebackClose')
        },


        handleDeleteAll() {
            this.$emit('handleDeleteAll')
        },

        handleReback(row) {
            let name = row.name
            this.snapshotName = name
            this.$emit('handleReback', name)
        },

        handleDelete(row) {
            this.$emit('handleDelete', row)
        },

        updateSnapshot() {

            this.$emit('querySnapshotList')
        },

        handleRetentionDaysChange(val) {
            this.$emit('handleRetentionDaysChange', val)
        },
        close() {
            this.$emit('closeDilog')
        },
        submit() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.$emit('submit', this.ruleForm)
                }
            });
        }
    }

}
</script>

<style lang="scss" scoped>
::v-deep {
    .el-collapse {
        border: 0;
    }

    .el-collapse-item__header {
        padding: 0 20px;
        border: 0px solid #ddd;
        background: rgb(230, 247, 255);
        color: rgb(64, 158, 255);
    }

    .is-active {
        // border: 1px solid #ddd; 
    }
}

.info-container {
    padding: 10px;
    border: 1px solid #ddd;


}

::v-deep {
    .el-collapse-item__content {
        padding: 0;
    }
}
</style>