<template>
    <div class="neiye_content">
        <div class="no_info" v-if="emptyMark" @click="openSet">
            <strong class="block">{{font}}</strong>
            <a class="primary_btn">设置</a>
        </div>

        <!-- 点击了就出现下面的视觉 -->
        <div class="frm_pass" v-else>
            <el-form :model="ruleForm" :rules="rules" ref="setPassForm" label-width="80px" size="small">
                <el-form-item v-if="hasPassWord" label="旧密码" prop="oldPassword">
                    <el-input class="ipt user" v-model.trim="ruleForm.oldPassword" autocomplete="off" placeholder="请输入您的旧密码" @keyup.enter.native="submitForm('setPassForm')">
                    </el-input>            
                </el-form-item>

                <el-form-item label="新密码" prop="newPassword">
                    <el-input type="password" class="ipt user" v-model.trim="ruleForm.newPassword" autocomplete="off" placeholder="请输入您的新密码" @keyup.enter.native="submitForm('setPassForm')">
                    </el-input>
                    <div class="tips">4-25位，不含有中文以及中英文单双引号</div>            
                </el-form-item>

                <el-form-item label="新密码" prop="newPassword2">
                    <el-input type="password" class="ipt user" v-model.trim="ruleForm.newPassword2" autocomplete="off" placeholder="请确认您的新密码" @keyup.enter.native="submitForm('setPassForm')">
                    </el-input>            
                </el-form-item>

                <el-form-item>
                    <div class="item">
                        <button type="button" v-if="hasPassWord" @click="submitForm('setPassForm')" class="primary" :loading="loading">确认</button>
                        <button type="button" v-else @click="setPassWord" class="primary" :loading="loading">确认</button>
                        
                        <button type="button"  class="default" @click="cancel">取消</button>
                    </div>
                </el-form-item>
            </el-form>
            
        </div>
    </div>
</template>
<style>
.frm_pass .el-form-item--small .el-form-item__label{
    line-height: 46px;
}
.frm_pass .el-input--small .el-input__inner {
    height: 46px;
    line-height: 46px;
    border: 1px solid #646A8D;
}
</style>
<script>
import { reSetPassWord, getUserInfo, setPassWord } from '@/service/user';

export default {
    name: 'AccountSetpass',
    data() {
        const checkPass = (rule, value, callback) => {
            if (value !== this.ruleForm.newPassword) {
                return callback(new Error(`要与新密码一致`));
            } else {
                callback();
            }
        };
        return {
            font: '未设置登录密码',
            loading: false,
            emptyMark: true,
            hasPassWord: false,
            ruleForm: {
                userId: '',
                oldPassword: '',
                newPassword: '',
                newPassword2: ''
            },
            userId: '',
            rules: {
                oldPassword: [
                    { required: true, message: '请输入您的旧密码', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请输入您的新密码', trigger: 'blur' },
                    { min: 4, max: 25, message: '格式输入错误', trigger: 'blur' }
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
        getInfo(id) {
            getUserInfo({ userId: id }).then(data => {
                if (data && data.password) {
                    this.emptyMark = false;
                    this.hasPassWord = true;
                    this.rules.oldPassword.required = true;
                } else {
                    this.hasPassWord = false;
                    this.rules.oldPassword.required = false;
                    this.emptyMark = true;
                }
            }).catch(error => {
                console.log(error);
                this.hasPassWord = false;
                this.emptyMark = true;
                this.rules.oldPassword.required = false;
            });
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
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    const userId = localStorage.getItem('webUserId') || '';
                    this.ruleForm.userId = userId;

                    const paramData = {
                        userId: this.ruleForm.userId,
                        oldPassword: this.ruleForm.oldPassword,
                        newPassword: this.ruleForm.newPassword
                    };

                    reSetPassWord(paramData).then((data) => {
                        this.loading = false;
                        if (data) {
                            this.$message({
                                message: '密码设置成功',
                                type: 'success'
                            });
                            this.emptyMark = true;
                        }
                    }).catch(error => {
                        console.log(error);
                        this.loading = false;
                    });
                }
            });
        },
        openSet() {
            this.emptyMark = false;
        },
        cancel() {
            this.emptyMark = true;
        }
    },
    created() {
        const userId = localStorage.getItem('webUserId') || '';
        this.userId = userId;
        this.getInfo(userId);
    }
};
</script>