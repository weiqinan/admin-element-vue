<template>
    <div class="user_body forget-area">
        <div class="frm_login">
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
                        <input type="text" class="ipt code" id="veryfyCode" placeholder="输入验证码">
                        <button type="button" id="getpass">获取验证码</button>
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
import { reSetPassWord, getUserInfo, setPassWord } from '@/service/user';
import { isEmail } from '@/utlis/rules';

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
            ruleForm: {
                userid: '',
                newPassword: '',
                newPassword2: '',
                oldPassword: ''
            },
            userId: '',
            rules: {
                userid: [{
                    validator: checkEmail
                }],
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
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
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