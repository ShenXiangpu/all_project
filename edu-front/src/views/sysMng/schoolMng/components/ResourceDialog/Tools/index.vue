<template>
  <div style="position: relative;">
    <el-form-item label="架构选择" prop="architecture">
      <el-radio-group @change="queryCompanyNamesList" v-model="ruleForm.architecture" id="architecture">
        <el-radio-button v-for="item in architectureList" :key="item" :label="item" :value="item"></el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-divider></el-divider>
    <el-form-item label="工具选择" prop="companyName">


      <el-radio-group v-model="companyName" @change="queryToolsList">
        <el-radio-button v-for="(item, index) in edaToolsList" :id="item.company" :key="index" :label="item.company">{{
          item.company }}</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="" prop="toolsList" v-if="toolsList && toolsList.length > 0">
      <version-select id="toolsList" class="versionSelect" @handleChangeToolVersion="handleChangeToolVersion"
        :toolsList="toolsList" @checkThisTools="checkThisTools"></version-select>

    </el-form-item>

    <div class="flex justify-end checkAll"><el-checkbox @change="handleAllChecked"
        v-model="isAllChecked">全选</el-checkbox>
    </div>
  </div>
</template>

<script>
import VersionSelect from "@/components/VersionSelect";
import { edaToolsNoVersion } from "@/api/edu/school";
import { cloneDeep } from "lodash";
export default {
  name: "Tools1",
  props: {
    ruleForm: {
      type: Object,
      default: () => { },
    },

    vmId: {
      type: String,
      default: "",
    },
  },

  components: { VersionSelect },
  created() {

  },
  mounted() {
    // this.queryCompanyToolsList();
  },
  watch: {

  },
  data() {
    return {
      architectureAndCompany: {},
      architectureList: [],
      architecture: "",
      edaToolsList: [],
      toolsList: [],
      loading: false,
      companyName: "",
      tools: [],
      labTools: [],
      type: "vm",
      isAllChecked: false,
      edaToolsCount: 0
    };
  },
  methods: {
    // 实现全选功能
    handleAllChecked(e) {
      console.log("e", e, this.edaToolsList);
      let edaToolsList = cloneDeep(this.edaToolsList);
      let list = e ? edaToolsList : []
      this.edaToolsList = this.handleDefaultEadToolsList(edaToolsList, list)
      console.log("edaToolsList", this.edaToolsList);

      this.checkThisTools(this.edaToolsList)
      //更新视图
      this.$nextTick(() => {
        this.toolsList = this.handleClickCompanyList(this.companyName);
      });
    },

    //EDA工具列表查询接口(不包含环境变量等信息) 获取厂商和工具列表
    async queryCompanyToolsList() {
      this.loading = true;
      const res = await edaToolsNoVersion();
      let reBackToolsList = [];
      const resData = res.resData;
      this.architectureAndCompany = resData; //获取架构以及架构下的厂商工具列表
      //先拿到架构，再去拿到厂商
      let architectureList = Object.keys(resData);
      this.architectureList = architectureList;

      this.architectureList = architectureList;
      this.architecture = architectureList[0] || "X86";
      let edaToolsList = resData[this.architecture];

      if (this.ruleForm.tools && Object.keys(this.ruleForm.tools).length > 0) {
        let architectureList = Object.keys(this.ruleForm.tools);
        this.architectureList = architectureList;
        this.architecture = architectureList[0];
        this.$emit("handleArchitecture", this.architecture);
        reBackToolsList = this.ruleForm.tools[this.architecture];
        edaToolsList = this.handleDefaultEadToolsList(
          edaToolsList,
          reBackToolsList
        );
      } else {
        this.$emit("handleArchitecture", this.architecture);
        //添加了状态的edaToolList
        edaToolsList = this.handleDefaultEadToolsList(edaToolsList, []);
      }

      this.edaToolsList = edaToolsList;
      //   this.originEdaToolsList = originEdaToolsList;
      this.companyName = edaToolsList && edaToolsList[0].company; //默认厂商
      this.$emit("handleCompanyName", this.companyName);
      this.toolsList = this.handleClickCompanyList(edaToolsList[0].company); //默认工具列表
      this.loading = false;
    },

    handleDefaultEadToolsList(edaToolsList, reBackToolsList) {
      let edaToolsCount = 0;
      let rebackToolsCount = 0;
      edaToolsList.map((item) => {
        // 给每个工具初始化添加一个选中的状态
        item &&
          item.edaTools.map((_i) => {
            edaToolsCount++
            _i.isSelect = false;
            _i.defaultVersions =
              (_i.versions && _i.versions.length > 0 && _i.versions[0]) || null;
          });
        //处理回显
        if (reBackToolsList && reBackToolsList.length > 0) {
          reBackToolsList.map((ri) => {
            if (ri.vendorCode == item.vendorCode) {
              ri &&
                ri.edaTools.map((rii) => {
                  rebackToolsCount++
                  item &&
                    item.edaTools.map((_i) => {
                      if (rii.id == _i.id) {
                        _i.isSelect = true;
                        _i.defaultVersions =
                          (rii.versions &&
                            rii.versions.length > 0 &&
                            rii.versions[0]) ||
                          null;
                      }
                    });
                });
            }
          });
        }
      });

      if (edaToolsCount == rebackToolsCount) {
        this.isAllChecked = true
      }
      this.edaToolsCount = edaToolsCount

      return edaToolsList;
    },

    queryToolsList(e) {
      console.log("e", e);
      this.companyName = e;
      this.$emit("handleCompanyName", e);
      this.toolsList = this.handleClickCompanyList(this.companyName);
    },

    handleToolsList(edaToolsList) {
      let choosesEdaToolsList = [];

      edaToolsList.map((item) => {
        // 给每个工具初始化添加一个选中的状态
        let selectItem = {
          company: "",
          vendorCode: "",
          edaTools: [],
        };
        item &&
          item.edaTools.map((_i) => {
            if (_i.isSelect) {
              _i.versions = [_i.defaultVersions];
              selectItem.company = item.company;
              selectItem.vendorCode = item.vendorCode;
              selectItem.edaTools.push({
                id: _i.id,
                toolName: _i.toolName,
                versions: _i.versions,
              });
            }
          });
        if (selectItem && selectItem.edaTools.length > 0) {
          choosesEdaToolsList.push(selectItem);
        }
      });
      return choosesEdaToolsList;
    },

    //根据底层架构选择厂商
    queryCompanyNamesList() {
      let architecture = this.ruleForm.architecture;
      console.log(architecture);
      let edaToolsList = this.architectureAndCompany[architecture];
      edaToolsList = this.handleDefaultEadToolsList(edaToolsList, []);
      this.originEdaToolsList = edaToolsList;
      this.edaToolsList = edaToolsList;
      this.companyName = edaToolsList[0].company; //默认厂商
      this.toolsList = this.handleClickCompanyList(this.companyName); //默认工具列表
    },

    //根据厂商显示工具列表
    handleClickCompanyList(companyName) {
      let edaToolsList = this.edaToolsList;
      edaToolsList =
        edaToolsList &&
        edaToolsList.length > 0 &&
        edaToolsList.filter((item) => {
          return companyName == item.company;
        });
      let toolsList = edaToolsList[0].edaTools;
      return toolsList;
    },

    handleChangeToolVersion(e, index) {
      this.handleVersions(e, index);
    },
    //处理工具选择 ==> 版本选择
    handleVersions(versionName, index) {
      console.log(versionName, index);
      let toolsList = this.toolsList;
      toolsList =
        toolsList &&
        toolsList[index] &&
        toolsList[index].versions.filter((item) => {
          return versionName == item.toolVersion;
        });
      this.toolsList[index].defaultVersions = toolsList && toolsList[0];
      this.toolsList = [...this.toolsList];

      this.checkThisTools(this.toolsList);
    },

    checkThisTools(list) {
      this.toolsList = [...list];
      let edaToolsList = cloneDeep(this.edaToolsList);
      let choosesEdaToolsList = this.handleToolsList(edaToolsList);
      let architecture = this.ruleForm.architecture;
      let tools = {};
      tools[architecture] = choosesEdaToolsList;
      this.tools = tools;
      this.$emit("checkThisTools", this.tools, choosesEdaToolsList);
    },

    handleToolsList(edaToolsList) {
      let choosesEdaToolsList = [];
      let checkToolsCount = 0;
      edaToolsList &&
        edaToolsList.length > 0 &&
        edaToolsList.map((item) => {
          // 给每个工具初始化添加一个选中的状态
          let selectItem = {
            company: "",
            vendorCode: "",
            edaTools: [],
          };
          item &&
            item.edaTools.map((_i) => {
              if (_i.isSelect) {
                checkToolsCount++
                _i.versions = _i.defaultVersions && [_i.defaultVersions] || null;
                selectItem.company = item.company;
                selectItem.vendorCode = item.vendorCode;
                selectItem.edaTools.push({
                  id: _i.id,
                  toolName: _i.toolName,
                  versions: _i.versions,
                });
              }
            });
          if (selectItem && selectItem.edaTools.length > 0) {
            choosesEdaToolsList.push(selectItem);
          }
        });
      if (checkToolsCount == this.edaToolsCount) {
        this.isAllChecked = true
      } else {
        this.isAllChecked = false
      }
      return choosesEdaToolsList;
    },
  },
};
</script>

<style lang="scss" scoped>
.versionSelect {
  ::v-deep {
    .function-container {
      height: 50px;
    }
  }

}

.checkAll {
  position: absolute;
  top: 70px;
  right: 0;

}
</style>
