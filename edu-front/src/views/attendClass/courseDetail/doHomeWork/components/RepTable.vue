<template>
  <div class="marginBottom20">
    <div class="" style="position: relative;">
      <h2 class="marginBottom20 font20" style="width: 100%;text-align: center;">{{ obj && obj.title }}
      
      </h2>
    </div>
    <table border="1" class="table" style="">
      <tr style="width: 100%;" class="height30">
        <td class="primaryBgColor colorFFF ">
          <div class="td-width-left">课程名称</div>
        </td>
        <td class="td-width">
          <el-tooltip class="item" effect="dark" :content="obj && obj.courseName" placement="top-start">
            <div class="view-text td-width-div">{{ obj && obj.courseName }}</div>
          </el-tooltip>
        </td>
        <td class="primaryBgColor colorFFF td-width-div">班级</td>
        <td class="td-width">{{ className }}</td>
      </tr>

      <tr class="height30">
        <td class="primaryBgColor colorFFF">姓名</td>
        <td>{{ obj && obj.userName }}</td>
        <td class="primaryBgColor colorFFF">学号</td>
        <td>{{ studentNum }}</td>
      </tr>
      <tr class="height30">
        <td class="primaryBgColor colorFFF">考试时间</td>
        <td colspan="3">
          {{ obj && obj.startTime }} - {{ obj && obj.endTime }}
        </td>
      </tr>

    </table>
  </div>
</template>

<script>
export default {
  name: 'RepTable',
  props: {
    scoreTotal: {
      type: Number | String,
      default: 0
    },
    obj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    obj: {
      type: Object,
      default: () => { }
    },
  },
  data() {
    return {
      className: '',
      studentNum: '',
    }
  },
  created() {
    let userInfo = this.$store.state.user.userInfo
    this.className = userInfo.className
    this.studentNum = userInfo.studentNum
  }
}
</script>

<style lang="scss" scoped>
.score {
  position: absolute;
  right: 20px;
  top: 0px;
  font-size: 20px;
  color: #f00;
}

.table {
  // width: 100%;
  border: 1px solid #d9d9d9;
  text-align: center;
  font-size: 14px;
  margin: 0 auto;

  .v-html-container {
    // border: 1px solid red;
    text-align: left;
    vertical-align: top;
    padding: 20px;
    // width: 700px;
    overflow: auto;
  }
}

.colorFFF {
  color: #fff;
}

.td-width {

  width: 300px;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
}

.td-width-left {
  width: 100px;
}

.td-width-div {

  width: 200px;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
}

.td-width-3 {
  width: 700px;
  height: 30px;
  line-height: 30px;
  vertical-align: middle;
}

td {
  vertical-align: middle;
}

.height30 {
  height: 30px;
}

.v-html {
  min-height: 500px;
  overflow: auto;
  max-height: 550px;
  width: 760px;

  // max-width: 100%;


}

::v-deep img {
  max-width: 100%;
  height: auto;
}
</style>