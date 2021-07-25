<template>
    <div v-if="innerVisible">
        <el-table
            class="account_table"
            :data="tableData"
            style="width: 100%">
            <el-table-column
                label="序号"
                type="index"
                width="100">
            </el-table-column>
            <el-table-column
                prop="accountno"
                label="账户号码"
                width="120">
            </el-table-column>
            <el-table-column
                prop="nickname"
                label="账户昵称"
                width="120">
            </el-table-column>
            <el-table-column
                prop="account_category_desc"
                label="账户分类">
            </el-table-column>
            <el-table-column
                prop="tradername"
                label="交易商">
            </el-table-column>
            <el-table-column
                prop="optime"
                width="200"
                label="最后活跃时间">
            </el-table-column>
            <el-table-column
                prop="account_type_desc"
                label="类型">
            </el-table-column>
            <el-table-column
                prop="connectflag_desc"
                label="连接">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <a @click="manageAccount(scope.row.accountno)" class="primary">修改</a>
                    <a href="#" class="default">删除</a>
                </template>
            </el-table-column>
        </el-table>
        <!-- <table class="account_table">
            <thead>
                <tr>
                    <th width="120">序号</th>
                    <th width="120">账户号码</th>
                    <th width="120">账户昵称</th>
                    <th width="120">账户分类</th>
                    <th width="120">交易商</th>
                    <th width="150">最后活跃时间</th>
                    <th width="80">类型</th>
                    <th width="80">连接</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>01</td>
                    <td>123456</td>
                    <td>aaaaaa</td>
                    <td>观摩账户</td>
                    <td>CapstoneGlobal</td>
                    <td>2021-04-12 14:09:41</td>
                    <td>模拟</td>
                    <td>已添加</td>
                    <td>
                        <a @click="manageAccount" class="primary">修改</a>
                        <a href="#" class="default">删除</a>
                    </td>
                </tr>
                <tr>
                    <td>02</td>
                    <td>123456</td>
                    <td>aaaaaa</td>
                    <td>观摩账户</td>
                    <td>CapstoneGlobal</td>
                    <td>2021-04-12 14:09:41</td>
                    <td>模拟</td>
                    <td>已添加</td>
                    <td>
                        <a @click="manageAccount" class="primary">修改</a>
                        <a href="#" class="default">删除</a>
                    </td>
                </tr>
            </tbody>
        </table> -->
        <p class="table_desc" style="margin-right: 10px;">所选交易商平台好不好,<a href="#">去云评测？</a></p>
        <div class="no_info">
            <a class="primary_btn" @click="addAccount"><i class="iconfont">&#xe767;</i> 添加账户</a>
        </div>
    </div>
</template>
<style>
.account_table .el-table tr,
.account_table .el-table th{
    background: none;
}
</style>
<script>
import { getUserAccountList } from '@/service/user';

export default {
    name: 'AccountAdmin',
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            tableData: [],
            innerVisible: false
        };
    },
    watch: {
        visible(val) {
            this.innerVisible = val;
            if(val) {
                this.getList();
            }
        }
    },
    methods: {
        getList() {
            const userId = localStorage.getItem('webUserId') || '';
            getUserAccountList({ userId}).then((data) => {
                if (data.length) {
                    this.tableData = data;
                }
            });
        },
        addAccount() {
            this.$emit('addAccount', {});
        },
        manageAccount(data) {
            this.$emit('manageAccount', { type: 'edit', accountNo: data });
        }
    },
    created() {
        // this.test();
    }
};
</script>