<template>
  <div class="app-container">
    <border-container class="marginBottom10 border-container" :title="courseObj.name || '课程名称'" :height="10" :isBgShow="false">
      <template #content>
        <div class="font16 flex justify-between align-center" style="padding: 0 10px">
          <div class="flex marginTop10">
            <div class="marginRt20 title-decration2">
              课程ID：{{ courseObj.courseNum || "-" }}
            </div>
            <div class="marginRt20 title-decration2">
              学年：{{ courseObj.academicYear || "-" }}
            </div>
            <div class="marginRt20 title-decration2">
              年级：{{ courseObj.grade || "-" }}
            </div>
            <div class="marginRt20 title-decration2">
              课程人数：{{ courseObj.studentNum || 0 }}人
            </div>
            <div class="marginRt20 title-decration2">
              创建时间：{{ courseObj.createAt }}
            </div>
          </div>
          <div>
            <el-button v-if="courseObj.vmExist" type="success" size="mini" class="editSuccess marginRight20"
              @click="goToEnvDetail(courseId)">实操云环境</el-button>
            <el-popconfirm title="确定删除课程吗？" @onConfirm="handleDeleteCourse()">
              <el-button size="mini" type="danger" class="editDanger" slot="reference"
                :loading="deleteLoading">删除课程</el-button>
              <!-- <i class="el-icon-delete font20 pointer" style="color: #f56c6c;" slot="reference"></i> -->
            </el-popconfirm>
          </div>
        </div>
      </template>
    </border-container>
    <el-tabs class="el-tab-edu" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="学生列表" name="zero">
        <div v-if="activeName == 'zero'">
          <student-list ref="student-list" :listQuery="listStuQuery" @exportStu="exportStu"
            @submitFormStudent="submitFormStudent" @resetQuery="resetStuQuery" @searchQuery="searchStuQuery"
            @handleQuery="handleStuQuery" :total="stutotal" :studentList="studentList" :courseId="courseId"
            :stuDialog="stuDialog" @cancel="cancelStu" @handleAdd="handleAddStu" @handleDelete="handleDeleteStu"
            :exportloading="exportloading"></student-list>
        </div>
      </el-tab-pane>
      <el-tab-pane label="实操云环境" name="first">
        <div v-if="activeName == 'first'">
          <border-container class="marginBottom10 border-container" :height="15" :isShowTitle="false" :isBgShow="false">
            <template #content>
              <div class="" style="padding: 10px 0 0px 10px;">
                <el-form ref="queryEnvFormRef" :model="queryEnvParams" :inline="true">
                  <el-form-item label="实操云名称" prop="vmName">
                    <el-input v-model="queryEnvParams.vmName" id="vmName" placeholder="请输入实操云名称" clearable
                      @keyup.enter="handleQuery" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="success" class="editSuccess" icon="el-icon-search"
                      @click="handleQuery">搜索</el-button>
                  </el-form-item>

                  <el-form-item>
                    <el-button type="primary" class="editPrimary" icon="el-icon-refresh"
                      @click="resetQuery('queryEnvFormRef')">重置</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </template>
          </border-container>
          <el-card class="marginTop10">
            <template #header>
              <el-button :disabled="vmsList && vmsList.length > 0" type="primary" icon="el-icon-plus"
                @click="goToDetail">创建实操云环境</el-button>
              &nbsp;<el-button :disabled="!(vmsList && vmsList.length > 0)" type="primary" icon="el-icon-plus"
                @click="handleAddUser">手动创建</el-button>
              <el-button style="float: right" :disabled="!(multipleVmSelection && multipleVmSelection.length > 0)
                " type="primary" icon="el-icon-edit" @click="handleVms">批量修改</el-button>
            </template>
            <el-table :data="vmsList" style="width: 100%" v-loading="loading"
              @selection-change="handleVmSelectionChange">
              <el-table-column type="selection" width="55" align="center">
              </el-table-column>
              <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
              <el-table-column prop="vmId" label="实操云ID" min-width="80" align="center">
                <template #default="scope">
                  <!-- <el-button type="primary" size="small" @click.stop="handleShowDetail(scope.row)">查看详情</el-button> -->
                  <div v-if="scope.row.status == '0' || scope.row.status == '5'">
                    {{ scope.row.vmId }}
                  </div>
                  <div v-else-if="scope.row.status == '2'">
                    <i style="color: rgb(24, 144, 255)" class="el-icon-loading"></i>
                    创建中
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="vmName" label="实操云名称" min-width="100" align="center">
                <template #default="scope">
                  <!-- <el-button type="primary" size="small" @click.stop="handleShowDetail(scope.row)">查看详情</el-button> -->
                  <a v-if="scope.row.status == '0'" @click="goToEnvDetail(scope.row.vmId)" class="primaryColor">{{
                    scope.row.vmName }}

                    <el-tooltip class="item" effect="dark" content="您在这" placement="right">
                      <i v-if="scope.row.isTeacher != -1" class="el-icon-s-custom"></i>
                    </el-tooltip>
                  </a>
                  <span v-else>
                    {{ scope.row.vmName }}
                    <el-tooltip class="item" effect="dark" content="您在这" placement="right">
                      <i v-if="scope.row.isTeacher != -1" class="el-icon-s-custom"></i>
                    </el-tooltip>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="hostname" label="主机名称" min-width="80" align="center" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="powerState" label="电源状态" min-width="80" align="center">
                <!-- <template #default="scope">
                                    <div v-if="scope.row.powerState">
                                        <i :style="{ color: POWERSTATE[scope.row.powerState].color }"
                                            :class="POWERSTATE[scope.row.powerState].icon"></i>
                                        {{ POWERSTATE[scope.row.powerState].text }}
                                    </div>
                                    <div v-else>
                                        -
                                    </div>
                                </template> -->
                <template #default="scope">
                  <el-switch :disabled="scope.row.status == '2' || scope.row.status == '5'
                    " class="switchStyle" @change="handlePowerStatus(scope.row)"
                    v-model="scope.row.powerState == 'poweredOn'" active-text="开机" inactive-text="关机"
                    active-color="#02C733" inactive-color="#A6A6A6">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="cpuUsage" label="CPU使用" min-width="80" align="center">
                <template #default="scope">
                  <div :class="scope.row.cpuAlarm ? scope.row.cpuAlarm == 'Warning' ? 'primaryColoro' : 'primaryColorr' : ''">
                    {{ scope.row.cpuUsage }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="storageUsage" label="存储使用" min-width="80" align="center">
              </el-table-column>
              <el-table-column prop="memoryUsage" label="内存使用" min-width="80" align="center">
                <template #default="scope">
                  <div
                    :class="scope.row.memoryAlarm ? scope.row.memoryAlarm == 'Warning' ? 'primaryColoro' : 'primaryColorr' : ''">
                    {{ scope.row.memoryUsage }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="diskUsage" label="磁盘使用" min-width="80" align="center">
              </el-table-column>
              <el-table-column prop="cpu" label="配置" min-width="80" align="center">
                <template #default="scope">
                  <!-- <el-button type="primary" size="small" @click.stop="handleShowDetail(scope.row)">查看详情</el-button> -->
                  <div>
                    {{ `${scope.row.cpu}核 ${scope.row.memory / 1024}G` }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="user" label="创建人" min-width="70" align="center" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="userCountsIds" label="使用人数" min-width="70" align="center">
                <template #default="scope">
                  <div>
                    {{
                      scope.row.userCountsIds &&
                      scope.row.userCountsIds.split(",").length
                    }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间" min-width="120" align="center">
              </el-table-column>
              <el-table-column label="操作" align="center" min-width="200" fixed="right">
                <template #default="scope">
                  <div v-if="scope.row.status == '0'">
                    <!-- <el-button type="success" size="small" v-if="scope.row.powerState == 'poweredOff'"
                                            @click.stop="handlePoweron(scope.row)" class="editSuccess">开机</el-button>

                                        <el-button size="small" type="warning" v-if="scope.row.powerState == 'poweredOn'"
                                            @click.stop="handleOff(scope.row)" class="editWarning">关机</el-button>
                                        <el-divider direction="vertical"></el-divider> -->
                    <el-button type="info" class="editInfo" size="small" v-if="scope.row.powerState == 'poweredOn'"
                      @click.stop="reboot(scope.row)" plain>重启</el-button>
                    <el-button :disabled="true" class="editInfo" type="info" size="small"
                      v-if="scope.row.powerState == 'poweredOff'" @click.stop="" plain>重启</el-button>
                    <el-divider direction="vertical"></el-divider>

                    <el-button size="small" type="primary" slot="reference" @click="handleUpdate(scope.row)"
                      class="editPrimary">修改</el-button>
                    <el-divider direction="vertical"></el-divider>

                    <el-popconfirm title="确定删除吗？" @onConfirm="handleDelete(scope.row)" onCancel="">
                      <el-button size="small" type="danger" class="editDanger" slot="reference" plain>
                        删除
                      </el-button>
                    </el-popconfirm>
                  </div>
                  <div v-else-if="scope.row.status == '2'">
                    <i style="color: rgb(24, 144, 255)" class="el-icon-loading"></i>
                    创建中
                  </div>
                  <div v-else-if="scope.row.status == '5'">
                    <i style="color: rgb(24, 144, 255)" class="el-icon-loading"></i>
                    配置修改中
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
              @pagination="searchQuery" />
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="课程管理" name="fourth">
        <course-mng-com ref="course-mng-com" :courseId="courseId"></course-mng-com>
      </el-tab-pane>

      <el-tab-pane label="作业管理" name="third">
        <div v-if="activeName == 'third'">
          <el-card class="marginBottom10">
            <el-row class="homework-header flex align-center">
              <el-col :span="2" :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <div>
                  <el-button type="primary" @click="handleAdd">添加作业</el-button>
                </div>
              </el-col>
              <el-col class="" :span="10" :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
                <div class="flex align-center homework-num" v-if="homeNameList && homeNameList.length > 0">
                  <i class="el-icon-caret-left i-hover" :class="isActive == 0 ? 'color333 i-hoverD' : 'primaryColor  '
                    " @click="handleLRArrow('left')" style="font-size: 26px"></i>
                  <div class="choose-container" style="" @scroll="(e) => test(e)">
                    <div id="container" style="flex-wrap: nowrap" class="flex">
                      <div class="choose-item flex flex-column align-center" :class="isActive == index
                          ? item.type == 1
                            ? ' is-active primaryBgColoro primaryColorw'
                            : 'is-active primaryBgColor primaryColorw'
                          : item.type == 1
                            ? 'primaryBgColoro primaryColorw no-active'
                            : 'no-active primaryColor'
                        " v-for="(item, index) in homeNameList" :key="index" @click="(e) => handleDoM(e, index)">
                        <div class="choose-item-container view-text flex flex-column align-center">
                          <el-tooltip style="width: 100%" effect="dark" :content="`${item.homeworkName}\n截止日期：${item.endTime || '--'
                            }`" placement="top-start">
                            <div class="item-text-container flex flex-column justify-center align-center">
                              <div class="view-text container-text">
                                <span v-if="index < 9">0{{ index + 1 }}</span>&nbsp; <span v-else>{{ index + 1
                                  }}</span>&nbsp;
                                <span v-show="isActive == index">{{
                                  item.homeworkName
                                  }}</span>
                              </div>
                              <div class="view-text container-text" v-if="isActive == index">
                                截止日期：{{ item.endTime || "--" }}
                              </div>
                              <div class="edit" @click.stop="editHomework(item)">
                                <i class="el-icon-edit"></i>
                              </div>

                              <div class="delete">
                                <el-popconfirm title="确定删除吗？" @onConfirm="deleteHomework(item)">
                                  <i @click.stop class="el-icon-delete" slot="reference"></i>
                                </el-popconfirm>
                              </div>
                            </div>
                          </el-tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                  <i class="el-icon-caret-right i-hover pointer" :class="isActive == homeNameList.length - 1
                      ? 'color333'
                      : 'primaryColor '
                    " @click="handleLRArrow('right')" style="font-size: 26px"></i>
                </div>
                <div v-else style="width: 10px; height: 10px"></div>
              </el-col>
              <el-col :span="12" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                <div class="flex justify-end homework-detail">
                  <div class="data-count bg1 marginRight10 flex flex-column align-center justify-center" style="">
                    <div class="marginBottom10">作业提交人数</div>
                    <div class="data-count-num">
                      {{
                        (workHomeStatistics &&
                          workHomeStatistics.finishedCount) ||
                        0
                      }}
                    </div>
                  </div>

                  <div class="data-count bg2 marginRight10 flex flex-column align-center justify-center" style="">
                    <div class="marginBottom10">作业提交率</div>
                    <div class="data-count-num">
                      {{
                        (workHomeStatistics &&
                          workHomeStatistics.finishedPercent) ||
                        "0%"
                      }}
                    </div>
                  </div>

                  <div class="data-count bg3 marginRight10 flex flex-column align-center justify-center" style="">
                    <div class="marginBottom10">待批改作业</div>
                    <div class="data-count-num">
                      {{
                        (workHomeStatistics &&
                          workHomeStatistics.unCheckedCount) ||
                        0
                      }}
                    </div>
                  </div>

                  <div class="data-count bg4 marginRight10 flex flex-column align-center justify-center" style="">
                    <div class="marginBottom10">作业批改率</div>

                    <div class="data-count-num">
                      {{
                        (workHomeStatistics &&
                          workHomeStatistics.checkedPercent) ||
                        "0%"
                      }}
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-card>
          <border-container class="marginBottom10 border-container" :height="15" :isShowTitle="false" :isBgShow="false">
            <template #content>
              <div class="" style="padding: 0px 0 0px 10px;">
                <el-row class="homework-header">
                  <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                    <el-col :span="17">
                      <el-form-item label="学生姓名" prop="keyword" class="marginTRL">
                        <el-input class="el-input-edu" v-model="queryParams.keyword" id="keyword" placeholder="请输入学生名称"
                          clearable @keyup.enter="handleHomeWorkListQuery" />
                      </el-form-item>

                      <el-form-item label="班级" prop="className" class="marginTRL">
                        <el-select class="el-input-edu" id="className" v-model="queryParams.className"
                          @change="handleHomeWorkListQuery">
                          <el-option label="全部班级" value=""></el-option>
                          <el-option v-for="item in classNameList" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <!-- <el-form-item label="评价" prop="score" class="marginTRL">
                                                <el-select class="el-input-edu width" id="score" v-model="queryParams.score"
                                                    @change="handleHomeWorkListQuery">
                                                    <el-option label="全部" value=""></el-option>
                                                    <el-option v-for="item in scoreLevelList" :key="item.dictionaryName"
                                                        :label="item.dictionaryName"
                                                        :value="item.dictionaryName"></el-option>
                                                </el-select>
                                            </el-form-item> -->
                      <el-form-item label="作业状态" prop="status" class="marginTRL">
                        <el-select class="el-input-edu width" id="status" v-model="queryParams.status"
                          @change="handleHomeWorkListQuery" placeholder="请选择作业状态">
                          <el-option label="全部" value=""></el-option>
                          <el-option label="未提交" value="0"></el-option>
                          <el-option label="待批改" value="1"></el-option>
                          <el-option label="已完成" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="7">
                      <el-form-item class="marginTRL">
                        <el-button id="" type="success" class="editSuccess" icon="el-icon-search"
                          @click="handleHomeWorkListQuery">搜索</el-button>
                      </el-form-item>

                      <el-form-item class="marginTRL">
                        <el-button type="primary" class="editPrimary" icon="el-icon-refresh"
                          @click="handleResetHomeWorkListQuery('queryFormRef')">重置</el-button>
                      </el-form-item>
                      <el-form-item class="marginTRL">
                        <el-button type="info" class="editInfo" icon="el-icon-download"
                          @click="handleExportHomeWork('queryFormRef')">导出数据</el-button>
                      </el-form-item>
                    </el-col>
                  </el-form>
                </el-row>
              </div>
            </template>
          </border-container>
          <el-card class="marginTop10">
            <el-table class="el-table-edu" v-loading="homeworkLoading" :data="homeworksList" style="width: 100%">
              <el-table-column type="index" label="序号" width="55">
              </el-table-column>
              <el-table-column prop="userName" class-name="primaryColor" label-class-name="color9" show-overflow-tooltip align="center" label="姓名" min-width="90"></el-table-column>
              <el-table-column prop="userAccount" align="center" label="学号" min-width="100" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="className" align="center" label="班级" min-width="100" show-overflow-tooltip>
              </el-table-column>

              <el-table-column prop="title" align="center" label="试卷名称" min-width="150" show-overflow-tooltip>
              </el-table-column>

              <!-- <el-table-column prop="name" align="center" label="练习成果" width="180">
                                <template #default="scope">
                                    <el-button size="mini" type="info" :disabled="true"
                                        v-if="scope.row.completionStatus == 0">打开</el-button>
                                    <el-button size="mini" type="success" class="editSuccess" v-else
                                        @click="openHomework(scope.row)">打开</el-button>
                                </template>
                            </el-table-column> -->
              <el-table-column prop="completionStatus" label="作业状态" align="center" width="80">
                <template #default="scope">
                  <el-tag type="warning" v-if="scope.row.completionStatus == 1">待批改</el-tag>
                  <el-tag type="success" v-else-if="scope.row.completionStatus == 2">已完成</el-tag>
                  <el-tag type="danger" v-else>未提交</el-tag>
                </template>
              </el-table-column>
              <el-table-column sortable prop="score" label="评分" align="center" min-width="80">
                <template #default="scope">
                  <span v-if="scope.row.score == null">- - -</span>
                  <span v-else>{{ scope.row.score }}</span>
                </template>
              </el-table-column>

              <el-table-column prop="suggestion" label="批改建议" align="center"  min-width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="submitTime" align="center" label="提交时间" min-width="150" show-overflow-tooltip></el-table-column>

              <el-table-column label="操作" align="center" min-width="80" fixed="right">
                <template #default="scope">
                  <el-button size="small" type="info" :disabled="true" v-if="scope.row.completionStatus == 0"
                    @click.stop="">批改</el-button>
                  <el-button size="small" type="primary" class="editPrimary" v-else
                    @click.stop="handleCorrention(scope)">批改</el-button>
                </template>
              </el-table-column>
            </el-table>

            <pagination v-show="homewrkTotal > 0" :total="homewrkTotal" :page.sync="listHomeworkQuery.page"
              :limit.sync="listHomeworkQuery.limit" @pagination="searchHomeoworkQuery" />
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="实验管理" name="fifth">
        <course-lab ref="course-lab" :courseId="courseId" :vmExist="courseObj.vmExist"></course-lab>
      </el-tab-pane>
      <el-tab-pane label="课程资料" name="second">
        <div v-if="activeName == 'second'">
          <el-card>
            <template #header>
              <el-button type="primary" icon="el-icon-plus" @click="openFileDialog">上传文件</el-button>
            </template>
            <el-table :data="labsList" style="width: 100%">
              <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
              <el-table-column prop="displayName" label="文件名称" min-width="180" align="center">
              </el-table-column>
              <el-table-column prop="remark" label="描述" min-width="180" align="center">
              </el-table-column>
              <el-table-column prop="createAt" label="创建时间" align="center" min-width="180">
              </el-table-column>
              <!-- <el-table-column prop="remark" label="备注" align="center" min-width="180">
                        </el-table-column> -->
              <el-table-column label="操作" align="center" min-width="180" fixed="right">
                <template #default="scope">
                  <el-button :disabled="!isfileTypesCanShow[scope.row.fileSuffix]" size="small" type="success"
                    class="editSuccess" slot="reference" @click.stop="handleOpen(scope.row)">
                    查看
                  </el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-button size="small" type="primary" class="editPrimary" slot="reference"
                    @click.stop="handleUpdateResourse(scope.row)">
                    修改
                  </el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-button size="small" type="info" class="editInfo" slot="reference"
                    @click.stop="handleDownload(scope.row)">
                    下载
                  </el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-popconfirm title="确定删除吗？" @onConfirm="handleDeleteCourseSource(scope.row)" onCancel="">
                    <el-button size="small" type="danger" class="editDanger" slot="reference">
                      删除
                    </el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-dialog :title="dialogSourse.title" :visible.sync="dialogSourse.visible" @close="cancelSourse">
            <iframe :src="pdfUrl" frameborder="0" style="z-index: 1000; height: 560px; width: 100%"></iframe>
          </el-dialog>

          <upload-file-dialog :updateFileInfo="updateFileInfo" :dialogStatus="dialogStatus" :loadding="fileUpLoading"
            ref="upload-file-dialog" @doUpload="doUpload" @handleClose="handleClose"
            :fileDialogVisible="fileDialogVisible" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="讨论区" name="six">
        <div v-if="activeName == 'six'">
          <reply :courseId="courseId" />
        </div>
      </el-tab-pane>
    </el-tabs>
    <home-work-dialog ref="home-work-dialog" @submitForm="submitFormHomeWork" :homeworkSubLoading="homeworkSubLoading"
      :dialog="dialog" @cancelHomeWork="cancel"></home-work-dialog>

    <el-dialog title="批改作业" :visible.sync="homeworkDialog.visible" @close="cancelHomework" width="500px">
      <el-form ref="homeworkForm" :model="homeworkForm" :rules="homeworkRules" label-width="80px">
        <el-form-item label="作业打分" prop="score">
          <el-select v-model="homeworkForm.score" id="score" placeholder="请选择等级">
            <el-option v-for="item in scoreLevelList" :key="item.dictionaryName" :label="item.dictionaryName"
              :value="item.dictionaryName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="批改建议" id="suggestion" prop="suggestion">
          <el-input type="textarea" v-model="homeworkForm.suggestion" maxlength="200" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelHomework">取 消</el-button>
        <el-button type="primary" @click="submitHomeworkForm('homeworkForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="fileDialog.title" :visible.sync="fileDialog.visible" @close="cancelfileDialog" class="dialog"
      width="50vw">
      <el-card>
        <file-List ref="fileTable" :isShow="false" :filesList="filesList" @load="load"
          @handleSelectionChange="handleSelectionChange" :height="400">
          <template slot="table-column">
            <el-table-column prop="fileName" label="文件名" min-width="180">
              <template #default="scope">
                <i :class="scope.row.dir ? 'el-icon-folder' : 'el-icon-document'"></i>
                &nbsp;{{ scope.row.fileName }}
              </template>
            </el-table-column>
            <el-table-column label="大小" align="center" prop="size"></el-table-column>
            <el-table-column label="修改时间" align="center" prop="lastModifyTime"></el-table-column>
            <el-table-column label="操作" align="center" fixed="right" min-width="180">
              <template #default="scope">
                <el-popconfirm title="确定删除吗？" @onConfirm="handleDeleteFile(scope.row)">
                  <el-button size="small" type="danger" slot="reference">删除</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </template>
        </file-List>
      </el-card>
    </el-dialog>
    <el-dialog title="手动创建" :visible.sync="userDialog.visible" @close="cancelAddUser" class="dialog" width="50vw">
      <el-card class="searchBarCard">
        <el-form ref="queryKeyFormRef" :model="queryKeyParams" :inline="true">
          <el-form-item label="" prop="keyWord">
            <el-input v-model="queryKeyParams.keyWord" id="keyWord" placeholder="请输入姓名或者学号" clearable
              @keyup.enter="queryUncheckedUserByKeyWord" />
          </el-form-item>

          <el-form-item>
            <el-button type="success" class="editSuccess" icon="el-icon-search"
              @click="queryUncheckedUserByKeyWord">搜索</el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="editPrimary" icon="el-icon-search"
              @click="resetKeyQuery('queryKeyFormRef')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card>
        <el-table border class="el-table-edu" :data="unCheckList" style="width: 100%" height="300"
          @selection-change="handleUnCheckSelectionChange">
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column prop="userName" label="姓名" align="center" min-width="180">
          </el-table-column>
          <el-table-column prop="studentNum" align="center" label="学号" min-width="180">
          </el-table-column>
          <el-table-column prop="phone" align="center" label="手机号" min-width="180">
          </el-table-column>
        </el-table>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddUser">取 消</el-button>
        <el-button type="primary" @click="submitAdd()" :loading="createLoadding">创建</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';
import Pagination from "@/components/Pagination";
import FileList from "@/components/FileList";
import StudentList from "./components/StudentList";
import BorderContainer from "@/components/BorderContainer";
import isfileTypesCanShow from "@/utils/filesTyps";
import UploadFileDialog from "@/components/UploadFileDialog";
import CourseLab from "./components/CourseLab/index.vue";

import {
  addHomework,
  getAllHomeworks,
  mark,
  submitHomework,
  listFile,
  deleteFiles,
  getHomeworkStatistics,
  exportHomeworkList,
  deleteHomework,
  editHomework,
} from "@/api/edu/job";

import {
  getCourseDetailById,
  getCourseList,
  getHomeworkList,
  getScoreLevel,
  getCourseUserPage,
} from "@/api/edu/course";

import {
  addUser2Course,
  removeStudent,
  exportStudentExcel,
} from "@/api/edu/student";
import {
  getClassNameForHomeWork,
  getCourseUserNoVm,
  addUserCounts,
  delCourse,
  delCourseRourceById,
} from "@/api/edu/courseDetail";
import {
  poweroff,
  poweron,
  reboot,
  suspend,
  getVmsByCurrentUserForPage,
  deleteVMs,
} from "@/api/edu/cloud";

import {
  uploadRourse,
  updateResource,
  maxFileUploadSize,
  getOenList,
  deleteLabById,
} from "@/api/edu/courseRourse";

const POWERSTATE = {
  poweredOn: {
    text: "运行中",
    icon: "el-icon-success",
    color: "#319400",
  },
  poweredOff: {
    text: "关机",
    icon: "el-icon-remove",
    color: "#f5222d",
  },
  suspended: {
    text: "挂起",
    icon: "el-icon-info",
    color: "#faad14",
  },
};
import { checkPermission } from "@/utils/validate";
import HomeWorkDialog from "./components/HomeWorkDialog.vue";
import CourseMngCom from "./components/CourseMngCom.vue";
import Reply from "./components/Reply";

export default {
  //import 引入的组件需要注入到对象中才能使用
  name: "courseMng",
  components: {
    Pagination,
    FileList,
    StudentList,
    BorderContainer,
    UploadFileDialog,
    HomeWorkDialog,
    CourseMngCom,
    CourseLab,
    Reply,
  },
  props: {},
  data() {
    return {
      vmsList: [], //实操云列表
      isRequestVmStatus: false,
      requestTime: 30000, //时间周期30s
      POWERSTATE: POWERSTATE,
      isfileTypesCanShow: isfileTypesCanShow,
      courseList: [],
      total: 0,
      homewrkTotal: 0,
      listQuery: {
        page: 1,
        limit: 10,
        params: "",
      },

      queryEnvParams: {
        vmName: "",
      },
      listHomeworkQuery: {
        page: 1,
        limit: 10,
        params: "",
      },
      queryParams: {
        keyword: "",
        score: "",
        className: "",
        status: "",
      },
      queryKeyParams: {
        keyWord: "",
      },
      pdfUrl: "",
      dialog: {
        visible: false,
        status: "create",
      },
      userDialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "",
        create: "创建",
        look: "查看告警推送规则",
      },
      loading: false,

      activeName: "zero",

      isActive: 0,
      courseId: 0, //课程id
      courseObj: {},

      homeNameList: [],
      cyrrentHomework: "",
      homeworksList: [],
      homeWorkParams: {
        homeworkId: "",
        page: "",
        limit: "",
        keyword: "",
        score: "",
        className: "",
        status: "",
      },
      workHomeStatistics: {},
      className: "",

      labsList: [],
      scoreLevelList: [],
      classNameList: [],

      dialogSourse: {
        visible: false,
        title: "",
      },
      homeworkDialog: {
        visible: false,
      },
      homeworkForm: {
        homeworkMarkId: "",
        score: "",
        suggestion: "",
      },
      homeworkRules: {
        score: [{ required: true, message: "请选择等级", trigger: "blur" }],
      },
      filesList: [],
      fileDialog: {
        title: "",
        visible: false,
      },
      unCheckList: [],
      unCkeckUserInfo: [],
      createLoadding: false,
      deleteLoading: false,

      stutotal: 0,
      studentList: [],
      listStuQuery: {
        page: 1,
        limit: 10,
        params: "",
      },

      stuDialog: false,
      treeObj: {},
      homeworkPath: "",

      homeworkLoading: false,
      homeworkSubLoading: false,
      exportloading: false,

      fileDialogVisible: false,
      fileUpLoading: false,
      dialogStatus: "create",
      updateFileInfo: {},

      multipleVmSelection: [],
      maxUserCounts: 0,
      maxDisk: 0,

      isStatus: true, //是否可以批量修改

      homeworkId: "",
    };
  },
  watch: {
    isRequestVmStatus: {
      handler(newValue, oldValue) {
        console.log("isRequestVmStatus", newValue, "触发");
        //状态为true时，开始计时，判断计时器，是否需要取消
        if (newValue) {
          this.watchVmStatusAndRequest();
        }else {
          console.log("取消请求");
        }
      },
    },
  },
  computed: {},
  created() {
    this.homeworkId = this.$route.query.homeworkId;
    this.courseId = Number(this.$route.query.id);
    this.queryCourseDetailById(this.courseId);

    if (this.homeworkId && this.courseId) {
      this.activeName = "third";

      this.queryScoreLevel();
      this.queryClassNameForHomeWork();
      this.queryHomeWorksNum();
    }

    this.initParams();
    this.getList();
    this.handleStuQuery();
  },
  methods: {
    //监测实操云创建状态
    watchVmStatusAndRequest() {
      var time = setTimeout(() => {
        if (time) {
          clearTimeout(time);
        }
        this.isRequestVmStatus = false;
        this.getList(); //计时开始
      }, this.requestTime);
    },

    //批量修改
    handleVmSelectionChange(val) {
      let maxCounts = 0;
      let maxDisk = 0;
      let vmIds = [];
      let isStatus = true;
      val &&
        val.length > 0 &&
        val.map((item) => {
          if (item.maxUserCounts > maxCounts) {
            maxCounts = item.maxUserCounts;
          }

          if (item.disk > maxDisk) {
            maxDisk = Number(item.disk / 1024);
          }
          vmIds.push(item.vmId);

          if (item.status != 0) {
            isStatus = false;
            this.isStatus = isStatus;
            return;
          }
        });

      this.maxUserCounts = maxCounts;
      this.maxDisk = maxDisk;
      this.multipleVmSelection = vmIds;
    },

    //批量修改
    handleVms() {
      if (!this.isStatus) {
        this.$message.error("实操云环境配置未完成");
        return;
      }
      this.$router.push({
        path: "/classMng/createEnvironment",
        query: {
          maxDisk: this.maxDisk,
          maxUserCounts: this.maxUserCounts,
          courseId: this.courseId,
          vmIds: this.multipleVmSelection,
        },
      });
    },

    /**
     * 删除作业
     */
    deleteHomework(item) {
      deleteHomework(item.id).then((res) => {
        if (res && res.flag) {
          this.$message.success("删除成功");
          this.homeworkId = "";
          this.queryHomeWorksNum();
        }
      });
    },

    /**
     * 修改作业
     */

    editHomework(item) {
      this.homeworkId = item && item.id;
      this.dialog = {
        visible: true,
        status: "update",
      };
      this.$refs["home-work-dialog"].form = {
        type: item.type,
        time: [item.startTime, item.endTime],
        homeworkName: item.homeworkName,
      };
    },

    handleDownload() {
      if (this.dateTime == null) {
        this.initTime();
      }
      let params = {
        sensorId: this.sensorId,
        startTime: this.dateTime[0],
        endTime: this.dateTime[1],
      };
      this.$message("数据正在下载");
    },

    exportStu(queryParams) {
      let courseId = this.courseId;
      let data = {
        courseId,
        ...queryParams,
      };
      this.exportloading = true;
      exportStudentExcel(data)
        .then((res) => {
          if (res && res.size === 0) {
            this.$message.success("当前数据为空");
            return;
          }
          const blob = new Blob([res.data], {
            type: "application/vnd.ms-excel;charset=utf-8",
          }); // 构造一个blob对象来处理数据，并设置文件类型

          let fileName = decodeURI(res.headers["content-disposition"]);

          if (fileName) {
            fileName = fileName.substring(fileName.indexOf("=") + 8);
          }
          const href = URL.createObjectURL(blob); //创建新的URL表示指定的blob对象
          const a = document.createElement("a"); //创建a标签
          a.style.display = "none";
          a.href = href; // 指定下载链接
          a.download = fileName; //指定下载文件名
          document.body.appendChild(a);
          a.click(); //触发下载
          URL.revokeObjectURL(a.href); //释放URL对象
          document.body.removeChild(a);
          this.$message.success("下载成功");
          setTimeout(() => {
            this.exportloading = false;
          }, 2000);
        })
        .finally(() => {
          this.exportloading = false;
        });
    },
    //删除课程
    handleDeleteCourse() {
      let id = this.courseId;

      this.$confirm(
        "删除课程后会同步删除实操云环境及其所有数据，无法恢复，请慎重选择！",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$message.success("课程删除中，请稍后");
          this.deleteLoading = true;
          delCourse({ id })
            .then((res) => {
              if (res && res.flag) {
                this.$message.success("删除成功");
                this.deleteLoading = false;
                this.$router.back();
              }
            })
            .finally(() => {
              this.deleteLoading = false;
            });
        })
        .catch(() => { });
    },

    submitAdd() {
      let userCounts = this.unCkeckUserInfo;
      let courseId = this.courseId;
      let params = {
        userCounts,
        courseId,
      };
      this.createLoadding = true;
      addUserCounts(params)
        .then((res) => {
          if (res && res.flag) {
            this.createLoadding = false;
            this.$message.success("手动创建成功");
            this.userDialog.visible = false;
            this.getList();
          }
        })
        .finally(() => {
          this.createLoadding = false;
        });
    },
    //选择未添加的用户，创建实操云
    handleUnCheckSelectionChange(row) {
      let userInfo = [];
      row.map((i) => {
        const { id, userName, phone } = i;
        let item = {
          userId: id,
          usernameZh: userName,
          phone: phone,
        };
        userInfo.push(item);
      });
      this.unCkeckUserInfo = userInfo;
    },
    cancelAddUser() {
      let _this = this;
      let dialog = {
        visible: false,
      };
      _this.userDialog = dialog;
      _this.unCheckList = [];
      _this.$refs.queryKeyFormRef.resetFields();
    },
    queryUncheckedUserByKeyWord() {
      let keyWord = this.queryKeyParams.keyWord;
      this.queryUncheckedUser(keyWord);
    },
    resetKeyQuery(formName) {
      this.queryUncheckedUser();
      this.$refs[formName].resetFields();
    },
    //
    async queryUncheckedUser(keyWord) {
      let courseId = this.courseId;
      const res = await getCourseUserNoVm({ courseId, keyWord });
      let resData = res && res.resData;
      this.unCheckList = resData;
    },
    //
    handleAddUser() {
      let isLicenseEnabled = this.$store.state.user.isLicenseEnabled;
      if (!isLicenseEnabled) {
        this.$message.warning("抱歉，系统已过期，需联系官方工作人员续费");
        return;
      }
      let _this = this;
      let dialog = {
        visible: true,
      };
      _this.userDialog = dialog;
      _this.queryUncheckedUser();
    },
    //
    handleDownload(row) {
      fetch(row.filePath)
        .then((res) => res.blob())
        .then((blob) => {
          // 将链接地址字符内容转变成blob地址
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = row.displayName; // 下载文件的名字
          // a.download = row.fileName;  // 下载文件的名字
          document.body.appendChild(a);
          a.click();
        });
    },

    goToEnvDetail(id) {
      this.$router.push({ path: "/classMng/cloudEnvDetail", query: { id } });
    },
    //打开
    handleOpen(row) {
      this.dialogSourse.visible = true;
      this.pdfUrl = row.filePath;
    },
    cancelSourse() {
      this.dialogSourse.visible = false;
      this.pdfUrl = "";
    },

    async handleDeleteCourseSource(row) {
      let id = row && row.id;
      const res = await delCourseRourceById({ id });
      if (res && res.flag) {
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.queryOenList();
      } else {
        this.$message({
          type: "error",
          message: "删除失败!",
        });
      }
    },
    //获取班级
    async queryClassNameForHomeWork() {
      const res = await getClassNameForHomeWork();
      this.classNameList = res.resData;
    },
    //获取等级
    async queryScoreLevel() {
      const res = await getScoreLevel();
      this.scoreLevelList = res && res.resData;
    },

    async handleDelete(row) {
      const { vmId, userCountsIds } = { ...row };
      const userId = this.$store.state.user.userId;
      let userList = [];
      let index = userCountsIds.indexOf(",");
      let msg =
        "删除实操云会同步删除该实操云中的所有数据，无法恢复，请慎重选择！";
      if (index != -1) {
        userList = userCountsIds && userCountsIds.split(",");
        userList &&
          userList.length > 0 &&
          userList.map((i) => {
            if (userId == i) {
              msg =
                "该实操云包含当前老师账号，若删除该实操云，该实操云中的所有数据将全部删除，无法恢复，请慎重选择！";
              return;
            }
          });
      }

      this.$confirm(msg, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          deleteVMs([vmId]).then((res) => {
            if (res && res.flag) {
              setTimeout(() => {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.loading = false;
                this.handleQuery({});
              }, 3000);
            } else {
              this.loading = false;
            }
          });
        })
        .catch(() => { });
    },
    //

    handleUpdateResourse(item) {
      let updateFileInfo = {
        id: item.id,
        displayName: item.displayName,
        remark: item.remark,
      };
      this.updateFileInfo = updateFileInfo;
      this.dialogStatus = "update";
      this.fileDialogVisible = true;
    },
    //
    openFileDialog() {
      this.dialogStatus = "create";
      this.fileDialogVisible = true;
    },
    handleClose() {
      this.fileDialogVisible = false;
      this.fileUpLoading = false;
      let updateFileInfo = {
        id: "",
        displayName: "",
        remark: "",
      };
      this.updateFileInfo = updateFileInfo;
    },

    doUpload(item) {
      let FormDatas = new FormData();
      FormDatas.append("file", item.file);
      FormDatas.append("courseId", this.courseId);
      uploadRourse(FormDatas).then((res) => {
        let resData = res.resData;
        if (res.flag && resData) {
          this.queryOenList();
        } else {
          this.$message.error("上传图片出错");
        }
      });
    },

    async doUpload(form) {
      this.fileUpLoading = true;
      let dialogStatus = this.dialogStatus;
      if (dialogStatus == "create") {
        const isLt5M = form && form.file && form.file.size / 1024 / 1024;
        const res = await maxFileUploadSize();
        if (res && res.flag) {
          let resData = res && res.resData;
          let resDataMb = resData && resData.MB;
          if (resDataMb < isLt5M) {
            this.$message.error(`上传文件大小不能超过 ${resDataMb}MB!`);
          } else {
            let FormDatas = new FormData();
            FormDatas.append("file", form.file);
            FormDatas.append("courseId", this.courseId);
            FormDatas.append("fileRename", form.fileRename);
            FormDatas.append("remark", form.remark);
            uploadRourse(FormDatas).then((res) => {
              let resData = res.resData;
              if (res && res.flag && resData) {
                this.$message.success("上传成功");
                this.handleClose();
                this.queryOenList();
              } else {
                this.$message.error("上传出错");
              }
            });
          }
        } else {
          return false;
        }
      } else {
        const { id } = this.updateFileInfo;
        const { fileRename, remark } = form;
        let data = {
          id,
          displayName: fileRename,
          remark: remark,
        };
        updateResource(data).then((res) => {
          if (res && res.flag) {
            this.$message.success("修改成功");
            this.handleClose();
            this.queryOenList();
          } else {
            this.$message.error("修改失败");
          }
        });
      }
    },

    queryOenList() {
      this.loading = true;

      getOenList({ courseId: this.courseId }).then((reponse) => {
        let resData = reponse.resData;
        this.labsList = resData;
        // this.total = resData.total;
        this.loading = false;
      });
    },

    handleHomeWorkListQuery() {
      this.queryHomeworkList();
    },

    handleResetHomeWorkListQuery(formName) {
      this.$refs[formName].resetFields();
      this.listHomeworkQuery.page = 1;
      this.queryHomeworkList();
    },
    handleExportHomeWork(formName) {
      let homeworkId = this.homeworkId;
      this.homeWorkParams = { homeworkId, ...this.queryParams };
      exportHomeworkList(this.homeWorkParams).then((res) => {
        if (res && res.size === 0) {
          this.$message.success("当前数据为空");
          return;
        }
        const blob = new Blob([res.data], {
          type: "application/vnd.ms-excel;charset=utf-8",
        }); // 构造一个blob对象来处理数据，并设置文件类型

        let fileName = decodeURI(res.headers["content-disposition"]);

        if (fileName) {
          fileName = fileName.substring(fileName.indexOf("=") + 1);
        }
        const href = URL.createObjectURL(blob); //创建新的URL表示指定的blob对象
        const a = document.createElement("a"); //创建a标签
        a.style.display = "none";
        a.href = href; // 指定下载链接
        a.download = fileName; //指定下载文件名
        document.body.appendChild(a);
        a.click(); //触发下载
        URL.revokeObjectURL(a.href); //释放URL对象
        document.body.removeChild(a);
        this.$message.success("下载成功");
      });
    },
    // initParams() {
    //     let listQuery = {
    //         page: 1,
    //         limit: 10,
    //         params: {},
    //     };
    //     this.listQuery = listQuery;
    // },
    // searchQuery(e) {
    //     this.listQuery.page = e.page;
    //     this.listQuery.limit = e.limit;
    //     this.getList();
    // },
    //
    searchHomeoworkQuery(e) {
      this.listHomeworkQuery.page = e.page;
      this.listHomeworkQuery.limit = e.limit;
      this.queryHomeworkList();
    },
    async queryHomeworkList() {
      let homeworkId = this.homeworkId;
      //this.homeWorkParams = { homeworkId, ...this.queryParams }
      this.listHomeworkQuery.params = { homeworkId, ...this.queryParams };
      this.homeworkLoading = true;
      const res1 = await getHomeworkList(this.listHomeworkQuery); //查询初始作业列表
      this.homeworksList = res1.resData.list;
      this.homeworkLoading = false;
      this.homewrkTotal = res1 && res1.resData.total;
      // const { className } = this.queryParams
      // if (className) {
      //     let data = {
      //         className,
      //         homeworkId,
      //         courseId: this.courseId
      //     }
      //     this.className = className
      //     const res = await getHomeworkStatistics(data)
      //     this.workHomeStatistics = res.resData

      // } else {
      //     this.className = ''
      // }
    },
    //
    async queryHomeworksStatuistics(homeworkId, className) {
      let data = {
        courseId: this.courseId,
        homeworkId,
        className,
      };
      await getHomeworkStatistics(data);
    },
    //
    handleClick(tab, event) {
      let activeName = tab.name;
      if (activeName === "first") {
        this.initParams();
        this.getList();
      } else if (activeName === "second") {
        this.queryOenList();
      } else if (activeName === "third") {
        this.queryScoreLevel();
        this.queryClassNameForHomeWork();
        this.queryHomeWorksNum();
        this.isActive = 0;
      } else if (activeName === "zero") {
        this.handleStuQuery();
      } else if (activeName === "fourth") {
        this.$refs["course-mng-com"].queryChapterList();
      } else if (activeName === "fifth") {
        this.queryCourseDetailById(this.courseId)
        let courseLab = this.$refs["course-lab"];
        courseLab.queryCourses();
        courseLab.handleQuery();
        courseLab.queryCreateBy();

      }
    },
    //
    goToDetail() {
      let isLicenseEnabled = this.$store.state.user.isLicenseEnabled;
      if (!isLicenseEnabled) {
        this.$message.warning("抱歉，系统已过期，需联系官方工作人员续费");
        return;
      }
      let courseId = this.courseId;
      this.$router.push({
        path: "/classMng/createEnvironment",
        query: {
          courseId,
        },
      });
    },
    //根据课程id获取作业数
    async queryHomeWorksNum() {
      let courseId = this.courseId;
      let homeworkId = this.homeworkId;
      const res = await getAllHomeworks({ courseId });
      let resData = res.resData;
      if (!homeworkId) {
        this.isActive = 0;
        homeworkId = resData && resData[0] && resData[0].id;
      } else {
        resData &&
          resData.length > 0 &&
          resData.map((item, index) => {
            if (item.id == homeworkId) {
              this.isActive = index;
            }
          });
      }

      if (!homeworkId) {
        this.homeworkId = "";
        this.listHomeworkQuery.params = { homeworkId };
        const res2 = await getHomeworkList(this.listHomeworkQuery); //查询初始作业列表
        this.homeworksList = res2 && res2.resData && res2.resData.list;
        this.homewrkTotal = res2 && res2.resData.total;
        this.workHomeStatistics = {};
        this.homeNameList = resData;
        return;
      } else {
        this.homeworkId = homeworkId;
        this.listHomeworkQuery.params = { homeworkId };
        const res2 = await getHomeworkList(this.listHomeworkQuery); //查询初始作业列表
        this.homeworksList = res2 && res2.resData && res2.resData.list;
        this.homewrkTotal = res2 && res2.resData.total;
        const res1 = await getHomeworkStatistics({ courseId, homeworkId });
        this.workHomeStatistics = res2 && res1 && res1.resData;
        this.homeNameList = resData;
      }
    },
    //查询课程信息
    async queryCourseDetailById(id) {
      const res = await getCourseDetailById({ id });
      if (res && res.flag) {
        this.courseObj = res.resData;
      }
    },
    test(e) {
      console.log(e.target.scrollLeft);
    },

    createVm() {
      let courseId = this.courseId;
      this.$router.push({
        path: "/classMng/createEnvironment",
        query: { courseId },
      });
    },

    // 点击切换作业次数
    radioChange(e) { },
    //homenamelist

    handleHomeNameListItem(index) {
      let homeNameList = this.homeNameList;
      return (homeNameList && homeNameList[index].id) || 0;
    },
    async handleDoM(e, index) {
      // 父级元素滚动距离 判断当前元素位置，是不是在容器的1/2
      // 几个元素 6*80 + 120
      // 距离左边的距离为 index * 80 + 60 - 200
      this.isActive = index;
      // console.log(e.target.parentNode.parentNode.parentNode.scrollLeft = index * 80 + 60 - 200);
      this.homeworkId = this.handleHomeNameListItem(index);
      let courseId = this.courseId;
      const res1 = await getHomeworkStatistics({
        courseId,
        homeworkId: this.homeworkId,
      });
      this.workHomeStatistics = res1.resData;
      this.handleHomeWorkListQuery();
      let node = document.getElementById("container");
      node.parentNode.scrollLeft = index * 80 + 100 - 200;
    },
    async handleLRArrow(str) {
      let index = this.isActive;
      let node = document.getElementById("container");
      node.parentNode.scrollLeft = index * 80 + 120 - 200;
      if (str == "left") {
        if (index > 0) {
          this.isActive--;
        } else {
          return;
        }
      } else {
        let length = this.homeNameList && this.homeNameList.length - 1;
        if (index < length) {
          this.isActive++;
        } else {
          return;
        }
      }
      this.homeworkId = this.handleHomeNameListItem(this.isActive);
      let courseId = this.courseId;
      const res1 = await getHomeworkStatistics({
        courseId,
        homeworkId: this.homeworkId,
      });
      this.workHomeStatistics = res1.resData;
      this.handleHomeWorkListQuery();
    },
    //修改课程
    updataCourse() {
      let _this = this;

      let dialog = {
        status: "update",
        visible: true,
      };
      _this.dialog = dialog;
    },

    initParams() {
      let listQuery = {
        page: 1,
        limit: 10,
        params: {},
      };
      this.listQuery = listQuery;
    },
    searchQuery(e) {
      this.listQuery.page = e.page;
      this.listQuery.limit = e.limit;
      this.getList();
    },
    async getList() {
      this.loading = true;
      let listQuery = this.listQuery;
      listQuery.params.groupId = this.courseId;
      const reponse = await getVmsByCurrentUserForPage(listQuery);

      const res = await getCourseList(this.listQuery);
      let courseList = res.resData;
      let resData = reponse.resData;
      let vmsList = resData.result;
      vmsList.map((item) => {
        courseList.map((i) => {
          if (i.id == item.groupId) {
            item.groupName = i.name;
          }
        });
        let status = item.status;
        let setInter = this.setInter;
        let isRequestVmStatus = this.isRequestVmStatus;
        if ((status == "2" || status == "5") && !isRequestVmStatus) {
          this.isRequestVmStatus = true;
        }

        const userCountsIds = item.userCountsIds.split(",");
        item.isTeacher = userCountsIds.indexOf(item.userId);
      });
      this.courseList = courseList;
      this.vmsList = vmsList;
      this.total = resData.total;
      this.loading = false;
    },
    submitFormHomeWork(form) {
      this.homeworkSubLoading = true;
      form.courseId = this.courseId;
      if (this.dialog.status == "update") {
        form.id = this.homeworkId;
        editHomework(form)
          .then((reponse) => {
            if (reponse && reponse.flag) {
              this.dialog.visible = false;
              this.$message.success("修改成功");
              this.queryHomeWorksNum();
              this.homeworkSubLoading = false;
              this.$refs["home-work-dialog"].initForm();
            }
          })
          .finally(() => {
            this.homeworkSubLoading = false;
          });
      } else {
        addHomework(form)
          .then((reponse) => {
            if (reponse && reponse.flag) {
              this.dialog.visible = false;
              this.$message.success("添加成功");
              this.queryHomeWorksNum();
              this.homeworkSubLoading = false;
              this.$refs["home-work-dialog"].initForm();
            }
          })
          .finally(() => {
            this.homeworkSubLoading = false;
          });
      }
    },
    submitForm(text) {
      this.$refs[text].validate((valid) => {
        this.form.courseId = this.courseId;
        this.form.homeworkName = this.form.homeworkName.trim();
        if (valid) {
          if (this.dialog.status == "update") {
          } else if (this.dialog.status == "create") {
            this.homeworkSubLoading = true;
          }
        }
      });
    },
    cancel() {
      let _this = this;
      let dialog = {
        visible: false,
      };
      _this.dialog = dialog;
      _this.$refs["home-work-dialog"].initForm();
      // _this.$refs['home-work-dialog'].form.resetFields();
      // console.log(_this.$refs['home-work-dialog']);
    },
    handleQuery() {
      this.listQuery.params = this.queryEnvParams;
      this.getList();
    },
    //重置搜索条件
    resetQuery(formName) {
      this.getList();
      this.listQuery.page = 1;
      this.$refs[formName].resetFields();
    },
    handleAdd() {
      let isLicenseEnabled = this.$store.state.user.isLicenseEnabled;
      if (!isLicenseEnabled) {
        this.$message.warning("抱歉，系统已过期，需联系官方工作人员续费");
        return;
      }
      let _this = this;

      let dialog = {
        status: "create",
        visible: true,
      };
      _this.dialog = dialog;
      this.$refs["home-work-dialog"].getList();
      // _this.queryHomeWorksNum()
    },

    handleUpdate(row) {
      let id = row.vmId;
      this.$router.push({ path: "/classMng/createEnvironment", query: { id } });
    },

    handlePowerStatus(row) {
      if (row.powerState == "poweredOn") {
        this.handleOff(row);
      } else {
        this.handlePoweron(row);
      }
    },
    //    poweroff,
    // poweron,
    // reboot,
    handlePoweron(row) {
      let data = {
        id: row.vmId,
        hostName: row.hostName,
      };
      this.$confirm(
        "多用户使用的云服务器，对云服务器的电源操作会影响到所有用户",
        "确定开机吗？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.loading = true;
          poweron(data).then((res) => {
            if (res && res.flag) {
              this.$message({
                type: "success",
                message: "云服务器已开机!",
              });
              this.getList();
            } else {
              this.loading = false;
            }
          });
        })
        .catch(() => { });
    },
    reboot(row) {
      let vmID = row.vmId;
      this.$confirm(
        "多用户使用的云服务器，对云服务器的电源操作会影响到所有用户",
        "确定重启吗？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.loading = true;
          reboot({ id: vmID }).then((res) => {
            if (res && res.flag) {
              this.$message({
                type: "success",
                message: "云服务器正在重启!",
              });
              this.getList();
            } else {
              this.loading = false;
            }
          });
        })
        .catch(() => { });
    },
    handleOff(row) {
      let vmID = row.vmId;

      this.$confirm(
        "多用户使用的云服务器，对云服务器的电源操作会影响到所有用户",
        "确定关机吗？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.loading = true;
          poweroff({ id: vmID }).then((res) => {
            if (res && res.flag) {
              this.$message({
                type: "success",
                message: "云服务器已关机!",
              });
              this.getList();
            } else {
              this.loading = false;
            }
          });
        })
        .catch(() => { });
    },
    cancelHomework() {
      let _this = this;
      let dialog = {
        visible: false,
      };
      _this.homeworkDialog = dialog;
      this.homeworkForm.homeworkMarkId = "";
    },
    handleHomework(row) {
      let _this = this;
      let dialog = {
        visible: true,
      };
      _this.homeworkDialog = dialog;
      this.homeworkForm = Object.assign({}, row);
      this.homeworkForm.homeworkMarkId = row.id;
    },

    handleCorrention(obj) {
      const courseName = this.courseObj.name;
      let { $index } = obj;
      const homeworkId = this.homeworkId;
      const {
        id,
        paperId,
        userId,
        userName,
        className,
        userAccount,
        startTime,
        endTime,
      } = obj && obj.row;
      const { page, limit } = this.listHomeworkQuery;
      let total = this.homewrkTotal;
      $index = $index + 1;
      let courseId = this.courseId;
      let objs = {
        $index,
        page,
        limit,
        total,
        id,
        paperId,
        userId,
        userName,
        homeworkId,
        courseId,
        courseName,
        className,
        userAccount,
        startTime,
        endTime,
      };

      objs = JSON.stringify(objs);
      objs = encodeURI(objs);
      this.$router.push({
        path: "/classMng/correctionHomeWork",
        query: { obj: objs },
      });
    },
    submitHomeworkForm(text) {
      this.$refs[text].validate((valid) => {
        if (valid) {
          mark(this.homeworkForm).then((reponse) => {
            if (reponse && reponse.flag) {
              this.homeworkDialog.visible = false;
              this.$message.success("批改成功");
              this.queryHomeworkList();
            }
          });
        }
      });
    },
    openHomework(row) {
      let _this = this;
      let dialog = {
        title: `${row.userName}的作业`,
        visible: true,
      };
      _this.filesList = [];
      let works = this.homeNameList;
      let vmId = "";
      works.map((item) => {
        if (this.homeworkId == item.id) {
          vmId = item.vmId;
          this.vmId = vmId;
        }
      });
      this.homeworkPath = row.homeworkPath;
      listFile({ id: vmId, path: row.homeworkPath }).then((res) => {
        let filesList = res && res.resData;
        this.filesList = this.handleFilesList(filesList);
      });
      _this.fileDialog = dialog;
    },
    cancelfileDialog() {
      let _this = this;
      let dialog = {
        visible: false,
      };
      _this.fileDialog = dialog;
    },
    handleSelectionChange() { },

    hanleExpandChange(row, expanded) { },
    async load(tree, treeNode, resolve) {
      this.treeObj[tree.id] = { tree, treeNode, resolve }; // 将本次节点对象存储到maps对象中

      const res = await listFile({ id: this.vmId, path: tree.id });
      let filesList = res && res.resData;
      filesList = this.handleFilesList(filesList);
      resolve(filesList);
    },
    handleFilesList(filesList) {
      filesList &&
        filesList.length > 0 &&
        filesList.map((i) => {
          let dir = i.dir;
          if (dir) {
            // i.children = [],
            i.hasChildren = true;
          }
          i.id = i.currentDir + "/" + i.fileName;
        });
      return filesList;
    },

    //点击删除按钮的删除方法item为行数据
    handleDeleteFile(row) {
      let param = { vmId: this.vmId, filePathList: [row.id] };
      this.$message.success("正在删除，请稍后");
      deleteFiles(param).then((res) => {
        // 根据我们声明的maps对象，拿到父节点。然后手动进行接口请求，重新进行数据渲染。
        //删除第一级菜单只需要重新查即可，删除二级以下菜单需要查询上一级菜单并强制更新
        if (this.treeObj[row.currentDir]) {
          const { tree, treeNode, resolve } = this.treeObj[row.currentDir];
          this.loadTable(tree.id, treeNode, resolve);
        } else {
          listFile({ id: this.vmId, path: this.homeworkPath }).then((res) => {
            let filesList = res && res.resData;
            filesList = this.handleFilesList(filesList);
            this.filesList = filesList;
          });
        }
        this.$message.success("删除成功");
      });
    },

    async loadTable(id, treeNode, resolve) {
      // 表格懒加载方法
      const res = await listFile({ id: this.vmId, path: id });
      let filesList = res && res.resData;
      filesList = this.handleFilesList(filesList);
      this.$set(
        this.$refs.fileTable.$children[0].store.states.lazyTreeNodeMap,
        id,
        filesList
      );
    },

    /**
     * 学生列表
     */

    /**
     * student
     */
    submitFormStudent(e) {
      addUser2Course(e).then((reponse) => {
        if (reponse && reponse.flag) {
          this.stuDialog = false;
          this.$message.success("添加成功");
          this.getStuList();
        }
      });
    },
    /**
     *
     */
    initStuParams() {
      let listQuery = {
        page: 1,
        limit: 10,
        params: "",
      };
      this.listStuQuery = listQuery;
    },
    searchStuQuery(e) {
      this.listStuQuery.page = e.page;
      this.listStuQuery.limit = e.limit;
      this.getStuList();
    },
    getStuList() {
      this.loading = true;
      let courseId = this.courseId;
      getCourseUserPage({ courseId, ...this.listStuQuery }).then((reponse) => {
        let resData = reponse.resData;
        this.studentList = resData && resData.list;
        this.stutotal = resData.total;
        this.loading = false;
      });
    },
    handleStuQuery(e) {
      this.listStuQuery.page = 1;
      this.listStuQuery.params = e;
      this.getStuList();
    },
    resetStuQuery() {
      this.listStuQuery.params = {};
      this.listStuQuery.page = 1;
      this.getStuList();
    },

    cancelStu() {
      this.stuDialog = false;
    },

    handleAddStu() {
      this.stuDialog = true;
    },
    handleDeleteStu(e) {
      let courseId = this.courseId;
      let userId = e && e.id;
      removeStudent({ userId, courseId }).then((res) => {
        if (res && res.flag && res.resData) {
          this.$message.success("删除成功");
          this.getStuList();
        }
      });
    },
  },
  //生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted() { },
};
</script>

<style lang="scss" scoped>
$common-color: #10abb9;

::v-deep {
  .el-tab-edu {
    margin-top: 30px;

    #tab-zero.el-tabs__item {
      padding: 0 20px;
    }

    .el-tabs__item.is-active {
      background: $common-color;
      color: #fff;
      padding: 0 20px;
      border-radius: 4px;
    }

    .el-tabs__active-bar {
      background: $common-color;
      color: #fff;
    }

    .el-tabs__item:hover {
      color: $common-color;
    }

    .el-tabs__item.is-active:hover {
      color: #fff;
    }
  }
}

// .el-table {
//     height: 300px !important;
//
.delete-el {
  position: absolute;
  right: 25px;
  top: 20px;
}

.choose-container {
  max-width: 700px;
  overflow: auto;

  .choose-item {
    // width: 50px;
    text-align: center;
    border: 1px solid $common-color;
    border-right: 0;

    // border-radius: 8px;
  }

  .no-active {
    .choose-item-container {
      width: 80px;
      // padding: 5px 10px;
      // height: 40px;
      // line-height: 40px;
      position: relative;

      .item-text-container {
        display: flex;
        flex-direction: column;
        align-items: center;

        .container-text {
          height: 48px;
          line-height: 40px;
          font-size: 20px;
          // color: #10abb9;
          line-height: 48px;
        }
      }
    }
  }

  .choose-item:hover {
    cursor: pointer;
  }

  .is-active {
    // background-color: $common-color;
    min-width: 200px;

    color: #fff;

    .choose-item-container {
      min-width: 200px;
      // text-align: center;
      padding: 4px 20px 4px 0px;
      // height: 50px;
      font-size: 12px;
      position: relative;

      .item-text-container {
        .container-text {
          height: 20px;
          // line-height: 20px;
          width: 200px;
          position: relative;
        }
      }
    }
  }

  .edit {
    position: absolute;
    right: 4px;
    top: 0;
  }

  .delete {
    position: absolute;
    right: 4px;
    bottom: 0;
  }
}

@media screen and (max-width: 1440px) {
  .choose-container {
    max-width: 700px;
    overflow: auto;

    .choose-item {
      // width: 50px;
      text-align: center;
      border: 1px solid $common-color;
      border-right: 0;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      // border-radius: 8px;
    }

    .no-active {
      .choose-item-container {
        width: 80px;
        // padding: 5px 10px;
        // height: 40px;
        // line-height: 40px;

        .item-text-container {
          .container-text {
            height: 60px;
            font-size: 20px;
            color: #10abb9;
            line-height: 60px;
          }
        }
      }
    }

    .choose-item:hover {
      cursor: pointer;
    }

    .is-active {
      background-color: $common-color;
      min-width: 200px;

      color: #fff;

      .choose-item-container {
        min-width: 200px;
        // text-align: center;
        padding: 4px 10px;
        // height: 50px;
        font-size: 12px;
        display: flex;

        flex-direction: column;
        align-items: center;
        justify-content: center;

        .item-text-container {
          .container-text {
            height: 20px;
            // line-height: 20px;
            width: 200px;
          }
        }
      }

      .edit {
        position: absolute;
        right: 4px;
        top: 0;
      }

      .delete {
        position: absolute;
        right: 4px;
        bottom: 0;
      }
    }
  }
}

.choose-item:last-child {
  border-radius: 0 4px 4px 0;
  border-right: 1px solid $common-color;
}

.choose-item:first-child {
  border-radius: 4px 0px 0px 4px;
}

.color333 {
  color: #999;
}

.marginTop10 {
  margin-top: 10px;
}

.marginRt20 {
  margin-right: 20px;
}

.marginRt30 {
  margin-right: 35px;
}

.search {
  padding: 18px 0 0 10px;
  margin-bottom: 10px;
  border-radius: 2px;
  /* border: 1px solid var(--el-card-border-color); */
}

.searchBarCard .el-form-item {
  margin-bottom: 0px;
}

.marginTRL {
  margin: 10px 0px 10px 10px;

  .el-input-edu {
    width: 180px;
  }

  .width {
    width: 100px;
  }
}

.marginTop10 {
  ::v-deep {
    // .is-active {
    //     width: 100px;
    // }

    .el-radio-button__inner {
      width: 100%;
    }
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

::v-deep {
  .el-carousel__container {
    height: 50px;
  }
}

::v-deep {
  .el-input__count {
    right: 15px;
  }
}

.i-hover:hover {
  cursor: pointer;
}

.i-hoverD:hover {
  cursor: default;
}

.data-count {
  width: 160px;
  height: 80px;
  color: #000;
  font-weight: 700;
  border-radius: 10px;

  .data-count-num {
    font-size: 20px;
  }
}

.bg1 {
  color: rgb(29, 45, 133);
  background-image: linear-gradient(45deg,
      rgb(235, 237, 255),
      rgb(247, 247, 255),
      rgb(235, 237, 255));
}

.bg2 {
  color: rgb(24, 73, 98);
  background-image: linear-gradient(45deg,
      rgb(232, 247, 254),
      rgb(235, 248, 254),
      rgb(221, 241, 253));
}

.bg3 {
  color: rgb(16, 71, 62);
  background-image: linear-gradient(45deg,
      rgb(234, 252, 253),
      rgb(241, 254, 252),
      rgb(224, 251, 253));
}

.bg4 {
  color: rgb(11, 65, 9);
  background-image: linear-gradient(45deg,
      rgb(230, 250, 234),
      rgb(235, 251, 233),
      rgb(219, 247, 233));
}

// @media screen and (max-width: 1200px) {
//     .course-detail {
//         display: block;
//     }

//     .homework-header {
//         display: flex;
//         flex-direction: column;
//         align-items: center;

//         ::v-deep {
//             .el-form-item__label {
//                 width: 80px;
//             }
//         }

//         .homework-num {
//             margin: 10px 0;
//         }

//         .homework-detail {
//             display: flex;
//             justify-content: flex-start;
//         }
//     }

// }

// @media screen and (min-width:1200px) {
//     .homework-header {
//         display: block;

//         .homework-num {
//             margin-left: 60px;
//             margin-top: 5px;
//         }

//         ::v-deep {
//             .el-form-item__label {
//                 width: 80px;
//             }
//         }

//     }
// }</style>
