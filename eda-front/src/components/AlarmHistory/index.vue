<template>
    <div>
        <el-card class="card-container">
            <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="日期" prop="msgTitle">
                    <el-date-picker v-model="queryParams.value1" type="datetimerange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-button type="success" class="editSuccess" icon="el-icon-search" @click="handleQuery">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="editPrimary" icon="el-icon-refresh" @click="resetQuery('queryFormRef')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="marginTop10">
            <el-table ref="filterTable" border :data="alarmHistoryList" v-loading="loading" style="width: 100%">
                <el-table-column prop="alarmName" label="策略名称" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="type" label="策略类型" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="level" label="告警等级" width="100" align="center"></el-table-column>
                <el-table-column prop="eventMessage" label="警报事件信息" min-width="380" align="center"></el-table-column>
                <el-table-column prop="triggerTime" label="告警时间" min-width="100" align="center"></el-table-column>

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
    },
    props: {
        alarmHistoryList: {
            default: () => {
                return []
            },
            type: Array
        },
        total: {
            default: 0,
            type: Number
        },
        loading: {
            default: false,
            type: Boolean
        },
    },
    data() {
        return {
            queryParams: {
                value1: []
            },
            listQuery: {
                page: 1,
                limit: 10,
                params: "",
            },
        }
    },
    created() {

    },
    methods: {

        searchQuery(e) {
            this.listQuery.page = e.page;
            this.listQuery.limit = e.limit;
            const params = this.handle(this.queryParams)
            if (params && params.startTime && params.endTime) {
                this.listQuery.params = params;
            } else {
                this.listQuery.params = {};
            }
            this.$emit('searchQuery', this.listQuery)
        },

        handle(queryParams) {
            let date = queryParams && queryParams.value1 && queryParams.value1.length > 0 && queryParams.value1 || null
            if (date) {
                let startTime = date[0]
                let endTime = date[1]
                startTime = this.$moment(startTime).format("YYYY-MM-DD HH:mm:ss")
                endTime = this.$moment(endTime).format("YYYY-MM-DD HH:mm:ss")
                return { startTime, endTime }
            } else {
                return { startTime:'', endTime:'' }
            }
        },
        handleQuery() {
            const params = this.handle(this.queryParams)
            if (params && params.startTime && params.endTime) {
                this.listQuery.params = params;
            } else {
                this.listQuery.params = {};
            }

            this.$emit('handleQuery', params)

        },
        //重置搜索条件
        resetQuery(formName) {
            this.queryParams = {}
            this.listQuery.params = this.queryParams
            this.listQuery.page = 1;
            this.$emit('resetQuery', this.listQuery)
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
      