<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible" @close="cancel" width="850px">
    <el-form ref="handleEquForm" :model="handleEquForm" :rules="EquFormRules" label-width="100px">
      <el-card v-if="isShowMul">
        <template #header>基本信息</template>
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称" prop="sensorName">
              <el-input maxlength="32" show-word-limit :readonly="isReadOnly" v-model="handleEquForm.sensorName"
                placeholder="请输入传感器名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="编号" prop="sensorId">
              <el-input maxlength="32" show-word-limit :readonly="dialog.title == '修改传感器' || dialog.title == '传感器信息'
                ? true
                : false
                " v-model="handleEquForm.sensorId" placeholder="请输入传感器编号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="安装设备" prop="equipmentObj">
              <el-select :disabled="isReadOnly" filterable v-model="handleEquForm.equipmentId" @change="checkoutEqu"
                placeholder="请选择设备">
                <el-option v-for="item in equList" :key="item.id" :label="item.equipmentName"
                  :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="绑定测点" prop="equipmentObj">
              <el-select :disabled="isReadOnly" filterable v-model="handleEquForm.measurePointId"
                placeholder="请指定设备测点">
                <el-option v-for="item in equList" :key="item.id" :label="item.equipmentName"
                  :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-card>

      <el-card v-if="isAdd && isShowMul">
        <template #header>采集信息</template>
        <el-row>
          <el-col :span="12">
            <el-form-item label="休眠时长" prop="samplingInterval">
              <el-select disabled filterable v-model="handleEquForm.samplingInterval" placeholder="请选择休眠时长">
                <el-option v-for="item in dormancyList" :key="item.id" :label="item.value" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="采样频率" prop="samplingRate">
              <el-select disabled filterable v-model="handleEquForm.samplingRate" placeholder="请选择采样频率">
                <!-- <template v-for="item in frequencyList"> -->
                <el-option :label="handleEquForm.samplingRate" :value="handleEquForm.samplingRate">
                </el-option>
                <!-- </template> -->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="采集模式" prop="interval">
          <el-select disabled filterable v-model="handleEquForm.interval" placeholder="请选择采集间隔">
            <template>
              <el-option label="每次都采集" value="每次都采集"></el-option>
            </template>
          </el-select>
        </el-form-item>
      </el-card>

      <el-card>
        <template #header>
          <span>告警配置</span>
          <el-popover placement="top" width="400" trigger="click">
            <div>
              <div>以设备的初始值为基准（正常设备的）</div>
              <div>预警阈值：初始值*1.25</div>
              <div>报警阈值：初始值*3.1</div>
              <div>危险阈值：初始值*7.5</div>
              <div>该标准可参考，可根据设备情况进行调整</div>
            </div>
            <el-button slot="reference" style="float: right; padding: 3px 0" type="text">参考标准</el-button>
          </el-popover>
        </template>
        <!-- <el-form-item label-width="0" prop="warnType">
          <el-radio-group v-model="handleEquForm.warnType" @change="handleMenuTypeChange">
            <el-radio label="1" :disabled="true">ISO标准</el-radio>
            <el-radio label="2">自定义</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <span style="font-size: 14px; color: #f00">注意：以下各项均为"或"的关系，满足任意一项均可触发对应的报警类型</span>
        <table class="table" border="1" style="
              width: 100%;
              text-align: center;
              border: 1px solid #ccc;
              margin-top: 10px;
            ">
          <thead style="font-weight: 700">
            <td>报警类型</td>
            <td>X轴烈度mm/s</td>
            <td>Y轴烈度mm/s</td>
            <td>Z轴烈度mm/s</td>
            <td>温度℃</td>
            <td>备注</td>
          </thead>
          <tr>
            <td>
              <i class="el-icon-caret-top" :style="{ color: chartsColor['预警'] }"></i>
              预警
            </td>
            <td class="td-class">
              <el-row>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="x_rel1">
                    <el-select :disabled="isReadOnly" v-model="handleEquForm.x_rel1">
                      <el-option value=">">
                        <span>
                          <i class="el-icon-arrow-right"></i>
                        </span>
                      </el-option>
                      <el-option value="<">
                        <span>
                          <i class="el-icon-arrow-left"></i>
                        </span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="x_val1">
                    <el-input :readonly="isReadOnly" v-model="handleEquForm.x_val1" placeholder="请输入" />
                  </el-form-item>
                </el-col>
              </el-row>
            </td>
            <td class="td-class">
              <el-row>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="y_rel1">
                    <el-select :disabled="isReadOnly" v-model="handleEquForm.y_rel1" placeholder="请输入">
                      <el-option value=">">
                        <span>
                          <i class="el-icon-arrow-right"></i>
                        </span>
                      </el-option>
                      <el-option value="<">
                        <span>
                          <i class="el-icon-arrow-left"></i>
                        </span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="y_val1">
                    <el-input :readonly="isReadOnly" v-model="handleEquForm.y_val1" placeholder="请输入" />
                  </el-form-item>
                </el-col>
              </el-row>
            </td>
            <td class="td-class">
              <el-row>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="z_rel1">
                    <el-select :disabled="isReadOnly" v-model="handleEquForm.z_rel1">
                      <el-option value=">">
                        <span>
                          <i class="el-icon-arrow-right"></i>
                        </span>
                      </el-option>
                      <el-option value="<">
                        <span>
                          <i class="el-icon-arrow-left"></i>
                        </span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="z_val1">
                    <el-input :readonly="isReadOnly" v-model="handleEquForm.z_val1" placeholder="请输入" />
                  </el-form-item>
                </el-col>
              </el-row>
            </td>
            <td class="td-class">
              <el-row>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="temperature_rel1">
                    <el-select :disabled="isReadOnly" v-model="handleEquForm.temperature_rel1">
                      <el-option value=">">
                        <span>
                          <i class="el-icon-arrow-right"></i>
                        </span>
                      </el-option>
                      <el-option value="<">
                        <span>
                          <i class="el-icon-arrow-left"></i>
                        </span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="temperature_val1">
                    <el-input :readonly="isReadOnly" v-model="handleEquForm.temperature_val1" placeholder="请输入" />
                  </el-form-item>
                </el-col>
              </el-row>
            </td>
            <td>可正常工作，需关注</td>
          </tr>
          <tr>
            <td>
              <i class="el-icon-caret-top" :style="{ color: chartsColor['报警'] }"></i>
              报警
            </td>
            <td class="td-class">
              <el-row>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="x_rel2">
                    <el-select :disabled="isReadOnly" v-model="handleEquForm.x_rel2">
                      <el-option value=">">
                        <span>
                          <i class="el-icon-arrow-right"></i>
                        </span>
                      </el-option>
                      <el-option value="<">
                        <span>
                          <i class="el-icon-arrow-left"></i>
                        </span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="x_val2">
                    <el-input :readonly="isReadOnly" v-model="handleEquForm.x_val2" placeholder="请输入" />
                  </el-form-item>
                </el-col>
              </el-row>
            </td>
            <td class="td-class">
              <el-row>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="y_rel2">
                    <el-select :disabled="isReadOnly" v-model="handleEquForm.y_rel2">
                      <el-option value=">">
                        <span>
                          <i class="el-icon-arrow-right"></i>
                        </span>
                      </el-option>
                      <el-option value="<">
                        <span>
                          <i class="el-icon-arrow-left"></i>
                        </span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="y_val2">
                    <el-input :readonly="isReadOnly" v-model="handleEquForm.y_val2" placeholder="请输入" />
                  </el-form-item>
                </el-col>
              </el-row>
            </td>
            <td class="td-class">
              <el-row>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="z_rel2">
                    <el-select :disabled="isReadOnly" v-model="handleEquForm.z_rel2">
                      <el-option value=">">
                        <span>
                          <i class="el-icon-arrow-right"></i>
                        </span>
                      </el-option>
                      <el-option value="<">
                        <span>
                          <i class="el-icon-arrow-left"></i>
                        </span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="z_val2">
                    <el-input :readonly="isReadOnly" v-model="handleEquForm.z_val2" placeholder="请输入" />
                  </el-form-item>
                </el-col>
              </el-row>
            </td>
            <td class="td-class">
              <el-row>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="temperature_rel2">
                    <el-select :disabled="isReadOnly" v-model="handleEquForm.temperature_rel2">
                      <el-option value=">">
                        <span>
                          <i class="el-icon-arrow-right"></i>
                        </span>
                      </el-option>
                      <el-option value="<">
                        <span>
                          <i class="el-icon-arrow-left"></i>
                        </span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="temperature_val2">
                    <el-input :readonly="isReadOnly" v-model="handleEquForm.temperature_val2" placeholder="请输入" />
                  </el-form-item>
                </el-col>
              </el-row>
            </td>
            <td>勉强维持工作</td>
          </tr>
          <tr>
            <td>
              <i class="el-icon-caret-top" :style="{ color: chartsColor['报警'] }"></i>
              危险
            </td>
            <td class="td-class">
              <el-row>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="x_rel3">
                    <el-select :disabled="isReadOnly" v-model="handleEquForm.x_rel3">
                      <el-option value=">">
                        <span>
                          <i class="el-icon-arrow-right"></i>
                        </span>
                      </el-option>
                      <el-option value="<">
                        <span>
                          <i class="el-icon-arrow-left"></i>
                        </span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="x_val3">
                    <el-input :readonly="isReadOnly" v-model="handleEquForm.x_val3" placeholder="请输入" />
                  </el-form-item>
                </el-col>
              </el-row>
            </td>
            <td class="td-class">
              <el-row>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="y_rel3">
                    <el-select :disabled="isReadOnly" v-model="handleEquForm.y_rel3">
                      <el-option value=">">
                        <span>
                          <i class="el-icon-arrow-right"></i>
                        </span>
                      </el-option>
                      <el-option value="<">
                        <span>
                          <i class="el-icon-arrow-left"></i>
                        </span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="y_val3">
                    <el-input :readonly="isReadOnly" v-model="handleEquForm.y_val3" placeholder="请输入" />
                  </el-form-item>
                </el-col>
              </el-row>
            </td>
            <td class="td-class">
              <el-row>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="z_rel3">
                    <el-select :disabled="isReadOnly" v-model="handleEquForm.z_rel3">
                      <el-option value=">">
                        <span>
                          <i class="el-icon-arrow-right"></i>
                        </span>
                      </el-option>
                      <el-option value="<">
                        <span>
                          <i class="el-icon-arrow-left"></i>
                        </span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="z_val3">
                    <el-input :readonly="isReadOnly" v-model="handleEquForm.z_val3" placeholder="请输入" />
                  </el-form-item>
                </el-col>
              </el-row>
            </td>
            <td class="td-class">
              <el-row>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="temperature_rel3">
                    <el-select :disabled="isReadOnly" v-model="handleEquForm.temperature_rel3">
                      <el-option value=">">
                        <span>
                          <i class="el-icon-arrow-right"></i>
                        </span>
                      </el-option>
                      <el-option value="<">
                        <span>
                          <i class="el-icon-arrow-left"></i>
                        </span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="temperature_val3">
                    <el-input :readonly="isReadOnly" v-model="handleEquForm.temperature_val3" placeholder="请输入" />
                  </el-form-item>
                </el-col>
              </el-row>
            </td>
            <td>无法工作</td>
          </tr>
        </table>
      </el-card>
      <el-card>
        <template #header>
          <span>告警延时</span>
        </template>
        <!-- <el-form-item label-width="0" prop="warnType">
          <el-radio-group v-model="handleEquForm.warnType" @change="handleMenuTypeChange">
            <el-radio label="1" :disabled="true">ISO标准</el-radio>
            <el-radio label="2">自定义</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <span style="font-size: 14px; color: #f00">注意：1个周期约等于1分钟</span>
        <table class="table" border="1" style="
              width: 100%;
              text-align: center;
              border: 1px solid #ccc;
              margin-top: 10px;
            ">
          <thead style="font-weight: 700">
            <td>报警类型</td>
            <td>触发延时周期</td>
            <td>解除延时周期</td>
          </thead>
          <tr>
            <td style="width: 20%">
              <i class="el-icon-caret-top" :style="{ color: chartsColor['预警'] }"></i>
              预警
            </td>
            <td class="td-class">
              <el-row>
                <el-col>
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="triggerCycle1">
                    <el-select :disabled="isReadOnly" style="margin: 0; width: 100%"
                      v-model="handleEquForm.triggerCycle1">
                      <el-option :key="item.id" v-for="item in circleList" :value="item.value"
                        :label="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </td>
            <td class="td-class">
              <el-row>
                <el-col>
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="cancelCycle1">
                    <el-select :disabled="isReadOnly" style="margin: 0; width: 100%" v-model="handleEquForm.cancelCycle1">
                      <el-option :key="item.id" v-for="item in circleList" :value="item.value"
                        :label="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </td>
          </tr>
          <tr>
            <td>
              <i class="el-icon-caret-top" :style="{ color: chartsColor['报警'] }"></i>
              报警
            </td>
            <td class="td-class">
              <el-row>
                <el-col>
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="triggerCycle2">
                    <el-select :disabled="isReadOnly" style="margin: 0; width: 100%"
                      v-model="handleEquForm.triggerCycle2">
                      <el-option :key="item.id" v-for="item in circleList" :value="item.value"
                        :label="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </td>
            <td class="td-class">
              <el-row>
                <el-col>
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="cancelCycle2">
                    <el-select :disabled="isReadOnly" style="margin: 0; width: 100%" v-model="handleEquForm.cancelCycle2">
                      <el-option :key="item.id" v-for="item in circleList" :value="item.value"
                        :label="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </td>
          </tr>
          <tr>
            <td>
              <i class="el-icon-caret-top" :style="{ color: chartsColor['危险'] }"></i>
              危险
            </td>
            <td class="td-class">
              <el-row>
                <el-col>
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="triggerCycle3">
                    <el-select :disabled="isReadOnly" style="margin: 0; width: 100%"
                      v-model="handleEquForm.triggerCycle3">
                      <el-option :key="item.id" v-for="item in circleList" :value="item.value"
                        :label="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </td>
            <td class="td-class">
              <el-row>
                <el-col>
                  <el-form-item label-width="0" style="margin: 0; width: 100%" prop="cancelCycle3">
                    <el-select :disabled="isReadOnly" style="margin: 0; width: 100%" v-model="handleEquForm.cancelCycle3">
                      <el-option :key="item.id" v-for="item in circleList" :value="item.value"
                        :label="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </td>
          </tr>
        </table>
      </el-card>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button v-if="!isReadOnly" type="primary" @click="submitForm">{{
        dialog.title == "添加传感器" ? "确认" : "确认"
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import IconSelect from "@/components/IconSelect";
import chartsColor from "@/utils/color";

export default {
  components: {
    IconSelect,
  },
  created() { },
  computed: {},
  watch: {
    handleEquForm(newValue, oldValue) {
      console.log("newValue", newValue, oldValue);
    },
    immediate: true,
    deep: true,
  },
  props: {
    dialog: {
      type: Object,
      default: () => {
        return {
          title: "",
          visible: false,
        };
      },
    },
    handleEquForm: {
      type: Object,
    },

    equList: {
      type: Array,
    },
    isAdd: {
      type: Boolean,
      default: false,
    },
    //批量修改是展示部分内容
    isShowMul: {
      type: Boolean,
      default: true,
    },
    isReadOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chartsColor: chartsColor,
      // 延时周期list
      circleList: [
        {
          id: 1,
          label: "实时",
          value: 0,
        },
        {
          id: 2,
          label: "1个周期",
          value: 1,
        },
        {
          id: 3,
          label: "2个周期",
          value: 2,
        },
        {
          id: 4,
          label: "3个周期",
          value: 3,
        },
        {
          id: 5,
          label: "4个周期",
          value: 4,
        },
        {
          id: 6,
          label: "5个周期",
          value: 5,
        },
        {
          id: 7,
          label: "6个周期",
          value: 6,
        },
        {
          id: 8,
          label: "7个周期",
          value: 7,
        },
        {
          id: 9,
          label: "8个周期",
          value: 8,
        },
        {
          id: 10,
          label: "9个周期",
          value: 9,
        },
        {
          id: 11,
          label: "10个周期",
          value: 10,
        },
      ],
      //休眠list
      dormancyList: [
        {
          id: 1,
          value: "1分钟",
        },
        {
          id: 5,
          value: "5分钟",
        },
        {
          id: 10,
          value: "10分钟",
        },
        {
          id: 15,
          value: "15分钟",
        },
        {
          id: 30,
          value: "30分钟",
        },
        {
          id: 60,
          value: "1小时",
        },
        {
          id: 120,
          value: "2小时",
        },
      ],
      EquFormRules: {
        sensorName: [
          {
            required: true,
            message: "请输入传感器名称",
            trigger: "blur",
          },
        ],
        sensorId: [
          {
            required: true,
            message: "请填写传感器编号",
            trigger: "blur",
          },
        ],
        equipmentObj: [
          {
            required: true,
            message: "请选择设备(可查询)",
            trigger: "blur",
          },
        ],
        temperature_rel1: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        temperature_val1: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        // warnType: [{ required: true, message: "请输入", trigger: "blur" }],
        x_rel1: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        x_val1: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        y_rel1: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        y_val1: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        z_rel1: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        z_val1: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        cancelCycle1: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        triggerCycle1: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],

        temperature_rel2: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        temperature_val2: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        x_rel2: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        x_val2: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        y_rel2: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        y_val2: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        z_rel2: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        z_val2: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        cancelCycle2: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        triggerCycle2: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],

        temperature_rel3: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        temperature_val3: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        x_rel3: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        x_val3: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        y_rel3: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        y_val3: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        z_rel3: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        z_val3: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        cancelCycle3: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
        triggerCycle3: [
          {
            required: false,
            message: "请输入",
            trigger: "blur",
          },
        ],
      },
      // frequencyList: [
      //   {id:1,value:''}
      // ],
    };
  },

  methods: {
    checkoutEqu(e) {
      this.$emit("checkoutEqu", e);
    },

    cancel() {
      this.$refs.handleEquForm.resetFields();
      this.$emit("cancel");
    },

    handleMenuTypeChange() { },

    submitForm(e) {
      this.$refs.handleEquForm.validate(async (valid) => {
        if (valid) {
          console.log(this.handleEquForm);
          if (this.isAdd) {
            // 修改震动传感器
            let handleEquForm = {
              sensorName: this.handleEquForm && this.handleEquForm.sensorName,
              sensorId: this.handleEquForm && this.handleEquForm.sensorId,
              equipmentId:
                this.handleEquForm && this.handleEquForm.equipmentObj.id,
              projectId:
                this.handleEquForm && this.handleEquForm.equipmentObj.projectId,
              id: this.handleEquForm && this.handleEquForm.id,
              samplingInterval:
                this.handleEquForm && this.handleEquForm.samplingInterval,
              sensorAlarmInfos: [
                {
                  temperature_rel:
                    this.handleEquForm && this.handleEquForm.temperature_rel1,
                  temperature_val:
                    this.handleEquForm && this.handleEquForm.temperature_val1,
                  level: 1,
                  x_rel: this.handleEquForm && this.handleEquForm.x_rel1,
                  x_val: this.handleEquForm && this.handleEquForm.x_val1,
                  y_rel: this.handleEquForm && this.handleEquForm.y_rel1,
                  y_val: this.handleEquForm && this.handleEquForm.y_val1,
                  z_rel: this.handleEquForm && this.handleEquForm.z_rel1,
                  z_val: this.handleEquForm && this.handleEquForm.z_val1,
                  cancelCycle:
                    this.handleEquForm && this.handleEquForm.cancelCycle1,
                  triggerCycle:
                    this.handleEquForm && this.handleEquForm.triggerCycle1,
                },
                {
                  temperature_rel:
                    this.handleEquForm && this.handleEquForm.temperature_rel2,
                  temperature_val:
                    this.handleEquForm && this.handleEquForm.temperature_val2,
                  level: 2,
                  x_rel: this.handleEquForm && this.handleEquForm.x_rel2,
                  x_val: this.handleEquForm && this.handleEquForm.x_val2,
                  y_rel: this.handleEquForm && this.handleEquForm.y_rel2,
                  y_val: this.handleEquForm && this.handleEquForm.y_val2,
                  z_rel: this.handleEquForm && this.handleEquForm.z_rel2,
                  z_val: this.handleEquForm && this.handleEquForm.z_val2,
                  cancelCycle:
                    this.handleEquForm && this.handleEquForm.cancelCycle2,
                  triggerCycle:
                    this.handleEquForm && this.handleEquForm.triggerCycle2,
                },
                {
                  temperature_rel:
                    this.handleEquForm && this.handleEquForm.temperature_rel3,
                  temperature_val:
                    this.handleEquForm && this.handleEquForm.temperature_val3,
                  level: 3,
                  x_rel: this.handleEquForm && this.handleEquForm.x_rel3,
                  x_val: this.handleEquForm && this.handleEquForm.x_val3,
                  y_rel: this.handleEquForm && this.handleEquForm.y_rel3,
                  y_val: this.handleEquForm && this.handleEquForm.y_val3,
                  z_rel: this.handleEquForm && this.handleEquForm.z_rel3,
                  z_val: this.handleEquForm && this.handleEquForm.z_val3,
                  cancelCycle:
                    this.handleEquForm && this.handleEquForm.cancelCycle3,
                  triggerCycle:
                    this.handleEquForm && this.handleEquForm.triggerCycle3,
                },
              ],
            };
            let title = this.dialog.title;
            let formObj = {
              title,
              handleEquForm,
            };
            this.$emit("submitForm", formObj);
          } else {
            let handleEquForm = {
              sensorName: this.handleEquForm && this.handleEquForm.sensorName,
              sensorId: this.handleEquForm && this.handleEquForm.sensorId,
              equipmentId:
                this.handleEquForm && this.handleEquForm.equipmentObj.id,
              projectId:
                this.handleEquForm && this.handleEquForm.equipmentObj.projectId,
              id: this.handleEquForm && this.handleEquForm.id,
              sensorAlarmInfos: [
                {
                  temperature_rel:
                    this.handleEquForm && this.handleEquForm.temperature_rel1,
                  temperature_val:
                    this.handleEquForm && this.handleEquForm.temperature_val1,
                  level: 1,
                  x_rel: this.handleEquForm && this.handleEquForm.x_rel1,
                  x_val: this.handleEquForm && this.handleEquForm.x_val1,
                  y_rel: this.handleEquForm && this.handleEquForm.y_rel1,
                  y_val: this.handleEquForm && this.handleEquForm.y_val1,
                  z_rel: this.handleEquForm && this.handleEquForm.z_rel1,
                  z_val: this.handleEquForm && this.handleEquForm.z_val1,
                  cancelCycle:
                    this.handleEquForm && this.handleEquForm.cancelCycle1,
                  triggerCycle:
                    this.handleEquForm && this.handleEquForm.triggerCycle1,
                },
                {
                  temperature_rel:
                    this.handleEquForm && this.handleEquForm.temperature_rel2,
                  temperature_val:
                    this.handleEquForm && this.handleEquForm.temperature_val2,
                  level: 2,
                  x_rel: this.handleEquForm && this.handleEquForm.x_rel2,
                  x_val: this.handleEquForm && this.handleEquForm.x_val2,
                  y_rel: this.handleEquForm && this.handleEquForm.y_rel2,
                  y_val: this.handleEquForm && this.handleEquForm.y_val2,
                  z_rel: this.handleEquForm && this.handleEquForm.z_rel2,
                  z_val: this.handleEquForm && this.handleEquForm.z_val2,
                  cancelCycle:
                    this.handleEquForm && this.handleEquForm.cancelCycle2,
                  triggerCycle:
                    this.handleEquForm && this.handleEquForm.triggerCycle2,
                },
                {
                  temperature_rel:
                    this.handleEquForm && this.handleEquForm.temperature_rel3,
                  temperature_val:
                    this.handleEquForm && this.handleEquForm.temperature_val3,
                  level: 3,
                  x_rel: this.handleEquForm && this.handleEquForm.x_rel3,
                  x_val: this.handleEquForm && this.handleEquForm.x_val3,
                  y_rel: this.handleEquForm && this.handleEquForm.y_rel3,
                  y_val: this.handleEquForm && this.handleEquForm.y_val3,
                  z_rel: this.handleEquForm && this.handleEquForm.z_rel3,
                  z_val: this.handleEquForm && this.handleEquForm.z_val3,
                  cancelCycle:
                    this.handleEquForm && this.handleEquForm.cancelCycle3,
                  triggerCycle:
                    this.handleEquForm && this.handleEquForm.triggerCycle3,
                },
              ],
            };
            let title = this.dialog.title;
            let formObj = {
              title,
              handleEquForm,
            };
            this.$emit("submitForm", formObj);
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang='scss' scoped>
::v-deep {
  .table {
    .el-input__inner {
      border-radius: 0;
    }
  }

}
</style>
