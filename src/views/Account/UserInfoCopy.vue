<template>
    <div class="neiye_content">
        <div class="empty-area" v-if="noAccont">
            <div class="img-area"></div>
            <p class="tip">您还没有加入账户</p>
            <div class="no_info">
                <a class="primary_btn" @click="showAccount"><i class="iconfont">&#xe767;</i> 添加账户</a>
            </div>
        </div>

        <div class="item">
            <el-form-item label="账户号码" prop="accountno">
                <el-input type="text" class="ipt_md" v-model.trim="ruleForm.accountno" autocomplete="off" placeholder="首位非零的4-16位密码"></el-input>
            </el-form-item>
        </div>

        <div v-else>
            <div class="frm_user_info">
                <div class="user_avartar"><img src="../../assets/img/user_avartar.png"></div>
            </div>
            <div class="item">
                <label>用户名:</label>
                <div class="ipt">
                    123456
                </div>
            </div>
            <div class="item">
                <label><span class="require">*</span>昵称:</label>
                <div class="ipt">
                    123456
                </div>
            </div>
            <div class="item">
                <label>E-mail:</label>
                <div class="ipt">
                    123456@qq.com
                </div>
            </div>
            <div class="item require">
                <label><span class="require">*</span>性别:</label>
                <div class="ipt">
                    男
                </div>
            </div>
            <div class="item">
                <label>居住地:</label>
                <div class="ipt">
                    中国大陆-河北-廊坊
                </div>
            </div>
            <div class="item require">
                <label>公司信息:</label>
                <div class="ipt">

                </div>
            </div>
            <div class="item require">
                <label>联系方式:</label>
                <div class="ipt">
            
                </div>
            </div>
            <div class="item require">
                <label>行业类型:</label>
                <div class="ipt">
            
                </div>
            </div>
            <div class="item require">
                <label>交易风格:</label>
                <div class="ipt">
            
                </div>
            </div>
            <div class="item require">
                <label>交易品种:</label>
                <div class="ipt">
            
                </div>
            </div>
            <div class="item require">
                <label>交易策略:</label>
                <div class="ipt">
                </div>
            </div>

            <div class="tip-font">
                <div class="title"><i class="el-icon-s-opportunity"></i>温馨提示</div>
                <p class="font"><span class="require">*</span>填写您的居住地有利于汇友之家同城线下活动.</p>
                <p class="font"><span class="require">*</span>填写您的工作信息有利于交朋结友或商业推广.</p>
            </div>
        </div>
        
    </div>
</template>
<style lang="scss" scoped>
.empty-area{
    margin-top: 40px;
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
    margin: 60px auto 44px;
    background: #eee;
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
        width: 200px;
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
</style>
<script>
export default {
    name: 'UserInfo',
    data() {
        return {
            noAccont: true
        };
    },
    methods: {
        showAccount() {
            this.noAccont = false;
            this.$emit('addAccount', {});
        }
    },
    created() {
        // this.test();
    }
};
</script>