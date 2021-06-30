<template>
<div class="account-page">

    <Account-mes v-if="pageMode==='mes'" :current="mesCurrent" @change="changeMesTab"></Account-mes>
    <template v-else>
        <div class="neiye_hd">
            <ul>
                <li :class="[currentMenu === 'account' ? 'active': '']" @click="showMenuMain('account')">
                    <a>
                        <i class="ico_gerenxinxi"></i>个人信息
                    </a>
                </li>
                <li :class="[currentMenu === 'manage' ? 'active': '']" @click="showMenuMain('manage')">
                    <a>
                        <i class="ico_zhanghaoguanli"></i>交易账号管理
                    </a>
                </li>
            </ul>
        </div>
        <div class="neiye_body">
            <template v-if="currentMenu === 'account'">
                <div class="tab_hd" v-if="currentMenu === 'account'">
                    <ul>
                        <li :class="[currentShow === 'userInfoShowMark' ? 'active': '']" @click="showItem('userInfoShowMark')"><a>个人资料</a></li>
                        <li :class="[currentShow === 'setpassShowMark' ? 'active': '']" @click="showItem('setpassShowMark')"><a>安全设置</a></li>
                    </ul>
                    <!-- <span class="edit-font" v-if="editMark">修改</span>	 -->
                </div>

                <User-info v-if="currentShow === 'userInfoShowMark'" @addAccount="addAccount"></User-info>
                <Account-setpass v-if="currentShow === 'setpassShowMark'"></Account-setpass>

            </template>

            <template v-else>
                <div class="tab_hd">
                    <ul>
                        <li :class="[currentShow === 'adminShowMark' ? 'active': '']" @click="showItem('adminShowMark')"><a>账户管理</a></li>
                        <li :class="[currentShow === 'addShowMark' ? 'active': '']" @click="showItem('addShowMark')"><a>添加账户</a></li>
                    </ul>	
                </div>

                <!-- v-if="adminShowMark" -->
                <Account-admin
                    :visible="adminShowMark"
                    @addAccount="manageAccount('addShowMark')"
                    @manageAccount= "manageListAccount"
                ></Account-admin>
                <Account-add 
                    :visible="currentShow === 'addShowMark'" 
                    :type="accountType"
                    :item="accountData"
                    @manageAccountAddsub="manageAccount('adminShowMark')"
                    @manageAccountAddCancel="manageAccount('adminShowMark')"
                ></Account-add>
                <!-- <Account-resetpass v-if="resetpassShowMark"></Account-resetpass>  -->
                <!-- <Account-edit v-if="editShowMark"></Account-edit>  -->
            </template>
        </div>
    </template>

    <p class="page-tip">
        风险提示： 保证金交易是杠杆产品，存在较高的风险，不适合所有投资者。决定参与交易前 ，您应该谨慎考虑您的投资目标、经验等级及风险承受能力。您可能会亏损部分或者全部资金。交易者应该清楚的了解与交易相关联的所有风险，如果您有任何疑问，可在必要时向独立的金融顾问征询意见。过去的交易成绩并不代表以后的交易成绩，牛人榜所列信息仅供参考，不构成投资建议，也不代表任何形式的推荐或诱导信息。
    </p>
    
</div>
</template>
<style>
@import "../../assets/css/style.css";
.account-page{
    background: #fff;
    padding: 20px;
}
.page-tip{
    font-size: 14px;
    color: #AEAEAE;
    line-height: 24px;
    padding: 20px 20px 40px;
}
.frm_account .sec_title{
    font-weight: bold;
}
.ipt .el-input--small .el-input__inner {
    height: 46px;
    line-height: 46px;
}
.tab_hd .edit-font{
    position: absolute;
    right: 40px;
    top: 0;
}
</style>
<script>
import { getUserInfo } from '@/service/user';
import AccountAdd from './AccountAdd';
import AccountAdmin from './AccountAdmin';
import AccountMes from './AccountMes';
// import AccountResetpass from './AccountResetpass';
import UserInfo from './UserInfo';
import AccountSetpass from './AccountSetpass';

export default {
    components: {
        AccountAdd,
        AccountAdmin,
        // AccountEdit,
        // AccountResetpass,
        AccountSetpass,
        UserInfo,
        AccountMes
    },
    data() {
        return {
            pageMode: 'account',
            currentMenu: 'account',
            // editMark: false,
            currentShow: 'userInfoShowMark',
            accountType: 'add',
            accountData: { name: 'gegeg' },
            adminShowMark: false,
            mesCurrent: 0
        };
    },
    methods: {
        test() {
            console.log('memem');
        },
        changeMesTab(data) {
            this.mesCurrent = data.index;
        },
        showMenuMain(item) {
            this.$router.push({ path: `/account?currentMenu=${item}` });
        },
        showMenu(item) {
            this.currentMenu = item;
            if (item === 'account') {
                this.currentShow = 'userInfoShowMark';
                this.$nextTick(() => {
                    this.adminShowMark = false;
                });
            } else {
                this.currentShow = 'adminShowMark';
                this.$nextTick(() => {
                    this.adminShowMark = true;
                });
            }

            // this.editMark = false;
        },
        showItem(item) {
            this.currentShow = item;

            if (this.currentShow === 'adminShowMark') {
                this.$nextTick(() => {
                    this.adminShowMark = true;
                });
            } else {
                this.$nextTick(() => {
                    this.adminShowMark = false;
                });
            }

            // this.editMark = false;
        },
        addAccount() {
            // this.editMark = true;
        },
        manageAccount(item) {
            this.accountType = 'add';
            this.showItem(item);
        },
        manageListAccount(data) {
            this.accountType = 'edit';
            this.accountData = data;
            // accountNo
            this.showItem('addShowMark');
        }
    },
    // beforeRouteEnter(to, from, next) {
    //     next((vm) => {
    //         const query = { ...to.query };
    //         console.log(query);
    //         if (query.mode) {
    //             vm.pageMode = query.mode;
    //             vm.mesCurrent = Number(query.current);
    //         } else {
    //             vm.pageMode = 'account';
    //             vm.mesCurrent = 0;
    //         }
    //     });
    // },
    mounted() {
        if (location.href.indexOf('mes') > -1) {
            this.pageMode = 'mes';
        }
    },
    activated() {
        console.log('activated');
    },
    created() {
        console.log('created');
        const query = this.$route.query;
        if (query.mode) {
            this.pageMode = query.mode;
            this.mesCurrent = Number(query.current);
        } else {
            this.pageMode = 'account';
            if (query.currentMenu) {
                // this.currentMenu = query.currentMenu;
                this.showMenu(query.currentMenu);
            } else {
                // this.currentMenu = 'account';
                this.showMenu('account');
            }
            this.mesCurrent = 0;
        }
        const userId = localStorage.getItem('webUserId') || '';
        if (userId) {
            getUserInfo({ userId: userId }).then(data => {
                console.log(data);
                if (!data) {
                    this.$router.push({ path: '/login', query: { redirect: '/account'} });
                }
            });
        } else {
            this.$router.push({ path: '/login', query: { redirect: '/account'} });
        }
    }
};
</script>