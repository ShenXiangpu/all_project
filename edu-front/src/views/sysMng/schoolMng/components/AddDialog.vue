<template>
  <el-dialog append-to-body :title="textMap[dialog.status]" :visible.sync="dialog.visible" class="el-dialog-edu-school"
    @close="handleClose">
    <el-form ref="form" class="el-form-edu" :model="form" :rules="rules">
      <el-form-item label="高校名称" prop="universityName">
        <el-input class="el-input-edu" placeholder="请输入高校名称" v-model="form.universityName" maxlength="30"
          show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="高校类型" prop="type">
        <el-select class="el-input-edu" v-model="form.type" placeholder="请选择高校类型">
          <el-option v-for="item in typeList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开启状态" prop="status">
        <el-select class="el-input-edu" v-model="form.status" placeholder="请选择开启状态">
          <el-option label="开启" value="1"></el-option>
          <el-option label="关闭" value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitUpload" :loading="loading">{{
        dialog.status === "create" ? "确 定" : "修改"
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addOrEditSchool  } from "@/api/edu/school";

export default {
  name: "AddDialog",
  props: {},
  components: {
  },
  watch: {},
  data() {
    return {
      typeList: [
        '985', '211', '本科', '科研机构', '其他'
      ],
      isDestory: true,
      form: {
        universityName: "",
        type: "",
        status: 1,
      },
      fileInfo: {},
      rules: {
        universityName: [{ required: true, message: "请输入高校名称", trigger: "blur" }],
        type: [
          { required: true, message: "请选择高校类型", trigger: "blur" },
        ],
        status: [
          { required: true, message: "请选择开启状态", trigger: "blur" },
        ],
      },
      fileList: [],
      visibleDialog: false,
      dialog: {
        visible: false,
        status: "",
      },
      textMap: {
        update: "修改学校信息",
        create: "新增学校信息",
        look: "",
      },
      loading: false,
    };
  },
  methods: {
    submitUpload() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          const res = await addOrEditSchool(this.form)
          if (!res.flag) {
            this.loading = false;
            this.$message.error(res.message);
            return;
          }
          if (this.dialog.status == "create") {
            this.$message.success("添加成功");
            this.loading = false;
            this.dialog.visible = false;
            this.$refs["form"].resetFields();
            this.$emit("queryList");
          } else {
            this.$message.success("修改成功");
            this.loading = false;
            this.dialog.visible = false;
            this.$refs["form"].resetFields();
            this.$emit("queryList");
          }
        } else {
          this.loading = false;
          return false;
        }
      });
    },

    handleClose() {
      this.fileList = [];
      this.form.displayName = "";
      this.$refs["form"].resetFields();
      this.dialog.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
$common-color: #10abb9;

.el-dialog-edu-school {
  ::v-deep {
    .el-dialog {
      width: 540px;
    }

    .el-dialog__body {
      padding-top: 20px;
      padding-bottom: 10px;
    }

    .el-dialog__headerbtn {
      top: 12px;
    }

    .el-dialog {
      border-radius: 4px;

      .el-dialog__header {
        border-radius: 4px 4px 0 0;
        padding: 10px 20px;
        background-color: rgb(233, 233, 233);

        .el-dialog__title {
          color: #333;
        }

        .el-dialog__headerbtn {
          top: 12px;
        }
      }

      .el-button--primary {
        background: $common-color;
        border-color: $common-color;
      }
    }
  }
}

.el-form-edu {
  ::v-deep {
    .el-form-item__label {
      width: 120px;
    }

    .el-input-edu {
      width: 300px;
    }

    .el-form-item__error {
      margin-left: 120px;
    }
  }

  .el-tag-edu {
    margin-left: 120px;
  }
}
</style>
