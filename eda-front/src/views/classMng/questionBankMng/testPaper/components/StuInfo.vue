<template>
    <div class="marginBottom20">
        <table border="1" style="border-color: #999;">
            <tr>
                <td class="table-title primaryBgColor">课程名称</td>
                <td class="table-width"></td>
                <td class="table-title primaryBgColor">班级</td>
                <td></td>
            </tr>
            <tr>
                <td class="table-title primaryBgColor">姓名</td>
                <td class="table-width"></td>
                <td class="table-title primaryBgColor">学号</td>
                <td class="table-width"></td>
            </tr>
            <tr>
                <td class="table-title primaryBgColor">考试时间</td>
                <td colspan="3"></td>

            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: '',
    components: {

    },
    created() {

    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
.table-title {
    width: 100px;
    height: 40px;
    font-size: 16px;
    text-align: center;
    color: #fff;
}
.table-width {
    width: 200px;
}
</style>