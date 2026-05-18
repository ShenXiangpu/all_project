<template>
    <div>

        <el-card class="marginBottom10">
            <div class="" style="padding: 10px 0 0px 10px;">
                <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                    <el-form-item label="学生姓名" prop="keyWord">
                        <el-input v-model="queryParams.keyWord" id="keyWord" name="keyWord" placeholder="请输入学生姓名" clearable
                            @keyup.enter="handleQuery" />
                    </el-form-item>

                    <el-form-item label="设计云环境登录状态" prop="vmStatus">
                        <el-select v-model="queryParams.vmStatus" placeholder="请选择登录状态">
                            <el-option label="全部状态" value=""></el-option>
                            <el-option label="在线" value="1"></el-option>
                            <el-option label="离线" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="平台登录状态" prop="systemStatus">
                        <el-select v-model="queryParams.systemStatus" placeholder="请选择登录状态">
                            <el-option label="全部状态" value=""></el-option>
                            <el-option label="在线" value="1"></el-option>
                            <el-option label="离线" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" class="editSuccess" icon="el-icon-search"
                            @click="handleQuery">搜索</el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" class="editPrimary" icon="el-icon-refresh"
                            @click="resetQuery('queryFormRef')">重置</el-button>
                    </el-form-item>


                    <el-form-item>
                        <el-button type="info" class="editInfo" icon="el-icon-download" :loading="exportloading"
                            @click="exportStu">导出</el-button>
                    </el-form-item>


                </el-form>
            </div>
        </el-card>


        <el-card>
            <template #header>
                <div class="flex justify-between align-center">
                    <div>
                        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">添加学生</el-button>
                    </div>
                    <div class="flex">
                        <el-button type="primary" @click="handleJoinList">申请列表 <span class="nums">4</span></el-button>
                    </div>
                </div>


            </template>
            <div>
                <el-table :data="studentList" border style="width: 100%">
                    <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                    <el-table-column prop="userName" label="用户名" min-width="80" align="center">
                    </el-table-column>
                    <el-table-column prop="studentNum" label="用户ID" min-width="100" align="center">
                    </el-table-column>
                    <el-table-column prop="phone" label="手机号" min-width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="vmInfo" label="设计云名称" min-width="100" align="center">
                    </el-table-column>
                    <el-table-column prop="vmInfo" label="设计云ID" min-width="100" align="center">
                    </el-table-column>
                    <el-table-column prop="systemStatus" label="平台状态" min-width="160" align="center">
                        <template #default="scope">
                            <el-tag class="online" v-if="scope && scope.row && scope.row.systemStatus">
                                在线
                            </el-tag>
                            <!-- <el-button size="mini" type="primary"
                                v-if="scope.row.vmName && scope.row.vmStatus"></el-button> -->
                            <!-- <el-button size="mini" type="info" v-else></el-button> -->
                            <el-tag class="outline" type="info" v-else>
                                离线
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="vmStatus" label="设计云状态" min-width="160" align="center">
                        <template #default="scope">
                            <el-tag class="online" v-if="(scope.row.vmName && scope.row.vmStatus)">
                                在线
                            </el-tag>
                            <!-- <el-button size="mini" type="primary"
                                v-if="scope.row.vmName && scope.row.vmStatus"></el-button> -->
                            <!-- <el-button size="mini" type="info" v-else></el-button> -->
                            <el-tag class="outline" type="info" v-else>
                                离线
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" min-width="100" fixed="right">
                        <template #default="scope">
                            <el-popconfirm title="确定删除吗？" @onConfirm="handleDelete(scope.row)" onCancel="">
                                <el-button size="small" type="danger" class="editDanger" slot="reference">
                                    删除
                                </el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="searchQuery" />
        </el-card>

        <el-dialog :title="textMap[dialog.status]" :visible.sync="stuDialog" @close="cancel" class="dialog" width="70vw">
            <el-row :gutter="20">
                <el-col :span="6" :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
                    <el-form class="dialog-form" :model="form" :rules="rules" ref="form" label-width="100px">

                        <el-form-item label="学生" prop="userIds" id="userIds">
                            <div class="dialog-userContainer">
                                <el-tag class="dialog-userContainer-tag" :key="item.id" @close="handleUserList(item)"
                                    v-for="item in itemList2" :closable="!lookStatus">{{ item.userName }}</el-tag>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="flex justify-between">
                                <list-num :num="`已添加 ${itemList2 && itemList2.length} 人`"></list-num>
                                <div>
                                    <el-button size="mini" type="info" class="editInfo" :disabled="lookStatus"
                                        @click="toggleSelection()">批量移除
                                    </el-button>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="14" :xs="24" :sm="24" :md="24" :lg="2" :xl="2">
                    <div style="width: 10px;height: 10px;">

                    </div>
                </el-col>

                <el-col :span="14" :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <el-card style="padding-bottom: 10px" class="marginBottom10">

                        <el-col style="margin-bottom: 10px" :span="8" :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
                            <el-input style="width: 100%" placeholder="请输入姓名" id="keyWords" clearable v-model="keyWord"
                                class="input-with-select">
                                <el-button slot="append" icon="el-icon-search" @click="queryUserListBySome"></el-button>
                            </el-input>


                        </el-col>
                        <el-col style="margin-bottom: 10px; text-align: center" :span="8" :xs="24" :sm="24" :md="24" :lg="8"
                            :xl="8">
                            <el-select v-model="className" placeholder="请选择班级" id="className" @change="queryUserListBySome">
                                <el-option value="">全部班级</el-option>
                                <el-option v-for="item in classesList" :key="item" :label="item" :value="item"></el-option>
                            </el-select>
                        </el-col>
                        <el-col style="margin-bottom: 10px; text-align: center" :span="8" :xs="24" :sm="24" :md="24" :lg="8"
                            :xl="8">
                            <el-select style="width: 98%" v-model="addOrNot" id="addOrNot" @change="queryChooseList"
                                placeholder="请选择列表">
                                <el-option label="未添加" value="1"> </el-option>
                                <el-option label="已添加" value="2"> </el-option>
                            </el-select>
                        </el-col>

                    </el-card>
                    <el-card>
                        <template #header>
                            <div class="flex justify-between align-center">
                                <div class="primaryColor">已选择 {{ multipleSelection.length }} 人
                                </div>

                                <el-button size="mini" type="warning" class="editWarning" :disabled="lookStatus"
                                    @click="addChooseUsers">批量添加
                                </el-button>

                            </div>
                        </template>
                        <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 100%"
                            @selection-change="handleSelectionChange" height="255" max-height="255">
                            <el-table-column type="selection" width="55" align="center"></el-table-column>
                            <el-table-column prop="userName" label="用户名" width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="studentNum" label="用户ID" width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="roleName" label="角色" width="120" align="center" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column v-if="!lookStatus" prop="address" label="操作" fixed="right" align="center"
                                min-width="120" show-overflow-tooltip>
                                <template #default="scope">
                                    <el-button size="small" v-if="addOrNot == '1'" type="success" class="editSuccess"
                                        @click.stop="addOneUser(scope.row)">添加</el-button>

                                    <el-button class="editDanger" size="small" type="danger" v-if="addOrNot == '2'"
                                        @click.stop="handleUserList(scope.row)">移除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                </el-col>
            </el-row>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </span>
        </el-dialog>

        <join-list-dialog ref="joinList"></join-list-dialog>
    </div>
</template>
    
<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';
import Pagination from "@/components/Pagination";
import ListNum from "@/components/Listnum";
import BorderContainer from "@/components/BorderContainer";
import EduCard from "./EduCard.vue";
import JoinListDialog from "./JoinListDialog.vue";

import {
    getClassesForSearch,
    getCourseDetailById,
    getRolesForSearch,
    getTeachersForSearch,
    getStudentScheduleCount
} from "@/api/edu/course";

import {
    getUsersNotInCourse,
} from "@/api/edu/student";



export default {
    //import 引入的组件需要注入到对象中才能使用
    name: "courseMng",
    components: {
        Pagination, ListNum, BorderContainer, EduCard, JoinListDialog
    },
    props: {
        courseId: {
            default: 0,
            type: Number
        },
        total: {
            default: 0,
            type: Number
        },
        studentList: {
            default: [],
            type: Array
        },
        stuDialog: {
            default: false,
            type: Boolean
        },
        exportloading: {
            default: false,
            type: Boolean
        },
        listQuery: {
            default: {},
            type: Object
        },
    },
    data() {
        return {
            stuDetail: {},//学生在线等信息
            customColors: [
                { color: '#ff6958', percentage: 30 },
                { color: '#ffc550', percentage: 60 },
                { color: '#409EFF', percentage: 100 },
            ],
            queryParams: {
                keyWord: '',
                vmStatus: "",
                systemStatus: ""
            },
            dialog: {
                visible: false,
                status: "",
            },
            textMap: {
                update: "修改课程",
                create: "添加学生",
                look: "查看告警推送规则",
            },
            loading: false,
            form: {
                courseName: "",
                year: '',
                userIds: [],
            },
            rules: {
                courseName: [
                    {
                        required: false,
                        message: "请输入课程名称",
                        trigger: "blur",
                    },
                ],
                year: [
                    {
                        required: false,
                        message: "请选择学年",
                        trigger: "blur",
                    },
                ],
                userIds: [
                    {
                        required: true,
                        message: "请选择学生",
                        trigger: "blur",
                    },
                ],
            },

            //课程list
            courseList: [],
            teachersList: [],
            rolesList: [],
            classesList: [],
            keyWord: "",
            className: "",
            roleName: "",



            isHas: false,

            tableData: [],
            multipleSelection: [],

            addOrNot: "1",

            openOrCls: false,

            itemList1: [], // 未添加列表
            itemList2: [], // 添加列表
            tableOrignList: [],

            alarmPushList: [],

            dialogVisible: false, //确认框
            //查看时禁止修改
            lookStatus: false,

            ruleId: "",
            pushId: '',
            companyList: [],
            //
        };
    },
    watch: {},
    computed: {

    },
    created() {
        //this.handleQuery();
        this.queryTeachersForSearchList();
        this.queryStudentScheduleCount()
    },
    methods: {
        //打开申请列表
        handleJoinList() {
            this.$refs['joinList'].dialogVisible.visible = true
        },
        queryStudentScheduleCount() {
            getStudentScheduleCount({ courseId: this.courseId }).then(res => {
                if (res && res.flag) {
                    let resData = res.resData;
                    this.stuDetail = resData;
                }
            })
        },
        exportStu() {
            this.$emit('exportStu', this.queryParams)
        },
        //获取班级列表
        async queryClassesForSearchList() {
            const res = await getClassesForSearch()
            this.classesList = res.resData
        },
        //获取角色列表
        async queryRolesForSearchList() {
            const res = await getRolesForSearch()
            this.rolesList = res.resData
        },
        //获取老师列表
        async queryTeachersForSearchList() {
            const res = await getTeachersForSearch()
            this.teachersList = res.resData
        },
        //列表取消添加的用户，利用最原始的列表,进行双向数组的添加和减少
        handleUserList(tag) {
            // 表单提交列表更新
            this.form.userIds =
                this.form.userIds &&
                this.form.userIds.filter((item) => {
                    return item !== tag.id;
                });
            //展示列表更新
            this.itemList2.splice(this.itemList2.indexOf(tag), 1);
            // 表格列表更新
            if (this.addOrNot == 1) {
                this.tableData = this.getNewTableList(
                    this.tableOrignList,
                    this.itemList2
                );
            } else {
                this.tableData = this.itemList2;
            }
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach((row) => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
            //批量移除，itemList置空,展示itemList2置空，table
            this.form.userIds = []; //表单提交需要的list
            this.itemList2 = []; //表单展示的list
            if (this.addOrNot == 1) {
                this.tableData = this.getNewTableList(this.tableOrignList, []);
            } else {
                //如果是已添加，则置空
                this.tableData = this.itemList2;
            }
        },

        //获取选的用户信息
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //查询用户列表
        async queryUserList(data) {
            const res = await getUsersNotInCourse(data);
            if (res && res.flag) {
                let tableData = res.resData;
                tableData &&
                    tableData.map((item) => {
                        let userName = item.userName;
                        item.userRoles = userName
                    });
                //用户处理原始数据的列表
                this.tableOrignList = tableData;
                //去掉已经选择的itemList2
                let itemList2 = this.itemList2;
                //用于展示的列表
                let addOrNot = this.addOrNot;

                this.tableData = this.getTableList(
                    addOrNot,
                    itemList2,
                    this.tableOrignList
                );
            }
        },


        //根据条件查询
        queryUserListBySome() {
            let data = {
                keyWord: this.keyWord,
                className: this.className,
                roleName: this.roleName,
                courseId: this.courseId
            };
            this.queryUserList(data);
        },

        //查询已添加或者未添加列表
        queryChooseList() {
            if (this.addOrNot == 2) {
                this.tableData = this.itemList2;
            } else {
                this.tableData = this.getNewTableList(
                    this.tableOrignList,
                    this.itemList2
                );
            }
        },

        //点击批量添加按钮，将itemList更新（需要一个专门处理tableData的方法，去掉已经添加的列表）
        addChooseUsers() {
            let multipleSelection = this.multipleSelection;
            let itemList2 = []; //获得
            let userIds = [];
            multipleSelection &&
                multipleSelection.map((item) => {
                    itemList2.push(item);
                    userIds.push(
                        item.id,
                    );
                });
            this.form && this.form.userIds && this.form.userIds.push(...userIds); //表单提交需要的list
            this.itemList2.push(...itemList2); //表单展示的list
            this.tableData = this.getNewTableList(this.tableData, itemList2);
        },
        //添加单个
        addOneUser(tag) {
            this.form && this.form.userIds &&
                this.form.userIds.push(
                    tag.id,
                ); //表单提交需要的list
            this.itemList2.push(tag); //表单展示的list
            this.tableData = this.getNewTableList(this.tableData, [tag]);
        },

        //列表去掉已经添加的list
        getNewTableList(arr, ids) {
            let newArr = arr;
            ids &&
                ids.map((itemId) => {
                    newArr =
                        newArr &&
                        newArr.filter((item) => {
                            return item.id != itemId.id;
                        });
                });
            return newArr;
        },

        //对比已添加列表，获得筛选list
        getNewItemsList(arr, ids) {
            let newArr = [];
            ids &&
                ids.map((itemId) => {
                    arr &&
                        arr.map((item) => {
                            if (item.id == itemId.id) {
                                newArr.push(item);
                            }
                        });
                });
            return newArr;
        },



        /**
         *
         */
        getTableList(addOrNot, itemList2, tableOrignList) {
            //筛选已添加列表，获得未添加原始列表
            let tableData = [];
            if (itemList2 && itemList2.length > 0) {
                tableData = this.getNewTableList(tableOrignList, itemList2);
            } else {
                tableData = tableOrignList;
            }
            // 如果选了已添加查询，从已添加列表中筛选
            if (addOrNot == "2") {
                tableData = this.getNewItemsList(tableOrignList, itemList2);
            }
            return tableData;
        },

        searchQuery(e) {
            this.$emit('searchQuery', e)
        },
        handleQuery() {
            this.queryStudentScheduleCount()
            this.$emit('handleQuery', this.queryParams)
        },

        submitForm() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    let form = {
                        name: this.form.courseName,
                        userIds: this.form.userIds,
                        courseId: this.courseId
                    }
                    this.$emit('submitFormStudent', form)
                }
            });
        },
        cancel() {
            let _this = this;
            let form = {
                courseName: "",
                year: '',
                userIds: [],
                id: '',
            };
            _this.form = form;
            _this.itemList2 = [];
            _this.tableData = [];
            _this.addOrNot = "1"; //变为未添加
            _this.lookStatus = false;
            _this.$refs.form.resetFields();

            _this.$emit('cancel')
        },

        //重置搜索条件
        resetQuery(formName) {
            this.$emit('resetQuery')
            this.$refs[formName].resetFields();
        },
        handleAdd() {
            let _this = this;
            _this.queryUserList({ courseId: this.courseId });
            _this.queryRolesForSearchList();
            _this.queryClassesForSearchList();
            let form = {
                courseName: "",
                userIds: [],
            }
            _this.form = form
            let dialog = {
                status: "create",
                visible: true,
            };
            _this.dialog = dialog;
            _this.$emit('handleAdd')
        },

        async queryCourseDetailById(id) {
            const res = await getCourseDetailById({ id })
            if (res && res.flag) {
                let resData = res.resData;
                let userIds = []
                resData.courseUserIds.map(i => {
                    userIds.push(i.id)
                })
                this.form = {
                    courseName: resData.name,
                    year: resData.academicYear,
                    userIds,
                    id
                }

                let itemList2 = this.handleItemUserList(resData.courseUserIds); // 添加的
                this.itemList2 = itemList2;

                this.queryUserList();
            }
        },

        handleItemUserList(list) {
            list &&
                list.map((item) => {
                    if (item && item.userRoles) {
                        let userRoles = item.userRoles;
                        userRoles = JSON.parse(userRoles);
                        item.userRoles = userRoles[0] && userRoles[0].cnName;
                        item.id = item.userId;
                    }
                });
            return list;
        },

        handleUpdate(row) {
            let _this = this;
            _this.queryCourseDetailById(row);
            _this.queryRolesForSearchList();
            _this.queryClassesForSearchList();
            let dialog = {
                status: "update",
                visible: true,
            };
            _this.dialog = dialog;
        },

        handleDelete(row) {
            this.$emit('handleDelete', row)
        },

    },
    //生命周期 - 挂载完成（可以访问 DOM 元素）
    mounted() {

    },

};
</script>
<style></style>
<style lang='scss' scoped>
.nums {
    display: inline-block;
    width: 16px;
    height: 16px;
    text-align: center;
    line-height: 14px;
    border: 2px solid #F56C6C;
    border-radius: 50%;
    color: #F56C6C;
    font-size: 14px;
}

.el-progress-edu {
    ::v-deep {
        .el-progress__text {
            font-size: 12px !important;
        }
    }
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

.online::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin: 0 1px;
    background: linear-gradient(90deg, rgb(243, 247, 244) 0%, rgb(32, 249, 104) 0%, rgb(33, 241, 33) 100%, rgb(243, 245, 242) 100%);
    box-shadow: 0px 0 10px rgb(32, 249, 86);
}

.outline::before,
.outline::after {
    content: '';
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    // background: linear-gradient(90deg, rgb(177, 180, 178) 0%, rgb(186, 187, 186) 0%,rgb(182, 184, 182) 100%, rgb(205, 206, 204) 100%);
}

.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.menu-container {
    margin: 30px;
}

.el-divider {
    background: none;
}

.content-top {
    .el-form-item {
        margin-bottom: 0px
    }

    margin-bottom: 10px;
}

.search {
    padding: 18px 0 0 10px;
    margin-bottom: 10px;
    border-radius: 2px;
    /* border: 1px solid var(--el-card-border-color); */
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
    height: 400px;
    max-height: 80vh;
    overflow: auto;

    &-tag {
        margin-right: 5px;
    }
}
</style>
    