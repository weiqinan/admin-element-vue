<template>
  <div class="login user_body">

        <div class="form frm_login">
			<h3 class="title">欢迎登录量化街</h3>
			<div class="item_list layui-form">

                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0" size="medium">
                    <div class="item">
                        <el-form-item label="" prop="userid">
                            <el-input class="ipt user"  v-model.trim="ruleForm.userid" autocomplete="off" placeholder="请输入邮箱账号" @keyup.enter.native="submitForm('ruleForm')">
                                <!-- <i slot="prefix" class="el-input__icon el-icon-user"></i> -->
                            </el-input>            
                        </el-form-item>
                    </div>

                    <div class="item">
                        <el-form-item label="" prop="password">
                            <el-input type="password" class="ipt password" v-model.trim="ruleForm.password" autocomplete="off" placeholder="输入密码" @keyup.enter.native="submitForm('ruleForm')">
                                <!-- <i slot="prefix" class="el-input__icon el-icon-lock"></i> -->
                            </el-input>
                        </el-form-item>
                    </div>

                    <div class="item">
                        <el-checkbox v-model="checked">记住密码</el-checkbox>
                        <a class="fr" @click="gotoForget">忘记密码?</a>
                    </div>
                    <div class="item">
                        <button type="button" @click="submitForm('ruleForm')" class="btn_login">登录</button>
                    </div>
                    <div class="item">
                        <div class="line" @click="gotoRegis"><a>用户注册</a></div>
                    </div>
                </el-form>
			</div>
		</div>
  </div>
</template>
<style>
.frm_login .el-input__inner{
    padding-left: 0;
    background: none;
    border: 0 none;
    vertical-align: top;
    height: 32px;
    line-height: 32px;
}
</style>
<script>
// getUserInfo
import { startMt4 } from '@/service/user';
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
            userId: '',
            ruleForm: {
                userid: '',
                password: ''
            },
            rules: {
                userid: [{
                    validator: checkEmail
                }],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
                ]
            },
            redirect: undefined,
            otherQuery: {}
        };
    },
    watch: {
      $route: {
        handler: function(route) {
          const query = route.query;
          if (query) {
            this.redirect = query.redirect;
            this.otherQuery = this.getOtherQuery(query);
          }
        },
        immediate: true
      }
    },
    mounted() {
        // const userId = localStorage.getItem('webUserId') || '';
        // this.userId = userId;
        // getUserInfo({ userId: userId }).then(data => {
        //     console.log(data);
        // });
    },
    methods: {
        submitForm(formName) {
            const _this = this;
            _this.$refs[formName].validate((valid) => {
              if (valid) {
                  _this.loading = true;
                  const paramData = {
                      userid: _this.ruleForm.userid,
                      password: _this.ruleForm.password
                  };
                  _this.$store.dispatch('user/login', paramData).then((data) => {
                        if (data) {
                            startMt4({ userId: _this.ruleForm.userid  }).then(() => {
                                console.log('ok');
                            });
                            _this.setStorage();
                            _this.$router.push({ path: _this.redirect || '/', query: _this.otherQuery },() => {});
                        } else {
                            _this.$message.error('密码或账号错误');
                        }
                        _this.loading = false;
                    }).catch(error => {
                        _this.$message.error(error.msg || 'Has Error');
                        _this.loading = false;
                  });
              } else {
                console.log('error submit!!');
                return false;
              }
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
      gotoRegis() {
          this.$router.push({ path: '/regist' });
      },
      gotoForget() {
          this.$router.push({ path: '/forgetpass' });
      },
      setStorage() {
        localStorage.setItem('webUserId', this.ruleForm.userid);
      }
    }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/style.css";
.login {
  display: flex;
  width: 100%;
  height: 100vh;
  min-height: 500px;
  overflow: auto;
//   background-image: url("../../assets/images/bg-smooth.jpg");
//   background-repeat: no-repeat;
//   background-position: center center;
//   background-attachment: fixed;
//   background-size: cover;
  align-items: center;
  .form{
      flex: none;
      width: 300px;
      padding: 40px;
      margin: 0 auto;
      border-radius: 4px;
    //   background-color: rgba($color: #FFFFFF, $alpha: 0.2);
      .submit{
        margin-top: 30px;
        width: 100%;
      }
  }
}
</style>
