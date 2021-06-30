<template>
    <div class="neiye_content userinfo-area">
        <p class="edit-font" v-if="!noAccont && hasUserInfo" @click="editMode">修改</p>
        <div class="empty-area" v-if="noAccont">
            <div class="img-area"></div>
            <p class="tip">您还没有加入账户</p>
            <div class="no_info">
                <a class="primary_btn" @click="showAccount"><i class="iconfont">&#xe767;</i> 添加账户</a>
            </div>
        </div>

        <div v-else>
            <div v-if="hasUserInfo">
                <div class="frm_user_info">
                    <div class="user_avartar"><img style="width: 100%" src="../../assets/img/avator-bg.png"></div>
                </div>
                <div class="item">
                    <label>用户名:</label>
                    <div class="ipt">
                        {{ruleForm.username}}
                    </div>
                </div>
                <div class="item">
                    <label><span class="require">*</span>昵称:</label>
                    <div class="ipt">
                        {{ruleForm.nickname}}
                    </div>
                </div>
                <div class="item">
                    <label>E-mail:</label>
                    <div class="ipt">
                        {{ruleForm.email}}
                    </div>
                </div>
                <div class="item require">
                    <label><span class="require">*</span>性别:</label>
                    <div class="ipt">
                        {{ruleForm.gender}}
                    </div>
                </div>
                <div class="item">
                    <label>居住地:</label>
                    <div class="ipt">
                        {{ruleForm.address}}
                    </div>
                </div>
                
                <div class="item require">
                    <label>联系方式:</label>
                    <div class="ipt">
                        {{ruleForm.phone}}
                    </div>
                </div>
                <div class="item require">
                    <label>行业类型:</label>
                    <div class="ipt">
                        {{ruleForm.tradecategory}}
                    </div>
                </div>
                <div class="item require">
                    <label>交易风格:</label>
                    <div class="ipt">
                        {{ruleForm.tradestyle}}
                    </div>
                </div>
                <div class="item require">
                    <label>交易品种:</label>
                    <div class="ipt">
                        {{ruleForm.tradevariety}}
                    </div>
                </div>
                <div class="item require">
                    <label>交易策略:</label>
                    <div class="ipt">
                        {{ruleForm.tradestraregy}}
                    </div>
                </div>
            </div>

            <el-form v-else :model="ruleForm" :rules="rules" ref="accountForm" label-width="150px" size="small">

                <div class="frm_user_info">
                    <div class="user_avartar"><img style="width: 100%; margin-left: 40px;" src="../../assets/img/avator-bg.png"></div>
                </div>

                <div class="item">
                    <el-form-item label="用户名：">
                        <el-input type="text" class="ipt_md" v-model.trim="ruleForm.username" autocomplete="off" maxlength="20" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                </div>
                <div class="item">
                    <el-form-item label="昵称：" prop="nickname">
                        <el-input type="text" class="ipt_md" v-model.trim="ruleForm.nickname" autocomplete="off" maxlength="20" placeholder="请输入昵称"></el-input>
                    </el-form-item>
                </div>
                <div class="item">
                    <el-form-item label="E-mail：">
                        <el-input type="text" class="ipt_md" v-model.trim="ruleForm.email" autocomplete="off" maxlength="60" placeholder="请输入"></el-input>
                    </el-form-item>
                </div>
                <div class="item">
                    <el-form-item label="性别：" required>
                        <el-radio-group v-model="ruleForm.gender">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
                <div class="item">
                    <el-form-item label="居住地：">
                        <el-input type="text" class="ipt_md" v-model.trim="ruleForm.address" autocomplete="off" maxlength="60" placeholder="中国大陆-河北-廊坊"></el-input>
                    </el-form-item>
                </div>
                <!-- <div class="item">
                    <el-form-item label="公司信息：">
                        <el-input type="text" class="ipt_md" v-model.trim="ruleForm.company" autocomplete="off" placeholder="请输入"></el-input>
                    </el-form-item>
                </div> -->
                <div class="item">
                    <el-form-item label="联系方式：">
                        <el-input type="text" class="ipt_md" v-model.trim="ruleForm.phone" autocomplete="off" maxlength="30" placeholder="请输入"></el-input>
                    </el-form-item>
                </div>
                <div class="item">
                    <el-form-item label="行业类型：">
                        <el-input type="text" class="ipt_md" v-model.trim="ruleForm.tradecategory" autocomplete="off" maxlength="60" placeholder="请输入"></el-input>
                    </el-form-item>
                </div>
                <div class="item">
                    <el-form-item label="交易风格：">
                        <el-input type="text" class="ipt_md" v-model.trim="ruleForm.tradestyle" autocomplete="off" maxlength="60" placeholder="请输入"></el-input>
                    </el-form-item>
                </div>
                <div class="item">
                    <el-form-item label="交易品种：">
                        <el-input type="text" class="ipt_md" v-model.trim="ruleForm.tradevariety" autocomplete="off" maxlength="60" placeholder="请输入"></el-input>
                    </el-form-item>
                </div>
                <div class="item">
                    <el-form-item label="交易策略：">
                        <el-input type="text" class="ipt_md" v-model.trim="ruleForm.tradestraregy" autocomplete="off" maxlength="60" placeholder="请输入"></el-input>
                    </el-form-item>
                </div>
                <div class="bottom_item">
                    <button type="button" @click="submit" class="primary" :loading="loading">保存</button>
                </div>
                
            </el-form>

            <div class="tip-font">
                <div class="title"><i class="el-icon-s-opportunity"></i>温馨提示</div>
                <p class="font"><span class="require">*</span>填写您的居住地有利于汇友之家同城线下活动.</p>
                <p class="font"><span class="require">*</span>填写您的工作信息有利于交朋结友或商业推广.</p>
            </div>
        </div>

        <!-- <div class="item require">
            <label>公司信息:</label>
            <div class="ipt">

            </div>
        </div> -->
        
    </div>
</template>
<style lang="scss" scoped>
.neiye_content{
    overflow: visible;
}
.edit-font{
    position: relative;
    text-align: right;
    margin-top: -48px;
    z-index: 10;
}
.empty-area{
    padding-top: 120px;
    .img-area{
        display: inline-block;
        width: 140px;
        height: 140px;
        border-radius: 50%;
        background: #6840F9;
        border:4px solid #fff;
        box-shadow: 0 2px 4px rgba(0,0,0,.3);
        margin: 0 auto 20px;
    }
    text-align: center;
    .tip{
        font-size: 15px;
        color: #000;
        font-weight: bold;
    }
    .no_info{
        padding: 0;
    }
    .primary_btn {
        color: #fff;
        padding: .75rem 20px;
        border-radius: 30px;
        background: #6E4FF4;
        margin: 0;
    }
}
.user_avartar{
    width: 100px;
    height: 100px;
    margin: 60px 0 44px 120px;
    text-align: center;
}
.item{
    display: flex;
    font-size: 14px;
    color: #646A8D;
    margin-bottom: 14px;
    .require{
        color: red;
        display: inline-block;
        margin-right: 10px;
    }
    label{
        width: 100px;
        text-align:right;
        margin-right: 40px;
    }
    .ipt{
        flex: 1;
    }
}
.tip-font{
    color: #7A7A7A;
    margin-top: 60px;
    line-height: 1.5;
    margin-left: 126px;
    .el-icon-s-opportunity, .require{color: red; display: inline-block; margin-right: 6px;}
    .font{
        margin-left: 20px;
    }
}
.bottom_item {
    padding: 2rem 0;
    text-align: center;
    width: 600px;
}
</style>
<style>
.userinfo-area .el-form-item--small.el-form-item{
    margin-bottom: 10px;
}
.userinfo-area .ipt_md input[type=text]{
    width: 360px !important;
}
</style>
<script>
import { getUserInfo, updateUser } from '@/service/user';

export default {
    name: 'UserInfo',
    data() {
        return {
            userid: '',
            noAccont: true,
            hasUserInfo: false,
            ruleForm: {
                username: '',
                nickname: '',
                email: '',
                gender: '男',
                address: '',
                phone: '',
                tradecategory: '', // 行业类别
                tradestyle: '', // 交易风格
                tradevariety: '', // 交易品种
                tradestraregy: '' // 交易策略
            },
            loading: false,
            rules: {
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        showAccount() {
            this.noAccont = false;
            this.$emit('addAccount', {});
        },
        submit() {
            const obj = {
                userid: this.userid,
                username: this.ruleForm.username,
                nickname: this.ruleForm.nickname,
                email: this.ruleForm.email,
                gender: this.ruleForm.gender,
                address: this.ruleForm.address,
                phone: this.ruleForm.phone,
                tradecategory: this.ruleForm.tradecategory, // 行业类别
                tradestyle: this.ruleForm.tradestyle, // 交易风格
                tradevariety: this.ruleForm.tradevariety, // 交易品种
                tradestraregy: this.ruleForm.tradestraregy // 交易策略
            };
            console.log(obj);
            updateUser(obj).then((data) => {
                if (data) {
                    this.$message({
                        message: '设置账户成功',
                        type: 'success'
                    });
                    this.hasUserInfo = true;
                    this.noAccont = false;
                }
            });
        },
        editMode() {
            this.hasUserInfo = false;
        },
        getInfo() {
            const userId = localStorage.getItem('webUserId') || '';
            this.userid = userId;
            if (userId) {
                getUserInfo({ userId: userId }).then(data => {
                    if (data && data.nickname) {
                        this.hasUserInfo = true;
                        this.ruleForm = data;
                        this.noAccont = false;
                    } else {
                        this.noAccont = true;
                    }
                });
            }
        }
    },
    created() {
        this.getInfo();
    }
};
</script>