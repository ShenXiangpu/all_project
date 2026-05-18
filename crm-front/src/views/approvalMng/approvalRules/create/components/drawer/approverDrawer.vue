<template>
    <el-drawer :append-to-body="true" title="审批人设置" :visible.sync="approverDrawer" direction="rtl" class="set_promoter"  :before-close="saveApprover">
        <div class="demo-drawer__content">
            <div class="drawer_content">
                <div class="approver_content">
                    <el-radio-group v-model="approverConfig.settype"  @change="changeType">
                        <el-radio :label="1">指定成员</el-radio>
                        <el-radio :label="2">主管</el-radio>
                    </el-radio-group>
                    <el-button type="primary" class="editPrimary" size="small" @click="addApprover" v-if="approverConfig.settype==1">添加/修改成员</el-button>
                    <p class="selected_list" v-if="approverConfig.settype==1">
                        <span v-for="(item,index) in approverConfig.nodeUserList" :key="index">{{item.name}}
                            <img src="@/assets/images/add-close1.png" @click="$func.removeEle(approverConfig.nodeUserList,item,'targetId')">
                        </span>
                        <a v-if="approverConfig.nodeUserList.length!=0" @click="approverConfig.nodeUserList=[]">清除</a>
                    </p>
                </div>
            </div>
            <div class="demo-drawer__footer clear">
                <el-button type="primary" @click="saveApprover" class="editPrimary" size="small">确 定</el-button>
                <el-button @click="closeDrawer"  size="small">取 消</el-button>
            </div>
            <employees-dialog
                :visible.sync="approverVisible"
                :data.sync="checkedList"
                @change="sureApprover"
                :isCheckedBox="false"
            />
            <role-dialog
                :visible.sync="approverRoleVisible"
                :data.sync="checkedRoleList"
                @change="sureRoleApprover"
            />
        </div>
    </el-drawer>
</template>
<script>
import employeesDialog from '../dialog/employeesDialog.vue'
import roleDialog from '../dialog/roleDialog.vue'
import { mapState, mapMutations } from 'vuex'
export default {
    components: { employeesDialog, roleDialog },
    props: ['directorMaxLevel'],
    data() {
        return {
            approverConfig: {},
            approverVisible: false,
            approverRoleVisible: false,
            approverEmplyessList: [],
            checkedRoleList: [],
            checkedList: []
        }
    },
    computed: {
        ...mapState('approval',['approverConfig1', 'approverDrawer']),
    },
    watch: {
        approverConfig1(val) {
            this.approverConfig = val.value;
        }
    },
    methods: {
        ...mapMutations('approval',['setApproverConfig', 'setApprover']),
        changeRange() {
            this.approverConfig.nodeUserList = [];
        },
        changeType(val) {
            this.approverConfig.nodeUserList = [];
            this.approverConfig.examineMode = 1;
            this.approverConfig.noHanderAction = 2;
            if (val == 2) {
                this.approverConfig.directorLevel = 1;
            } else if (val == 4) {
                this.approverConfig.selectMode = 1;
                this.approverConfig.selectRange = 1;
            } else if (val == 7) {
                this.approverConfig.examineEndDirectorLevel = 1
            }
        },
        addApprover() {
            this.approverVisible = true;
            this.checkedList = this.approverConfig.nodeUserList
        },
        addRoleApprover() {
            this.approverRoleVisible = true;
            this.checkedRoleList = this.approverConfig.nodeUserList
        },
        sureApprover(data) {
            console.log('data',data);

            this.approverConfig.nodeUserList = data;
            this.approverVisible = false;
        },
        sureRoleApprover(data) {
            this.approverConfig.nodeUserList = data;
            this.approverRoleVisible = false;
        },
        saveApprover() {
            this.approverConfig.error = !this.$func.setApproverStr(this.approverConfig)
            this.setApproverConfig({
                value: this.approverConfig,
                flag: true,
                id: this.approverConfig1.id
            })
            this.$emit("update:nodeConfig", this.approverConfig);
            this.closeDrawer()
        },
        closeDrawer() {
            this.setApprover(false)
        }
    }
}
</script>
<style lang="scss" scoped>
.set_promoter {

    .approver_content {
        padding-bottom: 10px;
        border-bottom: 1px solid #f2f2f2;
    }

    .approver_self_select .el-button,
    .approver_content .el-button {
        margin-bottom: 20px;
        display: block;
    }

    .approver_content .el-radio,
    .approver_some .el-radio,
    .approver_self_select .el-radio {
        margin-bottom: 20px;

    }

    .approver_manager p {
        line-height: 32px;
    }

    .approver_manager select {
        width: 420px;
        height: 32px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(217, 217, 217, 1);
    }

    .approver_manager p.tip {
        margin: 10px 0 22px 0;
        font-size: 12px;
        line-height: 16px;
        color: #f8642d;
    }

    .approver_self {
        padding: 28px 20px;
    }

    .approver_self_select,
    .approver_manager,
    .approver_content,
    .approver_some {
        padding: 20px 20px 0;
    }

    .approver_manager p:first-of-type,
    .approver_some p {
        line-height: 19px;
        font-size: 14px;
        margin-bottom: 14px;
    }

    .approver_self_select h3 {
        margin: 5px 0 20px;
        font-size: 14px;
        font-weight: bold;
        line-height: 19px;
    }
}

.set_promoter {
  ::v-deep .el-drawer__header {
    margin-bottom: 0;
    padding: 14px 0 14px 20px;
    color: #323232;
    font-size: 16px;
  }
  .demo-drawer__content {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    height: 100%;
  }
  .demo-drawer__content > div {
    border-top: 1px solid #f2f2f2;
  }
  .demo-drawer__footer {
    padding: 10px 30px;
  }
  .demo-drawer__footer .el-button {
    float: right;
    margin-right: 10px;
  }
  .drawer_content {
    flex: 1;
  }
  .promoter_content {
    padding: 0 20px;

    .el-button {
      margin-bottom: 20px;
    }

    p {
      padding: 18px 0;
      font-size: 14px;
      line-height: 20px;
      color: #000000;
    }
  }
}
</style>
