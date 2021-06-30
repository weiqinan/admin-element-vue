<template>
    <div class="" v-if="innerVisible">
        <div class="my_account">
            <i class="ico_my_account"></i>我的账户
        </div>
        <div class="neiye_content">
            <div class="layui-form frm_account">
                <el-form :model="ruleForm" :rules="rules" ref="accountForm" label-width="150px" size="small">
                    <div v-if="type ==='add'">
                        <div class="sec_title">交易软件</div>
                        <div class="item">
                            <el-form-item label="" prop="platformcode">
                                <el-select v-model="ruleForm.platformcode" placeholder="请选择平台">
                                    <el-option
                                    v-for="item in platformcodeArr"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                <div class="tips">请注意，自动更新模式下的账户更新会根据服务器负载的不同而有所变化。</div>
                            </el-form-item>
                        </div>
                         
                        <div class="sec_title">交易商</div>
                        <div class="item">
                            <el-form-item label="交易商" prop="traderid">
                                <el-select v-model="ruleForm.traderid" @change="traderidChange" placeholder="请选择交易商">
                                    <el-option
                                    v-for="item in traderidArr"
                                    :key="item.traderid"
                                    :label="item.tradername"
                                    :value="item.traderid">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        
                        <div class="item">
                            <el-form-item label="服务器" prop="trader_serverid">
                                <el-select v-model="ruleForm.trader_serverid" placeholder="请选择服务器">
                                    <el-option
                                    v-for="item in traderServeridArr"
                                    :key="item.trader_serverid"
                                    :label="item.srvname"
                                    :value="item.trader_serverid">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
 
                        <div class="item">
                            <el-form-item label="账户号码" prop="accountno">
                                <el-input type="text" class="ipt_md" v-model.trim="ruleForm.accountno" autocomplete="off" placeholder="首位非零的4-16位密码"></el-input>
                            </el-form-item>
                        </div>

                        <div class="item">
                            <el-form-item label="投资人密码" prop="password">
                                <el-input type="text" class="ipt_md" v-model.trim="ruleForm.password" autocomplete="off" placeholder="4-25位，不含有中文以及中英文单双引号"></el-input>
                                <div class="tips">没有你想提交的经纪商？<a href="#" style="color: #f00;">点击申请提交</a>&nbsp;&nbsp;&nbsp;&nbsp;账户被他人绑定？<a href="#" style="color: #f00;">点击账户领回</a></div>
                            </el-form-item>
                        </div>

                    </div>

                    <div v-if="type==='edit'">
                        <div class="sec_title">交易软件</div>
                        <div class="item">
                            <div class="label"></div>
                            <div class="ipt">{{platformcodeArr[0].label}}</div>
                        </div>
                        <div class="sec_title">交易商</div>
                        <div class="item">
                            <div class="label bitian">交易商</div>
                            <div class="ipt">{{ruleForm.TraderInfo.tradername}}</div>
                        </div>
                        <div class="item">
                            <div class="label bitian">服务器</div>
                            <div class="ipt">{{ruleForm.DefaultTraderServerInfo.srvname}}</div>
                        </div>
                        <div class="item">
                            <div class="label bitian">账户号码</div>
                            <div class="ipt">{{ruleForm.accountno}}</div>
                        </div>

                        <div class="item" v-if="!editPassMark">
                            <div class="label bitian">投资人密码</div>
                            <div class="ipt" style="margin-top: -12px;">
                                <button class="change_pass" @click="editPass"><i class="iconfont">&#xe6c0;</i> 更改密码</button>
                                <div id="defult_pass">原始密码:<code>{{oldPassword}}</code></div>
                            </div>
                        </div>

                        <div class="item" v-if="editPassMark">
                            <el-form-item label="投资人密码" prop="password">
                                <el-input type="text" class="ipt_md" v-model.trim="ruleForm.password" autocomplete="off" placeholder="4-25位，不含有中文以及中英文单双引号"></el-input>
                                <button type="button" class="primary" :loading="loading2" @click="editPassSub">确认</button>
                                <button type="button" @click="editPassCancel" class="default">取消</button>
                                <div class="tips">4-25位，不含有中文以及中英文单双引号</div>
                            </el-form-item>
                        </div>

                    </div>  

                    <div class="sec_title">账户信息</div>
                    <div class="item">
                        <el-form-item label="账户昵称" prop="nickname">
                            <el-input type="text" class="ipt_md" v-model.trim="ruleForm.nickname" autocomplete="off" placeholder="账户长度为1-10位字符长度"></el-input>
                        </el-form-item>
                    </div>

                        
                    <div class="item">
                        <el-form-item label="交易风格">
                            <el-select v-model="ruleForm.tradestylecode" placeholder="请选择交易风格">
                                <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>

                    <div class="item">
                        <el-form-item label="杠杆比例">
                            <el-select v-model="ruleForm.leveragecode" placeholder="请选择杠杆比例">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>

                    <div class="sec_title">许可<div class="fr">私密/公开</div></div>
                    <div class="item">
                        <div class="switch_desc">账户<span>(私密仅自己可见，公开所有网友可见)</span></div>
                        <div class="switch fr">
                            <el-switch
                                v-model="ruleForm.allow_account"
                                active-color="#636B90"
                                inactive-color="#ee0a24"
                                :active-value="1"
                                :inactive-value="0">
                            </el-switch>
                        </div>
                    </div>

                    <div class="item">
                        <div class="switch_desc">历史交易<span>(为了保证牛人榜账户的真实性，在账户公开的情况下，历史交易也是公开的)</span></div>
                        <div class="switch fr">
                            <el-switch
                                v-model="ruleForm.allow_tradehistory"
                                active-color="#636B90"
                                inactive-color="#ee0a24"
                                :active-value="1"
                                :inactive-value="0">
                            </el-switch>
                        </div>
                    </div>

                    <div class="item">
                        <div class="switch_desc">当前持仓/挂单<span>(私密仅自己可见，公开可选择全部公开，或勾选菜单中想公开的选项)</span></div>
                        <div class="switch fr">
                            <el-switch
                                v-model="ruleForm.allow_order"
                                active-color="#636B90"
                                inactive-color="#ee0a24"
                                :active-value="1"
                                :inactive-value="0">
                            </el-switch>
                        </div>
                    </div>

                    <div class="item" style="margin-top:40px">
                        <div class="radio-item-area">
                            <div class="font">订单号</div>
                            <div class="switch fr">
                                <el-switch
                                    v-model="ruleForm.allow_order_no"
                                    active-color="#636B90"
                                    inactive-color="#ee0a24"
                                    :active-value="1"
                                    :inactive-value="0">
                                </el-switch>
                            </div>
                        </div>
                        <div class="radio-item-area">
                            <div class="font">手数</div>
                            <div class="switch fr">
                                <el-switch
                                    v-model="ruleForm.allow_order_volume"
                                    active-color="#636B90"
                                    inactive-color="#ee0a24"
                                    :active-value="1"
                                    :inactive-value="0">
                                </el-switch>
                            </div>
                        </div>
                        <div class="radio-item-area">
                            <div class="font">开仓时间</div>
                            <div class="switch fr">
                                <el-switch
                                    v-model="ruleForm.allow_order_opentime"
                                    active-color="#636B90"
                                    inactive-color="#ee0a24"
                                    :active-value="1"
                                    :inactive-value="0">
                                </el-switch>
                            </div>
                        </div>
                        <div class="radio-item-area">
                            <div class="font">开仓价</div>
                            <div class="switch fr">
                                <el-switch
                                    v-model="ruleForm.allow_order_openprice"
                                    active-color="#636B90"
                                    inactive-color="#ee0a24"
                                    :active-value="1"
                                    :inactive-value="0">
                                </el-switch>
                            </div>
                        </div>
                        <div class="radio-item-area">
                            <div class="font">当前价</div>
                            <div class="switch fr">
                                <el-switch
                                    v-model="ruleForm.allow_order_currprice"
                                    active-color="#636B90"
                                    inactive-color="#ee0a24"
                                    :active-value="1"
                                    :inactive-value="0">
                                </el-switch>
                            </div>
                        </div>
                        
                        <div class="radio-item-area">
                            <div class="font">止损</div>
                            <div class="switch fr">
                                <el-switch
                                    v-model="ruleForm.allow_order_stoploss"
                                    active-color="#636B90"
                                    inactive-color="#ee0a24"
                                    :active-value="1"
                                    :inactive-value="0">
                                </el-switch>
                            </div>
                        </div>

                        <div class="radio-item-area">
                            <div class="font">止盈</div>
                            <div class="switch fr">
                                <el-switch
                                    v-model="ruleForm.allow_order_stopprofit"
                                    active-color="#636B90"
                                    inactive-color="#ee0a24"
                                    :active-value="1"
                                    :inactive-value="0">
                                </el-switch>
                            </div>
                        </div>
                        
                    </div>

                    <el-form-item>
                        <div class="bottom_item">
                            <button v-if="type=== 'add'" type="button" @click="submit" class="primary" :loading="loading">保存</button>
                            <button v-else type="button" @click="updateAccount" class="primary" :loading="loading">保存</button>
                            <button type="button" class="default" @click="cancel">取消</button>
                        </div>
                    </el-form-item>

                </el-form>
            </div>

        </div>
    </div>
</template>
<style lang="scss">
.frm_account .item .tips{
    position: static;
    font-size: .8rem;
    color: #B2B6CB;
}
.frm_account .item input[type=password], .frm_account .item input[type=text], .frm_account .item select{
    width: 300px;
    border: 1px solid #646A8D;
    border-radius: .5rem;
    padding: 1rem;
    font-size: .8rem;
}

.frm_account .el-form-item--small .el-form-item__label{
    line-height: 46px;
    box-sizing: border-box;
    padding-right: 30px;
}
.frm_account .el-input--small .el-input__inner {
    height: 46px;
    line-height: 46px;
    border: 1px solid #646A8D;
}
.radio-item-area{
    margin-right: 20px;
    .font{
        display: inline-block;
        line-height: 22px;
        margin-right: 10px;
    }
}
</style>
<script>
// updateAccount, modifyAccountPassword 
import { getTraders, getTraderServers, addAccount, getAccountInfo, updateAccount, modifyAccountPassword } from '@/service/user';

// nickname tradestylecode leveragecode allow_account allow_tradehistory allow_order
// allow_order_no allow_order_volume allow_order_opentime allow_order_openprice allow_order_currprice allow_order_stoploss allow_order_stopprofit

export default {
    name: 'AccountAdd',
    props: {
        item: {
            type: Object,
            required: true
        },
        type: {
            type: String,
            default: 'add'
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        async visible(val) {
            this.innerVisible = val;
            if(val) {
                if(this.type === 'edit') {
                    this.getAccountInfo(this.item.accountNo);
                } else {
                    await this.getDict();
                }
            }
        }
    },
    data() {
        return {
            innerVisible: false,
            loading: false,
            loading2: false,
            editPassMark: false,
            oldPassword: '',
            ruleForm: {
                DefaultTraderServerInfo: {},
                TraderInfo: {},
                userid: '',
                platformcode: '',
                traderid: '',
                trader_serverid: '',
                accountno: '',
                password: '',
                nickname: '',
                tradestylecode: '',
                leveragecode: '',
                allow_account: 0,
                allow_tradehistory: 0,
                allow_order: 0,
                allow_order_no: 0,
                allow_order_volume: 0,
                allow_order_opentime: 0,
                allow_order_openprice: 0,
                allow_order_currprice: 0,
                allow_order_stoploss: 0,
                allow_order_stopprofit: 0
            },
            detailData: {},
            traderidArr: [],
            traderServeridArr: [],
            rules: {
                platformcode: [
                    { required: true, message: '请选择平台', trigger: 'blur' }
                ],
                traderid: [
                    { required: true, message: '请选择交易商', trigger: 'blur' }
                ],
                trader_serverid: [
                    { required: true, message: '请选择服务器', trigger: 'blur' }
                ],
                accountno: [
                    { required: true, message: '请输入账户号码', trigger: 'blur' },
                    { min: 4, max: 16, message: '首位非零的4-16位密码', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入投资人密码', trigger: 'blur' },
                    { min: 4, max: 25, message: '4-25位，不含有中文以及中英文单双引号', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '请输入账户昵称', trigger: 'blur' },
                    { max: 10, message: '账户长度为10位以下字符长度', trigger: 'blur' }
                ]
            },
            platformcodeArr: [{
                value: '1',
                label: 'MetaTrader4 (Auto Update)'
            }],
            options: [{
                    value: '1: 100',
                    label: '1: 100'
                }, {
                    value: '1: 500',
                    label: '1: 500'
                }],
            options2: [{
                    value: '手动',
                    label: '手动'
                }, {
                    value: '自动',
                    label: '自动'
                }]
        };
    },
    methods: {
        doPramas() {
            const {userid, platformcode, traderid,
            trader_serverid, accountno, password, nickname, tradestylecode, leveragecode,
            allow_account, allow_tradehistory, allow_order, allow_order_no, allow_order_volume,
            allow_order_opentime, allow_order_openprice, allow_order_currprice, allow_order_stoploss, allow_order_stopprofit} = this.ruleForm;
            const obj = {
                userid,
                platformcode,
                traderid,
                trader_serverid,
                accountno,
                password,
                nickname,
                tradestylecode,
                leveragecode,
                allow_account,
                allow_tradehistory,
                allow_order,
                allow_order_no,
                allow_order_volume,
                allow_order_opentime,
                allow_order_openprice,
                allow_order_currprice,
                allow_order_stoploss,
                allow_order_stopprofit
            };

            return obj;
        },
        async getDict() {
            console.log('getDict');
            const data = await getTraders();

            if (data.length) {
                this.traderidArr = data;
            }
        },
        getAccountInfo(no) {
            console.log('getAccountInfo');
            getAccountInfo({ accountNo: no }).then((data) => {
                Object.assign( this.ruleForm, data);
                console.log(this.ruleForm);

                this.oldPassword = this.ruleForm.password;
                // this.traderidChange(data.traderid);
            }).catch(error => {
                console.log(error);
            });
        },
        traderidChange(data) {
            this.getTraderServers(data);
        },
        getTraderServers(key) {
            getTraderServers({ traderId: key} ).then((data) => {
                if (data.length) {
                    this.traderServeridArr = data;
                }
            }).catch(error => {
                console.log(error);
            });
        },
        updateAccount() {
            this.$refs.accountForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    const params = this.doPramas();
                    console.log(params);

                    updateAccount(params).then((data) => {
                        this.loading = false;
                        if (data) {
                            this.$message({
                                message: '账户更新成功',
                                type: 'success'
                            });
                            this.$emit('manageAccountAddsub', {});
                        }
                    }).catch(error => {
                        console.log(error);
                        this.loading = false;
                    });
                }
            });
        },
        submit() {
            if (this.ruleForm.userid) {
                this.$emit('manageAccountAddsub', {});
            } else {
                this.$refs.accountForm.validate((valid) => {
                    if (valid) {
                        this.loading = true;

                        const params = this.doPramas();
                        const userId = localStorage.getItem('webUserId') || '';
                        params.userid = userId;

                        addAccount(params).then((data) => {
                            this.loading = false;
                            if (data) {
                                this.$message({
                                    message: '账户添加成功',
                                    type: 'success'
                                });
                                this.$emit('manageAccountAddsub', {});
                            }
                        }).catch(error => {
                            console.log(error);
                            this.loading = false;
                        });
                    }
                });
            }
        },
        cancel() {
            this.$emit('manageAccountAddCancel', {});
        },
        editPass() {
            this.editPassMark = true;
        },
        editPassCancel() {
            this.ruleForm.password = this.oldPassword;
            this.editPassMark = false;
        },
        editPassSub() {
            this.$refs.accountForm.validate((valid) => {
                if (valid) {
                    this.loading2 = true;
                    const obj = {
                        accountNo: this.ruleForm.accountno,
                        oldPassword: this.oldPassword,
                        newPassword: this.ruleForm.password
                    };

                    modifyAccountPassword(obj).then((data) => {
                        if(data) {
                            this.oldPassword = this.ruleForm.password;
                            this.editPassMark = false;
                            this.loading2 = false;
                        }
                    }).catch(error => {
                        console.log(error);
                        this.loading2 = false;
                    });
                }
            });
        }
    },
    created() {
    }
};
</script>