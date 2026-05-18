<template>
    <div>
        <el-form-item :label="labelText" prop="userCounts" class="vm-user-contianer">
            <div v-for="(item, index) in userCounts" :key="index" class="userCounts-container">
                <el-form-item label-width="130px" class="marginBottom10" label="用户名" :prop="`userCounts.${index}.username`"
                    :rules="[
                        { required: true, message: '请输入登录用户名，或删除该行（至少绑定一个)', trigger: 'blur', },
                        {
                            pattern: /^(?=[\S]{1,32}$)(?!\d+$)[\dA-Za-z_\.]+$/,
                            message: '请按规则重新设置用户名'
                        },

                        { validator: checkVmName, trigger: 'blur' }
                    ]">
                    <el-input style="width:300px" v-model="item.username" placeholder="请输入登录用户名"></el-input>
                    <div style="color:#999;font-size:12px">Linux用户名只能有数字、字母、_和.四种字符组成，且不能是纯数字,长度为1-32。</div>
                </el-form-item>
                <el-form-item label-width="130px" label="登录凭证" :prop="`userCounts.${index}.randomPwd`">
                    <el-radio-group v-model="item.randomPwd" @change="changeRandom(item, index)">
                        <el-radio-button :label="true">自动生成密码</el-radio-button>
                        <el-radio-button :label="false">设置密码</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label-width="130px" :rules="[
                    { required: true, message: '请输入用户登录密码', trigger: 'blur', },
                    {
                        pattern: /^(?!.*\$)(?!.*\s)(?!.*\\)(?=.*\d)(?=.*[a-z[A-Z])(?=.*[()[\]`~!@#%^&*-+=_|{}:;'<>,.?/]).{8,30}$/,
                        message: '请按规则重新设置密码'
                    },
                ]" label="密码" :prop="`userCounts.${index}.password`" v-if="item && !item.randomPwd"
                    style="margin: 10px 0 0 0;">
                    <el-input style="width:300px" show-password type="password" v-model="item.password"
                        placeholder="请输入用户登录密码"></el-input>
                    <div style="color:#999;font-size:12px">密码需8-30位，至少包括三项（英文、数字和特殊字符，包括：[()`~!@#%^&*-+=_|{}[]:;'
                        &lt;>,.?/]）</div>
                </el-form-item>
                <div v-if="userCounts && userCounts.length > 1" @click="deleteUser(index)"><i
                        class="el-icon-close primaryColor font16 delete-user"></i></div>
            </div>


        </el-form-item>
        <el-form-item>
            <div><a href="#" class="primaryColor" @click="clickAddUser" v-if="userCounts && userCounts.length < 10"><i
                        class="el-icon-plus"></i>添加用户</a>
                &nbsp;已创建<span>{{ userCounts && userCounts.length }}</span>个用户（最多创建10个用户，至少创建一个用户）</div>
        </el-form-item>


    </div>
</template>
    
<script>
//这里可以导入其他文件（比如:组件，工具 js，第三方插件 js，json 文件，图片文件等等）
//例如:import 《组件名称》 from '《组件路径》';

export default {
    //import 引入的组件需要注入到对象中才能使用
    name: "createEnvironment",
    components: {
    },
    props: {
        userCounts: {
            default: () => {

                return [
                    {
                        username: '',
                        randomPwd: true,
                        password: ''
                    }
                ]
            },
            type: Array,
        },
        labelText: {
            default: '多用户',
            type: String
        },
        labelWidth: {
            default: '130px',
            type: String
        }
    },
    computed: {

    },
    data() {

        var checkVmName = (rule, value, callback) => {
            if (value == 'root') {
                callback(new Error(`root不能作为用户名`));
            } else {
                callback()
            }
        }
        var validateHostName = (rule, value, callback) => {
            checkHostname({ hostname: value }).then(res => {
                if (res && res.flag && res.resData) {
                    callback(new Error(`主机名已存在，请重新输入。（推荐输入：${res.resData}）`));
                } else {
                    callback()

                }
            })
        }
        return {
            checkVmName: checkVmName,
            validateHostName: validateHostName,
        };

    },
    watch: {},

    created() {

    },
    methods: {
        changeRandom(item, index) {
            let userCounts = this.userCounts;
            userCounts[index] = item
            this.$emit('changeRandom', userCounts)
        },

        clickAddUser() {
            let userCounts = this.userCounts;
            userCounts.push({
                username: '',
                randomPwd: true,
                password: ''
            });
            this.$emit('clickAddUser', userCounts)

        },

        deleteUser(index) {
            if (index !== -1) {
                let userCounts = this.userCounts;
                userCounts.splice(index, 1)
                this.$emit('deleteUser', userCounts)
            }
        },

    },
    //生命周期 - 挂载完成（可以访问 DOM 元素）
    mounted() {

    },

};
</script>
<style lang='scss' scoped>
.vm-user-contianer {
    max-height: 400px;
    overflow: auto;
}

.userCounts-container {
    background: #f0f8ff;
    padding: 20px;
    margin: 0 0 10px 0;
    position: relative;

    ::v-deep {
        .el-form-item__error {
            position: relative;
        }
    }

    .delete-user {
        cursor: pointer;
        position: absolute;
        right: 20px;
        top: 20px
    }
}
</style>
    