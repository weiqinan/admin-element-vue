<template>
    <div class="user_body regist-area">
        <div class="frm_login">
            <h3 class="title">欢迎注册量化街</h3>
            <div class="item_list layui-form">
                <el-form :model="ruleForm" :rules="rules" ref="registForm" label-width="0" size="medium">
                    <div class="item">
                        <el-form-item label="" prop="userid">
                            <el-input  class="ipt user"  v-model.trim="ruleForm.userid" autocomplete="off" placeholder="请输入邮箱账号">
                            </el-input>            
                        </el-form-item>
                    </div>

                    <div class="item">
                        <input type="text" class="ipt code" id="veryfyCode" placeholder="输入验证码">
                        <button type="button" id="getpass">获取验证码</button>
                    </div>


                    <!-- <div class="item">
                        <input type="text" v-model.trim="ruleForm.userid" class="ipt user" placeholder="请输入邮箱账号">
                    </div> -->
                
                    <div class="item">
                        <button type="button" :loading="loading" class="btn_login" @click="regist('registForm')">注册/登录</button>
                    </div>
                </el-form>

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
<style>
.regist-area .el-input--medium .el-input__inner {
    height: 32px;
    line-height: 32px;
}
.regist-area .el-input__inner{
    border: 0 none;
    padding: 0;
    background: none;
    vertical-align: top;
}
</style>
<script>
// 
import { getUserInfo, regisAccount, setPassWord } from '@/service/user';
import { isEmail } from '@/utlis/rules';

export default {
    name: 'Login',
    data() {
        const checkEmail = (rule, value, callback) => {
            if (value) {
                if (!isEmail(value)) {
                    callback(new Error('请输入正确的邮箱格式'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        return {
            checked: false,
            loading: false,
            ruleForm: {
                userid: ''
            },
            rules: {
                userid: [{
                    validator: checkEmail
                }]
            }
        };
    },
    mounted() {
    },
    methods: {
        async getAccountData() {
            const userId = this.ruleForm.userid;
            const data = await getUserInfo({ userId: userId });
            if (data) {
                return true;
            }
            return false;
        },
        submitForm(formName) {
            this.$refs[formName].validate();
        },
        regist(formName) {
            const _this = this;
            _this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    _this.loading = true;
                    const res = await this.getAccountData();
                    if (res) {
                        this.$message.error('邮箱已被注册，请检查');
                    } else {
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
                    }
                }
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