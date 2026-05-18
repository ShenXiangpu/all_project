<template>
    <el-dialog :title="textMap[dialogVisible.status]" :show-close="true" destroy-on-close
        :visible.sync="dialogVisible.visible" width="800px" style="height: 100vh;overflow: auto;padding: 20px;"
        @closed="reset('ruleForm')" @close="handleClose('ruleForm')">
        <div>
            <el-tree :props="props" :load="loadNode" lazy show-checkbox>
            </el-tree>
        </div>
    </el-dialog>
</template>

<script>
import {
    getSectionFileStreamById
} from "@/api/edu/course";
import {
    updateFileLearnRate
} from "@/api/edu/courseRourse";
import { mapGetters } from "vuex"

export default {
    name: '',
    components: {
        // VuePpt,

    },
    props: {

    },
    watch: {

    },
    computed: {
        ...mapGetters(['userRolesNames',])
    },
    created() {
    },
    mounted() {
        // 获取视频总时长
    },
    data() {
        return {
            dialogVisible: {
                visible: false,
                status: 'create'
            },
            textMap: {
                update: '测试',
                create: '测试',
            },
            title: '',
            url: '',
            fileId: '',
            fileType: '',
            completed: 0,
            props: {
                label: 'name',
                children: 'zones',
                isLeaf: 'leaf'
            },
        }
    },
    destroyed() {

    },
    methods: {
        loadNode(node, resolve) {
            if (node.level === 0) {
                return resolve([{ name: 'region' }]);
            }
            if (node.level > 1) return resolve([]);

            setTimeout(() => {
                const data = [{
                    name: 'leaf',
                    leaf: true
                }, {
                    name: 'zone'
                }];

                resolve(data);
            }, 500);
        },
        handleOpen() {
            this.dialogVisible.visible = true;
        },
        handleClose() {
            this.url = ''
            this.dialogVisible.visible = false;
        },


    }
}
</script>

<style lang="scss" scoped></style>