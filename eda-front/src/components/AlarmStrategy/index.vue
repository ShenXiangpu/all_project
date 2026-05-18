<template>
    <div>
        <el-card>
            <template #header>
                <el-button icon="el-icon-plus" type="primary" @click="addStrategy">新建策略</el-button>
            </template>
            <el-table :data="alarmConfigsList" border style="width: 100%" >
                <el-table-column prop="name" label="策略名称" width="180" align="center">
                </el-table-column>
                <el-table-column prop="type" label="策略类型" width="180"  align="center">
                </el-table-column>
                <el-table-column prop="address" label="告警规则" min-width="180"  align="center">
                    <template #default="scope">
                        <div v-if="scope.row.type == 'CPU'">
                            CPU使用率{{ scope.row.operator }}{{ scope.row.percent }}%，持续时间{{ scope.row.interval }}秒
                        </div>
                        <div v-if="scope.row.type == 'MEMORY'">
                            内存使用率{{ scope.row.operator }}{{ scope.row.percent }}%，持续时间{{ scope.row.interval }}秒
                        </div>
                        <div v-if="scope.row.type == 'DISK'">
                            磁盘使用情况{{ scope.row.operator }}{{ scope.row.percent }}KBps，持续时间{{ scope.row.interval }}秒
                        </div>
                        <div v-if="scope.row.type == 'POWEREDOFF'">
                            关闭电源
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="desc" label="告警规则描述"  align="center">
                </el-table-column>
                <el-table-column prop="levels" label="告警等级"  align="center">
                </el-table-column>
                <el-table-column prop="lastModifiedTime" label="最后修改"  align="center">
                </el-table-column>
                <el-table-column prop="enabled" label="告警启停"  align="center">
                    <template #default="scope">
                        <el-switch @change="updataAlarm(scope.row)" v-model="scope.row.enabled" active-text="启用"
                            inactive-text="停用">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作"  align="center"  fixed="right">
                    <template #default="scope">
                        <el-popconfirm title="确定删除吗？" @onConfirm="handleDeleteAlarm(scope.row)">
                            <el-button size="small" type="danger" class="editDanger" slot="reference">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog title="新增告警策略" :visible.sync="dialogAlarmVisible" @close="alarmClose" :close-on-click-modal="false"
            :destroy-on-close="true">
            <el-form ref="alarmForm" :model="alarmForm" :rules="alarmRules" label-width="180px">
                <el-form-item label="策略名称" prop="name">
                    <el-input style="width:300px" v-model="alarmForm.name" type="text"> </el-input>
                </el-form-item>
                <el-form-item label="备注" prop="desc">
                    <el-input style="width:300px" type="textarea" v-model="alarmForm.desc"> </el-input>
                </el-form-item>
                <el-card>
                    <div style="width: 180px;text-align: center;font-weight: 700;margin: 20px 0;">IF</div>
                    <div class="flex flex-start">
                        <el-form-item label="" style="width:300px" prop="type" label-width="100px">
                            <el-select @change="changeType" style="width:200px" v-model="alarmForm.type" placeholder="请选择">
                                <el-option v-for="(item, index) in icSupportAlarmTypes" :key="index" :label="item.label"
                                    :value="item.type"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item v-if="operators && operators.length > 0" label="" style="width:160px" prop="operator"
                            label-width="10px">
                            <el-select style="width:150px" v-model="alarmForm.operator" placeholder="请选择">
                                <el-option v-for="(item, index) in operators" :key="index" :label="item"
                                    :value="item"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item v-if="unit" label="" style="width:160px" prop="percent" label-width="10px">
                            <el-input  @input="value => alarmForm.percent = Number(value.replace(/[^\d]/g,''))" style="width:150px" type="number" v-model="alarmForm.percent" :step="1" :min="0"
                                >
                                <template slot="append">{{ unit }}</template>
                            </el-input>
                        </el-form-item>

                        <el-form-item v-if="operators && operators.length > 0" label="" style="width:300px" prop="interval"
                            label-width="10px">
                            <el-input  @input="value => alarmForm.interval = Number(value.replace(/[^\d]/g,'')) " style="width:150px" type="number" v-model="alarmForm.interval" :step="1" :min="0">
                                <template slot="append">秒</template>
                            </el-input>
                        </el-form-item>
                    </div>
                    <div style="width: 180px;text-align: center;font-weight: 700;margin: 20px 0;">THEN</div>
                    <el-form-item label="触发警报和" prop="levels">
                        <el-select style="width:300px" v-model="alarmForm.levels" placeholder="请选择">
                            <el-option v-for="(item, index) in levels" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-card>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="alarmClose">取 消</el-button>
                <el-button type="primary" @click="commitAlarmStrategy">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
export default {
    props: {
        dialogAlarmVisible: {
            type: Boolean,
            default: false
        },
        alarmForm: {
            default: {},
            type: Object
        },
        alarmRules: {
            default: {},
            type: Object
        },
        icSupportAlarmTypes: {
            default: [],
            type: Array
        },
        operators: {
            default: [],
            type: Array
        },
        levels: {
            default: [],
            type: Array
        },
        unit: {
            default: '',
            type: String
        },
        alarmConfigsList: {
            default: () => {
                return []
            },
            type: Array
        },
    },
    created() {

    },
    mounted() {

    },
    data() {
        return {
            tableData: [],
            typeOrigin: {},
        }
    },
    methods: {
        updataAlarm(item) {
            this.$emit('updataAlarm', item)
        },
        handleDeleteAlarm(item) {
            this.$emit('handleDeleteAlarm', item)
        },
        addStrategy() {
            this.$emit('addAlarmStrategy')
        },

        alarmClose() {
            this.$emit('alarmClose')
        },

        changeType(e) {
            this.$emit('changeType', e)
        },

        commitAlarmStrategy() {

            this.$refs.alarmForm.validate(async (valid) => {
                if (valid) {
                    this.$emit('commitAlarmStrategy', this.alarmForm)
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped></style>