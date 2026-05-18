<template>
  <el-dialog
    :title="textMap[dialog.status]"
    :visible.sync="dialog.visible"
    @closed="cancel"
    class="dialog"
    width="60vw"
  >
    <div class="flex justify-start align-center" style="border-bottom: 1px solid #ddd">
      <div class="padding20">
        <el-checkbox
          class="el-checkbox-edu"
          @change="getAllItem()"
          v-model="allChecked"
        ></el-checkbox>
      </div>
      <div
        class="fontW7 text-center padding20"
      >
        <div class="file-name">文件名称</div>
      </div>
      <div
        class="fontW7 text-center padding20"
      >
        <div class="file-size">文件大小</div>
      </div>
      <div
        class="fontW7 text-center padding20"
      >
        <div class="createtime">创建时间</div>
      </div>
      <div
        class="fontW7 text-center padding20"
      >
        <div class="remark">描述</div>
      </div>
    </div>
    <ul
      class="infinite-list"
      v-infinite-scroll="load"
      :infinite-scroll-immediate="false"
      style="overflow: auto; height: 400px"
    >
      <li
        v-for="item in labsList"
        class="infinite-list-item flex justify-start align-center"
        style="border-bottom: 1px solid #ddd"
        :key="item.id"
        @click="getItem(item)"
      >
        <div
          class="padding20"
          style="width: 55px;"
        >
          <el-checkbox
            class="el-checkbox-edu"
            v-model="item.isChecked"
            @change="getItem(item)"
          ></el-checkbox>
        </div>
        <div
          class="text-center padding20"
        >
          <div class="file-name view-text">{{ item.displayName || "--" }}</div>
        </div>
        <div
          class="text-center padding20"
        >
          <div class="file-size">
            {{ item.fileSize || "--" }}
          </div>
        </div>
        <div
          class="text-center padding20"
        >
          <div class="createtime">
            {{ item.createAt || "--" }}
          </div>
        </div>
        <div
          class="text-center padding20"
        >
          <div class="remark">
            {{ item.remark || "--" }}
          </div>
        </div>
      </li>
      <li
        class="text-center padding20 font20"
      >
        没有更多了 ~
      </li>
    </ul>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="getIpList">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getOenList } from "@/api/edu/ip";
export default {
  name: "",
  components: {},
  created() {
    // this.getList();
  },
  data() {
    return {
      dialog: {
        visible: false,
        status: "",
      },

      textMap: {
        update: "",
        create: "添加IP",
        look: "",
      },

      listQuery: {
        page: 1,
        limit: 10,
        params: "",
      },
      queryParams: {
        fileName: "",
      },
      pages: 0,
      labsList: [],
      allChecked: false, //全选
    };
  },
  methods: {
    getIpList() {
      let ips = [];
      this.labsList.forEach((item) => {
        if (item.isChecked) {
          ips.push(item);
        }
      });

      this.$emit("getIpList", ips);
      this.dialog.visible = false;
    },

    getAllItem() {
      if (!this.allChecked) {
        this.labsList.forEach((item) => {
          item.isChecked = false;
        });
      } else {
        this.labsList.forEach((item) => {
          item.isChecked = true;
        });
      }
    },
    getItem(item) {
      this.labsList.forEach((i) => {
        if (item.id == i.id) {
          item.isChecked = !item.isChecked;
          if (!item.isChecked) {
            this.allChecked = false;
          }
        }
      });
    },
    initParams() {
      let listQuery = {
        page: 1,
        limit: 10,
        params: "",
      };
      this.listQuery = listQuery;
    },
    searchQuery(e) {
      this.listQuery.page = e.page;
      this.listQuery.limit = e.limit;
      this.getList();
    },
    getList() {
      this.loading = true;
      let listContainer = [];
      getOenList(this.listQuery).then((reponse) => {
        let resData = reponse.resData;
        listContainer = resData.records;
        listContainer &&
          listContainer.length > 0 &&
          listContainer.forEach((item) => {
            item.isChecked = false;
          });
        this.allChecked = false;
        this.labsList.push.apply(this.labsList, listContainer);
        this.total = resData.total;
        this.pages = resData.pages;
        this.loading = false;
      });
    },
    cancel() {
      this.labsList = [];
      this.dialog.visible = false;
      this.allChecked = false;
    },
    getLabList() {},
    load() {
      console.log("load");
      let totalPages = this.pages; //一共有多少页
      let page = this.listQuery.page;
      if (page < totalPages) {
        this.listQuery.page++;
        this.getList();
      }
    },
    // 获取文件列表
    getFileList() {
      let fileName = this.queryParams.fileName;
      if (fileName) {
        getFileList(fileName).then((response) => {
          this.fileList = response.resData;
        });
      }

      console.log("123123");
    },
  },
};
</script>

<style lang="scss" scoped>
.el-checkbox-edu {
  ::v-deep {
    .el-checkbox__inner {
      width: 18px;
      height: 18px;
    }

    .el-checkbox__inner::after {
      height: 8px;
      left: 5px;
      width: 5px;
    }
  }
}
.view-text {
  display: block;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  // font-size: 14px;
}
.file-name {
  width: 250px;
}
.file-size {
  width: 180px;
}

.createtime {
  width: 180px;
}
.remark {
  width: 180px;
}
</style>