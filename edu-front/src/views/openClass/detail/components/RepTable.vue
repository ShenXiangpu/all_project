<template>
  <div>
    <div class="" style="position: relative;">
      <h2 class="marginBottom20 font20" style="width: 100%;text-align: center;">{{ report && report.trialName + '实验报告' }}
      </h2>
      <div class="score" v-if="report && report.score != null && report.score != '' || report.score == 0">{{ report &&
        report.score +
        '分' }}</div>
    </div>
    <table border="1" class="table" style="">
      <tr style="width: 100%;" class="height30">
        <td class="primaryBgColor colorFFF ">
          <div class="td-width-left">课程名称</div>
        </td>
        <td class="td-width">
          <el-tooltip class="item" effect="dark" :content="report && report.courseName" placement="top-start">
            <div class="view-text td-width-div">{{ report && report.courseName }}</div>
          </el-tooltip>
        </td>
        <td class="primaryBgColor colorFFF">班级</td>
        <td class="td-width">{{ report && report.className }}</td>
      </tr>
      <tr class="height30">
        <td class="primaryBgColor colorFFF">实验名称</td>
        <td colspan="3">

          <span class="view-text td-width-3">{{ report && report.trialName
          }}</span>

        </td>
      </tr>
      <tr class="height30">
        <td class="primaryBgColor colorFFF">姓名</td>
        <td>{{ report && report.userName }}</td>
        <td class="primaryBgColor colorFFF">学号</td>
        <td>{{ report && report.studentNum }}</td>
      </tr>
      <tr class="height30">
        <td class="primaryBgColor colorFFF">提交时间</td>
        <td colspan="3">
          {{ report && report.submitTime }}
        </td>
      </tr>
      <tr>
        <td colspan="4" class="v-html-container">
          <div class="v-html" v-html="report && report.report" style=""></div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'RepTable',
  props: {
    report: {
      type: Object,
      default: () => {
        return {}
      }
    }
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
  min-height: calc(100vh - 520px);
  overflow: auto;
  max-height: 550px;
  width: 760px;
  // max-width: 100%;
  

}
::v-deep img{
     max-width:100%;
     height: auto;
}
</style>