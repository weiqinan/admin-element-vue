<template>
    <div class="user_body forget-area">
        <div class="frm_login" style="width: 300px;">
			<h3 class="title">忘记密码</h3>
			<div class="item_list layui-form">
                <el-form :model="ruleForm" :rules="rules" ref="forgetPassForm" label-width="0" size="medium">
                    <div class="item">
                        <el-form-item label="" prop="userid">
                            <el-input  class="ipt user"  v-model.trim="ruleForm.userid" autocomplete="off" placeholder="请输入邮箱账号" @keyup.enter.native="submitForm('forgetPassForm')">
                            </el-input>            
                        </el-form-item>
                    </div>
                    <div class="item">
                        <el-form-item label="" prop="enterEmailCode">
                            <el-input style="width: 130px;" v-model.trim="ruleForm.enterEmailCode" autocomplete="off" class="ipt code" maxlength="6" placeholder="输入验证码" @keyup.enter.native="submitForm('forgetPassForm')"></el-input>
                            <button type="button" id="getpass" disabled v-if="verifyCountDown > 0">重新获取（{{verifyCountDown}}）</button>
                            <button type="button" id="getpass" v-else @click="sendEmailVerifyCode">获取验证码</button>
                        </el-form-item>
                    </div>
                    <div class="item">
                        <el-form-item label="" prop="newPassword">
                            <el-input type="password" class="ipt password" v-model.trim="ruleForm.newPassword" autocomplete="off" placeholder="请输入新密码" @keyup.enter.native="submitForm('forgetPassForm')">
                            </el-input>
                        </el-form-item>
                    </div>

                    <div class="item">
                        <el-form-item label="" prop="newPassword2">
                            <el-input type="password" class="ipt password" v-model.trim="ruleForm.newPassword2" autocomplete="off" placeholder="输入再次确认密码" @keyup.enter.native="submitForm('forgetPassForm')">
                            </el-input>
                        </el-form-item>
                    </div>

                    <!-- <div class="item">
                        <input type="password" class="ipt password" id="newpass" placeholder="请输入新密码">
                    </div>
                    <div class="item">
                        <input type="password" class="ipt password" id="repeatpass" placeholder="输入再次确认密码">
                    </div> -->

                    <div class="item">
                        <button type="button" :loading="loading" class="btn_login" @click="submitForm('forgetPassForm')">确定</button>
                    </div>
                </el-form>
			</div>
		</div>
    </div>
</template>
<style scoped>
@import "../../assets/css/style.css";
.item_list .item .ipt{
    width: 100%;
}
.frm_login #getpass{
    width: auto;
    padding: 0 16px;
    float: right;
}
</style>
<style>
.forget-area{
    box-sizing: border-box;
    overflow-x: hidden;
}
.forget-area .el-input--medium .el-input__inner {
    height: 32px;
    line-height: 32px;
}
.forget-area .el-input__inner{
    border: 0 none;
    padding: 0;
    background: none;
    vertical-align: top;
}
</style>
<script>
import { reSetPassWord, getUserInfo, setPassWord, sendEmailVerifyCode } from '@/service/user';
import { isEmail } from '@/utlis/rules';

let _lastTimer;

export default {
    data() {
        const checkPass = (rule, value, callback) => {
            if (value !== this.ruleForm.newPassword) {
                return callback(new Error(`要与新密码一致`));
            } else {
                callback();
            }
        };
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
            loading: false,
            verifyCountDown: 0,
            ruleForm: {
                userid: '',
                newPassword: '',
                newPassword2: '',
                oldPassword: '',
                enterEmailCode: ''
            },
            userId: '',
            emailCode: '',
            rules: {
                userid: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: checkEmail }
                ],
                enterEmailCode: [
                    { required: true, message: '输入验证码', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请输入您的新密码', trigger: 'blur' },
                    { min: 4, max: 25, message: '4-25位，不含有中文以及中英文单双引号', trigger: 'blur' }
                ],
                newPassword2: [
                    { required: true, message: '请确认您的新密码', trigger: 'blur' },
                    { min: 4, max: 25, message: '4-25位，不含有中文以及中英文单双引号', trigger: 'blur' },
                    {validator: checkPass }
                ]
            }
        };
    },
    methods: {
        async getInfo(id) {
            try {
                const data = await getUserInfo({ userId: id });
                if (data && data.password) {
                    this.oldPassword = data.password;
                    return 'has id';
                }
                return 'no id';
            } catch(error) {
                return 'error';
            }
        },
        countDown(second) {
            this.verifyCountDown = second;
            _lastTimer = Date.now();

            setTimeout(() => {
                second -= Math.round((Date.now() - _lastTimer) / 1000);
                if (second > 0) {
                    this.countDown(second);
                } else {
                    this.verifyCountDown = 0;
                }
            }, 1e3);
        },
        setPassWord() {
            setPassWord({ 
                userid: this.userId,
                password: this.ruleForm.newPassword
              }).then(data => {
                console.log(data);
                if (data) {
                    this.$message({
                        message: '密码设置成功',
                        type: 'success'
                    });
                    this.ruleForm.oldPassword = '';
                    this.ruleForm.newPassword = '';
                    this.ruleForm.newPassword2 = '';
                    this.hasPassWord = true;
                    this.rules.oldPassword.required = true;
                }
            }).catch(error => {
                console.log(error);
                // reject(error);
            });
        },
        sendEmailVerifyCode() {
            this.rules.newPassword[0].required = false;
            this.rules.newPassword2[0].required = false;
            this.rules.enterEmailCode[0].required = false;
            this.$refs.forgetPassForm.validate(async (valid) => {
                if (valid) {
                    sendEmailVerifyCode({ tomail: this.ruleForm.userid }).then((data) => {
                        if (data) {
                            this.$message({
                                message: '验证码发送成功，请去您的邮箱当中查看',
                                type: 'success'
                            });
                            this.emailCode = data;
                            this.countDown(60);
                        } else {
                            this.countDown(10);
                            this.$message.error('验证码发送失败，请稍后重试');
                        }
                    });
                }
            });
        },
        submitForm(formName) {
            this.rules.newPassword[0].required = true;
            this.rules.newPassword2[0].required = true;
            this.rules.enterEmailCode[0].required = true;
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    if (this.ruleForm.enterEmailCode !== this.emailCode) {
                        this.$message.error('验证码错误，请检查');
                        return;
                    }
                    const str = await this.getInfo(this.ruleForm.userid);
                    this.loading = true;

                    if (str === 'has id') {
                        const paramData = {
                            userId: this.ruleForm.userid,
                            oldPassword: this.oldPassword,
                            newPassword: this.ruleForm.newPassword
                        };

                        console.log(paramData);

                        reSetPassWord(paramData).then((data) => {
                            this.loading = false;
                            if (data) {
                                this.$message({
                                    message: '重设密码成功',
                                    type: 'success'
                                });
                                this.$router.push({ path: '/login' });
                            }
                        }).catch(error => {
                            console.log(error);
                            this.loading = false;
                        });
                    }

                    if (str === 'no id') {
                        this.$message.error('邮箱账号不存在，请检查');
                    }
                }
            });
        }
    },
    created() {
        // console.log('created');
        // const userId = localStorage.getItem('webUserId') || '';
        // this.userId = userId;
    }
};
</script>