<template>
    <div class="user_body">
        <div class="frm_login">
            <h3 class="title">欢迎注册量化街</h3>
            <div class="item_list layui-form">
                <div class="item">
                    <input type="text" v-model.trim="ruleForm.userid" class="ipt user" placeholder="请输入邮箱账号">
                </div>
                <div class="item">
                    <input type="text" class="ipt code" id="veryfyCode" placeholder="输入验证码">
                    <button type="button" id="getpass">获取验证码</button>
                </div>
                <div class="item">
                    <button type="button" class="btn_login" @click="regist">注册/登录</button>
                </div>

                <!-- <div class="item">
                    <button type="button" class="btn_login" @click="setPassWord">设置密码</button>
                </div>

                <div class="item">
                    <button type="button" class="btn_login" @click="setStorage">设置用户名缓存</button>
                </div> -->

                <div class="item">
                    <div class="line" @click="gotoLogin"><a>账号密码登录</a></div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import "../../assets/css/style.css";
</style>
<script>
import { getUserInfo, regisAccount, setPassWord } from '@/service/user';

export default {
    name: 'Login',
    data() {
        return {
            checked: false,
            loading: false,
            ruleForm: {
                userid: ''
            }
        };
    },
    mounted() {
        this.test();
    },
    methods: {
        test() {
            const userId = localStorage.getItem('webUserId') || '';
            console.log(userId);
            getUserInfo({ userId: userId }).then(data => {
                console.log(data);
            }).catch(error => {
                console.log(error);
                // reject(error);
            });
        },
        regist() {
            const _this = this;
            // _this.$refs[formName].validate((valid) => {
            //   if (valid) {
                
            //   } else {
            //     console.log('error submit!!');
            //     return false;
            //   }
            // });
            _this.loading = true;
            regisAccount({
                email: this.ruleForm.userid,
                gender: 3,
                userid: this.ruleForm.userid,
                enabled: 1
            }).then((data) => {
                _this.loading = false;
                console.log(data);
                if (data) {
                    _this.setStorage();
                    _this.$router.push({ path: '/' });
                }
            }).catch(error => {
                console.log(error);
                _this.loading = false;
            });
        },
        setPassWord() {
            setPassWord({ 
                userid: this.ruleForm.userid,
                password: '123456123456'
              }).then(data => {
                console.log(data);
            }).catch(error => {
                console.log(error);
                // reject(error);
            });
        },
        getOtherQuery(query) {
            return Object.keys(query).reduce((acc, cur) => {
            if (cur !== 'redirect') {
                acc[cur] = query[cur];
            }
            return acc;
            }, {});
        },
        gotoLogin() {
            this.$router.push({ path: '/login' });
        },
        setStorage() {
            localStorage.setItem('webUserId', this.ruleForm.userid);
        }
    }
};
</script>