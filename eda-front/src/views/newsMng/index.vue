<template>
    <div class="app-container">
        <border-container class="marginBottom10 border-container" :height="15" :isShowTitle="false" :isBgShow="false">
            <template #content>
                <div style="padding: 20px 0 10px 10px;">
                    <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                        <el-form-item label="消息标题" prop="msgTitle">
                            <el-input v-model="queryParams.msgTitle" placeholder="请输入消息标题" clearable
                                @keyup.enter="handleQuery" />
                        </el-form-item>

                        <el-form-item>
                            <el-button type="success" class="editSuccess" icon="el-icon-search"
                                @click="handleQuery">搜索</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="editPrimary" icon="el-icon-refresh"
                                @click="resetQuery('queryFormRef')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </template>
        </border-container>
        <el-card class="marginTop10">
            <template #header>
                <div style="display:flex; justify-content: space-between;">
                    <div>
                        <el-button :disabled="multipleSelection && multipleSelection.length == 0" type="primary"
                            icon="el-icon-plus" @click="readSome">标记为已读</el-button>
                        <el-button type="primary" icon="el-icon-plus" @click="readAll">全部标记为已读</el-button>
                    </div>
                    <div>
                        <el-popconfirm style="margin:0 10px" title="确定删除吗？" @onConfirm="handleDelete" onCancel="">
                            <el-button :disabled="multipleSelection && multipleSelection.length == 0" type="danger"
                                slot="reference">
                                删除
                            </el-button>
                        </el-popconfirm>
                    </div>
                </div>



                <!-- <el-popconfirm title="确定全部删除吗？" @onConfirm="handleDeleteAll" onCancel="">
                    <el-button type="danger" slot="reference">
                        全部删除
                    </el-button>
                </el-popconfirm> -->
            </template>
            <el-table @row-click.capture="goToDetail" ref="filterTable" :data="newsList" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column align="center" type="selection" width="55">
                </el-table-column>
                <el-table-column label="是否已读" prop="msgStatus" align="center" width="100" column-key="statusList"
                    :filters="[{ text: '未读', value: '0' }, { text: '已读', value: '1' }]" :filter-method="filterHandler">
                    <template #default="scope">
                        <div v-if="scope.row.msgStatus == 0" style="color: #999;">未读</div>
                        <div v-if="scope.row.msgStatus == 1">已读</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="msgType" label="消息类型" width="100" column-key="msgType"
                    :filters="[{ text: '通知', value: '0' }, { text: '告警', value: '1' }]" :filter-method="filterTypeHandler">
                    <template #default="scope">
                        <div v-if="scope.row.msgType == 0" style="color: sandybrown;">通知</div>
                        <div v-if="scope.row.msgType == 1" style="color: red;">告警</div>
                    </template>
                </el-table-column>
                <el-table-column prop="msgTitle" label="消息标题" min-width="100">
                </el-table-column>
                <el-table-column prop="msgInfo" label="消息内容" min-width="200">
                </el-table-column>
                <el-table-column prop="createTime" label="接收时间" min-width="100" align="center"></el-table-column>

                <!-- <el-table-column  label="操作" min-width="100" align="center">
                    <template #default="scope">
                        <el-popconfirm title="确定删除吗？" @onConfirm.stop.native="handleDelete(scope.row)" onCancel="">
                            <el-button size="small" type="danger" slot="reference">
                                删除
                            </el-button>
                        </el-popconfirm>
                    </template>

                </el-table-column> -->
            </el-table>
            <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="searchQuery" />
        </el-card>
    </div>
</template>
  
<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';
import Pagination from "@/components/Pagination";
import BorderContainer from "@/components/BorderContainer";

import {
    queryNewsList,
    allReadOrDel,
    updateBatch,
    updateMsg,//单个已读或删除
} from "@/api/edu/news";

import { mapGetters } from 'vuex'
import { checkPermission } from "@/utils/validate";
import { Message } from "element-ui";

export default {
    //import 引入的组件需要注入到对象中才能使用
    name: "courseMng",
    components: {
        Pagination,
        BorderContainer
    },
    props: {},
    data() {
        return {
            multipleSelection: [],
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                tag: '家'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄',
                tag: '公司'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄',
                tag: '家'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄',
                tag: '公司'
            }],
            total: 0,
            listQuery: {
                page: 1,
                limit: 10,
                statusList: '1,0',
                params: "",
            },
            queryParams: {
                msgTitle: ''
            },
            dialog: {
                visible: false,
                status: "",
            },
            textValue: 'license',
            textMap: {
                update: ``,
                create: `文件上传`,
                // look: "查看告警推送规则",
            },
            loading: false,
            newsList: [],

        }
    },
    watch: {},
    computed: {
        ...mapGetters([
            'userId'
        ])
    },
    created() {
        this.handleQuery()
    },
    methods: {

        handleMsgStatus(status, msg) {
            let multipleSelection = this.multipleSelection
            let itemList = []
            multipleSelection.map(item => {
                const { id } = item
                itemList.push({ id, msgStatus: status })
            })
            updateBatch(itemList).then(res => {
                if (res && res.flag) {
                    this.$message.success(msg)
                    this.handleQuery()
                    this.$store.dispatch('ws/connectWSAndGetInfo', {})
                }
            })
        },
        goToDetail(row) {
            this.$router.push({ path: '/newsMng/newsDetail', query: { id: row.id } });

        },
        readSome() {
            this.handleMsgStatus('1', '消息已读设置成功')
        },
        readAll() {
            allReadOrDel({ status: 1 }).then(res => {
                if (res && res.flag) {
                    this.$message.success('消息全部已读')
                    this.handleQuery()
                    this.$store.dispatch('ws/connectWSAndGetInfo', {})
                }
            })
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        resetDateFilter() {
            this.$refs.filterTable.clearFilter('date');
        },
        clearFilter() {
            this.$refs.filterTable.clearFilter();
        },
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        //是否已读
        filterHandler(value, row, column) {

            // console.log(value, row, column);
            // this.listQuery.statusList;
            // this.handleQuery()
            const property = column['property'];
            return row[property] === value;
        },
        //告警或者通知
        filterTypeHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },

        initParams() {
            let listQuery = {
                page: 1,
                limit: 10,
                statusList: '1,0',
                params: "",
            };
            this.listQuery = listQuery;
        },
        searchQuery(e) {
            this.listQuery.page = e.page;
            this.listQuery.limit = e.limit;
            this.queryParams.toUserId = this.$store.state.user.userId
            this.listQuery.params = this.queryParams;
            this.getList()

        },
        getList() {
            this.loading = true;
            this.listQuery.params.toUserId = this.$store.state.user.userId
            queryNewsList(this.listQuery).then((reponse) => {
                let resData = reponse.resData;
                this.newsList = resData && resData.result;
                this.total = resData.total;
                this.loading = false;
            });
        },

        cancel() {
            let _this = this;
            _this.dialog.visible = false
            // _this.dialog = dialog;
            _this.$refs.alarmRuleForm.resetFields();
        },
        handleQuery() {
            this.queryParams.toUserId = this.$store.state.user.userId
            this.listQuery.params = this.queryParams;
            this.getList()
        },
        //重置搜索条件
        resetQuery(formName) {
            this.queryParams.msgTitle = ''
            this.queryParams.toUserId = this.$store.state.user.userId
            this.listQuery.params = this.queryParams
            this.listQuery.page = 1;
            this.getList();
        },
        handleAdd(value) {
            let _this = this;
            this.textValue = value;
            let dialog = {
                status: "create",
                visible: true,
            };
            _this.dialog = dialog;
        },



        async handleDelete(row) {
            this.handleMsgStatus('2', '消息删除成功')
        },

        async handleDeleteAll() {
            const res = await allReadOrDel({ status: 2 });
            if (res && res.flag) {
                Message.success('全部删除成功')
                this.initParams()
                this.handleQuery();
            }
        },

    },
    //生命周期 - 挂载完成（可以访问 DOM 元素）
    mounted() {
    },

};
</script>
<style lang='scss' scoped>
.marginTop10 {
    margin-top: 10px;
}

.marginRt20 {
    margin-right: 20px;
}

.border-container {
    ::v-deep {
        .left-circle {
            width: 16px;
            height: 32px;
            border-radius: 0 16px 16px 0;

            .circle-center {
                width: 8px;
                height: 16px;
                border-radius: 0 8px 8px 0;
                top: 6px;
            }
        }

        .right-circle {
            width: 16px;
            height: 32px;
            border-radius: 16px 0 0 16px;
            right: -2px;


            .circle-center {
                width: 8px;
                height: 16px;
                border-radius: 8px 0 0 8px;
                top: 6px
            }
        }
    }
}

.search {
    padding: 18px 0 0 10px;
    margin-bottom: 10px;
    border-radius: 2px;
    /* border: 1px solid var(--el-card-border-color); */
}

.card-container {
    .el-form-item {
        margin-bottom: 0px
    }

}

.dialog {
    ::v-deep {
        .el-dialog {
            max-height: 80vh;
            overflow: auto;
        }

        // .el-dialog__footer {
        //   position: absolute;
        //   bottom: 0px;
        //   right: 0px
        // }
    }

    &-form {
        width: 50%;
    }
}

.dialog-form {
    width: 100%;
}

.dialog-userContainer {
    border: 1px solid #ccc;
    padding: 10px;
    height: 200px;
    max-height: 30vh;
    overflow: auto;

    &-tag {
        margin-right: 5px;
    }
}



.card-container {
    .el-form-item {
        margin-bottom: 0px
    }

}
</style>
      