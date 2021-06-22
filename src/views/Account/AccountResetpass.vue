<template>
    <div class="">
        <div class="my_account">
            <i class="ico_my_account"></i>我的账户
        </div>
        <div class="neiye_content">
            <div class="layui-form frm_account">
                <div class="sec_title">交易软件</div>
                <div class="item">
                    <div class="label"></div>
                    <div class="ipt">MetaTrader4 (Auto Update)</div>
                </div>
                <div class="sec_title">交易商</div>
                <div class="item">
                    <div class="label bitian">交易商</div>
                    <div class="ipt">FBS</div>
                </div>
                <div class="item">
                    <div class="label bitian">服务器</div>
                    <div class="ipt">FBS-Demo</div>
                </div>
                <div class="item">
                    <div class="label bitian">账户号码</div>
                    <div class="ipt">9760765</div>
                </div>
                <div class="item">
                    <div class="label bitian">投资人密码</div>
                    <div class="ipt" style="margin-top: -12px;">
                        <input type="password" placeholder="请输入您的新密码" /><button type="button" class="primary">确认</button><button type="button"  class="default">取消</button>
                        <div class="tips">4-25位，不含有中文以及中英文单双引号</div>
                    </div>
                </div>
                <div class="sec_title">账户信息</div>
                <div class="item">
                    <div class="label bitian">账户昵称</div>
                    <div class="ipt" style="margin-top: -12px;">
                        <input type="text" placeholder="请输入您的账户昵称" />
                    </div>
                </div>
                <div class="item">
                    <div class="label ">交易风格</div>
                    <div class="ipt" style="margin-top: -12px;">
                        <el-select v-model="selectValue2" placeholder="请选择">
                            <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="item">
                    <div class="label ">杠杆比例</div>
                    <div class="ipt" style="margin-top: -12px;">
                        <el-select v-model="selectValue" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    
                </div>
                <div class="sec_title">许可<div class="fr">私密/公开</div></div>
                <div class="item">
                    <div class="switch_desc">账户<span>(私密仅自己可见，公开所有网友可见)</span></div>
                    <div class="switch fr">
                        <el-switch
                            v-model="value"
                            active-color="#636B90"
                            inactive-color="#ee0a24"
                            active-value="100"
                            inactive-value="0">
                        </el-switch>
                    </div>
                </div>
                <div class="item">
                    <div class="switch_desc">历史交易<span>(为了保证牛人榜账户的真实性，在账户公开的情况下，历史交易也是公开的)</span></div>
                    <div class="switch fr">
                        <el-switch
                            v-model="value2"
                            active-color="#636B90"
                            inactive-color="#ee0a24"
                            active-value="101"
                            inactive-value="1">
                        </el-switch>
                    </div>
                </div>
                <div class="item">
                    <div class="switch_desc">当前持仓/挂单<span>(私密仅自己可见，公开可选择全部公开，或勾选菜单中想公开的选项)</span></div>
                    <div class="switch fr">
                        <el-switch
                            v-model="value3"
                            active-color="#636B90"
                            inactive-color="#ee0a24"
                            active-value="100"
                            inactive-value="0">
                        </el-switch>
                    </div>
                </div>
                <div class="item" style="margin-top:40px">
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="订单号"></el-checkbox>
                        <el-checkbox label="手数"></el-checkbox>
                        <el-checkbox label="开仓时间"></el-checkbox>
                        <el-checkbox label="开仓价" disabled></el-checkbox>
                        <el-checkbox label="当前价" disabled></el-checkbox>
                        <el-checkbox label="止损"></el-checkbox>
                        <el-checkbox label="止盈"></el-checkbox>
                    </el-checkbox-group>	
                </div>
                <div class="bottom_item">
                        <button type="button" class="primary">保存</button><button type="button"  class="default">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AccountResetpass',
    data() {
        return {
            levelList: null,
            checkList: ['开仓时间'],
            value: '100',
            value3: '0',
            value2: '101',
            options: [{
                    value: '选项1',
                    label: '1: 100'
                }, {
                    value: '选项2',
                    label: '1: 500'
                }],
            selectValue: '',
            options2: [{
                    value: '选项1',
                    label: '手动'
                }, {
                    value: '选项2',
                    label: '自动'
                }],
            selectValue2: ''
        };
    },
    methods: {
        test() {
            console.log('memem');
        }
    },
    created() {
        this.test();
    }
};
</script>
