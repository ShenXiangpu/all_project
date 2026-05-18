<template>
  <div class="app-container">
    <div class="flex justify-end marginBottom20">
      <!-- <div>
        <el-progress
          style="width: 300px; margin-right: 20px"
          :text-inside="true"
          :stroke-width="12"
          :percentage="70"
        ></el-progress>
        <div>0.003G/40.000G</div>
      </div>
      <el-button type="danger" icon="el-icon-delete">回收站</el-button> -->
    </div>
    <div
      class="marginBottom20 flex justify-start align-center down-upload-container"
    >
      <big-file-upload-dialog
        v-if="isDestory"
        v-permission="['file:upload']"
        ref="uploader"
        @removeFileDefine="removeFileDefine"
        @complete="complete"
        @onFileSuccess="onFileSuccess"
        :isDirectory="false"
        @handleClose="handleCloseFileDialog"
      ></big-file-upload-dialog>
      <!-- <el-button
        icon="el-icon-folder-add"
        class="marginRight20"
        @click="newFolder"
        >新建文件夹</el-button
      > -->

      <!-- <el-button-group> -->
      <!-- <el-button type="primary" @click="copyOrMove('move')">移动到</el-button>
        <el-button type="primary" @click="copyOrMove('copy')">复制到</el-button> -->
      <el-button
        v-permission="['file:downloadFile']"
        v-if="currentRow"
        type="primary"
        class="downLoad"
        icon="el-icon-download"
        @click="down()"
        :loading="downLoading"
        :disabled="currentRow.dir"
        >下载</el-button
      >
      <!-- </el-button-group> -->
    </div>
    <div class="marginBottom10">
      <el-breadcrumb separator="/">
        <!-- <el-breadcrumb-item>
          <span
            class="pointer hoverDir"
            @click="queryListFile({ fileName: '' }, -1)"
            >根目录</span
          >
        </el-breadcrumb-item> -->
        <template v-if="pathList && pathList.length > 0">
          <el-breadcrumb-item
            v-for="(item, index) in pathList"
            :key="item.path"
          >
            <span
              :class="index < pathList.length - 1 ? 'pointer hoverDir' : ''"
              @click="queryListFile(item, index)"
              >{{ item.fileName }}</span
            >
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        :data="filesList"
        tooltip-effect="dark"
        style="width: 100%"
        header-row-class-name="el-table-de"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="55" align="center">
        </el-table-column> -->
        <el-table-column
          ref="chooseCurrent"
          label="选择"
          align="center"
          width="65"
        >
          <template #default="scope">
            <el-radio
              :label="`${scope.row.currentDir}/${scope.row.fileName}`"
              v-model="filePath"
              @change.native="getCurrentRow(scope.row)"
              >{{ "" }}</el-radio
            >
          </template>
        </el-table-column>

        <!-- <el-table-column
          :label="
            multipleSelection && multipleSelection.length > 0
              ? `已选择${multipleSelection.length}个文件/文件夹`
              : '文件名'
          "
          min-width="500"
        /> -->
        <el-table-column label="文件名" min-width="500">
          <template slot-scope="scope">
            <div
              v-if="scope.row.dir === true"
              class="primaryColorb pointer"
              @click="queryListFile(scope.row)"
            >
              <i class="el-icon-folder"></i>
              <span> {{ scope.row.fileName }}</span>
            </div>

            <div class="" v-else>
              <i class="el-icon-document"></i>
              <span> {{ scope.row.fileName }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="size" label="大小" min-width="120">
          <template slot-scope="scope">
            {{ scope.row.dir ? "-" : scope.row.size }}
          </template>
        </el-table-column>
        <el-table-column
          prop="lastModifyTime"
          label="修改时间"
          min-width="120"
          show-overflow-tooltip
        >
        </el-table-column>

        <!-- <el-table-column label="操作" min-width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag v-if="!scope.row.dir">下载</el-tag>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <file-tree ref="file-tree"></file-tree>
    <new-file ref="new-file"></new-file>
  </div>
</template>

<script>
import {
  listFile,
  uploadFileToVM,
  mergeChunkFile,
  downloadFile,
} from "@/api/edu/fileMng";
import FileTree from "./components/FileTree.vue";
import NewFile from "./components/NewFile.vue";
import BigFileUploadDialog from "@/components/BigFileUploadDialog/index.vue";
export default {
  name: "",
  components: {
    FileTree,
    NewFile,
    BigFileUploadDialog,
  },
  created() {
    this.vmId = this.$route.query.id || "vm-7740";
    listFile({ id: this.vmId, path: "" }).then((res) => {
      let filesList = res && res.resData;
      let rootPath = filesList[0].currentDir;
      let rootPathList = rootPath.split("/");
      let item1 = {
        fileName: `${rootPathList[1]}`,
        currentDir: ``,
        dir: true,
      };
      let item2 = {
        fileName: `${rootPathList[2]}`,
        currentDir: `/${rootPathList[1]}`,
        dir: true,
      };
      this.uploadPath = `/${rootPathList[1]}/${rootPathList[2]}`;
      console.log(this.uploadPath);
      this.pathList.push(item1);
      this.pathList.push(item2);
      this.filesList = filesList;
    });
    console.log("this.pathList", this.pathList);
  },
  data() {
    return {
      waitUploadFileList: [],
      noMergeWaitUploadFileList: [],
      multipleSelection: [],
      pathList: [], //存放文件路径
      filesList: [],
      vmId: "",
      pathItem: {},
      uploadPath: "", //上传文件路径

      filePath: "",
      currentRow: "", //文件信息

      downLoading: false,

      isDestory: true,
    };
  },
  methods: {
    getCurrentRow(row) {
      console.log(row);
      // 获取选中数据 row表示选中这一行的数据，可以从里面提取所需要的值
      this.currentRow = row;
      this.filePath = row.currentDir + "/" + row.fileName;
    },
    handlePath(item) {
      // let fullDir = item.fullDir;
      // let fullDirList = fullDir.split("/");
      // fullDirList.splice(0, 3);
      // item.fullDirList = fullDirList
      // pathItem = item
      this.pathList.push(item);
    },
    async queryListFile(item, index) {
      item
        ? (item.fullDir = `${item.currentDir || ""}/${item.fileName || ""}`)
        : "";

      const res = await listFile({
        id: this.vmId,
        path: (item && item.fullDir) || "",
      });
      this.initRadio();
      this.uploadPath = item.fullDir || "";
      let filesList = res && res.resData;
      this.filesList = filesList;
      if (index || index === 0) {
        this.pathList.splice(index + 1);
      } else {
        if (item) {
          this.handlePath(item);
        } else {
          this.pathList = [];
        }
      }

      //存储文件路径
    },

    newFolder() {
      this.$refs["new-file"].dialogVisible.visible = true;
    },
    copyOrMove() {
      this.$refs["file-tree"].dialogVisible.visible = true;
    },
    //清空文件选择
    initRadio() {
      this.currentRow = "";
      this.filePath = "";
    },
    down() {
      let vmId = this.vmId;
      let currentDir = this.currentRow.currentDir;
      let fileName = this.currentRow.fileName;
      let params = {
        vmId,
        currentDir,
        fileName,
      };
      this.downLoading = true;
      downloadFile(params)
        .then((res) => {
          // const blob = new Blob([res.data], {
          //     type:'application/json'
          // }); // 构造一个blob对象来处理数据，并设置文件类型

          let resData = res.resData;
          // const href = URL.createObjectURL(blob); //创建新的URL表示指定的blob对象
          const a = document.createElement("a"); //创建a标签
          a.style.display = "none";
          a.href = resData; // 指定下载链接
          a.download = fileName; //指定下载文件名
          document.body.appendChild(a);
          a.click(); //触发下载
          URL.revokeObjectURL(a.href); //释放URL对象
          document.body.removeChild(a);
          this.$message.success("下载成功");
          this.downLoading = false;
        })
        .finally(() => {
          this.downLoading = false;
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCloseFileDialog() {
      this.isDestory = false;
      this.waitUploadFileList = [];
      this.md5List = [];
      setTimeout(() => {
        this.isDestory = true;
      }, 100);
    },
    removeFileDefine(file, index) {
      this.waitUploadFileList.splice(index, 1);
      this.md5List.splice(index, 1);
    },
    async submitFileVm() {
      console.log(md5List);
      let uploadPath = this.uploadPath;
      let vmId = this.vmId;
      let md5List = this.md5List;
      const res = await uploadFileToVM({
        vmId,
        uploadPath,
        md5: md5List,
      });
      if (res && res.flag) {
        this.$message.success(`文件已上传到虚拟机`);
        this.uploadLoading = false;
        this.$refs.uploader.uploadFileList = [];
        this.waitUploadFileList = [];
        this.noMergeWaitUploadFileList = [];
        const res = await listFile({
          id: this.vmId,
          path: uploadPath,
        });
        let filesList = res && res.resData;
        this.filesList = filesList;
      } else {
        this.uploadLoading = false;
        this.$refs.uploader.uploadFileList = [];
        this.waitUploadFileList = [];
        this.noMergeWaitUploadFileList = [];
      }
    },
    async onFileSuccess(obj) {
      const { rootFile, file, response, chunk } = obj;
      console.log("onFileSuccess", obj);
      if (response) {
        const res = JSON.parse(response);
        if (res && res.flag) {
          let fileName = (file && file.name) || "";
          let index = fileName.lastIndexOf(".");
          let fileType = fileName.substring(index + 1, fileName.length);
          index >= 0 && (fileName = fileName.substring(0, index));
          let md5 = file.uniqueIdentifier;
          this.waitUploadFileList.push({
            fileName,
            fileType,
            md5,
            isMerge: false,
          });

          // 合并分片
        }
      }
    },
    //所有文件上传完毕触发
    async complete() {
      console.log("所有文件上传完毕触发");
      this.$message.success("文件上传中，请稍后");
      let md5List = [];
      const waitUploadFileList = this.waitUploadFileList;
      waitUploadFileList &&
        waitUploadFileList.length > 0 &&
        waitUploadFileList.forEach(async (item, index) => {
          md5List.push(item.md5);
          let fileName = item.fileName;
          let fileType = item.fileType;
          let md5 = item.md5;
          const res = await mergeChunkFile({
            fileName,
            fileType,
            md5,
            vmId: this.vmId,
            uploadPath: this.uploadPath,
          });
          if (res && res.flag) {
            const res1 = await listFile({
              id: this.vmId,
              path: this.uploadPath,
            });
            if (res1 && res1.flag) {
              let filesList = res1 && res1.resData;
              this.filesList = filesList;
              this.$message.success(`${fileName}已上传到虚拟机`);
            }
          } else {
            this.$message.error(`${fileName}${res.errCode}`);
          }
        });
      this.md5List = md5List;

      // this.submitFileVm();

      console.log("waitUploadFileList", this.waitUploadFileList);
    },
  },
};
</script>

<style lang="scss" scoped>
.hoverDir:hover {
  color: #409eff;
}

.downLoad {
  height: 38px;
}

::v-deep {
  .el-table-de {
    background-color: rgb(250, 250, 250);
  }
  .el-table th {
    background-color: rgb(250, 250, 250);
  }
}

.down-upload-container::after {
  display: block;
  content: "";
  clear: both;
  height: 38px;
  width: 38px;
  // background: red;
}
</style>