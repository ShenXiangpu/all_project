<template>
  <tr>
    <td
      class="text-center alarm-name"
      :class="alarmName == '1' ? 'primaryColory' : 'primaryColoro'"
    >
      {{ alarm[alarmName] }}
    </td>
    <td class="text-center">
      <el-select class="el-select-edu" v-model="isLeft" placeholder="请选择" >
        <el-option label="<" value="s"> </el-option>
        <el-option label=">" value="m"> </el-option>
      </el-select>
    </td>
    <td class="text-center">
      <el-input
        class="el-input-edu"
        v-model="input1"
        placeholder="请输入内容"
      ></el-input>
    </td>
    <td class="text-center" style="width: 50px">%</td>
    <td class="text-center">
      <el-input
        class="el-input-edu"
        v-model="input2"
        placeholder="请输入内容"
      ></el-input>
    </td>
    <td class="text-center">
      <el-select class="el-select2-edu" v-model="value" placeholder="请选择">
        <el-option label="秒" value="s"> </el-option>
        <el-option label="分" value="m"> </el-option>
        <el-option label="时" value="h"> </el-option>
      </el-select>
    </td>
  </tr>
</template>

<script>
export default {
  name: "",
  props: {
    alarmName: {
      default: "1",
      type: String,
    },
  },
  components: {},
  created() {},
  data() {
    return {
      time: "s",
      isLeft: ">",
      input1: "",
      input2: "",
      alarm :{
        1:'预警',
        2:'告警',
      }
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.el-select-edu {
  width: 60px;

  ::v-deep .el-input__inner {
    border: 0;
  }
}
.el-select2-edu {
  width: 80px;
  ::v-deep .el-input__inner {
    border: 0;
  }
}
.el-input-edu {
  width: 130px;

  ::v-deep .el-input__inner {
    border: 0;
  }
}

.alarm-name {
  width: 70px;
}
</style>
