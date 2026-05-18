<template>
  <div class="app-container">
    <border-container
      class="marginBottom10 border-container"
      :height="15"
      :isShowTitle="false"
      :isBgShow="false"
    >
      <template #content>
        <div class="" style="padding: 10px 0 0px 10px;">
          <el-form ref="queryFormRef" :model="queryParams" :inline="true">
            <el-form-item label="实验名称" prop="trialName">
              <el-input
                v-model="queryParams.trialName"
                id="keyword"
                name="keyword"
                placeholder="请输入实验名称"
                clearable
                @keyup.enter="handleQuery"
              />
            </el-form-item>

            <el-form-item label="创建人" prop="createBy">
              <el-select
                v-model="queryParams.createBy"
                placeholder="请选择创建人"
              >
                <el-option
                  v-for="item in createByList"
                  :key="item.id"
                  :label="item.userName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="success"
                class="editSuccess"
                icon="el-icon-search"
                @click="handleQuery"
                >搜索</el-button
              >
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                class="editPrimary"
                icon="el-icon-refresh"
                @click="resetQuery('queryFormRef')"
                >重置</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </template>
    </border-container>
    <el-card class="my-lab-card-body" v-loading="loading">
      <template #header>
        <el-button class="" type="primary" @click="handleAllcotion">分配</el-button>
      </template>
      <el-table
        ref="singleTable"
        :data="labList"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column property="date" label="日期" width="120">
        </el-table-column>
        <el-table-column property="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column property="address" label="地址"> </el-table-column>
      </el-table>

      <pagination
        v-if="total > 0"
        :total="total"
        :page.sync="queryParams.page"
        :limit.sync="queryParams.limit"
        @pagination="searchQuery"
      />
    </el-card>
    <allocation-dialog ref="allocationDialog" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';

import BorderContainer from "@/components/BorderContainer";
import { getCourseForHomeWork } from "@/api/edu/course";
import Pagination from "@/components/Pagination";
import AllocationDialog from "./components/AllocationDialog";
import { getCourseList } from "@/api/edu/course";

import { getSquareTrialList, createBy } from "@/api/edu/labCenter";

import { checkPermission } from "@/utils/validate";

export default {
  //import 引入的组件需要注入到对象中才能使用
  name: "myLab",
  components: {
    BorderContainer,
    Pagination,
    AllocationDialog,
  },
  props: {},
  data() {
    return {
      queryParams: {
        trialName: "",
        createByName: "",
        ofPublic: "",
        courseId: "",
        createBy: "",
        page: 1,
        limit: 10,
      },
      userList: [],
      courseList: [],
      total: 0,
      loading: false,
      //实验list
      labList: [],
      createByList: [],

      //
    };
  },
  watch: {},
  computed: {},
  created() {
    //this.handleQuery();
    this.queryCourses();
    this.handleQuery();
    this.queryCreateBy();
  },
  methods: {
    handleAllcotion(){
        const allocation = this.$refs['allocationDialog'];
        allocation.handleOpen();
    },
    handleDetail(id) {
      this.$router.push({
        path: "/lab/labDetail",
        query: { id: id, public: true },
      });
    },
    handleUpdate(id) {
      console.log(id);
      this.$router.push({ path: "/lab/operationLab", query: { id: id } });
    },
    queryCreateBy() {
      createBy({ self: 2 }).then((res) => {
        this.createByList = res && res.resData;
      });
    },
    handleAdd(path) {
      this.$router.push(path);
    },
    queryCourses() {
      getCourseForHomeWork("").then((res) => {
        this.courseList = res && res.resData;
      });
    },
    handleQueryInitPage() {
      this.queryParams.page = 1;
      // this.queryParams.limit = 10;
      this.handleQuery();
    },

    //重置，初始换条件和查询
    resetQuery() {
      this.$refs.queryFormRef.resetFields();
      //this.initQueryParams();
      this.queryParams.page = 1;
      console.log(this.queryParams);
      this.handleQuery();
    },

    //查询我的实验列表
    async handleQuery() {
      const params = this.queryParams;
      this.loading = true;
      const res = await getSquareTrialList(params);
      if (res && res.flag) {
        this.loading = false;
        const resData = res.resData;
        this.labList = resData.records;
        this.total = resData.total;
        this.page = resData.pageNum;
      } else {
        this.loading = false;
      }
    },
    searchQuery(e) {
      this.queryParams.page = e.page;
      this.queryParams.limit = e.limit;
      this.handleQuery();
    },
  },
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() {},
};
</script>
<style></style>
<style lang="scss" scoped>
@media only screen and (min-width: 1920px) {
  .el-col-xl-5 {
    width: 20%;
  }
}

@media only screen and (max-width: 1300px) {
  .el-col-xl-5 {
    width: 20%;
  }
}
@media only screen and (max-width: 1100px) {
  .el-col-xl-5 {
    width: 20%;
  }

  .el-col-xs-8 {
    width: 25%;
  }

  .el-col-sm-8 {
    width: 25%;
  }

  .el-col-md-8 {
    width: 25%;
  }
}
@media only screen and (max-width: 900px) {
  .el-col-xl-5 {
    width: 20%;
  }

  .el-col-xs-8 {
    width: 25%;
  }
}

::v-deep {
  .el-tag-lab-squareLab {
    background-color: rgb(249, 242, 171) !important;
    color: rgb(253, 206, 45);
  }

  .el-tag-lab-my {
    background-color: rgb(228, 249, 233) !important;
    color: rgb(123, 193, 139);
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
        top: 6px;
      }
    }
  }
}

.online::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin: 0 1px;
  background: linear-gradient(
    90deg,
    rgb(243, 247, 244) 0%,
    rgb(32, 249, 104) 0%,
    rgb(33, 241, 33) 100%,
    rgb(243, 245, 242) 100%
  );
  box-shadow: 0px 0 10px rgb(32, 249, 86);
}

.outline::before,
.outline::after {
  content: "";
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

  .description-container {
    padding: 5px;
    height: 20px;
    margin-top: 5px;

    .info-container {
      padding: 2px;
    }

    .trialName {
      width: 200px;
    }
  }

  .show-text {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 16px;
    padding-left: 10px;
    padding-right: 10px;
  }
}

.menu-container {
  margin: 30px;
}

.el-divider {
  background: none;
}

.my-lab-card-body .el-card__body {
  ::v-deep {
    padding: 0px;
  }
}

.content-top {
  .el-form-item {
    margin-bottom: 0px;
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
